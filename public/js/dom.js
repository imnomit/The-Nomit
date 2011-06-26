(function() {
	var dom = {};
	
	// Cache variable, in which we store found objects
	dom.cache = [];
	
	var findInCache = function(id) {
		for(i = 0, length = dom.cache.length; i < length; ++i) {
			if(dom.cache[i].id === id) {
				return i;
			}
		}
		return false;
	};
	
	/*  Utilizes the cache variable to efficiently locate and store elements by their IDs.
	 *
	 * @param {String} elementID A string referencing the ID of the element which to search for.
	 */
	dom.getElementById = function(elementID) {
		var cached = findInCache(elementID);
		if(cached !== false) {
			console.log("it's cached");
			return dom.cache[cached].element;
		}
		else {
			var element = document.getElementById(elementID);
			dom.cache.push({element: element, id: elementID});
			return element;
		}
	};
	
	dom.remove = function(elementID) {
	};

	o_O.dom = dom;
})();