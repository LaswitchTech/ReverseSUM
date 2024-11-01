<?php

// Declaring namespace
namespace LaswitchTech\coreConfigurator;

// Import additionnal classes into the global namespace
use Exception;
use ReflectionClass;

class Configurator {

    const Extension = '.cfg';
    const ConfigDir = '/config';

    private $Files = [];
    private $Configurations = [];
    private $RootPath = null;

    /**
     * Create a new Configurator instance.
     *
     * @return object $this
     */
    public function __construct($File = null){

        // Set RootPath according to this file
        $this->RootPath = realpath(getcwd());

        // If server document_root is available, use it instead
        if(isset($_SERVER['DOCUMENT_ROOT']) && !empty($_SERVER['DOCUMENT_ROOT'])){
            $this->RootPath = $_SERVER['DOCUMENT_ROOT'];
        }

        // If constant ROOT_PATH has been set
        if(defined("ROOT_PATH")){
            $this->RootPath = ROOT_PATH;
        }

        // Check if configuration files were provided
        if($File){
            if(is_string($File)){
                $this->add($File);
            } else {
                if(is_array($File)){
                    if($this->isAssociative($File)){
                        foreach($File as $Name => $Path){
                            $this->add($Name, $Path);
                        }
                    } else {
                        foreach($File as $Name){
                            $this->add($Name);
                        }
                    }
                }
            }
        }
    }

    /**
     * Check if an array is associative.
     *
     * @param  array  $array
     * @return boolean
     */
    protected function isAssociative($array) {
        $keys = array_keys($array);
        return array_keys($keys) !== $keys;
    }

    /**
     * Add a configuration file.
     *
     * @param  string  $File
     * @param  string  $Path
     * @return object $this
     */
    public function add($File, $Path = null){

        // If not already saved, add File in the list
        if(!isset($this->Files[$File])){

            // Set Path
            if(!is_string($Path)){
                $Path = $this->RootPath . self::ConfigDir . '/' . $File . self::Extension;
            }

            // Check if it doesn't exist
            if(!is_file($Path)){

                // Create the directory recursively
                if(!is_dir(dirname($Path))){
                    mkdir(dirname($Path), 0777, true);
                }

                // Create File
                file_put_contents($Path, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }

            // Retrieve File and Load it
            $this->Configurations[$File] = json_decode(file_get_contents($Path),true);

            // Save File
            $this->Files[$File] = $Path;
        }

        // Return
        return $this;
    }

    /**
     * Get a Setting.
     *
     * @param  string  $File
     * @param  string  $Setting
     * @return object $this
     */
    public function get($File, $Setting = null){

        // Check if file and setting exist and return it.
        if(isset($this->Configurations[$File])){
            if($Setting){
                if(isset($this->Configurations[$File][$Setting])){
                    // Return
                    return $this->Configurations[$File][$Setting];
                }
            } else {
                // Return
                return $this->Configurations[$File];
            }
        }
    }

    /**
     * List all configuration files.
     *
     * @return object $this
     */
    public function list($byFiles = false){

        // Check if we should scan for files in the configuration directory or return the list of loaded files
        if($byFiles){

            // Scan for files in the configuration directory
            $Files = scandir($this->RootPath . self::ConfigDir);

            // Remove . and .. from the list
            $Files = array_diff($Files, array('.', '..'));

            // Only return files with the configuration extension
            $Files = array_filter($Files, function($File){
                return strpos($File, self::Extension) !== false;
            });

            // Remove the extension from the file names
            $Files = array_map(function($File){
                return str_replace(self::Extension, '', $File);
            }, $Files);

            // Convert to a standard array
            $Files = array_values($Files);

            // Return
            return $Files;
        } else {

            // Return
            return array_keys($this->Files);
        }
    }

    /**
     * Set a Setting.
     *
     * @param  string  $File
     * @param  string  $Setting
     * @param  string|array|int|boolean  $Value
     * @return object $this
     */
    public function set($File, $Setting, $Value){

        // Check if file exist and return it.
        if(isset($this->Configurations[$File])){

            // Set Value
            $this->Configurations[$File][$Setting] = $Value;

            // Save File
            file_put_contents($this->Files[$File], json_encode($this->Configurations[$File], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }

        // Return
        return $this;
    }

    /**
     * Delete a or all configuration file(s).
     *
     * @param  string|null  $File
     * @return object $this
     */
    public function delete($File = null){

        // If not already saved, add File in the list
        if(isset($this->Files[$File])){

            // Delete Configuration File
            unlink($this->Files[$File]);

            // Unset File
            unset($this->Files[$File]);
        }

        // Return
        return $this;
    }

    public function check($File){

        // Check if configuration file without loading it
        return is_file($this->RootPath . self::ConfigDir . '/' . $File . self::Extension);
    }

    /**
     * Get a Root Path.
     *
     * @return string $this->RootPath
     */
    public function root(){

        // Return
        return $this->RootPath;
    }

    /**
     * Get a Class File Path.
     *
     * @param  string  $className
     * @return string $filePath
     */
    public function path($className) {

        // Check if the Composer autoload file is included
        $autoloadPath = $this->root() . '/vendor/autoload.php';
        if (!file_exists($autoloadPath)) {
            throw new Exception("Composer autoload file not found.");
        }

        // Include the Composer autoload file
        require_once $autoloadPath;

        // Check if the class exists
        if (!class_exists($className)) {

            // Throw an exception
            throw new Exception("Class $className does not exist.");
        }

        // Use ReflectionClass to get the file path
        $reflector = new ReflectionClass($className);
        $filePath = $reflector->getFileName();

        return $filePath;
    }

    /**
     * Check if the library is installed.
     *
     * @return bool
     */
    public function isInstalled(){

        // Retrieve the path of this class
        $reflector = new ReflectionClass($this);
        $path = $reflector->getFileName();

        // Retrieve the filename of this class
        $filename = basename($path);

        // Modify the path to point to the config directory
        $path = str_replace('src/' . $filename, 'config/', $path);

        // Add the requirements to the Configurator
        $this->Configurator->add('requirements', $path . 'requirements.cfg');

        // Retrieve the list of required modules
        $modules = $this->Configurator->get('requirements','modules');

        // Check if the required modules are installed
        foreach($modules as $module){

            // Check if the class exists
            if (!class_exists($module)) {
                return false;
            }

            // Initialize the class
            $class = new $module();

            // Check if the method exists
            if(method_exists($class, isInstalled)){

                // Check if the class is installed
                if(!$class->isInstalled()){
                    return false;
                }
            }
        }

        // Return true
        return true;
    }
}
