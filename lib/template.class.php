<?php

class Template {

	protected $variables = array();
	protected $_controller;
	protected $_action;
	
	public $json = false;
	
	function __construct($controller, $action) {
		$this->_controller = $controller;
		$this->_action = $action;
	}
	
	function set($name, $value) {
		$this->variables[$name] = $value;
	}
	
	function render() {
		extract($this->variables);
		
		$html = new HTML();
		
		if($this->json === false) {
			require_once(ROOT . DS . 'templates' . DS . 'header.php');
			
			if(file_exists(ROOT . DS . 'application' . DS . 'views' . DS . $this->_controller . DS . $this->_action . '.php')) {
				require_once(ROOT . DS . 'application' . DS . 'views' . DS . $this->_controller . DS . $this->_action . '.php');
			}
			else {
			}
			
			require_once(ROOT . DS . 'templates' . DS . 'footer.php');
		}
		else {
			require_once(ROOT . DS . 'application' . DS . 'views' . DS . $this->_controller . DS . $this->_action . '.json.php');
		}
	}

}