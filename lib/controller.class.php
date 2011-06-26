<?php

class Controller {

	protected $_controller;
	protected $_action;
	protected $_template;
	
	public $render;
	
	function __construct($controller, $action) {
		$this->_controller = ucfirst($controller);
		$this->_action = $action;
		$this->render = 1;
		$model = rtrim($controller, 's');
		$this->$model = new $model;
		$this->_template = new Template($controller, $action);
	}
	
	function set($name, $value) {
		$this->_template->set($name, $value);
	}
	
	function __destruct() {
		if($this->render) {
			$this->_template->render();
		}
	}
}