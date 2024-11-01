<?php

// Declaring namespace
namespace LaswitchTech\coreLogger;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseCommand;

class Command extends BaseCommand {

    /**
     * Constructor
     */
	public function __construct($Auth){

        // Namespace: /logger

        // Initialize Logger
        $this->Logger = new Logger();

		// Call the parent constructor
		parent::__construct($Auth);
	}

    /**
     * Retrieve the list of available logs
     */
    public function listAction($argv){

        // Namespace: /logger/list

        // Retrieve the list of logs
        $logs = $this->Logger->list();

        // Check if logs are available
        if($logs){

            // Return the list of logs
            $this->info(json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } else {

            // Return error
            $this->error('Unable to retrieve the list of logs');
        }
    }

    /**
     * Read a log
     */
    public function readAction($argv){

        // Namespace: /logger/read $log

        // Retrieve parameters
        $log = $argv[0] ?? null;

        // Check for required parameters
        if(count($argv) < 1 || empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');
            $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Send the output
            $this->error('Missing required parameters');

            return;
        }

        // Read a log
        $content = $this->Logger->read($log);

        // Return the content
        if($content){

            // Return the content
            $this->info($content);
        } else {

            // Return error
            $this->error('Unable to read log ' . $log);
        }
    }

    /**
     * Clear a log
     */
    public function clearAction($argv){

        // Namespace: /logger/clear $log

        // Retrieve parameters
        $log = $argv[0] ?? null;

        // Check for required parameters
        if(count($argv) < 1 || empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');
            $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Send the output
            $this->error('Missing required parameters');

            return;
        }

        // Clear a log
        $result = $this->Logger->clear($log);

        // Return the result
        if($result){

            // Return the result
            $this->info('Log ' . $log . ' has been cleared');
        } else {

            // Return error
            $this->error('Unable to clear log ' . $log);
        }
    }
}
