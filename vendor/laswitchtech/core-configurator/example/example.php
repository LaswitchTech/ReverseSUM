#!/usr/bin/env php
<?php

// Import Configurator class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreConfigurator\Form;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Configurator
$Configurator = new Configurator('example');

// Initiate Form
$Form = new Form();

// Set a configuration
$Configurator->set('example', 'hostname', 'localhost');

// Set a configuration's parameters
$Form->set('example', 'hostname', [
    'type' => 'text',
    'label' => 'Database Host',
    'default' => 'localhost',
    'required' => true,
    'placeholder' => 'localhost',
    'tooltip' => 'Enter the database host',
    'color' => 'primary',
    'icon' => 'database',
    'options' => [],
]);

// Get class path
echo json_encode($Configurator->path('LaswitchTech\coreConfigurator\Command'), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

// Get list of loaded configuration files
echo json_encode($Form->list(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

// Get list of all configuration files
echo json_encode($Form->list(true), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

// Loop through all configuration files
foreach($Form->list(true) as $file){

    // Retrieve all configuration's parameters
    echo json_encode($Form->get($file), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
}
