<?php

//Declaring namespace
namespace LaswitchTech\coreBase;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLogger\Logger;
use LaswitchTech\coreCSRF\CSRF;

// BaseController Class
class BaseController {

    // Configurator
    protected $Configurator;

	// Logger
	protected $Logger;

    // CSRF
    protected $CSRF;

    // Auth
    protected $Auth = null;
    protected $Public = true; // Control if authentication is required
    protected $Permission = false; // Control if the method requires a permission
    protected $Level = 1; // Control the permission level required
    protected $Namespace = "Namespace>"; // Contains the namespace of the method

    // Properties
    protected $Error = null;
    protected $Method = null;
    protected $QueryString = null;
    protected $GET = null;
    protected $POST = null;
    protected $REQUEST = null;

    /**
     * Constructor
     * @param object $Auth
     */
    public function __construct($Auth = null){

        // Initiate Auth
        $this->Auth = $Auth;

        // Initiate Configurator
        $this->Configurator = new Configurator('controller');

        // Initiate Logger
        $this->Logger = new Logger('controller');

        // Initiate CSRF
        $this->CSRF = new CSRF();

        // Get the request method
        $this->Method = $_SERVER["REQUEST_METHOD"];

        // Add URI segments to the namespace
        foreach($this->getUriSegments() as $Segment){
            $this->Namespace .= "/{$Segment}";
        }

        // Debug Information
        $this->Logger->debug("Namespace: " . $this->Namespace);
        $this->Logger->debug("Public: " . $this->Public);
        $this->Logger->debug("Permission: " . $this->Permission);
        $this->Logger->debug("Level: " . $this->Level);
        $this->Logger->debug("Auth: " . is_null($this->Auth));
        if($this->Auth){
            if($this->Auth->Authentication){
                $this->Logger->debug("isAuthenticated: " . $this->Auth->Authentication->isAuthenticated());
            }
            if($this->Auth->Authorization){
                $this->Logger->debug("hasPermission: " . $this->Auth->Authorization->hasPermission($this->Namespace,$this->Level));
            }
        }

        // Check if the controller is public
        if($this->Auth){
            if(!$this->Public){

                // Check if the user is authenticated
                if(!$this->Auth->Authentication->isAuthenticated()){

                    // Send the output
                    $this->output('Unauthorized', array('HTTP/1.1 401 Unauthorized'));
                }

                // Check if the method requires a permission
                if($this->Permission){

                    // Check if the user has the required permission
                    if(!$this->Auth->Authorization->hasPermission($this->Namespace,$this->Level)){

                        // Send the output
                        $this->output('Forbidden', array('HTTP/1.1 403 Forbidden'));
                    }
                }
            }
        }
    }

    /**
     * Magic Method to catch all undefined methods
     * @param string $name
     * @param array $arguments
     * @return void
     */
    public function __call($name, $arguments) {

        // Log the error
        $this->Logger->error("[".$name."] 501 Not Implemented");

        // Send the output
        $this->output(str_replace('Action','',$name), array('HTTP/1.1 501 Not Implemented'));
    }

    /**
     * Get the URI segments
     * @return array
     */
    protected function getUriSegments() {

        // Get the URI segments
        $URI = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Convert the URI to an array
        $URI = explode( '/', $URI );

        // Remove the first two segments
        array_shift($URI);
        array_shift($URI);

        // Return the URI segments
        return $URI;
    }

    /**
     * Get the request parameters
     * @param string $Type
     * @param string $Key
     * @return mixed
     */
    protected function getParams($Type, $Key = null){

        // Check the type
        switch(strtoupper($Type)){
            case 'GET':
                return $this->getGetParams($Key);
            case 'POST':
                return $this->getPostParams($Key);
            case 'REQUEST':
                return $this->getRequestParams($Key);
            case 'QUERY':
                return $this->getQueryStringParams($Key);
            default:
                return $this->getRequestParams($Key);
        }
    }

    /**
     * Get the query string parameters
     * @param string $Key
     * @return mixed
     */
    protected function getQueryStringParams($Key = null) {

        if($this->QueryString === null){

            // Parse the query string
            parse_str($_SERVER['QUERY_STRING'], $this->QueryString);
        }

        // Check if a key was provided
        if($Key){

            // Check if the key exists
            if(isset($this->QueryString[$Key])){

                // Return the query string value
                return $this->QueryString[$Key];
            } else {

                // Return null
                return null;
            }
        } else {

            // Return the query string
            return $this->QueryString;
        }
    }

    /**
     * Get the GET parameters
     * @param string $Key
     * @return mixed
     */
    protected function getGetParams($Key = null) {

        if($this->GET === null){

            // Initiate the GET array
            $this->GET = array();

            // Decode the GET data
            foreach($_GET as $arrayKey => $arrayValue){

                // Add the decoded data to the GET array
                $this->GET[$arrayKey] = urldecode(base64_decode($arrayValue));
            }
        }

        // Check if a key was provided
        if($Key){

            // Check if the key exists
            if(isset($this->GET[$Key])){

                // Return the GET value
                return $this->GET[$Key];
            } else {

                // Return null
                return null;
            }
        } else {

            // Return the GET
            return $this->GET;
        }
    }

    /**
     * Get the POST parameters
     * @param string $Key
     * @return mixed
     */
    protected function getPostParams($Key = null) {

        if($this->POST === null){

            // Initiate the POST array
            $this->POST = array();

            // Decode the POST data
            foreach($_POST as $arrayKey => $arrayValue){

                // Add the decoded data to the POST array
                $this->POST[$arrayKey] = urldecode(base64_decode($arrayValue));
            }
        }

        // Check if a key was provided
        if($Key){

            // Check if the key exists
            if(isset($this->POST[$Key])){

                // Return the POST value
                return $this->POST[$Key];
            } else {

                // Return null
                return null;
            }
        } else {

            // Return the POST
            return $this->POST;
        }
    }

    /**
     * Get the REQUEST parameters
     * @param string $Key
     * @return mixed
     */
    protected function getRequestParams($Key = null) {

        if($this->REQUEST === null){

            // Initiate the REQUEST array
            $this->REQUEST = array();

            // Decode the REQUEST data
            foreach($_REQUEST as $arrayKey => $arrayValue){

                // Add the decoded data to the REQUEST array
                $this->REQUEST[$arrayKey] = urldecode(base64_decode($arrayValue));
            }
        }

        // Check if a key was provided
        if($Key){

            // Check if the key exists
            if(isset($this->REQUEST[$Key])){

                // Return the REQUEST value
                return $this->REQUEST[$Key];
            } else {

                // Return null
                return null;
            }
        } else {

            // Return the REQUEST
            return $this->REQUEST;
        }
    }

    /**
     * Output the data
     * @param mixed $data
     * @param array $httpHeaders
     * @return void
     */
    protected function output($data, $httpHeaders=array()) {

        // Remove the default Set-Cookie header
        header_remove('Set-Cookie');

        // Add the custom headers
        if (is_array($httpHeaders) && count($httpHeaders)) {

            // Add the headers
            foreach ($httpHeaders as $httpHeader) {

                // Add the header
                header($httpHeader);
            }
        }

        // Check if the data is an array or object
        if(is_array($data) || is_object($data)){

            // Convert the data to JSON
            $data = json_encode($data,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        }

        // Send the output
        echo $data;

        // Exit the script
        exit;
    }
}
