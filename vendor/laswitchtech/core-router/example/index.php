<?php

// Initiate Session
if(session_status() !== PHP_SESSION_ACTIVE){
    session_start();
}

//Import coreRouter class into the global namespace
use LaswitchTech\coreRouter\Router;

if(!is_file(__DIR__ . '/webroot/index.php')){

    //Load Composer's autoloader
    require __DIR__ . "/vendor/autoload.php";

    //Initiate Router
    $Router = new Router();
}

require __DIR__ . '/webroot/index.php';
