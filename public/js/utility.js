(function() {

	var utility = {};
	
	utility.windowSize = function() {
		var size = { x: false, y: false };
		if(window.innerWidth) {
			size.x = window.innerWidth;
			size.y = window.innerHeight;
		}
		else if(document.documentElement && (document.documentElement.clientWidth && document.documentElement.clientHeight)) {
			size.x = document.documentElement.clientWidth;
			size.y = document.documentElement.clientHeight;
		}
		if(size.x && size.y) {
			return size;
		}
	};
	
	utility.windowScrollPosition = function() {
		var left = 0,
			top = 0;
		if(typeof window.pageYOffset == "number") {
			left = window.pageXOffset;
			top = window.pageYOffset;
		}
		else {
			if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
				left = document.body.scrollLeft;
				top = document.body.scrollTop;
			}
			else {
				if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
					left = document.documentElement.scrollLeft;
					top = document.documentElement.scrollTop
				}
			}
		}
		return { x: left, y: top };
	};

	utility.elementScrollPosition = function(elementID) {
		var element = o_O.dom.getElementById(elementID),
			top = element.offsetTop,
			node = element;
		// Loop through all parent elements to get exact offset
		while(node.offsetParent && node.offsetParent != document.body) {
			node = node.offsetParent;
			top += node.offsetTop;
		}
		return top;
	};

	if(o_O || window.o_O) {
		o_O.utility = utility;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "utility" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();