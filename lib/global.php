<?php

function destroyGlobals() {
	if(ini_get('register_globals')) {
		$array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
		
		foreach($array as $value) {
			foreach($GLOBALS[$value] as $key => $variable) {
				if($variable === $GLOBALS[$key]) {
					unset($GLOBALS[$key]);
				}
			}
		}
	}
}

function removeMagicQuotes() {
	if(get_magic_quotes_gpc()) {
		$_GET = stripslashesArray($_GET);
		$_POST = stripslashesArray($_POST);
		$_COOKIE = stripslashesArray($_COOKIE);
	}
}

function performAction($controller, $action, $queryString = null, $render = 0) {
	$controllerName = ucfirst($controller) . 'Controller';
	$dispatch = new $controllerName($controller, $action);
	$dispatch->render = $render;
	
	return call_user_func_array(array($dispatch, $action), $queryString);
}

function callHook() {
	global $url;
	global $default;
	
	$queryString = array();
	
	if(!isset($url)) {
		$controller = $default['controller'];
		$action = $default['action'];
	}
	else {
		$urlArray = array();
		$urlArray = explode("/", $url);
		
		$controller = $urlArray[0];
		array_shift($urlArray);
		
		if(isset($urlArray[0])) {
			$action = $urlArray[0];
			array_shift($urlArray);
			$queryString = $urlArray;
		}
		else {
			$action = 'index';
		}
	}
	
	$controllerName = ucfirst($controller) . 'Controller';

	$dispatch = new $controllerName($controller, $action);

	if(method_exists($dispatch, $action)) {
		call_user_func_array(array($dispatch, $action), $queryString);
	}
	else {
	}
}

function __autoload($className) {
	if (file_exists(ROOT . DS . 'lib' . DS . strtolower($className) . '.class.php')) {
		require_once(ROOT . DS . 'lib' . DS . strtolower($className) . '.class.php');
	}
	else if(file_exists(ROOT . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php')) {
		require_once(ROOT . DS . 'application' . DS . 'controllers' . DS . strtolower($className) . '.php');
	}
	else if(file_exists(ROOT . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php')) {
		require_once(ROOT . DS . 'application' . DS . 'models' . DS . strtolower($className) . '.php');
	}
	else {
		//var_dump(debug_backtrace());
		echo 'The class <b>' . $className . '</b> does not have a valid source file.';
		exit();
	}
}

function gzipOutput() {
	$userAgent = $_SERVER['HTTP_USER_AGENT'];
	
	if(0 !== strpos($userAgent, 'Mozilla/4.0 (compatible; MSIE ') || false !== strpos($userAgent, 'Opera')) {
		return false;
	}
	$version = (float)substr($userAgent, 30); 
	return ($version < 6 || ($version == 6  && false === strpos($userAgent, 'SV1')));
}

gzipOutput() || ob_start("ob_gzhandler");

removeMagicQuotes();
destroyGlobals();
callHook();