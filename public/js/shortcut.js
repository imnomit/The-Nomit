(function() {

	var shortcut = {
		dom: {
			element: null
		},
		array: {
			batch: null // Can't have "array.array", so we'll use a synonym instead.
		}
	};
	
	/**
	 * Initializes the "DOM mode", by modifying the value of "o_O.shortcut.dom.element" to reflect the referenced element.
	 *
	 * Links to: o_O.dom.getElementById(elementID)
	 *
	 * @param {String} elementID The ID of the element to locate.
	 */
	shortcut.dom = function(elementID) {
		shortcut.dom.element = o_O.dom.getElementById(elementID);
		return shortcut.dom;
	};
	
	/**
	 * Links to: o_O.dom.removeElement(element)
	 */
	shortcut.dom.remove = function() {
		o_O.dom.removeElement(this.element);
		return shortcut.dom;
	};
	
	/**
	 * Links to: o_O.dom.append(parent, element)
	 *
	 * @param {Object} element The element which to append to the stored DOM object.
	 */
	shortcut.dom.append = function(element) {
		o_O.dom.append(this.element, element);
		return shortcut.dom;
	};
	
	/**
	 * Links to: o_O.dom.prepend(parent, element)
	 *
	 * @param {Object} element The element which to prepend to the stored DOM object.
	 */
	shortcut.dom.prepend = function(element) {
		o_O.dom.prepend(this.element, element);
		return shortcut.dom;
	};
	
	/**
	 * Links to: o_O.dom.css(element, styleObject)
	 * Format: "attribute": "value"
	 *
	 * @param {Object} cssObject An object containing the styles to apply to the stored DOM object.
	 */
	shortcut.dom.css = function(cssObject) {
		this.element = o_O.css.setStyle(this.element, cssObject);
		return shortcut.dom;
	};
	
	/**
	 * Returns the most recent revision of the stored element. Please note, this method is NOT chainable.
	 */
	shortcut.dom.print = function() {
		return this.element;
	};
	
	/**
	 * Initializes the "array mode", by modifying the value of "o_O.shortcut.array.array" to reflect the given array.
	 *
	 * @param {Array} array The array to store in the initialized instance.
	 */
	shortcut.array = function(array) {
		this.batch = array;
		return shortcut.array;
	};
	
	/**
	 * Links to: o_O.array.compare(firstArray, secondArray)
	 *
	 * @param {Array} array The array which to compare to the stored array.
	 */
	shortcut.array.compare = function(array) {
		o_O.array.compare(this.batch, array);
		return shortcut.array;
	};
	
	/**
	 * Links to: o_O.array.append(parentArray, item)
	 *
	 * @param {Object} item The string, object, or function which to append to the stored array.
	 */
	shortcut.array.append = function(item) {
		this.batch = o_O.arrray.append(this.batch, item);
		return shortcut.array;
	};
	
	/**
	 * Links to: o_O.array.prepend(parentArray, item)
	 *
	 * @param {Object} item The string, object, or function which to prepend to the stored array.
	 */
	shortcut.array.prepend = function(item) {
		this.batch = o_O.array.prepend(this.batch, item);
		return shortcut.array;
	};
	
	/**
	 * Links to: o_O.array.removeItemById(array, itemID)
	 *
	 * @param {Object} itemID The array key/position of the item which to delete from the stored array.
	 */
	shortcut.array.removeItemByID = function(itemID) {
		this.batch = o_O.array.removeItemById(this.batch, itemID);
		return shortcut.array;
	};
	
	/**
	 * Returns the most recent revision of the stored array. Please note, this method is NOT chainable.
	 */
	shortcut.array.print = function() {
		return shortcut.array.batch;
	};
	
	if(o_O || window.o_O) {
		o_O.shortcut = shortcut;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "shortcut" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();