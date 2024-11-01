<?php

// Declaring namespace
namespace LaswitchTech\coreLogger;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseController;

class Controller extends BaseController {

    /**
     * Constructor
     * @param object $Auth
     */
	public function __construct($Auth){

        // Namespace: /logger

		// Set the controller Authentication Policy
		$this->Public = true; // Set to false to require authentication

		// Set the controller Authorization Policy
		$this->Permission = false; // Set to true to require a permission for the namespace used.
		$this->Level = 1; // Set the permission level required

		// Call the parent constructor
		parent::__construct($Auth);
	}

    /**
     * Get a list of logs using coreAPI
     *
     * @return void
     */
    public function listAction(){

        // Namespace: /logger/list

        // Debug information
        $this->Logger->debug('Namespace: /logger/list');
        $this->Logger->debug('Extending: coreAPI');

        // Get list of logs
        $logs = $this->Logger->list();

        // Send the output
        $this->output(
            $logs,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Get a list of logs using coreRouter
     *
     * @return void
     */
    public function listRouterAction(){

        // Namespace: /logger/list

        // Debug information
        $this->Logger->debug('Namespace: /logger/list');
        $this->Logger->debug('Extending: coreRouter');

        // Get list of logs
        $logs = $this->Logger->list();

        // Return
        return $logs;
    }

    /**
     * Read a log using coreAPI
     *
     * @param string $log
     * @return void
     */
    public function readAction(){

        // Namespace: /logger/read $log

        // Debug information
        $this->Logger->debug('Namespace: /logger/read $log');
        $this->Logger->debug('Extending: coreAPI');

        // Check for required parameter
        $log = $this->getParams('REQUEST', 'log');

        // Debug information
        $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Send the output
            $this->output(
                ['error' => 'Missing required parameter'],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );

            return;
        }

        // Read a log
        $content = $this->Logger->read($log);

        // Send the output
        $this->output(
            $content,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Read a log using coreRouter
     *
     * @param string $log
     * @return void
     */
    public function readRouterAction(){

        // Namespace: /logger/read $log

        // Debug information
        $this->Logger->debug('Namespace: /logger/read $log');
        $this->Logger->debug('Extending: coreRouter');

        // Check for required parameter
        $log = isset($_GET['log']) ? $_GET['log'] : null;

        // Debug information
        $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Return
            return ['error' => 'Missing required parameter'];
        }

        // Read a log
        $content = $this->Logger->read($log);

        // Return
        return $content;
    }

    /**
     * Clear a log using coreAPI
     *
     * @param string $log
     * @return void
     */
    public function clearAction(){

        // Namespace: /logger/clear $log

        // Debug information
        $this->Logger->debug('Namespace: /logger/clear $log');
        $this->Logger->debug('Extending: coreAPI');

        // Check for required parameter
        $log = $this->getParams('REQUEST', 'log');

        // Debug information
        $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Send the output
            $this->output(
                ['error' => 'Missing required parameter'],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );

            return;
        }

        // Validate CSRF token
        if(!$this->CSRF->validate()){

            // Log error and debug information
            $this->Logger->error('Invalid CSRF token');
            $this->Logger->debug('$token: ' . json_encode($this->CSRF->token(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Send the output
            $this->output(
                ['error' => 'Invalid CSRF token'],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );

            return;
        }

        // Clear a log
        if($this->Logger->clear($log)){

            // Send the output
            $this->output(
                'Log ' . $log . ' cleared',
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {

            // Log error and debug information
            $this->Logger->error('Unable to clear log ' . $log);

            // Send the output
            $this->output(
                ['error' => 'Unable to clear log ' . $log],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    /**
     * Clear a log using coreRouter
     *
     * @param string $log
     * @return void
     */
    public function clearRouterAction(){

        // Namespace: /logger/clear $log

        // Debug information
        $this->Logger->debug('Namespace: /logger/clear $log');
        $this->Logger->debug('Extending: coreRouter');

        // Check for required parameter
        $log = isset($_GET['log']) ? $_GET['log'] : null;

        // Debug information
        $this->Logger->debug('$log: ' . json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($log)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Return
            return ['error' => 'Missing required parameter'];
        }

        // Validate CSRF token
        if(!$this->CSRF->validate()){

            // Log error and debug information
            $this->Logger->error('Invalid CSRF token');
            $this->Logger->debug('$token: ' . json_encode($this->CSRF->token(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Return
            return ['error' => 'Invalid CSRF token'];
        }

        // Clear a log
        if($this->Logger->clear($log)){

            // Return
            return 'Log ' . $log . ' cleared';
        } else {

            // Log error and debug information
            $this->Logger->error('Unable to clear log ' . $log);

            // Return
            return ['error' => 'Unable to clear log ' . $log];
        }
    }
}
