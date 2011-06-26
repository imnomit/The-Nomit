(function() {

	var animate = {};
	
	animate.scrollToElement = function(eID) {
		var startY = o_O.utility.windowScrollPosition().y,
			stopY = o_O.utility.elementScrollPosition(eID),
			distance = stopY > startY ? stopY - startY : startY - stopY;
		if (distance < 100) {
			scrollTo(0, stopY);
			return;
		}
		var speed = Math.round(distance / 100);
		if (speed >= 20) {
			speed = 20;
		}
		var step = Math.round(distance / 25),
			leapY = stopY > startY ? startY + step : startY - step,
			timer = 0;
		if (stopY > startY) {
			for ( var i=startY; i<stopY; i+=step ) {
				setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
				leapY += step;
				if (leapY > stopY) leapY = stopY; timer++;
			}
			return;
		}
		for ( var i=startY; i>stopY; i-=step ) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
			leapY -= step;
			if (leapY < stopY) leapY = stopY; timer++;
		}
	};
	
	if(o_O || window.o_O) {
		o_O.animate = animate;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "animate" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();