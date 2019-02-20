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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(53);


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
/**
 * https://github.com/wildhaber/offline-first-sw
 */

var CACHE_VERSION = 1;

var BASE_CACHE_FILES = ['/', '/js/app.js', '/css/app.css', '/api/v1/hello', '/favicon.ico', '/img/pwa-icon.png', '/manifest.json', '/serviceworker.js', '/world'];

var OFFLINE_CACHE_FILES = ['/', '/js/app.js', '/css/app.css', '/api/v1/hello', '/favicon.ico', '/img/pwa-icon.png', '/manifest.json', '/serviceworker.js', '/world'];

var NOT_FOUND_CACHE_FILES = [];

var OFFLINE_PAGE = '/offline/index.html';
var NOT_FOUND_PAGE = '/404.html';

var CACHE_VERSIONS = {
    assets: 'assets-v' + CACHE_VERSION,
    content: 'content-v' + CACHE_VERSION,
    offline: 'offline-v' + CACHE_VERSION,
    notFound: '404-v' + CACHE_VERSION
};

// Define MAX_TTL's in SECONDS for specific file extensions
var MAX_TTL = {
    '/': 3600,
    html: 3600,
    json: 86400,
    js: 86400,
    css: 86400
};

var CACHE_BLACKLIST = [
    //(str) => {
    //    return !str.startsWith('http://localhost') && !str.startsWith('https://gohugohq.com');
    //},
];

var SUPPORTED_METHODS = ['GET'];

/**
 * isBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function isBlacklisted(url) {
    return CACHE_BLACKLIST.length > 0 ? !CACHE_BLACKLIST.filter(function (rule) {
        if (typeof rule === 'function') {
            return !rule(url);
        } else {
            return false;
        }
    }).length : false;
}

/**
 * getFileExtension
 * @param {string} url
 * @returns {string}
 */
function getFileExtension(url) {
    var extension = url.split('.').reverse()[0].split('?')[0];
    return extension.endsWith('/') ? '/' : extension;
}

/**
 * getTTL
 * @param {string} url
 */
function getTTL(url) {
    if (typeof url === 'string') {
        var extension = getFileExtension(url);
        if (typeof MAX_TTL[extension] === 'number') {
            return MAX_TTL[extension];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * installServiceWorker
 * @returns {Promise}
 */
function installServiceWorker() {
    return Promise.all([caches.open(CACHE_VERSIONS.assets).then(function (cache) {
        return cache.addAll(BASE_CACHE_FILES);
    }), caches.open(CACHE_VERSIONS.offline).then(function (cache) {
        return cache.addAll(OFFLINE_CACHE_FILES);
    }), caches.open(CACHE_VERSIONS.notFound).then(function (cache) {
        return cache.addAll(NOT_FOUND_CACHE_FILES);
    })]).then(function () {
        return self.skipWaiting();
    });
}

/**
 * cleanupLegacyCache
 * @returns {Promise}
 */
function cleanupLegacyCache() {

    var currentCaches = Object.keys(CACHE_VERSIONS).map(function (key) {
        return CACHE_VERSIONS[key];
    });

    return new Promise(function (resolve, reject) {

        caches.keys().then(function (keys) {
            return legacyKeys = keys.filter(function (key) {
                return !~currentCaches.indexOf(key);
            });
        }).then(function (legacy) {
            if (legacy.length) {
                Promise.all(legacy.map(function (legacyKey) {
                    return caches.delete(legacyKey);
                })).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                resolve();
            }
        }).catch(function () {
            reject();
        });
    });
}

function precacheUrl(url) {
    if (!isBlacklisted(url)) {
        caches.open(CACHE_VERSIONS.content).then(function (cache) {
            cache.match(url).then(function (response) {
                if (!response) {
                    return fetch(url);
                } else {
                    // already in cache, nothing to do.
                    return null;
                }
            }).then(function (response) {
                if (response) {
                    return cache.put(url, response.clone());
                } else {
                    return null;
                }
            });
        });
    }
}

self.addEventListener('install', function (event) {
    event.waitUntil(Promise.all([installServiceWorker(), self.skipWaiting()]));
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
    event.waitUntil(Promise.all([cleanupLegacyCache(), self.clients.claim(), self.skipWaiting()]).catch(function (err) {
        event.skipWaiting();
    }));
});

self.addEventListener('fetch', function (event) {

    event.respondWith(caches.open(CACHE_VERSIONS.content).then(function (cache) {

        return cache.match(event.request).then(function (response) {

            if (response) {

                var headers = response.headers.entries();
                var date = null;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var pair = _step.value;

                        if (pair[0] === 'date') {
                            date = new Date(pair[1]);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (date) {
                    var age = parseInt((new Date().getTime() - date.getTime()) / 1000);
                    var ttl = getTTL(event.request.url);

                    if (ttl && age > ttl) {

                        return new Promise(function (resolve) {

                            return fetch(event.request.clone()).then(function (updatedResponse) {
                                if (updatedResponse) {
                                    cache.put(event.request, updatedResponse.clone());
                                    resolve(updatedResponse);
                                } else {
                                    resolve(response);
                                }
                            }).catch(function () {
                                resolve(response);
                            });
                        }).catch(function (err) {
                            return response;
                        });
                    } else {
                        return response;
                    }
                } else {
                    return response;
                }
            } else {
                return null;
            }
        }).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request.clone()).then(function (response) {

                    if (response.status < 400) {
                        if (~SUPPORTED_METHODS.indexOf(event.request.method) && !isBlacklisted(event.request.url)) {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    } else {
                        return caches.open(CACHE_VERSIONS.notFound).then(function (cache) {
                            return cache.match(NOT_FOUND_PAGE);
                        });
                    }
                }).then(function (response) {
                    if (response) {
                        return response;
                    }
                }).catch(function () {

                    return caches.open(CACHE_VERSIONS.offline).then(function (offlineCache) {
                        return offlineCache.match(OFFLINE_PAGE);
                    });
                });
            }
        }).catch(function (error) {
            console.error('  Error in fetch handler:', error);
            throw error;
        });
    }));
});

self.addEventListener('message', function (event) {

    if (_typeof(event.data) === 'object' && typeof event.data.action === 'string') {
        switch (event.data.action) {
            case 'cache':
                precacheUrl(event.data.url);
                break;
            default:
                console.log('Unknown action: ' + event.data.action);
                break;
        }
    }
});

/***/ })

/******/ });
//# sourceMappingURL=serviceworker.js.map