(function() {

	// Are we allowing open tags?
	var open_tags;
	
	// Convert to newlines?
	var convert_crlf = true;
	
	// Should we skip parsing?
	var no_parse = false;
	
	// The regex starting position of a URL.
	var url_start = -1;	
	
	// Accepted tags
	var REG_tags = /^\/?(?:b|i|u|pre|samp|code|colou?r|size|no_parse|url|s|q|blockquote)$/;
	
	// Accepted color/HEX values
	var	REG_colors = /^(:?black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|#(?:[0-9a-f]{3})?[0-9a-f]{3})$/i;
	
	// Appropriate number-syntax
	var	REG_numbers = /^[\\.0-9]{1,8}$/i;
	
	// Accepted URL syntax
	var	REG_uri = /^[-;\/\?:@&=\+\$,_\.!~\*'\(\)%0-9a-z]{1,512}$/i;
	
	// The syntax for tags, used to verify whether to utilize a tag
	var	REG_base = /([\r\n])|(?:\[([a-z]{1,16})(?:=([^\x00-\x1F"'\(\)<>\[\]]{1,256}))?\])|(?:\[\/([a-z]{1,16})\])/ig;
	
	// Information specific to each tag (the tag, and the HTML conversion)
	var tag_info = function(bbtag, etag) {
		this.bbtag = bbtag;
		this.etag = etag
	}
	
	/**
	 * Tests the given argument against the tag syntax, returning a boolean values.
	 *
	 * @param {String} test The "tag" to authenticate.
	 * @returns {Boolean}
	 */
	var validTag = function(test) {
		if (!test || !test.length) {
			return false;
		}
		return REG_tags.test(test);
	}
	
	/**
	 *
	 *
	 */
	var markupToHTML = function(master, crlf, tag_name, tag_name_value, tag_end, offset, string) {
		if (crlf && crlf.length) {
			if (!convert_crlf) {
				return master;
			}
			switch (crlf) {
				case "\r":
					return "";
				case "\n":
					return "<br>"
			}
		}
		if (validTag(tag_name)) {
			if (no_parse) {
				return "[" + tag_name + "]";
			}
			if (open_tags.length && open_tags[open_tags.length - 1].bbtag == "url" && url_start >= 0) {
				return "[" + tag_name + "]";
			}
			switch (tag_name) {
				case "code":
					open_tags.push(new tag_info(tag_name, "</code></pre>"));
					convert_crlf = false;
					return "<pre><code>";
	
				case "pre":
					open_tags.push(new tag_info(tag_name, "</pre>"));
					convert_crlf = false;
					return "<pre>";
	
				case "color":
				case "colour":
					if (!tag_name_value || !REG_colors.test(tag_name_value)) {
						tag_name_value = "inherit";
					}
					open_tags.push(new tag_info(tag_name, "</span>"));
					return '<span style="color: ' + tag_name_value + '">';
	
				case "size":
					if (!tag_name_value || !REG_numbers.test(tag_name_value)) {
						tag_name_value = "1";
					}
					open_tags.push(new tag_info(tag_name, "</span>"));
					return '<span style="font-size: ' + Math.min(Math.max(tag_name_value, 0.7), 3) + 'em">';
	
				case "s":
					open_tags.push(new tag_info(tag_name, "</span>"));
					return '<span style="text-decoration: line-through">';
	
				case "no_parse":
					no_parse = true;
					return "";
	
				case "url":
					open_tags.push(new tag_info(tag_name, "</a>"));
					if (tag_name_value && REG_uri.test(tag_name_value)) {
						url_start = -1;
						return '<a href="' + tag_name_value + '">';
					}
					url_start = master.length + offset;
					return '<a href="';
	
				case "q":
				case "blockquote":
					open_tags.push(new tag_info(tag_name, "</" + tag_name + ">"));
					return tag_name_value && tag_name_value.length && REG_uri.test(tag_name_value) ? "<" + tag_name + ' cite="' + tag_name_value + '">' : "<" + tag_name + ">";
	
				default:
					open_tags.push(new tag_info(tag_name, "</" + tag_name + ">"));
					return "<" + tag_name + ">";
			}
		}
		if (validTag(tag_end)) {
			if (no_parse) {
				if (tag_end == "no_parse") {
					no_parse = false;
					return "";
				}
				return "[/" + tag_end + "]";
			}
			if (!open_tags.length || open_tags[open_tags.length - 1].bbtag != tag_end) {
				return '<span style="color: red">[/' + tag_end + "]</span>";
			}
			if (tag_end == "url") {
				if (url_start > 0) {
					return '">' + string.substr(url_start, offset - url_start) + open_tags.pop().etag;
				}
				return open_tags.pop().etag;
			}
			else if (tag_end == "code" || tag_end == "pre") {
				convert_crlf = true;
			}
			return open_tags.pop().etag;
		}
		return master;
	}
	
	var parse_markup = function(unit) {
		var result, end_tags, tag;
	
		convert_crlf = true;
		if (open_tags == null || open_tags.length) {
			open_tags = new Array(0);
		}
		result = unit.replace(REG_base, markupToHTML);
		if (no_parse) {
			no_parse = false;
		}
		if (open_tags.length) {
			end_tags = new String;
			if (open_tags[open_tags.length - 1].bbtag == "url") {
				open_tags.pop();
				end_tags += '">' + unit.substr(url_start, unit.length - url_start) + "</a>";
			}
			while (open_tags.length) {
				end_tags += open_tags.pop().etag;
			}
		}
		return end_tags ? result + end_tags : result;
	};
	
	if(o_O || window.o_O) {
		o_O.markup = parse_markup;
	}
	else {
		alert('"o_O" must be declared before modules can be booted.');
		console.log('The "markup" module failed to load, as the core variable ("o_O") was not found in ' +
					'in the global scope. To remedy this error, ensure your file was built such that ' +
					'"core.js" is compiled first.');
	}

})();