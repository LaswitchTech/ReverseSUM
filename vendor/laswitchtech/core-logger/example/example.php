#!/usr/bin/env php
<?php

// Import Logger class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreLogger\Logger;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate coreLogger
$Logger = new Logger('example');

// Configure phpLogger
$Logger->config('ip',true);
$Logger->config('rotation',false);
$Logger->config('level',5);

// Log error
$Logger->error("Lorem Ipsum");

// Log warning
$Logger->warning("Lorem Ipsum");

// Log success
$Logger->success("Lorem Ipsum");

// Log info
$Logger->info("Lorem Ipsum");

// Log debug
$Logger->debug("Lorem Ipsum");

// List all logs
echo json_encode($Logger->list(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

// Read a log
echo json_encode($Logger->read('example'), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
