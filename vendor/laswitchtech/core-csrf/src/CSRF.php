<?php

// Declaring namespace
namespace LaswitchTech\coreCSRF;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLogger\Logger;
use Exception;

class CSRF {

    const FIELD = 'csrf';
    const LENGTH = 32;

    private $hash = null;
    private $field = self::FIELD;
    private $length = self::LENGTH;

    // Logger
    private $Logger;

    // Configurator
    private $Configurator = null;

    /**
     * Create a new CSRF instance.
     *
     * @param  string|null  $field
     * @return void
     * @throws Exception
     */
    public function __construct($field = self::FIELD){

        // Initialize Configurator
        $this->Configurator = new Configurator('csrf');

        // Retrieve CSRF Settings
        $this->field = $this->Configurator->get('csrf', 'field') ?: $this->field;
        $this->length = $this->Configurator->get('csrf', 'length') ?: $this->length;

        // Initiate Logger
        $this->Logger = new Logger('csrf');

        // Configure default field to retrieve token
        if(is_string($field)){
            $this->field = $field;
        }

        // Configure Cookie Scope
        if(session_status() < 2){
            ini_set('session.cookie_samesite', 'Strict');
            ini_set('session.cookie_secure', 'On');
        }

        // Setup CSRF Token
        if(session_status() === PHP_SESSION_NONE){
            $this->Logger->error("Unable to find a session.");
            throw new Exception("Unable to find a session.");
        }

        // Generate Token
        $this->generate();
    }

    /**
     * Configure Library.
     *
     * @param  string  $option
     * @param  bool|int  $value
     * @return void
     * @throws Exception
     */
    public function config($option, $value){
        try {
            if(is_string($option)){
                switch($option){
                    case"field":
                        if(is_string($value)){
                            $this->field = $value;

                            // Save to Configurator
                            $this->Configurator->set('csrf',$option, $value);
                        } else{
                            throw new Exception("2nd argument must be a string.");
                        }
                        break;
                    case"length":
                        if(is_int($value)){
                            $this->length = $value;

                            // Save to Configurator
                            $this->Configurator->set('csrf',$option, $value);
                        } else{
                            throw new Exception("2nd argument must be an integer.");
                        }
                        break;
                    default:
                        throw new Exception("unable to configure $option.");
                        break;
                }
            } else{
                throw new Exception("1st argument must be as string.");
            }
        } catch (Exception $e) {
            $this->Logger->error('Error: '.$e->getMessage());
        }

        return $this;
    }

    /**
     * Generate token.
     *
     * @param  int|null  $length
     * @return void
     * @throws Exception
     */
    public function generate($length = self::LENGTH){
        if(is_int($length)){
            if(!isset($_SESSION[$this->field])){ $_SESSION[$this->field] = bin2hex(random_bytes($length)); }
            $this->hash = $_SESSION[$this->field];
        } else {
            $this->Logger->error("Invalid length.");
            throw new Exception("Invalid length.");
        }
    }

    /**
     * Get token.
     *
     * @return string $this->hash
     */
    public function token(){
        return $this->hash;
    }

    /**
     * Validate a token.
     *
     * @param  string|null  $token
     * @return boolean
     * @throws Exception
     */
    public function validate($token = null){
        if($token == null && !empty($_REQUEST[$this->field])){
            $token = $_REQUEST[$this->field];
        }
        if($token != null){
            if(is_string($token)){
                if($this->hash != null && hash_equals($token, $this->hash)){
                    return true;
                } elseif($this->hash != null && hash_equals(urldecode(base64_decode($token)), $this->hash)){
                    return true;
                } else {
                    $this->Logger->error("Invalid token.");
                }
            } else {
                $this->Logger->error("Token was not sanitized.");
            }
        } else {
            $this->Logger->error("Unable to validate token.");
        }
        return false;
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
