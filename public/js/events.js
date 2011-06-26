(function() {

	var events 	= {},
		readyBound = false, // Has the DOM been associated with the "ready" event?
		isReady = false, // Is the DOM loaded?
		readyList = []; // Array to queue up our callbacks
	
	/**
	 * The final function of the "DOM ready-check", testing if "isReady" is false, and then executing the events contained
	 * in the "readyList" array.
	 */
	function ready() {
		// Is the DOM loaded? If so, stop here.
		if(!isReady) {
			// Update the "isReady" variable to reflect we're ready...
			isReady = true;
	
			// Load through the queued callbacks...
			if(readyList) {
				for(var i = 0; i < readyList.length; i++) {
					readyList[i].call(window, []);
				}
	
				readyList = [];
			}
		}
	};
	
	/**
	 * This function is a fallback for if other tests and methods fail to function, as browsers share universal support for
	 * "window.onload".
	 *
	 * @param {Function} callback The function to execute.
	 */
	function addLoadEvent(callback) {
		var oldonload = window.onload;
		// Is there no function associated with "window.onload"? If so, associate one.
		if(typeof window.onload != "function") {
			window.onload = callback;
		}
		// Otherwise, create an anonymous function to execute the previous "window.onload",
		// or, if it doesn't exist, execute the given callback.
		else {
			window.onload = function() {
				if(oldonload) {
					oldonload();
				}
				callback();
			}
		}
	}
	
	/**
	 * Contains the "nitty-gritty" browser inconsistencies and incompatibilities, utilizing the
	 * "browser" object to detect browsers and then utilize the appropriate methods.
	 *
	 * Once complete, the "ready" function is called.
	 */
	function bindReady() {
		// Has the DOM already been associated with this function? If so, stop here.
		if(readyBound) {
			return;
		}
	
		readyBound = true;
	
		// For those modern browsers, just add an event listener for the DOM to be ready.
		if(document.addEventListener && !o_O.opera) {
			document.addEventListener("DOMContentLoaded", ready, false);
		}
		else if(o_O.ie && window == top) {
			// Is the DOM loaded? If so, stop here.
			if(isReady) {
				return;
			}
			// Otherwise, perform an ugly IE hack to scroll to the left.
			try {
				document.documentElement.doScroll("left");
			}
			// If this fails, set a timeout to call this function again.
			catch(error) {
				setTimeout(arguments.callee, 0);
				return;
			}
		}
		else if(o_O.opera) {
			document.addEventListener("DOMContentLoaded", function() {
				// Is the DOM loaded? If so, stop here.
				if(isReady) {
					return;
				}
				// Otherwise, go through each stylesheet, and, if it's not loaded, set a timeout
				// to call this function again.
				for(var i = 0; i < document.styleSheets.length; i++) {
					if(document.styleSheets[i].disabled) {
						setTimeout(arguments.callee, 0);
						return;
					}
					// All checks passed; we're ready for lift-off.
					ready();
				}
			}, false);
		}
		else if(o_O.safari) {
			var numStyles;
			
			// Is the DOM loaded? If so, stop here.
			if(isReady) {
				return;
			}
			// If the DOM isn't ready, set a timeout to call this function again.
			if(document.readyState != "loaded" && document.readyState != "complete") {
				setTimeout(arguments.callee, 0);
				return;
			}
			// If the "numStyles" variable is null, count the number of LOADED stylesheets.
			if(numStyles === undefined) {
				var links = document.getElementsByTagName("link");
				for(var i =0; i < links.length; i++) {
					if(links[i].getAttribute("rel") == "stylesheet") {
						numStyles++;
					}
				}
				var styles = document.getElementsByTagName("style");
				numStyles += styles.length;
			}
			// Then, if the number of stylesheets in the page isn't what we counted, set a timeout
			// to call this function again.
			if(document.styleSheets.length != numStyles) {
				setTimeout(arguments.callee, 0);
				return;
			}
			// All checks passed; we're ready for lift-off.
			ready();
		}
		
		addLoadEvent(ready);
	}
	
	/**
	 * Provides the window - and the publicly accessible - for the "DOM ready" function, taking the callback argument (and
	 * appending it to the "readyList" array) to execute at completion.
	 *
	 * @param {Function} callback The function to be executed when the ODM is ready.
	 */
	events.ready = function(callback) {
		// Is the DOM loaded? If so, execute the given callback.
		if(isReady) {
			callback.call(window, []);
		}
		// Otherwise, append the callback to the queue.
		else {
			readyList.push(function() {
				return callback.call(window, []);
			})
		}
	}
	
	// Initialize the "ready check".
	bindReady();
	
	if(o_O || window.o_O) {
		o_O.events = events;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "events" module failed to load, as the core variable ("o_O") was not found in ' +
					'the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();