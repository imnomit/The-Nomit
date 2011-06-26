(function() {

	var css = {},
		cssNumberProperty = {
			'zIndex': true,
			'fontWeight': true,
			'opacity': true,
			'zoom': true,
			'lineHeight': true
		},
		getStyle,
		setStyle;

	function camelCase(text) {
		if(typeof text !== 'string') {
			return;
		}
		return text.replace(/-([a-z])/ig, function(all, letter) {
			return letter.toUpperCase();
		});
	}
	function decamelCase(text) {
		if(typeof text !== 'string') {
			return;
		}
		return text.replace(/([A-Z])/g, '-$1').toLowerCase();
	}
	
	function setStyleProperty(element, property, value) {
		// Does the element exist? Is it a text node or a comment node? Does it have a style property?
		if(!element || element.nodeType === 3 || element.nodeType === 8 || !element.style) {
			console.log('[setStyleProperty()]: Element doesn\'t exist..');
			console.log(element.nodeType);
			console.log(element.style);
			return;
		}
		if(typeof value === 'number' && !cssNumberProperty[property]) {
			value += 'px';
		}
		element.style[property] = value;
	}
	
	if(document.documentElement.currentStyle) {
		getStyle = function(element, property) {
			return element.currentStyle[camelCase(property)];
		};
		setStyle = function(element, property, value) {
			return setStyleProperty(element, camelCase(property), value);
		};
	}
	else if(document.defaultView.getComputedStyle) {
		getStyle = function(element, property) {
			return element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(decamelCase(property));
		};
		setStyle = function(element, property, value) {
			return setStyleProperty(element, decamelCase(property), value);
		};
	}
	
	css.setStyle = function(element, options) {
		if(typeof options === 'string') {
			return getStyle(element, options);
		}
		else {
			for(var property in options) {
				if(options.hasOwnProperty(property)) {
					setStyle(element, property, options[property]);
				}
			}
		}
	};
	
	if(o_O || window.o_O) {
		o_O.css = css;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "css" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();