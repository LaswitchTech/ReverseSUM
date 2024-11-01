<?php

// Declaring namespace
namespace LaswitchTech\coreLocale;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLogger\Logger;
use Exception;

class Locale {

    // Set Constants
    const Default = 'en-ca';
    const Charset = 'UTF-8';
    const Locales = [
        'en-ca',
        'fr-ca',
    ];

    // Logger
    protected $Logger = null;

    // Configurator
    protected $Configurator = null;

    // Locales
    protected $Locale = null;
    protected $Locales = [];

    /**
     * Create a new Locale instance.
     *
     * @return void
     * @throws Exception
     */
    public function __construct(){

        // Initialize Configurator
        $this->Configurator = new Configurator(['locale']);

        // Initiate Logger
        $this->Logger = new Logger('locale');

        // Load Locales
        $this->getLocales();

        // Set Locale
        $this->setLocale();
    }

    /**
     * Configure the Locale instance.
     *
     * @param  string  $option
     * @param  mixed  $value
     * @return $this
     * @throws Exception
     */
    public function config($option, $value){
        try {
            if(is_string($option)){
                switch($option){
                    default:
                        throw new Exception("unable to configure $option.");
                        break;
                }
            } else{
                throw new Exception("1st argument must be as string.");
            }
        } catch (Exception $e) {

            // If an exception is caught, log an error message
            $this->Logger->error('Error: '.$e->getMessage());
        }

        return $this;
    }

    /**
     * Get Locales.
     *
     * @return void
     * @throws Exception
     */
    protected function getLocales(){
        try {
            if(!is_dir($this->Configurator->root() . '/Locale')){
                // Create Locale Directory
                mkdir($this->Configurator->root() . '/Locale');
            }
            foreach(self::Locales as $locale){

                // Create Locale Directory if it does not exist
                if(!is_dir($this->Configurator->root() . '/Locale/' . $locale)){
                    // Create Locale Directory
                    mkdir($this->Configurator->root() . '/Locale/' . $locale);
                }
            }
            foreach($this->scandir('Locale') as $locale){

                // Create Locale Configuration File if it does not exist
                if(!is_file($this->Configurator->root() . '/Locale/' . $locale . '/locale.cfg')){
                    file_put_contents($this->Configurator->root() . '/Locale/' . $locale . '/locale.cfg', json_encode([
                        "name" => $locale,
                        "language" => "English",
                        "region" => "Canada",
                        "charset" => self::Charset,
                        "direction" => "ltr",
                        "flag" => $locale.".png",
                        "translations" => []
                    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                }

                // Create Locale Translation File if it does not exist
                if(!is_file($this->Configurator->root() . '/Locale/' . $locale . '/translation.cfg')){
                    file_put_contents($this->Configurator->root() . '/Locale/' . $locale . '/translation.cfg', json_encode([
                        "name" => "name",
                        "language" => "language",
                        "region" => "region",
                        "charset" => "charset",
                        "direction" => "direction",
                        "flag" => "flag",
                    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                }

                // Load Locale Configuration
                $this->Locales[$locale] = json_decode(file_get_contents($this->Configurator->root() . '/Locale/' . $locale . '/locale.cfg'), true);

                // Load Locale Translation
                $this->Locales[$locale]['translations'] = json_decode(file_get_contents($this->Configurator->root() . '/Locale/' . $locale . '/translation.cfg'), true);
            }
        } catch (Exception $e) {

            // If an exception is caught, log an error message
            $this->Logger->error('Error: '.$e->getMessage());
        }
    }

    /**
     * Scan Directory.
     *
     * @param  string  $directory
     * @param  string  $filter
     * @return array
     */
    protected function scandir($directory, $filter = "ANY"){
        if(!str_starts_with($directory,'/')){ $directory = '/' . $directory; }
        $path = $this->Configurator->root() . $directory;
        if(!str_ends_with($path,'/')){ $path .= '/'; }
        $files = [];
        if(is_dir($path)){
            foreach(scandir($path) as $file){
                if($filter){
                    switch(strtoupper($filter)){
                        case"DIRECTORY":
                        case"DIRECTORIES":
                        case"DIR":
                            if(is_dir($path.$file) && !in_array($file,['.','..'])){
                                $files[] = $file;
                            }
                            break;
                        case"FILES":
                        case"FILE":
                            if(is_file($path.$file) && !in_array($file,['.DS_Store'])){
                                $files[] = $file;
                            }
                            break;
                        case"ALL":
                        case"ANY":
                            if((is_file($path.$file) && !in_array($file,['.DS_Store'])) || (is_dir($path.$file) && !in_array($file,['.','..']))){
                                $files[] = $file;
                            }
                            break;
                    }
                } else {
                    $files[] = $file;
                }
            }
        }
        return $files;
    }

    /**
     * Set Locale.
     *
     * @return boolean
     */
    protected function setLocale(){
        if(isset($_REQUEST['locale'])){

            // Set Locale from Request
            if($this->set($_REQUEST['locale'])){
                return true;
            }
        } else {

            // Set Locale from Session if session is started
            if(session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['locale'])){

                // Set Locale from Session
                if($this->set($_SESSION['locale'])){
                    return true;
                }
            }

            // Set Locale from Cookie if cookie cookiesAcceptPersonalisations is set and is true
            if(isset($_COOKIE,$_COOKIE['cookiesAcceptPersonalisations']) && $_COOKIE['cookiesAcceptPersonalisations'] === "true"){

                // Set Locale from Cookie
                if($this->set($_COOKIE['locale'])){
                    return true;
                }
            }

            // Set Locale from Browser
            if($this->set(strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? self::Default, 0, 5)))){

                // Return
                return true;
            }

            // Set Locale from Default
            if($this->set(self::Default)){
                return true;
            }
        }
    }

    /**
     * Set Locale.
     *
     * @param  string  $locale
     * @return boolean
     */
    public function set($locale){

        // Sanitize Locale
        $locale = strtolower($locale);

        // Check if Locale Exists
        if(array_key_exists($locale, $this->Locales)){

            // Set Locale
            $this->Locale = $this->Locales[$locale];

            // Set Session Locale if session is started
            if(session_status() == PHP_SESSION_ACTIVE){
                $_SESSION['locale'] = $locale;
            }

            // Set Cookie Locale if cookie cookiesAcceptPersonalisations is set and is true
            if(isset($_COOKIE,$_COOKIE['cookiesAcceptPersonalisations']) && $_COOKIE['cookiesAcceptPersonalisations'] === "true"){
                setcookie('locale', $locale, time() + (86400 * 30), "/");
            }

            // Return
            return true;
        } else{

            // Return
            return false;
        }
    }

    /**
     * Get Locale string.
     *
     * @param  string  $key
     * @return string
     */
    public function get($key){

        // Check if Locale string exists in current Locale
        if($this->Locale && array_key_exists($key, $this->Locale['translations'])){
            return $this->Locale['translations'][$key];
        }

        // Check if Locale string exists in Default Locale
        if(array_key_exists($key, $this->Locales[self::Default]['translations'])){
            return $this->Locales[self::Default]['translations'][$key];
        }

        // Add Logger Info
        $this->Logger->info('Locale string "'.$key.'" not found in ' . $this->Locale['name'] . ' locale. Adding it to ' . self::Default . ' locale.');

        // Add Locale string to Default Locale
        return $this->add($key);
    }

    /**
     * Add Locale string.
     *
     * @param  string  $key
     * @param  string|null  $value
     * @return string
     */
    public function add($key, $value = null){
        if(!array_key_exists($key, $this->Locales[self::Default]['translations'])){
            $this->Locales[self::Default]['translations'][$key] = $value ?? $key;
            file_put_contents($this->Configurator->root() . '/Locale/' . self::Default . '/translation.cfg', json_encode($this->Locales[self::Default]['translations'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
        return $value ?? $key;
    }

    /**
     * List Locales.
     *
     * @return array
     */
    public function list(){
        $list = [];
        foreach($this->Locales as $locale => $properties){
            $list[$locale] = $properties['language'];
        }
        return $list;
    }

    /**
     * Get Current Locale.
     *
     * @param  string|null  $key
     * @return array
     */
    public function current($key = null){
        if($key){
            if($this->Locale && array_key_exists($key, $this->Locale)){
                return $this->Locale[$key];
            }
        }
        return $this->Locale;
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
