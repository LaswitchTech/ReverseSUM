<?php
session_start();

// Import additionnal class into the global namespace
use LaswitchTech\coreCSRF\CSRF;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate CSRF
$CSRF = new CSRF();

// Configure field
$CSRF->config('field', 'csrf_token');

// Retrieve CSRF Token
$token = $CSRF->token();

// Verify CSRF Token
if($CSRF->validate($token)){
    echo 'CSRF Token is valid' . PHP_EOL;
} else {
    echo 'CSRF Token is invalid' . PHP_EOL;
}
