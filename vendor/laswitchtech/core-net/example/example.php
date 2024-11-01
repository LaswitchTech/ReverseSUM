<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreNet\Net;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Net
$Net = new Net();

// Scan a Port
foreach(["127.0.0.1" => 3306,"127.0.0.1" => "sql","127.0.0.1" => 80] as $host => $port){
    echo "Port " . $host . ":" . $port . " is " . ($Net->scan($host,$port) ? "Open" : "Closed") . PHP_EOL;
}

// Ping an IP
foreach(["127.0.0.1","google.com","8.8.8.8"] as $ip){
    echo "Ping to " . $ip . " is " . $Net->ping($ip) . "ms" . PHP_EOL;
}

// Lookup a Domain
foreach(["google.com","google.ca","facebook.com","apple.com"] as $dns){
    echo "Lookup " . $dns . PHP_EOL;
    foreach($Net->lookup($dns) as $key => $value){
        echo $key . ": " . $value . PHP_EOL;
    }
}
