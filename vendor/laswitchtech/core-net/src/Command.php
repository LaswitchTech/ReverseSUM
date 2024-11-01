<?php

// Declaring namespace
namespace LaswitchTech\coreNet;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseCommand;
use LaswitchTech\coreNet\Net;
use LaswitchTech\coreDatabase\Database;

class Command extends BaseCommand {

    // Properties
    protected $Net;
    protected $Database;

	public function __construct($Auth){

        // Namespace: /net

        // Initialize Net
        $this->Net = new Net();

        // Initialize Database
        $this->Database = new Database();

		// Call the parent constructor
		parent::__construct($Auth);
	}

    public function addAction($argv){

        // Namespace: /net/validate $target $type $port

        try{

            // Initialize variables
            $target = null;
            $type = 'ping';
            $port = 'ICMP';

            // Check if target is provided
            if (empty($argv[0])) {

                // Throw an exception
                throw new Exception("Missing parameters");
            }

            // Set the variables
            $target = $argv[0];

            // Check if type is provided
            if(isset($argv[1])){
                $type = $argv[1];
            }

            // Check if port is provided
            if(isset($argv[2])){
                $port = $argv[2];
            }

            // Insert the scan into the database
            if($this->Database->insert("INSERT INTO `scans` (`target`, `type`, `port`) VALUES (?,?,?)",[$target, $type, $port])){

                // Return the success message
                $this->success("A new $type scan of $target on port $port has been added to the queue.");
            } else {

                // Throw an exception
                throw new Exception("Failed to add $type scan of $target on port $port to the queue.");
            }
        } catch (Exception $e) {

            // Log the error
            $this->Logger->error($e->getMessage());

            // Return the error
            $this->error($e->getMessage());
        }
    }

    public function runAction($argv){

        // Namespace: /net/run

        try{

            // Retrieve the scans from the database
            $scans = $this->Database->select("SELECT * FROM `scans` WHERE `status` = '1'");

            // Loop through the scans
            foreach($scans as $scan){

                // Return the scan details
                $this->info("Scanning " . $scan['target'] . " on port " . $scan['port'] . " using " . $scan['type'] . " scan.");

                // Run the scan
                switch($scan['type']){
                    case 'ping':
                        // Perform a ping scan
                        $state = $this->Net->ping($scan['target']);
                        if($state === false){
                            $state = $this->Configurator->get('netools','pingFailedLatency') ?? 9999;
                        }
                        break;
                    case 'port':
                        // Perform a port scan
                        $state = $this->Net->scan($scan['target'], $scan['port']);
                        if($state){
                            $state = 1;
                        } else {
                            $state = 0;
                        }
                        break;
                    case 'lookup':
                        // Perform a DNS lookup
                        $state = $this->Net->lookup($scan['target']);
                        // Check if the state is an array
                        if(is_array($state)){
                            // Convert the array to a string
                            $state = json_encode($state,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
                        }
                        break;
                    default:
                        // Throw an exception
                        throw new Exception("Invalid scan type");
                        break;
                }

                // Save the scan state
                $this->Database->insert("INSERT INTO `results` (`target`, `type`, `port`, `state`) VALUES (?,?,?,?)",[$scan['target'], $scan['type'], $scan['port'], $state]);
            }

            // Return the success message
            $this->success("Scans have been completed.");
        } catch (Exception $e) {

            // Log the error
            $this->Logger->error($e->getMessage());

            // Return the error
            $this->error($e->getMessage());
        }
    }
}
