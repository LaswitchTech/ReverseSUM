<?php

// Declaring namespace
namespace LaswitchTech\coreConfigurator;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseController;

class Controller extends BaseController {

    /**
     * Constructor
     * @param object $Auth
     */
	public function __construct($Auth){

        // Namespace: /configurator

		// Set the controller Authentication Policy
		$this->Public = true; // Set to false to require authentication

		// Set the controller Authorization Policy
		$this->Permission = false; // Set to true to require a permission for the namespace used.
		$this->Level = 1; // Set the permission level required

		// Call the parent constructor
		parent::__construct($Auth);
	}

    /**
     * Set a configuration using coreAPI
     *
     * @param string $file
     * @param string $configuration
     * @param string|array $value
     * @return void
     */
    public function setAction(){

        // Namespace: /configurator/set $file $configuration $value

        // Debug information
        $this->Logger->debug('Namespace: /configurator/set $file $configuration $value');
        $this->Logger->debug('Extending: coreAPI');

        // Check for required parameters
        $file = $this->getParams('REQUEST', 'file');
        $configuration = $this->getParams('REQUEST', 'configuration');
        $value = $this->getParams('REQUEST', 'value');

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$value: ' . json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameters
        if(empty($file) || empty($configuration) || empty($value)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');

            // Send the output
            $this->output(
                ['error' => 'Missing required parameters'],
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

        // Set a configuration
        if($this->Configurator->set($file, $configuration, $value)){

            // Send the output
            $this->output(
                'Configuration ' . $file . '/' . $configuration . ' set to ' . $value,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {

            // Log error and debug information
            $this->Logger->error('Unable to set configuration ' . $file . '/' . $configuration . ' to ' . $value);

            // Send the output
            $this->output(
                ['error' => 'Unable to set configuration ' . $file . '/' . $configuration . ' to ' . $value],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    /**
     * Set a configuration using coreRouter
     *
     * @param string $file
     * @param string $configuration
     * @param string|array $value
     * @return void
     */
    public function setRouterAction(){

        // Namespace: /configurator/set $file $configuration $value

        // Debug information
        $this->Logger->debug('Namespace: /configurator/set $file $configuration $value');
        $this->Logger->debug('Extending: coreRouter');

        // Check for required parameters
        $file = isset($_GET['file']) ? $_GET['file'] : null;
        $configuration = isset($_GET['configuration']) ? $_GET['configuration'] : null;
        $value = isset($_POST['value']) ? $_POST['value'] : null;

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$value: ' . json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameters
        if(empty($file) || empty($configuration) || empty($value)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');

            // Return
            return ['error' => 'Missing required parameters'];
        }

        // Validate CSRF token
        if(!$this->CSRF->validate()){

            // Log error and debug information
            $this->Logger->error('Invalid CSRF token');
            $this->Logger->debug('$token: ' . json_encode($this->CSRF->token(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Return
            return ['error' => 'Invalid CSRF token'];
        }

        // Set a configuration
        if($this->Configurator->set($file, $configuration, $value)){

            // Return
            return 'Configuration ' . $file . '/' . $configuration . ' set to ' . $value;
        } else {

            // Log error and debug information
            $this->Logger->error('Unable to set configuration ' . $file . '/' . $configuration . ' to ' . $value);

            // Return
            return ['error' => 'Unable to set configuration ' . $file . '/' . $configuration . ' to ' . $value];
        }
    }

    /**
     * Get a configuration using coreAPI
     *
     * @param string $file
     * @param string $configuration
     * @return void
     */
    public function getAction(){

        // Namespace: /configurator/get $file $configuration

        // Debug information
        $this->Logger->debug('Namespace: /configurator/get $file $configuration');
        $this->Logger->debug('Extending: coreAPI');

        // Check for required parameters
        $file = $this->getParams('REQUEST', 'file');
        $configuration = $this->getParams('REQUEST', 'configuration');

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameters
        if(empty($file) || empty($configuration)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');

            // Send the output
            $this->output(
                ['error' => 'Missing required parameters'],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );

            return;
        }

        // Get a configuration
        $value = $this->Configurator->get($file, $configuration);

        // Send the output
        $this->output(
            $value,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Get a configuration using coreRouter
     *
     * @param string $file
     * @param string $configuration
     * @return void
     */
    public function getRouterAction(){

        // Namespace: /configurator/get $file $configuration

        // Debug information
        $this->Logger->debug('Namespace: /configurator/get $file $configuration');
        $this->Logger->debug('Extending: coreRouter');

        // Check for required parameters
        $file = isset($_GET['file']) ? $_GET['file'] : null;
        $configuration = isset($_GET['configuration']) ? $_GET['configuration'] : null;

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->Logger->debug('$configuration: ' . json_encode($configuration, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameters
        if(empty($file) || empty($configuration)){

            // Log error and debug information
            $this->Logger->error('Missing required parameters');

            // Return
            return ['error' => 'Missing required parameters'];
        }

        // Get a configuration
        $value = $this->Configurator->get($file, $configuration);

        // Return
        return $value;
    }

    /**
     * Get a list of configurations using coreAPI
     *
     * @return void
     */
    public function listAction(){

        // Namespace: /configurator/list $all = false

        // Debug information
        $this->Logger->debug('Namespace: /configurator/list $all = false');
        $this->Logger->debug('Extending: coreAPI');

        // Check for optional parameter
        $all = isset($_GET['all']) ? boolval($_GET['all']) : false;

        // Debug information
        $this->Logger->debug('$all: ' . json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Get list of loaded configuration files
        $files = $this->Configurator->list($all);

        // Send the output
        $this->output(
            $files,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Get a list of configurations using coreRouter
     *
     * @return void
     */
    public function listRouterAction(){

        // Namespace: /configurator/list $all = false

        // Debug information
        $this->Logger->debug('Namespace: /configurator/list $all = false');
        $this->Logger->debug('Extending: coreRouter');

        // Check for optional parameter
        $all = isset($_GET['all']) ? boolval($_GET['all']) : false;

        // Debug information
        $this->Logger->debug('$all: ' . json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Get list of loaded configuration files
        $files = $this->Configurator->list($all);

        // Return
        return $files;
    }

    /**
     * Get a list of configuration's parameters using coreAPI
     *
     * @return void
     */
    public function parametersAction(){

        // Namespace: /configurator/parameters $file

        // Debug information
        $this->Logger->debug('Namespace: /configurator/parameters $file');
        $this->Logger->debug('Extending: coreAPI');

        // Check for required parameter
        $file = $this->getParams('REQUEST', 'file');

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($file)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Send the output
            $this->output(
                ['error' => 'Missing required parameter'],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );

            return;
        }

        // Get list of configuration's parameters
        $parameters = $this->Form->get($file);

        // Send the output
        $this->output(
            $parameters,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Get a list of configuration's parameters using coreRouter
     *
     * @return void
     */
    public function parametersRouterAction(){

        // Namespace: /configurator/parameters $file

        // Debug information
        $this->Logger->debug('Namespace: /configurator/parameters $file');
        $this->Logger->debug('Extending: coreRouter');

        // Check for required parameter
        $file = isset($_GET['file']) ? $_GET['file'] : null;

        // Debug information
        $this->Logger->debug('$file: ' . json_encode($file, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Validate parameter
        if(empty($file)){

            // Log error and debug information
            $this->Logger->error('Missing required parameter');

            // Return
            return ['error' => 'Missing required parameter'];
        }

        // Get list of configuration's parameters
        $parameters = $this->Form->get($file);

        // Return
        return $parameters;
    }
}
