<?php

// Declaring namespace
namespace LaswitchTech\coreDatabase;

// Import additionnal class into the global namespace
use LaswitchTech\coreConfigurator\Configurator;
use LaswitchTech\coreLogger\Logger;
use LaswitchTech\coreNet\Net;
use Exception;
use mysqli;

class Database {

	private $connection = null;
	private $character = 'utf8mb4';
	private $collate = 'utf8mb4_general_ci';

	// Configurator
	private $Configurator;

	// Logger
	private $Logger;

	// Net
	private $Net;

	// Database
	private $Host = null;
	private $Username = null;
	private $Password = null;
	private $Database = null;

	/**
	 * Create a new Database instance.
	 *
	 * @param  string|null  $Host
	 * @param  string|null  $Username
	 * @param  string|null  $Password
	 * @param  string|null  $Database
	 * @return void
	 * @throws Exception
	 */
	public function __construct($Host = null, $Username = null, $Password = null, $Database = null) {

		// Initialize Configurator
		$this->Configurator = new Configurator('database');

		// Initiate Logger
		$this->Logger = new Logger('database');

		// Initiate Net
		$this->Net = new Net();

		// Retrieve Parameters
		$this->Host = $Host ?: $this->Host;
		$this->Username = $Username ?: $this->Username;
		$this->Password = $Password ?: $this->Password;
		$this->Database = $Database ?: $this->Database;

		// Set default parameter values if not specified
		if($this->Host === null){
			$this->Host = $this->Configurator->get('database', 'host') ?: $this->Host;
		}
		if($this->Username === null){
			$this->Username = $this->Configurator->get('database', 'username') ?: $this->Username;
		}
		if($this->Password === null){
			$this->Password = $this->Configurator->get('database', 'password') ?: $this->Password;
		}
		if($this->Database === null){
			$this->Database = $this->Configurator->get('database', 'database') ?: $this->Database;
		}

		// Attempt a connection
		if($this->Host !== null && $this->Username !== null && $this->Password !== null && $this->Database !== null){
			$this->connect($this->Host,$this->Username,$this->Password,$this->Database);
		}
	}

	/**
	 * Configure Library.
	 *
	 * @param  string  $option
	 * @param  bool|int  $value
	 * @return void
	 * @throws Exception
	 */
	public function config($option, $value){
		try {
			if(is_string($option)){
				switch($option){
					case"host":
						if(is_string($value)){

							// Logging Level
							$this->Host = $value;

							// Save to Configurator
							$this->Configurator->set('database',$option, $value);
						} else{
							throw new Exception("2nd argument must be a string.");
						}
						break;
					case"username":
						if(is_string($value)){

							// Logging Level
							$this->Username = $value;

							// Save to Configurator
							$this->Configurator->set('database',$option, $value);
						} else{
							throw new Exception("2nd argument must be a string.");
						}
						break;
					case"password":
						if(is_string($value)){

							// Logging Level
							$this->Password = $value;

							// Save to Configurator
							$this->Configurator->set('database',$option, $value);
						} else{
							throw new Exception("2nd argument must be a string.");
						}
						break;
					case"database":
						if(is_string($value)){

							// Logging Level
							$this->Database = $value;

							// Save to Configurator
							$this->Configurator->set('database',$option, $value);
						} else{
							throw new Exception("2nd argument must be a string.");
						}
						break;
					default:
						throw new Exception("unable to configure $option.");
						break;
				}
			} else{
				throw new Exception("1st argument must be as string.");
			}
		} catch (Exception $e) {
			$this->Logger->error('Error: '.$e->getMessage());
		}

		return $this;
	}

	/**
	 * Connect Database.
	 *
	 * @param  string|null  $host
	 * @param  string|null  $username
	 * @param  string|null  $password
	 * @param  string|null  $database
	 * @return void
	 * @throws Exception
	 */
	public function connect($host = null, $username = null, $password = null, $database = null) {

		// Attempt a connection to the database
		try {

            // Retrieve Parameters
            $host = $host ?: $this->Host;
            $username = $username ?: $this->Username;
            $password = $password ?: $this->Password;
            $database = $database ?: $this->Database;

			// Debug Information
			$this->Logger->info("Establishing connection to database.");
			$this->Logger->debug("Host: " . $host);
			$this->Logger->debug("Username: " . $username);
			$this->Logger->debug("Password: " . $password);
			$this->Logger->debug("Database: " . $database);

			// Checking for an active connection
			if($this->isConnected()){
				throw new Exception("Database already connected.");
			}

			// Checking for an open port
			if(!$this->Net->scan($host,3306)){
				throw new Exception("SQL port on {$host} is closed or blocked.");
			}

			// Create a new mysqli connection
			$this->connection = new mysqli($host, $username, $password, $database);

			// Turn off warnings
			error_reporting(E_ALL ^ E_WARNING);

			// Throw an exception if connection failed
			if(mysqli_connect_errno()){
				$this->Logger->error("Could not connect to database.");
				throw new Exception(mysqli_connect_errno());
			} else {
				$this->Logger->success("Database connected.");
			}

			// Turn on warnings
			error_reporting(E_ALL);
		} catch (Exception $e) {

			// Clear connection
			$this->connection = null;

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
		}
	}

	/**
	 * Test if a connection has been established.
	 *
	 * @return boolean
	 */
	public function isConnected(){
		return ($this->connection != null);
	}

	/**
	 * Begin transactions on database.
	 *
	 * @throws Exception
	 */
	public function begin() {
		if (!$this->isConnected()) {

			// Log any errors and throw an exception
			$this->Logger->error("Not connected to database.");
			throw new Exception("Not connected to database.");
		}
		$this->connection->begin_transaction();
	}

	/**
	 * Commit transactions to database.
	 *
	 * @throws Exception
	 */
	public function commit() {
		if (!$this->isConnected()) {

			// Log any errors and throw an exception
			$this->Logger->error("Not connected to database.");
			throw new Exception("Not connected to database.");
		}
		$this->connection->commit();
	}

	/**
	 * Rollback transactions to database.
	 *
	 * @throws Exception
	 */
	public function rollback() {
		if (!$this->isConnected()) {

			// Log any errors and throw an exception
			$this->Logger->error("Not connected to database.");
			throw new Exception("Not connected to database.");
		}
		$this->connection->rollback();
	}

	/**
	 * Execute a Query to the database.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return statement object
	 * @throws Exception
	 */
	private function execute($query = "" , $params = []) {

		// If debug mode is enabled, print the query and parameters
		$this->Logger->debug('Query: ');
		$this->Logger->debug($query);
		$this->Logger->debug('Params: ');
		$this->Logger->debug($params);

		// Convert any parameters to UTF-8 encoding
		foreach($params as $key => $value){
			if(is_string($value)){
				if($encoding = mb_detect_encoding($value)){
					$params[$key] = mb_convert_encoding($value, 'UTF-8', $encoding);
				}
			}
		}

		try {

			// Check if Database is connected
			if(!$this->isConnected()){
				throw New Exception("Database is not connected.");
			}

			// Prepare the statement using the provided query
			$stmt = $this->connection->prepare($query);
			$this->Logger->debug('Prepared Statement: ');
			$this->Logger->debug($stmt);

			// Throw an exception if the statement cannot be prepared
			if($stmt === false) {
				$this->Logger->error("Unable to do prepared statement: " . $query);
				throw New Exception("Unable to do prepared statement: " . $query);
			}

			// Bind any parameters to the statement
			if($params) {
				$types = "";
				foreach($params as $param){
					switch(gettype($param)){
						case"boolean":
						case"integer": $types .= "i"; break;
						case"double": $types .= "d"; break;
						case"blob": $types .= "b"; break;
						case"string":
						default: $types .= "s"; break;
					}
				}
				$this->Logger->debug('Bind Parameters: ');
				$this->Logger->debug($types);
				$stmt->bind_param($types, ...$params);
			}

			// Execute the statement
			$stmt->execute();
			$this->Logger->debug('Executed Statement: ');
			$this->Logger->debug($stmt);
			return $stmt;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw New Exception( $e->getMessage() );
		}
	}

	/**
	 * Execute a Query to the database and return the result set as an associative array.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return array
	 * @throws Exception
	 */
	public function query($query, $params = []){
		try {
			// Execute the query and retrieve the result set as an associative array
			$stmt = $this->execute( $query, $params );
			$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

			// Return result
			return $result;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw New Exception( $e->getMessage() );
		}
		return false;
	}

	/**
	 * Execute an INSERT query to the database and return the ID of the last inserted row.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return int
	 * @throws Exception
	 */
	public function insert($query = "" , $params = []) {
		try {
			// Execute the INSERT query and retrieve the ID of the last inserted row
			$stmt = $this->execute( $query , $params );
			$last_id = $stmt->insert_id;

			// Return last_id
			return $last_id;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());

            // Return
            return false;
		}
	}

	/**
	 * Execute a SELECT query to the database and return the result set as an associative array.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return array
	 * @throws Exception
	 */
	public function select($query = "" , $params = []) {
		try {
			// Execute the SELECT query and retrieve the result set as an associative array
			$stmt = $this->execute( $query , $params );
			$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

			// Return result
			return $result;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw New Exception( $e->getMessage() );
		}
		return false;
	}

	/**
	 * Execute an UPDATE query to the database and return the number of affected rows.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return int
	 * @throws Exception
	 */
	public function update($query = "" , $params = []) {
		try {
			// Execute the UPDATE query and retrieve the number of affected rows
			$stmt = $this->execute( $query , $params );
			$result = $stmt->affected_rows;

			// Return result
			return $result;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw New Exception( $e->getMessage() );
		}
		return false;
	}

	/**
	 * Execute a DELETE query to the database and return the number of affected rows.
	 *
	 * @param  string  $query
	 * @param  array  $params
	 * @return int
	 * @throws Exception
	 */
	public function delete($query = "" , $params = []) {
		try {
			// Execute the DELETE query and retrieve the number of affected rows
			$stmt = $this->execute( $query , $params );
			$result = $stmt->affected_rows;

			// Return result
			return $result;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw New Exception( $e->getMessage() );
		}
		return false;
	}

	/**
	 * Create a new table in the database with the specified columns.
	 *
	 * @param  string  $table
	 * @param  array  $columns
	 * @return boolean
	 * @throws Exception
	 */
	public function create($table, $columns, $uniqueKeys = null){
		try {

			// Check if table exist
			if($this->getTable($table)){
				throw New Exception("This table already exist");
			}

			// Start building Query
			$query = 'CREATE TABLE `'.$table.'` (';

			// Loop through each column and add it to the query
			foreach($columns as $name => $column){
				if(isset($column['type'])){

					// If this is not the first column, add a comma
					if(substr($query, -1) != '('){ $query .= ', '; }

					// Add the column name and type to the query
					$query .= '`'.$name.'` '.strtoupper($column['type']);

					// Loop through any extra options and add them to the query
					if(isset($column['extra']) && is_array($column['extra'])){
						foreach($column['extra'] as $extra){
							if(in_array(strtoupper($extra),['NULL','NOT NULL','UNIQUE','UNSIGNED','AUTO_INCREMENT','PRIMARY KEY']) || str_contains(strtoupper($extra), 'DEFAULT')){
								$query .= ' '.strtoupper($extra);
							}
						}
					}
				}
			}

			// Add UNIQUE KEY constraints if provided
			if (!empty($uniqueKeys) && is_array($uniqueKeys)) {
				foreach ($uniqueKeys as $keyName => $keyColumns) {
					$query .= ', UNIQUE KEY `' . $keyName . '` (' . implode(', ', array_map(function ($col) {
						return '`' . $col . '`';
					}, $keyColumns)) . ')';
				}
			}

			// Add character encoding to the query
			$query .= ' ) CHARACTER SET ' . $this->character;

			// Execute the query
			$stmt = $this->execute( $query );

			// Return boolean
			return true;
		} catch(Exception $e) {

			// Log any errors
			$this->Logger->error($e->getMessage());

			// Throw an exception if level is higher than 5
			if($this->Level > 5){
				throw New Exception( $e->getMessage() );
			}
		}
		return false;
	}

	/**
	 * Modify an existing table in the database by adding, modifying, or dropping columns.
	 *
	 * @param  string  $table
	 * @param  array  $columns
	 * @return boolean
	 * @throws Exception
	 */
	public function alter($table, $columns){
		try {

			// Check if table exist
			if(!$this->getTable($table)){
				throw New Exception("This table does not exist");
			}

			// Loop through each column and add it to the query
			foreach($columns as $name => $column){
				if(isset($column['action'])){
					// Build the query string based on the action specified
					$query = 'ALTER TABLE `'.$table.'` ';

					if(strtoupper($column['action']) == 'DROP COLUMN') {
						$query .= 'DROP COLUMN `'.$name.'`';
					} elseif(in_array(strtoupper($column['action']),['MODIFY','ADD','DROP COLUMN']) && isset($column['type'])){
						$query .= strtoupper($column['action']).' `'.$name.'` '.strtoupper($column['type']);

						// Loop through any extra options and add them to the query
						if(isset($column['extra']) && is_array($column['extra'])){
							foreach($column['extra'] as $extra){
								if(in_array(strtoupper($extra),['NULL','NOT NULL','UNIQUE','UNSIGNED','AUTO_INCREMENT','PRIMARY KEY']) || str_contains(strtoupper($extra), 'DEFAULT')){
									$query .= ' '.strtoupper($extra);
								}
							}
						}
					} elseif (strtoupper($column['action']) == 'ADD UNIQUE KEY' && isset($column['keyName']) && isset($column['columns']) && is_array($column['columns'])) {
						// Add unique key on multiple columns
						$query .= 'ADD UNIQUE KEY `'.$column['keyName'].'` ('.implode(', ', array_map(function($col) { return "`$col`"; }, $column['columns'])).')';
					} else {
						continue; // Skip to next iteration if the action is not supported
					}

					// Execute the query
					$stmt = $this->execute( $query );
				}
			}
			return true;
		} catch(Exception $e) {

			// Log any errors
			$this->Logger->error($e->getMessage());

			// Throw an exception if level is higher than 5
			if($this->Level > 5){
				throw New Exception( $e->getMessage() );
			}
		}
		return false;
	}

	/**
	 * Drop a table from the database.
	 *
	 * @param  string  $table
	 * @return boolean
	 * @throws Exception
	 */
	public function drop($table){
		try {

			// Check if table exist
			if(!$this->getTable($table)){
				throw New Exception("This table does not exist");
			}

			// Generate the SQL query to drop the table
			$query = 'DROP TABLE `'.$table.'`';

			// Execute the query
			$stmt = $this->execute( $query );

			// Return boolean
			return true;
		} catch(Exception $e) {

			// Log any errors
			$this->Logger->error($e->getMessage());

			// Throw an exception if level is higher than 5
			if($this->Level > 5){
				throw New Exception( $e->getMessage() );
			}
		}
		return false;
	}

	/**
	 * Truncate a table in the database.
	 *
	 * @param  string  $table
	 * @return boolean
	 * @throws Exception
	 */
	public function truncate($table){
		try {

			// Check if table exist
			if(!$this->getTable($table)){
				throw New Exception("This table does not exist");
			}

			// Generate the SQL query to truncate the table
			$query = 'TRUNCATE TABLE `'.$table.'`';

			// Execute the query
			$stmt = $this->execute( $query );

			// Return boolean
			return true;
		} catch(Exception $e) {

			// Log any errors
			$this->Logger->error($e->getMessage());

			// Throw an exception if level is higher than 5
			if($this->Level > 5){
				throw New Exception( $e->getMessage() );
			}
		}
		return false;
	}

	/**
	 * Check if a table exists in the database.
	 *
	 * @param  string  $table
	 * @return bool
	 * @throws Exception
	 */
	public function getTable($table) {
		try {

			// Retrieve Results
			$result = $this->connection->query("SHOW TABLES LIKE '$table'");

			// Return Boolean based on table existence
			return $result->num_rows > 0;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the tables in the database.
	 *
	 * @return array
	 * @throws Exception
	 */
	public function getTables() {
        try {

            // Retrieve the tables in the database
            $result = $this->connection->query("SHOW TABLES");

            // Initialize the tables array
            $tables = array();

            // Generate the tables array
            while ($row = $result->fetch_row()) {
                $tables[] = $row[0];
            }

            // Return the array of tables
            return $tables;
        } catch(Exception $e) {

            // Log any errors and throw an exception
            $this->Logger->error($e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

	/**
	 * Retrieve the columns of a table.
	 *
	 * @param  string  $table
	 * @return array
	 * @throws Exception
	 */
	public function getColumns($table) {
		try {

			// Retrieve the table's columns
			$result = $this->connection->query("DESCRIBE $table");

			// Initialize the columns array
			$columns = array();

			// Generate the columns array
			while ($row = $result->fetch_assoc()) {

				// Extract the data type from the Type field
				preg_match('/^([^\(]+)(\(.+?\))?/', $row['Type'], $matches);
				$dataType = $matches[1];

				// Add column to array
				$columns[$row['Field']] = $dataType;
			}

			// Return the array of columns
			return $columns;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the required columns for inserting a new row.
	 *
	 * @param  string  $table
	 * @return array
	 * @throws Exception
	 */
	public function getRequired($table) {
		try {

			// Retrieve the table's columns
			$result = $this->connection->query("DESCRIBE $table");

			// Initialize the required columns array
			$requiredColumns = array();

			// Generate the required columns array
			while ($row = $result->fetch_assoc()) {

				// Check if the column is required
				if ($row['Null'] === 'NO' && $row['Default'] === null) {

					// Add column to array
					$requiredColumns[] = $row['Field'];
				}
			}

			// Return the array of required columns
			return $requiredColumns;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the required columns for inserting a new row.
	 *
	 * @param  string  $table
	 * @return array
	 * @throws Exception
	 */
	public function getDefaults($table) {
		try {

			// Retrieve the table's columns
			$result = $this->connection->query("DESCRIBE $table");

			// Initialize the columns array
			$columns = array();

			// Generate the required columns array
			while ($row = $result->fetch_assoc()) {

				// Check if the column is required
				if ($row['Default'] !== null) {

					// Add column to array
					$columns[$row['Field']] = $row['Default'];
				}
			}

			// Return the array of columns
			return $columns;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the columns of a table.
	 *
	 * @param  string  $table
	 * @return array
	 * @throws Exception
	 */
	public function getOnUpdate($table) {
		try {

			// Retrieve the table's columns
			$result = $this->connection->query("DESCRIBE $table");

			// Initialize the columns array
			$columns = array();

			// Generate the columns array
			while ($row = $result->fetch_assoc()) {

				// Check if the column has an "ON UPDATE" default value
				if (strpos($row['Extra'], 'on update') !== false) {

					// Extract the "ON UPDATE" default value from the column's Extra field
					preg_match('/on update\s+(.+)/i', $row['Extra'], $matches);

					// Add column to array
					$columns[$row['Field']] = $matches[1];
				}
			}

			// Return the array of columns
			return $columns;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the primary key of a table.
	 *
	 * @param string $table
	 * @return string|null
	 * @throws Exception
	 */
	public function getPrimary($table) {
		try {
			// Retrieve the table's structure
			$result = $this->connection->query("DESCRIBE $table");

			// Loop through the rows to find the primary key
			while ($row = $result->fetch_assoc()) {
				if ($row['Key'] === 'PRI') {
					return $row['Field'];
				}
			}

			// If no primary key was found, return null
			return null;
		} catch (Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Retrieve the required columns for inserting a new row.
	 *
	 * @param  string  $table
	 * @return array
	 * @throws Exception
	 */
	public function getNullables($table) {
		try {

			// Retrieve the table's columns
			$result = $this->connection->query("DESCRIBE $table");

			// Initialize the columns array
			$columns = array();

			// Generate the required columns array
			while ($row = $result->fetch_assoc()) {

				// Check if the column is required
				if ($row['Null'] !== 'NO') {

					// Add column to array
					$columns[] = $row['Field'];
				}
			}

			// Return the array of columns
			return $columns;
		} catch(Exception $e) {

			// Log any errors and throw an exception
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Helper function to quote values for SQL statements.
	 *
	 * @param  string  $value
	 * @return boolean
	 */
	private function quoteValue($value) {
		return is_null($value) ? 'NULL' : "'" . $this->connection->real_escape_string($value) . "'";
	}

	/**
	 * Helper function to identify the lastest file in a path.
	 *
	 * @param  string  $value
	 * @return boolean
	 */
	private function getLastCreatedFile($path, $extension = 'sql') {
		// Initialize variables to store the name and creation time of the latest file
		$latestFilePath = '';
		$latestFileTime = 0;

		// Create a directory handle
		$directoryHandle = opendir($path);

		// If successful in opening the directory
		if ($directoryHandle) {
			// Loop over all the files in the directory
			while (false !== ($entry = readdir($directoryHandle))) {
				// Skip non-files (like ".", "..", or subdirectories)
				if (is_file($path . '/' . $entry) && filectime($path . '/' . $entry) > $latestFileTime) {

					// Check if the file extension matches the provided extension
					$fileExtension = pathinfo($entry, PATHINFO_EXTENSION);
					if ($fileExtension === $extension) {
						$latestFilePath = $path . '/' . $entry;
						$latestFileTime = filectime($latestFilePath);
					}
				}
			}
			// Close the directory handle
			closedir($directoryHandle);
		}

		return $latestFilePath;
	}

	/**
	 * Backup a database.
	 *
	 * @return string $file
	 * @throws Exception
	 */
	public function backup($filename = null) {
		try {

			// Check if database is connected
			if (!$this->isConnected()) {
				throw new Exception("Database is not connected");
			}

			// If no filename was provided, generate a filename
			if (is_null($filename)) {
				$file = $this->Configurator->root() . "/backup/" . time() . ".sql";
			} else {
				$file = $this->Configurator->root() . "/backup/" . $filename . ".sql";
			}

			$this->Logger->info("Creating backup of database to file: " . $file);

			// Create the directory recursively
			if(!is_dir(dirname($file))){
				mkdir(dirname($file), 0777, true);
			}

			// Get all tables
			$tables = $this->query("SHOW TABLES");

			$sql = "-- Backup of database {$this->Database}\n-- Generated on " . date('Y-m-d H:i:s') . "\n\n";

			foreach ($tables as $table) {
				$tableName = current($table);
				$this->Logger->info("Backing up table: " . $tableName);

				// Get CREATE TABLE statement
				$result = $this->query("SHOW CREATE TABLE `{$tableName}`");
				$sql .= $result[0]['Create Table'] . ";\n\n";

				// Get all rows
				$rows = $this->query("SELECT * FROM `{$tableName}`");
				foreach ($rows as $row) {
					$sql .= "INSERT INTO `{$tableName}` VALUES (" . join(',', array_map([$this, 'quoteValue'], $row)) . ");\n";
				}

				$sql .= "\n\n";
			}

			// Save to file
			if (!file_put_contents($file, $sql)) {
				throw new Exception("Failed to write to file: " . $file);
			}

			$this->Logger->success("Database backup created: " . $file);

			// Return the file path
			return $file;
		} catch(Exception $e) {
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Restore a database.
	 *
	 * @param  string|null  $file
	 * @throws Exception
	 */
	public function restore($file = null) {
		try {

			// Check if database is connected
			if (!$this->isConnected()) {
				throw new Exception("Database is not connected");
			}

			if($file){
				// Convert file to absolute path
				$file = $this->Configurator->root() . $file;
			} else {
				// Get the last backup file
				$file = $this->getLastCreatedFile($this->Configurator->root() . "/backup/");
			}

			if(!file_exists($file)){
				throw new Exception("File does not exist: " . $file);
			}

			$this->Logger->info("Restoring database from file: " . $file);

			// Load SQL statements from file
			$sql = file_get_contents($file);
			if ($sql === false) {
				throw new Exception("Failed to read from file: " . $file);
			}

			$this->Logger->info("Clearing database");

			// Get the list of tables
			$tables = $this->connection->query("SHOW TABLES")->fetch_all();
			// Drop each tables
			foreach ($tables as $table) {
				$this->drop($table[0]);
			}

			// Execute each SQL statement
			$this->connection->multi_query($sql);
			while ($this->connection->more_results() && $this->connection->next_result());

			$this->Logger->success("Database restored from: " . $file);
		} catch(Exception $e) {
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Create a database schema file.
	 *
	 * @throws Exception
	 */
	public function schema($filename = null) {
		try {

			// Check if database is connected
			if (!$this->isConnected()) {
				throw new Exception("Database is not connected");
			}

			// Get the current database version
			$result = $this->query("SELECT version FROM version");
			$currentVersion = $result[0]['version'];

			// If no filename was provided, generate a filename
			if (is_null($filename)) {

				// Convert file to absolute path
				$file = $this->Configurator->root() . "/schema/" . $currentVersion . ".map";
			} else {

				// Convert file to absolute path
				$file = $this->Configurator->root() . "/schema/" . $filename . ".map";
			}



			// Create the directory recursively
			if(!is_dir(dirname($file))){
				mkdir(dirname($file), 0777, true);
			}

			// Get the list of tables
			$tables = $this->connection->query("SHOW TABLES")->fetch_all();

			// Store the structure of each table
			$schema = [];
			foreach ($tables as $tableRow) {
				$table = $tableRow[0];
				$tableSchema = $this->connection->query("SHOW CREATE TABLE `$table`")->fetch_assoc();
				$columnQuery = $this->connection->query("SHOW COLUMNS FROM `$table`");
				$columns = [];
				while ($column = $columnQuery->fetch_assoc()) {
					$columns[] = $column;
				}

				$schema[$table] = [
					'create' => $tableSchema['Create Table'],
					'columns' => $columns,
				];
			}

			// Save the schema to a file
			file_put_contents($file, json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

			$this->Logger->success("Database schema created: " . $file);

			// Return the file path
			return $file;
		} catch(Exception $e) {
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	/**
	 * Upgrade a database to the latest version or the one specified.
	 *
	 * @param  string|null  $version
	 * @throws Exception
	 */
	public function upgrade($version = null) {
		try {

			// Check if database is connected
			if (!$this->isConnected()) {
				throw new Exception("Database is not connected");
			}

			// Check if the version is specified
			if($version){
				// Select File
				$versionFile = $this->Configurator->root() . "/schema/" . intval($version) . ".map";
			} else {
				// Select Latest File
				$versionFile = $this->getLastCreatedFile($this->Configurator->root() . "/schema/");
			}

			$version = intval(str_replace('.map','',basename($versionFile)));

			// Check if the file exists
			if(!file_exists($versionFile)){
				throw new Exception("File does not exist: " . $versionFile);
			}

			// Get the current database version
			$result = $this->query("SELECT version FROM version");
			$current = $result[0]['version'];
			// Select File
			$currentFile = $this->Configurator->root() . "/schema/" . $current . ".map";

			// Check if the file exists
			if(!file_exists($currentFile)){
				throw new Exception("File does not exist: " . $currentFile);
			}

			// Load the schemas
			$currentSchema = json_decode(file_get_contents($currentFile), true);
			$versionSchema = json_decode(file_get_contents($versionFile), true);

			// Check if current version is more recent than the target version
			if($current > $version){
				throw new Exception("Current version is more recent than the target version.");
			}

			// Check if the current version is the same as the target version
			if($current == $version){
				throw new Exception("Current version is the same as the target version.");
			}

			// Start Upgrading...
			foreach ($versionSchema as $table => $details) {
				// If the table does not exist in the current schema, create it
				if (!isset($currentSchema[$table])) {
					$this->execute($details['create']);
				} else {
					// The table exists in the current schema, compare columns
					$currentColumns = array_column($currentSchema[$table]['columns'], null, 'Field');
					$versionColumns = array_column($details['columns'], null, 'Field');

					// Determine the columns to be added or modified
					foreach ($versionColumns as $column => $versionDetail) {
						if (!isset($currentColumns[$column])) {
							// The column does not exist in the current schema, add it
							$this->alter($table, [
								$column => [
									'action' => 'ADD',
									'type' => $versionDetail['Type']
								]
							]);
						} else {
							// The column exists in the current schema, compare details
							$currentDetail = $currentColumns[$column];
							if ($currentDetail['Type'] != $versionDetail['Type'] ||
								$currentDetail['Null'] != $versionDetail['Null'] ||
								$currentDetail['Default'] != $versionDetail['Default']) {
								// The column details differ, modify the column
								$this->alter($table, [
									$column => [
										'action' => 'MODIFY',
										'type' => $versionDetail['Type']
									]
								]);
							}
						}
					}

					// Determine the columns to be dropped
					foreach ($currentColumns as $column => $currentDetail) {
						if (!isset($versionColumns[$column])) {
							// The column does not exist in the version schema, drop it
							$this->alter($table, [
								$column => [
									'action' => 'DROP COLUMN'
								]
							]);
						}
					}
				}
			}

			// Update the database version
			$this->execute("UPDATE version SET database = $version");

			$this->Logger->success("Database upgraded to version: " . $version);
		} catch(Exception $e) {
			$this->Logger->error($e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

    /**
     * Check if the library is installed.
     *
     * @return bool
     */
    public function isInstalled(){

        // Retrieve the path of this class
        $reflector = new ReflectionClass($this);
        $path = $reflector->getFileName();

        // Retrieve the filename of this class
        $filename = basename($path);

        // Modify the path to point to the config directory
        $path = str_replace('src/' . $filename, 'config/', $path);

        // Add the requirements to the Configurator
        $this->Configurator->add('requirements', $path . 'requirements.cfg');

        // Retrieve the list of required modules
        $modules = $this->Configurator->get('requirements','modules');

        // Check if the required modules are installed
        foreach($modules as $module){

            // Check if the class exists
            if (!class_exists($module)) {
                return false;
            }

            // Initialize the class
            $class = new $module();

            // Check if the method exists
            if(method_exists($class, isInstalled)){

                // Check if the class is installed
                if(!$class->isInstalled()){
                    return false;
                }
            }
        }

        // Return true
        return true;
    }
}
