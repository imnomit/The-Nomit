(function() {

	// Check if the console object exists.
	if(typeof console !== 'object' || !console) {
		console = { log: function() {} };
	}
	
	var booter = [];
	
	function o_O() {
		if(arguments.length > 0) {
			var result;
			for(var i = 0; i < booter.length; i++) {
				result = booter[i].apply(o_O, arguments);
	
				if(result) {
					return result;
				}
			}
		}
	}
	
	o_O.isArray = function(unit) {
		return!!(unit && unit.constructor == Array)
	};
	
	o_O.init = function(fn) {
		booter.unshift(fn);
	}
	
	o_O.init(function(argument) {
		if(arguments.length === 1 && typeof arguments[0] === 'function') {
			o_O.events.ready(argument);
		return true; // True for "it worked"!
		}
	});

	o_O.init(function(argument) {
		if(typeof argument === 'string') {
			return o_O.shortcut.dom(argument);
		}
	});

	o_O.init(function(argument) {
		if(argument.constructor == Array) {
			return o_O.shortcut.array(argument);
		}
	});

	o_O.init(function(argument) {
		if(arguments.length === 0 || arguments.length < 1) {
			return o_O.shortcut.utility;
		}
	});
	
	if(window.o_O) {
		alert('"o_O" has already been declared.');
		console.log('"o_O" failed to load, as the variable was already detected in the global scope. If ' +
					'you intend to boot multiple instances of "o_O", only one may exist in "window".');
	}
	else {
		window.o_O = o_O;
	}

})();