<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreLocale\Locale;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Locale
$Locale = new Locale();

// Set Locale
$Locale->set('fr-ca');

// Get Translations
var_dump($Locale->get("name"));
var_dump($Locale->get("website"));
var_dump($Locale->get("customs"));
