<?php

// Declaring namespace
namespace LaswitchTech\coreLogger;

// Import additionnal classes into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use DateTime;
use Exception;
use ReflectionClass;

class Logger {

    const DEBUG_LABEL = 'DEBUG';
    const INFO_LABEL = 'INFO';
    const SUCCESS_LABEL = 'SUCCESS';
    const WARNING_LABEL = 'WARNING';
    const ERROR_LABEL = 'ERROR';
    const DEBUG_LEVEL = 5;
    const INFO_LEVEL = 4;
    const SUCCESS_LEVEL = 3;
    const WARNING_LEVEL = 2;
    const ERROR_LEVEL = 1;
    const Extension = '.log';
    const Dir = '/log';

    // Levels
    private $Levels = []; // Levels of logging

    private $logFiles = []; // An array to hold all added log files
    private $logFile = null; // The name of the current log file to write logs to
    private $logRotation = false; // Whether log file rotation is enabled or not
    private $logIP = false; // Whether to log ip addresses or not
    private $logLevel = 1; // Level of logging to do
    private $RootPath = null;

    // Configurator
    private $Configurator = null;

    /**
     * Create a new Logger instance.
     *
     * @param  string|array|null  $logFile
     * @return void
     * @throws Exception
     */
    public function __construct($logFile = null){

        // Initialize Configurator
        $this->Configurator = new Configurator('logger');

        // Set RootPath using Configurator
        $this->RootPath = $this->Configurator->root();

        // Retrieve Log Settings
        $this->logIP = $this->Configurator->get('logger', 'ip') ?: $this->logIP;
        $this->logRotation = $this->Configurator->get('logger', 'rotation') ?: $this->logRotation;
        $this->logLevel = $this->Configurator->get('logger', 'level') !== null ? $this->Configurator->get('logger', 'level') : $this->logLevel;

        // Generate Levels
        $this->Levels[self::DEBUG_LEVEL] = self::DEBUG_LABEL;
        $this->Levels[self::INFO_LEVEL] = self::INFO_LABEL;
        $this->Levels[self::SUCCESS_LEVEL] = self::SUCCESS_LABEL;
        $this->Levels[self::WARNING_LEVEL] = self::WARNING_LABEL;
        $this->Levels[self::ERROR_LEVEL] = self::ERROR_LABEL;

        // Configuring logFile
        if($logFile != null){
            if(is_string($logFile)){

                // If $logFile is a string, add it as a default log file with the name 'default'
                $this->add($logFile);
            } else {
                if(is_array($logFile)){

                    // If $logFile is an array, add each key-value pair as a log file
                    foreach($logFile as $name => $file){
                        $this->add($name, $file);
                    }

                    // Set the current log file to the first added log file
                    $this->logFile = array_key_first($this->logFiles);
                } else {

                    // If $logFile is neither a string nor an array, throw an exception
                    throw new Exception("Could not configure phpLogger. Invalid argument.");
                }
            }
        } else {

            // If $logFile is null, add a default log file with the name 'default' and the filename 'default.log'
            $this->add($this->logFile, $this->logFile . '.log');
        }
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
        if(is_string($option)){
            switch($option){
                case"rotation":
                    if(is_bool($value)){
                        $this->logRotation = $value;

                        // Save to Configurator
                        $this->Configurator->set('logger',$option, $value);
                    } else{
                        throw new Exception("2nd argument must be a boolean.");
                    }
                    break;
                case"ip":
                    if(is_bool($value)){
                        $this->logIP = $value;

                        // Save to Configurator
                        $this->Configurator->set('logger',$option, $value);
                    } else{
                        throw new Exception("2nd argument must be a boolean.");
                    }
                    break;
                case"level":
                    if(is_int($value)){

                        // Set Log Level
                        $this->logLevel = $value;

                        // Save to Configurator
                        $this->Configurator->set('logger',$option, $value);
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

        return $this;
    }

    /**
     * Retrieve the client IP address.
     *
     * @return string $ipaddress
     */
	public function ip(){
        $ipaddress = '';
        if(getenv('HTTP_CLIENT_IP')){
            $ipaddress = getenv('HTTP_CLIENT_IP');
        } elseif(getenv('HTTP_X_FORWARDED_FOR')){
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        } elseif(getenv('HTTP_X_FORWARDED')){
            $ipaddress = getenv('HTTP_X_FORWARDED');
        } elseif(getenv('HTTP_FORWARDED_FOR')){
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        } elseif(getenv('HTTP_FORWARDED')){
            $ipaddress = getenv('HTTP_FORWARDED');
        } elseif(getenv('REMOTE_ADDR')){
            $ipaddress = getenv('REMOTE_ADDR');
        } elseif(defined('STDIN')){
            $ipaddress = 'LOCALHOST';
        } else {
            $ipaddress = 'UNKNOWN';
        }
        if(in_array($ipaddress,['127.0.0.1','127.0.1.1','::1'])){ $ipaddress = 'LOCALHOST'; }
	    return $ipaddress;
	}

    /**
     * Retrieve the client User Agent.
     *
     * @return string $userAgent
     */
    public function agent(){

        // Retrieve User Agent
        $userAgent = 'Unknown';
        if(isset($_SERVER['HTTP_USER_AGENT'])){
            $userAgent = json_encode($_SERVER['HTTP_USER_AGENT']);
        }

        // Return
        return $userAgent;
    }

    /**
     * Add a new log file.
     *
     * @param  string  $Name
     * @param  string  $Path
     * @return void
     * @throws Exception
     */
    public function add($Name, $Path = null){

        // If not already saved, add File in the list
        if(!isset($this->logFiles[$Name])){

            // Set Path
            if(!is_string($Path)){
                $Path = $this->RootPath . self::Dir . '/' . $Name . self::Extension;
            }

            // Check if it doesn't exist
            if(!is_file($Path)){

                // Create the directory recursively
                if(!is_dir(dirname($Path))){
                    mkdir(dirname($Path), 0777, true);
                }

                // Create File
                file_put_contents($Path, PHP_EOL);
            }

            // Save File
            $this->logFiles[$Name] = $Path;

            // Set as current file
            $this->logFile = $Name;
        }

        // Return
        return $this;
    }

    /**
     * Clear a log file.
     *
     * @param  string  $Name
     * @return void
     * @throws Exception
     */
    public function clear($Name = null){

        // if Name is not provided, clear the currently selected log
        if(!$Name){
            $Name = $this->logFile;
        }

        // If not already saved, add File in the list
        if(isset($this->logFiles[$Name])){

            // Clear File
            file_put_contents($this->logFiles[$Name], PHP_EOL);
        }

        // Return
        return $this;
    }

    /**
     * Set the current log file.
     *
     * @param  string  $logName
     * @return void
     * @throws Exception
     */
    public function set($logName){
        if(is_string($logName)){
            if(isset($this->logFiles[$logName])){
                $this->logFile = $logName;
            } else {
                throw new Exception("Could not find the requested log.");
            }
        } else {
            throw new Exception("Argument must be string.");
        }
    }

    /**
     * Get the name of the current log file.
     *
     * @return string
     */
    public function get(){
        return $this->logFile;
    }

    /**
     * Read a log file.
     *
     * @param  string  $logName
     * @return array
     */
    public function read($logName) {

        // Check if the log file exists
        if (!isset($this->logFiles[$logName])) {
            throw new Exception("Log file does not exist.");
        }

        // Get the path to the log file
        $filePath = $this->logFiles[$logName];

        // Ensure the file exists
        if (!file_exists($filePath)) {
            throw new Exception("Log file does not exist.");
        }

        // Initialize an empty array to store log records
        $logRecords = [];

        // Open the file for reading
        $fileHandle = fopen($filePath, "r");
        if ($fileHandle) {
            while (($line = fgets($fileHandle)) !== false) {
                // Check if ip is enabled
                if($this->logIP){
                    // Regular expression to match the log line structure
                    $pattern = '/\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\]\((.*?)\) (.*)/';
                    if (preg_match($pattern, $line, $matches)) {
                        $logRecords[] = [
                            'timestamp' => $matches[1],
                            'ip' => $matches[2],
                            'level' => $matches[3],
                            'trace' => ($matches[4]) . '(' . $matches[5] . ')',
                            'message' => $matches[6]
                        ];
                    }
                } else {
                    // Regular expression to match the log line structure
                    $pattern = '/\[(.*?)\]\[(.*?)\]\[(.*?)\]\((.*?)\) (.*)/';
                    if (preg_match($pattern, $line, $matches)) {
                        $logRecords[] = [
                            'timestamp' => $matches[1],
                            'level' => $matches[2],
                            'trace' => $matches[3] . '(' . $matches[4] . ')',
                            'message' => $matches[5]
                        ];
                    }

                }
            }
            fclose($fileHandle);
        } else {
            throw new Exception("Unable to open log file.");
        }

        return $logRecords;
    }

    /**
     * Get an array of all added log files.
     *
     * @return array
     */
    public function list(){
        return $this->logFiles;
    }

    /**
     * Write a log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string  $level
     * @param  string|null  $logName
     * @return void
     */
    public function log($message, $level = self::LEVEL_INFO, $logName = null){

        // Validate log level
        if(!in_array($level,[self::DEBUG_LEVEL,self::INFO_LEVEL,self::SUCCESS_LEVEL,self::WARNING_LEVEL,self::ERROR_LEVEL])){
            // If the specified log level is invalid, do not log anything
            return null;
        }
        if($level > $this->logLevel){
            // If the specified log level is invalid, do not log anything
            return null;
        }

        // Sanitize message
        if(!is_string($message)){
            // If the message is not a string, encode it as a JSON string and prepend '[JSON]'
            $message = '[JSON] ' . PHP_EOL . json_encode($message, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        }

        // Identify the log file
        if($logName == null || !isset($this->logFiles[$logName])){
            // If the log name is not specified or is not found in the added log files, use the default log file
            $logName = $this->logFile;
        }
        $logFile = $this->logFiles[$logName];

        // Backtrace
        $trace = debug_backtrace();
        $caller = count($trace) > 1 ? $trace[1] : $trace[0];
        $file = isset($caller['file']) ? $caller['file'] : '';
        $line = isset($caller['line']) ? $caller['line'] : '';
        $caller = count($trace) > 1 ? end($trace) : current($trace);
        $class = isset($caller['class']) && count($trace) > 1 ? $caller['class'] : '';
        $function = isset($caller['function']) && count($trace) > 1 ? $caller['function'] : '';

        // Validate trace
        $classTrace = '';
        if($class != ''){
            $classTrace .= $class . '::';
        }
        if($function != ''){
            $classTrace .= $function;
        }
        if($classTrace != ''){
            $classTrace = "[$classTrace]";
        }

        // Timestamp
        $timestamp = date("Y-m-d H:i:s");

        // Check if IPs should be logged
        $ip = '';
        if($this->logIP){
            $ip = '[' . $this->ip() . ']';
        }

        // Format Line
        $logLine = "[$timestamp]";
        $logLine .= $ip;
        $logLine .= "[" . $this->Levels[$level] . "]";
        $logLine .= $classTrace;
        $logLine .= "($file:$line)";
        $logLine .= " $message";

        // Check if logFile should be rotated
        if($this->logRotation && is_file($logFile)){

            // Get dates
            $today = new DateTime();
            $logDate = new DateTime();
            $logDate->setTimestamp(filemtime($logFile));

            // Evaluate Dates
            if($today->format("Y-m-d") > $logDate->format("Y-m-d")){
                $fileName = $logFile . '.' . strtotime($logDate->format("Y-m-d"));
                rename($logFile, $fileName);
            }
        }

        // Create the directory recursively
        if(!is_dir(dirname($logFile))){
            mkdir(dirname($logFile), 0777, true);
        }

        // Write Line to logFile
        file_put_contents($logFile, trim($logLine) . PHP_EOL, FILE_APPEND);

        // Write Line to prompt
        if(defined('STDIN')){
            echo trim($logLine) . PHP_EOL;
        }
    }

    /**
     * Write a level DEBUG log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string|null  $logName
     * @return void
     */
    public function debug($message, $logName = null){
        return $this->log($message, $level = self::DEBUG_LEVEL, $logName);
    }

    /**
     * Write a level INFO log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string|null  $logName
     * @return void
     */
    public function info($message, $logName = null){
        return $this->log($message, $level = self::INFO_LEVEL, $logName);
    }

    /**
     * Write a level SUCCESS log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string|null  $logName
     * @return void
     */
    public function success($message, $logName = null){
        return $this->log($message, $level = self::SUCCESS_LEVEL, $logName);
    }

    /**
     * Write a level WARNING log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string|null  $logName
     * @return void
     */
    public function warning($message, $logName = null){
        return $this->log($message, $level = self::WARNING_LEVEL, $logName);
    }

    /**
     * Write a level ERROR log message to the current log file.
     *
     * @param  mixed  $message
     * @param  string|null  $logName
     * @return void
     */
    public function error($message, $logName = null){
        return $this->log($message, $level = self::ERROR_LEVEL, $logName);
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
