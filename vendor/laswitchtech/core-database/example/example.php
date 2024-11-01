<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreDatabase\Database;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Database
$Database = new Database();

// Configure Database, you can also use a config file
$Database->config("host","localhost")->config("username","demo")->config("password","demo")->config("database","demo1");

// Connect to Database if not connected
if(!$Database->isConnected()){
    $Database->connect();
}

// Set $Database as a global variable
$GLOBALS['Database'] = $Database;

// Example 1: Create a table
function install(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if(!$Database->getTable("version")){
            // Create table
            $Database->create('version',[
                'version' => [
                'type' => 'BIGINT(10)',
                'extra' => ['UNSIGNED','PRIMARY KEY']
                ]
            ]);
        }
    }
}

// Example 2: Alter a table
function alter(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Alter table (add column)
            $Database->alter('version',[
                'status' => [
                'action' => 'ADD',
                'type' => 'INT(1)',
                'extra' => ['NOT NULL','DEFAULT 0']
                ],
            ]);
            // Alter table (modify column)
            $Database->alter('version',[
                'status' => [
                'action' => 'MODIFY',
                'type' => 'INT(1)',
                'extra' => ['NULL']
                ],
            ]);
            // Alter table (drop column)
            $Database->alter('version',[
                'status' => [
                'action' => 'DROP COLUMN'
                ],
            ]);
        }
    }
}

// Example 3: Drop a table
function uninstall(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Drop table
            $Database->drop('version');
        }
    }
}

// Example 4: Insert Data
function insert(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Insert data
            $version = $Database->insert("INSERT INTO version (database) VALUES (?)", [1]);
        }
    }
}

// Example 5: Select Data
function select(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Select data
            $version = $Database->select("SELECT * FROM version WHERE database = ?", [1]);
        }
    }
}

// Example 6: Update Data
function update(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Update data
            $version = $Database->update("UPDATE version SET database = ? WHERE database = ?", [2,1]);
        }
    }
}

// Example 7: Delete Data
function delete(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Check if table exists (optional)
        if($Database->getTable("version")){
            // Delete data
            $version = $Database->delete("DELETE FROM version WHERE database = ?", [2]);
        }
    }
}

// Example 8: Backup Database
function backup(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Backup database
        $backup = $Database->backup();
    }
}

// Example 9: Restore Database
function restore(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Restore database
        $restore = $Database->restore();
    }
}

// Example 10: Creating Database Schema
function schema(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Create schema
        $schema = $Database->schema();
    }
}

// Example 11: Upgrade Database Schema
function upgrade(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Upgrade schema, if no version is provided, the latest version will be used
        $upgrade = $Database->upgrade();
    }
}

// Example 12: Getters
function get(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Get table, returns an array or null when table does not exist
        $table = $Database->getTable("users");
        // Get columns, returns an array or null when table does not exist
        $columns = $Database->getColumns("users");
        // Get required columns, returns an array or null when table does not exist
        $required = $Database->getRequired("users");
        // Get default columns, returns an array or null when table does not exist
        $defaults = $Database->getDefaults("users");
        // Get primary columns, returns an array or null when table does not exist
        $primary = $Database->getPrimary("users");
        // Get on update columns, returns an array or null when table does not exist
        $onupdate = $Database->getOnUpdate("users");
    }
}

// Example 13: Advanced
function advanced(){

    // Set $Database from global variable
    global $Database;

    // Check if the database is connected
    if($Database->isConnected()){
        // Install the basics
        install();
        // Insert initial Version
        insert();
        // Save the current Schema
        schema();
        // Check if a table exists
        if($Database->getTable("users")){
            // Drop it
            $Database->drop('users');
        }
        // Add a new table
        $Database->create('users',[
            'id' => [
                'type' => 'BIGINT(10)',
                'extra' => ['UNSIGNED','AUTO_INCREMENT','PRIMARY KEY']
            ],
            'username' => [
                'type' => 'VARCHAR(60)',
                'extra' => ['NOT NULL','UNIQUE']
            ],
            'password' => [
                'type' => 'VARCHAR(100)',
                'extra' => ['NOT NULL']
            ],
            'token' => [
                'type' => 'VARCHAR(100)',
                'extra' => ['NOT NULL']
            ],
            'email' => [
                'type' => 'VARCHAR(60)',
                'extra' => ['NOT NULL']
            ]
        ]);
        // Insert data
        $id = $Database->insert("INSERT INTO users (username, password, token, email) VALUES (?,?,?,?)", ["user","pass","token","user@domain.com"]);
        // Update version
        $Database->update("UPDATE version SET database = ?", ['2']);
        // Create a new schema
        schema();
        // Back up the database
        backup();
    }
}

install();
