<?php

// Declaring namespace
namespace LaswitchTech\coreNet;

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseController;
use LaswitchTech\coreNet\Net;
use LaswitchTech\coreDatabase\Database;

class Controller extends BaseController {

    // Properties
	private $Net;
	private $Database;

	public function __construct($Auth){

        // Namespace: /net

		// Set the controller Authentication Policy
		$this->Public = true; // Set to false to require authentication

		// Set the controller Authorization Policy
		$this->Permission = false; // Set to true to require a permission for the namespace used.
		$this->Level = 1; // Set the permission level required

        // Initialize Net
        $this->Net = new Net();

		// Initialize the Database
		$this->Database = new Database();

		// Call the parent constructor
		parent::__construct($Auth);
	}

    // Retrieve records for the index view
    public function indexRouterAction() {

        // Namespace: /net/index

        // Initialize variables
        $return = [];

        // Retrieve Scan list
        $return['scans'] = $this->Database->select("SELECT * FROM `scans`");

        // Return
        return $return;
    }

    // Retrieve records for the ping view
    public function pingRouterAction() {

        // Namespace: /net/ping $target $from (optional) $to (optional)

        // Initialize variables
        $return = [];

        // Get the request parameters
        $target = $_GET['target'] ?? null;
        $from = isset($_GET['from']) ? strtotime($_GET['from']) : strtotime('-1 hour');
        $to = isset($_GET['to']) ? strtotime($_GET['to']) : strtotime(date('Y-m-d H:i:s'));

        // Convert the dates
        $from = date('Y-m-d H:i:s', $from);
        $to = date('Y-m-d H:i:s', $to);

        // Retrieve Scan list
        $return['scans'] = $this->Database->select("SELECT * FROM `scans` WHERE `status` = 1 AND `type` = 'ping' AND `port` = 'ICMP'");

        // Check if id is provided
        if($target){

            // Retrieve the scan
            $scan = $this->Database->select("SELECT * FROM `scans` WHERE `target` = '$target' AND `type` = 'ping' AND `port` = 'ICMP'");

            // Check if the scan exists
            if($scan){

                // Retrieve the scan results
                $return['scan'] = $scan[0];

                // Return the scan results
                $return['results'] = $this->Database->select("SELECT * FROM `results` WHERE `target` = ? AND `type` = ? AND `port` = ? AND `timestamp` BETWEEN '".$from."' AND '".$to."' ORDER BY `id` ASC", [$return['scan']['target'], $return['scan']['type'], $return['scan']['port']]);

                // Build the chart data
                $return['chart'] = [
                    'labels' => [],
                    'datasets' => []
                ];

                // Loop through the results
                foreach($return['results'] as $result){

                    // Check if the label exists
                    if(!in_array($result['timestamp'], $return['chart']['labels'])){

                        // Add the label
                        $return['chart']['labels'][] = $result['timestamp'];
                    }

                    // Check if the dataset exists
                    if(!isset($return['chart']['datasets'][$result['type']])){

                        // Add the dataset
                        $return['chart']['datasets'][$result['type']] = [
                            'label' => 'Latency',
                            'data' => [],
                            'backgroundColor' => 'rgba(57,203,251,1)',
                            'borderColor' => 'rgba(255,255,255,1)',
                            'borderWidth' => 2,
                            'fill' => true,
                            'tension' => 0.4,
                        ];
                    }

                    // Add the data
                    $return['chart']['datasets'][$result['type']]['data'][] = floatval($result['state']);
                }
            }
        }

        // Return
        return $return;
    }

    // Retrieve records for the port view
    public function portRouterAction() {

        // Namespace: /net/port $target $from (optional) $to (optional)

        // Initialize variables
        $return = [];

        // Get the request parameters
        $target = $_GET['target'] ?? null;
        $from = isset($_GET['from']) ? strtotime($_GET['from']) : strtotime('-1 hour');
        $to = isset($_GET['to']) ? strtotime($_GET['to']) : strtotime(date('Y-m-d H:i:s'));

        // Convert the dates
        $from = date('Y-m-d H:i:s', $from);
        $to = date('Y-m-d H:i:s', $to);

        // Retrieve Scan list
        $return['scans'] = $this->Database->select("SELECT * FROM `scans` WHERE `status` = 1 AND `type` = 'port'");

        // Check if id is provided
        if($target){

            // Split the target into target and port
            $parts = explode(':', $target);
            $target = $parts[0];
            $port = $parts[1] ?? 0;

            // Retrieve the scan
            $scan = $this->Database->select("SELECT * FROM `scans` WHERE `target` = '$target' AND `type` = 'port'");

            // Check if the scan exists
            if($scan){

                // Retrieve the scan results
                $return['scan'] = $scan[0];

                // Return the scan results
                $return['results'] = $this->Database->select("SELECT * FROM `results` WHERE `target` = ? AND `type` = ? AND `port` = ? AND `timestamp` BETWEEN '".$from."' AND '".$to."' ORDER BY `id` ASC", [$return['scan']['target'], $return['scan']['type'], $return['scan']['port']]);

                // Build the chart data
                $return['chart'] = [
                    'labels' => [],
                    'datasets' => []
                ];

                // Loop through the results
                foreach($return['results'] as $result){

                    // Check if the label exists
                    if(!in_array($result['timestamp'], $return['chart']['labels'])){

                        // Add the label
                        $return['chart']['labels'][] = $result['timestamp'];
                    }

                    // Check if the dataset exists
                    if(!isset($return['chart']['datasets'][$result['type']])){

                        // Add the dataset
                        $return['chart']['datasets'][$result['type']] = [
                            'label' => 'Status',
                            'data' => [],
                            'backgroundColor' => 'rgba(57,203,251,1)',
                            'borderColor' => 'rgba(255,255,255,1)',
                            'borderWidth' => 2,
                            'fill' => true,
                            'tension' => 0.4,
                        ];
                    }

                    // Add the data
                    $return['chart']['datasets'][$result['type']]['data'][] = floatval($result['state']);
                }
            }
        }

        // Return
        return $return;
    }

    // Retrieve records for the lookup view
    public function lookupRouterAction() {

        // Namespace: /net/lookup $target $from (optional) $to (optional)

        // Initialize variables
        $return = [];

        // Get the request parameters
        $target = $_GET['target'] ?? null;
        $from = isset($_GET['from']) ? strtotime($_GET['from']) : strtotime('-1 hour');
        $to = isset($_GET['to']) ? strtotime($_GET['to']) : strtotime(date('Y-m-d H:i:s'));

        // Convert the dates
        $from = date('Y-m-d H:i:s', $from);
        $to = date('Y-m-d H:i:s', $to);

        // Retrieve Scan list
        $return['scans'] = $this->Database->select("SELECT * FROM `scans` WHERE `status` = 1 AND `type` = 'lookup'");

        // Check if id is provided
        if($target){

            // Split the target into target and port
            $parts = explode(':', $target);
            $target = $parts[0];
            $port = $parts[1] ?? 0;

            // Retrieve the scan
            $scan = $this->Database->select("SELECT * FROM `scans` WHERE `target` = '$target' AND `type` = 'lookup'");

            // Check if the scan exists
            if($scan){

                // Retrieve the scan results
                $return['scan'] = $scan[0];

                // Return the scan results
                $return['results'] = $this->Database->select("SELECT * FROM `results` WHERE `target` = ? AND `type` = ? AND `port` = ? AND `timestamp` BETWEEN '".$from."' AND '".$to."' ORDER BY `id` ASC", [$return['scan']['target'], $return['scan']['type'], $return['scan']['port']]);
            }
        }

        // Return
        return $return;
    }
}
