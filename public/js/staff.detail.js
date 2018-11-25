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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

/***/ "./resources/assets/js/staff.detail.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap__ = __webpack_require__("./resources/assets/js/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__bootstrap__);



// const { sex } = config

var app = new Vue({
      el: '#root',
      data: {},

      mounted: function mounted() {},


      methods: {}
});

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/staff.detail.js");


/***/ })

/******/ });