<?php

// Declaring namespace
namespace LaswitchTech\coreRouter;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLocale\Locale;
use LaswitchTech\coreLogger\Logger;
use LaswitchTech\coreAuth\Auth;
use LaswitchTech\coreCSRF\CSRF;
use Exception;

class Router {

    // Constants
    const HttpCodes = [400,401,403,404,422,423,427,428,429,430,432,500,501];
    const HttpCustomCodes = [427,430,432];
    const HttpLabels = [
        "400" => "Bad Request", // 400 Error Document // Bad Request
        "401" => "Unauthorized", // 401 Error Document // Unauthorized
        "403" => "Forbidden", // 403 Error Document // Forbidden
        "404" => "Not Found", // 404 Error Document // Not Found
        "422" => "Unprocessable Content", // 422 Error Document // Unprocessable Content
        "423" => "Locked", // 423 Error Document // Locked
        "427" => "2FA Required", // 427 Error Document // 2FA Required
        "428" => "Verification Required", // 428 Error Document // Verification Required
        "429" => "Too Many Requests", // 429 Error Document // Too Many Requests
        "430" => "Unauthenticated", // 430 Error Document // Unauthenticated
        "432" => "Unverified", // 432 Error Document // Unverified
        "500" => "Internal Server Error", // 500 Error Document // Internal Server Error
        "501" => "Not Implemented", // 501 Error Document // Not Implemented
    ];

	// core Modules
	private $Configurator;
    private $Locale;
    private $Logger;
    private $Auth;
    private $CSRF;

    // Properties
    protected $Namespace = null;
    protected $Defaults = [
        "view" => null,
        "template" => null,
        "label" => null,
        "icon" => null,
        "color" => null,
        "parent" => null,
        "public" => true,
        "permission" => false,
        "location" => null,
        "action" => null,
        "level" => 1,
        "error" => [
            "400" => null, // 400 Error Document // Bad Request
            "401" => null, // 401 Error Document // Unauthorized
            "403" => null, // 403 Error Document // Forbidden
            "404" => null, // 404 Error Document // Not Found
            "422" => null, // 422 Error Document // Unprocessable Content
            "423" => null, // 423 Error Document // Locked
            "427" => null, // 427 Error Document // 2FA Required
            "428" => null, // 428 Error Document // Verification Required
            "429" => null, // 429 Error Document // Too Many Requests
            "430" => null, // 430 Error Document // Unauthenticated
            "432" => null, // 432 Error Document // Unverified
            "500" => null, // 500 Error Document // Internal Server Error
            "501" => null, // 501 Error Document // Not Implemented
        ],
    ];
    protected $URI = null;
    protected $Vars = null;
    protected $Route = null;
    protected $Routes = [];
    protected $View = null;
    protected $Label = null;
    protected $Icon = null;
    protected $Color = null;
    protected $Parent = null;
    protected $Template = null;
    protected $Location = null;
    protected $Action = null;

    // Controller
    protected $Controller = null;
    protected $Return = null;

    /**
     * Router constructor.
     */
    public function __construct(){

        // Initialize Configurator
        $this->Configurator = new Configurator(['routes','requirements','css','js']);

        // Initiate Logger
        $this->Logger = new Logger('router');

        // Initiate Auth if class exists
        if(class_exists('LaswitchTech\coreAuth\Auth')) $this->Auth = new Auth();

        // Initiate CSRF
        $this->CSRF = new CSRF();

        // Initiate Locale
        $this->Locale = new Locale();

        // Check Requirements
        $this->checkRequirements();

        // Setup Webroot
        $this->genWebroot();

        // Load Models
        $this->loadModels();

        // Load Routes
        $this->loadRoutes();

        // Parse URI
        $this->parseURI();

        // Load Route
        $this->load();
    }

    /**
     * Configure the Router instance.
     *
     * @param string $option
     * @param mixed $value
     * @return $this
     */
    public function config($option, $value){
        try {
            if(is_string($option)){
                switch($option){
                    case"hostnames":
                        if(is_array($value)){

                            // Save to Configurator
                            $this->Configurator->set('auth',$option, $value);
                        } else{
                            throw new Exception("2nd argument must be an array.");
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

            // If an exception is caught, log an error message
            $this->Logger->error('Error: '.$e->getMessage());
        }

        return $this;
    }

    /**
     * Check if the required apache modules are installed
     * @return void
     */
    protected function checkRequirements(){

        // Check Server Requirements
        if($this->Configurator->get('requirements','server')){
            if(strtoupper($this->Configurator->get('requirements','server')) == "APACHE" && strpos($_SERVER['SERVER_SOFTWARE'], 'Apache') === false){
                $this->sendOutput(
                    'This application requires a '.strtoupper($this->Configurator->get('requirements','server')).' server.',
                    array('HTTP/1.1 500 Internal Error'),
                );
            }
        }

        // Check PHP Module Requirements
        if($this->Configurator->get('requirements','php')){
            foreach($this->Configurator->get('requirements','php') as $module){
                if(!in_array(get_loaded_extensions(strtolower($module)))){
                    $this->sendOutput(
                        'This application requires the '.strtoupper($module).' module: '.strtolower($module).'.',
                        array('HTTP/1.1 500 Internal Error'),
                    );
                }
            }
        }

        // Check Apache Module Requirements
        if($this->Configurator->get('requirements','apache')){
            foreach($this->Configurator->get('requirements','apache') as $module){
                if(function_exists('apache_get_modules')){
                    if(!in_array(strtolower($module),apache_get_modules())){
                        $this->sendOutput(
                            'This application requires the '.strtoupper($module).' module: '.strtolower($module).'.',
                            array('HTTP/1.1 500 Internal Error'),
                        );
                    }
                } else {
                    $this->sendOutput('This application requires a '.strtoupper($server).' server with ' . $module . ' module enabled.', array('HTTP/1.1 500 Internal Error'));
                }
            }
        }
    }

    /**
     * Generate the Webroot
     */
    protected function genWebroot(){

        // Create Webroot
        if(!is_dir($this->Configurator->root() . '/webroot')){
            mkdir($this->Configurator->root() . '/webroot', 0755, true);
        }

        // Create Webroot Symlinks
        $directories = $this->scandir('dist','directory');
        foreach($directories as $directory){
            if(!str_starts_with($directory,'/')){ $directory = '/' . $directory; }
            $link = $this->Configurator->root() . '/webroot' . $directory;
            $target = $this->Configurator->root() . '/dist'.$directory;
            if(is_dir($target) && !is_dir($link) && !is_file($link)){
                chmod($target, 0755);
                symlink($target, $link);
            }
        }

        // Create Webroot API Symlinks
        $link = $this->Configurator->root() . '/webroot'.'/api.php';
        $target = $this->Configurator->root() . '/api.php';
        if(!is_file($link) && is_file($target)){
            chmod($target, 0755);
            symlink($target, $link);
        }

        // Create .htaccess files
        $this->genHTAccess();

        // Create Webroot index.php
        $this->genIndex();
    }

    /**
     * Generate the .htaccess files
     */
    protected function genHTAccess(){

        // Generate List of Error Documents
        $errors = '';

        // Add Error Documents
        foreach(self::HttpCodes as $Code){
            if(in_array($Code,self::HttpCustomCodes)){
                continue;
            }
            $file = $this->Configurator->root() . '/View/'.$Code.'.php';
            if(is_file($file)){
                $errors .= 'ErrorDocument '.$Code.' "' . $file . '"' . PHP_EOL;
            }
        }
        if($errors != ''){
            $errors .= PHP_EOL;
        }

        // Create root .htaccess if it doesn't exist
        if(!is_file($this->Configurator->root() . '/.htaccess')){

            // Initialize .htaccess
            $htaccess = $errors;

            // Apache Headers
            $htaccess .= "<IfModule mod_headers.c>" . PHP_EOL;
            $htaccess .= "  RequestHeader unset Proxy" . PHP_EOL;
            $htaccess .= "</IfModule>" . PHP_EOL;
            $htaccess .= PHP_EOL;

            // Apache Rewrite Engine
            $htaccess .= "<IfModule mod_rewrite.c>" . PHP_EOL;
            $htaccess .= "  RewriteEngine on" . PHP_EOL;
            $htaccess .= "  RewriteRule ^(\.well-known/.*)$ $1 [L]" . PHP_EOL;
            $htaccess .= "  RewriteRule ^$ webroot/ [L]" . PHP_EOL;
            $htaccess .= "  RewriteRule (.*) webroot/$1 [L]" . PHP_EOL;
            $htaccess .= "</IfModule>" . PHP_EOL;
            $htaccess .= PHP_EOL;

            file_put_contents($this->Configurator->root() . '/.htaccess', trim($htaccess));
        }

        // Create webroot .htaccess if it doesn't exist
        if(!is_file($this->Configurator->root() . '/webroot/.htaccess')){

            // Initialize .htaccess
            $htaccess = $errors;

            // Apache Headers
            $htaccess .= "<IfModule mod_headers.c>" . PHP_EOL;
            $htaccess .= "  RequestHeader unset Proxy" . PHP_EOL;
            $htaccess .= "</IfModule>" . PHP_EOL;
            $htaccess .= PHP_EOL;

            // Apache Rewrite Engine
            $htaccess .= "<IfModule mod_rewrite.c>" . PHP_EOL;
            $htaccess .= "  RewriteEngine On" . PHP_EOL;
            $htaccess .= "  RewriteBase /" . PHP_EOL;
            $htaccess .= "  RewriteCond %{REQUEST_FILENAME} !-d" . PHP_EOL;
            $htaccess .= "  RewriteCond %{REQUEST_FILENAME} !-f" . PHP_EOL;
            $htaccess .= "  RewriteRule ^(.+)$ index.php [QSA,L]" . PHP_EOL;
            $htaccess .= "  RewriteRule ^cli - [F,L]" . PHP_EOL;
            $htaccess .= "  RewriteRule ^.htaccess - [F,L]" . PHP_EOL;
            $htaccess .= "</IfModule>" . PHP_EOL;
            $htaccess .= PHP_EOL;

            file_put_contents($this->Configurator->root() . '/webroot/.htaccess', trim($htaccess));
        }
    }

    /**
     * Generate the index.php file
     */
    protected function genIndex(){

        // Create index.php if it doesn't exist
        $file = $this->Configurator->root() . '/webroot/index.php';
        if(!is_file($file)){
            $index = '';
            $index .= '<?php' . PHP_EOL . PHP_EOL;
            $index .= '// Initiate Session' . PHP_EOL;
            $index .= 'if(session_status() !== PHP_SESSION_ACTIVE){' . PHP_EOL;
            $index .= '  session_start();' . PHP_EOL;
            $index .= '}' . PHP_EOL;
            $index .= PHP_EOL;
            $index .= '// Import coreRouter class into the global namespace' . PHP_EOL;
            $index .= 'use LaswitchTech\coreRouter\Router;' . PHP_EOL;
            $index .= PHP_EOL;
            $index .= '// Load Composer\'s autoloader' . PHP_EOL;
            $index .= 'require dirname(__DIR__) . "/vendor/autoload.php";' . PHP_EOL;
            $index .= PHP_EOL;
            $index .= '// Initiate coreRouter' . PHP_EOL;
            $index .= '$Router = new Router();' . PHP_EOL;
            $index .= PHP_EOL;
            $index .= '// Render Request' . PHP_EOL;
            $index .= '$Router->render();' . PHP_EOL;
            file_put_contents($file, trim($index));
        }
    }

    /**
     * Load all models
     */
    protected function loadModels(){
        // Include all model files
        if(is_dir($this->Configurator->root() . "/Model")){
            foreach(scandir($this->Configurator->root() . "/Model/") as $model){
                if(str_contains($model, 'Model.php')){
                    require_once $this->Configurator->root() . "/Model/" . $model;
                }
            }
        }
    }

    /**
     * Load all routes
     */
    protected function loadRoutes(){

        // Set Error Routes
        foreach(self::HttpCodes as $Code){
            $Code = strval($Code);
            $file = $this->Configurator->root() . '/View/'.$Code.'.php';
            if(is_file($file)){
                $this->Defaults['error'][$Code] = $Code;
            }
        }

        // Load Error Routes
        foreach(self::HttpCodes as $Code){
            $file = $this->Configurator->root() . '/View/'.$Code.'.php';
            if(is_file($file)){
                $this->add(strval($Code), '/View/'.$Code.'.php', ['label' => self::HttpLabels[$Code]]);
            }
        }

        // Load Routes
        if($this->Configurator->get('routes','routes')){
            foreach($this->Configurator->get('routes','routes') as $route => $param){

                // Set Route Parameters
                if(array_key_exists('view',$param)){
                    $this->add(strval($route), $param['view'], $param);
                }
            }
        }
    }

    /**
     * Add a new route
     *
     * @param string $route
     * @param string $view
     * @param array $options
     *
     * @return bool
     */
    public function add($route, $view, $options = []){

        // Set Defaults
        $defaults = $this->Defaults;

        // Set Options
        if(!is_array($options)){
            $options = [];
        }

        // Set Route Parameters
        foreach($options as $key => $value){
            if(array_key_exists($key,$defaults)){
                if(is_array($defaults[$key])){
                    if(is_array($value)){
                        foreach($value as $k => $v){
                            if(array_key_exists($k,$defaults[$key])){
                                $defaults[$key][$k] = $v;
                            }
                        }
                    }
                } else {
                    $defaults[$key] = $value;
                }
            }
        }

        // Set View
        $defaults['view'] = $view;

        // Add Route
        if($view != null && is_file($this->Configurator->root() . '/' . $view) && ($defaults['template'] == null || is_file($this->Configurator->root() . '/' . $defaults['template']))){

            // Set Route
            $this->Routes[strval($route)] = $defaults;

            // Return true
            return true;
        }

        // Return false
        return false;
    }

    /**
     * Load the route
     *
     * @param string $route
     * @return bool
     */
    public function load($route = null){

        // Load Default Route
        if($route == null) { $route = $this->Namespace; }

        // Set Namespace as Route
        $namespace = $route;

        // Log Namespace
        $this->Logger->debug("Namespace: " . $namespace);

        if(!array_key_exists($route,$this->Routes)){

            // Set Route as 404 - Not Found
            $namespace = '404';

            // Return
            return $this->set($namespace);
        }

        // Load 401 - Unauthorized Route if Auth is set and Route is not public and User is not authorized
        if($this->Auth !== null && !$this->Routes[$route]['public'] && !$this->isAuthorized()){

            // Set Route as 401 - Unauthorized
            $namespace = '401';

            // Return
            return $this->set($namespace);
        }

        // Check if Auth is set, Route is not public and User is not authenticated
        if($this->Auth !== null && !$this->Routes[$route]['public'] && !$this->isAuthenticated()){

            // Set Route as 430 - Unauthenticated
            $namespace = '430';

            // Check if 430 Error Document is set
            if(array_key_exists('430', $this->Routes[$route]['error']) && $this->Routes[$route]['error']['430'] !== null){
                $namespace = $this->Routes[$route]['error']['430'];
            }

            // If 2FA is enabled and the user is not authenticated
            // Set Route as 427 - 2FA Required
            if($this->Auth->Authentication->is2FAReady()){
                $namespace = '427';

                // Check if 427 Error Document is set
                if(array_key_exists('427', $this->Routes[$route]['error']) && $this->Routes[$route]['error']['427'] !== null){
                    $namespace = $this->Routes[$route]['error']['427'];
                }
            }
        }

        // Check if Auth is set, Route is not public and User is authenticated
        if($this->Auth !== null && !$this->Routes[$route]['public'] && $this->isAuthenticated()){

            // If User is verified
            if($this->Auth->Authentication->isVerified()){

                // Check if Route has permission
                if($this->Routes[$route]['permission'] && !$this->hasPermission("Route>" . $this->Namespace, $this->Routes[$route]['level'])){

                    // Set Route as 403 - Forbidden
                    $namespace = '403';

                    // Check if 403 Error Document is set
                    if(array_key_exists('403', $this->Routes[$route]['error']) && $this->Routes[$route]['error']['403'] !== null){
                        $namespace = $this->Routes[$route]['error']['403'];
                    }
                }
            } else {

                // Set Route as 432 - Email Not Verified
                $namespace = '432';

                // Check if 432 Error Document is set
                if(array_key_exists('432', $this->Routes[$route]['error']) && $this->Routes[$route]['error']['432'] !== null){
                    $namespace = $this->Routes[$route]['error']['432'];
                }
            }
        }

        // Set Route
        return $this->set($namespace);
    }

    /**
     * Set the route
     *
     * @param string $route
     * @return bool
     */
    protected function set($route){

        // Load Default Route
        if($route == null) { $route = $this->Namespace; }

        // Load Route
        if(array_key_exists($route,$this->Routes)){

            // Set Route
            $this->Route = $route;
            $this->View = $this->Routes[$this->Route]['view'];
            $this->Template = $this->Routes[$this->Route]['template'];
            $this->Label = $this->Routes[$this->Route]['label'];
            $this->Icon = $this->Routes[$this->Route]['icon'];
            $this->Color = $this->Routes[$this->Route]['color'];
            $this->Parent = $this->Routes[$this->Route]['parent'];
            $this->Location = $this->Routes[$this->Route]['location'];
            $this->Action = $this->Routes[$this->Route]['action'];

            // Return true
            return true;
        }

        // Return false
        return false;
    }

    /**
     * Render the route
     */
    public function render(){

        // Call the corresponding action
        if($this->Action){ $this->Return = $this->callAction(); }

        // Render the corresponding view

        // Render the template if it is set
        if($this->Template !== null){ require $this->getTemplateFile(); return $this->Template; }

        // Render the view if it is set
        if($this->View !== null){ require $this->getViewFile(); return $this->View; }

        // Log rendering informations
        $this->Logger->debug("Route: " . $this->Route);
        $this->Logger->debug("View: " . $this->View);
        $this->Logger->debug("Template: " . $this->Template);

        // Render the error document
        if(in_array($this->Route,self::HttpCodes)){
            http_response_code(intval($this->Route));
        } else {
            http_response_code(500);
        }
    }

    /**
     * Call the action
     */
    protected function callAction() {
        list($controllerName, $actionName) = explode('/', $this->Action);
        $controllerClass = ucfirst($controllerName) . 'Controller';
        $actionMethod = $actionName . 'RouterAction';
        if(is_file($this->Configurator->root() . "/Controller/" . $controllerClass . ".php")){

            // Load Controller
            require $this->Configurator->root() . "/Controller/" . $controllerClass . ".php";

            // Check if the class exists
            if(!class_exists($controllerClass)){
                $this->load('500');
                return 'Could not find Controller';
            }

            // Create Controller
            $this->Controller = new $controllerClass($this->Auth);

            // Check if the method exists
            if(!method_exists($controllerClass, $actionMethod)){
                $this->load('500');
                return "Action $actionMethod not found in controller $controllerClass.";
            }

            // Call the method
            return $this->Controller->$actionMethod($this);
        } else {

            // Could not find Controller
            $this->load('500');
            return 'Could not find Controller file';
        }

        $this->load('500');
        return 'Unknown Error Occured';
    }

    // Getters

    /**
     * Get the URI
     *
     * @return string
     */
    protected function getURI(){ return $this->URI; }

    /**
     * Get the Namespace
     *
     * @return string
     */
    protected function getNamespace(){ return $this->Namespace; }

    /**
     * Get the Vars
     *
     * @return array
     */
    protected function getVars(){ return $this->Vars; }

    /**
     * Get the Route
     *
     * @return string
     */
    protected function getRoute(){ return $this->Route; }

    /**
     * Get the Label
     *
     * @return string
     */
    protected function getLabel(){ return $this->Label; }

    /**
     * Get the Icon
     *
     * @return string
     */
    protected function getIcon(){ return $this->Icon; }

    /**
     * Get the Color
     *
     * @return string
     */
    protected function getColor(){ return $this->Color; }

    /**
     * Get the Parent
     *
     * @return string
     */
    protected function getLocation(){ return $this->Location; }

    /**
     * Get the Action
     *
     * @return string
     */
    protected function getRoutes(){ return $this->Routes; }

    /**
     * Get the View
     *
     * @return string
     */
    protected function getView(){ return $this->View; }

    /**
     * Get the View File
     *
     * @return string
     */
    protected function getViewFile(){ return $this->Configurator->root() . '/' . $this->View; }

    /**
     * Get the Template
     *
     * @return string
     */
    protected function getTemplate(){ return $this->Template; }

    /**
     * Get the Template File
     *
     * @return string
     */
    protected function getTemplateFile(){
        return $this->Configurator->root() . '/' . $this->Template;
    }

    /**
     * Get the Parent
     *
     * @return string
     */
    protected function getParent(){ return $this->Parent; }

    // Helper Methods

    /**
     * Parse the URI
     */
    protected function parseURI(){

        // Parse URI
        if($this->URI == null){ $this->URI = $_SERVER['REQUEST_URI']; }
        if($this->URI == ''){ $this->URI = '/'; }
        $this->URI = explode('?',$this->URI);

        // Parse Namespace
        if(is_array($this->URI)){
            $this->Namespace = $this->URI[0];
        } else {
            $this->Namespace = $this->URI;
        }

        // Parse Vars
        if(is_array($this->URI) && count($this->URI) > 1){
            $vars = $this->URI[1];
            $this->Vars = [];
            foreach(explode('&',$vars) as $var){
                $params = explode('=',$var);
                if(count($params) > 1){ $this->Vars[$params[0]] = $params[1]; }
                else { $this->Vars[$params[0]] = true; }
            }
        }
    }

    /**
     * Send the output
     *
     * @param $data
     * @param array $httpHeaders
     * @return void
     */
    protected function sendOutput($data, $httpHeaders=array()) {

        // Remove the default Set-Cookie header
        header_remove('Set-Cookie');

        // Add the custom headers
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
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

    /**
     * Scan a directory
     *
     * @param string $directory
     * @param string $filter
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
     * Check if the user is authenticated
     *
     * @return bool
     */
    protected function isAuthenticated(){

        // Return the authentication status
        return ($this->Auth !== null && $this->Auth->Authentication !== null && $this->Auth->Authentication->isAuthenticated());
    }

    /**
     * Check if the user is authorized
     *
     * @return bool
     */
    protected function isAuthorized(){

        // Return the Authorization status
        return ($this->Auth !== null && $this->Auth->Authorization !== null && $this->Auth->Authorization->isAuthorized());
    }

    /**
     * Check if the user has permission
     *
     * @param string $permissionName
     * @param int $requiredLevel
     * @return bool
     */
    protected function hasPermission($permissionName, $requiredLevel = 1){

        // Return the permission status
        return ($this->Auth !== null && $this->Auth->Authorization !== null && $this->Auth->Authorization->hasPermission($permissionName, $requiredLevel = 1));
    }

    /**
     * Get a menu
     *
     * @param string $location
     * @param string $parent
     * @return array
     */
    protected function menu($location = 'sidebar', $parent = null) {
        $menu = [];
        foreach($this->getRoutes() as $route => $param) {
            if($parent){
                if(!isset($param['parent']) || $param['parent'] !== $parent) continue;
            }
            if($param['template'] !== $this->getTemplate()) continue;
            if(!isset($param['location'])) continue;
            if(is_string($param['location']) && $param['location'] !== $location) continue;
            if(is_array($param['location']) && !in_array($location,$param['location'])) continue;
            if(!$param['public'] && !$this->isAuthenticated()) continue;
            if(!$param['public'] && $param['permission'] && !$this->hasPermission("Route>" . $route, $param['level'])) continue;

            $parts = array_filter(explode('/', $route));
            if(empty($parts)) continue;

            $current = &$menu;
            $accumulated_route = "";
            foreach($parts as $part) {
                $accumulated_route .= "/$part";

                // Create intermediate nodes with default parameters if they don't exist
                if(!isset($current[$part])) {
                    $current[$part] = ['label' => ucfirst($part), 'icon' => 'default-icon', 'link' => $accumulated_route, 'items' => []];
                }

                // If we're at the last part of the route, override the parameters with the ones provided in $param
                if ($part === end($parts)) {
                    $current[$part]['label'] = $param['label'];
                    $current[$part]['icon'] = $param['icon'];
                    $current[$part]['color'] = $param['color'];
                    $current[$part]['parent'] = $param['parent'];
                    $current[$part]['view'] = $param['view'];
                    $current[$part]['link'] = $route;
                }

                $current = &$current[$part]['items'];
            }
        }

        return $menu;
    }

    /**
     * Generate the HTML tags for the CSS files
     */
    protected function css(){
        $html = '';
        $css = $this->Configurator->get('css');
        foreach($css as $file){
            if(is_file($this->Configurator->root().'/webroot/'.trim($file,'/'))){
                $html .= '<link rel="stylesheet" type="text/css" href="/'.trim($file,'/').'">' . PHP_EOL;
            }
        }
        return $html;
    }

    /**
     * Generate the HTML tags for the JS files
     */
    protected function js(){
        $html = '';
        $js = $this->Configurator->get('js');
        foreach($js as $file){
            if(is_file($this->Configurator->root().'/webroot/'.trim($file,'/'))){
                $html .= '<script src="/'.trim($file,'/').'"></script>' . PHP_EOL;
            }
        }
        return $html;
    }

    /**
     * Check if the required modules are installed
     *
     * @return bool
     */
    protected function isInstalled(){

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
                if(!$class->isInstalled()){
                    return false;
                }
            }
        }

        // Return true
        return true;
    }
}
