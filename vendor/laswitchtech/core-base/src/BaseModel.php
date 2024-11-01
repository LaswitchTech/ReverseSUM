<?php

//Declaring namespace
namespace LaswitchTech\coreBase;

// Import additionnal class into the global namespace
use LaswitchTech\coreDatabase\Database;

// BaseModel Class
class BaseModel extends Database {

    /**
     * Magic Method to catch all undefined methods
     * @param string $name
     * @param array $arguments
     * @return void
     */
    public function __call($name, $arguments) {

        // Log the error
        $this->Logger->error("[".$name."] 501 Not Implemented");

        // Ouput the error
        $this->output("[".$name."] 501 Not Implemented");

        // Return void;
        return;
    }
}
