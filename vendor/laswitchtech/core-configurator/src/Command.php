<?php

// Declaring namespace
namespace LaswitchTech\coreConfigurator;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseCommand;

class Command extends BaseCommand {

    /**
     * Constructor
     */
	public function __construct($Auth){

        // Namespace: /configurator

        // Initialize Configurator
        $this->Configurator = new Configurator();

		// Call the parent constructor
		parent::__construct($Auth);
	}

    /**
     * Set a configuration
     */
    public function setAction($argv){

        // Namespace: /configurator/set $file $configuration $value

        // Retrieve parameters
        $file = $argv[0] ?? null;
        $configuration = $argv[1] ?? null;
        $value = $argv[2] ?? null;

        // Check for required parameters
        if(count($argv) < 3 || empty($file) || empty($configuration) || empty($value)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');
            $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            $this->Logger->debug('$value: ' . json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Send the output
            $this->error('Missing required parameters');

            return;
        }

        // Set a configuration
        if($this->Configurator->set($file, $configuration, $value)){

            // Return success
            $this->success('Configuration ' . $file . '/' . $configuration . ' set to ' . $value);
        } else {

            // Return error
            $this->error('Unable to set configuration ' . $file . '/' . $configuration . ' to ' . $value);
        }
    }

    /**
     * Get a configuration
     */
    public function getAction($argv){

        // Namespace: /configurator/get $file $configuration

        // Retrieve parameters
        $file = $argv[0] ?? null;
        $configuration = $argv[1] ?? null;

        // Check for required parameters
        if(count($argv) < 2 || empty($file) || empty($configuration)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');
            $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            $this->Logger->debug('$value: ' . json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Send the output
            $this->error('Missing required parameters');

            return;
        }

        // Get a configuration
        $value = $this->Configurator->get($file, $configuration);

        // Return the value
        if($value){

            // Check if the value is an array
            if(is_array($value)){

                // Return the value in JSON format
                $this->info(json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            } else {

                // Return the value
                $this->info($value);
            }
        } else {

            // Return error
            $this->error('Unable to retrieve configuration ' . $file . '/' . $configuration);
        }
    }
}
