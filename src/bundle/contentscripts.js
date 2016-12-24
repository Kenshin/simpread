webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	console.log("=== simpread contentscripts load ===");
	
	/*
	    Golbal jQuery variable
	*/
	var $ = __webpack_require__(155);
	
	// import Mousetrap
	var Mousetrap = __webpack_require__(159);
	
	// import notify css file
	__webpack_require__(163);
	var Notify = __webpack_require__(161);
	
	/*
	    import focus from ./focus/focus.js
	*/
	var focus = __webpack_require__(167);
	
	/*
	    keyboard event handler
	*/
	Mousetrap.bind(["a s"], focuseMode);
	
	/*
	    message request listener
	*/
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    console.log(request);
	    focuseMode();
	});
	
	/*
	    Focus mode
	*/
	function focuseMode() {
	    console.log("=== simpread focus mode active ===");
	
	    var $focus, sel, range, node, tag;
	
	    // Uniqueness verification
	    if (!focus.Verify()) return;
	
	    // get focus tag
	    if ($("body").find("article").length > 0) {
	        // find article tag
	        $focus = $("body").find("article");
	    } else {
	        // focus
	        try {
	            sel = window.getSelection();
	            range = sel.getRangeAt(sel.rangeCount - 1);
	            node = range.startContainer.nodeName;
	            if (node.toLowerCase() === "body") throw "selection area is body tag.";
	            $focus = $(range.startContainer.parentNode);
	        } catch (error) {
	            console.log(sel, range, node);
	            console.error(error);
	            new Notify().Render(1, "当前并未获取任何正文，请重新选取。");
	            return;
	        }
	    }
	
	    // add focus mode
	    focus.Render(fixFocus($focus));
	}
	
	/*
	    Fix $focus get bad tag, include: p, span, section
	    good tag include: div, article
	 */
	function fixFocus($focus) {
	    var tag = $focus[0].tagName.toLowerCase();
	    while (tag === "p" || tag === "span" || tag === "strong" || tag === "ul" || tag === "li" || tag === "pre" || tag === "section") {
	        $focus = $focus.parent();
	        tag = $focus[0].tagName.toLowerCase();
	    }
	    return $focus;
	}

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(164);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(166)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./notify.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./notify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(165)();
	// imports
	
	
	// module
	exports.push([module.id, "\n/*\n* notify\n*/\n\n.notifygp {\n    position: fixed;\n    top: 0;\n    right: 0;\n    height: 100%;\n    /*width: 400px;*/\n\n    display: -webkit-box;\n    -webkit-box-align: end;\n    -webkit-box-orient: vertical;\n    -webkit-box-pack: start;\n\n    margin: 15px;\n\n    font-size: 12px;\n    font-family: \"Helvetica Neue\", \"Luxi Sans\", \"DejaVu Sans\", Tahoma, \"Hiragino Sans GB\", \"Microsoft Yahei\", sans-serif;\n    font-weight: normal;\n\n    text-transform: none;\n    color: #fff;\n\n    pointer-events: none;\n}\n\n.notifygp .notify {\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-box-pack: start;\n    -webkit-box-align: start;\n\n    background: #555;\n    -webkit-border-radius: 5px;\n\n    padding: 10px;\n    margin-bottom: 10px;\n    /*width: 350px;*/\n    max-width: 400px;\n\n    opacity: .9;\n\n    pointer-events: auto;\n}\n\n.notifygp .notify div {\n    padding: 3px;\n}\n\n.notifygp .notify div a {\n    color: #fff;\n}\n\n.notifygp .notify .close {\n    position: absolute;\n    right: 10px;\n}\n\n.notifygp .notify .close span {\n    display: block;\n    /* background-image: url(\"../images/close.png\"); */\n    width: 16px;\n    height: 16px;\n}\n\n.notifygp .notify .title {\n    font-weight: bolder;\n    font-size: 13px;\n}\n", ""]);
	
	// exports


/***/ },

/***/ 165:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	console.log("=== simpread focus load ===");
	
	// import css
	__webpack_require__(168);
	
	/*
	    import fcontrol from ./focus/controlbar.js
	*/
	var fcontrol = __webpack_require__(173),
	    focus = function () {
	
	    var $parent,
	        tag,
	        focuscls = "ks-simpread-focus",
	        focusstyle = "z-index: 2147483647; overflow: visible; position: relative;",
	        maskcls = "ks-simpread-mask",
	        maskstyle = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
	        bgcls = "ks-simpread-bg",
	        bgtmpl = "<div class=" + bgcls + "></div>",
	        bgclsjq = "." + bgcls;
	
	    function Focus() {
	        this.$target = null;
	    }
	
	    /*
	        Add focus mode
	    */
	    Focus.prototype.Render = function ($target) {
	        console.log("=== simpread focus add ===");
	        this.$target = $target;
	        // add focus
	        focusStyle($target, focusstyle, focuscls, "add");
	
	        // add ks-simpread-mask
	        $parent = $target.parent();
	        tag = $parent[0].tagName;
	        while (tag.toLowerCase() != "body") {
	            focusStyle($parent, maskstyle, maskcls, "add");
	            $parent = $parent.parent();
	            tag = $parent[0].tagName;
	        }
	
	        // add background mask
	        $("body").append(bgtmpl);
	
	        // add control bar
	        fcontrol.Render(bgclsjq);
	
	        // click mask remove it
	        $(bgclsjq).on("click", function (event) {
	            if ($(event.target).attr("class") != bgcls) return;
	
	            // remove focus style
	            focusStyle($target, focusstyle, focuscls, "delete");
	
	            // remove control bar
	            fcontrol.Remove();
	
	            // remove background
	            $(bgclsjq).off("click");
	            $(bgclsjq).remove();
	
	            // remove ks-simpread-mask style
	            $parent = $target.parent();
	            tag = $parent[0].tagName;
	            while (tag && tag.toLowerCase() != "body") {
	                focusStyle($parent, maskstyle, maskcls, "delete");
	                $parent = $parent.parent();
	                tag = $parent[0].tagName;
	            }
	
	            console.log("=== simpread focus remove ===");
	        });
	    };
	
	    /*
	        Verify ks-simpread-focus tag exit
	    */
	    Focus.prototype.Verify = function () {
	        if ($("body").find("." + focuscls).length > 0) {
	            return false;
	        } else {
	            return true;
	        }
	    };
	
	    /*
	        Set focus style
	        @param $target: jquery object
	        @param style  : set style string
	        @param cls    : set class string
	        @param type   : include 'add' and 'delete'
	    */
	    function focusStyle($target, style, cls, type) {
	        var bakstyle;
	        if (type === "add") {
	            bakstyle = $target.attr("style") == undefined ? "" : $target.attr("style");
	            $target.attr("style", bakstyle + style).addClass(cls);
	        } else if (type === "delete") {
	            bakstyle = $target.attr("style");
	            bakstyle = bakstyle.replace(style, "");
	            $target.attr("style", bakstyle).removeClass(cls);
	        }
	    }
	
	    return new Focus();
	}();
	
	module.exports = focus;

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(169);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(166)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./simpread.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./simpread.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(165)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\r\n    Focus style\r\n*/\r\n.ks-simpread-focus {\r\n    overflow: visible;\r\n    position: relative;\r\n    z-index: 2147483647;\r\n    box-shadow: 0 0 0 20px #fff;\r\n    background-color: #fff;\r\n}\r\n\r\n/*\r\n    Background style\r\n*/\r\n.ks-simpread-bg {\r\n    display: block;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background-color: rgba( 235, 235, 235, 0.9 );\r\n    z-index: 2147483646;\r\n\r\n    -webkit-animation: effect 0.5s linear;\r\n}\r\n\r\n@-webkit-keyframes effect {\r\n    from { opacity:0; }\r\n    to   { opacity:1; }\r\n}\r\n\r\n/*\r\n    Control bar style\r\n*/\r\n.ks-simpread-constrolbar {\r\n    position: fixed;\r\n    right: 50px;\r\n    bottom: 50px;\r\n}\r\n\r\n.ks-simpread-constrolbar ul {\r\n    color: #96a0a8;\r\n    border: 1px solid #ededed;\r\n}\r\n\r\n.ks-simpread-constrolbar li {\r\n    list-style: none;\r\n    cursor: pointer;\r\n    opacity: .5;\r\n}\r\n\r\n.ks-simpread-constrolbar li:hover {\r\n    list-style: none;\r\n    cursor: pointer;\r\n    opacity: 1;\r\n    -webkit-transition: opacity .5s ease;\r\n}\r\n\r\n.ks-simpread-constrolbar span {\r\n    display: block;\r\n    width: 45px;\r\n    height: 45px;\r\n    background-repeat: no-repeat;\r\n    background-color: #999;\r\n    background-position: center;\r\n    border-bottom: solid 1px #ededed;\r\n}\r\n\r\n.ks-simpread-constrolbar .topicon {\r\n    background-image: url(" + __webpack_require__(170) + ");\r\n}\r\n\r\n.ks-simpread-constrolbar .settingicon {\r\n    background-image: url(" + __webpack_require__(171) + ");\r\n}\r\n\r\n.ks-simpread-constrolbar .closeicon {\r\n    background-image: url(" + __webpack_require__(172) + ");\r\n}\r\n", ""]);
	
	// exports


/***/ },

/***/ 170:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJpSURBVEiJ7ZU/SFVhGMZ/b8pV7817uYkOQipmloga4t5SQxFBQzRqjpZWLjU0JUSQ5pAZFQT9mYNqagisrCkEuYuYDWaCXhKSqwjBeZ+We+qgordBWnymj+987/M773nej2OS2Ent2VH3XUAhKgYws4ILqqurj0nC3d8uLi5uOiHRwTFJBQFqa2stCIIz7j4sydy9X9KLbDbrWwEK+kR1dXVFkjqB+2ZWI2k/MOruXRUVFcVb1W4LqK+vjwG9wJCZVYUdS6oEBiX1pdPpkmhNeXl5YYCGhoYEcBUYMLN9m1zKNHBD0rVkMrk33MzlciQSCWCLDBobG1Puft3deyWVBEGAuyPpS3590N0JggBJv9x9xN0HVlZWfoYvUlZWtnkHTU1NlWZ2x8wum1lJWGBmGaAbOA9MhuclxYBLwHA8Hq+Kx+MArK2tbQQ0NzfXAHeBLqA4Yj4B9MzPz48vLCx8BHokfTazMJMioBMYkVRbWloKrMugpaXlEHDPzM5Fn5nZB6B7bm5uPNzLZrOfgG5J7/JnkGSSzgKjkg7HYrG/Jm1tba3AQzM7FYWa2XugZ3Z2dpJ1WlpaygAXJI0BCrOUdBJ4JOmISaK9vf24u9+U1OHuhOG5+2tJ/TMzMzMbgooolUodcPchSafd3SL1E2EHt8ysI08nP1mvzKx3O3OA5eXlr0CfpJdAdJbbQ8ADST/yazez58DF6enp2e3MQ+VyuW9Ar6RnQJDfXgoBj4HbknJm9hS4MjU1NVeoeajV1dXvQL+kJ0AOGPxz0VpbW5OSTgBjmUxm8V/No4rFYlXAUUlvbPef/N8BvwH0R1f4eEkyUwAAAABJRU5ErkJggg=="

/***/ },

/***/ 171:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfeBAoWAgxd9mAwAAAB3UlEQVQ4y33UvU5UURAH8B9mt3DpRFgLY2CJSiXaKN+aEJ6AR2CBBzDERnkA40sYehIDrFR8BGMUCpVKUcCETjBABQksY7HXy64szklu5szM/5w7M/851JPnzoTJeq4rdWwNbmsg+V4CyOp3PdGvagOtcomlyYBsNSxrwqGSB6BgSwjb2sF9cw49q4b0ORDCljFjlpwI4cSycaM2hXCo/xxwzYxIgsqJVlnlBBzmNFUSrMg908kPsOe9b0KHbs2Jbcuwz7XpjyRnlXTJgIxH5pJ7Ry/Wq6gslOSRN2RIHi3mhLLx2ro3KlgUdnXjsVXHjq15gkd+CcvaNVYSeGHKim0nwoysFqtpymvyMt4IJ7a9M2VSTVVeYdBRuj82hJdVEWf1qPFfyZh0R6ubbsnokLVu3cPEu+6LjA6c2rHjp++VpHPaLAh7etDvoyNHVg2gy66wpCBXS8aiU2HeDTQbNKgFeSWhbKxeHyqNm9eT0Cyr29ukcSng7yWdphUS/bcPvuKurpTy24Z9Oj+9yWxKvtNLyFdKwei1L4RNRUULKb0XFY34IYSDanpnPbVvVidoSweokDB5xoGJf2eut8J35CwLYUVjOi99teG10uC1EKbqPQKZOoCw4Qwb4qLzD7Pm0OTa60qbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTE3VDE1OjE5OjUxKzA4OjAwOgwg9AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNC0xMFQyMjowMjoxMiswODowMCINKlEAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTEwMj2xdT0AAAAYdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTEwMij4qSQAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTM5NzEzODUzMhjQbhcAAAASdEVYdFRodW1iOjpTaXplADQxLjFLQtxBgJwAAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExNDM4LzExNDM4MTMucG5nCoYRCQAAAABJRU5ErkJggg=="

/***/ },

/***/ 172:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMzSURBVEiJtZbNTxtHGMaf553V2oa1DbTuESEZZCHYA/wRvVZtqh6iiH4QtZFJq95oSg6oTQVqK1UlYDVtSqMoivpP9G/gxIEvCSFxQqX4A4y99rw9ZNdyjA20Eu9pdmbe3/M+M7OzS1XFTYbcKB0AVBWRC9d1J13Xfe//snzff9/3/cl2bssBybestY8A/BGPxz/4r/CJiYnbANZJLk5PT78Z9bcv0RNVfQdASkQKfX19d64LHx8f/9BauwYgKSK3VPXXbgK1tvYbIlJIJpO3r4KPjY3NWGtXSQ60dZ93E5gluQgA1loASJIspNPpj3rBs9nsLIBVAB7JMNUuALh7QUBVTz3Pe0RygWQ93Pg0ycdDQ0MznfCRkZFZVV0JCwGAmqp+fX5+vryxsXHWzQFOTk6arusuAXhAsqqqIOmRXMtkMveiecPDw/dVdUVV+8LiKqo6X61Wv9/e3rbtTEZHNKyiFZ7n5UVkmWTSGAPHcUoism6MERH5REQ8YwyMMUURmd/a2nrSnt/i9hIAgFQqNSMiKyKSdhwHIqLGGJBk+HwiInO7u7svO3Mj7qVvcqlUeg7gLslKuFxUVYbFlFX1427w9nAuGwSAwcFBGwQBgiB49WaKQFVRrVZZq9WuzL/Uwejo6B2S647jeOHSqKpqo9FAEAQegKepVOrCCbuWQC6Xu0dyDUBaVWGMKYvIY2vtz9baEkmoahrAqud5+V6cCxaz2SxjsdiXzWbzWwD94Wadkvzq8PCwAACZTGYLwA8i4jUajSSAHxOJRNxxnJ/K5fJr9/9rDnK5nCQSiXmSyyT7AYDkKcn7BwcHhWje0dHRL6o6p6qV0EkCwFK9Xn8wMDBgugpMTU31x2KxBZJLANyw8hLJL/b39591Oj0+Pn6uqp8DKIYirqp+V6lUHkbFdTp4KiLfAK0zXAEwt7e3t95rfYvF4jNVzQMoi7xCqeoigN+7CbhRQ1X/EZH8zs7Oi17wKMrl8ktrbR7A391YrU0m+Vmz2VQAb4tIfnNz88+r4FGcnZ29iMfjdQC/kfwLwKetwfZPpu/7k77v37ouuDNc133Xdd2Jdm7rLrqpuPG/in8BC8hfYkejRugAAAAASUVORK5CYII="

/***/ },

/***/ 173:
/***/ function(module, exports) {

	"use strict";
	
	console.log("=== simpread focus controlbar load ===");
	
	var fcontrol = function () {
	    var timer,
	        template = '<div class="ks-simpread-constrolbar">\
	                        <ul>\
	                            <li><span class="topicon"></span></li>\
	                            <li><span class="settingicon"></span></li>\
	                            <li><span class="closeicon"></span></li>\
	                        </ul>\
	                    </div>';
	
	    function FControl() {
	        this.$parent = null;
	        this.$target = null;
	    }
	
	    /*
	        Add focus constrol bar
	    */
	    FControl.prototype.Render = function (root) {
	        console.log("=== simpread focus controlbar add ===");
	        this.$parent = $(root);
	        $(root).append(template);
	        this.$target = $(".ks-simpread-constrolbar").find("span");
	        //addStyle( this.$target );
	        addEventHandler(this.$target, root);
	    };
	
	    /*
	        Remove focus constrol bar
	    */
	    FControl.prototype.Remove = function () {
	        console.log("=== simpread focus controlbar remove ===");
	        this.$target.off("click");
	        this.$target.remove();
	    };
	
	    /*
	        Add focus constrol bar style
	    */
	    /*
	    function addStyle( $target ) {
	        var path = chrome.extension.getURL("/");
	        $($target[0]).attr( "style", "background-image:url(" + path + "assets/images/top.png)"     );
	        $($target[1]).attr( "style", "background-image:url(" + path + "assets/images/setting.png)" );
	        $($target[2]).attr( "style", "background-image:url(" + path + "assets/images/close.png)"   );
	    }
	    */
	
	    /*
	        Add focus constrol bar event
	    */
	    function addEventHandler($target, root) {
	        $target.click(function (event) {
	            switch ($(event.currentTarget).attr("class")) {
	                case "topicon":
	                    console.log("==== focus control top active ====");
	                    moveTop();
	                    break;
	                case "settingicon":
	                    console.log("==== focus control setting active ====");
	                    break;
	                case "closeicon":
	                    console.log("==== focus control close active ====");
	                    $(root).click();
	                    break;
	            }
	        });
	        /*$( document ).scroll( function( event ) {
	            var osTop = document.body.scrollTop;
	            if ( osTop >= document.documentElement.clientHeight ) {
	                $target.find( "span" ).hide();
	            }else{
	                $target.find( "span" ).show();
	            }
	            if( !isTop ) {
	                clearInterval( timer );
	            }
	            isTop = false;
	        });*/
	    }
	
	    /*
	        Move top
	    */
	    function moveTop() {
	        timer = setInterval(function () {
	            var osTop = document.body.scrollTop;
	            var speed = Math.floor(-osTop / 3);
	            document.body.scrollTop = osTop + speed;
	            //isTop = true;
	            if (osTop == 0) {
	                clearInterval(timer);
	            }
	        }, 30);
	    }
	
	    return new FControl();
	}();
	
	module.exports = fcontrol;

/***/ }

});
//# sourceMappingURL=contentscripts.js.map