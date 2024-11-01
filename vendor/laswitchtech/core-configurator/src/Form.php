<?php

// Declaring namespace
namespace LaswitchTech\coreConfigurator;

// Import additionnal classes into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use Exception;

class Form {

    private $Configurator = null;

    /**
     * Create a new Form instance.
     *
     * @return object $this
     */
    public function __construct(){

        // Check if Configurator is an instance of Configurator
        $this->Configurator = new Configurator('configurator');
    }

    /**
     * Set a configuration's parameters.
     *
     * @param string $file
     * @param string $configuration
     * @param array $parameters
     * @return void
     */
    public function set($file, $configuration, $parameters = []){

        // Check if configuration file exists
        if($this->Configurator->check($file)){

            // Load configuration file
            $this->Configurator->add($file);

            if($this->Configurator->get($file)){

                // Load Configurator's configuration file
                $configurations = $this->get($file);

                // Check if configuration exists
                if(isset($configurations[$configuration])){
                    $configurations[$configuration] = array_merge($configurations[$configuration], $parameters);
                } else {
                    $configurations[$configuration] = $parameters;
                }

                // Save configuration file
                $this->Configurator->set('configurator', $file, $configurations);
            }
        }
    }

    /**
     * List all configuration files.
     *
     * @param bool $byFiles
     * @return array
     */
    public function list($byFiles = false){

        // List all configuration files
        return $this->Configurator->list($byFiles);
    }

    /**
     * Retrieve all configuration's parameters.
     *
     * @param string $file
     * @return array
     */
    public function get($file){

        // Skip the configurator file
        if($file !== 'configurator'){

            // Load configuration file
            return $this->Configurator->get('configurator', $file);
        }
    }
}
