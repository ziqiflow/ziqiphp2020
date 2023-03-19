module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0029":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "0185":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("e5fa");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "037f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetFormItem_vue_vue_type_style_index_0_id_c29bb9f6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e480");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetFormItem_vue_vue_type_style_index_0_id_c29bb9f6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetFormItem_vue_vue_type_style_index_0_id_c29bb9f6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WidgetFormItem_vue_vue_type_style_index_0_id_c29bb9f6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "03ca":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("f2fe");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "044b":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "0808":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0a06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__("2444");
var utils = __webpack_require__("c532");
var InterceptorManager = __webpack_require__("f6b4");
var dispatchRequest = __webpack_require__("5270");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "0a0a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var core = __webpack_require__("a7d3");
var LIBRARY = __webpack_require__("b457");
var wksExt = __webpack_require__("fda1");
var defineProperty = __webpack_require__("3adc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0df6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "0f89":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("6f8a");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "103a":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("da3c").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "12fd":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("6f8a");
var document = __webpack_require__("da3c").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "12fd9":
/***/ (function(module, exports) {



/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1516":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      },
      componentData: {
        type: Object,
        required: false,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var headerOffset = 0;
        var children = slots;
        var _$slots = this.$slots,
            header = _$slots.header,
            footer = _$slots.footer;

        if (header) {
          headerOffset = header.length;
          children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : [].concat(_toConsumableArray(header));
        }
        if (footer) {
          children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        this.headerOffset = headerOffset;
        var attributes = null;
        var update = function update(name, value) {
          attributes = buildAttribute(attributes, name, value);
        };
        update('attrs', this.$attrs);
        if (this.componentData) {
          var _componentData = this.componentData,
              on = _componentData.on,
              _props = _componentData.props;

          update('on', on);
          update('props', _props);
        }
        return h(this.element, attributes, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        if (this._sortable !== undefined) this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          this.updateEvenemt(evt);
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          this.updateEvenemt(evt);
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          this.updateEvenemt(evt);
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        updateEvenemt: function updateEvenemt(evt) {
          this.updateProperty(evt, 'newIndex');
          this.updateProperty(evt, 'oldIndex');
        },
        updateProperty: function updateProperty(evt, propertyName) {
          evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__("53fe");
    module.exports = buildDraggable(Sortable);
  } else { var draggable; }
})();

/***/ }),

/***/ "16e7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("d13f");
var $parseInt = __webpack_require__("7704");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "1938":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("d13f");

$export($export.S, 'Array', { isArray: __webpack_require__("b5aa") });


/***/ }),

/***/ "196c":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "1b55":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("7772")('wks');
var uid = __webpack_require__("7b00");
var Symbol = __webpack_require__("da3c").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "1b8f":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a812");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da3c");
var core = __webpack_require__("a7d3");
var dP = __webpack_require__("3adc");
var DESCRIPTORS = __webpack_require__("7d95");
var SPECIES = __webpack_require__("1b55")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "1c01":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("a7d3");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "1d2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "1e61":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Table/CTable.vue?vue&type=template&id=895ca1d4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"frommark-ctable"},[_c('el-table',{style:(_vm.styles),attrs:{"border":"","data":_vm.sync_value},on:{"header-dragend":_vm.headerDragend}},[_vm._l((_vm.tableset),function(item2,index){return (item2.limittype!='hidden')?_c('el-table-column',{key:index,attrs:{"label":(item2.limittype=='canedit'&&item2.required?'*':'')+item2.name,"width":item2.width},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var dataitem = ref.row;
var index = ref.index;
return [(item2.editer=='text')?[_c('el-input',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"size":"mini","placeholder":item2.placeholder},on:{"change":function (value) { return _vm.changed(value, dataitem,item2,index); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}})]:_vm._e(),(item2.editer=='textarea')?[_c('el-input',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"size":"mini","type":"textarea","rows":1,"placeholder":item2.placeholder},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}})]:_vm._e(),(item2.editer=='select')?[_c('el-select',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"clearable":true,"placeholder":item2.placeholder},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}},_vm._l((_vm.tranStrtoList(item2.datasource)),function(source,indexs){return _c('el-option',{key:indexs,attrs:{"value":source,"label":source}})}),1)]:_vm._e(),(item2.editer=='selectMultiple')?[_c('el-select',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"multiple":"","clearable":true,"placeholder":item2.placeholder},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}},_vm._l((_vm.tranStrtoList(item2.datasource)),function(source,indexs){return _c('el-option',{key:indexs,attrs:{"value":source,"label":source}})}),1)]:_vm._e(),(item2.editer=='radio')?[_c('el-radio-group',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"size":"mini"},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}},_vm._l((_vm.tranStrtoList(item2.datasource)),function(source,indexs){return _c('el-radio',{key:indexs,attrs:{"label":source}},[[_vm._v(_vm._s(source))]],2)}),1)]:_vm._e(),(item2.editer=='checkbox')?[_c('el-checkbox-group',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"size":"mini"},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}},_vm._l((_vm.tranStrtoList(item2.datasource)),function(source,indexs){return _c('el-checkbox',{key:indexs,attrs:{"label":source}},[[_vm._v(_vm._s(source))]],2)}),1)]:_vm._e(),(item2.editer=='date')?[_c('el-date-picker',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"size":"mini","placeholder":item2.placeholder,"clearable":true},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}})]:_vm._e(),(item2.editer=='datetime')?[_c('el-date-picker',{attrs:{"disabled":_vm.IsDisabled(item2,dataitem),"type":"datetime","size":"mini","placeholder":item2.placeholder,"clearable":true},on:{"change":function (){ return _vm.rowUpdate(dataitem); }},model:{value:(dataitem[item2.code]),callback:function ($$v) {_vm.$set(dataitem, item2.code, $$v)},expression:"dataitem[item2.code]"}})]:_vm._e()]}}])}):_vm._e()}),(!!_vm.disabled)?_c('el-table-column',{attrs:{"label":"创建者","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var dataitem = ref.row;
return [_c('div',{staticClass:"fz12"},[_vm._v(_vm._s(dataitem._creater))]),_c('div',{staticClass:"fz12"},[_vm._v(" "+_vm._s(_vm.funtool_timetrans(dataitem._c_at)))])]}}])}):_vm._e(),(!!_vm.disabled)?_c('el-table-column',{attrs:{"label":"更新者","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var dataitem = ref.row;
return [_c('div',{staticClass:"fz12"},[_vm._v(_vm._s(dataitem._updater))]),_c('div',{staticClass:"fz12"},[_vm._v(_vm._s(_vm.funtool_timetrans(dataitem._u_at)))])]}}])}):_vm._e(),(!_vm.disabled)?_c('el-table-column',{attrs:{"label":"操作","width":"40","fixed":"right"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
var $index = ref.$index;
return [(_vm.IsShowDelete(row))?_c('i',{staticClass:"el-icon-delete",staticStyle:{"cursor":"pointer","margin-left":"10px"},on:{"click":function($event){_vm.deleteRow($index)}}}):_vm._e()]}}])}):_vm._e()],2),(!_vm.disabled&&_vm.addable)?_c('el-button',{staticStyle:{"margin-top":"10px"},attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addnowline}},[_vm._v("添加行")]):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Table/CTable.vue?vue&type=template&id=895ca1d4&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Table/CTable.vue?vue&type=script&lang=js&
var CTablevue_type_script_lang_js_ = __webpack_require__("7363");

// CONCATENATED MODULE: ./src/components/Table/CTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var Table_CTablevue_type_script_lang_js_ = (CTablevue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/components/Table/CTable.vue?vue&type=style&index=0&lang=css&
var CTablevue_type_style_index_0_lang_css_ = __webpack_require__("9387");

// EXTERNAL MODULE: ./src/components/Table/CTable.vue?vue&type=style&index=1&lang=css&
var CTablevue_type_style_index_1_lang_css_ = __webpack_require__("d1d3");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Table/CTable.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Table_CTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CTable.vue"
/* harmony default export */ var CTable = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2312":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8ce0");


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2418":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6a9b");
var toLength = __webpack_require__("a5ab");
var toAbsoluteIndex = __webpack_require__("1b8f");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "2444":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("c532");
var normalizeHeaderName = __webpack_require__("c8af");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("b50d");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__("b50d");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "245b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "268f":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2a04");

/***/ }),

/***/ "2695":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("43c8");
var toIObject = __webpack_require__("6a9b");
var arrayIndexOf = __webpack_require__("2418")(false);
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';

// eslint-disable-next-line no-empty
var SUPPORTS_Y = !!(function () { try { return new RegExp('x', 'y'); } catch (e) {} })();

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2a04":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("4938");
var $Object = __webpack_require__("a7d3").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "2a4e":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a812");
var defined = __webpack_require__("e5fa");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d81":
/***/ (function(module, exports) {

/*
    json_parse.js
    2015-05-02

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.

        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint for */

/*property
    at, b, call, charAt, f, fromCharCode, hasOwnProperty, message, n, name,
    prototype, push, r, t, text
*/

var json_parse = (function () {
    "use strict";

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

// We are defining the function inside of another function to avoid creating
// global variables.

    var at,     // The index of the current character
        ch,     // The current character
        escapee = {
            '"': '"',
            '\\': '\\',
            '/': '/',
            b: '\b',
            f: '\f',
            n: '\n',
            r: '\r',
            t: '\t'
        },
        text,

        error = function (m) {

// Call error when something is wrong.

            throw {
                name: 'SyntaxError',
                message: m,
                at: at,
                text: text
            };
        },

        next = function (c) {

// If a c parameter is provided, verify that it matches the current character.

            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

// Get the next character. When there are no more characters,
// return the empty string.

            ch = text.charAt(at);
            at += 1;
            return ch;
        },

        number = function () {

// Parse a number value.

            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error("Bad number");
            } else {
                if (string.length > 15) {
                  return string;
                }
                return number;
            }
        },

        string = function () {

// Parse a string value.

            var hex,
                i,
                string = '',
                uffff;

// When parsing for string values, we must look for " and \ characters.

            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    }
                    if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        white = function () {

// Skip whitespace.

            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {

// true, false, or null.

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + ch + "'");
        },

        value,  // Place holder for the value function.

        array = function () {

// Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },

        object = function () {

// Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object;   // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

    value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

        white();
        switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9'
                ? number()
                : word();
        }
    };

// Return the json_parse function. It will have access to all of the above
// functions and variables.

    return function (source, reviver) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary root object that holds the result
// in an empty key. If there is not a reviver function, we simply return the
// result.

        return typeof reviver === 'function'
            ? (function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }({'': result}, ''))
            : result;
    };
}());

module.exports = json_parse;


/***/ }),

/***/ "2d83":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("387f");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2e67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "2ea1":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("6f8a");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "3022":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = Object({"NODE_ENV":"production","BASE_URL":"/"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__("d60a");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__("3fb5");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba"), __webpack_require__("4362")))

/***/ }),

/***/ "302f":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("0f89");
var aFunction = __webpack_require__("f2fe");
var SPECIES = __webpack_require__("1b55")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "30b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "314e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fd61");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "31c2":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3516":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("65ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "36dc":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var macrotask = __webpack_require__("df0a").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("6e1f")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "387f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "38bc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3904":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("8ce0");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "3934":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "3adc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0f89");
var IE8_DOM_DEFINE = __webpack_require__("a47f");
var toPrimitive = __webpack_require__("2ea1");
var dP = Object.defineProperty;

exports.f = __webpack_require__("7d95") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "3fb5":
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "4020":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("795b");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("5f72");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_2__);


 // create an axios instance

var service = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
  //baseURL: 'http://127.0.0.1:8099', // process.env.BASE_API, // api 的 base_url http://127.0.0.1:8099
  timeout: 5000,
  // request timeout
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    var JSONBigInt = __webpack_require__("b4ec"); //console.log(JSONBigInt.parse(data));


    return JSONBigInt.parse(data); // return data;
  }]
}); // request interceptor

service.interceptors.request.use(function (config) {
  // Do something before request is sent
  // if (store.getters.token) {
  //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = getToken()
  //   if (!config.data) {
  //     config.data = {}
  //   }
  //   config.data._employeetoken = getToken()
  //   config.data._href = window.location.href
  // }
  return config;
}, function (error) {
  // Do something with request error
  console.log(error); // for debug

  _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(error);
}); // response interceptor

service.interceptors.response.use(function (response) {
  return response;
},
/**
 * 下面的注释为通过在response里，自定义code来标示请求状态
 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
 * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
 */
// response => {
//   const res = response.data
//   if (res.code !== 20000) {
//     Message({
//       message: res.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//       // 请自行在引入 MessageBox
//       // import { Message, MessageBox } from 'element-ui'
//       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//         confirmButtonText: '重新登录',
//         cancelButtonText: '取消',
//         type: 'warning'
//       }).then(() => {
//         store.dispatch('FedLogOut').then(() => {
//           location.reload() // 为了重新实例化vue-router对象 避免bug
//         })
//       })
//     }
//     return Promise.reject('error')
//   } else {
//     return response.data
//   }
// },
function (error) {
  console.log('err' + error); // for debug

  console.log(error);
  window.error_test = error;
  Object(element_ui__WEBPACK_IMPORTED_MODULE_2__["Message"])({
    message: !!error.response.data.message ? error.response.data.message : error.message,
    type: 'error',
    duration: 5 * 1000
  });
  return _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(error);
});
/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4260":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return loadJs; });
/* unused harmony export loadCss */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateUUID; });
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6b54");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("795b");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);



var loadJs = function loadJs(url) {
  return new _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    script.onload = function () {
      resolve();
    };
  });
};
var loadCss = function loadCss(url) {
  return new _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    link.onload = function () {
      resolve();
    };
  });
};
var generateUUID = function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
};

/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
	setTimeout(fn, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "436c":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("1b55")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "437d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "43c8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("2d83");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4938":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("6a9b");
var $getOwnPropertyDescriptor = __webpack_require__("626e").f;

__webpack_require__("c165")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4d7f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f499");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("795b");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cebc");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("75fc");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c5f6");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("a4bb");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _GenerateFormItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5531");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4260");








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'fm-generate-form',
  components: {
    GenetateFormItem: _GenerateFormItem__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]
  },
  props: ['data', 'remote', 'value', 'insite'],
  data: function data() {
    return {
      models: {},
      rules: {}
    };
  },
  created: function created() {
    this.generateModle(this.data.list);
  },
  methods: {
    generateModle: function generateModle(genList) {
      var _this = this;

      for (var i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(function (item) {
            _this.generateModle(item.list);
          });
        } else {
          if (this.value && _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_6___default()(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            if (genList[i].type === 'blank') {
              this.models[genList[i].model] = genList[i].options.defaultType === 'String' ? '' : genList[i].options.defaultType === 'Object' ? {} : [];
            } else {
              //this.models[genList[i].model] = genList[i].options.defaultValue
              console.log('defaultType', genList[i].options.defaultType);

              switch (genList[i].options.defaultType) {
                case 'String':
                  this.models[genList[i].model] = genList[i].options.defaultValue + '';
                  break;

                case 'Number':
                  this.models[genList[i].model] = Number(genList[i].options.defaultValue);
                  break;

                case 'Object':
                case 'Array':
                  if (typeof this.value[genList[i].model] == 'string') {
                    try {
                      this.models[genList[i].model] = JSON.parse(genList[i].options.defaultValue);
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    //if(typeof this.value[genList[i].model]=='object'){
                    this.models[genList[i].model] = genList[i].options.defaultValue;
                  }

                //}

                default:
                  this.models[genList[i].model] = genList[i].options.defaultValue;
                  break;
              }
            }
          }

          if (!!genList[i].rules) {
            if (this.rules[genList[i].model]) {
              this.rules[genList[i].model] = [].concat(Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(this.rules[genList[i].model]), Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(genList[i].rules.map(function (item) {
                if (item.pattern) {
                  return Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, item, {
                    pattern: eval(item.pattern)
                  });
                } else {
                  return Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, item);
                }
              })));
            } else {
              this.rules[genList[i].model] = Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(genList[i].rules.map(function (item) {
                if (item.pattern) {
                  return Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, item, {
                    pattern: eval(item.pattern)
                  });
                } else {
                  return Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, item);
                }
              }));
            }
          }
        }
      }
    },
    getFormItemByType: function getFormItemByType(list, type) {
      //return
      var arrlist = [];

      for (var i = 0; i < list.length; i++) {
        var ele = list[i];
        console.log('ele', ele);

        if (ele.type == 'grid' && !!ele.columns) {
          if (ele.columns.length) {
            for (var k = 0; k < ele.columns.length; k++) {
              var elek = ele.columns[k];

              if (elek.list.length) {
                var back = this.getFormItemByType(elek.list, type);

                if (back.length > 0) {
                  arrlist = arrlist.concat(back);
                }
              }
            }
          }
        } else {
          if (ele.type == type) {
            arrlist.push(ele); // return ele;
          }
        }
      } //console.log(arrlist);


      return arrlist;
    },
    getData: function getData() {
      var _this2 = this;

      return new _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        var tablelist = _this2.getFormItemByType(_this2.data.list, 'table');

        console.log('tablelist', tablelist);

        for (var k = 0; k < tablelist.length; k++) {
          var table = tablelist[k];
          console.log(table);
          console.log('this.models[table.model]', _this2.models[table.model]); //判断是否

          if (table.options.required) {
            if (!_this2.models[table.model] || _this2.models[table.model].length == 0) {
              reject(new Error('表格【' + table.name + '】不可为空').message);
              console.log('[表格]' + table.name + '不可为空');
              return false;
            }
          }

          for (var j = 0; j < table.options.tableset.length; j++) {
            var tableset = table.options.tableset[j];

            if (!!tableset.required) {
              //要求为必填。
              if (!!_this2.models[table.model] && _this2.models[table.model].length > 0) {
                for (var p = 0; p < _this2.models[table.model].length; p++) {
                  var row = _this2.models[table.model][p]; //对数据是否必填进行判断

                  if (table.options.table_edit) {
                    //对老数据进行验证码
                    if (!!row.is_old) {
                      if (!row[tableset.code]) {
                        reject(new Error('表格【' + table.name + '】 列名[' + tableset.name + '] 第' + (p + 1) + '行 为必填项').message);
                        return;
                      }
                    }
                  }

                  if (table.options.table_add) {
                    //只对新数据进行验证码
                    if (!row.is_old) {
                      if (!row[tableset.code]) {
                        reject(new Error('表格【' + table.name + '】 列名[' + tableset.name + '] 第' + (p + 1) + '行 为必填项').message);
                        return;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        _this2.$refs.generateForm.validate(function (valid) {
          if (valid) {
            //对models 里面的table进行验证；
            console.log(_this2.models);
            resolve(_this2.models);
          } else {
            reject(new Error('表单数据校验失败').message);
          }
        });
      });
    },
    refresh: function refresh() {}
  },
  watch: {
    value: {
      deep: true,
      handler: function handler(val) {
        console.log(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(val));
        this.models = Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, this.models, val);
      }
    }
  }
});

/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5176":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("81ee");

/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "5270":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var transformData = __webpack_require__("c401");
var isCancel = __webpack_require__("2e67");
var defaults = __webpack_require__("2444");
var isAbsoluteURL = __webpack_require__("d925");
var combineURLs = __webpack_require__("e683");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53fe":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),

/***/ "54aa":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("16e7");
module.exports = __webpack_require__("a7d3").parseInt;


/***/ }),

/***/ "5531":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateFormItem.vue?vue&type=template&id=593fa120&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.widget.options.hideable)?_c('el-form-item',{attrs:{"label":_vm.widget.name,"prop":_vm.widget.model}},[(_vm.widget.type == 'input')?[(_vm.widget.options.dataType == 'number' || _vm.widget.options.dataType == 'integer' || _vm.widget.options.dataType == 'float')?_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.dataType,"placeholder":_vm.widget.options.placeholder,"disabled":!!_vm.widget.options.disabled},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=_vm._n($$v)},expression:"dataModel"}}):_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.dataType,"placeholder":_vm.widget.options.placeholder,"disabled":!!_vm.widget.options.disabled},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'textarea')?[_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":"textarea","rows":5,"placeholder":_vm.widget.options.placeholder,"disabled":!!_vm.widget.options.disabled},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'number')?[_c('el-input-number',{style:({width: _vm.widget.options.width}),attrs:{"step":_vm.widget.options.step,"disabled":!!_vm.widget.options.disabled,"controls-position":"right"},model:{value:(_vm.widget.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.widget.options, "defaultValue", $$v)},expression:"widget.options.defaultValue"}})]:_vm._e(),(_vm.widget.type == 'radio')?[_c('el-radio-group',{style:({width: _vm.widget.options.width}),model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},[(_vm.widget.options.sourceType=='options')?_vm._l((_vm.widget.options.options),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item.value}},[[_vm._v(_vm._s(_vm.widget.options.showLabel ? item.label : item.value))]],2)}):_vm._e(),(_vm.widget.options.sourceType=='json')?_vm._l((_vm.widget.options.jsonOptions),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item[_vm.widget.options.props.value]}},[[_vm._v(_vm._s(item[_vm.widget.options.props.label]))]],2)}):_vm._e(),(_vm.widget.options.sourceType=='remote')?_vm._l((_vm.widget.options.remoteOptions),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item.value}},[[_vm._v("\n                        "+_vm._s(item.label)+"\n                    ")]],2)}):_vm._e()],2)]:_vm._e(),(_vm.widget.type == 'checkbox')?[_c('el-checkbox-group',{style:({width: _vm.widget.options.width}),model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},[(_vm.widget.options.sourceType=='options')?_vm._l((_vm.widget.options.options),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item.value}},[[_vm._v(_vm._s(_vm.widget.options.showLabel ? item.label : item.value))]],2)}):_vm._e(),(_vm.widget.options.sourceType=='json')?_vm._l((_vm.widget.options.jsonOptions),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item[_vm.widget.options.props.value]}},[[_vm._v(_vm._s(item[_vm.widget.options.props.label]))]],2)}):_vm._e(),(_vm.widget.options.sourceType=='remote')?_vm._l((_vm.widget.options.remoteOptions),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.widget.options.disabled,"label":item.value}},[[_vm._v("\n                        "+_vm._s(item.label)+"\n                    ")]],2)}):_vm._e()],2)]:_vm._e(),(_vm.widget.type == 'time')?[_c('el-time-picker',{style:({width: _vm.widget.options.width}),attrs:{"is-range":_vm.widget.options.isRange,"placeholder":_vm.widget.options.placeholder,"start-placeholder":_vm.widget.options.startPlaceholder,"end-placeholder":_vm.widget.options.endPlaceholder,"readonly":_vm.widget.options.readonly,"disabled":_vm.widget.options.disabled,"editable":_vm.widget.options.editable,"clearable":_vm.widget.options.clearable,"arrowControl":_vm.widget.options.arrowControl,"value-format":_vm.widget.options.format},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='date')?[_c('el-date-picker',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.type,"placeholder":_vm.widget.options.placeholder,"start-placeholder":_vm.widget.options.startPlaceholder,"end-placeholder":_vm.widget.options.endPlaceholder,"readonly":_vm.widget.options.readonly,"disabled":_vm.widget.options.disabled,"editable":_vm.widget.options.editable,"clearable":_vm.widget.options.clearable,"value-format":_vm.widget.options.timestamp ? 'timestamp' : _vm.widget.options.format,"format":_vm.widget.options.format},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type =='rate')?[_c('el-rate',{attrs:{"max":_vm.widget.options.max,"disabled":_vm.widget.options.disabled,"allow-half":_vm.widget.options.allowHalf},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'color')?[_c('el-color-picker',{attrs:{"disabled":_vm.widget.options.disabled,"show-alpha":_vm.widget.options.showAlpha},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'select')?[_c('el-select',{style:({width: _vm.widget.options.width}),attrs:{"disabled":_vm.widget.options.disabled,"multiple":_vm.widget.options.multiple,"clearable":_vm.widget.options.clearable,"placeholder":_vm.widget.options.placeholder},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},[(_vm.widget.options.sourceType=='options')?_vm._l((_vm.widget.options.options),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":_vm.widget.options.showLabel?item.label:item.value}})}):_vm._e(),(_vm.widget.options.sourceType=='json')?_vm._l((_vm.widget.options.jsonOptions),function(item,index){return _c('el-option',{key:index,attrs:{"value":item[_vm.widget.options.props.value],"label":item[_vm.widget.options.props.label]}})}):_vm._e(),(_vm.widget.options.sourceType=='remote')?_vm._l((_vm.widget.options.remoteOptions),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":item.label}})}):_vm._e()],2)]:_vm._e(),(_vm.widget.type=='switch')?[_c('el-switch',{attrs:{"disabled":_vm.widget.options.disabled},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='slider')?[_c('el-slider',{style:({width: _vm.widget.options.width}),attrs:{"min":_vm.widget.options.min,"max":_vm.widget.options.max,"disabled":_vm.widget.options.disabled,"step":_vm.widget.options.step,"show-input":_vm.widget.options.showInput,"range":_vm.widget.options.range},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='imgupload')?[_c('fm-upload',{style:({'width': _vm.widget.options.width}),attrs:{"disabled":_vm.widget.options.disabled,"width":_vm.widget.options.size.width,"height":_vm.widget.options.size.height,"token":_vm.widget.options.token,"domain":_vm.widget.options.domain},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'editor')?[_c('fm-editor',{attrs:{"width":_vm.widget.options.width,"height":_vm.widget.options.height},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'cascader')?[_c('el-cascader',{style:({width: _vm.widget.options.width}),attrs:{"disabled":_vm.widget.options.disabled,"clearable":_vm.widget.options.clearable,"placeholder":_vm.widget.options.placeholder,"options":_vm.widget.options.remoteOptions},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='custom')?[_c(_vm.widget.options.componentName,{tag:"component",attrs:{"disabled":_vm.widget.options.disabled,"styles":{'width': _vm.widget.options.width}},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='table')?[_c('fm-table',{attrs:{"disabled":_vm.widget.options.disabled,"styles":{'width': _vm.widget.options.width},"tableset":_vm.widget.options.tableset,"editadle":_vm.widget.options.table_edit,"addable":_vm.widget.options.table_add,"deleteable":_vm.widget.options.table_delete,"table_row_create":_vm.widget.options.table_row_create,"table_row_update":_vm.widget.options.table_row_update},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(!!_vm.widget.tips)?[_c('span',{staticClass:"tips",domProps:{"innerHTML":_vm._s(_vm.widget.tips)}})]:_vm._e()],2):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue?vue&type=template&id=593fa120&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("bd86");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// EXTERNAL MODULE: ./src/components/Upload/index.vue + 5 modules
var Upload = __webpack_require__("c7f0");

// EXTERNAL MODULE: ./src/components/Table/CTable.vue + 3 modules
var CTable = __webpack_require__("1e61");

// EXTERNAL MODULE: ./src/components/Editor/tinymce.vue + 4 modules
var tinymce = __webpack_require__("9336");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateFormItem.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/** 后期增加span模式。只读模式 readonly 模式 */

/* harmony default export */ var GenerateFormItemvue_type_script_lang_js_ = ({
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
    FmUpload: Upload["a" /* default */],
    FmEditor: tinymce["a" /* default */],
    FmTable: CTable["a" /* default */]
  },
  data: function data() {
    return {
      dataModel: this.models[this.widget.model]
    };
  },
  created: function created() {
    var _this = this;

    if (this.widget.options.sourceType == 'remote' && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc](function (data) {
        _this.widget.options.remoteOptions = data.map(function (item) {
          return {
            value: item[_this.widget.options.props.value],
            label: item[_this.widget.options.props.label],
            children: item[_this.widget.options.props.children]
          };
        });
      });
    }

    if (this.widget.type === 'imgupload') {
      this.remote[this.widget.options.tokenFunc](function (data) {
        _this.widget.options.token = data;
      });
    }
  },
  methods: {},
  watch: {
    dataModel: {
      deep: true,
      handler: function handler(val) {
        this.models[this.widget.model] = val;
        this.$emit('update:models', Object(objectSpread["a" /* default */])({}, this.models, Object(defineProperty["a" /* default */])({}, this.widget.model, val)));
      }
    },
    models: {
      deep: true,
      handler: function handler(val) {
        this.dataModel = val[this.widget.model];
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GenerateFormItemvue_type_script_lang_js_ = (GenerateFormItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/GenerateFormItem.vue?vue&type=style&index=0&id=593fa120&scoped=true&lang=css&
var GenerateFormItemvue_type_style_index_0_id_593fa120_scoped_true_lang_css_ = __webpack_require__("eddc");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_GenerateFormItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "593fa120",
  null
  
)

component.options.__file = "GenerateFormItem.vue"
/* harmony default export */ var GenerateFormItem = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "560b":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("bc25");
var call = __webpack_require__("9c93");
var isArrayIter = __webpack_require__("c227");
var anObject = __webpack_require__("0f89");
var toLength = __webpack_require__("a5ab");
var getIterFn = __webpack_require__("f159");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "565d":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6a9b");
var gOPN = __webpack_require__("d876").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "5698":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("d256");
module.exports = __webpack_require__("a7d3").Object.getOwnPropertySymbols;


/***/ }),

/***/ "57f7":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("93c4");
__webpack_require__("6109");
module.exports = __webpack_require__("a7d3").Array.from;


/***/ }),

/***/ "5927":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("93c4");
__webpack_require__("b42c");
module.exports = __webpack_require__("fda1").f('iterator');


/***/ }),

/***/ "5b5f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b457");
var global = __webpack_require__("da3c");
var ctx = __webpack_require__("bc25");
var classof = __webpack_require__("7d8a");
var $export = __webpack_require__("d13f");
var isObject = __webpack_require__("6f8a");
var aFunction = __webpack_require__("f2fe");
var anInstance = __webpack_require__("b0bc");
var forOf = __webpack_require__("560b");
var speciesConstructor = __webpack_require__("302f");
var task = __webpack_require__("df0a").set;
var microtask = __webpack_require__("36dc")();
var newPromiseCapabilityModule = __webpack_require__("03ca");
var perform = __webpack_require__("75c9");
var userAgent = __webpack_require__("8a12");
var promiseResolve = __webpack_require__("decf");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("1b55")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("3904")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("c0d8")($Promise, PROMISE);
__webpack_require__("1be4")(PROMISE);
Wrapper = __webpack_require__("a7d3")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("436c")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5ce7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("7108");
var descriptor = __webpack_require__("f845");
var setToStringTag = __webpack_require__("c0d8");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("8ce0")(IteratorPrototype, __webpack_require__("1b55")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "5d58":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5927");

/***/ }),

/***/ "5d8f":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("7772")('keys');
var uid = __webpack_require__("7b00");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "5f72":
/***/ (function(module, exports) {

module.exports = require("ELEMENT");

/***/ }),

/***/ "6109":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("bc25");
var $export = __webpack_require__("d13f");
var toObject = __webpack_require__("0185");
var call = __webpack_require__("9c93");
var isArrayIter = __webpack_require__("c227");
var toLength = __webpack_require__("a5ab");
var createProperty = __webpack_require__("b3ec");
var getIterFn = __webpack_require__("f159");

$export($export.S + $export.F * !__webpack_require__("436c")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "6127":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "626e":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("d74e");
var createDesc = __webpack_require__("f845");
var toIObject = __webpack_require__("6a9b");
var toPrimitive = __webpack_require__("2ea1");
var has = __webpack_require__("43c8");
var IE8_DOM_DEFINE = __webpack_require__("a47f");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("7d95") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "6277":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("7b00")('meta');
var isObject = __webpack_require__("6f8a");
var has = __webpack_require__("43c8");
var setDesc = __webpack_require__("3adc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("d782")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "633a":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("d13f");
var defined = __webpack_require__("e5fa");
var fails = __webpack_require__("d782");
var spaces = __webpack_require__("702a");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "65ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("b258");

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6a9b":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("8bab");
var defined = __webpack_require__("e5fa");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6e1f":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6f8a":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "702a":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "7108":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("0f89");
var dPs = __webpack_require__("f568");
var enumBugKeys = __webpack_require__("0029");
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("12fd")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("103a").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "7363":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6762");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2fdb");
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7618");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("28a5");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4917");
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5176");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vue_propsync__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("e76f");
/* harmony import */ var vue_propsync__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vue_propsync__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _util_request__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("4020");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("f654");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_11__);









//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'MyTable',
  mixins: [vue_propsync__WEBPACK_IMPORTED_MODULE_9___default.a],
  components: {},
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      },
      isSync: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    tableset: {},
    editadle: {
      type: Boolean,
      default: true
    },
    addable: {
      type: Boolean,
      default: true
    },
    deleteable: {
      type: Boolean,
      default: true
    },
    table_row_create: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    table_row_update: {
      type: Object,
      default: function _default() {
        return {};
      }
    } //:editadle="element.options.table_edit" :addable="element.options.table_add" :deleteable="element.options.table_delete"

  },
  data: function data() {
    return {
      loading: false,
      funGroup: [],
      //远程函数
      remoteHistory: {},
      queueList: {},
      httping: false,
      funlist_api: window.funlist_api,
      callback_default_api: window.callback_default_api //data: this.sync_value

    };
  },
  methods: {
    funtool_timetrans: function funtool_timetrans(date) {
      if (!date) return '';
      var date = new Date(date * 1000); //如果date为13位不需要乘1000

      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    IsShowDelete: function IsShowDelete(row) {
      if (this.disabled) return false;
      if (!row.is_old) return true;
      if (!!row.is_old && this.deleteable) return true;
      return false;
    },
    rowUpdate: function rowUpdate(row) {
      row['_u_at'] = Date.parse(new Date()) / 1000;

      _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8___default()(row, this.table_row_update);
    },
    IsDisabled: function IsDisabled(tableRowSet, datarow) {
      if (this.disabled) {
        //如果是设置成禁止，那么就禁止
        return true;
      } //判断设置上此项目是否
      //tableRowSet.limittype=='';//canedit,readonly,hidden


      if (!tableRowSet.limittype || tableRowSet.limittype == 'readonly' || tableRowSet.limittype == 'hidden') {
        //为空，为只读，为隐藏，那么就disable 
        return true;
      } //如果是老数据，根据ableedit 判断是否有 


      if (!!datarow.is_old && !this.editadle) {
        //有 old 标记，同时 禁止编辑 那么就
        return true;
      }

      return false;
    },
    deleteRow: function deleteRow(index) {
      // if(!this.disabled&&this.deleteable){
      // console.log(index);
      this.sync_value.splice(index, 1); // }
    },
    computeData: function computeData(rowdata, relateColSet, rowIndex) {
      var _this = this;

      //计算公式
      //rowIndex 行号，为了区分作用域；

      /*rowdata 行数据{
          2xBeo: null
      24GE7: 
      CxuHu: null
      GisNZ: null
      KzpgP: null
      XQHZ4: null
      dYNBX: null
      j5eOh: null
      lNp1n: null
      lwHA7: "122"
      mW2b9: null
      qt2WE: null
      vID1X: null
      }*/
      //relateColSet 相关的列设置

      /* {
      "code": "j5eOh",
      "name": "管理类别",
      "placeholder": "输入管理类别",
      "width": null,
      "editer": "select",
      "datasource": "核心商品,强效商品,次强商品,竞争商品,次竟商品,一般商品,代购商品,淘汰商品,开发商品,中药饮片,院外处方,赠品物资",
      "aggregate": null,
      "formula": null
      },
      */
      //计算优先级问题：1.先替换了行列内容。2然后计算函数；然后eval一下；
      var matchCol = relateColSet.formula.match(/@\[.+?\]/g);
      var replaceList = [];

      if (matchCol) {
        matchCol.forEach(function (ele) {
          var back = /@\[(.+?)\]/g.exec(ele);

          if (!!back) {
            var code = null;

            for (var i = 0; i < _this.tableset.length; i++) {
              var element = _this.tableset[i];

              if (element.name == back[1]) {
                code = element.code;
                break;
              }
            }

            var to = 0;

            if (!!code) {
              if (!!rowdata[code]) {
                to = rowdata[code];
              }
            }

            replaceList.push({
              from: ele,
              to: to
            });
          }
        });
      }

      var evalstr = relateColSet.formula;
      replaceList.forEach(function (ele) {
        evalstr = _this.replaceAll(evalstr, ele.from, ele.to);
      });
      console.log('第一步执行完毕；替换完所有列变量evalstr', evalstr);
      replaceList = []; //第二个replacelist
      //接下来读取函数。然后把通过远程函数把值计算出来；远程函数

      var matchFun = evalstr.match(/#\[.+?\]\(.*?\)/g);

      if (!!matchFun) {
        matchFun.forEach(function (ele) {
          var back = /#\[(.+?)\]\((.*?)\)/g.exec(ele);
          /**
           * 0: "#[转为海典商品字段](@[商品编码],商品名)"
          1: "转为海典商品字段"
          2: "@[商品编码],商品名"
           */

          if (!!back) {
            //在当前的group库中查询 对应的函数，然后找到对应的api和函数
            var toer = {
              api: null,
              fun: null,
              frontfun: null,
              paras: []
            };

            for (var i = 0; i < _this.funGroup.length; i++) {
              var group = _this.funGroup[i];

              for (var k = 0; k < group.funlist.length; k++) {
                var fun = group.funlist[k];

                if (group.prefix + fun.funname == back[1]) {
                  toer.api = group.api;
                  toer.fun = fun.fun;
                  toer.frontfun = fun.frontfun;

                  if (!!back[2]) {
                    back[2] = _this.replaceAll(back[2], '，', ',');
                    toer.paras = back[2].split(',').map(function (item) {
                      return item.trim();
                    });
                  }

                  break;
                }
              }
            }

            replaceList.push({
              from: ele,
              toer: toer
            });
          }
        });
      }

      console.log(replaceList); //等待执行

      this.waitingGetData(rowIndex, evalstr, replaceList, function () {
        _this.queueList[rowIndex].forEach(function (ele) {
          if (ele.colcode == relateColSet.code) {
            ele.hasfinish = true;
          }
        });

        replaceList.forEach(function (ele) {
          evalstr = _this.replaceAll(evalstr, ele.from, ele.to);
        });
        rowdata[relateColSet.code] = eval(evalstr);
      }); //  replaceList.forEach(ele => {
      //     if(!ele.toer.mergeFile){
      //         //表示单独运算
      //     }
      //     evalstr = this.replaceAll(evalstr, ele.from, ele.to)
      // })
      //rowdata[relateColSet.code] = eval(evalstr);
    },
    findfields: function findfields(name) {
      for (var k = 0; k < this.funGroup.length; k++) {
        var group = this.funGroup[k];

        for (var i = 0; i < group.fields.length; i++) {
          var fun = group.fields[i];

          if (fun.name == name) {
            return fun.value;
          }
        }
      }

      return null;
    },
    todata: function todata(data) {
      if (typeof data == 'string') {
        return '"' + data + '"';
      } else {
        return data;
      }
    },
    getcallurl: function getcallurl() {
      var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!!api) return api;
      return this.callback_default_api;
    },
    //多个字段更新的时候，这个会同时触发；
    waitingGetData: function waitingGetData(rowIndex, evalstr, replaceList, callback) {
      var _this2 = this;

      if (this.httping) {
        setTimeout(function () {
          console.log('有http运行中，等待执行');

          _this2.waitingGetData(rowIndex, evalstr, replaceList, callback);
        }, 100);
        return;
      } //判断列表前一个是否结束；
      //for (let i = 0; i < this.sync_value.length; i++) {
      // for (let k = 0; k < this.queueList[rowIndex].length; k++) {
      //     let ele = this.queueList[rowIndex][k];
      //     if(! ele.hasfinish){
      //     }
      // }
      //}
      //执行机制；一个一个获取数据，只有一个获取成功后，才会获取下一个。
      //等待执行：


      var _loop = function _loop(k) {
        var replace = replaceList[k];

        if (typeof replace.to == "undefined") {
          switch (replace.toer.frontfun) {
            case 'uri_merge_para0':
              //此函数的意思是：第一个是key 第二个
              var frontfun = replace.toer.frontfun;
              console.log('remoteHistory', _this2.remoteHistory);

              if (!_this2.remoteHistory[frontfun]) {
                _this2.remoteHistory[frontfun] = [];
              } //let abc= this.remoteHistory;
              //console.log('remoteHistory',this.remoteHistory[frontfun]);
              //从里面查询有没有获取到对应的信息，如果有的话，那么就


              var hasfind = false;

              for (var i = 0; i < _this2.remoteHistory[frontfun].length; i++) {
                var history = _this2.remoteHistory[frontfun][i];

                if (history.para0 == replace.toer.paras[0]) {
                  //把第二个参数解析成 变量
                  //history.result['']
                  hasfind = true;

                  var key = _this2.findfields(replace.toer.paras[1]);

                  if (!key || !history.result) {
                    replace.to = null;
                  } else {
                    replace.to = _this2.todata(!!history.result[key] ? history.result[key] : null);
                  }

                  break;
                }
              }

              if (!hasfind) {
                _this2.httping = true;
                Object(_util_request__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])({
                  url: _this2.getcallurl(replace.toer.api),
                  data: {
                    'fun': replace.toer.fun,
                    'paras': replace.toer.paras
                  },
                  method: 'post'
                }).then(function (_ref) {
                  var req = _ref.data;

                  //console.log('frontfun',frontfun);
                  _this2.remoteHistory[frontfun].push({
                    para0: replace.toer.paras[0],
                    result: req.data
                  }); //let abc = this.remoteHistory;
                  //console.log('remoteHistory',this.remoteHistory);


                  _this2.httping = false;

                  _this2.waitingGetData(rowIndex, evalstr, replaceList, callback); // setTimeout(() => {
                  // }, 400);

                }).catch(function (err) {
                  replace.to = null;
                  setTimeout(function () {
                    _this2.httping = false;
                  }, 10);
                });
              } else {
                console.log('匹配上了', replace.to);
                console.log(replace.toer);

                _this2.waitingGetData(rowIndex, evalstr, replaceList, callback);
              }

              break;

            default:
              _this2.httping = true; //发起一次联网请求

              Object(_util_request__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])({
                url: _this2.getcallurl(),
                data: {
                  'fun': replace.toer.fun,
                  'paras': replace.toer.paras
                },
                method: 'post'
              }).then(function (_ref2) {
                var req = _ref2.data;

                if (typeof req.data == 'string') {
                  replace.to = '"' + req.data + '"';
                } else {
                  replace.to = req.data;
                }

                _this2.waitingGetData(rowIndex, evalstr, replaceList, callback);

                setTimeout(function () {
                  _this2.httping = false;
                }, 10); // setTimeout(() => {
                // }, 400);
              }).catch(function (err) {
                replace.to = null;
                setTimeout(function () {
                  _this2.httping = false;
                }, 10);
              });
              break;
          } //结束运行


          console.log('结束运行');
          return {
            v: void 0
          };
        }
      };

      for (var k = 0; k < replaceList.length; k++) {
        var _ret = _loop(k);

        if (Object(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_ret) === "object") return _ret.v;
      } //表示全部都生成成功了。那么就


      callback();
    },
    replaceAll: function replaceAll(str, from, to) {
      var len = str.split(from).length - 1;

      for (var i = 0; i < len; i++) {
        str = str.replace(from, to);
      }

      return str;
    },
    // replaceAll(str, from, to) {
    //     xxx=str.replace(new RegExp(from, 'gm'), to)//对于包含特殊字符的会有bug
    //     return str.replace(new RegExp(from, 'gm'), to);
    // },
    changed: function changed(value, rowdata, nowtableset, rowIndex) {
      var _this3 = this;

      this.rowUpdate(rowdata);
      console.log('rowdata', rowdata); //当前列数据

      console.log('tableset', nowtableset); //当前的列设置
      //nowtableset.name; //查询所有是tableset 的 format 里面有没有这个字段
      //@[拟提供价]-@[差价]
      // if(!!this.queueList[index]){
      //      this.queueList[index]
      // }

      this.queueList[rowIndex] = [];
      var timeinter = 0;
      this.tableset.forEach(function (ele) {
        //查找到相关的ele
        //排除自己
        if (ele.code != nowtableset.code) {
          if (ele.matchCol.includes(nowtableset.name)) {
            //这些列上的数据会被更新;;计算公司
            _this3.queueList[rowIndex].push({
              colcode: ele.code,
              hasfinish: false
            }); //此代码暂时没有用上


            setTimeout(function () {
              //运算入口
              _this3.computeData(rowdata, ele, rowIndex); //避免所有的http同时执行

            }, timeinter); // console.log('时间间隔', timeinter);

            timeinter += 30; //dataitem[ele.code]=this.computeData()//;计算函数
          }
        }
      });
    },
    headerDragend: function headerDragend(newWidth, oldWidth, column, event) {
      console.log('newWidth', newWidth);
      console.log('oldWidth', oldWidth);
      console.log('column', column);
      console.log('event', event);
    },
    addnowline: function addnowline() {
      if (!(!this.disabled && this.addable)) return;
      var insertData = {};
      this.tableset.forEach(function (ele) {
        if (ele.editer == 'checkbox' || ele.editer == 'selectMultiple') {
          insertData[ele.code] = [];
        } else {
          insertData[ele.code] = null;
        }
      });
      insertData['_c_at'] = Date.parse(new Date()) / 1000;

      _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8___default()(insertData, this.table_row_create);

      insertData['_u_at'] = Date.parse(new Date()) / 1000;

      _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_8___default()(insertData, this.table_row_update); //insertData=insertData.concat(this.table_row_create);
      // console.log(insertData);
      // console.log(this.sync_value);


      if (!this.sync_value) this.sync_value = [];
      this.sync_value.push(insertData);
    },
    addpx: function addpx(value) {
      if (!value) return null;

      if (value.indexOf('px') != -1) {
        return value + 'px';
      }

      return value;
    },
    handlePreview: function handlePreview(file) {
      this.$message.info('查看文件');
    },
    removeList: function removeList(index) {
      this.sync_value.splice(index, 1);
    },
    tranStrtoList: function tranStrtoList(str) {
      if (!str) {
        return [];
      }

      var arr = str.split(',');
      var newarr = [];
      arr.forEach(function (ele) {
        ele = ele.trim();

        if (!!ele) {
          newarr.push(ele);
        }
      });
      return newarr;
    },
    unique: function unique(arr) {
      var n = [];

      for (var i = 0; i < arr.length; i++) {
        if (n.indexOf(arr[i]) == -1) {
          n.push(arr[i]);
        }
      }

      return n;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    if (!this.sync_value) this.sync_value = [];
    this.sync_value.forEach(function (val) {
      val.is_old = true;
    });
    console.log('value', this.value);
    console.log(this.sync_value); //获取数据

    this.tableset.forEach(function (ele) {
      ele.matchCol = []; //计算相关:1.提取 col 2.

      if (!!ele.formula) {
        var match = ele.formula.match(/@\[.+?\]/g);

        if (match) {
          match.forEach(function (v) {
            var back = /@\[(.+?)\]/g.exec(v);

            if (!!back) {
              ele.matchCol.push(back[1]);
            }
          }); //ele.matchCol = match;
        }
      }

      ele.matchFun = []; //计算相关:1.提取 col 2.

      if (!!ele.formula) {
        var _match = ele.formula.match(/#\[.+?\]\(.*?\)/g);

        if (_match) {
          ele.matchFun = _match;
        }
      }
    });
    console.log('tableset', this.tableset);
    Object(_util_request__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])({
      url: this.funlist_api,
      data: {},
      method: 'post'
    }).then(function (_ref3) {
      var req = _ref3.data;
      _this4.funGroup = req;
      console.log(req);
    }).catch(function (err) {
      console.log(err);
    });
  }
});

/***/ }),

/***/ "75c9":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "75fc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("c8bb");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js


function _iterableToArray(iter) {
  if (is_iterable_default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _toConsumableArray; });



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

/***/ }),

/***/ "7618":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5d58");
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("67bb");
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof2(obj) { if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && typeof _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && _typeof2(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "7633":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("2695");
var enumBugKeys = __webpack_require__("0029");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "7704":
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__("da3c").parseInt;
var $trim = __webpack_require__("633a").trim;
var ws = __webpack_require__("702a");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("57f7");

/***/ }),

/***/ "7772":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("a7d3");
var global = __webpack_require__("da3c");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b457") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "795b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dd04");

/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "7aac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "7b00":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "7d8a":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6e1f");
var TAG = __webpack_require__("1b55")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "7d95":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("d782")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "81ee":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("9a51");
module.exports = __webpack_require__("a7d3").Object.assign;


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ec5b");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "89ca":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("b42c");
__webpack_require__("93c4");
module.exports = __webpack_require__("d38f");


/***/ }),

/***/ "8a12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bab":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6e1f");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("Vue");

/***/ }),

/***/ "8ce0":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("3adc");
var createDesc = __webpack_require__("f845");
module.exports = __webpack_require__("7d95") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "8df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("7a77");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9336":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Editor/tinymce.vue?vue&type=template&id=65604ae1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fm-editor-container",style:({'width': this.width})},[_c('textarea',{attrs:{"id":_vm.id},domProps:{"value":_vm.content}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Editor/tinymce.vue?vue&type=template&id=65604ae1&

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("4260");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Editor/tinymce.vue?vue&type=script&lang=js&
//
//
//
//
//
//
 // import tinymce from '../../lib/tinymce/tinymce.js'
// import '../../lib/tinymce/themes/modern/theme'
// import '../../lib/tinymce/skins/lightgray/skin.min.css'
// import '../../lib/tinymce/skins/lightgray/content.min.css'
// import '../../lib/tinymce/skins/lightgray/fonts/tinymce.ttf'
// import '../../lib/tinymce/skins/lightgray/fonts/tinymce.woff'
// import '../../lib/tinymce/plugins/advlist'
// import '../../lib/tinymce/plugins/autolink'
// import '../../lib/tinymce/plugins/lists'
// import '../../lib/tinymce/plugins/link'
// import '../../lib/tinymce/plugins/image'
// import '../../lib/tinymce/plugins/charmap'
// import '../../lib/tinymce/plugins/print'
// import '../../lib/tinymce/plugins/preview'
// import '../../lib/tinymce/plugins/anchor'
// import '../../lib/tinymce/plugins/textcolor'
// import '../../lib/tinymce/plugins/searchreplace'
// import '../../lib/tinymce/plugins/visualblocks'
// import '../../lib/tinymce/plugins/code'
// import '../../lib/tinymce/plugins/fullscreen'
// import '../../lib/tinymce/plugins/insertdatetime'
// import '../../lib/tinymce/plugins/media'
// import '../../lib/tinymce/plugins/table'
// import '../../lib/tinymce/plugins/contextmenu'
// import '../../lib/tinymce/plugins/paste'
// import '../../lib/tinymce/plugins/help'
// import '../../lib/tinymce/plugins/wordcount'
// import '../../lib/tinymce/plugins/colorpicker'

/* harmony default export */ var tinymcevue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '200px'
    },
    width: {
      type: String
    }
  },
  data: function data() {
    return {
      id: 'editor-' + Object(util["a" /* generateUUID */])(),
      content: this.value
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    // console.log('abc');
    if (!window.tinymce) {
      Object(util["b" /* loadJs */])("https://cdn.staticfile.org/tinymce/4.8.0/tinymce.min.js").then(function () {
        alert('脚本加载成功');

        _this2.init();
      });
    } else {
      this.init();
    } // setTimeout(() => {
    //   this.init();
    // }, 10000);

  },
  methods: {
    init: function init() {
      var _this = this;

      window.tinymce.init({
        selector: '#' + _this.id,
        language_url: '/dist/lib/tinymce/zh_CN.js',
        language: 'zh_CN',
        // skin_url: 'lib/tinymce/skins/lightgray',
        height: this.height,
        menubar: false,
        // images_upload_handler: (blobInfo, success, failure) => {
        // },
        init_instance_callback: function init_instance_callback(editor) {
          console.log("Editor: " + editor.id + " is now initialized.");
          editor.on('input change undo redo', function () {
            _this.$emit('input', editor.getContent());
          });
        },
        setup: function setup(editor) {
          editor.on('input change undo redo', function () {
            _this.$emit('input', editor.getContent());
          });
        },
        plugins: ['advlist autolink lists link image charmap print preview anchor textcolor colorpicker', 'searchreplace visualblocks code fullscreen', 'insertdatetime table media  contextmenu paste code help wordcount'],
        toolbar: 'insert table | undo redo |  formatselect | bold italic strikethrough forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code '
      });
    },
    setHtml: function setHtml(val) {
      this.content = val;
      window.tinymce.activeEditor.setContent(val);
      this.$emit('input', val);
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.tinymce.get(this.id).destroy();
  },
  watch: {
    value: function value(val) {
      this.content = val;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Editor/tinymce.vue?vue&type=script&lang=js&
 /* harmony default export */ var Editor_tinymcevue_type_script_lang_js_ = (tinymcevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Editor/tinymce.vue?vue&type=style&index=0&lang=scss&
var tinymcevue_type_style_index_0_lang_scss_ = __webpack_require__("e769");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Editor/tinymce.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Editor_tinymcevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "tinymce.vue"
/* harmony default export */ var tinymce = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "9387":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6127");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "93c4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("2a4e")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("e4a9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "9a51":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("d13f");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("9e44") });


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c93":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("0f89");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9e44":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("7633");
var gOPS = __webpack_require__("31c2");
var pIE = __webpack_require__("d74e");
var toObject = __webpack_require__("0185");
var IObject = __webpack_require__("8bab");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("d782")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "9ea2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a4bb");
/* harmony import */ var _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("1516");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Table_CSet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("fff8");
/* harmony import */ var _JSON_CJSON__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b71c");
/* harmony import */ var _util_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4020");



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    Draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_3___default.a,
    TableSet: _Table_CSet__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
    JsonEditor: _JSON_CJSON__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  },
  props: ['data'],
  data: function data() {
    return {
      modelList: window.modelList,
      //数据通道。
      matchList: [{
        n: 'where:=',
        v: 'where:='
      }, {
        n: 'where:%like',
        v: 'where:%like'
      }, {
        n: 'where:%like%',
        v: 'where:%like%'
      }, {
        n: 'where:like%',
        v: 'where:like%'
      }, {
        n: 'where:>',
        v: 'where:>'
      }, {
        n: 'where:>=',
        v: 'where:>='
      }, {
        n: 'where:<',
        v: 'where:<'
      }, {
        n: 'where:<=',
        v: 'where:<='
      }, {
        n: 'where:in',
        v: 'where:in'
      }, {
        n: 'where:between',
        v: 'where:between'
      }],
      customlist: [],
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    };
  },
  computed: {
    show: function show() {
      //&& Object.keys(this.data).length > 0
      if (!!this.data) {
        return true;
      }

      return false;
    }
  },
  methods: {
    whenModelSelectChange: function whenModelSelectChange(value) {
      var _this = this;

      console.log('whenModelSelectChange', value);
      this.modelList.forEach(function (ele) {
        if (ele.name == value) {
          _this.data.name = ele.zh_name;
        }
      });
    },
    handleOptionsRemove: function handleOptionsRemove(index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1);
      } else {
        this.data.options.options.splice(index, 1);
      }
    },
    handleAddOption: function handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        });
      } else {
        this.data.options.options.push({
          value: '新选项'
        });
      }
    },
    handleAddColumn: function handleAddColumn() {
      this.data.columns.push({
        span: '',
        list: []
      });
    },
    generateRule: function generateRule() {
      var _this2 = this;

      this.data.rules = [];

      _Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(this.validator).forEach(function (key) {
        if (_this2.validator[key]) {
          _this2.data.rules.push(_this2.validator[key]);
        }
      });
    },
    handleSelectMuliple: function handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue];
        } else {
          this.data.options.defaultValue = [];
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0];
        } else {
          this.data.options.defaultValue = '';
        }
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    Object(_util_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])({
      url: window.customlist_api,
      data: {},
      method: 'post'
    }).then(function (_ref) {
      var req = _ref.data;
      _this3.customlist = req;
      console.log('customlist', _this3.customlist);
    }).catch(function (err) {
      console.log(err);
    });
  },
  watch: {
    'data': function data(val) {
      var _this4 = this;

      var keylist = ['isRange', 'required', 'dataType', 'pattern'];
      var temp = {};
      keylist.forEach(function (e) {
        temp[e] = _this4.data.options[e];
        _this4.data.options[e] = null;
      });
      setTimeout(function () {
        keylist.forEach(function (e) {
          _this4.data.options[e] = temp[e];
        });
      }, 30);
    },
    'data.options.isRange': function dataOptionsIsRange(val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null;
        } else {
          if (_Users_xuzhonda_Desktop_vue_form_making_2_node_modules_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(this.data.options).indexOf('defaultValue') >= 0) this.data.options.defaultValue = '';
        }
      }
    },
    'data.options.required': function dataOptionsRequired(val) {
      var _this5 = this;

      if (val) {
        this.validator.required = {
          required: true,
          message: "".concat(this.data.name, "\u5FC5\u987B\u586B\u5199")
        };
      } else {
        this.validator.required = null;
      }

      this.$nextTick(function () {
        _this5.generateRule();
      });
    },
    'data.options.dataType': function dataOptionsDataType(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.type = {
          type: val,
          message: this.data.name + '格式不正确'
        };
      } else {
        this.validator.type = null;
      }

      this.generateRule();
    },
    'data.options.pattern': function dataOptionsPattern(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.pattern = {
          pattern: eval(val),
          message: this.data.name + '格式不匹配'
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    }
  }
});

/***/ }),

/***/ "9fa6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "a47f":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("7d95") && !__webpack_require__("d782")(function () {
  return Object.defineProperty(__webpack_require__("12fd")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a4bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("fda6");

/***/ }),

/***/ "a5ab":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("a812");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d604");

/***/ }),

/***/ "a7d3":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "a812":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "aa1c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0bc":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b22a":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "b258":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("d256");
__webpack_require__("12fd9");
__webpack_require__("d127");
__webpack_require__("d24f");
module.exports = __webpack_require__("a7d3").Symbol;


/***/ }),

/***/ "b311":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clipboardAction = __webpack_require__(1);

var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

var _tinyEmitter = __webpack_require__(3);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _goodListener = __webpack_require__(4);

var _goodListener2 = _interopRequireDefault(_goodListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
var Clipboard = function (_Emitter) {
    _inherits(Clipboard, _Emitter);

    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    function Clipboard(trigger, options) {
        _classCallCheck(this, Clipboard);

        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

        _this.resolveOptions(options);
        _this.listenClick(trigger);
        return _this;
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */


    _createClass(Clipboard, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
        }

        /**
         * Adds a click event listener to the passed trigger.
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         */

    }, {
        key: 'listenClick',
        value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                return _this2.onClick(e);
            });
        }

        /**
         * Defines a new `ClipboardAction` on each click event.
         * @param {Event} e
         */

    }, {
        key: 'onClick',
        value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
                this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
                action: this.action(trigger),
                target: this.target(trigger),
                text: this.text(trigger),
                container: this.container,
                trigger: trigger,
                emitter: this
            });
        }

        /**
         * Default `action` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultAction',
        value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
        }

        /**
         * Default `target` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultTarget',
        value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
                return document.querySelector(selector);
            }
        }

        /**
         * Returns the support of the given action, or all actions if no action is
         * given.
         * @param {String} [action]
         */

    }, {
        key: 'defaultText',


        /**
         * Default `text` lookup function.
         * @param {Element} trigger
         */
        value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
        }

        /**
         * Destroy lifecycle.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
                this.clipboardAction.destroy();
                this.clipboardAction = null;
            }
        }
    }], [{
        key: 'isSupported',
        value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;

            actions.forEach(function (action) {
                support = support && !!document.queryCommandSupported(action);
            });

            return support;
        }
    }]);

    return Clipboard;
}(_tinyEmitter2.default);

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */


function getAttributeValue(suffix, element) {
    var attribute = 'data-clipboard-' + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

module.exports = Clipboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _select = __webpack_require__(2);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
var ClipboardAction = function () {
    /**
     * @param {Object} options
     */
    function ClipboardAction(options) {
        _classCallCheck(this, ClipboardAction);

        this.resolveOptions(options);
        this.initSelection();
    }

    /**
     * Defines base properties passed from constructor.
     * @param {Object} options
     */


    _createClass(ClipboardAction, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;

            this.selectedText = '';
        }

        /**
         * Decides which selection strategy is going to be applied based
         * on the existence of `text` and `target` properties.
         */

    }, {
        key: 'initSelection',
        value: function initSelection() {
            if (this.text) {
                this.selectFake();
            } else if (this.target) {
                this.selectTarget();
            }
        }

        /**
         * Creates a fake textarea element, sets its value from `text` property,
         * and makes a selection on it.
         */

    }, {
        key: 'selectFake',
        value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = function () {
                return _this.removeFake();
            };
            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';

            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;

            this.container.appendChild(this.fakeElem);

            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
        }

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */

    }, {
        key: 'removeFake',
        value: function removeFake() {
            if (this.fakeHandler) {
                this.container.removeEventListener('click', this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                this.container.removeChild(this.fakeElem);
                this.fakeElem = null;
            }
        }

        /**
         * Selects the content from element passed on `target` property.
         */

    }, {
        key: 'selectTarget',
        value: function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
        }

        /**
         * Executes the copy operation based on the current selection.
         */

    }, {
        key: 'copyText',
        value: function copyText() {
            var succeeded = void 0;

            try {
                succeeded = document.execCommand(this.action);
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        }

        /**
         * Fires an event based on the copy operation result.
         * @param {Boolean} succeeded
         */

    }, {
        key: 'handleResult',
        value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
                action: this.action,
                text: this.selectedText,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }

        /**
         * Moves focus away from `target` and back to the trigger, removes current selection.
         */

    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (this.trigger) {
                this.trigger.focus();
            }

            window.getSelection().removeAllRanges();
        }

        /**
         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
         * @param {String} action
         */

    }, {
        key: 'destroy',


        /**
         * Destroy lifecycle.
         */
        value: function destroy() {
            this.removeFake();
        }
    }, {
        key: 'action',
        set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
                throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
        }

        /**
         * Gets the `action` property.
         * @return {String}
         */
        ,
        get: function get() {
            return this._action;
        }

        /**
         * Sets the `target` property using an element
         * that will be have its content copied.
         * @param {Element} target
         */

    }, {
        key: 'target',
        set: function set(target) {
            if (target !== undefined) {
                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }

                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                    }

                    this._target = target;
                } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                }
            }
        }

        /**
         * Gets the `target` property.
         * @return {String|HTMLElement}
         */
        ,
        get: function get() {
            return this._target;
        }
    }]);

    return ClipboardAction;
}();

module.exports = ClipboardAction;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(5);
var delegate = __webpack_require__(6);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(7);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ })
/******/ ]);
});

/***/ }),

/***/ "b3e7":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "b3ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("3adc");
var createDesc = __webpack_require__("f845");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "b42c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fa54");
var global = __webpack_require__("da3c");
var hide = __webpack_require__("8ce0");
var Iterators = __webpack_require__("b22a");
var TO_STRING_TAG = __webpack_require__("1b55")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "b457":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "b4ec":
/***/ (function(module, exports, __webpack_require__) {

module.exports.parse = __webpack_require__("2d81");


/***/ }),

/***/ "b50d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var settle = __webpack_require__("467f");
var buildURL = __webpack_require__("30b5");
var parseHeaders = __webpack_require__("c345");
var isURLSameOrigin = __webpack_require__("3934");
var createError = __webpack_require__("2d83");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__("9fa6");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("7aac");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "b5aa":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6e1f");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "b604":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("d13f");
var core = __webpack_require__("a7d3");
var global = __webpack_require__("da3c");
var speciesConstructor = __webpack_require__("302f");
var promiseResolve = __webpack_require__("decf");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "b71c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JSON/CJSON.vue?vue&type=template&id=32676a71&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-input',{attrs:{"type":"textarea","rows":2},on:{"change":_vm.changeHandle},model:{value:(_vm.textarea),callback:function ($$v) {_vm.textarea=$$v},expression:"textarea"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/JSON/CJSON.vue?vue&type=template&id=32676a71&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__("f499");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/vue-propsync/index.js
var vue_propsync = __webpack_require__("e76f");
var vue_propsync_default = /*#__PURE__*/__webpack_require__.n(vue_propsync);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/JSON/CJSON.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var CJSONvue_type_script_lang_js_ = ({
  name: 'JSON',
  mixins: [vue_propsync_default.a],
  props: {
    value: {
      // type: Array,
      // default: () => {
      //     return []
      // },
      isSync: true
    }
  },
  data: function data() {
    return {
      textarea: null
    };
  },
  watch: {
    sync_value: function sync_value(newValue, oldValue) {
      this.textarea = stringify_default()(this.sync_value);
    }
  },
  methods: {
    changeHandle: function changeHandle() {
      console.log('...');

      try {
        this.sync_value = JSON.parse(this.textarea);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted: function mounted() {
    this.textarea = stringify_default()(this.sync_value);
  }
});
// CONCATENATED MODULE: ./src/components/JSON/CJSON.vue?vue&type=script&lang=js&
 /* harmony default export */ var JSON_CJSONvue_type_script_lang_js_ = (CJSONvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/JSON/CJSON.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  JSON_CJSONvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CJSON.vue"
/* harmony default export */ var CJSON = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "bc25":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("f2fe");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "bc3a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cee4");

/***/ }),

/***/ "bd86":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85f2");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c0d8":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("3adc").f;
var has = __webpack_require__("43c8");
var TAG = __webpack_require__("1b55")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "c165":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("d13f");
var core = __webpack_require__("a7d3");
var fails = __webpack_require__("d782");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "c227":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("b22a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "c345":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c401":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "c532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("1d2b");
var isBuffer = __webpack_require__("044b");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c609":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("d13f");
var newPromiseCapability = __webpack_require__("03ca");
var perform = __webpack_require__("75c9");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c7f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Upload/index.vue?vue&type=template&id=6ebdfa80&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fm-uplaod-container",attrs:{"id":_vm.uploadId}},[_vm._l((_vm.fileList),function(item){return _c('div',{key:item.key,staticClass:"upload-file",class:{uploading: item.status=='uploading', 'is-success': item.status=='success'},style:({width: _vm.width+'px', height: _vm.height+'px'}),attrs:{"id":item.key}},[_c('img',{attrs:{"src":item.url}}),(item.status=='uploading')?_c('el-progress',{staticClass:"upload-progress",attrs:{"width":_vm.miniWidth*0.9,"type":"circle","percentage":item.percent}}):_vm._e(),(item.status=='success')?_c('label',{staticClass:"item-status"},[_c('i',{staticClass:"el-icon-upload-success el-icon-check"})]):_vm._e(),_c('div',{staticClass:"uplaod-action"},[_c('i',{staticClass:"el-icon-view",style:({'font-size': _vm.miniWidth/4+'px'}),on:{"click":function($event){_vm.handlePreviewFile(item.key)}}}),_c('i',{staticClass:"el-icon-delete",style:({'font-size': _vm.miniWidth/4+'px'}),on:{"click":function($event){_vm.handleRemove(item.key)}}})])],1)}),(_vm.token)?_c('div',{staticClass:"el-upload el-upload--picture-card",style:({width: _vm.width+'px', height: _vm.height+'px'})},[_c('i',{staticClass:"el-icon-plus",style:({fontSize:_vm.miniWidth/4+'px',marginTop: (-_vm.miniWidth/8)+'px', marginLeft: (-_vm.miniWidth/8)+'px'})}),_c('input',{ref:"uploadInput",staticClass:"el-upload__input upload-input",style:({width: _vm.width+'px', height: _vm.height+'px'}),attrs:{"accept":"image/*","multiple":"","type":"file","name":"file"},on:{"change":_vm.handleChange}})]):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Upload/index.vue?vue&type=template&id=6ebdfa80&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("e814");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/viewerjs/dist/viewer.esm.js
/*!
 * Viewer.js v1.3.1
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-12-09T07:48:29.436Z
 */

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var DEFAULTS = {
  /**
   * Enable a modal backdrop, specify `static` for a backdrop
   * which doesn't close the modal on click.
   * @type {boolean}
   */
  backdrop: true,

  /**
   * Show the button on the top-right of the viewer.
   * @type {boolean}
   */
  button: true,

  /**
   * Show the navbar.
   * @type {boolean | number}
   */
  navbar: true,

  /**
   * Specify the visibility and the content of the title.
   * @type {boolean | number | Function | Array}
   */
  title: true,

  /**
   * Show the toolbar.
   * @type {boolean | number | Object}
   */
  toolbar: true,

  /**
   * Custom class name(s) to add to the viewer's root element.
   * @type {string}
   */
  className: '',

  /**
   * Define where to put the viewer in modal mode.
   * @type {string | Element}
   */
  container: 'body',

  /**
   * Filter the images for viewing. Return true if the image is viewable.
   * @type {Function}
   */
  filter: null,

  /**
   * Enable to request fullscreen when play.
   * @type {boolean}
   */
  fullscreen: true,

  /**
   * Define the initial index of image for viewing.
   * @type {number}
   */
  initialViewIndex: 0,

  /**
   * Enable inline mode.
   * @type {boolean}
   */
  inline: false,

  /**
   * The amount of time to delay between automatically cycling an image when playing.
   * @type {number}
   */
  interval: 5000,

  /**
   * Enable keyboard support.
   * @type {boolean}
   */
  keyboard: true,

  /**
   * Indicate if show a loading spinner when load image or not.
   * @type {boolean}
   */
  loading: true,

  /**
   * Indicate if enable loop viewing or not.
   * @type {boolean}
   */
  loop: true,

  /**
   * Min width of the viewer in inline mode.
   * @type {number}
   */
  minWidth: 200,

  /**
   * Min height of the viewer in inline mode.
   * @type {number}
   */
  minHeight: 100,

  /**
   * Enable to move the image.
   * @type {boolean}
   */
  movable: true,

  /**
   * Enable to zoom the image.
   * @type {boolean}
   */
  zoomable: true,

  /**
   * Enable to rotate the image.
   * @type {boolean}
   */
  rotatable: true,

  /**
   * Enable to scale the image.
   * @type {boolean}
   */
  scalable: true,

  /**
   * Indicate if toggle the image size between its natural size
   * and initial size when double click on the image or not.
   * @type {boolean}
   */
  toggleOnDblclick: true,

  /**
   * Show the tooltip with image ratio (percentage) when zoom in or zoom out.
   * @type {boolean}
   */
  tooltip: true,

  /**
   * Enable CSS3 Transition for some special elements.
   * @type {boolean}
   */
  transition: true,

  /**
   * Define the CSS `z-index` value of viewer in modal mode.
   * @type {number}
   */
  zIndex: 2015,

  /**
   * Define the CSS `z-index` value of viewer in inline mode.
   * @type {number}
   */
  zIndexInline: 0,

  /**
   * Define the ratio when zoom the image by wheeling mouse.
   * @type {number}
   */
  zoomRatio: 0.1,

  /**
   * Define the min ratio of the image when zoom out.
   * @type {number}
   */
  minZoomRatio: 0.01,

  /**
   * Define the max ratio of the image when zoom in.
   * @type {number}
   */
  maxZoomRatio: 100,

  /**
   * Define where to get the original image URL for viewing.
   * @type {string | Function}
   */
  url: 'src',

  /**
   * Event shortcuts.
   * @type {Function}
   */
  ready: null,
  show: null,
  shown: null,
  hide: null,
  hidden: null,
  view: null,
  viewed: null,
  zoom: null,
  zoomed: null
};

var TEMPLATE = '<div class="viewer-container" touch-action="none">' + '<div class="viewer-canvas"></div>' + '<div class="viewer-footer">' + '<div class="viewer-title"></div>' + '<div class="viewer-toolbar"></div>' + '<div class="viewer-navbar">' + '<ul class="viewer-list"></ul>' + '</div>' + '</div>' + '<div class="viewer-tooltip"></div>' + '<div role="button" class="viewer-button" data-viewer-action="mix"></div>' + '<div class="viewer-player"></div>' + '</div>';

var IS_BROWSER = typeof window !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
var NAMESPACE = 'viewer'; // Actions

var ACTION_MOVE = 'move';
var ACTION_SWITCH = 'switch';
var ACTION_ZOOM = 'zoom'; // Classes

var CLASS_ACTIVE = "".concat(NAMESPACE, "-active");
var CLASS_CLOSE = "".concat(NAMESPACE, "-close");
var CLASS_FADE = "".concat(NAMESPACE, "-fade");
var CLASS_FIXED = "".concat(NAMESPACE, "-fixed");
var CLASS_FULLSCREEN = "".concat(NAMESPACE, "-fullscreen");
var CLASS_FULLSCREEN_EXIT = "".concat(NAMESPACE, "-fullscreen-exit");
var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
var CLASS_HIDE_MD_DOWN = "".concat(NAMESPACE, "-hide-md-down");
var CLASS_HIDE_SM_DOWN = "".concat(NAMESPACE, "-hide-sm-down");
var CLASS_HIDE_XS_DOWN = "".concat(NAMESPACE, "-hide-xs-down");
var CLASS_IN = "".concat(NAMESPACE, "-in");
var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
var CLASS_LOADING = "".concat(NAMESPACE, "-loading");
var CLASS_MOVE = "".concat(NAMESPACE, "-move");
var CLASS_OPEN = "".concat(NAMESPACE, "-open");
var CLASS_SHOW = "".concat(NAMESPACE, "-show");
var CLASS_TRANSITION = "".concat(NAMESPACE, "-transition"); // Events

var EVENT_CLICK = 'click';
var EVENT_DBLCLICK = 'dblclick';
var EVENT_DRAG_START = 'dragstart';
var EVENT_HIDDEN = 'hidden';
var EVENT_HIDE = 'hide';
var EVENT_KEY_DOWN = 'keydown';
var EVENT_LOAD = 'load';
var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
var EVENT_READY = 'ready';
var EVENT_RESIZE = 'resize';
var EVENT_SHOW = 'show';
var EVENT_SHOWN = 'shown';
var EVENT_TRANSITION_END = 'transitionend';
var EVENT_VIEW = 'view';
var EVENT_VIEWED = 'viewed';
var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
var EVENT_ZOOM = 'zoom';
var EVENT_ZOOMED = 'zoomed'; // Data keys

var DATA_ACTION = "".concat(NAMESPACE, "Action"); // RegExps

var REGEXP_SPACES = /\s\s*/; // Misc

var BUTTONS = ['zoom-in', 'zoom-out', 'one-to-one', 'reset', 'prev', 'play', 'next', 'rotate-left', 'rotate-right', 'flip-horizontal', 'flip-vertical'];

/**
 * Check if the given value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Check if the given value is not a number.
 */

var viewer_esm_isNaN = Number.isNaN || WINDOW.isNaN;
/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */

function isNumber(value) {
  return typeof value === 'number' && !viewer_esm_isNaN(value);
}
/**
 * Check if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */

function isObject(value) {
  return _typeof(value) === 'object' && value !== null;
}
var viewer_esm_hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */

function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && viewer_esm_hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}
/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Iterate the given data.
 * @param {*} data - The data to iterate.
 * @param {Function} callback - The process function for each element.
 * @returns {*} The original data.
 */

function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)
    /* array-like */
    ) {
        var length = data.length;
        var i;

        for (i = 0; i < length; i += 1) {
          if (callback.call(data, data[i], i, data) === false) {
            break;
          }
        }
      } else if (isObject(data)) {
      Object.keys(data).forEach(function (key) {
        callback.call(data, data[key], key, data);
      });
    }
  }

  return data;
}
/**
 * Extend the given object.
 * @param {*} obj - The object to be extended.
 * @param {*} args - The rest objects which will be merged to the first object.
 * @returns {Object} The extended object.
 */

var viewer_esm_assign = Object.assign || function assign(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(obj) && args.length > 0) {
    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          obj[key] = arg[key];
        });
      }
    });
  }

  return obj;
};
var REGEXP_SUFFIX = /^(?:width|height|left|top|marginLeft|marginTop)$/;
/**
 * Apply styles to the given element.
 * @param {Element} element - The target element.
 * @param {Object} styles - The styles for applying.
 */

function setStyle(element, styles) {
  var style = element.style;
  forEach(styles, function (value, property) {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value += 'px';
    }

    style[property] = value;
  });
}
/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */

function hasClass(element, value) {
  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}
/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */

function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  var className = element.className.trim();

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = "".concat(className, " ").concat(value);
  }
}
/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */

function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}
/**
 * Add or remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be toggled.
 * @param {boolean} added - Add only.
 */

function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      toggleClass(elem, value, added);
    });
    return;
  } // IE10-11 doesn't support the second parameter of `classList.toggle`


  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}
var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
/**
 * Transform the given string from camelCase to kebab-case
 * @param {string} value - The value to transform.
 * @returns {string} The transformed value.
 */

function hyphenate(value) {
  return value.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
}
/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */

function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  }

  if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute("data-".concat(hyphenate(name)));
}
/**
 * Set data to the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to set.
 * @param {string} data - The data value.
 */

function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute("data-".concat(hyphenate(name)), data);
  }
}

var onceSupported = function () {
  var supported = false;

  if (IS_BROWSER) {
    var once = false;

    var listener = function listener() {};

    var options = Object.defineProperty({}, 'once', {
      get: function get() {
        supported = true;
        return once;
      },

      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function set(value) {
        once = value;
      }
    });
    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
}();
/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */


function removeListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (!onceSupported) {
      var listeners = element.listeners;

      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];

        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }

        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }

    element.removeEventListener(event, handler, options);
  });
}
/**
 * Add event listener to the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */

function addListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (options.once && !onceSupported) {
      var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;

      _handler = function handler() {
        delete listeners[event][listener];
        element.removeEventListener(event, _handler, options);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = _handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, _handler, options);
  });
}
/**
 * Dispatch event on the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Object} data - The additional event data.
 * @returns {boolean} Indicate if the event is default prevented or not.
 */

function dispatchEvent(element, type, data) {
  var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}
/**
 * Get the offset base on the document.
 * @param {Element} element - The target element.
 * @returns {Object} The offset data.
 */

function getOffset(element) {
  var box = element.getBoundingClientRect();
  return {
    left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: box.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
/**
 * Get transforms base on the given object.
 * @param {Object} obj - The target object.
 * @returns {string} A string contains transform values.
 */

function getTransforms(_ref) {
  var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
  var values = [];

  if (isNumber(translateX) && translateX !== 0) {
    values.push("translateX(".concat(translateX, "px)"));
  }

  if (isNumber(translateY) && translateY !== 0) {
    values.push("translateY(".concat(translateY, "px)"));
  } // Rotate should come first before scale to match orientation transform


  if (isNumber(rotate) && rotate !== 0) {
    values.push("rotate(".concat(rotate, "deg)"));
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    values.push("scaleX(".concat(scaleX, ")"));
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    values.push("scaleY(".concat(scaleY, ")"));
  }

  var transform = values.length ? values.join(' ') : 'none';
  return {
    WebkitTransform: transform,
    msTransform: transform,
    transform: transform
  };
}
/**
 * Get an image name from an image url.
 * @param {string} url - The target url.
 * @example
 * // picture.jpg
 * getImageNameFromURL('http://domain.com/path/to/picture.jpg?size=1280×960')
 * @returns {string} A string contains the image name.
 */

function getImageNameFromURL(url) {
  return isString(url) ? url.replace(/^.*\//, '').replace(/[?&#].*$/, '') : '';
}
var IS_SAFARI = WINDOW.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(WINDOW.navigator.userAgent);
/**
 * Get an image's natural sizes.
 * @param {string} image - The target image.
 * @param {Function} callback - The callback function.
 * @returns {HTMLImageElement} The new image.
 */

function getImageNaturalSizes(image, callback) {
  var newImage = document.createElement('img'); // Modern browsers (except Safari)

  if (image.naturalWidth && !IS_SAFARI) {
    callback(image.naturalWidth, image.naturalHeight);
    return newImage;
  }

  var body = document.body || document.documentElement;

  newImage.onload = function () {
    callback(newImage.width, newImage.height);

    if (!IS_SAFARI) {
      body.removeChild(newImage);
    }
  };

  newImage.src = image.src; // iOS Safari will convert the image automatically
  // with its orientation once append it into DOM

  if (!IS_SAFARI) {
    newImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
    body.appendChild(newImage);
  }

  return newImage;
}
/**
 * Get the related class name of a responsive type number.
 * @param {string} type - The responsive type.
 * @returns {string} The related class name.
 */

function getResponsiveClass(type) {
  switch (type) {
    case 2:
      return CLASS_HIDE_XS_DOWN;

    case 3:
      return CLASS_HIDE_SM_DOWN;

    case 4:
      return CLASS_HIDE_MD_DOWN;

    default:
      return '';
  }
}
/**
 * Get the max ratio of a group of pointers.
 * @param {string} pointers - The target pointers.
 * @returns {number} The result ratio.
 */

function getMaxZoomRatio(pointers) {
  var pointers2 = viewer_esm_assign({}, pointers);
  var ratios = [];
  forEach(pointers, function (pointer, pointerId) {
    delete pointers2[pointerId];
    forEach(pointers2, function (pointer2) {
      var x1 = Math.abs(pointer.startX - pointer2.startX);
      var y1 = Math.abs(pointer.startY - pointer2.startY);
      var x2 = Math.abs(pointer.endX - pointer2.endX);
      var y2 = Math.abs(pointer.endY - pointer2.endY);
      var z1 = Math.sqrt(x1 * x1 + y1 * y1);
      var z2 = Math.sqrt(x2 * x2 + y2 * y2);
      var ratio = (z2 - z1) / z1;
      ratios.push(ratio);
    });
  });
  ratios.sort(function (a, b) {
    return Math.abs(a) < Math.abs(b);
  });
  return ratios[0];
}
/**
 * Get a pointer from an event object.
 * @param {Object} event - The target event object.
 * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
 * @returns {Object} The result pointer contains start and/or end point coordinates.
 */

function getPointer(_ref2, endOnly) {
  var pageX = _ref2.pageX,
      pageY = _ref2.pageY;
  var end = {
    endX: pageX,
    endY: pageY
  };
  return endOnly ? end : viewer_esm_assign({
    timeStamp: Date.now(),
    startX: pageX,
    startY: pageY
  }, end);
}
/**
 * Get the center point coordinate of a group of pointers.
 * @param {Object} pointers - The target pointers.
 * @returns {Object} The center point coordinate.
 */

function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;
  forEach(pointers, function (_ref3) {
    var startX = _ref3.startX,
        startY = _ref3.startY;
    pageX += startX;
    pageY += startY;
    count += 1;
  });
  pageX /= count;
  pageY /= count;
  return {
    pageX: pageX,
    pageY: pageY
  };
}

var viewer_esm_render = {
  render: function render() {
    this.initContainer();
    this.initViewer();
    this.initList();
    this.renderViewer();
  },
  initContainer: function initContainer() {
    this.containerData = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  initViewer: function initViewer() {
    var options = this.options,
        parent = this.parent;
    var viewerData;

    if (options.inline) {
      viewerData = {
        width: Math.max(parent.offsetWidth, options.minWidth),
        height: Math.max(parent.offsetHeight, options.minHeight)
      };
      this.parentData = viewerData;
    }

    if (this.fulled || !viewerData) {
      viewerData = this.containerData;
    }

    this.viewerData = viewer_esm_assign({}, viewerData);
  },
  renderViewer: function renderViewer() {
    if (this.options.inline && !this.fulled) {
      setStyle(this.viewer, this.viewerData);
    }
  },
  initList: function initList() {
    var _this = this;

    var element = this.element,
        options = this.options,
        list = this.list;
    var items = [];
    forEach(this.images, function (image, i) {
      var src = image.src;
      var alt = image.alt || getImageNameFromURL(src);
      var url = options.url;

      if (isString(url)) {
        url = image.getAttribute(url);
      } else if (isFunction(url)) {
        url = url.call(_this, image);
      }

      if (src || url) {
        items.push('<li>' + '<img' + " src=\"".concat(src || url, "\"") + ' role="button"' + ' data-viewer-action="view"' + " data-index=\"".concat(i, "\"") + " data-original-url=\"".concat(url || src, "\"") + " alt=\"".concat(alt, "\"") + '>' + '</li>');
      }
    });
    list.innerHTML = items.join('');
    this.items = list.getElementsByTagName('li');
    forEach(this.items, function (item) {
      var image = item.firstElementChild;
      setData(image, 'filled', true);

      if (options.loading) {
        addClass(item, CLASS_LOADING);
      }

      addListener(image, EVENT_LOAD, function (event) {
        if (options.loading) {
          removeClass(item, CLASS_LOADING);
        }

        _this.loadImage(event);
      }, {
        once: true
      });
    });

    if (options.transition) {
      addListener(element, EVENT_VIEWED, function () {
        addClass(list, CLASS_TRANSITION);
      }, {
        once: true
      });
    }
  },
  renderList: function renderList(index) {
    var i = index || this.index;
    var width = this.items[i].offsetWidth || 30;
    var outerWidth = width + 1; // 1 pixel of `margin-left` width
    // Place the active item in the center of the screen

    setStyle(this.list, viewer_esm_assign({
      width: outerWidth * this.length
    }, getTransforms({
      translateX: (this.viewerData.width - width) / 2 - outerWidth * i
    })));
  },
  resetList: function resetList() {
    var list = this.list;
    list.innerHTML = '';
    removeClass(list, CLASS_TRANSITION);
    setStyle(list, getTransforms({
      translateX: 0
    }));
  },
  initImage: function initImage(done) {
    var _this2 = this;

    var options = this.options,
        image = this.image,
        viewerData = this.viewerData;
    var footerHeight = this.footer.offsetHeight;
    var viewerWidth = viewerData.width;
    var viewerHeight = Math.max(viewerData.height - footerHeight, footerHeight);
    var oldImageData = this.imageData || {};
    var sizingImage;
    this.imageInitializing = {
      abort: function abort() {
        sizingImage.onload = null;
      }
    };
    sizingImage = getImageNaturalSizes(image, function (naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var width = viewerWidth;
      var height = viewerHeight;
      _this2.imageInitializing = false;

      if (viewerHeight * aspectRatio > viewerWidth) {
        height = viewerWidth / aspectRatio;
      } else {
        width = viewerHeight * aspectRatio;
      }

      width = Math.min(width * 0.9, naturalWidth);
      height = Math.min(height * 0.9, naturalHeight);
      var imageData = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        ratio: width / naturalWidth,
        width: width,
        height: height,
        left: (viewerWidth - width) / 2,
        top: (viewerHeight - height) / 2
      };
      var initialImageData = viewer_esm_assign({}, imageData);

      if (options.rotatable) {
        imageData.rotate = oldImageData.rotate || 0;
        initialImageData.rotate = 0;
      }

      if (options.scalable) {
        imageData.scaleX = oldImageData.scaleX || 1;
        imageData.scaleY = oldImageData.scaleY || 1;
        initialImageData.scaleX = 1;
        initialImageData.scaleY = 1;
      }

      _this2.imageData = imageData;
      _this2.initialImageData = initialImageData;

      if (done) {
        done();
      }
    });
  },
  renderImage: function renderImage(done) {
    var _this3 = this;

    var image = this.image,
        imageData = this.imageData;
    setStyle(image, viewer_esm_assign({
      width: imageData.width,
      height: imageData.height,
      marginLeft: imageData.left,
      marginTop: imageData.top
    }, getTransforms(imageData)));

    if (done) {
      if ((this.viewing || this.zooming) && this.options.transition) {
        var onTransitionEnd = function onTransitionEnd() {
          _this3.imageRendering = false;
          done();
        };

        this.imageRendering = {
          abort: function abort() {
            removeListener(image, EVENT_TRANSITION_END, onTransitionEnd);
          }
        };
        addListener(image, EVENT_TRANSITION_END, onTransitionEnd, {
          once: true
        });
      } else {
        done();
      }
    }
  },
  resetImage: function resetImage() {
    // this.image only defined after viewed
    if (this.viewing || this.viewed) {
      var image = this.image;

      if (this.viewing) {
        this.viewing.abort();
      }

      image.parentNode.removeChild(image);
      this.image = null;
    }
  }
};

var events = {
  bind: function bind() {
    var options = this.options,
        viewer = this.viewer,
        canvas = this.canvas;
    var document = this.element.ownerDocument;
    addListener(viewer, EVENT_CLICK, this.onClick = this.click.bind(this));
    addListener(viewer, EVENT_WHEEL, this.onWheel = this.wheel.bind(this));
    addListener(viewer, EVENT_DRAG_START, this.onDragStart = this.dragstart.bind(this));
    addListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown = this.pointerdown.bind(this));
    addListener(document, EVENT_POINTER_MOVE, this.onPointerMove = this.pointermove.bind(this));
    addListener(document, EVENT_POINTER_UP, this.onPointerUp = this.pointerup.bind(this));
    addListener(document, EVENT_KEY_DOWN, this.onKeyDown = this.keydown.bind(this));
    addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));

    if (options.toggleOnDblclick) {
      addListener(canvas, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
    }
  },
  unbind: function unbind() {
    var options = this.options,
        viewer = this.viewer,
        canvas = this.canvas;
    var document = this.element.ownerDocument;
    removeListener(viewer, EVENT_CLICK, this.onClick);
    removeListener(viewer, EVENT_WHEEL, this.onWheel);
    removeListener(viewer, EVENT_DRAG_START, this.onDragStart);
    removeListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown);
    removeListener(document, EVENT_POINTER_MOVE, this.onPointerMove);
    removeListener(document, EVENT_POINTER_UP, this.onPointerUp);
    removeListener(document, EVENT_KEY_DOWN, this.onKeyDown);
    removeListener(window, EVENT_RESIZE, this.onResize);

    if (options.toggleOnDblclick) {
      removeListener(canvas, EVENT_DBLCLICK, this.onDblclick);
    }
  }
};

var handlers = {
  click: function click(event) {
    var target = event.target;
    var options = this.options,
        imageData = this.imageData;
    var action = getData(target, DATA_ACTION); // Cancel the emulated click when the native click event was triggered.

    if (IS_TOUCH_DEVICE && event.isTrusted && target === this.canvas) {
      clearTimeout(this.clickCanvasTimeout);
    }

    switch (action) {
      case 'mix':
        if (this.played) {
          this.stop();
        } else if (options.inline) {
          if (this.fulled) {
            this.exit();
          } else {
            this.full();
          }
        } else {
          this.hide();
        }

        break;

      case 'hide':
        this.hide();
        break;

      case 'view':
        this.view(getData(target, 'index'));
        break;

      case 'zoom-in':
        this.zoom(0.1, true);
        break;

      case 'zoom-out':
        this.zoom(-0.1, true);
        break;

      case 'one-to-one':
        this.toggle();
        break;

      case 'reset':
        this.reset();
        break;

      case 'prev':
        this.prev(options.loop);
        break;

      case 'play':
        this.play(options.fullscreen);
        break;

      case 'next':
        this.next(options.loop);
        break;

      case 'rotate-left':
        this.rotate(-90);
        break;

      case 'rotate-right':
        this.rotate(90);
        break;

      case 'flip-horizontal':
        this.scaleX(-imageData.scaleX || -1);
        break;

      case 'flip-vertical':
        this.scaleY(-imageData.scaleY || -1);
        break;

      default:
        if (this.played) {
          this.stop();
        }

    }
  },
  dblclick: function dblclick(event) {
    event.preventDefault();

    if (this.viewed && event.target === this.image) {
      // Cancel the emulated double click when the native dblclick event was triggered.
      if (IS_TOUCH_DEVICE && event.isTrusted) {
        clearTimeout(this.doubleClickImageTimeout);
      }

      this.toggle();
    }
  },
  load: function load() {
    var _this = this;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = false;
    }

    var element = this.element,
        options = this.options,
        image = this.image,
        index = this.index,
        viewerData = this.viewerData;
    removeClass(image, CLASS_INVISIBLE);

    if (options.loading) {
      removeClass(this.canvas, CLASS_LOADING);
    }

    image.style.cssText = 'height:0;' + "margin-left:".concat(viewerData.width / 2, "px;") + "margin-top:".concat(viewerData.height / 2, "px;") + 'max-width:none!important;' + 'position:absolute;' + 'width:0;';
    this.initImage(function () {
      toggleClass(image, CLASS_MOVE, options.movable);
      toggleClass(image, CLASS_TRANSITION, options.transition);

      _this.renderImage(function () {
        _this.viewed = true;
        _this.viewing = false;

        if (isFunction(options.viewed)) {
          addListener(element, EVENT_VIEWED, options.viewed, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_VIEWED, {
          originalImage: _this.images[index],
          index: index,
          image: image
        });
      });
    });
  },
  loadImage: function loadImage(event) {
    var image = event.target;
    var parent = image.parentNode;
    var parentWidth = parent.offsetWidth || 30;
    var parentHeight = parent.offsetHeight || 50;
    var filled = !!getData(image, 'filled');
    getImageNaturalSizes(image, function (naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var width = parentWidth;
      var height = parentHeight;

      if (parentHeight * aspectRatio > parentWidth) {
        if (filled) {
          width = parentHeight * aspectRatio;
        } else {
          height = parentWidth / aspectRatio;
        }
      } else if (filled) {
        height = parentWidth / aspectRatio;
      } else {
        width = parentHeight * aspectRatio;
      }

      setStyle(image, viewer_esm_assign({
        width: width,
        height: height
      }, getTransforms({
        translateX: (parentWidth - width) / 2,
        translateY: (parentHeight - height) / 2
      })));
    });
  },
  keydown: function keydown(event) {
    var options = this.options;

    if (!this.fulled || !options.keyboard) {
      return;
    }

    switch (event.keyCode || event.which || event.charCode) {
      // Escape
      case 27:
        if (this.played) {
          this.stop();
        } else if (options.inline) {
          if (this.fulled) {
            this.exit();
          }
        } else {
          this.hide();
        }

        break;
      // Space

      case 32:
        if (this.played) {
          this.stop();
        }

        break;
      // ArrowLeft

      case 37:
        this.prev(options.loop);
        break;
      // ArrowUp

      case 38:
        // Prevent scroll on Firefox
        event.preventDefault(); // Zoom in

        this.zoom(options.zoomRatio, true);
        break;
      // ArrowRight

      case 39:
        this.next(options.loop);
        break;
      // ArrowDown

      case 40:
        // Prevent scroll on Firefox
        event.preventDefault(); // Zoom out

        this.zoom(-options.zoomRatio, true);
        break;
      // Ctrl + 0

      case 48: // Fall through
      // Ctrl + 1
      // eslint-disable-next-line no-fallthrough

      case 49:
        if (event.ctrlKey) {
          event.preventDefault();
          this.toggle();
        }

        break;

      default:
    }
  },
  dragstart: function dragstart(event) {
    if (event.target.tagName.toLowerCase() === 'img') {
      event.preventDefault();
    }
  },
  pointerdown: function pointerdown(event) {
    var options = this.options,
        pointers = this.pointers;
    var buttons = event.buttons,
        button = event.button;

    if (!this.viewed || this.showing || this.viewing || this.hiding // No primary button (usually the left button)
    // Note: Touch events does not contain `buttons` and `button` properties
    || isNumber(buttons) && buttons > 1 || isNumber(button) && button > 0 // Open context menu
    || event.ctrlKey) {
      return;
    } // Prevent default behaviours as page zooming in touch devices.


    event.preventDefault();

    if (event.changedTouches) {
      forEach(event.changedTouches, function (touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      pointers[event.pointerId || 0] = getPointer(event);
    }

    var action = options.movable ? ACTION_MOVE : false;

    if (Object.keys(pointers).length > 1) {
      action = ACTION_ZOOM;
    } else if ((event.pointerType === 'touch' || event.type === 'touchstart') && this.isSwitchable()) {
      action = ACTION_SWITCH;
    }

    if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
      removeClass(this.image, CLASS_TRANSITION);
    }

    this.action = action;
  },
  pointermove: function pointermove(event) {
    var pointers = this.pointers,
        action = this.action;

    if (!this.viewed || !action) {
      return;
    }

    event.preventDefault();

    if (event.changedTouches) {
      forEach(event.changedTouches, function (touch) {
        viewer_esm_assign(pointers[touch.identifier] || {}, getPointer(touch, true));
      });
    } else {
      viewer_esm_assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
    }

    this.change(event);
  },
  pointerup: function pointerup(event) {
    var _this2 = this;

    var options = this.options,
        action = this.action,
        pointers = this.pointers;
    var pointer;

    if (event.changedTouches) {
      forEach(event.changedTouches, function (touch) {
        pointer = pointers[touch.identifier];
        delete pointers[touch.identifier];
      });
    } else {
      pointer = pointers[event.pointerId || 0];
      delete pointers[event.pointerId || 0];
    }

    if (!action) {
      return;
    }

    event.preventDefault();

    if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
      addClass(this.image, CLASS_TRANSITION);
    }

    this.action = false; // Emulate click and double click in touch devices to support backdrop and image zooming (#210).

    if (IS_TOUCH_DEVICE && action !== ACTION_ZOOM && pointer && Date.now() - pointer.timeStamp < 500) {
      clearTimeout(this.clickCanvasTimeout);
      clearTimeout(this.doubleClickImageTimeout);

      if (options.toggleOnDblclick && this.viewed && event.target === this.image) {
        if (this.imageClicked) {
          this.imageClicked = false; // This timeout will be cleared later when a native dblclick event is triggering

          this.doubleClickImageTimeout = setTimeout(function () {
            dispatchEvent(_this2.image, EVENT_DBLCLICK);
          }, 50);
        } else {
          this.imageClicked = true; // The default timing of a double click in Windows is 500 ms

          this.doubleClickImageTimeout = setTimeout(function () {
            _this2.imageClicked = false;
          }, 500);
        }
      } else {
        this.imageClicked = false;

        if (options.backdrop && options.backdrop !== 'static' && event.target === this.canvas) {
          // This timeout will be cleared later when a native click event is triggering
          this.clickCanvasTimeout = setTimeout(function () {
            dispatchEvent(_this2.canvas, EVENT_CLICK);
          }, 50);
        }
      }
    }
  },
  resize: function resize() {
    var _this3 = this;

    if (!this.isShown || this.hiding) {
      return;
    }

    this.initContainer();
    this.initViewer();
    this.renderViewer();
    this.renderList();

    if (this.viewed) {
      this.initImage(function () {
        _this3.renderImage();
      });
    }

    if (this.played) {
      if (this.options.fullscreen && this.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        this.stop();
        return;
      }

      forEach(this.player.getElementsByTagName('img'), function (image) {
        addListener(image, EVENT_LOAD, _this3.loadImage.bind(_this3), {
          once: true
        });
        dispatchEvent(image, EVENT_LOAD);
      });
    }
  },
  wheel: function wheel(event) {
    var _this4 = this;

    if (!this.viewed) {
      return;
    }

    event.preventDefault(); // Limit wheel speed to prevent zoom too fast

    if (this.wheeling) {
      return;
    }

    this.wheeling = true;
    setTimeout(function () {
      _this4.wheeling = false;
    }, 50);
    var ratio = Number(this.options.zoomRatio) || 0.1;
    var delta = 1;

    if (event.deltaY) {
      delta = event.deltaY > 0 ? 1 : -1;
    } else if (event.wheelDelta) {
      delta = -event.wheelDelta / 120;
    } else if (event.detail) {
      delta = event.detail > 0 ? 1 : -1;
    }

    this.zoom(-delta * ratio, true, event);
  }
};

var methods = {
  /** Show the viewer (only available in modal mode)
   * @param {boolean} [immediate=false] - Indicates if show the viewer immediately or not.
   * @returns {Viewer} this
   */
  show: function show() {
    var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var element = this.element,
        options = this.options;

    if (options.inline || this.showing || this.isShown || this.showing) {
      return this;
    }

    if (!this.ready) {
      this.build();

      if (this.ready) {
        this.show(immediate);
      }

      return this;
    }

    if (isFunction(options.show)) {
      addListener(element, EVENT_SHOW, options.show, {
        once: true
      });
    }

    if (dispatchEvent(element, EVENT_SHOW) === false || !this.ready) {
      return this;
    }

    if (this.hiding) {
      this.transitioning.abort();
    }

    this.showing = true;
    this.open();
    var viewer = this.viewer;
    removeClass(viewer, CLASS_HIDE);

    if (options.transition && !immediate) {
      var shown = this.shown.bind(this);
      this.transitioning = {
        abort: function abort() {
          removeListener(viewer, EVENT_TRANSITION_END, shown);
          removeClass(viewer, CLASS_IN);
        }
      };
      addClass(viewer, CLASS_TRANSITION); // Force reflow to enable CSS3 transition
      // eslint-disable-next-line

      viewer.offsetWidth;
      addListener(viewer, EVENT_TRANSITION_END, shown, {
        once: true
      });
      addClass(viewer, CLASS_IN);
    } else {
      addClass(viewer, CLASS_IN);
      this.shown();
    }

    return this;
  },

  /**
   * Hide the viewer (only available in modal mode)
   * @param {boolean} [immediate=false] - Indicates if hide the viewer immediately or not.
   * @returns {Viewer} this
   */
  hide: function hide() {
    var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var element = this.element,
        options = this.options;

    if (options.inline || this.hiding || !(this.isShown || this.showing)) {
      return this;
    }

    if (isFunction(options.hide)) {
      addListener(element, EVENT_HIDE, options.hide, {
        once: true
      });
    }

    if (dispatchEvent(element, EVENT_HIDE) === false) {
      return this;
    }

    if (this.showing) {
      this.transitioning.abort();
    }

    this.hiding = true;

    if (this.played) {
      this.stop();
    } else if (this.viewing) {
      this.viewing.abort();
    }

    var viewer = this.viewer;

    if (options.transition && !immediate) {
      var hidden = this.hidden.bind(this);

      var hide = function hide() {
        addListener(viewer, EVENT_TRANSITION_END, hidden, {
          once: true
        });
        removeClass(viewer, CLASS_IN);
      };

      this.transitioning = {
        abort: function abort() {
          if (this.viewed) {
            removeListener(this.image, EVENT_TRANSITION_END, hide);
          } else {
            removeListener(viewer, EVENT_TRANSITION_END, hidden);
          }
        }
      };

      if (this.viewed) {
        addListener(this.image, EVENT_TRANSITION_END, hide, {
          once: true
        });
        this.zoomTo(0, false, false, true);
      } else {
        hide();
      }
    } else {
      removeClass(viewer, CLASS_IN);
      this.hidden();
    }

    return this;
  },

  /**
   * View one of the images with image's index
   * @param {number} index - The index of the image to view.
   * @returns {Viewer} this
   */
  view: function view() {
    var _this = this;

    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.initialViewIndex;
    index = Number(index) || 0;

    if (!this.isShown) {
      this.index = index;
      return this.show();
    }

    if (this.hiding || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
      return this;
    }

    if (this.viewing) {
      this.viewing.abort();
    }

    var element = this.element,
        options = this.options,
        title = this.title,
        canvas = this.canvas;
    var item = this.items[index];
    var img = item.querySelector('img');
    var url = getData(img, 'originalUrl');
    var alt = img.getAttribute('alt');
    var image = document.createElement('img');
    image.src = url;
    image.alt = alt;

    if (isFunction(options.view)) {
      addListener(element, EVENT_VIEW, options.view, {
        once: true
      });
    }

    if (dispatchEvent(element, EVENT_VIEW, {
      originalImage: this.images[index],
      index: index,
      image: image
    }) === false || !this.isShown || this.hiding || this.played) {
      return this;
    }

    this.image = image;
    removeClass(this.items[this.index], CLASS_ACTIVE);
    addClass(item, CLASS_ACTIVE);
    this.viewed = false;
    this.index = index;
    this.imageData = {};
    addClass(image, CLASS_INVISIBLE);

    if (options.loading) {
      addClass(canvas, CLASS_LOADING);
    }

    canvas.innerHTML = '';
    canvas.appendChild(image); // Center current item

    this.renderList(); // Clear title

    title.innerHTML = ''; // Generate title after viewed

    var onViewed = function onViewed() {
      var imageData = _this.imageData;
      var render = Array.isArray(options.title) ? options.title[1] : options.title;
      title.innerHTML = isFunction(render) ? render.call(_this, image, imageData) : "".concat(alt, " (").concat(imageData.naturalWidth, " \xD7 ").concat(imageData.naturalHeight, ")");
    };

    var onLoad;
    addListener(element, EVENT_VIEWED, onViewed, {
      once: true
    });
    this.viewing = {
      abort: function abort() {
        removeListener(element, EVENT_VIEWED, onViewed);

        if (image.complete) {
          if (this.imageRendering) {
            this.imageRendering.abort();
          } else if (this.imageInitializing) {
            this.imageInitializing.abort();
          }
        } else {
          removeListener(image, EVENT_LOAD, onLoad);

          if (this.timeout) {
            clearTimeout(this.timeout);
          }
        }
      }
    };

    if (image.complete) {
      this.load();
    } else {
      addListener(image, EVENT_LOAD, onLoad = this.load.bind(this), {
        once: true
      });

      if (this.timeout) {
        clearTimeout(this.timeout);
      } // Make the image visible if it fails to load within 1s


      this.timeout = setTimeout(function () {
        removeClass(image, CLASS_INVISIBLE);
        _this.timeout = false;
      }, 1000);
    }

    return this;
  },

  /**
   * View the previous image
   * @param {boolean} [loop=false] - Indicate if view the last one
   * when it is the first one at present.
   * @returns {Viewer} this
   */
  prev: function prev() {
    var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var index = this.index - 1;

    if (index < 0) {
      index = loop ? this.length - 1 : 0;
    }

    this.view(index);
    return this;
  },

  /**
   * View the next image
   * @param {boolean} [loop=false] - Indicate if view the first one
   * when it is the last one at present.
   * @returns {Viewer} this
   */
  next: function next() {
    var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var maxIndex = this.length - 1;
    var index = this.index + 1;

    if (index > maxIndex) {
      index = loop ? 0 : maxIndex;
    }

    this.view(index);
    return this;
  },

  /**
   * Move the image with relative offsets.
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} offsetY - The relative offset distance on the y-axis.
   * @returns {Viewer} this
   */
  move: function move(offsetX, offsetY) {
    var imageData = this.imageData;
    this.moveTo(isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY));
    return this;
  },

  /**
   * Move the image to an absolute point.
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Viewer} this
   */
  moveTo: function moveTo(x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var imageData = this.imageData;
    x = Number(x);
    y = Number(y);

    if (this.viewed && !this.played && this.options.movable) {
      var changed = false;

      if (isNumber(x)) {
        imageData.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        imageData.top = y;
        changed = true;
      }

      if (changed) {
        this.renderImage();
      }
    }

    return this;
  },

  /**
   * Zoom the image with a relative ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @returns {Viewer} this
   */
  zoom: function zoom(ratio) {
    var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var imageData = this.imageData;
    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    this.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);
    return this;
  },

  /**
   * Zoom the image to an absolute ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @param {Event} [_zoomable=false] - Indicates if the current zoom is available or not.
   * @returns {Viewer} this
   */
  zoomTo: function zoomTo(ratio) {
    var _this2 = this;

    var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var _zoomable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var element = this.element,
        options = this.options,
        pointers = this.pointers,
        imageData = this.imageData;
    var width = imageData.width,
        height = imageData.height,
        left = imageData.left,
        top = imageData.top,
        naturalWidth = imageData.naturalWidth,
        naturalHeight = imageData.naturalHeight;
    ratio = Math.max(0, ratio);

    if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
      if (!_zoomable) {
        var minZoomRatio = Math.max(0.01, options.minZoomRatio);
        var maxZoomRatio = Math.min(100, options.maxZoomRatio);
        ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
      }

      if (_originalEvent && ratio > 0.95 && ratio < 1.05) {
        ratio = 1;
      }

      var newWidth = naturalWidth * ratio;
      var newHeight = naturalHeight * ratio;
      var offsetWidth = newWidth - width;
      var offsetHeight = newHeight - height;
      var oldRatio = width / naturalWidth;

      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_ZOOM, {
        ratio: ratio,
        oldRatio: oldRatio,
        originalEvent: _originalEvent
      }) === false) {
        return this;
      }

      this.zooming = true;

      if (_originalEvent) {
        var offset = getOffset(this.viewer);
        var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY
        }; // Zoom from the triggering point of the event

        imageData.left -= offsetWidth * ((center.pageX - offset.left - left) / width);
        imageData.top -= offsetHeight * ((center.pageY - offset.top - top) / height);
      } else {
        // Zoom from the center of the image
        imageData.left -= offsetWidth / 2;
        imageData.top -= offsetHeight / 2;
      }

      imageData.width = newWidth;
      imageData.height = newHeight;
      imageData.ratio = ratio;
      this.renderImage(function () {
        _this2.zooming = false;

        if (isFunction(options.zoomed)) {
          addListener(element, EVENT_ZOOMED, options.zoomed, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_ZOOMED, {
          ratio: ratio,
          oldRatio: oldRatio,
          originalEvent: _originalEvent
        });
      });

      if (hasTooltip) {
        this.tooltip();
      }
    }

    return this;
  },

  /**
   * Rotate the image with a relative degree.
   * @param {number} degree - The rotate degree.
   * @returns {Viewer} this
   */
  rotate: function rotate(degree) {
    this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    return this;
  },

  /**
   * Rotate the image to an absolute degree.
   * @param {number} degree - The rotate degree.
   * @returns {Viewer} this
   */
  rotateTo: function rotateTo(degree) {
    var imageData = this.imageData;
    degree = Number(degree);

    if (isNumber(degree) && this.viewed && !this.played && this.options.rotatable) {
      imageData.rotate = degree;
      this.renderImage();
    }

    return this;
  },

  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Viewer} this
   */
  scaleX: function scaleX(_scaleX) {
    this.scale(_scaleX, this.imageData.scaleY);
    return this;
  },

  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Viewer} this
   */
  scaleY: function scaleY(_scaleY) {
    this.scale(this.imageData.scaleX, _scaleY);
    return this;
  },

  /**
   * Scale the image.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Viewer} this
   */
  scale: function scale(scaleX) {
    var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
    var imageData = this.imageData;
    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (this.viewed && !this.played && this.options.scalable) {
      var changed = false;

      if (isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        changed = true;
      }

      if (isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        changed = true;
      }

      if (changed) {
        this.renderImage();
      }
    }

    return this;
  },

  /**
   * Play the images
   * @param {boolean} [fullscreen=false] - Indicate if request fullscreen or not.
   * @returns {Viewer} this
   */
  play: function play() {
    var _this3 = this;

    var fullscreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.isShown || this.played) {
      return this;
    }

    var options = this.options,
        player = this.player;
    var onLoad = this.loadImage.bind(this);
    var list = [];
    var total = 0;
    var index = 0;
    this.played = true;
    this.onLoadWhenPlay = onLoad;

    if (fullscreen) {
      this.requestFullscreen();
    }

    addClass(player, CLASS_SHOW);
    forEach(this.items, function (item, i) {
      var img = item.querySelector('img');
      var image = document.createElement('img');
      image.src = getData(img, 'originalUrl');
      image.alt = img.getAttribute('alt');
      total += 1;
      addClass(image, CLASS_FADE);
      toggleClass(image, CLASS_TRANSITION, options.transition);

      if (hasClass(item, CLASS_ACTIVE)) {
        addClass(image, CLASS_IN);
        index = i;
      }

      list.push(image);
      addListener(image, EVENT_LOAD, onLoad, {
        once: true
      });
      player.appendChild(image);
    });

    if (isNumber(options.interval) && options.interval > 0) {
      var play = function play() {
        _this3.playing = setTimeout(function () {
          removeClass(list[index], CLASS_IN);
          index += 1;
          index = index < total ? index : 0;
          addClass(list[index], CLASS_IN);
          play();
        }, options.interval);
      };

      if (total > 1) {
        play();
      }
    }

    return this;
  },
  // Stop play
  stop: function stop() {
    var _this4 = this;

    if (!this.played) {
      return this;
    }

    var player = this.player;
    this.played = false;
    clearTimeout(this.playing);
    forEach(player.getElementsByTagName('img'), function (image) {
      removeListener(image, EVENT_LOAD, _this4.onLoadWhenPlay);
    });
    removeClass(player, CLASS_SHOW);
    player.innerHTML = '';
    this.exitFullscreen();
    return this;
  },
  // Enter modal mode (only available in inline mode)
  full: function full() {
    var _this5 = this;

    var options = this.options,
        viewer = this.viewer,
        image = this.image,
        list = this.list;

    if (!this.isShown || this.played || this.fulled || !options.inline) {
      return this;
    }

    this.fulled = true;
    this.open();
    addClass(this.button, CLASS_FULLSCREEN_EXIT);

    if (options.transition) {
      removeClass(list, CLASS_TRANSITION);

      if (this.viewed) {
        removeClass(image, CLASS_TRANSITION);
      }
    }

    addClass(viewer, CLASS_FIXED);
    viewer.setAttribute('style', '');
    setStyle(viewer, {
      zIndex: options.zIndex
    });
    this.initContainer();
    this.viewerData = viewer_esm_assign({}, this.containerData);
    this.renderList();

    if (this.viewed) {
      this.initImage(function () {
        _this5.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });
    }

    return this;
  },
  // Exit modal mode (only available in inline mode)
  exit: function exit() {
    var _this6 = this;

    var options = this.options,
        viewer = this.viewer,
        image = this.image,
        list = this.list;

    if (!this.isShown || this.played || !this.fulled || !options.inline) {
      return this;
    }

    this.fulled = false;
    this.close();
    removeClass(this.button, CLASS_FULLSCREEN_EXIT);

    if (options.transition) {
      removeClass(list, CLASS_TRANSITION);

      if (this.viewed) {
        removeClass(image, CLASS_TRANSITION);
      }
    }

    removeClass(viewer, CLASS_FIXED);
    setStyle(viewer, {
      zIndex: options.zIndexInline
    });
    this.viewerData = viewer_esm_assign({}, this.parentData);
    this.renderViewer();
    this.renderList();

    if (this.viewed) {
      this.initImage(function () {
        _this6.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });
    }

    return this;
  },
  // Show the current ratio of the image with percentage
  tooltip: function tooltip() {
    var _this7 = this;

    var options = this.options,
        tooltipBox = this.tooltipBox,
        imageData = this.imageData;

    if (!this.viewed || this.played || !options.tooltip) {
      return this;
    }

    tooltipBox.textContent = "".concat(Math.round(imageData.ratio * 100), "%");

    if (!this.tooltipping) {
      if (options.transition) {
        if (this.fading) {
          dispatchEvent(tooltipBox, EVENT_TRANSITION_END);
        }

        addClass(tooltipBox, CLASS_SHOW);
        addClass(tooltipBox, CLASS_FADE);
        addClass(tooltipBox, CLASS_TRANSITION); // Force reflow to enable CSS3 transition
        // eslint-disable-next-line

        tooltipBox.offsetWidth;
        addClass(tooltipBox, CLASS_IN);
      } else {
        addClass(tooltipBox, CLASS_SHOW);
      }
    } else {
      clearTimeout(this.tooltipping);
    }

    this.tooltipping = setTimeout(function () {
      if (options.transition) {
        addListener(tooltipBox, EVENT_TRANSITION_END, function () {
          removeClass(tooltipBox, CLASS_SHOW);
          removeClass(tooltipBox, CLASS_FADE);
          removeClass(tooltipBox, CLASS_TRANSITION);
          _this7.fading = false;
        }, {
          once: true
        });
        removeClass(tooltipBox, CLASS_IN);
        _this7.fading = true;
      } else {
        removeClass(tooltipBox, CLASS_SHOW);
      }

      _this7.tooltipping = false;
    }, 1000);
    return this;
  },
  // Toggle the image size between its natural size and initial size
  toggle: function toggle() {
    if (this.imageData.ratio === 1) {
      this.zoomTo(this.initialImageData.ratio, true);
    } else {
      this.zoomTo(1, true);
    }

    return this;
  },
  // Reset the image to its initial state
  reset: function reset() {
    if (this.viewed && !this.played) {
      this.imageData = viewer_esm_assign({}, this.initialImageData);
      this.renderImage();
    }

    return this;
  },
  // Update viewer when images changed
  update: function update() {
    var element = this.element,
        options = this.options,
        isImg = this.isImg; // Destroy viewer if the target image was deleted

    if (isImg && !element.parentNode) {
      return this.destroy();
    }

    var images = [];
    forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
      if (options.filter) {
        if (options.filter(image)) {
          images.push(image);
        }
      } else {
        images.push(image);
      }
    });

    if (!images.length) {
      return this;
    }

    this.images = images;
    this.length = images.length;

    if (this.ready) {
      var indexes = [];
      forEach(this.items, function (item, i) {
        var img = item.querySelector('img');
        var image = images[i];

        if (image) {
          if (image.src !== img.src) {
            indexes.push(i);
          }
        } else {
          indexes.push(i);
        }
      });
      setStyle(this.list, {
        width: 'auto'
      });
      this.initList();

      if (this.isShown) {
        if (this.length) {
          if (this.viewed) {
            var index = indexes.indexOf(this.index);

            if (index >= 0) {
              this.viewed = false;
              this.view(Math.max(this.index - (index + 1), 0));
            } else {
              addClass(this.items[this.index], CLASS_ACTIVE);
            }
          }
        } else {
          this.image = null;
          this.viewed = false;
          this.index = 0;
          this.imageData = {};
          this.canvas.innerHTML = '';
          this.title.innerHTML = '';
        }
      }
    } else {
      this.build();
    }

    return this;
  },
  // Destroy the viewer
  destroy: function destroy() {
    var element = this.element,
        options = this.options;

    if (!element[NAMESPACE]) {
      return this;
    }

    this.destroyed = true;

    if (this.ready) {
      if (this.played) {
        this.stop();
      }

      if (options.inline) {
        if (this.fulled) {
          this.exit();
        }

        this.unbind();
      } else if (this.isShown) {
        if (this.viewing) {
          if (this.imageRendering) {
            this.imageRendering.abort();
          } else if (this.imageInitializing) {
            this.imageInitializing.abort();
          }
        }

        if (this.hiding) {
          this.transitioning.abort();
        }

        this.hidden();
      } else if (this.showing) {
        this.transitioning.abort();
        this.hidden();
      }

      this.ready = false;
      this.viewer.parentNode.removeChild(this.viewer);
    } else if (options.inline) {
      if (this.delaying) {
        this.delaying.abort();
      } else if (this.initializing) {
        this.initializing.abort();
      }
    }

    if (!options.inline) {
      removeListener(element, EVENT_CLICK, this.onStart);
    }

    element[NAMESPACE] = undefined;
    return this;
  }
};

var others = {
  open: function open() {
    var body = this.body;
    addClass(body, CLASS_OPEN);
    body.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyPaddingRight) || 0), "px");
  },
  close: function close() {
    var body = this.body;
    removeClass(body, CLASS_OPEN);
    body.style.paddingRight = this.initialBodyPaddingRight;
  },
  shown: function shown() {
    var element = this.element,
        options = this.options;
    this.fulled = true;
    this.isShown = true;
    this.render();
    this.bind();
    this.showing = false;

    if (isFunction(options.shown)) {
      addListener(element, EVENT_SHOWN, options.shown, {
        once: true
      });
    }

    if (dispatchEvent(element, EVENT_SHOWN) === false) {
      return;
    }

    if (this.ready && this.isShown && !this.hiding) {
      this.view(this.index);
    }
  },
  hidden: function hidden() {
    var element = this.element,
        options = this.options;
    this.fulled = false;
    this.viewed = false;
    this.isShown = false;
    this.close();
    this.unbind();
    addClass(this.viewer, CLASS_HIDE);
    this.resetList();
    this.resetImage();
    this.hiding = false;

    if (!this.destroyed) {
      if (isFunction(options.hidden)) {
        addListener(element, EVENT_HIDDEN, options.hidden, {
          once: true
        });
      }

      dispatchEvent(element, EVENT_HIDDEN);
    }
  },
  requestFullscreen: function requestFullscreen() {
    var document = this.element.ownerDocument;

    if (this.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      var documentElement = document.documentElement;

      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
  },
  exitFullscreen: function exitFullscreen() {
    if (this.fulled) {
      var document = this.element.ownerDocument;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  },
  change: function change(event) {
    var options = this.options,
        pointers = this.pointers;
    var pointer = pointers[Object.keys(pointers)[0]];
    var offsetX = pointer.endX - pointer.startX;
    var offsetY = pointer.endY - pointer.startY;

    switch (this.action) {
      // Move the current image
      case ACTION_MOVE:
        this.move(offsetX, offsetY);
        break;
      // Zoom the current image

      case ACTION_ZOOM:
        this.zoom(getMaxZoomRatio(pointers), false, event);
        break;

      case ACTION_SWITCH:
        {
          this.action = 'switched';
          var absoluteOffsetX = Math.abs(offsetX);

          if (absoluteOffsetX > 1 && absoluteOffsetX > Math.abs(offsetY)) {
            // Empty `pointers` as `touchend` event will not be fired after swiped in iOS browsers.
            this.pointers = {};

            if (offsetX > 1) {
              this.prev(options.loop);
            } else if (offsetX < -1) {
              this.next(options.loop);
            }
          }

          break;
        }

      default:
    } // Override


    forEach(pointers, function (p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  },
  isSwitchable: function isSwitchable() {
    var imageData = this.imageData,
        viewerData = this.viewerData;
    return this.length > 1 && imageData.left >= 0 && imageData.top >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
  }
};

var AnotherViewer = WINDOW.Viewer;

var Viewer =
/*#__PURE__*/
function () {
  /**
   * Create a new Viewer.
   * @param {Element} element - The target element for viewing.
   * @param {Object} [options={}] - The configuration options.
   */
  function Viewer(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    if (!element || element.nodeType !== 1) {
      throw new Error('The first argument is required and must be an element.');
    }

    this.element = element;
    this.options = viewer_esm_assign({}, DEFAULTS, isPlainObject(options) && options);
    this.action = false;
    this.fading = false;
    this.fulled = false;
    this.hiding = false;
    this.imageClicked = false;
    this.imageData = {};
    this.index = this.options.initialViewIndex;
    this.isImg = false;
    this.isShown = false;
    this.length = 0;
    this.played = false;
    this.playing = false;
    this.pointers = {};
    this.ready = false;
    this.showing = false;
    this.timeout = false;
    this.tooltipping = false;
    this.viewed = false;
    this.viewing = false;
    this.wheeling = false;
    this.zooming = false;
    this.init();
  }

  _createClass(Viewer, [{
    key: "init",
    value: function init() {
      var _this = this;

      var element = this.element,
          options = this.options;

      if (element[NAMESPACE]) {
        return;
      }

      element[NAMESPACE] = this;
      var isImg = element.tagName.toLowerCase() === 'img';
      var images = [];
      forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
        if (isFunction(options.filter)) {
          if (options.filter.call(_this, image)) {
            images.push(image);
          }
        } else {
          images.push(image);
        }
      });
      this.isImg = isImg;
      this.length = images.length;
      this.images = images;
      var ownerDocument = element.ownerDocument;
      var body = ownerDocument.body || ownerDocument.documentElement;
      this.body = body;
      this.scrollbarWidth = window.innerWidth - ownerDocument.documentElement.clientWidth;
      this.initialBodyPaddingRight = window.getComputedStyle(body).paddingRight; // Override `transition` option if it is not supported

      if (isUndefined(document.createElement(NAMESPACE).style.transition)) {
        options.transition = false;
      }

      if (options.inline) {
        var count = 0;

        var progress = function progress() {
          count += 1;

          if (count === _this.length) {
            var timeout;
            _this.initializing = false;
            _this.delaying = {
              abort: function abort() {
                clearTimeout(timeout);
              }
            }; // build asynchronously to keep `this.viewer` is accessible in `ready` event handler.

            timeout = setTimeout(function () {
              _this.delaying = false;

              _this.build();
            }, 0);
          }
        };

        this.initializing = {
          abort: function abort() {
            forEach(images, function (image) {
              if (!image.complete) {
                removeListener(image, EVENT_LOAD, progress);
              }
            });
          }
        };
        forEach(images, function (image) {
          if (image.complete) {
            progress();
          } else {
            addListener(image, EVENT_LOAD, progress, {
              once: true
            });
          }
        });
      } else {
        addListener(element, EVENT_CLICK, this.onStart = function (_ref) {
          var target = _ref.target;

          if (target.tagName.toLowerCase() === 'img' && (!isFunction(options.filter) || options.filter.call(_this, target))) {
            _this.view(_this.images.indexOf(target));
          }
        });
      }
    }
  }, {
    key: "build",
    value: function build() {
      if (this.ready) {
        return;
      }

      var element = this.element,
          options = this.options;
      var parent = element.parentNode;
      var template = document.createElement('div');
      template.innerHTML = TEMPLATE;
      var viewer = template.querySelector(".".concat(NAMESPACE, "-container"));
      var title = viewer.querySelector(".".concat(NAMESPACE, "-title"));
      var toolbar = viewer.querySelector(".".concat(NAMESPACE, "-toolbar"));
      var navbar = viewer.querySelector(".".concat(NAMESPACE, "-navbar"));
      var button = viewer.querySelector(".".concat(NAMESPACE, "-button"));
      var canvas = viewer.querySelector(".".concat(NAMESPACE, "-canvas"));
      this.parent = parent;
      this.viewer = viewer;
      this.title = title;
      this.toolbar = toolbar;
      this.navbar = navbar;
      this.button = button;
      this.canvas = canvas;
      this.footer = viewer.querySelector(".".concat(NAMESPACE, "-footer"));
      this.tooltipBox = viewer.querySelector(".".concat(NAMESPACE, "-tooltip"));
      this.player = viewer.querySelector(".".concat(NAMESPACE, "-player"));
      this.list = viewer.querySelector(".".concat(NAMESPACE, "-list"));
      addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(Array.isArray(options.title) ? options.title[0] : options.title));
      addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
      toggleClass(button, CLASS_HIDE, !options.button);

      if (options.backdrop) {
        addClass(viewer, "".concat(NAMESPACE, "-backdrop"));

        if (!options.inline && options.backdrop !== 'static') {
          setData(canvas, DATA_ACTION, 'hide');
        }
      }

      if (isString(options.className) && options.className) {
        // In case there are multiple class names
        options.className.split(REGEXP_SPACES).forEach(function (className) {
          addClass(viewer, className);
        });
      }

      if (options.toolbar) {
        var list = document.createElement('ul');
        var custom = isPlainObject(options.toolbar);
        var zoomButtons = BUTTONS.slice(0, 3);
        var rotateButtons = BUTTONS.slice(7, 9);
        var scaleButtons = BUTTONS.slice(9);

        if (!custom) {
          addClass(toolbar, getResponsiveClass(options.toolbar));
        }

        forEach(custom ? options.toolbar : BUTTONS, function (value, index) {
          var deep = custom && isPlainObject(value);
          var name = custom ? hyphenate(index) : value;
          var show = deep && !isUndefined(value.show) ? value.show : value;

          if (!show || !options.zoomable && zoomButtons.indexOf(name) !== -1 || !options.rotatable && rotateButtons.indexOf(name) !== -1 || !options.scalable && scaleButtons.indexOf(name) !== -1) {
            return;
          }

          var size = deep && !isUndefined(value.size) ? value.size : value;
          var click = deep && !isUndefined(value.click) ? value.click : value;
          var item = document.createElement('li');
          item.setAttribute('role', 'button');
          addClass(item, "".concat(NAMESPACE, "-").concat(name));

          if (!isFunction(click)) {
            setData(item, DATA_ACTION, name);
          }

          if (isNumber(show)) {
            addClass(item, getResponsiveClass(show));
          }

          if (['small', 'large'].indexOf(size) !== -1) {
            addClass(item, "".concat(NAMESPACE, "-").concat(size));
          } else if (name === 'play') {
            addClass(item, "".concat(NAMESPACE, "-large"));
          }

          if (isFunction(click)) {
            addListener(item, EVENT_CLICK, click);
          }

          list.appendChild(item);
        });
        toolbar.appendChild(list);
      } else {
        addClass(toolbar, CLASS_HIDE);
      }

      if (!options.rotatable) {
        var rotates = toolbar.querySelectorAll('li[class*="rotate"]');
        addClass(rotates, CLASS_INVISIBLE);
        forEach(rotates, function (rotate) {
          toolbar.appendChild(rotate);
        });
      }

      if (options.inline) {
        addClass(button, CLASS_FULLSCREEN);
        setStyle(viewer, {
          zIndex: options.zIndexInline
        });

        if (window.getComputedStyle(parent).position === 'static') {
          setStyle(parent, {
            position: 'relative'
          });
        }

        parent.insertBefore(viewer, element.nextSibling);
      } else {
        addClass(button, CLASS_CLOSE);
        addClass(viewer, CLASS_FIXED);
        addClass(viewer, CLASS_FADE);
        addClass(viewer, CLASS_HIDE);
        setStyle(viewer, {
          zIndex: options.zIndex
        });
        var container = options.container;

        if (isString(container)) {
          container = element.ownerDocument.querySelector(container);
        }

        if (!container) {
          container = this.body;
        }

        container.appendChild(viewer);
      }

      if (options.inline) {
        this.render();
        this.bind();
        this.isShown = true;
      }

      this.ready = true;

      if (isFunction(options.ready)) {
        addListener(element, EVENT_READY, options.ready, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_READY) === false) {
        this.ready = false;
        return;
      }

      if (this.ready && options.inline) {
        this.view(this.index);
      }
    }
    /**
     * Get the no conflict viewer class.
     * @returns {Viewer} The viewer class.
     */

  }], [{
    key: "noConflict",
    value: function noConflict() {
      window.Viewer = AnotherViewer;
      return Viewer;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */

  }, {
    key: "setDefaults",
    value: function setDefaults(options) {
      viewer_esm_assign(DEFAULTS, isPlainObject(options) && options);
    }
  }]);

  return Viewer;
}();

viewer_esm_assign(Viewer.prototype, viewer_esm_render, events, handlers, methods, others);

/* harmony default export */ var viewer_esm = (Viewer);

// EXTERNAL MODULE: ./node_modules/qiniu-js/dist/qiniu.min.js
var qiniu_min = __webpack_require__("cea2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Upload/index.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



__webpack_require__("0808");

/* harmony default export */ var Uploadvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 9
    }
  },
  data: function data() {
    return {
      fileList: this.value.map(function (item) {
        return {
          key: item.key ? item.key : new Date().getTime() + '_' + Math.ceil(Math.random() * 99999),
          url: item.url,
          percent: item.percent ? item.percent : 100,
          status: item.status ? item.status : 'success'
        };
      }),
      viewer: null,
      uploadId: 'upload_' + new Date().getTime()
    };
  },
  computed: {
    miniWidth: function miniWidth() {
      if (this.width > this.height) {
        return this.height;
      } else {
        return this.width;
      }
    }
  },
  methods: {
    handleChange: function handleChange() {
      var _this2 = this;

      console.log(this.$refs.uploadInput.files);
      var files = this.$refs.uploadInput.files;

      var _loop = function _loop(i) {
        var file = files[i];
        var reader = new FileReader();
        var key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);
        reader.readAsDataURL(file);

        reader.onload = function () {
          _this2.fileList.push({
            key: key,
            url: reader.result,
            percent: 0,
            status: 'uploading'
          });

          _this2.$nextTick(function () {
            _this2.uplaodAction2(reader.result, file, key);
          });
        };
      };

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }

      this.$refs.uploadInput.value = [];
    },
    uplaodAction: function uplaodAction(res, file, key) {
      var _this3 = this;

      var changeIndex = this.fileList.findIndex(function (item) {
        return item.key === key;
      });
      console.log(this.fileList.findIndex(function (item) {
        return item.key === key;
      }));
      var xhr = new XMLHttpRequest();
      var url = 'http://upload-z2.qiniu.com/putb64/' + file.size;
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.setRequestHeader('Authorization', 'UpToken ' + this.token);
      xhr.send(res.split(',')[1]);

      xhr.onreadystatechange = function () {
        console.log(xhr);

        if (xhr.readyState === 4) {
          var resData = JSON.parse(xhr.response);

          if (resData) {
            _this3.$set(_this3.fileList, _this3.fileList.findIndex(function (item) {
              return item.key === key;
            }), Object(objectSpread["a" /* default */])({}, _this3.fileList[_this3.fileList.findIndex(function (item) {
              return item.key === key;
            })], {
              url: _this3.domain + resData.key,
              percent: 100
            }));

            setTimeout(function () {
              _this3.$set(_this3.fileList, _this3.fileList.findIndex(function (item) {
                return item.key === key;
              }), Object(objectSpread["a" /* default */])({}, _this3.fileList[_this3.fileList.findIndex(function (item) {
                return item.key === key;
              })], {
                status: 'success'
              }));

              _this3.$emit('input', _this3.fileList);
            }, 200);
          } else {
            _this3.$set(_this3.fileList, _this3.fileList.findIndex(function (item) {
              return item.key === key;
            }), Object(objectSpread["a" /* default */])({}, _this3.fileList[_this3.fileList.findIndex(function (item) {
              return item.key === key;
            })], {
              status: 'error'
            }));

            _this3.fileList.splice(_this3.fileList.findIndex(function (item) {
              return item.key === key;
            }), 1);
          }
        }
      };

      xhr.onprogress = function (res) {
        console.log('progress', res);

        if (res.total && res.loaded) {
          _this3.$set(_this3.fileList[_this3.fileList.findIndex(function (item) {
            return item.key === key;
          })], 'percent', res.loaded / res.total * 100);
        }
      };
    },
    uplaodAction2: function uplaodAction2(res, file, key) {
      var _this = this;

      var observable = qiniu_min["upload"](file, key, this.token, {
        fname: key,
        mimeType: []
      }, {
        useCdnDomain: true,
        region: qiniu_min["region"].z2
      });
      observable.subscribe({
        next: function next(res) {
          _this.$set(_this.fileList[_this.fileList.findIndex(function (item) {
            return item.key === key;
          })], 'percent', parse_int_default()(res.total.percent));
        },
        error: function error(err) {
          _this.$set(_this.fileList, _this.fileList.findIndex(function (item) {
            return item.key === key;
          }), Object(objectSpread["a" /* default */])({}, _this.fileList[_this.fileList.findIndex(function (item) {
            return item.key === key;
          })], {
            status: 'error'
          }));

          _this.fileList.splice(_this.fileList.findIndex(function (item) {
            return item.key === key;
          }), 1);
        },
        complete: function complete(res) {
          _this.$set(_this.fileList, _this.fileList.findIndex(function (item) {
            return item.key === key;
          }), Object(objectSpread["a" /* default */])({}, _this.fileList[_this.fileList.findIndex(function (item) {
            return item.key === key;
          })], {
            url: _this.domain + res.key,
            percent: 100
          }));

          setTimeout(function () {
            _this.$set(_this.fileList, _this.fileList.findIndex(function (item) {
              return item.key === key;
            }), Object(objectSpread["a" /* default */])({}, _this.fileList[_this.fileList.findIndex(function (item) {
              return item.key === key;
            })], {
              status: 'success'
            }));

            _this.$emit('input', _this.fileList);
          }, 200);
        }
      });
    },
    handleRemove: function handleRemove(key) {
      this.fileList.splice(this.fileList.findIndex(function (item) {
        return item.key === key;
      }), 1);
    },
    handlePreviewFile: function handlePreviewFile(key) {
      var _this4 = this;

      this.viewer && this.viewer.destroy();
      this.uploadId = 'upload_' + new Date().getTime();
      console.log(this.viewer);
      this.$nextTick(function () {
        _this4.viewer = new viewer_esm(document.getElementById(_this4.uploadId));

        _this4.viewer.view(_this4.fileList.findIndex(function (item) {
          return item.key === key;
        }));
      });
    }
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/components/Upload/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Uploadvue_type_script_lang_js_ = (Uploadvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Upload/index.vue?vue&type=style&index=0&lang=scss&
var Uploadvue_type_style_index_0_lang_scss_ = __webpack_require__("3516");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Upload/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Uploadvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "index.vue"
/* harmony default export */ var Upload = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "c8af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("89ca");

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cea2":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=58)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(30)("wks"),o=n(22),i=n(0).Symbol,a="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(0),o=n(1),i=n(19),a=n(5),s=n(9),u=function(t,e,n){var c,f,l,p=t&u.F,h=t&u.G,d=t&u.S,g=t&u.P,m=t&u.B,v=t&u.W,y=h?o:o[e]||(o[e]={}),b=y.prototype,w=h?r:d?r[e]:(r[e]||{}).prototype;for(c in h&&(n=e),n)(f=!p&&w&&void 0!==w[c])&&s(y,c)||(l=f?w[c]:n[c],y[c]=h&&"function"!=typeof w[c]?n[c]:m&&f?i(l,r):v&&w[c]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):g&&"function"==typeof l?i(Function.call,l):l,g&&((y.virtual||(y.virtual={}))[c]=l,t&u.R&&b&&!b[c]&&a(b,c,l)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e,n){var r=n(6),o=n(21);t.exports=n(8)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(3),o=n(43),i=n(28),a=Object.defineProperty;e.f=n(8)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(47),o=n(26);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){var e=t+864e5;return(new Date).getTime()>e}function i(t){return(0,m.default)(t).filter(function(t){return t.startsWith("x:")}).map(function(e){return[e,t[e].toString()]})}function a(t){return"qiniu_js_sdk_upload_file_"+t.name+"_size_"+t.size}function s(t){try{return JSON.parse(localStorage.getItem(a(t)))||[]}catch(t){return window.console&&window.console.warn&&console.warn("getLocalFileInfo failed"),[]}}function u(t){return{Authorization:"UpToken "+t}}function c(){return window.XMLHttpRequest?new XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP")}function f(t){return new h.default(function(e,n){var r=new FileReader;r.readAsArrayBuffer(t),r.onload=function(t){var n=t.target.result;e(n)},r.onerror=function(){n(new Error("fileReader 读取错误"))}})}function l(t,e){return new h.default(function(n,r){var o=c();o.open(e.method,t),e.onCreate&&e.onCreate(o),e.headers&&(0,m.default)(e.headers).forEach(function(t){return o.setRequestHeader(t,e.headers[t])}),o.upload.addEventListener("progress",function(t){t.lengthComputable&&e.onProgress&&e.onProgress({loaded:t.loaded,total:t.total})}),o.onreadystatechange=function(){var t=o.responseText;if(4===o.readyState){var e=o.getResponseHeader("x-reqId")||"";if(200!==o.status){var i="xhr request failed, code: "+o.status+";";return t&&(i=i+" response: "+t),void r({code:o.status,message:i,reqId:e,isRequestError:!0})}try{n({data:JSON.parse(t),reqId:e})}catch(t){r(t)}}},o.send(e.body)})}function p(){return"http:"===window.location.protocol?"http:":"https:"}e.__esModule=!0;var h=r(n(18)),d=r(n(34)),g=r(n(86)),m=r(n(36));e.isChunkExpired=o,e.getChunks=function(t,e){for(var n=[],r=Math.ceil(t.size/e),o=0;o<r;o++){var i=t.slice(e*o,o===r-1?t.size:e*(o+1));n.push(i)}return n},e.filterParams=i,e.sum=function(t){return t.reduce(function(t,e){return t+e},0)},e.setLocalFileInfo=function(t,e){try{localStorage.setItem(a(t),(0,g.default)(e))}catch(t){window.console&&window.console.warn&&console.warn("setLocalFileInfo failed")}},e.removeLocalFileInfo=function(t){try{localStorage.removeItem(a(t))}catch(t){window.console&&window.console.warn&&console.warn("removeLocalFileInfo failed")}},e.getLocalFileInfo=s,e.getResumeUploadedSize=function(t){return s(t).filter(function(t){return t&&!o(t.time)}).reduce(function(t,e){return t+e.size},0)},e.createMkFileUrl=function(t,e,n,r){var o=t+"/mkfile/"+e;null!=n&&(o+="/key/"+(0,v.urlSafeBase64Encode)(n)),r.mimeType&&(o+="/mimeType/"+(0,v.urlSafeBase64Encode)(r.mimeType));var a=r.fname;return a&&(o+="/fname/"+(0,v.urlSafeBase64Encode)(a)),r.params&&i(r.params).forEach(function(t){return o+="/"+encodeURIComponent(t[0])+"/"+(0,v.urlSafeBase64Encode)(t[1])}),o},e.getHeadersForChunkUpload=function(t){var e=u(t);return(0,d.default)({"content-type":"application/octet-stream"},e)},e.getHeadersForMkFile=function(t){var e=u(t);return(0,d.default)({"content-type":"text/plain"},e)},e.createXHR=c,e.computeMd5=function(t){return f(t).then(function(t){var e=new b.default.ArrayBuffer;return e.append(t),e.end()})},e.readAsArrayBuffer=f,e.request=l,e.getPortFromUrl=function(t){if(t&&t.match){var e=t.match(/(^https?)/);if(!e)return"";var n=e[1];return(e=t.match(/^https?:\/\/([^:^\/]*):(\d*)/))?e[2]:"http"===n?"80":"443"}return""},e.getDomainFromUrl=function(t){if(t&&t.match){var e=t.match(/^https?:\/\/([^:^\/]*)/);return e?e[1]:""}return""},e.getUploadUrl=function(t,e){var n=p();if(null!=t.uphost)return h.default.resolve(n+"//"+t.uphost);if(null!=t.region){var r=y.regionUphostMap[t.region],o=t.useCdnDomain?r.cdnUphost:r.srcUphost;return h.default.resolve(n+"//"+o)}return function(t){try{var e=function(t){var e=t.split(":"),n=e[0],r=JSON.parse((0,v.urlSafeBase64Decode)(e[2]));return r.ak=n,r.bucket=r.scope.split(":")[0],r}(t);return l(p()+"//api.qiniu.com/v2/query?ak="+e.ak+"&bucket="+e.bucket,{method:"GET"})}catch(t){return h.default.reject(t)}}(e).then(function(t){var e=t.data.up.acc.main;return n+"//"+e[0]})},e.isContainFileMimeType=function(t,e){return e.indexOf(t)>-1},e.createObjectURL=function(t){return(window.URL||window.webkitURL||window.mozURL).createObjectURL(t)},e.getTransform=function(t,e){var n=t.width,r=t.height;switch(e){case 1:return{width:n,height:r,matrix:[1,0,0,1,0,0]};case 2:return{width:n,height:r,matrix:[-1,0,0,1,n,0]};case 3:return{width:n,height:r,matrix:[-1,0,0,-1,n,r]};case 4:return{width:n,height:r,matrix:[1,0,0,-1,0,r]};case 5:return{width:r,height:n,matrix:[0,1,1,0,0,0]};case 6:return{width:r,height:n,matrix:[0,1,-1,0,r,0]};case 7:return{width:r,height:n,matrix:[0,-1,-1,0,r,n]};case 8:return{width:r,height:n,matrix:[0,-1,1,0,0,n]}}};var v=n(56),y=n(39),b=r(n(91))},function(t,e){t.exports=!0},function(t,e){t.exports={}},function(t,e,n){var r=n(46),o=n(31);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){t.exports={default:n(59),__esModule:!0}},function(t,e,n){var r=n(20);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(6).f,o=n(9),i=n(2)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(7),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(30)("keys"),o=n(22);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o=n(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(13)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(26);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(20);t.exports.f=function(t){return new function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r}),this.resolve=r(e),this.reject=r(n)}(t)}},function(t,e,n){t.exports={default:n(83),__esModule:!0}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){t.exports={default:n(88),__esModule:!0}},function(t,e,n){e.f=n(2)},function(t,e,n){var r=n(0),o=n(1),i=n(13),a=n(37),s=n(6).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){"use strict";e.__esModule=!0,e.regionUphostMap={z0:{srcUphost:"up.qiniup.com",cdnUphost:"upload.qiniup.com"},z1:{srcUphost:"up-z1.qiniup.com",cdnUphost:"upload-z1.qiniup.com"},z2:{srcUphost:"up-z2.qiniup.com",cdnUphost:"upload-z2.qiniup.com"},na0:{srcUphost:"up-na0.qiniup.com",cdnUphost:"upload-na0.qiniup.com"},as0:{srcUphost:"up-as0.qiniup.com",cdnUphost:"upload-as0.qiniup.com"}},e.region={z0:"z0",z1:"z1",z2:"z2",na0:"na0",as0:"as0"}},function(t,e){},function(t,e,n){"use strict";var r=n(60)(!0);n(42)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(13),o=n(4),i=n(44),a=n(5),s=n(14),u=n(61),c=n(23),f=n(65),l=n(2)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,g,m,v){u(n,e,d);var y,b,w,x=function(t){if(!p&&t in C)return C[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",_="values"==g,P=!1,C=t.prototype,U=C[l]||C["@@iterator"]||g&&C[g],F=U||x(g),I=g?_?x("entries"):F:void 0,k="Array"==e&&C.entries||U;if(k&&(w=f(k.call(new t)))!==Object.prototype&&w.next&&(c(w,S,!0),r||"function"==typeof w[l]||a(w,l,h)),_&&U&&"values"!==U.name&&(P=!0,F=function(){return U.call(this)}),r&&!v||!p&&!P&&C[l]||a(C,l,F),s[e]=F,s[S]=h,g)if(y={values:_?F:x("values"),keys:m?F:x("keys"),entries:I},v)for(b in y)b in C||i(C,b,y[b]);else o(o.P+o.F*(p||P),e,y);return y}},function(t,e,n){t.exports=!n(8)&&!n(10)(function(){return 7!=Object.defineProperty(n(27)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=n(5)},function(t,e,n){var r=n(3),o=n(62),i=n(31),a=n(29)("IE_PROTO"),s=function(){},u=function(){var t,e=n(27)("iframe"),r=i.length;for(e.style.display="none",n(49).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),u=t.F;r--;)delete u.prototype[i[r]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[a]=t):n=u(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(9),o=n(11),i=n(63)(!1),a=n(29)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(c,n)||c.push(n));return c}},function(t,e,n){var r=n(16);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(25),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){n(66);for(var r=n(0),o=n(5),i=n(14),a=n(2)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<s.length;u++){var c=s[u],f=r[c],l=f&&f.prototype;l&&!l[a]&&o(l,a,c),i[c]=i.Array}},function(t,e,n){var r=n(16),o=n(2)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){var r=n(3),o=n(20),i=n(2)("species");t.exports=function(t,e){var n,a=r(t).constructor;return void 0===a||void 0==(n=r(a)[i])?e:o(n)}},function(t,e,n){var r,o,i,a=n(19),s=n(75),u=n(49),c=n(27),f=n(0),l=f.process,p=f.setImmediate,h=f.clearImmediate,d=f.MessageChannel,g=f.Dispatch,m=0,v={},y=function(){var t=+this;if(v.hasOwnProperty(t)){var e=v[t];delete v[t],e()}},b=function(t){y.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return v[++m]=function(){s("function"==typeof t?t:Function(t),e)},r(m),m},h=function(t){delete v[t]},"process"==n(16)(l)?r=function(t){l.nextTick(a(y,t,1))}:g&&g.now?r=function(t){g.now(a(y,t,1))}:d?(i=(o=new d).port2,o.port1.onmessage=b,r=a(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",b,!1)):r="onreadystatechange"in c("script")?function(t){u.appendChild(c("script")).onreadystatechange=function(){u.removeChild(this),y.call(t)}}:function(t){setTimeout(a(y,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var r=n(3),o=n(7),i=n(33);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){"use strict";e.__esModule=!0,e.urlSafeBase64Encode=function(t){return(t=function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n=void 0,r=void 0,o=void 0,i=void 0,a=void 0,s=void 0,u=void 0,c=void 0,f=0,l=0,p="",h=[];if(!t)return t;t=function(t){if(null===t||void 0===t)return"";var e=t+"",n="",r=void 0,o=void 0,i=0;r=o=0,i=e.length;for(var a=0;a<i;a++){var s=e.charCodeAt(a),u=null;if(s<128)o++;else if(s>127&&s<2048)u=String.fromCharCode(s>>6|192,63&s|128);else if(63488&s^!0)u=String.fromCharCode(s>>12|224,s>>6&63|128,63&s|128);else{if(64512&s^!0)throw new RangeError("Unmatched trail surrogate at "+a);var c=e.charCodeAt(++a);if(64512&c^!0)throw new RangeError("Unmatched lead surrogate at "+(a-1));s=((1023&s)<<10)+(1023&c)+65536,u=String.fromCharCode(s>>18|240,s>>12&63|128,s>>6&63|128,63&s|128)}null!==u&&(o>r&&(n+=e.slice(r,o)),n+=u,r=o=a+1)}return o>r&&(n+=e.slice(r,i)),n}(t+"");do{n=t.charCodeAt(f++),r=t.charCodeAt(f++),o=t.charCodeAt(f++),i=(c=n<<16|r<<8|o)>>18&63,a=c>>12&63,s=c>>6&63,u=63&c,h[l++]=e.charAt(i)+e.charAt(a)+e.charAt(s)+e.charAt(u)}while(f<t.length);switch(p=h.join(""),t.length%3){case 1:p=p.slice(0,-2)+"==";break;case 2:p=p.slice(0,-1)+"="}return p}(t)).replace(/\//g,"_").replace(/\+/g,"-")},e.urlSafeBase64Decode=function(t){return function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n=void 0,r=void 0,o=void 0,i=void 0,a=void 0,s=void 0,u=void 0,c=void 0,f=0,l=0,p=[];if(!t)return t;t+="";do{i=e.indexOf(t.charAt(f++)),a=e.indexOf(t.charAt(f++)),s=e.indexOf(t.charAt(f++)),u=e.indexOf(t.charAt(f++)),n=(c=i<<18|a<<12|s<<6|u)>>16&255,r=c>>8&255,o=255&c,p[l++]=64===s?String.fromCharCode(n):64===u?String.fromCharCode(n,r):String.fromCharCode(n,r,o)}while(f<t.length);return p.join("")}(t=t.replace(/_/g,"/").replace(/-/g,"+"))}},function(t,e,n){var r=n(46),o=n(31).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){"use strict";e.__esModule=!0,e.pipeline=e.compressImage=e.exif=e.imageInfo=e.watermark=e.imageMogr2=e.getUploadUrl=e.filterParams=e.getHeadersForMkFile=e.getResumeUploadedSize=e.getHeadersForChunkUpload=e.createMkFileUrl=e.region=e.upload=void 0;var r=n(39),o=n(12),i=n(92),a=n(94),s=n(95),u=n(109),c=function(t){return t&&t.__esModule?t:{default:t}}(n(110)),f=new u.StatisticsLogger;e.upload=function(t,e,n,r,o){var a={file:t,key:e,token:n,putExtra:r,config:o};return new s.Observable(function(t){var e=new i.UploadManager(a,{onData:function(e){return t.next(e)},onError:function(e){return t.error(e)},onComplete:function(e){return t.complete(e)}},f);return e.putFile(),e.stop.bind(e)})},e.region=r.region,e.createMkFileUrl=o.createMkFileUrl,e.getHeadersForChunkUpload=o.getHeadersForChunkUpload,e.getResumeUploadedSize=o.getResumeUploadedSize,e.getHeadersForMkFile=o.getHeadersForMkFile,e.filterParams=o.filterParams,e.getUploadUrl=o.getUploadUrl,e.imageMogr2=a.imageMogr2,e.watermark=a.watermark,e.imageInfo=a.imageInfo,e.exif=a.exif,e.compressImage=c.default,e.pipeline=a.pipeline},function(t,e,n){n(40),n(41),n(50),n(69),n(81),n(82),t.exports=n(1).Promise},function(t,e,n){var r=n(25),o=n(26);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),c=s.length;return u<0||u>=c?t?"":void 0:(i=s.charCodeAt(u))<55296||i>56319||u+1===c||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):a-56320+(i-55296<<10)+65536}}},function(t,e,n){"use strict";var r=n(45),o=n(21),i=n(23),a={};n(5)(a,n(2)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(6),o=n(3),i=n(15);t.exports=n(8)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(11),o=n(48),i=n(64);t.exports=function(t){return function(e,n,a){var s,u=r(e),c=o(u.length),f=i(a,c);if(t&&n!=n){for(;c>f;)if((s=u[f++])!=s)return!0}else for(;c>f;f++)if((t||f in u)&&u[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(25),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(9),o=n(32),i=n(29)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){"use strict";var r=n(67),o=n(68),i=n(14),a=n(11);t.exports=n(42)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r,o,i,a,s=n(13),u=n(0),c=n(19),f=n(51),l=n(4),p=n(7),h=n(20),d=n(70),g=n(71),m=n(52),v=n(53).set,y=n(76)(),b=n(33),w=n(54),x=n(77),S=n(55),_=u.TypeError,P=u.process,C=P&&P.versions,U=C&&C.v8||"",F=u.Promise,I="process"==f(P),k=function(){},E=o=b.f,M=!!function(){try{var t=F.resolve(1),e=(t.constructor={})[n(2)("species")]=function(t){t(k,k)};return(I||"function"==typeof PromiseRejectionEvent)&&t.then(k)instanceof e&&0!==U.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),O=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},T=function(t,e){if(!t._n){t._n=!0;var n=t._c;y(function(){for(var r=t._v,o=1==t._s,i=0;n.length>i;)!function(e){var n,i,a,s=o?e.ok:e.fail,u=e.resolve,c=e.reject,f=e.domain;try{s?(o||(2==t._h&&L(t),t._h=1),!0===s?n=r:(f&&f.enter(),n=s(r),f&&(f.exit(),a=!0)),n===e.promise?c(_("Promise-chain cycle")):(i=O(n))?i.call(n,u,c):u(n)):c(r)}catch(t){f&&!a&&f.exit(),c(t)}}(n[i++]);t._c=[],t._n=!1,e&&!t._h&&R(t)})}},R=function(t){v.call(u,function(){var e,n,r,o=t._v,i=A(t);if(i&&(e=w(function(){I?P.emit("unhandledRejection",o,t):(n=u.onunhandledrejection)?n({promise:t,reason:o}):(r=u.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=I||A(t)?2:1),t._a=void 0,i&&e.e)throw e.v})},A=function(t){return 1!==t._h&&0===(t._a||t._c).length},L=function(t){v.call(u,function(){var e;I?P.emit("rejectionHandled",t):(e=u.onrejectionhandled)&&e({promise:t,reason:t._v})})},D=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),T(e,!0))},j=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw _("Promise can't be resolved itself");(e=O(t))?y(function(){var r={_w:n,_d:!1};try{e.call(t,c(j,r,1),c(D,r,1))}catch(t){D.call(r,t)}}):(n._v=t,n._s=1,T(n,!1))}catch(t){D.call({_w:n,_d:!1},t)}}};M||(F=function(t){d(this,F,"Promise","_h"),h(t),r.call(this);try{t(c(j,this,1),c(D,this,1))}catch(t){D.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(78)(F.prototype,{then:function(t,e){var n=E(m(this,F));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=I?P.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&T(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=c(j,t,1),this.reject=c(D,t,1)},b.f=E=function(t){return t===F||t===a?new i(t):o(t)}),l(l.G+l.W+l.F*!M,{Promise:F}),n(23)(F,"Promise"),n(79)("Promise"),a=n(1).Promise,l(l.S+l.F*!M,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),l(l.S+l.F*(s||!M),"Promise",{resolve:function(t){return S(s&&this===a?F:this,t)}}),l(l.S+l.F*!(M&&n(80)(function(t){F.all(t).catch(k)})),"Promise",{all:function(t){var e=this,n=E(e),r=n.resolve,o=n.reject,i=w(function(){var n=[],i=0,a=1;g(t,!1,function(t){var s=i++,u=!1;n.push(void 0),a++,e.resolve(t).then(function(t){u||(u=!0,n[s]=t,--a||r(n))},o)}),--a||r(n)});return i.e&&o(i.v),n.promise},race:function(t){var e=this,n=E(e),r=n.reject,o=w(function(){g(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(19),o=n(72),i=n(73),a=n(3),s=n(48),u=n(74),c={},f={};(e=t.exports=function(t,e,n,l,p){var h,d,g,m,v=p?function(){return t}:u(t),y=r(n,l,e?2:1),b=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(i(v)){for(h=s(t.length);h>b;b++)if((m=e?y(a(d=t[b])[0],d[1]):y(t[b]))===c||m===f)return m}else for(g=v.call(t);!(d=g.next()).done;)if((m=o(g,y,d.value,e))===c||m===f)return m}).BREAK=c,e.RETURN=f},function(t,e,n){var r=n(3);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(14),o=n(2)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(51),o=n(2)("iterator"),i=n(14);t.exports=n(1).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(0),o=n(53).set,i=r.MutationObserver||r.WebKitMutationObserver,a=r.process,s=r.Promise,u="process"==n(16)(a);t.exports=function(){var t,e,n,c=function(){var r,o;for(u&&(r=a.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(u)n=function(){a.nextTick(c)};else if(!i||r.navigator&&r.navigator.standalone)if(s&&s.resolve){var f=s.resolve(void 0);n=function(){f.then(c)}}else n=function(){o.call(r,c)};else{var l=!0,p=document.createTextNode("");new i(c).observe(p,{characterData:!0}),n=function(){p.data=l=!l}}return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var r=n(0).navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var r=n(5);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e,n){"use strict";var r=n(0),o=n(1),i=n(6),a=n(8),s=n(2)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];a&&e&&!e[s]&&i.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(2)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},t(i)}catch(t){}return n}},function(t,e,n){"use strict";var r=n(4),o=n(1),i=n(0),a=n(52),s=n(55);r(r.P+r.R,"Promise",{finally:function(t){var e=a(this,o.Promise||i.Promise),n="function"==typeof t;return this.then(n?function(n){return s(e,t()).then(function(){return n})}:t,n?function(n){return s(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";var r=n(4),o=n(33),i=n(54);r(r.S,"Promise",{try:function(t){var e=o.f(this),n=i(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},function(t,e,n){n(84),t.exports=n(1).Object.assign},function(t,e,n){var r=n(4);r(r.S+r.F,"Object",{assign:n(85)})},function(t,e,n){"use strict";var r=n(15),o=n(35),i=n(24),a=n(32),s=n(47),u=Object.assign;t.exports=!u||n(10)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=r})?function(t,e){for(var n=a(t),u=arguments.length,c=1,f=o.f,l=i.f;u>c;)for(var p,h=s(arguments[c++]),d=f?r(h).concat(f(h)):r(h),g=d.length,m=0;g>m;)l.call(h,p=d[m++])&&(n[p]=h[p]);return n}:u},function(t,e,n){t.exports={default:n(87),__esModule:!0}},function(t,e,n){var r=n(1),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){n(89),t.exports=n(1).Object.keys},function(t,e,n){var r=n(32),o=n(15);n(90)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(4),o=n(1),i=n(10);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){!function(e){t.exports=function(t){"use strict";function e(t,e){var n=t[0],r=t[1],o=t[2],i=t[3];r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[0]-680876936|0)<<7|n>>>25)+r|0)&r|~n&o)+e[1]-389564586|0)<<12|i>>>20)+n|0)&n|~i&r)+e[2]+606105819|0)<<17|o>>>15)+i|0)&i|~o&n)+e[3]-1044525330|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[4]-176418897|0)<<7|n>>>25)+r|0)&r|~n&o)+e[5]+1200080426|0)<<12|i>>>20)+n|0)&n|~i&r)+e[6]-1473231341|0)<<17|o>>>15)+i|0)&i|~o&n)+e[7]-45705983|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[8]+1770035416|0)<<7|n>>>25)+r|0)&r|~n&o)+e[9]-1958414417|0)<<12|i>>>20)+n|0)&n|~i&r)+e[10]-42063|0)<<17|o>>>15)+i|0)&i|~o&n)+e[11]-1990404162|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[12]+1804603682|0)<<7|n>>>25)+r|0)&r|~n&o)+e[13]-40341101|0)<<12|i>>>20)+n|0)&n|~i&r)+e[14]-1502002290|0)<<17|o>>>15)+i|0)&i|~o&n)+e[15]+1236535329|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[1]-165796510|0)<<5|n>>>27)+r|0)&o|r&~o)+e[6]-1069501632|0)<<9|i>>>23)+n|0)&r|n&~r)+e[11]+643717713|0)<<14|o>>>18)+i|0)&n|i&~n)+e[0]-373897302|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[5]-701558691|0)<<5|n>>>27)+r|0)&o|r&~o)+e[10]+38016083|0)<<9|i>>>23)+n|0)&r|n&~r)+e[15]-660478335|0)<<14|o>>>18)+i|0)&n|i&~n)+e[4]-405537848|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[9]+568446438|0)<<5|n>>>27)+r|0)&o|r&~o)+e[14]-1019803690|0)<<9|i>>>23)+n|0)&r|n&~r)+e[3]-187363961|0)<<14|o>>>18)+i|0)&n|i&~n)+e[8]+1163531501|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[13]-1444681467|0)<<5|n>>>27)+r|0)&o|r&~o)+e[2]-51403784|0)<<9|i>>>23)+n|0)&r|n&~r)+e[7]+1735328473|0)<<14|o>>>18)+i|0)&n|i&~n)+e[12]-1926607734|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[5]-378558|0)<<4|n>>>28)+r|0)^r^o)+e[8]-2022574463|0)<<11|i>>>21)+n|0)^n^r)+e[11]+1839030562|0)<<16|o>>>16)+i|0)^i^n)+e[14]-35309556|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[1]-1530992060|0)<<4|n>>>28)+r|0)^r^o)+e[4]+1272893353|0)<<11|i>>>21)+n|0)^n^r)+e[7]-155497632|0)<<16|o>>>16)+i|0)^i^n)+e[10]-1094730640|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[13]+681279174|0)<<4|n>>>28)+r|0)^r^o)+e[0]-358537222|0)<<11|i>>>21)+n|0)^n^r)+e[3]-722521979|0)<<16|o>>>16)+i|0)^i^n)+e[6]+76029189|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[9]-640364487|0)<<4|n>>>28)+r|0)^r^o)+e[12]-421815835|0)<<11|i>>>21)+n|0)^n^r)+e[15]+530742520|0)<<16|o>>>16)+i|0)^i^n)+e[2]-995338651|0)<<23|r>>>9)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[0]-198630844|0)<<6|n>>>26)+r|0)|~o))+e[7]+1126891415|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[14]-1416354905|0)<<15|o>>>17)+i|0)|~n))+e[5]-57434055|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[12]+1700485571|0)<<6|n>>>26)+r|0)|~o))+e[3]-1894986606|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[10]-1051523|0)<<15|o>>>17)+i|0)|~n))+e[1]-2054922799|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[8]+1873313359|0)<<6|n>>>26)+r|0)|~o))+e[15]-30611744|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[6]-1560198380|0)<<15|o>>>17)+i|0)|~n))+e[13]+1309151649|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[4]-145523070|0)<<6|n>>>26)+r|0)|~o))+e[11]-1120210379|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[2]+718787259|0)<<15|o>>>17)+i|0)|~n))+e[9]-343485551|0)<<21|r>>>11)+o|0,t[0]=n+t[0]|0,t[1]=r+t[1]|0,t[2]=o+t[2]|0,t[3]=i+t[3]|0}function n(t){var e,n=[];for(e=0;e<64;e+=4)n[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return n}function r(t){var e,n=[];for(e=0;e<64;e+=4)n[e>>2]=t[e]+(t[e+1]<<8)+(t[e+2]<<16)+(t[e+3]<<24);return n}function o(t){var r,o,i,a,s,u,c=t.length,f=[1732584193,-271733879,-1732584194,271733878];for(r=64;r<=c;r+=64)e(f,n(t.substring(r-64,r)));for(o=(t=t.substring(r-64)).length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;r<o;r+=1)i[r>>2]|=t.charCodeAt(r)<<(r%4<<3);if(i[r>>2]|=128<<(r%4<<3),r>55)for(e(f,i),r=0;r<16;r+=1)i[r]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,e(f,i),f}function i(t){var e,n="";for(e=0;e<4;e+=1)n+=f[t>>8*e+4&15]+f[t>>8*e&15];return n}function a(t){var e;for(e=0;e<t.length;e+=1)t[e]=i(t[e]);return t.join("")}function s(t){return/[\u0080-\uFFFF]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function u(t){var e,n=[],r=t.length;for(e=0;e<r-1;e+=2)n.push(parseInt(t.substr(e,2),16));return String.fromCharCode.apply(String,n)}function c(){this.reset()}var f=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return a(o("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function e(t,e){return(t=0|t||0)<0?Math.max(t+e,0):Math.min(t,e)}ArrayBuffer.prototype.slice=function(n,r){var o,i,a,s,u=this.byteLength,c=e(n,u),f=u;return r!==t&&(f=e(r,u)),c>f?new ArrayBuffer(0):(o=f-c,i=new ArrayBuffer(o),a=new Uint8Array(i),s=new Uint8Array(this,c,o),a.set(s),i)}}(),c.prototype.append=function(t){return this.appendBinary(s(t)),this},c.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var r,o=this._buff.length;for(r=64;r<=o;r+=64)e(this._hash,n(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},c.prototype.end=function(t){var e,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<o;e+=1)i[e>>2]|=r.charCodeAt(e)<<(e%4<<3);return this._finish(i,o),n=a(this._hash),t&&(n=u(n)),this.reset(),n},c.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},c.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},c.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},c.prototype._finish=function(t,n){var r,o,i,a=n;if(t[a>>2]|=128<<(a%4<<3),a>55)for(e(this._hash,t),a=0;a<16;a+=1)t[a]=0;r=(r=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(r[2],16),i=parseInt(r[1],16)||0,t[14]=o,t[15]=i,e(this._hash,t)},c.hash=function(t,e){return c.hashBinary(s(t),e)},c.hashBinary=function(t,e){var n=a(o(t));return e?u(n):n},c.ArrayBuffer=function(){this.reset()},c.ArrayBuffer.prototype.append=function(t){var n,o=function(t,e,n){var r=new Uint8Array(t.byteLength+e.byteLength);return r.set(new Uint8Array(t)),r.set(new Uint8Array(e),t.byteLength),r}(this._buff.buffer,t),i=o.length;for(this._length+=t.byteLength,n=64;n<=i;n+=64)e(this._hash,r(o.subarray(n-64,n)));return this._buff=n-64<i?new Uint8Array(o.buffer.slice(n-64)):new Uint8Array(0),this},c.ArrayBuffer.prototype.end=function(t){var e,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<o;e+=1)i[e>>2]|=r[e]<<(e%4<<3);return this._finish(i,o),n=a(this._hash),t&&(n=u(n)),this.reset(),n},c.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.ArrayBuffer.prototype.getState=function(){var t=c.prototype.getState.call(this);return t.buff=function(t){return String.fromCharCode.apply(null,new Uint8Array(t))}(t.buff),t},c.ArrayBuffer.prototype.setState=function(t){return t.buff=function(t,e){var n,r=t.length,o=new ArrayBuffer(r),i=new Uint8Array(o);for(n=0;n<r;n+=1)i[n]=t.charCodeAt(n);return i}(t.buff),c.prototype.setState.call(this,t)},c.ArrayBuffer.prototype.destroy=c.prototype.destroy,c.ArrayBuffer.prototype._finish=c.prototype._finish,c.ArrayBuffer.hash=function(t,n){var o=a(function(t){var n,o,i,a,s,u,c=t.length,f=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=c;n+=64)e(f,r(t.subarray(n-64,n)));for(o=(t=n-64<c?t.subarray(n-64):new Uint8Array(0)).length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<o;n+=1)i[n>>2]|=t[n]<<(n%4<<3);if(i[n>>2]|=128<<(n%4<<3),n>55)for(e(f,i),n=0;n<16;n+=1)i[n]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,e(f,i),f}(new Uint8Array(t)));return n?u(o):o},c}()}()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.UploadManager=void 0;var o=r(n(18)),i=r(n(34)),a=r(n(17)),s=n(12),u=n(93);e.UploadManager=function(){function t(e,n,r){var o=this;(0,a.default)(this,t),this.config=(0,i.default)({useCdnDomain:!0,disableStatisticsReport:!1,retryCount:3,checkByMD5:!1,uphost:null,forceDirect:!1,concurrentRequestLimit:3,region:null},e.config),this.putExtra=(0,i.default)({fname:"",params:{},mimeType:null},e.putExtra),this.statisticsLogger=r,this.progress=null,this.xhrList=[],this.xhrHandler=function(t){return o.xhrList.push(t)},this.aborted=!1,this.file=e.file,this.key=e.key,this.token=e.token,this.onData=function(){},this.onError=function(){},this.onComplete=function(){},this.retryCount=0,(0,i.default)(this,n)}return t.prototype.putFile=function(){var t=this;if(this.aborted=!1,this.putExtra.fname||(this.putExtra.fname=this.file.name),!this.putExtra.mimeType||!this.putExtra.mimeType.length||(0,s.isContainFileMimeType)(this.file.type,this.putExtra.mimeType)){var e=(0,s.getUploadUrl)(this.config,this.token).then(function(e){return t.uploadUrl=e,t.uploadAt=(new Date).getTime(),t.config.forceDirect?t.directUpload():t.file.size>4194304?t.resumeUpload():t.directUpload()});return e.then(function(e){t.onComplete(e.data),t.config.disableStatisticsReport||t.sendLog(e.reqId,200)},function(e){if(t.clear(),e.isRequestError&&!t.config.disableStatisticsReport){var n=t.aborted?"":e.reqId,r=t.aborted?-2:e.code;t.sendLog(n,r)}var o=e.isRequestError&&0===e.code&&!t.aborted,i=++t.retryCount<=t.config.retryCount;o&&i?t.putFile():t.onError(e)}),e}var n=new Error("file type doesn't match with what you specify");this.onError(n)},t.prototype.clear=function(){this.xhrList.forEach(function(t){return t.abort()}),this.xhrList=[]},t.prototype.stop=function(){this.clear(),this.aborted=!0},t.prototype.sendLog=function(t,e){this.statisticsLogger.log({code:e,reqId:t,host:(0,s.getDomainFromUrl)(this.uploadUrl),remoteIp:"",port:(0,s.getPortFromUrl)(this.uploadUrl),duration:((new Date).getTime()-this.uploadAt)/1e3,time:Math.floor(this.uploadAt/1e3),bytesSent:this.progress?this.progress.total.loaded:0,upType:"jssdk-h5",size:this.file.size},this.token)},t.prototype.directUpload=function(){var t=this,e=new FormData;return e.append("file",this.file),e.append("token",this.token),null!=this.key&&e.append("key",this.key),e.append("fname",this.putExtra.fname),(0,s.filterParams)(this.putExtra.params).forEach(function(t){return e.append(t[0],t[1])}),(0,s.request)(this.uploadUrl,{method:"POST",body:e,onProgress:function(e){t.updateDirectProgress(e.loaded,e.total)},onCreate:this.xhrHandler}).then(function(e){return t.finishDirectProgress(),e})},t.prototype.resumeUpload=function(){var t=this;this.loaded={mkFileProgress:0,chunks:null},this.ctxList=[],this.localInfo=(0,s.getLocalFileInfo)(this.file),this.chunks=(0,s.getChunks)(this.file,4194304),this.initChunksProgress();var e=new u.Pool(function(e){return t.uploadChunk(e)},this.config.concurrentRequestLimit),n=this.chunks.map(function(t,n){return e.enqueue({chunk:t,index:n})}),r=o.default.all(n).then(function(){return t.mkFileReq()});return r.then(function(e){(0,s.removeLocalFileInfo)(t.file)},function(e){701!==e.code?(0,s.setLocalFileInfo)(t.file,t.ctxList):(0,s.removeLocalFileInfo)(t.file)}),r},t.prototype.uploadChunk=function(t){var e=this,n=t.index,r=t.chunk,i=this.localInfo[n],a=this.uploadUrl+"/mkblk/"+r.size,u=i&&!(0,s.isChunkExpired)(i.time),c=this.config.checkByMD5,f=function(){return e.updateChunkProgress(r.size,n),e.ctxList[n]={ctx:i.ctx,size:i.size,time:i.time,md5:i.md5},o.default.resolve(null)};return u&&!c?f():(0,s.computeMd5)(r).then(function(t){if(u&&t===i.md5)return f();var o=(0,s.getHeadersForChunkUpload)(e.token),c=e.xhrHandler;return(0,s.request)(a,{method:"POST",headers:o,body:r,onProgress:function(t){e.updateChunkProgress(t.loaded,n)},onCreate:c}).then(function(o){e.ctxList[n]={time:(new Date).getTime(),ctx:o.data.ctx,size:r.size,md5:t}})})},t.prototype.mkFileReq=function(){var t=this,e=(0,i.default)({mimeType:"application/octet-stream"},this.putExtra),n=(0,s.createMkFileUrl)(this.uploadUrl,this.file.size,this.key,e),r=this.ctxList.map(function(t){return t.ctx}).join(","),a=(0,s.getHeadersForMkFile)(this.token),u=this.xhrHandler;return(0,s.request)(n,{method:"POST",body:r,headers:a,onCreate:u}).then(function(e){return t.updateMkFileProgress(1),o.default.resolve(e)})},t.prototype.updateDirectProgress=function(t,e){this.progress={total:this.getProgressInfoItem(t,e+1)},this.onData(this.progress)},t.prototype.finishDirectProgress=function(){var t=this.progress.total;this.progress.total=this.getProgressInfoItem(t.loaded+1,t.size),this.onData(this.progress)},t.prototype.initChunksProgress=function(){this.loaded.chunks=this.chunks.map(function(t){return 0}),this.notifyResumeProgress()},t.prototype.updateChunkProgress=function(t,e){this.loaded.chunks[e]=t,this.notifyResumeProgress()},t.prototype.updateMkFileProgress=function(t){this.loaded.mkFileProgress=t,this.notifyResumeProgress()},t.prototype.notifyResumeProgress=function(){var t=this;this.progress={total:this.getProgressInfoItem((0,s.sum)(this.loaded.chunks)+this.loaded.mkFileProgress,this.file.size+1),chunks:this.chunks.map(function(e,n){return t.getProgressInfoItem(t.loaded.chunks[n],e.size)})},this.onData(this.progress)},t.prototype.getProgressInfoItem=function(t,e){return{loaded:t,size:e,percent:t/e*100}},t}()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.Pool=void 0;var o=r(n(18)),i=r(n(17));e.Pool=function(){function t(e,n){(0,i.default)(this,t),this.runTask=e,this.queue=[],this.processing=[],this.limit=n}return t.prototype.enqueue=function(t){var e=this;return new o.default(function(n,r){e.queue.push({task:t,resolve:n,reject:r}),e.check()})},t.prototype.run=function(t){var e=this;this.queue=this.queue.filter(function(e){return e!==t}),this.processing.push(t),this.runTask(t.task).then(function(){e.processing=e.processing.filter(function(e){return e!==t}),t.resolve(),e.check()},function(e){return t.reject(e)})},t.prototype.check=function(){var t=this,e=this.processing.length,n=this.limit-e;this.queue.slice(0,n).forEach(function(e,n){t.run(e)})},t}()},function(t,e,n){"use strict";function r(t,e){return t=encodeURIComponent(t),"/"!==e.slice(e.length-1)&&(e+="/"),e+t}function o(t,e,n){if(!/^\d$/.test(t.mode))throw"mode should be number in imageView2";var o=t.mode,i=t.w,a=t.h,s=t.q,u=t.format;if(!i&&!a)throw"param w and h is empty in imageView2";var c="imageView2/"+encodeURIComponent(o);return c+=i?"/w/"+encodeURIComponent(i):"",c+=a?"/h/"+encodeURIComponent(a):"",c+=s?"/q/"+encodeURIComponent(s):"",c+=u?"/format/"+encodeURIComponent(u):"",e&&(c=r(e,n)+"?"+c),c}function i(t,e,n){var o=t["auto-orient"],i=t.thumbnail,a=t.strip,s=t.gravity,u=t.crop,c=t.quality,f=t.rotate,l=t.format,p=t.blur,h="imageMogr2";return h+=o?"/auto-orient":"",h+=i?"/thumbnail/"+encodeURIComponent(i):"",h+=a?"/strip":"",h+=s?"/gravity/"+encodeURIComponent(s):"",h+=c?"/quality/"+encodeURIComponent(c):"",h+=u?"/crop/"+encodeURIComponent(u):"",h+=f?"/rotate/"+encodeURIComponent(f):"",h+=l?"/format/"+encodeURIComponent(l):"",h+=p?"/blur/"+encodeURIComponent(p):"",e&&(h=r(e,n)+"?"+h),h}function a(t,e,n){var o=t.mode;if(!o)throw"mode can't be empty in watermark";var i="watermark/"+o;if(1!==o&&2!==o)throw"mode is wrong";if(1===o){var a=t.image;if(!a)throw"image can't be empty in watermark";i+=a?"/image/"+(0,u.urlSafeBase64Encode)(a):""}if(2===o){var s=t.text,c=t.font,f=t.fontsize,l=t.fill;if(!s)throw"text can't be empty in watermark";i+=s?"/text/"+(0,u.urlSafeBase64Encode)(s):"",i+=c?"/font/"+(0,u.urlSafeBase64Encode)(c):"",i+=f?"/fontsize/"+f:"",i+=l?"/fill/"+(0,u.urlSafeBase64Encode)(l):""}var p=t.dissolve,h=t.gravity,d=t.dx,g=t.dy;return i+=p?"/dissolve/"+encodeURIComponent(p):"",i+=h?"/gravity/"+encodeURIComponent(h):"",i+=d?"/dx/"+encodeURIComponent(d):"",i+=g?"/dy/"+encodeURIComponent(g):"",e&&(i=r(e,n)+"?"+i),i}e.__esModule=!0,e.imageView2=o,e.imageMogr2=i,e.watermark=a,e.imageInfo=function(t,e){var n=r(t,e)+"?imageInfo";return(0,s.request)(n,{method:"GET"})},e.exif=function(t,e){var n=r(t,e)+"?exif";return(0,s.request)(n,{method:"GET"})},e.pipeline=function(t,e,n){var s=void 0,u=void 0,c="";if("[object Array]"===Object.prototype.toString.call(t)){for(var f=0,l=t.length;f<l;f++){if(!(s=t[f]).fop)throw"fop can't be empty in pipeline";switch(s.fop){case"watermark":c+=a(s)+"|";break;case"imageView2":c+=o(s)+"|";break;case"imageMogr2":c+=i(s)+"|";break;default:u=!0}if(u)throw"fop is wrong in pipeline"}if(e){var p=(c=r(e,n)+"?"+c).length;"|"===c.slice(p-1)&&(c=c.slice(0,p-1))}return c}throw"pipeline's first param should be array"};var s=n(12),u=n(56)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.Observable=void 0;var o=r(n(96)),i=r(n(17));e.Observable=function(){function t(e){(0,i.default)(this,t),this.subscribeAction=e}return t.prototype.subscribe=function(t,e,n){var r=new a(t,e,n),o=this.subscribeAction(r);return new s(r,o)},t}();var a=function(){function t(e,n,r){(0,i.default)(this,t),this.isStopped=!1,"object"===(void 0===e?"undefined":(0,o.default)(e))?(this._onNext=e.next,this._onError=e.error,this._onCompleted=e.complete):(this._onNext=e,this._onError=n,this._onCompleted=r)}return t.prototype.next=function(t){!this.isStopped&&this._onNext&&this._onNext(t)},t.prototype.error=function(t){!this.isStopped&&this._onError&&(this.isStopped=!0,this._onError(t))},t.prototype.complete=function(t){!this.isStopped&&this._onCompleted&&(this.isStopped=!0,this._onCompleted(t))},t}(),s=function(){function t(e,n){(0,i.default)(this,t),this.observer=e,this.result=n}return t.prototype.unsubscribe=function(){this.observer.isStopped=!0,this.result()},t}()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(n(97)),i=r(n(99)),a="function"==typeof i.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":typeof t};e.default="function"==typeof i.default&&"symbol"===a(o.default)?function(t){return void 0===t?"undefined":a(t)}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":void 0===t?"undefined":a(t)}},function(t,e,n){t.exports={default:n(98),__esModule:!0}},function(t,e,n){n(41),n(50),t.exports=n(37).f("iterator")},function(t,e,n){t.exports={default:n(100),__esModule:!0}},function(t,e,n){n(101),n(40),n(107),n(108),t.exports=n(1).Symbol},function(t,e,n){"use strict";var r=n(0),o=n(9),i=n(8),a=n(4),s=n(44),u=n(102).KEY,c=n(10),f=n(30),l=n(23),p=n(22),h=n(2),d=n(37),g=n(38),m=n(103),v=n(104),y=n(3),b=n(7),w=n(11),x=n(28),S=n(21),_=n(45),P=n(105),C=n(106),U=n(6),F=n(15),I=C.f,k=U.f,E=P.f,M=r.Symbol,O=r.JSON,T=O&&O.stringify,R=h("_hidden"),A=h("toPrimitive"),L={}.propertyIsEnumerable,D=f("symbol-registry"),j=f("symbols"),B=f("op-symbols"),G=Object.prototype,q="function"==typeof M,N=r.QObject,z=!N||!N.prototype||!N.prototype.findChild,H=i&&c(function(){return 7!=_(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=I(G,e);r&&delete G[e],k(t,e,n),r&&t!==G&&k(G,e,r)}:k,V=function(t){var e=j[t]=_(M.prototype);return e._k=t,e},W=q&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},J=function(t,e,n){return t===G&&J(B,e,n),y(t),e=x(e,!0),y(n),o(j,e)?(n.enumerable?(o(t,R)&&t[R][e]&&(t[R][e]=!1),n=_(n,{enumerable:S(0,!1)})):(o(t,R)||k(t,R,S(1,{})),t[R][e]=!0),H(t,e,n)):k(t,e,n)},X=function(t,e){y(t);for(var n,r=m(e=w(e)),o=0,i=r.length;i>o;)J(t,n=r[o++],e[n]);return t},Y=function(t){var e=L.call(this,t=x(t,!0));return!(this===G&&o(j,t)&&!o(B,t))&&(!(e||!o(this,t)||!o(j,t)||o(this,R)&&this[R][t])||e)},K=function(t,e){if(t=w(t),e=x(e,!0),t!==G||!o(j,e)||o(B,e)){var n=I(t,e);return!n||!o(j,e)||o(t,R)&&t[R][e]||(n.enumerable=!0),n}},$=function(t){for(var e,n=E(w(t)),r=[],i=0;n.length>i;)o(j,e=n[i++])||e==R||e==u||r.push(e);return r},Q=function(t){for(var e,n=t===G,r=E(n?B:w(t)),i=[],a=0;r.length>a;)!o(j,e=r[a++])||n&&!o(G,e)||i.push(j[e]);return i};q||(s((M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===G&&e.call(B,n),o(this,R)&&o(this[R],t)&&(this[R][t]=!1),H(this,t,S(1,n))};return i&&z&&H(G,t,{configurable:!0,set:e}),V(t)}).prototype,"toString",function(){return this._k}),C.f=K,U.f=J,n(57).f=P.f=$,n(24).f=Y,n(35).f=Q,i&&!n(13)&&s(G,"propertyIsEnumerable",Y,!0),d.f=function(t){return V(h(t))}),a(a.G+a.W+a.F*!q,{Symbol:M});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)h(Z[tt++]);for(var et=F(h.store),nt=0;et.length>nt;)g(et[nt++]);a(a.S+a.F*!q,"Symbol",{for:function(t){return o(D,t+="")?D[t]:D[t]=M(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in D)if(D[e]===t)return e},useSetter:function(){z=!0},useSimple:function(){z=!1}}),a(a.S+a.F*!q,"Object",{create:function(t,e){return void 0===e?_(t):X(_(t),e)},defineProperty:J,defineProperties:X,getOwnPropertyDescriptor:K,getOwnPropertyNames:$,getOwnPropertySymbols:Q}),O&&a(a.S+a.F*(!q||c(function(){var t=M();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(b(e)||void 0!==t)&&!W(t))return v(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,T.apply(O,r)}}),M.prototype[A]||n(5)(M.prototype,A,M.prototype.valueOf),l(M,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(22)("meta"),o=n(7),i=n(9),a=n(6).f,s=0,u=Object.isExtensible||function(){return!0},c=!n(10)(function(){return u(Object.preventExtensions({}))}),f=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return c&&l.NEED&&u(t)&&!i(t,r)&&f(t),t}}},function(t,e,n){var r=n(15),o=n(35),i=n(24);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,c=0;s.length>c;)u.call(t,a=s[c++])&&e.push(a);return e}},function(t,e,n){var r=n(16);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(11),o=n(57).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return a.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(24),o=n(21),i=n(11),a=n(28),s=n(9),u=n(43),c=Object.getOwnPropertyDescriptor;e.f=n(8)?c:function(t,e){if(t=i(t),e=a(e,!0),u)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){n(38)("asyncIterator")},function(t,e,n){n(38)("observable")},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.StatisticsLogger=void 0;var o=r(n(36)),i=r(n(17)),a=n(12);e.StatisticsLogger=function(){function t(){(0,i.default)(this,t)}return t.prototype.log=function(t,e){var n="";(0,o.default)(t).forEach(function(e){return n+=t[e]+","}),this.send(n,e)},t.prototype.send=function(t,e){var n=(0,a.createXHR)(),r=0;n.open("POST","https://uplog.qbox.me/log/3"),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.setRequestHeader("Authorization","UpToken "+e),n.onreadystatechange=function(){4===n.readyState&&200!==n.status&&++r<=3&&n.send(t)},n.send(t)},t}()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(n(18)),i=r(n(34)),a=r(n(17)),s=r(n(36)),u=n(111),c=n(12),f={PNG:"image/png",JPEG:"image/jpeg",WEBP:"image/webp",BMP:"image/bmp"},l=Math.log(2),p=(0,s.default)(f).map(function(t){return f[t]}),h=f.JPEG,d=function(){function t(e,n){(0,a.default)(this,t),this.config=(0,i.default)({quality:.92,noCompressIfLarger:!1},n),this.file=e}return t.prototype.process=function(){var t=this;this.outputType=this.file.type;var e={};return function(t){return p.includes(t)}(this.file.type)?this.getOriginImage().then(function(e){return t.getCanvas(e)}).then(function(n){var r=1;return t.config.maxWidth&&(r=Math.min(1,t.config.maxWidth/n.width)),t.config.maxHeight&&(r=Math.min(1,r,t.config.maxHeight/n.height)),e.width=n.width,e.height=n.height,t.doScale(n,r)}).then(function(n){var r=t.toBlob(n);return r.size>t.file.size&&t.config.noCompressIfLarger?{dist:t.file,width:e.width,height:e.height}:{dist:r,width:n.width,height:n.height}}):o.default.reject(new Error("unsupported file type: "+this.file.type))},t.prototype.clear=function(t,e,n){this.outputType===h?(t.fillStyle="#fff",t.fillRect(0,0,e,n)):t.clearRect(0,0,e,n)},t.prototype.getOriginImage=function(){var t=this;return new o.default(function(e,n){var r=(0,c.createObjectURL)(t.file),o=new Image;o.onload=function(){e(o)},o.onerror=function(){n("image load error")},o.src=r})},t.prototype.getCanvas=function(t){var e=this;return new o.default(function(n,r){u.EXIF.getData(t,function(){var r=u.EXIF.getTag(t,"Orientation")||1,o=(0,c.getTransform)(t,r),i=o.width,a=o.height,s=o.matrix,f=document.createElement("canvas"),l=f.getContext("2d");f.width=i,f.height=a,e.clear(l,i,a),l.transform.apply(l,s),l.drawImage(t,0,0),n(f)})})},t.prototype.doScale=function(t,e){if(1===e)return o.default.resolve(t);var n=t.getContext("2d"),r=Math.min(4,Math.ceil(1/e/l)),i=Math.pow(e,1/r),a=document.createElement("canvas"),s=a.getContext("2d"),u=t.width,c=t.height,f=u,p=c;a.width=u,a.height=c;for(var h=void 0,d=void 0,g=0;g<r;g++){var m=u*i|0,v=c*i|0;g===r-1&&(m=f*e,v=p*e),g%2==0?(h=t,d=s):(h=a,d=n),this.clear(d,u,c),d.drawImage(h,0,0,u,c,0,0,m,v),u=m,c=v}var y=h===t?a:t,b=d.getImageData(0,0,u,c);return y.width=u,y.height=c,d.putImageData(b,0,0),o.default.resolve(y)},t.prototype.toBlob=function(t){var e=t.toDataURL(this.outputType,this.config.quality),n=atob(e.split(",")[1]).split("").map(function(t){return t.charCodeAt(0)});return new Blob([new Uint8Array(n)],{type:this.outputType})},t}();e.default=function(t,e){return new d(t,e).process()}},function(t,e,r){var o;(function(){function r(t){return!!t.exifdata}function i(t,e){function n(n){var r=a(n);t.exifdata=r||{};var o=function(t){var e=new DataView(t);if(d&&console.log("Got file of length "+t.byteLength),255!=e.getUint8(0)||216!=e.getUint8(1))return d&&console.log("Not a valid JPEG"),!1;for(var n=2,r=t.byteLength;n<r;){if(function(t,e){return 56===t.getUint8(e)&&66===t.getUint8(e+1)&&73===t.getUint8(e+2)&&77===t.getUint8(e+3)&&4===t.getUint8(e+4)&&4===t.getUint8(e+5)}(e,n)){var o=e.getUint8(n+7);o%2!=0&&(o+=1),0===o&&(o=4);return s(t,n+8+o,e.getUint16(n+6+o))}n++}}(n);if(t.iptcdata=o||{},g.isXmpEnabled){var i=function(t){if("DOMParser"in self){var e=new DataView(t);if(d&&console.log("Got file of length "+t.byteLength),255!=e.getUint8(0)||216!=e.getUint8(1))return d&&console.log("Not a valid JPEG"),!1;for(var n=2,r=t.byteLength,o=new DOMParser;n<r-4;){if("http"==f(e,n,4)){var i=n-1,a=e.getUint16(n-2)-1,s=f(e,i,a),u=s.indexOf("xmpmeta>")+8,c=(s=s.substring(s.indexOf("<x:xmpmeta"),u)).indexOf("x:xmpmeta")+10;s=s.slice(0,c)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+s.slice(c);return h(o.parseFromString(s,"text/xml"))}n++}}}(n);t.xmpdata=i||{}}e&&e.call(t)}if(t.src)if(/^data\:/i.test(t.src))n(function(t,e){e=e||t.match(/^data\:([^\;]+)\;base64,/im)[1]||"",t=t.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(t),r=n.length,o=new ArrayBuffer(r),i=new Uint8Array(o),a=0;a<r;a++)i[a]=n.charCodeAt(a);return o}(t.src));else if(/^blob\:/i.test(t.src))(o=new FileReader).onload=function(t){n(t.target.result)},function(t,e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="blob",n.onload=function(t){200!=this.status&&0!==this.status||e(this.response)},n.send()}(t.src,function(t){o.readAsArrayBuffer(t)});else{var r=new XMLHttpRequest;r.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";n(r.response),r=null},r.open("GET",t.src,!0),r.responseType="arraybuffer",r.send(null)}else if(self.FileReader&&(t instanceof self.Blob||t instanceof self.File)){var o;(o=new FileReader).onload=function(t){d&&console.log("Got file of length "+t.target.result.byteLength),n(t.target.result)},o.readAsArrayBuffer(t)}}function a(t){var e=new DataView(t);if(d&&console.log("Got file of length "+t.byteLength),255!=e.getUint8(0)||216!=e.getUint8(1))return d&&console.log("Not a valid JPEG"),!1;for(var n,r=2,o=t.byteLength;r<o;){if(255!=e.getUint8(r))return d&&console.log("Not a valid marker at offset "+r+", found: "+e.getUint8(r)),!1;if(n=e.getUint8(r+1),d&&console.log(n),225==n)return d&&console.log("Found 0xFFE1 marker"),l(e,r+4,e.getUint16(r+2));r+=2+e.getUint16(r+2)}}function s(t,e,n){for(var r,o,i,a,s=new DataView(t),u={},c=e;c<e+n;)28===s.getUint8(c)&&2===s.getUint8(c+1)&&(a=s.getUint8(c+2))in x&&(i=s.getInt16(c+3),o=x[a],r=f(s,c+5,i),u.hasOwnProperty(o)?u[o]instanceof Array?u[o].push(r):u[o]=[u[o],r]:u[o]=r),c++;return u}function u(t,e,n,r,o){var i,a,s,u=t.getUint16(n,!o),f={};for(s=0;s<u;s++)i=n+12*s+2,!(a=r[t.getUint16(i,!o)])&&d&&console.log("Unknown tag: "+t.getUint16(i,!o)),f[a]=c(t,i,e,n,o);return f}function c(t,e,n,r,o){var i,a,s,u,c,l,p=t.getUint16(e+2,!o),h=t.getUint32(e+4,!o),d=t.getUint32(e+8,!o)+n;switch(p){case 1:case 7:if(1==h)return t.getUint8(e+8,!o);for(i=h>4?d:e+8,a=[],u=0;u<h;u++)a[u]=t.getUint8(i+u);return a;case 2:return f(t,i=h>4?d:e+8,h-1);case 3:if(1==h)return t.getUint16(e+8,!o);for(i=h>2?d:e+8,a=[],u=0;u<h;u++)a[u]=t.getUint16(i+2*u,!o);return a;case 4:if(1==h)return t.getUint32(e+8,!o);for(a=[],u=0;u<h;u++)a[u]=t.getUint32(d+4*u,!o);return a;case 5:if(1==h)return c=t.getUint32(d,!o),l=t.getUint32(d+4,!o),(s=new Number(c/l)).numerator=c,s.denominator=l,s;for(a=[],u=0;u<h;u++)c=t.getUint32(d+8*u,!o),l=t.getUint32(d+4+8*u,!o),a[u]=new Number(c/l),a[u].numerator=c,a[u].denominator=l;return a;case 9:if(1==h)return t.getInt32(e+8,!o);for(a=[],u=0;u<h;u++)a[u]=t.getInt32(d+4*u,!o);return a;case 10:if(1==h)return t.getInt32(d,!o)/t.getInt32(d+4,!o);for(a=[],u=0;u<h;u++)a[u]=t.getInt32(d+8*u,!o)/t.getInt32(d+4+8*u,!o);return a}}function f(t,e,r){var o="";for(n=e;n<e+r;n++)o+=String.fromCharCode(t.getUint8(n));return o}function l(t,e){if("Exif"!=f(t,e,4))return d&&console.log("Not valid EXIF data! "+f(t,e,4)),!1;var n,r,o,i,a,s=e+6;if(18761==t.getUint16(s))n=!1;else{if(19789!=t.getUint16(s))return d&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;n=!0}if(42!=t.getUint16(s+2,!n))return d&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var c=t.getUint32(s+4,!n);if(c<8)return d&&console.log("Not valid TIFF data! (First offset less than 8)",t.getUint32(s+4,!n)),!1;if((r=u(t,s,s+c,v,n)).ExifIFDPointer)for(o in i=u(t,s,s+r.ExifIFDPointer,m,n)){switch(o){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":i[o]=w[o][i[o]];break;case"ExifVersion":case"FlashpixVersion":i[o]=String.fromCharCode(i[o][0],i[o][1],i[o][2],i[o][3]);break;case"ComponentsConfiguration":i[o]=w.Components[i[o][0]]+w.Components[i[o][1]]+w.Components[i[o][2]]+w.Components[i[o][3]]}r[o]=i[o]}if(r.GPSInfoIFDPointer)for(o in a=u(t,s,s+r.GPSInfoIFDPointer,y,n)){switch(o){case"GPSVersionID":a[o]=a[o][0]+"."+a[o][1]+"."+a[o][2]+"."+a[o][3]}r[o]=a[o]}return r.thumbnail=function(t,e,n,r){var o=function(t,e,n){var r=t.getUint16(e,!n);return t.getUint32(e+2+12*r,!n)}(t,e+n,r);if(!o)return{};if(o>t.byteLength)return{};var i=u(t,e,e+o,b,r);if(i.Compression)switch(i.Compression){case 6:if(i.JpegIFOffset&&i.JpegIFByteCount){var a=e+i.JpegIFOffset,s=i.JpegIFByteCount;i.blob=new Blob([new Uint8Array(t.buffer,a,s)],{type:"image/jpeg"})}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.");break;default:console.log("Unknown thumbnail image format '%s'",i.Compression)}else 2==i.PhotometricInterpretation&&console.log("Thumbnail image format is RGB, which is not implemented.");return i}(t,s,c,n),r}function p(t){var e={};if(1==t.nodeType){if(t.attributes.length>0){e["@attributes"]={};for(var n=0;n<t.attributes.length;n++){var r=t.attributes.item(n);e["@attributes"][r.nodeName]=r.nodeValue}}}else if(3==t.nodeType)return t.nodeValue;if(t.hasChildNodes())for(var o=0;o<t.childNodes.length;o++){var i=t.childNodes.item(o),a=i.nodeName;if(null==e[a])e[a]=p(i);else{if(null==e[a].push){var s=e[a];e[a]=[],e[a].push(s)}e[a].push(p(i))}}return e}function h(t){try{var e={};if(t.children.length>0)for(var n=0;n<t.children.length;n++){var r=t.children.item(n),o=r.attributes;for(var i in o){var a=o[i],s=a.nodeName,u=a.nodeValue;void 0!==s&&(e[s]=u)}var c=r.nodeName;if(void 0===e[c])e[c]=p(r);else{if(void 0===e[c].push){var f=e[c];e[c]=[],e[c].push(f)}e[c].push(p(r))}}else e=t.textContent;return e}catch(t){console.log(t.message)}}var d=!1,g=function(t){return t instanceof g?t:this instanceof g?void(this.EXIFwrapped=t):new g(t)};void 0!==t&&t.exports&&(e=t.exports=g),e.EXIF=g;var m=g.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},v=g.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y=g.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},b=g.IFD1Tags={256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:"ResolutionUnit",513:"JpegIFOffset",514:"JpegIFByteCount",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite"},w=g.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},x={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};g.enableXmp=function(){g.isXmpEnabled=!0},g.disableXmp=function(){g.isXmpEnabled=!1},g.getData=function(t,e){return!((self.Image&&t instanceof self.Image||self.HTMLImageElement&&t instanceof self.HTMLImageElement)&&!t.complete||(r(t)?e&&e.call(t):i(t,e),0))},g.getTag=function(t,e){if(r(t))return t.exifdata[e]},g.getIptcTag=function(t,e){if(r(t))return t.iptcdata[e]},g.getAllTags=function(t){if(!r(t))return{};var e,n=t.exifdata,o={};for(e in n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o},g.getAllIptcTags=function(t){if(!r(t))return{};var e,n=t.iptcdata,o={};for(e in n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o},g.pretty=function(t){if(!r(t))return"";var e,n=t.exifdata,o="";for(e in n)n.hasOwnProperty(e)&&("object"==typeof n[e]?n[e]instanceof Number?o+=e+" : "+n[e]+" ["+n[e].numerator+"/"+n[e].denominator+"]\r\n":o+=e+" : ["+n[e].length+" values]\r\n":o+=e+" : "+n[e]+"\r\n");return o},g.readFromBinaryFile=function(t){return a(t)},void 0===(o=function(){return g}.apply(e,[]))||(t.exports=o)}).call(this)}])});
//# sourceMappingURL=qiniu.min.js.map

/***/ }),

/***/ "cebc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectSpread; });
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("268f");
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e265");
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a4bb");
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("bd86");




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(source);

    if (typeof _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a === 'function') {
      ownKeys = ownKeys.concat(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(source).filter(function (sym) {
        return _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "cee4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var bind = __webpack_require__("1d2b");
var Axios = __webpack_require__("0a06");
var defaults = __webpack_require__("2444");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("7a77");
axios.CancelToken = __webpack_require__("8df4");
axios.isCancel = __webpack_require__("2e67");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("0df6");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "d127":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("0a0a")('asyncIterator');


/***/ }),

/***/ "d13f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da3c");
var core = __webpack_require__("a7d3");
var ctx = __webpack_require__("bc25");
var hide = __webpack_require__("8ce0");
var has = __webpack_require__("43c8");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "d1d3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("437d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CTable_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d24f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("0a0a")('observable');


/***/ }),

/***/ "d256":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("da3c");
var has = __webpack_require__("43c8");
var DESCRIPTORS = __webpack_require__("7d95");
var $export = __webpack_require__("d13f");
var redefine = __webpack_require__("2312");
var META = __webpack_require__("6277").KEY;
var $fails = __webpack_require__("d782");
var shared = __webpack_require__("7772");
var setToStringTag = __webpack_require__("c0d8");
var uid = __webpack_require__("7b00");
var wks = __webpack_require__("1b55");
var wksExt = __webpack_require__("fda1");
var wksDefine = __webpack_require__("0a0a");
var enumKeys = __webpack_require__("d2d6");
var isArray = __webpack_require__("b5aa");
var anObject = __webpack_require__("0f89");
var isObject = __webpack_require__("6f8a");
var toIObject = __webpack_require__("6a9b");
var toPrimitive = __webpack_require__("2ea1");
var createDesc = __webpack_require__("f845");
var _create = __webpack_require__("7108");
var gOPNExt = __webpack_require__("565d");
var $GOPD = __webpack_require__("626e");
var $DP = __webpack_require__("3adc");
var $keys = __webpack_require__("7633");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("d876").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("d74e").f = $propertyIsEnumerable;
  __webpack_require__("31c2").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b457")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("8ce0")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "d28e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CusDialog.vue?vue&type=template&id=5879647c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{ref:"elDialog",staticClass:"cus-dialog-container",attrs:{"append-to-body":"","title":_vm.title,"visible":_vm.dialogVisible,"close-on-click-modal":false,"center":"","width":_vm.width,"id":_vm.id},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[(_vm.show)?_c('span',[_vm._t("default")],2):_vm._e(),(_vm.action)?_c('span',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"dialog-footer",attrs:{"slot":"footer","element-loading-text":_vm.loadingText},slot:"footer"},[_vm._t("action",[_c('el-button',{on:{"click":_vm.close}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.submit}},[_vm._v("确 定")])])],2):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CusDialog.vue?vue&type=template&id=5879647c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CusDialog.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CusDialogvue_type_script_lang_js_ = ({
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    form: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    show: function show() {
      if (this.form) {
        return this.showForm;
      } else {
        return true;
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false
    };
  },
  methods: {
    close: function close() {
      this.dialogVisible = false;
    },
    submit: function submit() {
      this.loading = true;
      this.$emit('on-submit');
    },
    end: function end() {
      this.loading = false;
    }
  },
  mounted: function mounted() {},
  watch: {
    dialogVisible: function dialogVisible(val) {
      var _this = this;

      if (!val) {
        this.loading = false;
        this.$emit('on-close');
        setTimeout(function () {
          _this.showForm = false;
        }, 300);
      } else {
        this.showForm = true;
      }
    },
    visible: function visible(val) {
      this.dialogVisible = val;
    }
  }
});
// CONCATENATED MODULE: ./src/components/CusDialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CusDialogvue_type_script_lang_js_ = (CusDialogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CusDialog.vue?vue&type=style&index=0&lang=scss&
var CusDialogvue_type_style_index_0_lang_scss_ = __webpack_require__("d7cd");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/CusDialog.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CusDialogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CusDialog.vue"
/* harmony default export */ var CusDialog = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d2d6":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("7633");
var gOPS = __webpack_require__("31c2");
var pIE = __webpack_require__("d74e");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d38f":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("7d8a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var Iterators = __webpack_require__("b22a");
module.exports = __webpack_require__("a7d3").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d604":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1938");
module.exports = __webpack_require__("a7d3").Array.isArray;


/***/ }),

/***/ "d60a":
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "d74e":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "d782":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "d7cd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aa1c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d876":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("2695");
var hiddenKeys = __webpack_require__("0029").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "da3c":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "dbf1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dd04":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("12fd9");
__webpack_require__("93c4");
__webpack_require__("b42c");
__webpack_require__("5b5f");
__webpack_require__("b604");
__webpack_require__("c609");
module.exports = __webpack_require__("a7d3").Promise;


/***/ }),

/***/ "decf":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0f89");
var isObject = __webpack_require__("6f8a");
var newPromiseCapability = __webpack_require__("03ca");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "df0a":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("bc25");
var invoke = __webpack_require__("196c");
var html = __webpack_require__("103a");
var cel = __webpack_require__("12fd");
var global = __webpack_require__("da3c");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("6e1f")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "df9a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dbf1");
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e265":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5698");

/***/ }),

/***/ "e341":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("d13f");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("7d95"), 'Object', { defineProperty: __webpack_require__("3adc").f });


/***/ }),

/***/ "e480":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e4a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b457");
var $export = __webpack_require__("d13f");
var redefine = __webpack_require__("2312");
var hide = __webpack_require__("8ce0");
var Iterators = __webpack_require__("b22a");
var $iterCreate = __webpack_require__("5ce7");
var setToStringTag = __webpack_require__("c0d8");
var getPrototypeOf = __webpack_require__("ff0c");
var ITERATOR = __webpack_require__("1b55")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "e5fa":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "e683":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "e769":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tinymce_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f1b4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tinymce_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tinymce_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tinymce_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e76f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @Author: vxhly
 * @Date:   2018-02-17 09:22:34 pm
 * @Email:  pengchengou@gmail.com
 * @Filename: vue-propsync.js
 * @Last modified by:   vxhly
 * @Last modified time: 2018-02-28 05:35:45 pm
 * @License: MIT
 */

/**
  * =================说明==================
  * vue-propsync：vue 组件的混合对象，主要用于组件编写时混入调用。
  *
  * 【主要功能】
  * 1. 实现了在组件内自动创建 prop 对应的 data，方便组件内修改 prop 使用。解决了 vue2.0 中不允许组件内直接修改 prop 的设计。
  * 2. 实现了组件外修改组件 prop 的双向绑定，子组件状态改变时将会通知父组件，同时父组件状态改变时也会通知子组件
  * 3. 父组件使用 v-model 来帮定数据，子组件通过 value 来保存 v-model 的值
  * 4. 父组件不需要写方法来同步子组件传来  v-model 的值，子组件也不再需要写过多的监听方法和将数据同步至父组件的方法
  *
  * 【食用方法】
  * 1. 编写组件：在选项对象中增加 mixins: [propsync] 即可，如：
  *
  *   <script>
  *   import propsync from 'vue-propsync'
  *   export default {
  *     name: 'hello',
  *     mixins: [propsync]
  *   }
  *   </script>
  *
  * 2. 调用组件：在调用组件的 templat 处，增加一个 v-model 来绑定数据，如：
  *
  *   <modal v-model="isShow"></modal>
  *   <script>
  *   export default {
  *     name: 'app',
  *     data () {
  *       return {
  *         isShow: false
  *       }
  *     }
  *   }
  *   </script>
  * 3. 子组件：如：
  *
  *   <template>
  *     <div class="modal" :value="value" v-show="sync_value">
  *       <!-- 由于 v-model 一定要由 value 来接受传值，以上接受父组件数据为固定写法，复制粘贴即可，本插件将会为 value 创建一个副本 sync_value, 子组件需要绑定该变量 -->
  *       <div class="close" @click="cancel">测试</div>
  *     </div>
  *   </template>
  *   <script>
  *   import propsync from 'vue-propsync'
  *   export default {
  *     name: 'hello',
  *     mixins: [propsync],
  *     props: {
  *       value: {
  *         type: Boolean,
  *         default: false,
  *         isSync: true // 需要开启双向绑定的一定要写这句话，默认不会将所有的 prop 开启双向绑定
  *       }
  *     },
  *     methods: {
  *       cancel () {
  *         this.sync_value = false // 注意 props 是不能直接改变的，则需要改变本插件创建的副本即可
  *       }
  *     }
  *   }
  *   </script>
  */


Object.defineProperty(exports, "__esModule", { value: true });

const isSync = 'isSync' // 开启 sync props 双向绑定配置项

/**
 * [getDataName 创建副本变量]
 *
 * @method getDataName
 *
 * @param  {[String]} propName [prop 名]
 *
 * @return {[String]} [副本变量]
 */
const getDataName = (propName) => {
  return `sync_${propName}`
}

const propsync = {
  data () {
    const data = {}
    const propsKeys = Object.keys((this.$options.props) || {}) // 获取当前组件的所有 props

    propsKeys.forEach((prop, index) => {
      // 将会遍历 props 所有的变量，然后为其创建副本变量
      let isEnable = this.$options.props[prop][isSync]
      isEnable = (typeof isEnable === 'boolean') ? isEnable : false

      if (isEnable) {
        const dataName = getDataName(prop)
        data[dataName] = this[prop]
      }
    })

    return data
  },
  mounted () {
    const propsKeys = Object.keys((this.$options.props) || {})

    propsKeys.forEach((prop, index) => {
      let isEnable = this.$options.props[prop][isSync]
      isEnable = (typeof isEnable === 'boolean') ? isEnable : false

      if (isEnable) {
        const dataName = getDataName(prop)

        // 创建监听事件，监听 prop 状态并同步 data 中的变量值
        this.$watch(prop, val => {
          this[dataName] = val
        })

        // 创建监听事件，监听副本状态，通过 input 内置事件将状态同步至父组件 v-model 绑定的变量中
        this.$watch(dataName, val => {
          this.$emit('input', val)
        })
      }
    })
  }
}
module.exports = propsync


/***/ }),

/***/ "e814":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("54aa");

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ec5b":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("e341");
var $Object = __webpack_require__("a7d3").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "eddc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GenerateFormItem_vue_vue_type_style_index_0_id_593fa120_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("38bc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GenerateFormItem_vue_vue_type_style_index_0_id_593fa120_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GenerateFormItem_vue_vue_type_style_index_0_id_593fa120_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GenerateFormItem_vue_vue_type_style_index_0_id_593fa120_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f159":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("7d8a");
var ITERATOR = __webpack_require__("1b55")('iterator');
var Iterators = __webpack_require__("b22a");
module.exports = __webpack_require__("a7d3").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "f1b4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f2fe":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "f3e0":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("0185");
var $keys = __webpack_require__("7633");

__webpack_require__("c165")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "f499":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1c01");

/***/ }),

/***/ "f568":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("3adc");
var anObject = __webpack_require__("0f89");
var getKeys = __webpack_require__("7633");

module.exports = __webpack_require__("7d95") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__("3022");
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f6b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "f845":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "fa54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("b3e7");
var step = __webpack_require__("245b");
var Iterators = __webpack_require__("b22a");
var toIObject = __webpack_require__("6a9b");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("e4a9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// EXTERNAL MODULE: ./node_modules/normalize.css/normalize.css
var normalize = __webpack_require__("f5df");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-awesome/components/Icon.vue?vue&type=script&lang=js&
function Iconvue_type_script_lang_js_assign(obj, ...sources) {
  sources.forEach(source => {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        obj[key] = source[key];
      }
    }
  });
  return obj;
}

let icons = {};
/* harmony default export */ var Iconvue_type_script_lang_js_ = ({
  name: 'fa-icon',

  render(h) {
    if (this.name === null) {
      return h();
    }

    let options = {
      class: this.klass,
      style: this.style,
      attrs: {
        role: this.label ? 'img' : 'presentation',
        'aria-label': this.label || null,
        tabindex: this.tabindex,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        viewBox: this.box,
        focusable: this.focusable
      }
    };

    if (this.raw) {
      options.domProps = {
        innerHTML: this.raw
      };
    }

    return h('svg', options, this.raw && this.icon ? null : this.$slots.default || [...this.icon.paths.map((path, i) => h('path', {
      attrs: path,
      key: `path-${i}`
    })), ...this.icon.polygons.map((polygon, i) => h('polygon', {
      attrs: polygon,
      key: `polygon-${i}`
    }))]);
  },

  props: {
    name: {
      type: String,

      validator(val) {
        if (val && !(val in icons)) {
          console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${val}".` + `\nPlease make sure you have imported this icon before using it.`);
          return false;
        }

        return true;
      }

    },
    scale: [Number, String],
    spin: Boolean,
    inverse: Boolean,
    pulse: Boolean,
    flip: {
      validator(val) {
        return val === 'horizontal' || val === 'vertical';
      }

    },
    label: String,
    tabindex: [Number, String]
  },

  data() {
    return {
      x: false,
      y: false,
      childrenWidth: 0,
      childrenHeight: 0,
      outerScale: 1
    };
  },

  computed: {
    normalizedScale() {
      let scale = this.scale;
      scale = typeof scale === 'undefined' ? 1 : Number(scale);

      if (isNaN(scale) || scale <= 0) {
        console.warn(`Invalid prop: prop "scale" should be a number over 0.`, this);
        return this.outerScale;
      }

      return scale * this.outerScale;
    },

    klass() {
      return {
        'fa-icon': true,
        'fa-spin': this.spin,
        'fa-flip-horizontal': this.flip === 'horizontal',
        'fa-flip-vertical': this.flip === 'vertical',
        'fa-inverse': this.inverse,
        'fa-pulse': this.pulse,
        [this.$options.name]: true
      };
    },

    icon() {
      if (this.name) {
        return icons[this.name];
      }

      return null;
    },

    box() {
      if (this.icon) {
        return `0 0 ${this.icon.width} ${this.icon.height}`;
      }

      return `0 0 ${this.width} ${this.height}`;
    },

    ratio() {
      if (!this.icon) {
        return 1;
      }

      let {
        width,
        height
      } = this.icon;
      return Math.max(width, height) / 16;
    },

    width() {
      return this.childrenWidth || this.icon && this.icon.width / this.ratio * this.normalizedScale || 0;
    },

    height() {
      return this.childrenHeight || this.icon && this.icon.height / this.ratio * this.normalizedScale || 0;
    },

    style() {
      if (this.normalizedScale === 1) {
        return false;
      }

      return {
        fontSize: this.normalizedScale + 'em'
      };
    },

    raw() {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null;
      }

      let raw = this.icon.raw;
      let ids = {};
      raw = raw.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (match, quote, id) => {
        let uniqueId = getId();
        ids[id] = uniqueId;
        return ` id="${uniqueId}"`;
      });
      raw = raw.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
        let id = rawId || pointerId;

        if (!id || !ids[id]) {
          return match;
        }

        return `#${ids[id]}`;
      });
      return raw;
    },

    focusable() {
      let {
        tabindex
      } = this;

      if (tabindex == null) {
        return 'false';
      }

      let index = typeof tabindex === 'string' ? parseInt(tabindex, 10) : tabindex;

      if (index >= 0) {
        return null;
      }

      return 'false';
    }

  },

  mounted() {
    if (!this.name && this.name !== null && this.$children.length === 0) {
      console.warn(`Invalid prop: prop "name" is required.`);
      return;
    }

    if (this.icon) {
      return;
    }

    let width = 0;
    let height = 0;
    this.$children.forEach(child => {
      child.outerScale = this.normalizedScale;
      width = Math.max(width, child.width);
      height = Math.max(height, child.height);
    });
    this.childrenWidth = width;
    this.childrenHeight = height;
    this.$children.forEach(child => {
      child.x = (width - child.width) / 2;
      child.y = (height - child.height) / 2;
    });
  },

  register(data) {
    for (let name in data) {
      let icon = data[name];
      let {
        paths = [],
        d,
        polygons = [],
        points
      } = icon;

      if (d) {
        paths.push({
          d
        });
      }

      if (points) {
        polygons.push({
          points
        });
      }

      icons[name] = Iconvue_type_script_lang_js_assign({}, icon, {
        paths,
        polygons
      });
    }
  },

  icons
});
let cursor = 0xd4937;

function getId() {
  return `fa-${(cursor++).toString(16)}`;
}
// CONCATENATED MODULE: ./node_modules/vue-awesome/components/Icon.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Iconvue_type_script_lang_js_ = (Iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-awesome/components/Icon.vue?vue&type=style&index=0&lang=css&
var Iconvue_type_style_index_0_lang_css_ = __webpack_require__("df9a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./node_modules/vue-awesome/components/Icon.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Iconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Icon.vue"
/* harmony default export */ var Icon = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/keyboard.js


Icon.register({
  'regular/keyboard': {
    width: 576,
    height: 512,
    paths: [
      {
        d: 'M528 64H48C21.5 64 0 85.5 0 112V400C0 426.5 21.5 448 48 448H528C554.5 448 576 426.5 576 400V112C576 85.5 554.5 64 528 64zM536 400C536 404.4 532.4 408 528 408H48C43.6 408 40 404.4 40 400V112C40 107.6 43.6 104 48 104H528C532.4 104 536 107.6 536 112V400zM170 270V242C170 235.4 164.6 230 158 230H130C123.4 230 118 235.4 118 242V270C118 276.6 123.4 282 130 282H158C164.6 282 170 276.6 170 270zM266 270V242C266 235.4 260.6 230 254 230H226C219.4 230 214 235.4 214 242V270C214 276.6 219.4 282 226 282H254C260.6 282 266 276.6 266 270zM362 270V242C362 235.4 356.6 230 350 230H322C315.4 230 310 235.4 310 242V270C310 276.6 315.4 282 322 282H350C356.6 282 362 276.6 362 270zM458 270V242C458 235.4 452.6 230 446 230H418C411.4 230 406 235.4 406 242V270C406 276.6 411.4 282 418 282H446C452.6 282 458 276.6 458 270zM122 352V324C122 317.4 116.6 312 110 312H82C75.4 312 70 317.4 70 324V352C70 358.6 75.4 364 82 364H110C116.6 364 122 358.6 122 352zM506 352V324C506 317.4 500.6 312 494 312H466C459.4 312 454 317.4 454 324V352C454 358.6 459.4 364 466 364H494C500.6 364 506 358.6 506 352zM122 188V160C122 153.4 116.6 148 110 148H82C75.4 148 70 153.4 70 160V188C70 194.6 75.4 200 82 200H110C116.6 200 122 194.6 122 188zM218 188V160C218 153.4 212.6 148 206 148H178C171.4 148 166 153.4 166 160V188C166 194.6 171.4 200 178 200H206C212.6 200 218 194.6 218 188zM314 188V160C314 153.4 308.6 148 302 148H274C267.4 148 262 153.4 262 160V188C262 194.6 267.4 200 274 200H302C308.6 200 314 194.6 314 188zM410 188V160C410 153.4 404.6 148 398 148H370C363.4 148 358 153.4 358 160V188C358 194.6 363.4 200 370 200H398C404.6 200 410 194.6 410 188zM506 188V160C506 153.4 500.6 148 494 148H466C459.4 148 454 153.4 454 160V188C454 194.6 459.4 200 466 200H494C500.6 200 506 194.6 506 188zM408 346V330C408 323.4 402.6 318 396 318H180C173.4 318 168 323.4 168 330V346C168 352.6 173.4 358 180 358H396C402.6 358 408 352.6 408 346z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/trash-alt.js


Icon.register({
  'regular/trash-alt': {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M192 188V404C192 410.6 186.6 416 180 416H156C149.4 416 144 410.6 144 404V188C144 181.4 149.4 176 156 176H180C186.6 176 192 181.4 192 188zM292 176H268C261.4 176 256 181.4 256 188V404C256 410.6 261.4 416 268 416H292C298.6 416 304 410.6 304 404V188C304 181.4 298.6 176 292 176zM424 80C437.3 80 448 90.7 448 104V116C448 122.6 442.6 128 436 128H416V464C416 490.5 394.5 512 368 512H80C53.5 512 32 490.5 32 464V128H12C5.4 128 0 122.6 0 116V104C0 90.7 10.7 80 24 80H98.4L132.4 23.3A48-48 0 0 0 173.6 0H274.4A48-48 0 0 0 315.6 23.3L349.6 80H424zM154.4 80H293.6L276.2 50.9A6-6 0 0 1 271 48H177A6-6 0 0 1 171.8 50.9L154.4 80zM368 128H80V458A6-6 0 0 1 86 464H362A6-6 0 0 1 368 458V128z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/clone.js


Icon.register({
  'regular/clone': {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M464 0H144C117.5 0 96 21.5 96 48V96H48C21.5 96 0 117.5 0 144V464C0 490.5 21.5 512 48 512H368C394.5 512 416 490.5 416 464V416H464C490.5 416 512 394.5 512 368V48C512 21.5 490.5 0 464 0zM362 464H54A6-6 0 0 0 48 458V150A6-6 0 0 0 54 144H96V368C96 394.5 117.5 416 144 416H368V458A6-6 0 0 0 362 464zM458 368H150A6-6 0 0 0 144 362V54A6-6 0 0 0 150 48H458A6-6 0 0 0 464 54V362A6-6 0 0 0 458 368z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/dot-circle.js


Icon.register({
  'regular/dot-circle': {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M256 56C366.5 56 456 145.5 456 256 456 366.5 366.5 456 256 456 145.5 456 56 366.5 56 256 56 145.5 145.5 56 256 56M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zM256 176C211.8 176 176 211.8 176 256S211.8 336 256 336 336 300.2 336 256 300.2 176 256 176z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/check-square.js


Icon.register({
  'regular/check-square': {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M400 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H400C426.5 480 448 458.5 448 432V80C448 53.5 426.5 32 400 32zM400 432H48V80H400V432zM364.1 190.3L191.5 361.5C186.8 366.1 179.2 366.1 174.6 361.4L83.8 269.9C79.1 265.2 79.2 257.6 83.9 252.9L106.6 230.4C111.3 225.7 118.9 225.8 123.6 230.5L183.3 290.7 324.7 150.5C329.4 145.9 337 145.9 341.7 150.6L364.2 173.3C368.9 178 368.8 185.6 364.1 190.3z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/bars.js


Icon.register({
  bars: {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M16 132H432C440.8 132 448 124.8 448 116V76C448 67.2 440.8 60 432 60H16C7.2 60 0 67.2 0 76V116C0 124.8 7.2 132 16 132zM16 292H432C440.8 292 448 284.8 448 276V236C448 227.2 440.8 220 432 220H16C7.2 220 0 227.2 0 236V276C0 284.8 7.2 292 16 292zM16 452H432C440.8 452 448 444.8 448 436V396C448 387.2 440.8 380 432 380H16C7.2 380 0 387.2 0 396V436C0 444.8 7.2 452 16 452z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/calendar-alt.js


Icon.register({
  'regular/calendar-alt': {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M400 64H352V16C352 7.2 344.8 0 336 0H304C295.2 0 288 7.2 288 16V64H160V16C160 7.2 152.8 0 144 0H112C103.2 0 96 7.2 96 16V64H48C21.5 64 0 85.5 0 112V464C0 490.5 21.5 512 48 512H400C426.5 512 448 490.5 448 464V112C448 85.5 426.5 64 400 64zM400 160V240H304V160H400zM176 352V272H272V352H176zM272 384V464H176V384H272zM144 352H48V272H144V352zM176 240V160H272V240H176zM304 272H400V352H304V272zM144 160V240H48V160H144zM48 458V384H144V464H54C50.7 464 48 461.3 48 458zM394 464H304V384H400V458C400 461.3 397.3 464 394 464z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/clock.js


Icon.register({
  'regular/clock': {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zM256 456C145.5 456 56 366.5 56 256S145.5 56 256 56 456 145.5 456 256 366.5 456 256 456zM317.8 351.6L232.9 289.9C229.8 287.6 228 284 228 280.2V116C228 109.4 233.4 104 240 104H272C278.6 104 284 109.4 284 116V257.7L350.8 306.3C356.2 310.2 357.3 317.7 353.4 323.1L334.6 349C330.7 354.3 323.2 355.5 317.8 351.6z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/th.js


Icon.register({
  th: {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M149.3 56V136C149.3 149.3 138.6 160 125.3 160H24C10.7 160 0 149.3 0 136V56C0 42.7 10.7 32 24 32H125.3C138.6 32 149.3 42.7 149.3 56zM330.7 296V216C330.7 202.7 319.9 192 306.7 192H205.3C192.1 192 181.3 202.7 181.3 216V296C181.3 309.3 192.1 320 205.3 320H306.7C319.9 320 330.7 309.3 330.7 296zM362.7 56V136C362.7 149.3 373.4 160 386.7 160H488C501.3 160 512 149.3 512 136V56C512 42.7 501.3 32 488 32H386.7C373.4 32 362.7 42.7 362.7 56zM330.7 136V56C330.7 42.7 319.9 32 306.7 32H205.3C192.1 32 181.3 42.7 181.3 56V136C181.3 149.3 192.1 160 205.3 160H306.7C319.9 160 330.7 149.3 330.7 136zM125.3 192H24C10.7 192 0 202.7 0 216V296C0 309.3 10.7 320 24 320H125.3C138.6 320 149.3 309.3 149.3 296V216C149.3 202.7 138.6 192 125.3 192zM0 376V456C0 469.3 10.7 480 24 480H125.3C138.6 480 149.3 469.3 149.3 456V376C149.3 362.7 138.6 352 125.3 352H24C10.7 352 0 362.7 0 376zM386.7 320H488C501.3 320 512 309.3 512 296V216C512 202.7 501.3 192 488 192H386.7C373.4 192 362.7 202.7 362.7 216V296C362.7 309.3 373.4 320 386.7 320zM386.7 480H488C501.3 480 512 469.3 512 456V376C512 362.7 501.3 352 488 352H386.7C373.4 352 362.7 362.7 362.7 376V456C362.7 469.3 373.4 480 386.7 480zM181.3 376V456C181.3 469.3 192.1 480 205.3 480H306.7C319.9 480 330.7 469.3 330.7 456V376C330.7 362.7 319.9 352 306.7 352H205.3C192.1 352 181.3 362.7 181.3 376z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/sort-numeric-up.js


Icon.register({
  'sort-numeric-up': {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M308.8 113.8L289.4 93C284.8 88.2 285.1 80.6 289.9 76L333.4 35.3A12-12 0 0 0 341.6 32.1H373.2C379.8 32.1 385.2 37.4 385.2 44.1V171.1H410.8C417.4 171.1 422.8 176.5 422.8 183.1V212.1C422.8 218.7 417.4 224.1 410.8 224.1H301.6C295 224.1 289.6 218.7 289.6 212.1V183.1C289.6 176.5 295 171.1 301.6 171.1H327.1V113.2C319.8 119.8 312.9 118.1 308.8 113.8zM278.2 352.4C278.2 319.7 302.1 285 346.3 285 384.6 285 425.8 313.9 425.8 377.2 425.8 428.5 393.5 483 333.8 483 315.9 483 303.2 479.4 295.2 476.2 289.4 473.9 286.4 467.5 288.3 461.5L297.5 432C299.6 425.5 306.6 422.1 313 424.3 326 428.9 340.9 429.6 351.1 420.2 312.4 425.3 278.2 394.8 278.2 352.4zM370.5 371.7C370.5 349.4 355.2 335.2 344.7 335.2 336 335.2 331.5 343.2 331.5 351 331.5 356.7 333.3 375.2 356.7 375.2 366.7 375.2 370.1 373 370.4 372.5 370.4 372.4 370.5 372.2 370.5 371.7zM16 144H64V464C64 472.8 71.2 480 80 480H112C120.8 480 128 472.8 128 464V144H176C190.2 144 197.4 126.8 187.3 116.7L107.3 36.7C101.1 30.4 90.9 30.4 84.7 36.7L4.7 116.7C-5.3 126.7 1.8 144 16 144z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/star.js


Icon.register({
  'regular/star': {
    width: 576,
    height: 512,
    paths: [
      {
        d: 'M528.1 171.5L382 150.2 316.7 17.8C305-5.8 271.1-6.1 259.3 17.8L194 150.2 47.9 171.5C21.7 175.3 11.2 207.6 30.2 226.1L135.9 329.1 110.9 474.6C106.4 500.9 134.1 520.6 157.3 508.3L288 439.6 418.7 508.3C441.9 520.5 469.6 500.9 465.1 474.6L440.1 329.1 545.8 226.1C564.8 207.6 554.3 175.3 528.1 171.5zM388.6 312.3L412.3 450.7 288 385.4 163.7 450.7 187.4 312.3 86.8 214.3 225.8 194.1 288 68.1 350.2 194.1 489.2 214.3 388.6 312.3z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/palette.js


Icon.register({
  palette: {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4-31.8 390.4 136.9 529.8 264 510.1 305.2 503.7 325.4 455.5 306.5 418.4 283.4 373 316.4 320 367.4 320H447.1C482.9 320 511.9 290.4 512 254.7 511.5 97.1 368.1-26.9 204.3 5zM96 320C78.3 320 64 305.7 64 288S78.3 256 96 256 128 270.3 128 288 113.7 320 96 320zM128 192C110.3 192 96 177.7 96 160S110.3 128 128 128 160 142.3 160 160 145.7 192 128 192zM256 128C238.3 128 224 113.7 224 96S238.3 64 256 64 288 78.3 288 96 273.7 128 256 128zM384 192C366.3 192 352 177.7 352 160S366.3 128 384 128 416 142.3 416 160 401.7 192 384 192z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/caret-square-down.js


Icon.register({
  'regular/caret-square-down': {
    width: 448,
    height: 512,
    paths: [
      {
        d: 'M125.1 208H322.9C333.6 208 339 221 331.4 228.5L232.5 326.8C227.8 331.5 220.3 331.5 215.6 326.8L116.7 228.5C109 221 114.4 208 125.1 208zM448 80V432C448 458.5 426.5 480 400 480H48C21.5 480 0 458.5 0 432V80C0 53.5 21.5 32 48 32H400C426.5 32 448 53.5 448 80zM400 426V86C400 82.7 397.3 80 394 80H54C50.7 80 48 82.7 48 86V426C48 429.3 50.7 432 54 432H394C397.3 432 400 429.3 400 426z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/toggle-off.js


Icon.register({
  'toggle-off': {
    width: 576,
    height: 512,
    paths: [
      {
        d: 'M384 64H192C86 64 0 150 0 256S86 448 192 448H384C490 448 576 362 576 256S490 64 384 64zM64 256C64 185.3 121.2 128 192 128 262.7 128 320 185.2 320 256 320 326.7 262.8 384 192 384 121.3 384 64 326.8 64 256zM384 384H335.1C400.3 311.1 400.3 200.9 335.1 128H384C454.7 128 512 185.2 512 256 512 326.7 454.8 384 384 384z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/sliders-h.js


Icon.register({
  'sliders-h': {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M496 384H160V368C160 359.2 152.8 352 144 352H112C103.2 352 96 359.2 96 368V384H16C7.2 384 0 391.2 0 400V432C0 440.8 7.2 448 16 448H96V464C96 472.8 103.2 480 112 480H144C152.8 480 160 472.8 160 464V448H496C504.8 448 512 440.8 512 432V400C512 391.2 504.8 384 496 384zM496 224H416V208C416 199.2 408.8 192 400 192H368C359.2 192 352 199.2 352 208V224H16C7.2 224 0 231.2 0 240V272C0 280.8 7.2 288 16 288H352V304C352 312.8 359.2 320 368 320H400C408.8 320 416 312.8 416 304V288H496C504.8 288 512 280.8 512 272V240C512 231.2 504.8 224 496 224zM496 64H288V48C288 39.2 280.8 32 272 32H240C231.2 32 224 39.2 224 48V64H16C7.2 64 0 71.2 0 80V112C0 120.8 7.2 128 16 128H224V144C224 152.8 231.2 160 240 160H272C280.8 160 288 152.8 288 144V128H496C504.8 128 512 120.8 512 112V80C512 71.2 504.8 64 496 64z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/image.js


Icon.register({
  'regular/image': {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M464 64H48C21.5 64 0 85.5 0 112V400C0 426.5 21.5 448 48 448H464C490.5 448 512 426.5 512 400V112C512 85.5 490.5 64 464 64zM458 400H54A6-6 0 0 0 48 394V118A6-6 0 0 0 54 112H458A6-6 0 0 0 464 118V394A6-6 0 0 0 458 400zM128 152C105.9 152 88 169.9 88 192S105.9 232 128 232 168 214.1 168 192 150.1 152 128 152zM96 352H416V272L328.5 184.5C323.8 179.8 316.2 179.8 311.5 184.5L192 304 152.5 264.5C147.8 259.8 140.2 259.8 135.5 264.5L96 304V352z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/table.js


Icon.register({
  table: {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M464 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V80C512 53.5 490.5 32 464 32zM224 416H64V320H224V416zM224 256H64V160H224V256zM448 416H288V320H448V416zM448 256H288V160H448V256z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/chalkboard.js


Icon.register({
  chalkboard: {
    width: 640,
    height: 512,
    paths: [
      {
        d: 'M96 64H544V416H608V40C608 17.9 590.1 0 568 0H72C49.9 0 32 17.9 32 40V416H96V64zM624 448H480V384H288V448H16C7.2 448 0 455.2 0 464V496C0 504.8 7.2 512 16 512H624C632.8 512 640 504.8 640 496V464C640 455.2 632.8 448 624 448z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/clone.js


Icon.register({
  clone: {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M464 0C490.5 0 512 21.5 512 48V336C512 362.5 490.5 384 464 384H176C149.5 384 128 362.5 128 336V48C128 21.5 149.5 0 176 0H464M176 416C131.9 416 96 380.1 96 336V128H48C21.5 128 0 149.5 0 176V464C0 490.5 21.5 512 48 512H336C362.5 512 384 490.5 384 464V416H176z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/edit.js


Icon.register({
  edit: {
    width: 576,
    height: 512,
    paths: [
      {
        d: 'M402.6 83.2L492.8 173.4C496.6 177.2 496.6 183.4 492.8 187.2L274.4 405.6 181.6 415.9C169.2 417.3 158.7 406.8 160.1 394.4L170.4 301.6 388.8 83.2C392.6 79.4 398.8 79.4 402.6 83.2zM564.6 60.3L515.8 11.5C500.6-3.7 475.9-3.7 460.6 11.5L425.2 46.9C421.4 50.7 421.4 56.9 425.2 60.7L515.4 150.9C519.2 154.7 525.4 154.7 529.2 150.9L564.6 115.5C579.8 100.2 579.8 75.5 564.6 60.3zM384 346.2V448H64V128H293.8C297 128 300 126.7 302.3 124.5L342.3 84.5C349.9 76.9 344.5 64 333.8 64H48C21.5 64 0 85.5 0 112V464C0 490.5 21.5 512 48 512H400C426.5 512 448 490.5 448 464V306.2C448 295.5 435.1 290.2 427.5 297.7L387.5 337.7C385.3 340 384 343 384 346.2z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/sitemap.js


Icon.register({
  sitemap: {
    width: 640,
    height: 512,
    paths: [
      {
        d: 'M128 352H32C14.3 352 0 366.3 0 384V480C0 497.7 14.3 512 32 512H128C145.7 512 160 497.7 160 480V384C160 366.3 145.7 352 128 352zM104 272H296V320H344V272H536V320H584V262.4C584 241.2 566.8 224 545.6 224H344V160H384C401.7 160 416 145.7 416 128V32C416 14.3 401.7 0 384 0H256C238.3 0 224 14.3 224 32V128C224 145.7 238.3 160 256 160H296V224H94.4C73.2 224 56 241.2 56 262.4V320H104V272zM368 352H272C254.3 352 240 366.3 240 384V480C240 497.7 254.3 512 272 512H368C385.7 512 400 497.7 400 480V384C400 366.3 385.7 352 368 352zM608 352H512C494.3 352 480 366.3 480 384V480C480 497.7 494.3 512 512 512H608C625.7 512 640 497.7 640 480V384C640 366.3 625.7 352 608 352z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/clipboard.js


Icon.register({
  clipboard: {
    width: 384,
    height: 512,
    paths: [
      {
        d: 'M384 112V464C384 490.5 362.5 512 336 512H48C21.5 512 0 490.5 0 464V112C0 85.5 21.5 64 48 64H128C128 28.7 156.7 0 192 0S256 28.7 256 64H336C362.5 64 384 85.5 384 112zM192 40C178.7 40 168 50.7 168 64S178.7 88 192 88 216 77.3 216 64 205.3 40 192 40M288 154V134A6-6 0 0 1 282 128H102A6-6 0 0 1 96 134V154A6-6 0 0 1 102 160H282A6-6 0 0 1 288 154z'
      }
    ]
  }
})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Container.vue?vue&type=template&id=71bd83d1&
var Containervue_type_template_id_71bd83d1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-container',{staticClass:"form-mark"},[_c('el-aside',{staticStyle:{"wdith":"250px"}},[_c('div',{staticClass:"components-list"},[_c('div',{staticClass:"widget-cate"},[_vm._v("基础字段")]),_c('draggable',{attrs:{"element":"ul","list":_vm.basicComponents,"options":{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'},"clone":_vm.handleClone,"move":_vm.handleMove},on:{"end":_vm.handleMoveEnd,"start":_vm.handleMoveStart}},_vm._l((_vm.basicComponents),function(item,index){return _c('li',{key:index,staticClass:"form-edit-widget-label"},[_c('a',[_c('icon',{staticClass:"icon",attrs:{"name":item.icon}}),_c('span',[_vm._v(_vm._s(item.name))])],1)])}),0),_c('div',{staticClass:"widget-cate"},[_vm._v("高级字段")]),_c('draggable',{attrs:{"element":"ul","list":_vm.advanceComponents,"options":{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'},"clone":_vm.handleClone,"move":_vm.handleMove},on:{"end":_vm.handleMoveEnd,"start":_vm.handleMoveStart}},_vm._l((_vm.advanceComponents),function(item,index){return _c('li',{key:index,staticClass:"form-edit-widget-label"},[_c('a',[_c('icon',{staticClass:"icon",attrs:{"name":item.icon}}),_c('span',[_vm._v(_vm._s(item.name))])],1)])}),0),_c('div',{staticClass:"widget-cate"},[_vm._v("布局字段")]),_c('draggable',{attrs:{"element":"ul","list":_vm.layoutComponents,"options":{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'},"clone":_vm.handleClone,"move":_vm.handleMove},on:{"end":_vm.handleMoveEnd,"start":_vm.handleMoveStart}},_vm._l((_vm.layoutComponents),function(item,index){return _c('li',{key:index,staticClass:"form-edit-widget-label data-grid"},[_c('a',[_c('icon',{staticClass:"icon",attrs:{"name":item.icon}}),_c('span',[_vm._v(_vm._s(item.name))])],1)])}),0)],1)]),_c('el-container',{staticClass:"center-container",attrs:{"direction":"vertical"}},[_c('el-header',{staticClass:"btn-bar",staticStyle:{"height":"45px"}},[_c('el-button',{attrs:{"type":"text","size":"medium","icon":"el-icon-view"},on:{"click":_vm.handlePreview}},[_vm._v("预览")]),_c('el-button',{attrs:{"type":"text","size":"medium","icon":"el-icon-tickets"},on:{"click":_vm.handleGenerateJson}},[_vm._v("生成JSON")]),_c('el-button',{attrs:{"type":"text","size":"medium","icon":"el-icon-document"},on:{"click":_vm.handleGenerateCode}},[_vm._v("生成代码")])],1),_c('el-main',{class:{'widget-empty': _vm.widgetForm.list.length == 0},staticStyle:{"min-height":"600px"}},[_c('widget-form',{ref:"widgetForm",attrs:{"data":_vm.widgetForm,"select":_vm.widgetFormSelect},on:{"update:select":function($event){_vm.widgetFormSelect=$event}}})],1)],1),_c('el-aside',{staticClass:"widget-config-container"},[_c('el-container',[_c('el-header',{attrs:{"height":"45px"}},[_c('div',{staticClass:"config-tab",class:{active: _vm.configTab=='widget'},on:{"click":function($event){_vm.handleConfigSelect('widget')}}},[_vm._v("字段属性")]),_c('div',{staticClass:"config-tab",class:{active: _vm.configTab=='form'},on:{"click":function($event){_vm.handleConfigSelect('form')}}},[_vm._v("表单属性")])]),_c('el-main',{staticClass:"config-content"},[_c('widget-config',{directives:[{name:"show",rawName:"v-show",value:(_vm.configTab=='widget'),expression:"configTab=='widget'"}],attrs:{"data":_vm.widgetFormSelect}}),_c('form-config',{directives:[{name:"show",rawName:"v-show",value:(_vm.configTab=='form'),expression:"configTab=='form'"}],attrs:{"data":_vm.widgetForm.config}})],1)],1)],1),_c('cus-dialog',{ref:"widgetPreview",attrs:{"visible":_vm.previewVisible,"width":"1000px","form":""},on:{"on-close":function($event){_vm.previewVisible = false},"on-submit":_vm.handleTest}},[(_vm.previewVisible)?_c('generate-form',{ref:"generateForm",attrs:{"data":_vm.widgetForm,"remote":_vm.remoteFuncs,"value":_vm.widgetModels},scopedSlots:_vm._u([{key:"blank",fn:function(scope){return [_vm._v("\n                宽度："),_c('el-input',{staticStyle:{"width":"100px"},model:{value:(scope.model.blank.width),callback:function ($$v) {_vm.$set(scope.model.blank, "width", $$v)},expression:"scope.model.blank.width"}}),_vm._v("\n                高度："),_c('el-input',{staticStyle:{"width":"100px"},model:{value:(scope.model.blank.height),callback:function ($$v) {_vm.$set(scope.model.blank, "height", $$v)},expression:"scope.model.blank.height"}})]}}])}):_vm._e()],1),_c('cus-dialog',{ref:"jsonPreview",attrs:{"visible":_vm.jsonVisible,"width":"800px","form":""},on:{"on-close":function($event){_vm.jsonVisible = false}}},[_c('div',{staticStyle:{"height":"400px","width":"100%"},attrs:{"id":"jsoneditor"}},[_vm._v(_vm._s(_vm.jsonTemplate))]),_c('template',{slot:"action"},[_c('el-button',{attrs:{"id":"copybtn","data-clipboard-target":".ace_text-input"}},[_vm._v("双击复制")])],1)],2),_c('cus-dialog',{ref:"codePreview",attrs:{"visible":_vm.codeVisible,"width":"800px","form":"","action":false},on:{"on-close":function($event){_vm.codeVisible = false}}},[_c('div',{staticStyle:{"height":"500px","width":"100%"},attrs:{"id":"codeeditor"}},[_vm._v(_vm._s(_vm.htmlTemplate))])])],1)}
var Containervue_type_template_id_71bd83d1_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Container.vue?vue&type=template&id=71bd83d1&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__("f499");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.js
var vuedraggable = __webpack_require__("1516");
var vuedraggable_default = /*#__PURE__*/__webpack_require__.n(vuedraggable);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetConfig.vue?vue&type=template&id=2e10a1be&
var WidgetConfigvue_type_template_id_2e10a1be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',[_c('el-form',{attrs:{"label-position":"top"}},[(_vm.data.type!='grid')?_c('el-form-item',{attrs:{"label":"标题"}},[_c('el-input',{model:{value:(_vm.data.name),callback:function ($$v) {_vm.$set(_vm.data, "name", $$v)},expression:"data.name"}})],1):_vm._e(),(_vm.data.type!='grid')?_c('el-form-item',{attrs:{"label":"数据绑定Key"}},[_c('el-input',{model:{value:(_vm.data.model),callback:function ($$v) {_vm.$set(_vm.data, "model", $$v)},expression:"data.model"}}),_vm._v("\n\n            如果是表.字段的话，.用 __and__替换；\n\n            "),_c('div',{staticStyle:{"margin-top":"10px","font-size":"12px"}},[_vm._v("\n                提供参考\n                "),_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":_vm.whenModelSelectChange},model:{value:(_vm.data.model),callback:function ($$v) {_vm.$set(_vm.data, "model", $$v)},expression:"data.model"}},_vm._l((_vm.modelList),function(item){return _c('el-option',{key:item.name,attrs:{"label":item.zh_name,"value":item.name}})}),1)],1),_c('div',{staticStyle:{"margin-top":"10px"}},[_vm._v("\n                是否外键\n                 "),_c('el-switch',{model:{value:(_vm.data.isoutdb),callback:function ($$v) {_vm.$set(_vm.data, "isoutdb", $$v)},expression:"data.isoutdb"}})],1),_c('span')],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('width')>=0)?_c('el-form-item',{attrs:{"label":"宽度"}},[_c('el-input',{model:{value:(_vm.data.options.width),callback:function ($$v) {_vm.$set(_vm.data.options, "width", $$v)},expression:"data.options.width"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('height')>=0)?_c('el-form-item',{attrs:{"label":"高度"}},[_c('el-input',{model:{value:(_vm.data.options.height),callback:function ($$v) {_vm.$set(_vm.data.options, "height", $$v)},expression:"data.options.height"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('size')>=0)?_c('el-form-item',{attrs:{"label":"大小"}},[_vm._v("\n            宽度："),_c('el-input',{staticStyle:{"width":"90px"},attrs:{"type":"number"},model:{value:(_vm.data.options.size.width),callback:function ($$v) {_vm.$set(_vm.data.options.size, "width", _vm._n($$v))},expression:"data.options.size.width"}}),_vm._v("\n            高度："),_c('el-input',{staticStyle:{"width":"90px"},attrs:{"type":"number"},model:{value:(_vm.data.options.size.height),callback:function ($$v) {_vm.$set(_vm.data.options.size, "height", _vm._n($$v))},expression:"data.options.size.height"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('placeholder')>=0 && (_vm.data.type!='time' || _vm.data.type!='date'))?_c('el-form-item',{attrs:{"label":"占位提示"}},[_c('el-input',{model:{value:(_vm.data.options.placeholder),callback:function ($$v) {_vm.$set(_vm.data.options, "placeholder", $$v)},expression:"data.options.placeholder"}})],1):_vm._e(),_c('el-form-item',{attrs:{"label":"右侧提示"}},[_c('el-input',{model:{value:(_vm.data.tips),callback:function ($$v) {_vm.$set(_vm.data, "tips", $$v)},expression:"data.tips"}})],1),(Object.keys(_vm.data.options).indexOf('inline')>=0)?_c('el-form-item',{attrs:{"label":"布局方式"}},[_c('el-radio-group',{model:{value:(_vm.data.options.inline),callback:function ($$v) {_vm.$set(_vm.data.options, "inline", $$v)},expression:"data.options.inline"}},[_c('el-radio-button',{attrs:{"label":false}},[_vm._v("块级")]),_c('el-radio-button',{attrs:{"label":true}},[_vm._v("行内")])],1)],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showInput')>=0)?_c('el-form-item',{attrs:{"label":"显示输入框"}},[_c('el-switch',{model:{value:(_vm.data.options.showInput),callback:function ($$v) {_vm.$set(_vm.data.options, "showInput", $$v)},expression:"data.options.showInput"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('min')>=0)?_c('el-form-item',{attrs:{"label":"最小值"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.min),callback:function ($$v) {_vm.$set(_vm.data.options, "min", $$v)},expression:"data.options.min"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('max')>=0)?_c('el-form-item',{attrs:{"label":"最大值"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.max),callback:function ($$v) {_vm.$set(_vm.data.options, "max", $$v)},expression:"data.options.max"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('step')>=0)?_c('el-form-item',{attrs:{"label":"步长"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.step),callback:function ($$v) {_vm.$set(_vm.data.options, "step", $$v)},expression:"data.options.step"}})],1):_vm._e(),(_vm.data.type=='select')?_c('el-form-item',{attrs:{"label":"是否多选"}},[_c('el-switch',{on:{"change":_vm.handleSelectMuliple},model:{value:(_vm.data.options.multiple),callback:function ($$v) {_vm.$set(_vm.data.options, "multiple", $$v)},expression:"data.options.multiple"}})],1):_vm._e(),(_vm.data.type=='select')?_c('el-form-item',{attrs:{"label":"是否可搜索"}},[_c('el-switch',{model:{value:(_vm.data.options.filterable),callback:function ($$v) {_vm.$set(_vm.data.options, "filterable", $$v)},expression:"data.options.filterable"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('allowHalf')>=0)?_c('el-form-item',{attrs:{"label":"允许半选"}},[_c('el-switch',{model:{value:(_vm.data.options.allowHalf),callback:function ($$v) {_vm.$set(_vm.data.options, "allowHalf", $$v)},expression:"data.options.allowHalf"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showAlpha')>=0)?_c('el-form-item',{attrs:{"label":"支持透明度选择"}},[_c('el-switch',{model:{value:(_vm.data.options.showAlpha),callback:function ($$v) {_vm.$set(_vm.data.options, "showAlpha", $$v)},expression:"data.options.showAlpha"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showLabel')>=0)?_c('el-form-item',{attrs:{"label":"是否显示标签"}},[_c('el-switch',{model:{value:(_vm.data.options.showLabel),callback:function ($$v) {_vm.$set(_vm.data.options, "showLabel", $$v)},expression:"data.options.showLabel"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('tableset')>=0)?[_c('el-form-item',{attrs:{"label":"表格设置属性"}},[(_vm.data.type=='table')?[_c('div',[_c('table-set',{model:{value:(_vm.data.options.tableset),callback:function ($$v) {_vm.$set(_vm.data.options, "tableset", $$v)},expression:"data.options.tableset"}})],1)]:_vm._e()],2),_c('el-form-item',{attrs:{"label":"表格可添加"}},[(_vm.data.type=='table')?[_c('el-switch',{model:{value:(_vm.data.options.table_add),callback:function ($$v) {_vm.$set(_vm.data.options, "table_add", $$v)},expression:"data.options.table_add"}})]:_vm._e()],2),_c('el-form-item',{attrs:{"label":"表格可编辑"}},[(_vm.data.type=='table')?[_c('el-switch',{model:{value:(_vm.data.options.table_edit),callback:function ($$v) {_vm.$set(_vm.data.options, "table_edit", $$v)},expression:"data.options.table_edit"}})]:_vm._e()],2),_c('el-form-item',{attrs:{"label":"表格可删除"}},[(_vm.data.type=='table')?[_c('el-switch',{model:{value:(_vm.data.options.table_delete),callback:function ($$v) {_vm.$set(_vm.data.options, "table_delete", $$v)},expression:"data.options.table_delete"}})]:_vm._e()],2)]:_vm._e(),(Object.keys(_vm.data.options).indexOf('componentName')>=0)?_c('el-form-item',{attrs:{"label":"定制属性"}},[(_vm.data.type=='custom')?[_c('div',[(_vm.customlist.length>0)?_c('el-select',{staticStyle:{"margin-bottom":"5px"},attrs:{"placeholder":"请选择自定义组件"},model:{value:(_vm.data.options.componentName),callback:function ($$v) {_vm.$set(_vm.data.options, "componentName", $$v)},expression:"data.options.componentName"}},_vm._l((_vm.customlist),function(item){return _c('el-option',{key:item.v,attrs:{"label":item.n,"value":item.v}})}),1):_vm._e(),_c('el-input',{attrs:{"placeholder":"请输入组件名称"},model:{value:(_vm.data.options.componentName),callback:function ($$v) {_vm.$set(_vm.data.options, "componentName", $$v)},expression:"data.options.componentName"}})],1)]:_vm._e()],2):_vm._e(),(_vm.data.type!='grid')?[_c('el-form-item',{attrs:{"label":"绑定默认数据类型"}},[_c('el-select',{model:{value:(_vm.data.options.defaultType),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultType", $$v)},expression:"data.options.defaultType"}},[_c('el-option',{attrs:{"value":"","label":"无（默认）"}}),_c('el-option',{attrs:{"value":"String","label":"字符"}}),_c('el-option',{attrs:{"value":"Number","label":"数值"}}),_c('el-option',{attrs:{"value":"Object","label":"对象"}}),_c('el-option',{attrs:{"value":"Array","label":"数组"}})],1)],1),(Object.keys(_vm.data.options).indexOf('defaultValue')>=0)?_c('el-form-item',{attrs:{"label":"默认值"}},[(_vm.data.type=='textarea')?_c('el-input',{attrs:{"type":"textarea","rows":5},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type=='input')?_c('el-input',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type == 'rate')?_c('el-rate',{staticStyle:{"display":"inline-block","vertical-align":"middle"},attrs:{"max":_vm.data.options.max,"allow-half":_vm.data.options.allowHalf},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type == 'rate')?_c('el-button',{staticStyle:{"display":"inline-block","vertical-align":"middle","margin-left":"10px"},attrs:{"type":"text"},on:{"click":function($event){_vm.data.options.defaultValue=0}}},[_vm._v("清空")]):_vm._e(),(_vm.data.type == 'color')?_c('el-color-picker',{attrs:{"show-alpha":_vm.data.options.showAlpha},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type=='switch')?_c('el-switch',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type=='radio' || (_vm.data.type=='select'&&!_vm.data.options.multiple))?[(_vm.data.options.defaultType=="Number")?_c('el-input',{attrs:{"type":"number"},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", _vm._n($$v))},expression:"data.options.defaultValue"}}):_c('el-input',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}})]:_vm._e(),(_vm.data.type=='checkbox' || (_vm.data.type=='select' && _vm.data.options.multiple))?_c('div',[_c('json-editor',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}})],1):_vm._e()],2):_vm._e()]:_vm._e(),(Object.keys(_vm.data.options).indexOf('sourceType')>=0)?_c('el-form-item',{attrs:{"label":"数据源"}},[_c('el-radio-group',{staticStyle:{"margin-bottom":"10px"},attrs:{"size":"mini"},model:{value:(_vm.data.options.sourceType),callback:function ($$v) {_vm.$set(_vm.data.options, "sourceType", $$v)},expression:"data.options.sourceType"}},[_c('el-radio-button',{attrs:{"label":"options"}},[_vm._v("静态数据")]),_c('el-radio-button',{attrs:{"label":"json"}},[_vm._v("Json数据")]),_c('el-radio-button',{attrs:{"label":"remote"}},[_vm._v("远端数据")])],1),(_vm.data.options.sourceType=='remote')?[_c('div',[_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.remoteFunc),callback:function ($$v) {_vm.$set(_vm.data.options, "remoteFunc", $$v)},expression:"data.options.remoteFunc"}},[_c('template',{slot:"prepend"},[_vm._v("远端方法")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.value),callback:function ($$v) {_vm.$set(_vm.data.options.props, "value", $$v)},expression:"data.options.props.value"}},[_c('template',{slot:"prepend"},[_vm._v("值")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.label),callback:function ($$v) {_vm.$set(_vm.data.options.props, "label", $$v)},expression:"data.options.props.label"}},[_c('template',{slot:"prepend"},[_vm._v("标签")])],2)],1)]:(_vm.data.options.sourceType=='json')?[_c('div',[_c('json-editor',{model:{value:(_vm.data.options.jsonOptions),callback:function ($$v) {_vm.$set(_vm.data.options, "jsonOptions", $$v)},expression:"data.options.jsonOptions"}}),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.value),callback:function ($$v) {_vm.$set(_vm.data.options.props, "value", $$v)},expression:"data.options.props.value"}},[_c('template',{slot:"prepend"},[_vm._v("值")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.label),callback:function ($$v) {_vm.$set(_vm.data.options.props, "label", $$v)},expression:"data.options.props.label"}},[_c('template',{slot:"prepend"},[_vm._v("标签")])],2),(_vm.data.type=='radio' || (_vm.data.type=='select'&&!_vm.data.options.multiple))?_c('el-card',[_vm._v("\n                        展示数据："),_c('br'),_c('el-radio-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},_vm._l((_vm.data.options.jsonOptions),function(item,index){return _c('div',{key:index},[_c('el-radio',{attrs:{"label":item[_vm.data.options.props.value]}},[_vm._v(_vm._s(item[_vm.data.options.props.label]))])],1)}),0)],1):_vm._e(),(_vm.data.type=='checkbox' || (_vm.data.type=='select' && _vm.data.options.multiple))?_c('el-card',[_vm._v("\n                        展示数据："),_c('br'),_c('el-checkbox-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},_vm._l((_vm.data.options.jsonOptions),function(item,index){return _c('div',{key:index},[_c('el-checkbox',{attrs:{"label":item[_vm.data.options.props.value]}},[_vm._v(_vm._s(item[_vm.data.options.props.label]))])],1)}),0)],1):_vm._e()],1)]:[(_vm.data.type=='radio' || (_vm.data.type=='select'&&!_vm.data.options.multiple))?[_c('el-radio-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.options.options,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.options.options),function(item,index){return _c('li',{key:index},[_c('el-radio',{staticStyle:{"margin-right":"5px"},attrs:{"label":item.value}},[_c('el-input',{style:({'width': _vm.data.options.showLabel? '90px': '190px' }),attrs:{"size":"mini"},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),(_vm.data.options.showLabel)?_c('el-input',{staticStyle:{"width":"100px"},attrs:{"size":"mini"},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}):_vm._e()],1),_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)}),0)],1)]:_vm._e(),(_vm.data.type=='checkbox' || (_vm.data.type=='select' && _vm.data.options.multiple))?[_c('el-checkbox-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.options.options,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.options.options),function(item,index){return _c('li',{key:index},[_c('el-checkbox',{staticStyle:{"margin-right":"5px"},attrs:{"label":item.value}},[_c('el-input',{style:({'width': _vm.data.options.showLabel? '90px': '190px' }),attrs:{"size":"mini"},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),(_vm.data.options.showLabel)?_c('el-input',{staticStyle:{"width":"100px"},attrs:{"size":"mini"},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}):_vm._e()],1),_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)}),0)],1)]:_vm._e(),_c('div',{staticStyle:{"margin-left":"22px"}},[_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.handleAddOption}},[_vm._v("添加选项")])],1)]],2):_vm._e(),(_vm.data.type=='cascader')?_c('el-form-item',{attrs:{"label":"远端数据"}},[_c('div',[_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.remoteFunc),callback:function ($$v) {_vm.$set(_vm.data.options, "remoteFunc", $$v)},expression:"data.options.remoteFunc"}},[_c('template',{slot:"prepend"},[_vm._v("远端方法")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.value),callback:function ($$v) {_vm.$set(_vm.data.options.props, "value", $$v)},expression:"data.options.props.value"}},[_c('template',{slot:"prepend"},[_vm._v("值")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.label),callback:function ($$v) {_vm.$set(_vm.data.options.props, "label", $$v)},expression:"data.options.props.label"}},[_c('template',{slot:"prepend"},[_vm._v("标签")])],2),_c('el-input',{attrs:{"size":"mini"},model:{value:(_vm.data.options.props.children),callback:function ($$v) {_vm.$set(_vm.data.options.props, "children", $$v)},expression:"data.options.props.children"}},[_c('template',{slot:"prepend"},[_vm._v("子选项")])],2)],1)]):_vm._e(),(_vm.data.type == 'time' || _vm.data.type == 'date')?[(_vm.data.type == 'date')?_c('el-form-item',{attrs:{"label":"显示类型"}},[_c('el-select',{model:{value:(_vm.data.options.type),callback:function ($$v) {_vm.$set(_vm.data.options, "type", $$v)},expression:"data.options.type"}},[_c('el-option',{attrs:{"value":"year"}}),_c('el-option',{attrs:{"value":"month"}}),_c('el-option',{attrs:{"value":"date"}}),_c('el-option',{attrs:{"value":"dates"}}),_c('el-option',{attrs:{"value":"datetime"}}),_c('el-option',{attrs:{"value":"datetimerange"}}),_c('el-option',{attrs:{"value":"daterange"}})],1)],1):_vm._e(),(_vm.data.type == 'time')?_c('el-form-item',{attrs:{"label":"是否为范围选择"}},[_c('el-switch',{model:{value:(_vm.data.options.isRange),callback:function ($$v) {_vm.$set(_vm.data.options, "isRange", $$v)},expression:"data.options.isRange"}})],1):_vm._e(),(_vm.data.type == 'date')?_c('el-form-item',{attrs:{"label":"是否获取时间戳"}},[_c('el-switch',{model:{value:(_vm.data.options.timestamp),callback:function ($$v) {_vm.$set(_vm.data.options, "timestamp", $$v)},expression:"data.options.timestamp"}})],1):_vm._e(),((!_vm.data.options.isRange && _vm.data.type == 'time') || (_vm.data.type != 'time' && _vm.data.options.type != 'datetimerange' && _vm.data.options.type != 'daterange'))?_c('el-form-item',{attrs:{"label":"占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.placeholder),callback:function ($$v) {_vm.$set(_vm.data.options, "placeholder", $$v)},expression:"data.options.placeholder"}})],1):_vm._e(),((_vm.data.options.isRange) || _vm.data.options.type=='datetimerange' || _vm.data.options.type=='daterange')?_c('el-form-item',{attrs:{"label":"开始时间占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.startPlaceholder),callback:function ($$v) {_vm.$set(_vm.data.options, "startPlaceholder", $$v)},expression:"data.options.startPlaceholder"}})],1):_vm._e(),(_vm.data.options.isRange || _vm.data.options.type=='datetimerange' || _vm.data.options.type=='daterange')?_c('el-form-item',{attrs:{"label":"结束时间占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.endPlaceholder),callback:function ($$v) {_vm.$set(_vm.data.options, "endPlaceholder", $$v)},expression:"data.options.endPlaceholder"}})],1):_vm._e(),_c('el-form-item',{attrs:{"label":"格式"}},[_c('el-input',{model:{value:(_vm.data.options.format),callback:function ($$v) {_vm.$set(_vm.data.options, "format", $$v)},expression:"data.options.format"}})],1),(_vm.data.type=='time' && Object.keys(_vm.data.options).indexOf('isRange')>=0)?_c('el-form-item',{attrs:{"label":"默认值"}},[(!_vm.data.options.isRange)?_c('el-time-picker',{key:"1",staticStyle:{"width":"100%"},attrs:{"arrowControl":_vm.data.options.arrowControl,"value-format":_vm.data.options.format},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.options.isRange)?_c('el-time-picker',{key:"2",staticStyle:{"width":"100%"},attrs:{"is-range":"","arrowControl":_vm.data.options.arrowControl,"value-format":_vm.data.options.format},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e()],1):_vm._e()]:_vm._e(),(_vm.data.type=='imgupload')?[_c('el-form-item',{attrs:{"label":"最大上传数"}},[_c('el-input',{attrs:{"type":"number"},model:{value:(_vm.data.options.length),callback:function ($$v) {_vm.$set(_vm.data.options, "length", _vm._n($$v))},expression:"data.options.length"}})],1),_c('el-form-item',{attrs:{"label":"Domain","required":true}},[_c('el-input',{model:{value:(_vm.data.options.domain),callback:function ($$v) {_vm.$set(_vm.data.options, "domain", $$v)},expression:"data.options.domain"}})],1),_c('el-form-item',{attrs:{"label":"获取七牛Token方法","required":true}},[_c('el-input',{model:{value:(_vm.data.options.tokenFunc),callback:function ($$v) {_vm.$set(_vm.data.options, "tokenFunc", $$v)},expression:"data.options.tokenFunc"}})],1)]:_vm._e(),(_vm.data.type == 'grid')?[_c('el-form-item',{attrs:{"label":"栅格间隔"}},[_c('el-input',{attrs:{"type":"number"},model:{value:(_vm.data.options.gutter),callback:function ($$v) {_vm.$set(_vm.data.options, "gutter", _vm._n($$v))},expression:"data.options.gutter"}})],1),_c('el-form-item',{attrs:{"label":"列配置项"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.columns,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.columns),function(item,index){return _c('li',{key:index},[_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-input',{staticStyle:{"width":"100px"},attrs:{"placeholder":"栅格值","size":"mini","type":"number"},model:{value:(item.span),callback:function ($$v) {_vm.$set(item, "span", _vm._n($$v))},expression:"item.span"}}),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)}),0),_c('div',{staticStyle:{"margin-left":"22px"}},[_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.handleAddColumn}},[_vm._v("添加列")])],1)],1),_c('el-form-item',{attrs:{"label":"水平排列方式"}},[_c('el-select',{model:{value:(_vm.data.options.justify),callback:function ($$v) {_vm.$set(_vm.data.options, "justify", $$v)},expression:"data.options.justify"}},[_c('el-option',{attrs:{"value":"start","label":"左对齐"}}),_c('el-option',{attrs:{"value":"end","label":"右对齐"}}),_c('el-option',{attrs:{"value":"center","label":"居中"}}),_c('el-option',{attrs:{"value":"space-around","label":"两侧间隔相等"}}),_c('el-option',{attrs:{"value":"space-between","label":"两端对齐"}})],1)],1),_c('el-form-item',{attrs:{"label":"垂直排列方式"}},[_c('el-select',{model:{value:(_vm.data.options.align),callback:function ($$v) {_vm.$set(_vm.data.options, "align", $$v)},expression:"data.options.align"}},[_c('el-option',{attrs:{"value":"top","label":"顶部对齐"}}),_c('el-option',{attrs:{"value":"middle","label":"居中"}}),_c('el-option',{attrs:{"value":"bottom","label":"底部对齐"}})],1)],1)]:_vm._e(),(_vm.data.type != 'grid')?[_c('el-form-item',{attrs:{"label":"操作属性"}},[(Object.keys(_vm.data.options).indexOf('hideable')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.hideable),callback:function ($$v) {_vm.$set(_vm.data.options, "hideable", $$v)},expression:"data.options.hideable"}},[_vm._v("是否隐藏")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('readonly')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.readonly),callback:function ($$v) {_vm.$set(_vm.data.options, "readonly", $$v)},expression:"data.options.readonly"}},[_vm._v("完全只读")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('disabled')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.disabled),callback:function ($$v) {_vm.$set(_vm.data.options, "disabled", $$v)},expression:"data.options.disabled"}},[_vm._v("禁用 ")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('editable')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.editable),callback:function ($$v) {_vm.$set(_vm.data.options, "editable", $$v)},expression:"data.options.editable"}},[_vm._v("文本框可输入")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('clearable')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.clearable),callback:function ($$v) {_vm.$set(_vm.data.options, "clearable", $$v)},expression:"data.options.clearable"}},[_vm._v("显示清除按钮")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('arrowControl')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.arrowControl),callback:function ($$v) {_vm.$set(_vm.data.options, "arrowControl", $$v)},expression:"data.options.arrowControl"}},[_vm._v("使用箭头进行时间选择")]):_vm._e()],1),_c('el-form-item',{attrs:{"label":"前端校验"}},[_c('div',[_c('el-checkbox',{model:{value:(_vm.data.options.required),callback:function ($$v) {_vm.$set(_vm.data.options, "required", $$v)},expression:"data.options.required"}},[_vm._v("必填")])],1),(Object.keys(_vm.data.options).indexOf('dataType')>=0)?_c('el-select',{attrs:{"size":"mini"},model:{value:(_vm.data.options.dataType),callback:function ($$v) {_vm.$set(_vm.data.options, "dataType", $$v)},expression:"data.options.dataType"}},[_c('el-option',{attrs:{"value":"string","label":"字符串"}}),_c('el-option',{attrs:{"value":"number","label":"数字"}}),_c('el-option',{attrs:{"value":"boolean","label":"布尔值"}}),_c('el-option',{attrs:{"value":"integer","label":"整数"}}),_c('el-option',{attrs:{"value":"float","label":"浮点数"}}),_c('el-option',{attrs:{"value":"url","label":"URL地址"}}),_c('el-option',{attrs:{"value":"email","label":"邮箱地址"}}),_c('el-option',{attrs:{"value":"hex","label":"十六进制"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('pattern')>=0)?_c('div',[_c('el-input',{staticStyle:{"width":"240px"},attrs:{"size":"mini","placeholder":"填写正则表达式"},model:{value:(_vm.data.options.pattern),callback:function ($$v) {_vm.$set(_vm.data.options, "pattern", $$v)},expression:"data.options.pattern"}})],1):_vm._e()],1),_c('el-form-item',{attrs:{"label":"后端验证"}},[_c('el-input',{attrs:{"placeholder":"请输入后台验证规则"},model:{value:(_vm.data.s_valid),callback:function ($$v) {_vm.$set(_vm.data, "s_valid", $$v)},expression:"data.s_valid"}})],1),_c('el-form-item',{attrs:{"label":"搜索匹配方式"}},[_c('el-select',{attrs:{"placeholder":"匹配方式"},model:{value:(_vm.data.searchMatch),callback:function ($$v) {_vm.$set(_vm.data, "searchMatch", $$v)},expression:"data.searchMatch"}},[_c('el-option',{attrs:{"value":""}},[_vm._v("无")]),_vm._l((_vm.matchList),function(item){return _c('el-option',{key:item.v,attrs:{"label":item.n,"value":item.v}})})],2)],1)]:_vm._e()],2)],1):_vm._e()}
var WidgetConfigvue_type_template_id_2e10a1be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetConfig.vue?vue&type=template&id=2e10a1be&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetConfig.vue?vue&type=script&lang=js&
var WidgetConfigvue_type_script_lang_js_ = __webpack_require__("9ea2");

// CONCATENATED MODULE: ./src/components/WidgetConfig.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetConfigvue_type_script_lang_js_ = (WidgetConfigvue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/WidgetConfig.vue





/* normalize component */

var WidgetConfig_component = Object(componentNormalizer["a" /* default */])(
  components_WidgetConfigvue_type_script_lang_js_,
  WidgetConfigvue_type_template_id_2e10a1be_render,
  WidgetConfigvue_type_template_id_2e10a1be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

WidgetConfig_component.options.__file = "WidgetConfig.vue"
/* harmony default export */ var WidgetConfig = (WidgetConfig_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormConfig.vue?vue&type=template&id=1c8f9b2a&
var FormConfigvue_type_template_id_1c8f9b2a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-config-container"},[_c('el-form',{attrs:{"label-position":"top"}},[_c('el-form-item',{attrs:{"label":"标签对齐方式"}},[_c('el-radio-group',{model:{value:(_vm.data.labelPosition),callback:function ($$v) {_vm.$set(_vm.data, "labelPosition", $$v)},expression:"data.labelPosition"}},[_c('el-radio-button',{attrs:{"label":"left"}},[_vm._v("左对齐")]),_c('el-radio-button',{attrs:{"label":"right"}},[_vm._v("右对齐")]),_c('el-radio-button',{attrs:{"label":"top"}},[_vm._v("顶部对齐")])],1)],1),_c('el-form-item',{attrs:{"label":"表单字段宽度"}},[_c('el-input-number',{attrs:{"min":0,"max":200,"step":10},model:{value:(_vm.data.labelWidth),callback:function ($$v) {_vm.$set(_vm.data, "labelWidth", $$v)},expression:"data.labelWidth"}})],1),_c('el-form-item',{attrs:{"label":"组件尺寸"}},[_c('el-radio-group',{model:{value:(_vm.data.size),callback:function ($$v) {_vm.$set(_vm.data, "size", $$v)},expression:"data.size"}},[_c('el-radio-button',{attrs:{"label":"medium"}},[_vm._v("medium")]),_c('el-radio-button',{attrs:{"label":"small"}},[_vm._v("small")]),_c('el-radio-button',{attrs:{"label":"mini"}},[_vm._v("mini")])],1)],1)],1)],1)}
var FormConfigvue_type_template_id_1c8f9b2a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FormConfig.vue?vue&type=template&id=1c8f9b2a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormConfig.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FormConfigvue_type_script_lang_js_ = ({
  props: ['data']
});
// CONCATENATED MODULE: ./src/components/FormConfig.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormConfigvue_type_script_lang_js_ = (FormConfigvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FormConfig.vue





/* normalize component */

var FormConfig_component = Object(componentNormalizer["a" /* default */])(
  components_FormConfigvue_type_script_lang_js_,
  FormConfigvue_type_template_id_1c8f9b2a_render,
  FormConfigvue_type_template_id_1c8f9b2a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FormConfig_component.options.__file = "FormConfig.vue"
/* harmony default export */ var FormConfig = (FormConfig_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetForm.vue?vue&type=template&id=5fa8a265&
var WidgetFormvue_type_template_id_5fa8a265_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"widget-form-container"},[_c('el-form',{attrs:{"label-position":_vm.data.config.labelPosition,"label-width":_vm.data.config.labelWidth + 'px'}},[_c('draggable',{staticClass:"widget-form-list",attrs:{"options":{group:'people', ghostClass: 'ghost'}},on:{"end":_vm.handleMoveEnd,"add":_vm.handleWidgetAdd},model:{value:(_vm.data.list),callback:function ($$v) {_vm.$set(_vm.data, "list", $$v)},expression:"data.list"}},[_vm._l((_vm.data.list),function(element,index){return [(element.type == 'grid')?[(element && element.key)?_c('div',{key:element.key,staticClass:"widget-grid-container data-grid",staticStyle:{"position":"relative"}},[_c('el-row',{staticClass:"widget-grid ",class:{active: _vm.selectWidget.key == element.key},attrs:{"type":"flex","gutter":element.options.gutter ? element.options.gutter : 0,"justify":element.options.justify,"align":element.options.align},nativeOn:{"click":function($event){_vm.handleSelectWidget(index)}}},_vm._l((element.columns),function(col,colIndex){return _c('el-col',{key:colIndex,attrs:{"span":col.span ? col.span : 0}},[_c('div',{staticStyle:{"border":"1px dashed #999"}},[_c('draggable',{staticClass:"widget-form-list",staticStyle:{"padding-bottom":"50px","min-height":"120px"},attrs:{"filter":"widget-grid-container","options":{group:'people', ghostClass: 'ghost'}},on:{"end":_vm.handleMoveEnd,"add":function($event){_vm.handleWidgetColAdd($event, element, colIndex)}},model:{value:(col.list),callback:function ($$v) {_vm.$set(col, "list", $$v)},expression:"col.list"}},_vm._l((col.list),function(el,i){return (el.key)?_c('widget-form-item',{key:el.key,attrs:{"element":el,"select":_vm.selectWidget,"index":i,"data":col},on:{"update:select":function($event){_vm.selectWidget=$event}}}):_vm._e()}),1)],1)])}),1),(_vm.selectWidget.key == element.key)?_c('el-button',{staticClass:"widget-action-delete",staticStyle:{"bottom":"-20px"},attrs:{"title":"删除","circle":"","plain":"","type":"danger"},on:{"click":function($event){$event.stopPropagation();_vm.handleWidgetDelete(index)}}},[_c('icon',{staticStyle:{"width":"12px","height":"12px"},attrs:{"name":"regular/trash-alt"}})],1):_vm._e()],1):_vm._e()]:[(element && element.key)?_c('widget-form-item',{key:element.key,attrs:{"element":element,"select":_vm.selectWidget,"index":index,"data":_vm.data},on:{"update:select":function($event){_vm.selectWidget=$event}}}):_vm._e()]]})],2)],1)],1)}
var WidgetFormvue_type_template_id_5fa8a265_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetForm.vue?vue&type=template&id=5fa8a265&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetFormItem.vue?vue&type=template&id=c29bb9f6&scoped=true&
var WidgetFormItemvue_type_template_id_c29bb9f6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!!_vm.element.options.hideable)?_c('div',{staticStyle:{"color":"red"}},[_vm._v("（隐藏项目）")]):_vm._e(),(_vm.element && _vm.element.key)?_c('el-form-item',{staticClass:"widget-view ",class:{active: (!!_vm.selectWidget.key?_vm.selectWidget.key:null) == _vm.element.key, 'is_req': _vm.element.options.required},attrs:{"label":_vm.element.name},nativeOn:{"click":function($event){$event.stopPropagation();_vm.handleSelectWidget(_vm.index)}}},[(_vm.element.type == 'input')?[_c('el-input',{style:({width: _vm.element.options.width}),attrs:{"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'textarea')?[_c('el-input',{style:({width: _vm.element.options.width}),attrs:{"type":"textarea","rows":5,"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'number')?[_c('el-input-number',{style:({width: _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"controls-position":_vm.element.options.controlsPosition},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'radio')?[_c('el-radio-group',{style:({width: _vm.element.options.width}),model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},[(_vm.element.options.sourceType=='options')?_vm._l((_vm.element.options.options),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item.value}},[[_vm._v(_vm._s(_vm.element.options.showLabel ? item.label : item.value))]],2)}):_vm._e(),(_vm.element.options.sourceType=='json')?_vm._l((_vm.element.options.jsonOptions),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item[_vm.element.options.props.value]}},[[_vm._v(_vm._s(item[_vm.element.options.props.label]))]],2)}):_vm._e(),(_vm.element.options.sourceType=='remote')?_vm._l((_vm.element.options.remoteOptions),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item.value}},[[_vm._v("\n                            "+_vm._s(item.label)+"\n                        ")]],2)}):_vm._e()],2)]:_vm._e(),(_vm.element.type == 'checkbox')?[_c('el-checkbox-group',{style:({width: _vm.element.options.width}),model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},[(_vm.element.options.sourceType=='options')?_vm._l((_vm.element.options.options),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item.value}},[[_vm._v(_vm._s(_vm.element.options.showLabel ? item.label : item.value))]],2)}):_vm._e(),(_vm.element.options.sourceType=='json')?_vm._l((_vm.element.options.jsonOptions),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item[_vm.element.options.props.value]}},[[_vm._v(_vm._s(item[_vm.element.options.props.label]))]],2)}):_vm._e(),(_vm.element.options.sourceType=='remote')?_vm._l((_vm.element.options.remoteOptions),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"disabled":!!_vm.element.options.disabled,"label":item.value}},[[_vm._v("\n                            "+_vm._s(item.label)+"\n                        ")]],2)}):_vm._e()],2)]:_vm._e(),(_vm.element.type == 'time')?[_c('el-time-picker',{style:({width: _vm.element.options.width}),attrs:{"is-range":_vm.element.options.isRange,"placeholder":_vm.element.options.placeholder,"start-placeholder":_vm.element.options.startPlaceholder,"end-placeholder":_vm.element.options.endPlaceholder,"readonly":_vm.element.options.readonly,"disabled":_vm.element.options.disabled,"editable":_vm.element.options.editable,"clearable":_vm.element.options.clearable,"arrowControl":_vm.element.options.arrowControl},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'date')?[_c('el-date-picker',{style:({width: _vm.element.options.width}),attrs:{"type":_vm.element.options.type,"is-range":_vm.element.options.isRange,"placeholder":_vm.element.options.placeholder,"start-placeholder":_vm.element.options.startPlaceholder,"end-placeholder":_vm.element.options.endPlaceholder,"readonly":_vm.element.options.readonly,"disabled":_vm.element.options.disabled,"editable":_vm.element.options.editable,"clearable":_vm.element.options.clearable},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'rate')?[_c('el-rate',{attrs:{"max":_vm.element.options.max,"disabled":_vm.element.options.disabled,"allow-half":_vm.element.options.allowHalf},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'color')?[_c('el-color-picker',{attrs:{"disabled":_vm.element.options.disabled,"show-alpha":_vm.element.options.showAlpha},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'select')?[_c('el-select',{style:({width: _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"multiple":_vm.element.options.multiple,"clearable":_vm.element.options.clearable,"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},[(_vm.element.options.sourceType=='options')?_vm._l((_vm.element.options.options),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":_vm.element.options.showLabel?item.label:item.value}})}):_vm._e(),(_vm.element.options.sourceType=='json')?_vm._l((_vm.element.options.jsonOptions),function(item,index){return _c('el-option',{key:index,attrs:{"value":item[_vm.element.options.props.value],"label":item[_vm.element.options.props.label]}})}):_vm._e(),(_vm.element.options.sourceType=='remote')?_vm._l((_vm.element.options.remoteOptions),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":item.label}})}):_vm._e()],2)]:_vm._e(),(_vm.element.type=='switch')?[_c('el-switch',{attrs:{"disabled":_vm.element.options.disabled},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type=='slider')?[_c('el-slider',{style:({width: _vm.element.options.width}),attrs:{"min":_vm.element.options.min,"max":_vm.element.options.max,"disabled":_vm.element.options.disabled,"step":_vm.element.options.step,"show-input":_vm.element.options.showInput,"range":_vm.element.options.range},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type=='imgupload')?[_c('fm-upload',{style:({'width': _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"width":_vm.element.options.size.width,"height":_vm.element.options.size.height,"token":"xxx","domain":"xxx"},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'cascader')?[_c('el-cascader',{style:({width: _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"clearable":_vm.element.options.clearable,"placeholder":_vm.element.options.placeholder,"options":_vm.element.options.remoteOptions},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'editor')?[_c('fm-editor',{attrs:{"width":_vm.element.options.width,"height":_vm.element.options.height},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type=='table')?[_c('fm-table',{attrs:{"disabled":_vm.element.options.disabled,"styles":{'width': _vm.element.options.width},"tableset":_vm.element.options.tableset,"editadle":_vm.element.options.table_edit,"addable":_vm.element.options.table_add,"deleteable":_vm.element.options.table_delete,"table_row_create":_vm.element.options.table_row_create,"table_row_update":_vm.element.options.table_row_update},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type=='custom')?[_c(_vm.element.options.componentName,{tag:"component"})]:_vm._e(),(_vm.element.type=='blank')?[_c('div',{staticStyle:{"height":"50px","color":"#999","background":"#eee","line-height":"50px","text-align":"center"}},[_vm._v("自定义区域")])]:_vm._e(),(!!_vm.element.tips)?[_c('span',{staticClass:"tips",domProps:{"innerHTML":_vm._s(_vm.element.tips)}})]:_vm._e(),(_vm.selectWidget.key == _vm.element.key)?_c('el-button',{staticClass:"widget-action-delete",attrs:{"title":"删除","circle":"","plain":"","type":"danger"},on:{"click":function($event){$event.stopPropagation();_vm.handleWidgetDelete(_vm.index)}}},[_c('icon',{staticStyle:{"width":"12px","height":"12px"},attrs:{"name":"regular/trash-alt"}})],1):_vm._e()],2):_vm._e()],1)}
var WidgetFormItemvue_type_template_id_c29bb9f6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue?vue&type=template&id=c29bb9f6&scoped=true&

// EXTERNAL MODULE: ./src/components/Upload/index.vue + 5 modules
var Upload = __webpack_require__("c7f0");

// EXTERNAL MODULE: ./src/components/Editor/tinymce.vue + 4 modules
var tinymce = __webpack_require__("9336");

// EXTERNAL MODULE: ./src/components/Table/CTable.vue + 3 modules
var CTable = __webpack_require__("1e61");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetFormItem.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var WidgetFormItemvue_type_script_lang_js_ = ({
  props: ['element', 'select', 'index', 'data'],
  components: {
    FmUpload: Upload["a" /* default */],
    FmEditor: tinymce["a" /* default */],
    FmTable: CTable["a" /* default */]
  },
  data: function data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleSelectWidget: function handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete: function handleWidgetDelete(index) {
      var _this = this;

      //if (!confirm('确定删除吗，一旦删除会影响流程数据完成性，请谨慎操作')) return;
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(function () {
        _this.data.list.splice(index, 1);
      });
    },
    handleWidgetClone: function handleWidgetClone(index) {
      var _this2 = this;

      var cloneData = Object(objectSpread["a" /* default */])({}, this.data.list[index], {
        options: Object(objectSpread["a" /* default */])({}, this.data.list[index].options),
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      });

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {
        cloneData = Object(objectSpread["a" /* default */])({}, cloneData, {
          options: Object(objectSpread["a" /* default */])({}, cloneData.options, {
            options: cloneData.options.options.map(function (item) {
              return Object(objectSpread["a" /* default */])({}, item);
            })
          })
        });
      }

      this.data.list.splice(index, 0, cloneData);
      this.$nextTick(function () {
        _this2.selectWidget = _this2.data.list[index + 1];
      });
    }
  },
  watch: {
    select: function select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler: function handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetFormItemvue_type_script_lang_js_ = (WidgetFormItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/WidgetFormItem.vue?vue&type=style&index=0&id=c29bb9f6&scoped=true&lang=css&
var WidgetFormItemvue_type_style_index_0_id_c29bb9f6_scoped_true_lang_css_ = __webpack_require__("037f");

// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue






/* normalize component */

var WidgetFormItem_component = Object(componentNormalizer["a" /* default */])(
  components_WidgetFormItemvue_type_script_lang_js_,
  WidgetFormItemvue_type_template_id_c29bb9f6_scoped_true_render,
  WidgetFormItemvue_type_template_id_c29bb9f6_scoped_true_staticRenderFns,
  false,
  null,
  "c29bb9f6",
  null
  
)

WidgetFormItem_component.options.__file = "WidgetFormItem.vue"
/* harmony default export */ var WidgetFormItem = (WidgetFormItem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetForm.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var WidgetFormvue_type_script_lang_js_ = ({
  components: {
    Draggable: vuedraggable_default.a,
    WidgetFormItem: WidgetFormItem
  },
  props: ['data', 'select'],
  data: function data() {
    return {
      selectWidget: this.select
    };
  },
  mounted: function mounted() {
    document.body.ondrop = function (event) {
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      if (isFirefox) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  },
  methods: {
    handleMoveEnd: function handleMoveEnd(_ref) {
      var newIndex = _ref.newIndex,
          oldIndex = _ref.oldIndex;
      console.log('index', newIndex, oldIndex);
    },
    handleSelectWidget: function handleSelectWidget(index) {
      console.log(index, '#####');
      this.selectWidget = this.data.list[index];
    },
    findmaxkeyindex: function findmaxkeyindex(list) {
      var _this = this;

      var max = 0;
      console.log(max);

      for (var k = 0; k < list.length; k++) {
        var item = list[k];

        if (!!item.keyindex) {
          if (max < item.keyindex) {
            max = item.keyindex;
          }
        }

        if (!!item.columns) {
          item.columns.forEach(function (columnson) {
            var backmax = _this.findmaxkeyindex(columnson.list);

            if (max < backmax) {
              max = backmax;
            }
          });
        }
      }

      return max;
    },
    handleWidgetAdd: function handleWidgetAdd(evt) {
      console.log('add1212', evt);
      console.log('end', evt);
      var newIndex = evt.newIndex;
      var to = evt.to;
      console.log(to);
      console.log('newIndex', newIndex);
      console.log('this.data', this.data);
      console.log(this.data.list[newIndex]);
      var keyindex = this.findmaxkeyindex(this.data.list) + 1;
      console.log('keyindex', keyindex); //为拖拽到容器的元素添加唯一 key

      var key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

      if (!this.data.list[newIndex].key) {
        this.data.list[newIndex].key = key;
      }

      if (!this.data.list[newIndex].keyindex) {
        this.data.list[newIndex].keyindex = keyindex;
      }

      if (!this.data.list[newIndex].model) {
        this.data.list[newIndex].model = this.data.list[newIndex].type + '_' + key;
      }

      if (!this.data.list[newIndex].options.remoteFunc) {
        this.data.list[newIndex].options.remoteFunc = 'func_' + key;
      }

      this.$set(this.data.list, newIndex, Object(objectSpread["a" /* default */])({}, this.data.list[newIndex])); // this.$set(this.data.list, newIndex, {
      //     ...this.data.list[newIndex],
      //     options: {
      //         ...this.data.list[newIndex].options,
      //         remoteFunc: 'func_' + key
      //     },
      //     // key,
      //     // keyindex,
      //     // // 绑定键值
      //     // model: this.data.list[newIndex].type + '_' + key,
      //     // rules: []
      // })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox') {
        this.$set(this.data.list, newIndex, Object(objectSpread["a" /* default */])({}, this.data.list[newIndex], {
          options: Object(objectSpread["a" /* default */])({}, this.data.list[newIndex].options, {
            options: this.data.list[newIndex].options.options.map(function (item) {
              return Object(objectSpread["a" /* default */])({}, item);
            })
          })
        }));
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, Object(objectSpread["a" /* default */])({}, this.data.list[newIndex], {
          columns: this.data.list[newIndex].columns.map(function (item) {
            return Object(objectSpread["a" /* default */])({}, item);
          })
        }));
      }

      this.selectWidget = this.data.list[newIndex];
    },
    handleWidgetColAdd: function handleWidgetColAdd($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex);
      var newIndex = $event.newIndex;
      var oldIndex = $event.oldIndex;
      var item = $event.item; // 防止布局元素的嵌套拖拽

      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex]);
        row.columns[colIndex].list.splice(newIndex, 1);
        return false;
      }

      console.log('from', item);
      var keyindex = this.findmaxkeyindex(this.data.list) + 1;
      var key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

      if (!row.columns[colIndex].list[newIndex].key) {
        row.columns[colIndex].list[newIndex].key = key;
      }

      if (!row.columns[colIndex].list[newIndex].keyindex) {
        row.columns[colIndex].list[newIndex].keyindex = keyindex;
      }

      if (!row.columns[colIndex].list[newIndex].model) {
        row.columns[colIndex].list[newIndex].model = row.columns[colIndex].list[newIndex].type + '_' + key;
      }

      if (!row.columns[colIndex].list[newIndex].options.remoteFunc) {
        row.columns[colIndex].list[newIndex].options.remoteFunc = 'func_' + key;
      }

      this.$set(row.columns[colIndex].list, newIndex, Object(objectSpread["a" /* default */])({}, row.columns[colIndex].list[newIndex])); // this.$set(row.columns[colIndex].list, newIndex, {
      //     ...row.columns[colIndex].list[newIndex],
      //     options: {
      //         ...row.columns[colIndex].list[newIndex].options,
      //         remoteFunc: 'func_' + key
      //     },
      //     key,
      //     keyindex,
      //     // 绑定键值
      //     model: row.columns[colIndex].list[newIndex].type + '_' + key,
      //     rules: []
      // })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox') {
        this.$set(row.columns[colIndex].list, newIndex, Object(objectSpread["a" /* default */])({}, row.columns[colIndex].list[newIndex], {
          options: Object(objectSpread["a" /* default */])({}, row.columns[colIndex].list[newIndex].options, {
            options: row.columns[colIndex].list[newIndex].options.options.map(function (item) {
              return Object(objectSpread["a" /* default */])({}, item);
            })
          })
        }));
      }

      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
    handleWidgetDelete: function handleWidgetDelete(index) {
      var _this2 = this;

      if (!confirm('确定删除吗，一旦删除会影响流程数据完成性，请谨慎操作')) return;

      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(function () {
        _this2.data.list.splice(index, 1);
      });
    }
  },
  watch: {
    select: function select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler: function handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/WidgetForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetFormvue_type_script_lang_js_ = (WidgetFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WidgetForm.vue





/* normalize component */

var WidgetForm_component = Object(componentNormalizer["a" /* default */])(
  components_WidgetFormvue_type_script_lang_js_,
  WidgetFormvue_type_template_id_5fa8a265_render,
  WidgetFormvue_type_template_id_5fa8a265_staticRenderFns,
  false,
  null,
  null,
  null
  
)

WidgetForm_component.options.__file = "WidgetForm.vue"
/* harmony default export */ var WidgetForm = (WidgetForm_component.exports);
// EXTERNAL MODULE: ./src/components/CusDialog.vue + 4 modules
var CusDialog = __webpack_require__("d28e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateForm.vue?vue&type=template&id=4d7c89ca&
var GenerateFormvue_type_template_id_4d7c89ca_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"generateForm",attrs:{"size":_vm.data.config.size,"model":_vm.models,"rules":_vm.rules,"label-position":_vm.data.config.labelPosition,"label-width":_vm.data.config.labelWidth + 'px'}},[_vm._l((_vm.data.list),function(item){return [(item.type == 'grid')?[_c('el-row',{key:item.key,attrs:{"type":"flex","gutter":item.options.gutter ? item.options.gutter : 0,"justify":item.options.justify,"align":item.options.align}},_vm._l((item.columns),function(col,colIndex){return _c('el-col',{key:colIndex,attrs:{"span":col.span}},[_vm._l((col.list),function(citem){return [(citem.type=='blank')?_c('el-form-item',{key:citem.key,attrs:{"label":citem.name,"prop":citem.model}},[_vm._t(citem.model,null,{model:_vm.models})],2):_c('genetate-form-item',{key:citem.key,attrs:{"models":_vm.models,"remote":_vm.remote,"rules":_vm.rules,"widget":citem},on:{"update:models":function($event){_vm.models=$event}}})]})],2)}),1)]:(item.type == 'blank')?[_c('el-form-item',{key:item.key,attrs:{"label":item.name,"prop":item.model}},[_vm._t(item.model,null,{model:_vm.models})],2)]:[_c('genetate-form-item',{key:item.key,attrs:{"models":_vm.models,"rules":_vm.rules,"widget":item,"remote":_vm.remote},on:{"update:models":function($event){_vm.models=$event}}})]]})],2)],1)}
var GenerateFormvue_type_template_id_4d7c89ca_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GenerateForm.vue?vue&type=template&id=4d7c89ca&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateForm.vue?vue&type=script&lang=js&
var GenerateFormvue_type_script_lang_js_ = __webpack_require__("4d7f");

// CONCATENATED MODULE: ./src/components/GenerateForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GenerateFormvue_type_script_lang_js_ = (GenerateFormvue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/GenerateForm.vue





/* normalize component */

var GenerateForm_component = Object(componentNormalizer["a" /* default */])(
  components_GenerateFormvue_type_script_lang_js_,
  GenerateFormvue_type_template_id_4d7c89ca_render,
  GenerateFormvue_type_template_id_4d7c89ca_staticRenderFns,
  false,
  null,
  null,
  null
  
)

GenerateForm_component.options.__file = "GenerateForm.vue"
/* harmony default export */ var GenerateForm = (GenerateForm_component.exports);
// EXTERNAL MODULE: ./node_modules/clipboard/dist/clipboard.js
var clipboard = __webpack_require__("b311");
var clipboard_default = /*#__PURE__*/__webpack_require__.n(clipboard);

// CONCATENATED MODULE: ./src/components/componentsConfig.js
var basicComponents = [{
  type: 'input',
  name: '单行文本',
  isoutdb: false,
  icon: 'regular/keyboard',
  options: {
    hideable: false,
    width: null,
    defaultValue: '',
    required: false,
    dataType: 'string',
    pattern: '',
    placeholder: ''
  }
}, {
  type: 'textarea',
  name: '多行文本',
  isoutdb: false,
  icon: 'regular/keyboard',
  options: {
    hideable: false,
    width: null,
    defaultValue: '',
    required: false,
    pattern: '',
    placeholder: ''
  }
}, {
  type: 'number',
  name: '计数器',
  isoutdb: false,
  icon: 'sort-numeric-up',
  options: {
    hideable: false,
    width: '',
    required: false,
    defaultValue: 0,
    min: '',
    max: '',
    step: 1,
    disabled: false,
    controlsPosition: ''
  }
}, {
  type: 'radio',
  name: '单选框组',
  isoutdb: false,
  icon: 'regular/dot-circle',
  options: {
    hideable: false,
    inline: false,
    defaultValue: '',
    showLabel: false,
    required: false,
    width: '',
    sourceType: 'options',
    //有json,有remote,有options
    options: [{
      value: '选项1',
      label: '选项1'
    }, {
      value: '选项2',
      label: '选项2'
    }, {
      value: '选项3',
      label: '选项3'
    }],
    remote: false,
    jsonOptions: [],
    remoteOptions: [],
    props: {
      value: 'v',
      label: 'n'
    },
    remoteFunc: ''
  }
}, {
  type: 'checkbox',
  name: '多选框组',
  isoutdb: false,
  icon: 'regular/check-square',
  options: {
    hideable: false,
    inline: false,
    defaultValue: [],
    showLabel: false,
    required: false,
    width: '',
    sourceType: 'options',
    //有json,有remote,有options 
    options: [{
      value: '选项1'
    }, {
      value: '选项2'
    }, {
      value: '选项3'
    }],
    jsonOptions: [],
    remote: false,
    remoteOptions: [],
    props: {
      value: 'v',
      label: 'n'
    },
    remoteFunc: ''
  }
}, {
  type: 'time',
  name: '时间选择器',
  isoutdb: false,
  icon: 'regular/clock',
  options: {
    hideable: false,
    defaultValue: '21:19:56',
    readonly: false,
    disabled: false,
    editable: true,
    clearable: true,
    placeholder: '',
    startPlaceholder: '',
    endPlaceholder: '',
    isRange: false,
    arrowControl: true,
    format: 'HH:mm:ss',
    required: false,
    width: ''
  }
}, {
  type: 'date',
  name: '日期选择器',
  isoutdb: false,
  icon: 'regular/calendar-alt',
  options: {
    hideable: false,
    defaultValue: '',
    readonly: false,
    disabled: false,
    editable: true,
    clearable: true,
    placeholder: '',
    startPlaceholder: '',
    endPlaceholder: '',
    type: 'date',
    format: 'yyyy-MM-dd',
    timestamp: false,
    required: false,
    width: ''
  }
}, {
  type: 'rate',
  name: '评分',
  isoutdb: false,
  icon: 'regular/star',
  options: {
    hideable: false,
    defaultValue: null,
    max: 5,
    disabled: false,
    allowHalf: false,
    required: false
  }
}, {
  type: 'color',
  name: '颜色选择器',
  isoutdb: false,
  icon: 'palette',
  options: {
    hideable: false,
    defaultValue: '',
    disabled: false,
    showAlpha: false,
    required: false
  }
}, {
  type: 'select',
  name: '下拉选择框',
  isoutdb: false,
  icon: 'regular/caret-square-down',
  options: {
    hideable: false,
    defaultValue: '',
    multiple: false,
    disabled: false,
    clearable: false,
    placeholder: '',
    required: false,
    showLabel: false,
    width: '',
    sourceType: 'options',
    //有json,有remote,有options
    remote: false,
    //'json'/
    options: [{
      value: '下拉框1'
    }, {
      value: '下拉框2'
    }, {
      value: '下拉框3'
    }],
    jsonOptions: [],
    remoteOptions: [],
    props: {
      value: 'v',
      label: 'n'
    },
    remoteFunc: ''
  }
}, {
  type: 'switch',
  name: '开关',
  isoutdb: false,
  icon: 'toggle-off',
  options: {
    hideable: false,
    defaultValue: false,
    required: false,
    disabled: false
  }
}, {
  type: 'slider',
  name: '滑块',
  isoutdb: false,
  icon: 'sliders-h',
  options: {
    hideable: false,
    defaultValue: 0,
    disabled: false,
    required: false,
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    range: false,
    width: ''
  }
}];
var advanceComponents = [{
  type: 'blank',
  name: '自定义',
  isoutdb: false,
  icon: 'chalkboard',
  options: {
    hideable: false,
    defaultType: 'String'
  }
}, {
  type: 'custom',
  name: '定制',
  isoutdb: false,
  icon: 'chalkboard',
  options: {
    hideable: false,
    defaultType: 'String',
    componentName: 'el-input' //组件名称

  }
}, {
  type: 'imgupload',
  name: '图片',
  isoutdb: false,
  icon: 'regular/image',
  options: {
    hideable: false,
    defaultValue: [],
    size: {
      width: 100,
      height: 100
    },
    width: '',
    tokenFunc: 'funcGetToken',
    token: '',
    domain: 'http://pfp81ptt6.bkt.clouddn.com/',
    disabled: false,
    length: 8,
    multiple: true
  }
}, {
  type: 'table',
  name: '表格',
  isoutdb: false,
  icon: 'table',
  options: {
    hideable: false,
    defaultValue: [],
    disabled: false,
    required: false,
    width: '',
    tableset: [],
    table_edit: true,
    table_add: true,
    table_delete: true,
    table_row_create: {},
    //创建的时候插入的数据
    table_row_update: {} //更新的时候插入的数据

  }
}, {
  type: 'editor',
  name: '编辑器',
  isoutdb: false,
  icon: 'edit',
  options: {
    hideable: false,
    defaultValue: '',
    width: ''
  }
}, {
  type: 'cascader',
  name: '级联选择器',
  isoutdb: false,
  icon: 'sitemap',
  options: {
    hideable: false,
    defaultValue: [],
    width: '',
    placeholder: '',
    disabled: false,
    clearable: false,
    sourceType: 'remote',
    //有json,有remote,有options
    remote: true,
    remoteOptions: [],
    jsonOptions: [],
    props: {
      value: 'value',
      label: 'label',
      children: 'children'
    },
    remoteFunc: ''
  }
}];
var layoutComponents = [{
  type: 'grid',
  name: '栅格布局',
  icon: 'th',
  columns: [{
    span: 12,
    list: []
  }, {
    span: 12,
    list: []
  }],
  options: {
    gutter: 0,
    justify: 'start',
    align: 'top'
  }
}];
// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("4260");

// EXTERNAL MODULE: ./src/util/request.js
var request = __webpack_require__("4020");

// CONCATENATED MODULE: ./src/components/generateCode.js



function findRemoteFunc(list, funcList, tokenFuncList, blankList) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].type == 'grid') {
      list[i].columns.forEach(function (item) {
        findRemoteFunc(item.list, funcList, tokenFuncList, blankList);
      });
    } else {
      if (list[i].type == 'blank') {
        if (list[i].model) {
          blankList.push({
            name: list[i].model,
            label: list[i].name
          });
        }
      } else if (list[i].type == 'imgupload') {
        if (list[i].options.tokenFunc) {
          tokenFuncList.push({
            func: list[i].options.tokenFunc,
            label: list[i].name,
            model: list[i].model
          });
        }
      } else {
        if (list[i].options.remote && list[i].options.remoteFunc) {
          funcList.push({
            func: list[i].options.remoteFunc,
            label: list[i].name,
            model: list[i].model
          });
        }
      }
    }
  }
}

/* harmony default export */ var generateCode = (function (data) {
  var funcList = [];
  var tokenFuncList = [];
  var blankList = [];
  findRemoteFunc(JSON.parse(data).list, funcList, tokenFuncList, blankList);
  var funcTemplate = '';
  var blankTemplate = '';

  for (var i = 0; i < funcList.length; i++) {
    funcTemplate += "\n            ".concat(funcList[i].func, " (resolve) {\n              // ").concat(funcList[i].label, " ").concat(funcList[i].model, "\n              // \u83B7\u53D6\u5230\u8FDC\u7AEF\u6570\u636E\u540E\u6267\u884C\u56DE\u8C03\u51FD\u6570\n              // resolve(data)\n            },\n    ");
  }

  for (var _i = 0; _i < tokenFuncList.length; _i++) {
    funcTemplate += "\n            ".concat(tokenFuncList[_i].func, " (resolve) {\n              // ").concat(tokenFuncList[_i].label, " ").concat(tokenFuncList[_i].model, "\n              // \u83B7\u53D6\u5230token\u6570\u636E\u540E\u6267\u884C\u56DE\u8C03\u51FD\u6570\n              // resolve(token)\n            },\n    ");
  }

  for (var _i2 = 0; _i2 < blankList.length; _i2++) {
    blankTemplate += "\n        <template slot=\"".concat(blankList[_i2].name, "\" slot-scope=\"scope\">\n          <!-- ").concat(blankList[_i2].label, " -->\n          <!-- \u901A\u8FC7 v-model=\"scope.model.").concat(blankList[_i2].name, "\" \u7ED1\u5B9A\u6570\u636E -->\n        </template>\n    ");
  }

  return "<!DOCTYPE html>\n  <html>\n  <head>\n    <meta charset=\"UTF-8\">\n    <link rel=\"stylesheet\" href=\"https://unpkg.com/element-ui/lib/theme-chalk/index.css\">\n    <link rel=\"stylesheet\" href=\"https://unpkg.com/form-making/dist/FormMaking.css\">\n  </head>\n  <body>\n    <div id=\"app\">\n      <fm-generate-form :data=\"jsonData\" :remote=\"remoteFuncs\" :value=\"editData\" ref=\"generateForm\">\n        ".concat(blankTemplate, "\n      </fm-generate-form>\n      <el-button type=\"primary\" @click=\"handleSubmit\">\u63D0\u4EA4</el-button>\n    </div>\n    <script src=\"https://unpkg.com/vue/dist/vue.js\"></script>\n    <script src=\"https://unpkg.com/element-ui/lib/index.js\"></script>\n    <script src=\"https://unpkg.com/form-making/dist/FormMaking.umd.js\"></script>\n    <script>\n      new Vue({\n        el: '#app',\n        data: {\n          jsonData: ").concat(data, ",\n          editData: {},\n          remoteFuncs: {\n            ").concat(funcTemplate, "\n          }\n        },\n        methods: {\n          handleSubmit () {\n            this.$refs.generateForm.getData().then(data => {\n              // \u6570\u636E\u6821\u9A8C\u6210\u529F\n              // data \u4E3A\u83B7\u53D6\u7684\u8868\u5355\u6570\u636E\n            }).catch(e => {\n              // \u6570\u636E\u6821\u9A8C\u5931\u8D25\n            })\n          }\n        }\n      })\n    </script>\n  </body>\n  </html>");
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Container.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





 // import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.min.css'






/* harmony default export */ var Containervue_type_script_lang_js_ = ({
  name: 'fm-making-form',
  // model: {    // 使用model， 这儿2个属性，prop属性说，我要将modelvalue作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
  //   prop: 'value',
  //   event: 'cc'
  // },
  props: {
    widgetForm: {
      type: Object,
      default: function _default() {
        return {
          list: [],
          config: {
            labelWidth: 100,
            labelPosition: 'top'
          }
        };
      }
    }
  },
  components: {
    Draggable: vuedraggable_default.a,
    WidgetConfig: WidgetConfig,
    FormConfig: FormConfig,
    WidgetForm: WidgetForm,
    CusDialog: CusDialog["a" /* default */],
    GenerateForm: GenerateForm
  },
  data: function data() {
    return {
      basicComponents: basicComponents,
      layoutComponents: layoutComponents,
      advanceComponents: advanceComponents,
      //widgetForm:this.value,
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      remoteFuncs: {
        func_test: function func_test(resolve) {
          setTimeout(function () {
            var options = [{
              id: '1',
              name: '1111'
            }, {
              id: '2',
              name: '2222'
            }, {
              id: '3',
              name: '3333'
            }];
            resolve(options);
          }, 2000);
        },
        funcGetToken: function funcGetToken(resolve) {
          request["a" /* default */].get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(function (res) {
            resolve(res.uptoken);
          });
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: ''
    };
  },
  mounted: function mounted() {
    // loadCss('https://unpkg.com/jsoneditor/dist/jsoneditor.min.css')
    // loadJs('https://unpkg.com/jsoneditor/dist/jsoneditor.min.js')
    Object(util["b" /* loadJs */])('https://cdn.staticfile.org/ace/1.4.3/ace.js');
    console.log('this.widgetFormSelect');

    if (!this.widgetFormSelect) {
      this.widgetFormSelect = this.widgetForm.list[0];
    }
  },
  methods: {
    handleClone: function handleClone(obj) {
      //console.log('clone',obj);
      return JSON.parse(stringify_default()(obj));
    },
    handleGoGithub: function handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making';
    },
    handleConfigSelect: function handleConfigSelect(value) {
      this.configTab = value;
    },
    handleMoveEnd: function handleMoveEnd(evt) {
      console.log('end', evt);
    },
    handleMoveStart: function handleMoveStart(_ref) {
      var oldIndex = _ref.oldIndex;
      console.log('start', oldIndex, this.basicComponents);
    },
    handleMove: function handleMove() {
      return true;
    },
    handlePreview: function handlePreview() {
      this.previewVisible = true;
    },
    handleTest: function handleTest() {
      var _this = this;

      this.$refs.generateForm.getData().then(function (data) {
        console.log(data);

        _this.$alert(data, '').catch(function (e) {});

        _this.$refs.widgetPreview.end();
      }).catch(function (e) {
        // console.log(e);
        _this.$message.error(e);

        _this.$refs.widgetPreview.end();
      });
    },
    handleGenerateJson: function handleGenerateJson() {
      this.jsonVisible = true;
      this.jsonTemplate = this.widgetForm;
      this.$nextTick(function () {
        var editor = ace.edit('jsoneditor');
        editor.session.setMode("ace/mode/json");
        var btnCopy = new clipboard_default.a('#copybtn');
      });
    },
    handleGenerateCode: function handleGenerateCode() {
      this.codeVisible = true;
      this.htmlTemplate = generateCode(stringify_default()(this.widgetForm));
      this.$nextTick(function () {
        var editor = ace.edit('codeeditor');
        editor.session.setMode("ace/mode/html");
      });
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function handler(val) {
        //console.log(this.$refs.widgetForm)
        //this.$emit('cc', this.widgetForm)
        if (!this.widgetFormSelect) {
          this.widgetFormSelect = this.widgetForm.list[0];
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Container.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Containervue_type_script_lang_js_ = (Containervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Container.vue?vue&type=style&index=0&lang=scss&
var Containervue_type_style_index_0_lang_scss_ = __webpack_require__("314e");

// CONCATENATED MODULE: ./src/components/Container.vue






/* normalize component */

var Container_component = Object(componentNormalizer["a" /* default */])(
  components_Containervue_type_script_lang_js_,
  Containervue_type_template_id_71bd83d1_render,
  Containervue_type_template_id_71bd83d1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

Container_component.options.__file = "Container.vue"
/* harmony default export */ var Container = (Container_component.exports);
// CONCATENATED MODULE: ./src/index.js




























 // import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI, { size: 'small' })

external_Vue_default.a.component('icon', Icon);

Container.install = function (Vue) {
  Vue.component(Container.name, Container);
};

GenerateForm.install = function (Vue) {
  Vue.component(GenerateForm.name, GenerateForm);
};

var components = [Container, GenerateForm];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


/* harmony default export */ var src = ({
  install: install,
  MakingForm: Container,
  GenerateForm: GenerateForm
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport install */__webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* concated harmony reexport MakingForm */__webpack_require__.d(__webpack_exports__, "MakingForm", function() { return Container; });
/* concated harmony reexport GenerateForm */__webpack_require__.d(__webpack_exports__, "GenerateForm", function() { return GenerateForm; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fd61":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fda1":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("1b55");


/***/ }),

/***/ "fda6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("f3e0");
module.exports = __webpack_require__("a7d3").Object.keys;


/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "ff0c":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("43c8");
var toObject = __webpack_require__("0185");
var IE_PROTO = __webpack_require__("5d8f")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "fff8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ccd236a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Table/CSet.vue?vue&type=template&id=49623020&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"font-size":"13px"}},[_c('div',{staticStyle:{"font-weight":"bolder"}},[_vm._v(" 已创建表格列")]),(_vm.sync_value.length==0)?_c('div',[_vm._v("\n        无\n    ")]):_vm._e(),_c('draggable',{staticStyle:{"padding":"5px"},model:{value:(_vm.sync_value),callback:function ($$v) {_vm.sync_value=$$v},expression:"sync_value"}},_vm._l((_vm.sync_value),function(item,index){return _c('div',{key:index,staticStyle:{"border-bottom":"1px dashed #d2d2d2"}},[_vm._v("\n            "+_vm._s(item.name)+"\n        ")])}),0),_c('div',[_c('el-button',{attrs:{"size":"mini","type":"text"},on:{"click":_vm.edit}},[_vm._v("编辑")])],1),_c('el-dialog',{attrs:{"title":"编辑表格控件","visible":_vm.modalStatus,"width":"75%"},on:{"update:visible":function($event){_vm.modalStatus=$event}}},[_c('cus-dialog',{ref:"jsonPreview",attrs:{"visible":_vm.jsonVisible,"width":"800px","form":""},on:{"on-close":function($event){_vm.jsonVisible = false}}},[_c('div',{staticStyle:{"height":"400px","width":"100%"},attrs:{"id":"jsoneditor"}},[_vm._v(_vm._s(_vm.editingList))]),_c('template',{slot:"action"},[_c('el-button',{attrs:{"id":"copybtn","data-clipboard-target":".ace_text-input"}},[_vm._v("双击复制")])],1)],2),_c('cus-dialog',{ref:"jsonClip",attrs:{"visible":_vm.jsonclipVisible,"width":"800px","form":""},on:{"on-close":function($event){_vm.jsonclipVisible = false}}},[_c('div',[_c('el-input',{attrs:{"rows":"10","placeholder":"请输入表格配置数据","type":"textarea"},model:{value:(_vm.jsonclipText),callback:function ($$v) {_vm.jsonclipText=$$v},expression:"jsonclipText"}})],1),_c('template',{slot:"action"},[_c('el-button',{on:{"click":_vm.surecreat}},[_vm._v("确定生成表格")])],1)],2),_c('el-dialog',{attrs:{"append-to-body":"","title":"编辑公式","visible":_vm.formulaModalStatus,"width":"550px"},on:{"update:visible":function($event){_vm.formulaModalStatus=$event}}},[_c('el-card',[_c('el-input',{ref:"nextfunif",attrs:{"type":"textarea","rows":2,"placeholder":"请输入公式或函数"},model:{value:(_vm.formulaForm.formula),callback:function ($$v) {_vm.$set(_vm.formulaForm, "formula", $$v)},expression:"formulaForm.formula"}}),_c('el-tabs',{model:{value:(_vm.chosetype),callback:function ($$v) {_vm.chosetype=$$v},expression:"chosetype"}},[_c('el-tab-pane',{attrs:{"label":"可选列","name":"col"}},_vm._l((_vm.editingList),function(item,index){return _c('span',{key:index},[(!!item.name)?_c('el-button',{staticStyle:{"margin-bottom":"5px"},attrs:{"size":"small"},on:{"click":function($event){_vm.addAt(("@[" + (item.name) + "]"))}}},[_vm._v(_vm._s(item.name))]):_vm._e()],1)}),0),_c('el-tab-pane',{attrs:{"label":"可选符号","name":"operator"}},_vm._l((_vm.operatorList),function(item,index){return _c('el-button',{key:index,staticStyle:{"margin-bottom":"5px"},attrs:{"size":"small"},on:{"click":function($event){_vm.addAt(("" + item))}}},[_vm._v(_vm._s(item))])}),1),_c('el-tab-pane',{attrs:{"label":"远程函数","name":"fun"}},_vm._l((_vm.funGroup),function(item,index){return _c('div',{key:index,staticStyle:{"margin-bottom":"10px","border-bottom":"1px dashed #e6e6e6"}},[_c('div',{staticStyle:{"font-weight":"border","margin-bottom":"5px"}},[_vm._v(_vm._s(item.name))]),_c('div',_vm._l((item.funlist),function(item2,index2){return _c('el-tooltip',{key:index2,staticClass:"item",attrs:{"effect":"light","content":item2.placeholder,"placement":"top-start"}},[_c('el-button',{staticStyle:{"margin-bottom":"5px"},attrs:{"size":"small"},on:{"click":function($event){_vm.addAt(("#[" + (item.prefix) + (item2.funname) + "]()"))}}},[_vm._v(_vm._s(item2.funname))])],1)}),1)])}),0),_c('el-tab-pane',{attrs:{"label":"可选参数","name":"field"}},_vm._l((_vm.funGroup),function(item,index){return _c('div',{key:index,staticStyle:{"margin-bottom":"10px","border-bottom":"1px dashed #e6e6e6"}},[_c('div',{staticStyle:{"font-weight":"border","margin-bottom":"5px"}},[_vm._v(_vm._s(item.name))]),_c('div',_vm._l((item.fields),function(item2,index2){return _c('el-button',{key:index2,staticStyle:{"margin-bottom":"5px"},attrs:{"size":"small"},on:{"click":function($event){_vm.addAt(("" + (item2.name)))}}},[_vm._v(_vm._s(item2.name))])}),1)])}),0)],1)],1),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.formulaModalStatus = false}}},[_vm._v("取 消")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.saveFormula}},[_vm._v("确 定")])],1)],1),_c('div',{staticStyle:{"text-align":"right","margin-bottom":"10px"}},[_c('el-button',{attrs:{"size":"mini"},on:{"click":_vm.handleCopyJson}},[_c('icon',{staticClass:"icon",attrs:{"name":"clone"}}),_vm._v("复制表单\n            ")],1),_c('el-button',{attrs:{"size":"mini"},on:{"click":_vm.handleClipJson}},[_c('icon',{staticClass:"icon",attrs:{"name":"clipboard"}}),_vm._v("粘贴表单\n            ")],1)],1),_c('div',{staticStyle:{"overflow":"auto"}},[_c('div',{staticStyle:{"width":"1400px"}},[_c('el-row',{staticStyle:{"border-bottom":"1px solid #d0d0d0","padding-buttom":"8px"},attrs:{"gutter":5}},[_c('el-col',{staticStyle:{"font-size":"12px"},attrs:{"span":2}},[_vm._v("序号/识别码")]),_c('el-col',{attrs:{"span":3}},[_vm._v("列表名称")]),_c('el-col',{attrs:{"span":3}},[_vm._v("提示")]),_c('el-col',{attrs:{"span":1}},[_vm._v("列宽度")]),_c('el-col',{attrs:{"span":2}},[_vm._v("类型")]),_c('el-col',{attrs:{"span":2}},[_vm._v("数据源")]),_c('el-col',{attrs:{"span":2}},[_vm._v("汇总")]),_c('el-col',{attrs:{"span":3}},[_vm._v("计算公式")]),_c('el-col',{attrs:{"span":2}},[_c('el-checkbox',{on:{"change":function (value){ return _vm.whencheckboxChange(value,'canedit'); }},model:{value:(_vm.allcanedit),callback:function ($$v) {_vm.allcanedit=$$v},expression:"allcanedit"}},[_vm._v("可编辑")])],1),_c('el-col',{attrs:{"span":1}},[_c('span',{staticStyle:{"font-size":"12px"}},[_vm._v("是否必填")])]),_c('el-col',{attrs:{"span":1}},[_c('el-checkbox',{on:{"change":function (value){ return _vm.whencheckboxChange(value,'readonly'); }},model:{value:(_vm.allreadonly),callback:function ($$v) {_vm.allreadonly=$$v},expression:"allreadonly"}},[_vm._v("只读")])],1),_c('el-col',{attrs:{"span":1}},[_c('el-checkbox',{on:{"change":function (value){ return _vm.whencheckboxChange(value,'hidden'); }},model:{value:(_vm.allhidden),callback:function ($$v) {_vm.allhidden=$$v},expression:"allhidden"}},[_vm._v("隐藏")])],1),_c('el-col',{attrs:{"span":1}})],1),(_vm.editingList.length==0)?_c('el-row',[_c('el-col',{staticStyle:{"text-align":"center"},attrs:{"span":24}},[_vm._v("未创建列表\n                "),_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.addnowline}},[_vm._v("添加新的列")])],1)],1):_vm._e(),_c('draggable',{model:{value:(_vm.editingList),callback:function ($$v) {_vm.editingList=$$v},expression:"editingList"}},_vm._l((_vm.editingList),function(item,index){return _c('el-row',{key:index,staticStyle:{"margin-top":"5px"},attrs:{"gutter":5}},[_c('el-col',{staticStyle:{"line-height":"32px"},attrs:{"span":2}},[_vm._v("\n                    "+_vm._s(index+1)+"/ "),_c('span',{staticStyle:{"color":"red","font-size":"12px"}},[_vm._v(_vm._s(item.code))])]),_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入列表名称"},model:{value:(item.name),callback:function ($$v) {_vm.$set(item, "name", $$v)},expression:"item.name"}})],1),_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入提示文本"},model:{value:(item.placeholder),callback:function ($$v) {_vm.$set(item, "placeholder", $$v)},expression:"item.placeholder"}})],1),_c('el-col',{attrs:{"span":1}},[_c('el-input',{attrs:{"placeholder":"列宽度"},model:{value:(item.width),callback:function ($$v) {_vm.$set(item, "width", $$v)},expression:"item.width"}})],1),_c('el-col',{attrs:{"span":2}},[_c('el-select',{attrs:{"placeholder":"请选择输入类型"},model:{value:(item.editer),callback:function ($$v) {_vm.$set(item, "editer", $$v)},expression:"item.editer"}},_vm._l((_vm.editerList),function(editer){return _c('el-option',{key:editer.value,attrs:{"label":editer.label,"value":editer.value}})}),1)],1),_c('el-col',{attrs:{"span":2}},[_c('el-input',{attrs:{"placeholder":"请输入数据源"},model:{value:(item.datasource),callback:function ($$v) {_vm.$set(item, "datasource", $$v)},expression:"item.datasource"}})],1),_c('el-col',{attrs:{"span":2}},[_c('el-select',{attrs:{"placeholder":"汇总方式"},model:{value:(item.aggregate),callback:function ($$v) {_vm.$set(item, "aggregate", $$v)},expression:"item.aggregate"}},_vm._l((_vm.aggregateList),function(editer){return _c('el-option',{key:editer.value,attrs:{"label":editer.label,"value":editer.value}})}),1)],1),_c('el-col',{staticStyle:{"font-size":"12px"},attrs:{"span":3}},[(!!item.formula)?_c('span',{staticStyle:{"overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap","display":"inline-block","width":"130px"},attrs:{"title":item.formula},on:{"click":function($event){_vm.editFormula(item)}}},[_vm._v(_vm._s(item.formula))]):_c('span',{attrs:{"title":"点击编辑"}},[_vm._v("无")]),_c('el-button',{staticStyle:{"position":"absolute"},attrs:{"type":"text"},on:{"click":function($event){_vm.editFormula(item)}}},[_vm._v("编辑")])],1),_c('el-col',{attrs:{"span":2}},[_c('el-radio',{attrs:{"label":"canedit"},on:{"change":_vm.whenRadioChange},model:{value:(item.limittype),callback:function ($$v) {_vm.$set(item, "limittype", $$v)},expression:"item.limittype"}},[_vm._v(_vm._s(''))])],1),_c('el-col',{attrs:{"span":1}},[(item.limittype!='canedit')?_c('div',[_c('span',{staticStyle:{"color":"white"}},[_vm._v("p")])]):_c('el-checkbox',{attrs:{"title":"显示"},model:{value:(item.required),callback:function ($$v) {_vm.$set(item, "required", $$v)},expression:"item.required"}})],1),_c('el-col',{attrs:{"span":1}},[_c('el-radio',{attrs:{"label":"readonly"},on:{"change":_vm.whenRadioChange},model:{value:(item.limittype),callback:function ($$v) {_vm.$set(item, "limittype", $$v)},expression:"item.limittype"}},[_vm._v(_vm._s(''))])],1),_c('el-col',{attrs:{"span":1}},[_c('el-radio',{attrs:{"label":"hidden"},on:{"change":_vm.whenRadioChange},model:{value:(item.limittype),callback:function ($$v) {_vm.$set(item, "limittype", $$v)},expression:"item.limittype"}},[_vm._v(_vm._s(''))])],1),_c('el-col',{staticStyle:{"line-height":"32px"},attrs:{"span":1}},[_c('i',{staticClass:"el-icon-delete",staticStyle:{"cursor":"pointer"},on:{"click":function($event){_vm.removeList(index)}}})])],1)}),1)],1)]),_c('el-button',{staticStyle:{"margin-top":"10px"},attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addnowline}},[_vm._v("添加新的列")]),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.modalStatus = false}}},[_vm._v("取 消")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.save}},[_vm._v("确 定")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Table/CSet.vue?vue&type=template&id=49623020&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__("f499");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.js
var vuedraggable = __webpack_require__("1516");
var vuedraggable_default = /*#__PURE__*/__webpack_require__.n(vuedraggable);

// EXTERNAL MODULE: ./src/util/request.js
var request = __webpack_require__("4020");

// EXTERNAL MODULE: ./node_modules/vue-propsync/index.js
var vue_propsync = __webpack_require__("e76f");
var vue_propsync_default = /*#__PURE__*/__webpack_require__.n(vue_propsync);

// EXTERNAL MODULE: ./src/components/CusDialog.vue + 4 modules
var CusDialog = __webpack_require__("d28e");

// EXTERNAL MODULE: ./node_modules/assert/assert.js
var assert = __webpack_require__("f654");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Table/CSet.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var CSetvue_type_script_lang_js_ = ({
  name: 'MyTableSet',
  components: {
    Draggable: vuedraggable_default.a,
    CusDialog: CusDialog["a" /* default */]
  },
  mixins: [vue_propsync_default.a],
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      },
      isSync: true
    }
  },
  data: function data() {
    return {
      allcanedit: false,
      allreadonly: false,
      allhidden: false,
      jsonVisible: false,
      jsonclipVisible: false,
      jsonclipText: '',
      funlist_api: window.funlist_api,
      funGroup: [],
      editingList: [],
      chosetype: 'col',
      formulaModalStatus: false,
      operatorList: ['/', '*', '-', '+', '(', ')'],
      modalStatus: false,
      aggregateList: [{
        value: null,
        label: '无'
      }, {
        value: 'sum',
        label: '汇总（SUM）'
      }, {
        value: 'average',
        label: '平均（Average）'
      }],
      editerList: [{
        value: 'text',
        label: '单行输入框'
      }, {
        value: 'textarea',
        label: '多行输入框'
      }, {
        value: 'select',
        label: '下拉菜单[单选]'
      }, {
        value: 'selectMultiple',
        label: '下拉菜单[多选]'
      }, {
        value: 'radio',
        label: '单选框'
      }, {
        value: 'checkbox',
        label: '复选框'
      }, {
        value: 'date',
        label: '日期'
      }, {
        value: 'datetime',
        label: '日期+时间'
      }],
      formulaForm: {
        nowrow: null,
        //当前的列
        formula: null
      }
    };
  },
  methods: {
    whenRadioChange: function whenRadioChange() {
      var caneditnum = 0;
      var readonlynum = 0;
      var hiddennum = 0;
      this.editingList.forEach(function (ele) {
        switch (ele.limittype) {
          case 'canedit':
            caneditnum++;
            break;

          case 'readonly':
            readonlynum++;
            break;

          case 'hidden':
            hiddennum++;
            break;

          default:
            break;
        }
      });

      if (this.editingList.length == caneditnum) {
        this.allcanedit = true;
      } else {
        this.allcanedit = false;
      }

      if (this.editingList.length == readonlynum) {
        this.allreadonly = true;
      } else {
        this.allreadonly = false;
      }

      if (this.editingList.length == hiddennum) {
        this.allhidden = true;
      } else {
        this.allhidden = false;
      }
    },
    whencheckboxChange: function whencheckboxChange(value, type) {
      var _this = this;

      this.editingList.forEach(function (ele) {
        if (value) {
          ele.limittype = type;
        } else {
          ele.limittype = null;
        }
      });
      setTimeout(function () {
        _this.whenRadioChange();
      }, 100); // switch (type) {
      //     case 'canedit':
      //         this.editlist.forEach(ele=>{
      //             ele.type='canedit'
      //         })
      //         break;
      //     default:
      //         break;
      // }
    },
    surecreat: function surecreat() {
      try {
        this.editingList = JSON.parse(this.jsonclipText); //console.log(this.sync_value);
      } catch (e) {
        this.$message.error('输入的数据无法格式化，请检查后重新试试');
        return;
      }

      this.jsonclipVisible = false;
    },
    handleClipJson: function handleClipJson() {
      this.jsonclipVisible = true;
      this.jsonclipText = '';
    },
    handleCopyJson: function handleCopyJson() {
      this.jsonVisible = true; //this.jsonTemplate = this.sync_value

      this.$nextTick(function () {
        var editor = ace.edit('jsoneditor');
        editor.session.setMode("ace/mode/json");
        var btnCopy = new Clipboard('#copybtn');
      });
    },
    addAt: function addAt(p) {
      var textarea = this.$refs.nextfunif.$el.getElementsByTagName('textarea')[0]; // console.log(textarea);
      // window.textarea=textarea;

      textarea.focus();
      var startPos = textarea.selectionStart;
      var endPos = textarea.selectionEnd;
      var cursorPos = startPos;
      var tmpStr = textarea.value; // textarea.value = tmpStr.substring(0, startPos) + p + tmpStr.substring(endPos, tmpStr.length)

      this.formulaForm.formula = tmpStr.substring(0, startPos) + p + tmpStr.substring(endPos, tmpStr.length);
      cursorPos += p.length;
      setTimeout(function () {
        textarea.selectionStart = textarea.selectionEnd = cursorPos;
      }, 300); // this.updatePos(this.nowNextFun.if)
    },
    removeList: function removeList(index) {
      this.editingList.splice(index, 1);
      this.whenRadioChange();
    },
    editFormula: function editFormula(row) {
      this.formulaModalStatus = true;
      this.formulaForm = {
        nowrow: row,
        formula: row.formula
      };
    },
    saveFormula: function saveFormula() {
      this.formulaModalStatus = false;
      this.formulaForm.nowrow.formula = this.formulaForm.formula;
    },
    randomString: function randomString() {
      var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      var ALLCHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var maxPos = ALLCHAR.length;
      var pwd = '';

      for (var i = 0; i < len; i++) {
        pwd += ALLCHAR.charAt(Math.floor(Math.random() * maxPos));
      }

      return pwd;
    },
    addnowline: function addnowline() {
      this.editingList.push({
        code: this.randomString(5),
        name: null,
        placeholder: null,
        width: null,
        editer: 'text',
        datasource: null,
        aggregate: null,
        formula: null,
        limittype: null,
        required: false
      });
      this.whenRadioChange();
    },
    edit: function edit() {
      this.editingList = this.copyobject(this.sync_value);
      console.log('this.editingList=this.copyobject(this.list);', this.editingList);
      this.modalStatus = true;
    },
    save: function save() {
      this.modalStatus = false; // this.$emit('cc',)

      this.sync_value = this.copyobject(this.editingList);
    },
    copyobject: function copyobject(obj) {
      return JSON.parse(stringify_default()(obj));
    },
    handlePreview: function handlePreview(file) {
      this.$message.info('查看文件');
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    //'http://localhost:8099/api/oa/tablefun/funlist'
    //调用外部的http
    Object(request["a" /* default */])({
      url: window.funlist_api,
      data: {},
      method: 'post'
    }).then(function (_ref) {
      var req = _ref.data;
      _this2.funGroup = req;
      console.log(req);
    }).catch(function (err) {
      console.log(err);
    });
  }
});
// CONCATENATED MODULE: ./src/components/Table/CSet.vue?vue&type=script&lang=js&
 /* harmony default export */ var Table_CSetvue_type_script_lang_js_ = (CSetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Table/CSet.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Table_CSetvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CSet.vue"
/* harmony default export */ var CSet = __webpack_exports__["a"] = (component.exports);

/***/ })

/******/ });
