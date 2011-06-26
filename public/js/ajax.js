(function() {

	var ajax = {};
	
	function xhr() {
	    if (typeof XMLHttpRequest !== 'undefined' && (window.location.protocol !== 'file:' || !window.ActiveXObject)) {
	      return new XMLHttpRequest();
	    } else {
	      try {
	        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
	      } catch(e) { }
	      try {
	        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
	      } catch(e) { }
	      try {
	        return new ActiveXObject('Msxml2.XMLHTTP');
	      } catch(e) { }
	    }
	    return false;
	}
	
	function successfulRequest(request) {
	    return (request.status >= 200 && request.status < 300) ||
	        request.status == 304 ||
	        (request.status == 0 && request.responseText);
	}
	
	ajax.serialize = function(object) {
	    if (!object) return;
	
			var results = [];
	    for (var key in object) {
	      results.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
	    }
			return results.join('&');
	}
	
	function ajaxRequest(url, options) {
	    var request = xhr();
	
	    function respondToReadyState(readyState) {
	      if (request.readyState == 4) {
	        if (request.getResponseHeader('content-type') === 'application/json')
	          request.responseJSON = net.parseJSON(request.responseText);
	
	        if (successfulRequest(request)) {
	          if (options.success) options.success(request);
	        } else {
	          if (options.error) options.error(request);
	        }
	      }
	    }
	
	    // Set the HTTP headers
	    function setHeaders() {
	      var defaults = {
	        'Accept': 'text/javascript, application/json, text/html, application/xml, text/xml, */*',
	        'Content-Type': 'application/x-www-form-urlencoded'
	      };
	
	      /**
	       * Merge headers with defaults. 
	       */
	      for (var name in defaults) {
	        if (!options.headers.hasOwnProperty(name))
	          options.headers[name] = defaults[name];
	      }
	
	      for (var name in options.headers) {
	        request.setRequestHeader(name, options.headers[name]);
	      }
	    }
	
	    if (typeof options === 'undefined') options = {};
	
	    options.method = options.method ? options.method.toLowerCase() : 'get';
	    options.asynchronous = options.asynchronous || true;
	    options.postBody = options.postBody || '';
	    request.onreadystatechange = respondToReadyState;
	    request.open(options.method, url, options.asynchronous);
	
	    options.headers = options.headers || {};
	    if (options.contentType) {
	      options.headers['Content-Type'] = options.contentType;
	    }
	
	    if (typeof options.postBody !== 'string') {
	      // Serialize JavaScript
	      options.postBody = ajax.serialize(options.postBody);
	    }
	
	    setHeaders();
	
	    try {
	      request.send(options.postBody);
	    } catch (e) {
	      if (options.error) {
	        options.error();
	      }
	    }
	
	    return request;
	}
	
	ajax.get = function(url, options) {
		if(typeof options === 'undefined') options = {};
		options.method = 'get';
		return ajaxRequest(url, options);
	};
	
	ajax.post = function(url, options) {
		if(typeof options === 'undefined') options = {};
		options.method = 'post';
		return ajaxRequest(url, options);
	};
	
	
	if(o_O || window.o_O) {
		o_O.ajax = ajax;
		o_O.get = ajax.get;
		o_O.post = ajax.post;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "ajax" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();