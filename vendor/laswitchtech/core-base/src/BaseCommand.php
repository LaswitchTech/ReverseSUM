<?php

//Declaring namespace
namespace LaswitchTech\coreBase;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLogger\Logger;

// BaseCommand Class
class BaseCommand {

    // Configurator
    protected $Configurator;

	// Logger
	protected $Logger;

    // Auth
    protected $Auth;

    // Properties
    protected $Colors = [
        "default" => "\033[39m",
        "black" => "\033[30m",
        "red" => "\033[31m",
        "green" => "\033[32m",
        "yellow" => "\033[33m",
        "blue" => "\033[34m",
        "magenta" => "\033[35m",
        "cyan" => "\033[36m",
        "light-gray" => "\033[37m",
        "dark-gray" => "\033[90m",
        "light-red" => "\033[91m",
        "light-green" => "\033[92m",
        "light-yellow" => "\033[93m",
        "light-blue" => "\033[94m",
        "light-magenta" => "\033[95m",
        "light-cyan" => "\033[96m",
        "white" => "\033[97m",
    ];

    /**
     * Constructor
     * @param object $Auth
     */
    public function __construct($Auth = null){

        // Initiate Auth
        $this->Auth = $Auth;

        // Initiate Configurator
        $this->Configurator = new Configurator('command');

        // Initiate Logger
        $this->Logger = new Logger('command');
    }

    /**
     * Magic Method to catch all undefined methods
     * @param string $name
     * @param array $arguments
     * @return void
     */
    public function __call($name, $arguments) {

        // Log the error
        $this->Logger->error("./cli " . __CLASS__ . " ".$name." [options] - Not Implemented");

        // Output Usage
        $this->output("Usage: ./cli " . strtolower(str_replace('Command','',__CLASS__)) . " " . $name . " [options]");

        // List available methods that end with 'Action'
        $this->output("Available Methods:");
        foreach(get_class_methods($this) as $method){
            if(substr($method,-6) == 'Action'){
                $this->output(" - " . str_replace('Action','',$method));
            }
        }
    }

    /**
     * Output a string
     * @param string $string
     * @return void
     */
    protected function output($string) {
        print_r($string . PHP_EOL);
    }

    /**
     * Output a string with color
     * @param string $string
     * @param string $color
     * @return void
     */
    protected function set($string, $color = 'default'){
        if(isset($this->Colors[$color])){
            return $this->Colors[$color] . $string . $this->Colors['default'];
        } else {
            return $string;
        }
    }

    /**
     * Output a string with red color
     * @param string $string
     * @return void
     */
    protected function error($string) {
        $this->output($this->set($string, 'red'));
    }

    /**
     * Output a string with green color
     * @param string $string
     * @return void
     */
    protected function success($string) {
        $this->output($this->set($string, 'green'));
    }

    /**
     * Output a string with yellow color
     * @param string $string
     * @return void
     */
    protected function warning($string) {
        $this->output($this->set($string, 'yellow'));
    }

    /**
     * Output a string with blue color
     * @param string $string
     * @return void
     */
    protected function info($string) {
        $this->output($this->set($string, 'cyan'));
    }

    /**
     * Request for input
     * @param string $string
     * @param array|int|string $options
     * @param string $default
     * @return string
     */
    protected function input($string, $options = null, $default = null){
        $modes = ['select','text','string'];
        $mode = 'string';
        if($options != null || $options == 0){
            if(is_array($options)){
                $mode = 'select';
            } else if(is_int($options)){
                $mode = 'text';
            } else {
                if(is_string($options)){ $default = $options; }
            }
        }
        $stdin = function(){
            $handle = fopen ("php://stdin","r");
            return str_replace("\n",'',fgets($handle));
        };
        switch($mode){
            case"select":
                $answer = null;
                foreach($options as $key => $value){
                    $options[$key] = strtoupper($value);
                }
                while($answer == null || !in_array(strtoupper($answer),$options)){
                    print_r($string . ' (');
                    foreach($options as $key => $option){
                        if($key > 0){ print_r('/'); }
                        print_r($option);
                    }
                    print_r(')');
                    if($default != null){ print_r('['.$default.']'); }
                    print_r(': ');
                    $answer = $stdin();
                    if($default != null && $answer == ""){ $answer = $default; }
                }
                break;
            case"text":
                $answer = '';
                $exits = ['END','EXIT','QUIT','EOF',':Q',''];
                $count = 0;
                $max = 5;
                $print = false;
                if(is_bool($default)){ $print = $default; }
                if(is_int($options)){ $max = $options; }
                if($print){
                    print_r($string . ' type (');
                    foreach($exits as $key => $exit){
                        if($key > 0){ print_r('/'); }
                        print_r($exit);
                    }
                    print_r(') to exit' . PHP_EOL);
                } else {
                    print_r($string . PHP_EOL);
                }
                do {
                    $line = fgets(STDIN);
                    if(in_array(strtoupper(str_replace("\n",'',$line)),$exits)){
                        if($max <= 0){ $max = 1; }
                        $count = $max;
                    } else { $answer .= $line; $count++; }
                } while ($count < $max || $max <= 0);
                break;
            default:
                $answer = null;
                while($answer == null){
                    print_r($string . ' ');
                    if($default != null){ print_r('['.$default.']'); }
                    print_r(': ');
                    $answer = $stdin();
                    if($default != null && $answer == ""){ $answer = $default; }
                    if($answer == ''){ $answer = null; }
                }
                break;
        }
        $answer = trim($answer,"\n");
        if($answer == ''){ $answer = null; }
        return $answer;
    }
}
