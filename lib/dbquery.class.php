<?php

class dbQuery {

	protected $_handle;
	protected $_result;
	
	function connect($host, $accountName, $password, $dbName) {
		$this->_handle = @mysql_connect($host, $accountName, $password);

		if(($this->_handle != 0) && (mysql_select_db($dbName, $this->_handle))) {
			return 1;
		}
		
		return 0;
	}
	
	function disconnect() {
		if(@mysql_close($this->_handle) != 0) {
			return 1;
		}
		
		return 0;
	}
	
	function selectAllRows() {
		return $this->query('SELECT * FROM `' . $this->_table . '`');
	}
	
	function selectRow($id) {
		return $this->query('SELECT * FROM `' . $this->_table . '` WHERE `id` = \'' . mysql_real_escape_string($id) . '\'', 1);
	}
	
	function getNumRows() {
		return mysql_num_rows($this->_result);
	}
	
	function freeResult() {
		return mysql_free_result($this->_result);
	}
	
	function getError() {
		return mysql_error($this->_handle);
	}
	
	function query($query, $singleResult = 0) {
		$this->_result = mysql_query($query, $this->_handle);

		if(preg_match('/select/i', $query)) {
			$result = array();
			$table = array();
			$field = array();
			$tmp = array();
			$numFields = mysql_num_fields($this->_result);
						
			for($i = 0; $i < $numFields; ++$i) {
				array_push($table, mysql_field_table($this->_result, $i));
				array_push($field, mysql_field_name($this->_result, $i));
			}			
			
			while($row = mysql_fetch_row($this->_result)) {
				for($i = 0; $i < $numFields; ++$i) {
					$table[$i] = trim(ucfirst($table[$i]), 's');
					$tmp[$table[$i]][$field[$i]] = $row[$i];
				}
				
				if($singleResult === 1) {
					mysql_free_result($this->_result);
					return $tmp;
				}

				array_push($result, $tmp);
			}

			mysql_free_result($this->_result);
			return $result;
		}
	}

}