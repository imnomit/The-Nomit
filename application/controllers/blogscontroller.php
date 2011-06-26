<?php

class BlogsController extends Controller {

	function index() {
		$this->set("posts", $this->blog->selectAllRows());
	}

	function view($id = 0, $json = false) {
		if($json === 'json') {
			$this->_template->json = true;
		}

		$this->set("post", $this->blog->selectRow($id));
	}

}