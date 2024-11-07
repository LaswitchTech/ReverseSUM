<?php

//Import BaseController class into the global namespace
use LaswitchTech\coreBase\BaseController;

class CalculateController extends BaseController {

	public function __construct($Auth){

        // Namespace: /calculate

		// Set the controller Authentication Policy
		$this->Public = true; // Set to false to require authentication

		// Set the controller Authorization Policy
		$this->Permission = false; // Set to true to require a permission for the namespace used.
		$this->Level = 1; // Set the permission level required

		// Call the parent constructor
		parent::__construct($Auth);
	}

    // Helper function to find the combinations
    protected function findCombinations($lines, $target, $currentCombination = [], $currentIndex = [], $index = 0) {

        // Initialize the found combinations
        $foundCombinations = [];

        // Check if the current combination is empty
        $sum = array_sum($currentCombination);

        // Check if the sum is equal to the target
        if ($sum == $target) {
            $foundCombination = [];
            foreach ($currentCombination as $i => $value) {
                $foundCombination[$currentIndex[$i]] = $value; // Store line number as index + 1
            }
            $foundCombinations[] = $foundCombination;
            return $foundCombinations;
        }

        // Check if the sum is greater than the target
        if ($sum > $target || $index >= count($lines)) {
            return $foundCombinations;
        }

        // Include current line
        $foundCombinations = array_merge($foundCombinations, $this->findCombinations($lines, $target, array_merge($currentCombination, [$lines[$index]]), array_merge($currentIndex, [$index]), $index + 1));

        // Exclude current line and move to the next
        $foundCombinations = array_merge($foundCombinations, $this->findCombinations($lines, $target, $currentCombination, $currentIndex, $index + 1));

        return $foundCombinations;
    }

    // Process the POST request
    public function postRouterAction() {

        // Namespace: /calculate/post

        // Increase the maximum execution time
        ini_set('max_execution_time', 300); // 5 minutes

        // Initialize the variables
        $results = [];

        // Check if the request is a POST request
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST)) {

            // Retrieve inputs from textareas
            $totalsInput = trim($_POST['totals']);
            $linesInput = trim($_POST['lines']);

            // Sanitize inputs by removing invalid symbols and words
            $totalsInput = preg_replace('/[^0-9\.\n]/', '', $totalsInput);
            $linesInput = preg_replace('/[^0-9\.\n]/', '', $linesInput);

            // Split the input values into arrays by line breaks
            $totals = array_map('floatval', explode("\n", $totalsInput));
            $lines = array_map('floatval', explode("\n", $linesInput));

            // Initialize sum totals
            $sumTotals = array_sum($totals);
            $sumLines = array_sum($lines);

            // Check if the totals and lines are not empty
            if($sumTotals > 0 && $sumLines > 0) {

                // Iterate over each total to find possible combinations in lines
                foreach ($totals as $totalIndex => $total) {
                    $foundCombinations = $this->findCombinations($lines, $total);
                    $formattedCombinations = [];

                    // Format the combinations with line numbers
                    foreach ($foundCombinations as $combination) {
                        $formattedCombination = [];
                        foreach ($combination as $lineIndex => $value) {
                            $formattedCombination[$lineIndex + 1] = $value; // Line number is index + 1
                        }
                        $formattedCombinations[] = $formattedCombination;
                    }

                    // Store the result with line number and value
                    $results[$totalIndex + 1] = [
                        'value' => $total,
                        'results' => $formattedCombinations
                    ];
                }

                // Return the results
                return [
                    'sumTotals' => $sumTotals,
                    'sumLines' => $sumLines,
                    'results' => $results
                ];
            }
        }

        // Return the results
        return $results;
    }
}
