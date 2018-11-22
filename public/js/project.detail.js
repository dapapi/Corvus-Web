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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/***/ (function(module, exports) {

//简化的日志输出方法
var dd = function dd(message) {
    console.log(message);
};
var redirect = function redirect(url) {
    window.location.href = url;
};

window.dd = dd;
module.exports = redirect;

/***/ }),

/***/ "./resources/assets/js/config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__("./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap__ = __webpack_require__("./resources/assets/js/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__bootstrap__);



var config = {
    tokenString: 'CORVUS-ACCESS-TOKEN',
    apiUrl: 'https://sandbox-api-crm.papitube.com',
    imgUrl: 'https://res-crm.papitube.com/',

    getHeaders: function getHeaders() {
        var headers = {
            'Accept': 'application/vnd.Corvus.v1+json',
            'Access-Control-Expose-Headers': 'Location',
            'Access-Control-Allow-Headers': 'Authorization'
        };
        var token = this.getAccessToken();
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        return headers;
    },
    getAccessToken: function getAccessToken() {
        return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(this.tokenString);
    },
    setAccessToken: function setAccessToken(token) {
        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(this.tokenString, token);
    },
    deleteAccessToken: function deleteAccessToken() {
        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(this.tokenString);
    },

    clientId: '2',
    clientSecret: 'B7l68XEz38cHE8VqTZPzyYnSBgo17eaCRyuLtpul',
    getStatusCode: function getStatusCode() {
        var that = this;
        return {
            401: function _() {
                __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(that.tokenString);
                __WEBPACK_IMPORTED_MODULE_1__bootstrap___default()('/login');
            },
            403: function _() {
                __WEBPACK_IMPORTED_MODULE_1__bootstrap___default()('/errors/403');
            },
            404: function _() {
                __WEBPACK_IMPORTED_MODULE_1__bootstrap___default()('/errors/404');
            },
            500: function _() {
                __WEBPACK_IMPORTED_MODULE_1__bootstrap___default()('/errors/500');
            },
            503: function _() {
                __WEBPACK_IMPORTED_MODULE_1__bootstrap___default()('/errors/503');
            }
        };
    },

    companyType: __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get('companyType'),

    trailOrigin: [{
        name: '商务邮箱',
        value: 1
    }, {
        name: '工作室邮箱',
        value: 2
    }, {
        name: '微信公众号',
        value: 3
    }, {
        name: '员工',
        value: 4
    }, {
        name: '公司高管',
        value: 5
    }, {
        name: '纯中介',
        value: 6
    }, {
        name: '香港中介',
        value: 7
    }, {
        name: '台湾中介',
        value: 8
    }, {
        name: '复购直客',
        value: 9
    }, {
        name: '媒体介绍',
        value: 10
    }, {
        name: '公关or广告公司',
        value: 11
    }],
    trailTypeArr: [{
        name: '影视线索',
        value: 1
    }, {
        name: '综艺线索',
        value: 2
    }, {
        name: '商务线索',
        value: 3
    }, {
        name: 'papi线索',
        value: 4
    }],
    customizeInfo: [{
        id: 0,
        name: '选择条件',
        value: 0,
        child: [{
            name: '选择对应关系',
            value: 0
        }],
        type: 'disable'
    }, {
        id: 1,
        name: '负责人',
        value: 1,
        child: [{
            name: '等于',
            value: 1
        }],
        type: 'person'
    }, {
        id: 2,
        name: '下次跟进时间',
        value: 2,
        child: [{
            name: '等于',
            value: 1
        }, {
            name: '大于',
            value: 2
        }],
        type: 'date'
    }, {
        id: 3,
        name: '未跟进天数',
        value: 3,
        child: [{
            name: '等于',
            value: 1
        }, {
            name: '大于',
            value: 2
        }, {
            name: '大于等于',
            value: 2
        }],
        type: 'number'
    }],

    taskTypeArr: [{
        name: '跑组',
        value: 1
    }, {
        name: '试戏',
        value: 2
    }, {
        name: '类型1',
        value: 3
    }],

    taskLevelArr: [{
        name: '高',
        value: 1
    }, {
        name: '中',
        value: 2
    }, {
        name: '低',
        value: 3
    }],

    taskStatusArr: [{
        name: '进行中',
        value: 1
    }, {
        name: '已完成',
        value: 2
    }, {
        name: '已停止',
        value: 3
    }],

    clientLevelArr: [{
        name: '直客',
        value: 1
    }, {
        name: '代理公司',
        value: 2
    }],
    projectTypeArr: [{
        name: '影视项目',
        value: 1
    }, {
        name: '综艺项目',
        value: 2
    }, {
        name: '商务项目',
        value: 3
    }, {
        name: 'papi项目',
        value: 4
    }, {
        name: '基础项目',
        value: 5
    }],
    clientScaleArr: [{
        name: '上市公司',
        value: 1
    }, {
        name: '500强',
        value: 2
    }],
    clientTypeArr: [{
        name: '影视客户',
        value: 1
    }, {
        name: '综艺客户',
        value: 2
    }, {
        name: '商务客户',
        value: 3
    }, {
        name: 'papi客户',
        value: 4
    }],
    // 员工状态
    staffStatus: [{
        value: 1,
        name: '在职'
    }, {
        value: 2,
        name: '离职'
    }, {
        value: 3,
        name: '全部'
    }],
    // 年月
    dateArr: [{
        value: 1,
        name: '10月（10.01-10.31）'
    }, {
        value: 2,
        name: '11月（11.01-11.30）'
    }, {
        value: 3,
        name: '12月（12.01-12.31）'
    }],
    // 员工类型
    stuffType: [{
        value: 1,
        name: '正式员工'
    }, {
        value: 2,
        name: '实习生'
    }, {
        value: 3,
        name: '管培生'
    }],
    // 性别
    sexArr: [{
        name: '男',
        value: 1
    }, {
        value: 2,
        name: '女'
    }],
    // 婚姻状况
    maritalStatusArr: [{
        name: '未婚',
        value: 1
    }, {
        name: '已婚',
        value: 2
    }],
    nationalityArr: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"], // 民族
    artistStatusArr: [{
        name: '已签约',
        value: 1
    }, {
        name: '经理人沟通中',
        value: 2
    }, {
        name: '兼职星探沟通中',
        value: 3
    }, {
        name: '待定',
        value: 4
    }, {
        name: '淘汰',
        value: 5
    }, {
        name: '合同中',
        value: 6
    }, {
        name: '联系但无回复',
        value: 7
    }],

    priorityArr: [{
        name: '高',
        value: 1
    }, {
        name: '中',
        value: 2
    }, {
        name: '低',
        value: 3
    }],

    levelArr: [{
        name: 'S',
        value: 'S'
    }, {
        name: 'A',
        value: 'A'
    }, {
        name: 'B',
        value: 'B'
    }, {
        name: 'C',
        value: 'C'
    }],

    lockArr: [{
        name: '否',
        value: 0
    }, {
        name: '是',
        value: 1
    }],
    cooperationType: [{
        name: '代言',
        value: 1
    }, {
        name: '合作',
        value: 2
    }, {
        name: '活动',
        value: 3
    }, {
        name: '微博',
        value: 4
    }, {
        name: '抖音',
        value: 5
    }, {
        name: '短期代言',
        value: 6
    }, {
        name: '时装周',
        value: 7
    }, {
        name: '未确定',
        value: 8
    }],
    papiCommunicationStatusArr: [{
        name: '初步接触',
        value: 1
    }, {
        name: '沟通中',
        value: 2
    }, {
        name: '合同中',
        value: 3
    }, {
        name: '沟通完成',
        value: 4
    }],
    taiyangCommunicationStatusArr: [{
        name: '已签约',
        value: 1
    }, {
        name: '经理人沟通中',
        value: 2
    }, {
        name: '兼职星探沟通中',
        value: 3
    }, {
        name: '待定',
        value: 4
    }, {
        name: '淘汰',
        value: 5
    }, {
        name: '合同中',
        value: 6
    }, {
        name: '联系但无回复',
        value: 7
    }],
    yesOrNoArr: [{
        name: '是',
        value: 1
    }, {
        name: '否',
        value: 0
    }],
    genderArr: [{
        name: '男',
        value: 1
    }, {
        name: '女',
        value: 2
    }],
    artistSourceArr: [{
        name: '线上',
        value: 1
    }, {
        name: '线下',
        value: 2
    }, {
        name: '抖音',
        value: 3
    }, {
        name: '微博',
        value: 4
    }, {
        name: '陈赫',
        value: 5
    }, {
        name: '北电',
        value: 6
    }, {
        name: '杨光',
        value: 7
    }, {
        name: '中戏',
        value: 8
    }, {
        name: 'papitube推荐',
        value: 9
    }, {
        name: '地标商圈',
        value: 10
    }],
    attachmentTypeArr: [{
        name: '艺人简报',
        value: 1
    }, {
        name: '独白视频',
        value: 1
    }, {
        name: '艺人规划',
        value: 1
    }, {
        name: '自我介绍视频',
        value: 1
    }, {
        name: '其他',
        value: 1
    }],
    workTypeArr: [{
        name: '电影',
        value: 1
    }, {
        name: '电视剧',
        value: 2
    }, {
        name: '综艺',
        value: 3
    }, {
        name: '网剧',
        value: 4
    }],
    visibleRangeArr: [{
        name: '私有',
        value: 1
    }, {
        name: '共有',
        value: 2
    }]

};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ "./resources/assets/js/project.detail.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tool__ = __webpack_require__("./resources/assets/js/tool.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap__ = __webpack_require__("./resources/assets/js/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_index_js__ = __webpack_require__("./resources/assets/store/index.js");





var app = new Vue({
    el: '#root',
    store: __WEBPACK_IMPORTED_MODULE_3__store_index_js__["a" /* default */],
    data: {
        taskId: '',
        changeInfo: {},
        isEdit: false,
        projectInfo: '',
        trailInfo: {},
        taskTypeArr: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].taskTypeArr,
        taskLevelArr: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].taskLevelArr,
        taskLevel: '',
        taskName: '',
        startTime: '',
        endTime: '',
        startMinutes: '00:00',
        endMinutes: '00:00',
        taskIntroduce: '',
        projectTasksInfo: []

    },

    mounted: function mounted() {
        this.getProject();
    },


    watch: {},

    methods: {

        getProject: function getProject() {
            this.projectId = __WEBPACK_IMPORTED_MODULE_1__tool__["default"].getParameterByName('project_id');

            var data = {
                include: 'principal'
            };

            $.ajax({
                type: 'get',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].apiUrl + '/projects/' + this.projectId,
                headers: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].getHeaders(),
                data: data
            }).done(function (response) {
                console.log(response);
                app.projectInfo = response.data;
            });
        },

        addTask: function addTask() {
            var participant_ids = [];
            for (var i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                participant_ids.push(this.$store.state.newParticipantsInfo[i].id);
            }
            var data = {
                // resource_type: '1718463094',
                // resourceable_id: '1994731356',
                // type: app.taskType,
                // @todo 任务类型前端维护
                title: app.taskName,
                principal_id: this.$store.state.newPrincipalInfo.id,
                participant_ids: participant_ids,
                priority: app.taskLevel,
                start_at: app.startTime + ' ' + app.startMinutes,
                end_at: app.endTime + ' ' + app.endMinutes,
                desc: app.taskIntroduce
            };
            $.ajax({
                type: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].apiUrl + '/tasks',
                headers: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].getHeaders(),
                data: data,
                statusCode: {
                    400: function _(response) {
                        toastr.error(response.responseJSON.message);
                    }
                }
            }).done(function (response) {
                console.log(response);
                toastr.success('创建成功');
                $('#addTask').modal('hide');
                app.projectTasksInfo.push(response.data);
            });
        },

        addPrivacy: function addPrivacy() {},

        editBaseInfo: function editBaseInfo() {},

        changeProjectBaseInfo: function changeProjectBaseInfo() {},

        cancelEdit: function cancelEdit() {
            app.isEdit = false;
            app.changeInfo = {};
        },

        changeTaskType: function changeTaskType(value) {
            app.taskType = value;
        },

        principalChange: function principalChange(value) {},

        participantChange: function participantChange(value) {},

        changeTaskLevel: function changeTaskLevel(value) {
            app.taskLevel = value;
        },

        changeStartTime: function changeStartTime(value) {
            app.startTime = value;
        },

        changeStartMinutes: function changeStartMinutes(value) {
            app.startMinutes = value;
        },

        changeEndMinutes: function changeEndMinutes(value) {
            app.endMinutes = value;
        },

        changeEndTime: function changeEndTime(value) {
            app.endTime = value;
        }

    }

});

/***/ }),

/***/ "./resources/assets/js/tool.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/config.js");


var Tool = {
    getParameterByName: function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    isWeixin: function isWeixin() {
        //判断是否是微信
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    }
};

/* harmony default export */ __webpack_exports__["default"] = (Tool);

/***/ }),

/***/ "./resources/assets/store/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    changeParticipantsInfo: function changeParticipantsInfo(data, params) {
        if (params.type === 'change') {
            data.commit('changeParticipantsInfo', params.data);
        } else {
            data.commit('changeNewParticipantsInfo', params.data);
        }
    },

    changePrincipal: function changePrincipal(data, params) {
        if (params.type === 'change') {
            data.commit('changePrincipal', params.data);
        } else {
            data.commit('changeNewPrincipal', params.data);
        }
    },

    changeCompany: function changeCompany(data, params) {
        data.commit('changeCompany', params);
    }
});

/***/ }),

/***/ "./resources/assets/store/getters.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    getParticipantsInfo: function getParticipantsInfo(state) {
        return state.participantsInfo;
    }
});

/***/ }),

/***/ "./resources/assets/store/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_js__ = __webpack_require__("./resources/assets/store/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations_js__ = __webpack_require__("./resources/assets/store/mutations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters_js__ = __webpack_require__("./resources/assets/store/getters.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");





var state = {
    participantsInfo: [],
    newParticipantsInfo: [],
    principalInfo: {},
    newPrincipalInfo: {},
    companyInfo: {}
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_3_vuex__["a" /* default */].Store({
    state: state,
    actions: __WEBPACK_IMPORTED_MODULE_0__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters_js__["a" /* default */]
}));

/***/ }),

/***/ "./resources/assets/store/mutations.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    changeParticipantsInfo: function changeParticipantsInfo(state, data) {
        state.participantsInfo = data;
    },
    changePrincipal: function changePrincipal(state, data) {
        state.principalInfo = data;
    },
    changeNewParticipantsInfo: function changeNewParticipantsInfo(state, data) {
        state.newParticipantsInfo = data;
    },
    changeNewPrincipal: function changeNewPrincipal(state, data) {
        state.newPrincipalInfo = data;
    },
    changeCompany: function changeCompany(state, data) {
        state.companyInfo = data;
    }
});

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/project.detail.js");


/***/ })

/******/ });