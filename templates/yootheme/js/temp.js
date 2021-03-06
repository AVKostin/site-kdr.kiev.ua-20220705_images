try {
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.lazyClass = "jch-lazyload";
    window.lazySizesConfig.preloadClass = "jch-prelazyload";
    window.lazySizesConfig.loadingClass = "jch-lazyloading";
    window.lazySizesConfig.loadedClass = "jch-lazyloaded";
    window.lazySizesConfig.loadMode = 1;
    window.lazySizesConfig.loadHidden = false;
} catch (e) {
    console.error(
        "Error in file:/media/com_jchoptimize/core/js/ls.loader.js; Error:" +
            e.message,
    );
}
try {
    (function (window, factory) {
        var globalInstall = function () {
            factory(window.lazySizes);
            window.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window, window.document);
        if (typeof module == "object" && module.exports) {
            factory(require("lazysizes"));
        } else if (typeof define == "function" && define.amd) {
            define(["lazysizes"], factory);
        } else if (window.lazySizes) {
            globalInstall();
        } else {
            window.addEventListener("lazyunveilread", globalInstall, true);
        }
    })(window, function (window, document, lazySizes) {
        "use strict";
        var bgLoad, regBgUrlEscape;
        var uniqueUrls = {};
        if (document.addEventListener) {
            regBgUrlEscape = /\(|\)|\s|'/;
            bgLoad = function (url, cb) {
                var img = document.createElement("img");
                img.onload = function () {
                    img.onload = null;
                    img.onerror = null;
                    img = null;
                    cb();
                };
                img.onerror = img.onload;
                img.src = url;
                if (img && img.complete && img.onload) {
                    img.onload();
                }
            };
            addEventListener(
                "lazybeforeunveil",
                function (e) {
                    if (e.detail.instance != lazySizes) {
                        return;
                    }
                    var tmp, load, bg, poster;
                    if (!e.defaultPrevented) {
                        var target = e.target;
                        if (target.preload == "none") {
                            target.preload =
                                target.getAttribute("data-preload") || "auto";
                        }
                        if (target.getAttribute("data-autoplay") != null) {
                            if (
                                target.getAttribute("data-expand") &&
                                !target.autoplay
                            ) {
                                try {
                                    target.play();
                                } catch (er) {}
                            } else {
                                requestAnimationFrame(function () {
                                    target.setAttribute("data-expand", "-10");
                                    lazySizes.aC(
                                        target,
                                        lazySizes.cfg.lazyClass,
                                    );
                                });
                            }
                        }
                        tmp = target.getAttribute("data-link");
                        if (tmp) {
                            addStyleScript(tmp, true);
                        }
                        tmp = target.getAttribute("data-script");
                        if (tmp) {
                            e.detail.firesLoad = true;
                            load = function () {
                                e.detail.firesLoad = false;
                                lazySizes.fire(
                                    target,
                                    "_lazyloaded",
                                    {},
                                    true,
                                    true,
                                );
                            };
                            addStyleScript(tmp, null, load);
                        }
                        tmp = target.getAttribute("data-require");
                        if (tmp) {
                            if (lazySizes.cfg.requireJs) {
                                lazySizes.cfg.requireJs([tmp]);
                            } else {
                                addStyleScript(tmp);
                            }
                        }
                        bg = target.getAttribute("data-bg");
                        if (bg) {
                            e.detail.firesLoad = true;
                            load = function () {
                                target.style.backgroundImage =
                                    "url(" +
                                    (regBgUrlEscape.test(bg)
                                        ? JSON.stringify(bg)
                                        : bg) +
                                    ")";
                                e.detail.firesLoad = false;
                                lazySizes.fire(
                                    target,
                                    "_lazyloaded",
                                    {},
                                    true,
                                    true,
                                );
                            };
                            bgLoad(bg, load);
                        }
                        poster = target.getAttribute("data-poster");
                        if (poster) {
                            e.detail.firesLoad = true;
                            load = function () {
                                target.poster = poster;
                                e.detail.firesLoad = false;
                                lazySizes.fire(
                                    target,
                                    "_lazyloaded",
                                    {},
                                    true,
                                    true,
                                );
                            };
                            bgLoad(poster, load);
                        }
                    }
                },
                false,
            );
        }
        function addStyleScript(src, style, cb) {
            if (uniqueUrls[src]) {
                return;
            }
            var elem = document.createElement(style ? "link" : "script");
            var insertElem = document.getElementsByTagName("script")[0];
            if (style) {
                elem.rel = "stylesheet";
                elem.href = src;
            } else {
                elem.onload = function () {
                    elem.onerror = null;
                    elem.onload = null;
                    cb();
                };
                elem.onerror = elem.onload;
                elem.src = src;
            }
            uniqueUrls[src] = true;
            uniqueUrls[elem.src || elem.href] = true;
            insertElem.parentNode.insertBefore(elem, insertElem);
        }
    });
} catch (e) {
    console.error(
        "Error in file:/media/com_jchoptimize/lazysizes/ls.unveilhooks.js; Error:" +
            e.message,
    );
}
try {
    (function (window, factory) {
        var lazySizes = factory(window, window.document, Date);
        window.lazySizes = lazySizes;
        if (typeof module == "object" && module.exports) {
            module.exports = lazySizes;
        }
    })(
        typeof window != "undefined" ? window : {},
        function l(window, document, Date) {
            "use strict";
            var lazysizes, lazySizesCfg;
            (function () {
                var prop;
                var lazySizesDefaults = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: true,
                    expFactor: 1.5,
                    hFac: 0.8,
                    loadMode: 2,
                    loadHidden: true,
                    ricTimeout: 0,
                    throttleDelay: 125,
                };
                lazySizesCfg =
                    window.lazySizesConfig || window.lazysizesConfig || {};
                for (prop in lazySizesDefaults) {
                    if (!(prop in lazySizesCfg)) {
                        lazySizesCfg[prop] = lazySizesDefaults[prop];
                    }
                }
            })();
            if (!document || !document.getElementsByClassName) {
                return {
                    init: function () {},
                    cfg: lazySizesCfg,
                    noSupport: true,
                };
            }
            var docElem = document.documentElement;
            var supportPicture = window.HTMLPictureElement;
            var _addEventListener = "addEventListener";
            var _getAttribute = "getAttribute";
            var addEventListener = window[_addEventListener].bind(window);
            var setTimeout = window.setTimeout;
            var requestAnimationFrame =
                window.requestAnimationFrame || setTimeout;
            var requestIdleCallback = window.requestIdleCallback;
            var regPicture = /^picture$/i;
            var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
            var regClassCache = {};
            var forEach = Array.prototype.forEach;
            var hasClass = function (ele, cls) {
                if (!regClassCache[cls]) {
                    regClassCache[cls] = new RegExp(
                        "(\\s|^)" + cls + "(\\s|$)",
                    );
                }
                return (
                    regClassCache[cls].test(
                        ele[_getAttribute]("class") || "",
                    ) && regClassCache[cls]
                );
            };
            var addClass = function (ele, cls) {
                if (!hasClass(ele, cls)) {
                    ele.setAttribute(
                        "class",
                        (ele[_getAttribute]("class") || "").trim() + " " + cls,
                    );
                }
            };
            var removeClass = function (ele, cls) {
                var reg;
                if ((reg = hasClass(ele, cls))) {
                    ele.setAttribute(
                        "class",
                        (ele[_getAttribute]("class") || "").replace(reg, " "),
                    );
                }
            };
            var addRemoveLoadEvents = function (dom, fn, add) {
                var action = add ? _addEventListener : "removeEventListener";
                if (add) {
                    addRemoveLoadEvents(dom, fn);
                }
                loadEvents.forEach(function (evt) {
                    dom[action](evt, fn);
                });
            };
            var triggerEvent = function (
                elem,
                name,
                detail,
                noBubbles,
                noCancelable,
            ) {
                var event = document.createEvent("Event");
                if (!detail) {
                    detail = {};
                }
                detail.instance = lazysizes;
                event.initEvent(name, !noBubbles, !noCancelable);
                event.detail = detail;
                elem.dispatchEvent(event);
                return event;
            };
            var updatePolyfill = function (el, full) {
                var polyfill;
                if (
                    !supportPicture &&
                    (polyfill = window.picturefill || lazySizesCfg.pf)
                ) {
                    if (full && full.src && !el[_getAttribute]("srcset")) {
                        el.setAttribute("srcset", full.src);
                    }
                    polyfill({
                        reevaluate: true,
                        elements: [el],
                    });
                } else if (full && full.src) {
                    el.src = full.src;
                }
            };
            var getCSS = function (elem, style) {
                return (getComputedStyle(elem, null) || {})[style];
            };
            var getWidth = function (elem, parent, width) {
                width = width || elem.offsetWidth;
                while (
                    width < lazySizesCfg.minSize &&
                    parent &&
                    !elem._lazysizesWidth
                ) {
                    width = parent.offsetWidth;
                    parent = parent.parentNode;
                }
                return width;
            };
            var rAF = (function () {
                var running, waiting;
                var firstFns = [];
                var secondFns = [];
                var fns = firstFns;
                var run = function () {
                    var runFns = fns;
                    fns = firstFns.length ? secondFns : firstFns;
                    running = true;
                    waiting = false;
                    while (runFns.length) {
                        runFns.shift()();
                    }
                    running = false;
                };
                var rafBatch = function (fn, queue) {
                    if (running && !queue) {
                        fn.apply(this, arguments);
                    } else {
                        fns.push(fn);
                        if (!waiting) {
                            waiting = true;
                            (document.hidden
                                ? setTimeout
                                : requestAnimationFrame)(run);
                        }
                    }
                };
                rafBatch._lsFlush = run;
                return rafBatch;
            })();
            var rAFIt = function (fn, simple) {
                return simple
                    ? function () {
                          rAF(fn);
                      }
                    : function () {
                          var that = this;
                          var args = arguments;
                          rAF(function () {
                              fn.apply(that, args);
                          });
                      };
            };
            var throttle = function (fn) {
                var running;
                var lastTime = 0;
                var gDelay = lazySizesCfg.throttleDelay;
                var rICTimeout = lazySizesCfg.ricTimeout;
                var run = function () {
                    running = false;
                    lastTime = Date.now();
                    fn();
                };
                var idleCallback =
                    requestIdleCallback && rICTimeout > 49
                        ? function () {
                              requestIdleCallback(run, {
                                  timeout: rICTimeout,
                              });
                              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                                  rICTimeout = lazySizesCfg.ricTimeout;
                              }
                          }
                        : rAFIt(function () {
                              setTimeout(run);
                          }, true);
                return function (isPriority) {
                    var delay;
                    if ((isPriority = isPriority === true)) {
                        rICTimeout = 33;
                    }
                    if (running) {
                        return;
                    }
                    running = true;
                    delay = gDelay - (Date.now() - lastTime);
                    if (delay < 0) {
                        delay = 0;
                    }
                    if (isPriority || delay < 9) {
                        idleCallback();
                    } else {
                        setTimeout(idleCallback, delay);
                    }
                };
            };
            var debounce = function (func) {
                var timeout, timestamp;
                var wait = 99;
                var run = function () {
                    timeout = null;
                    func();
                };
                var later = function () {
                    var last = Date.now() - timestamp;
                    if (last < wait) {
                        setTimeout(later, wait - last);
                    } else {
                        (requestIdleCallback || run)(run);
                    }
                };
                return function () {
                    timestamp = Date.now();
                    if (!timeout) {
                        timeout = setTimeout(later, wait);
                    }
                };
            };
            var loader = (function () {
                var preloadElems,
                    isCompleted,
                    resetPreloadingTimer,
                    loadMode,
                    started;
                var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
                var regImg = /^img$/i;
                var regIframe = /^iframe$/i;
                var supportScroll =
                    "onscroll" in window &&
                    !/(gle|ing)bot/.test(navigator.userAgent);
                var shrinkExpand = 0;
                var currentExpand = 0;
                var isLoading = 0;
                var lowRuns = -1;
                var resetPreloading = function (e) {
                    isLoading--;
                    if (!e || isLoading < 0 || !e.target) {
                        isLoading = 0;
                    }
                };
                var isVisible = function (elem) {
                    if (isBodyHidden == null) {
                        isBodyHidden =
                            getCSS(document.body, "visibility") == "hidden";
                    }
                    return (
                        isBodyHidden ||
                        !(
                            getCSS(elem.parentNode, "visibility") == "hidden" &&
                            getCSS(elem, "visibility") == "hidden"
                        )
                    );
                };
                var isNestedVisible = function (elem, elemExpand) {
                    var outerRect;
                    var parent = elem;
                    var visible = isVisible(elem);
                    eLtop -= elemExpand;
                    eLbottom += elemExpand;
                    eLleft -= elemExpand;
                    eLright += elemExpand;
                    while (
                        visible &&
                        (parent = parent.offsetParent) &&
                        parent != document.body &&
                        parent != docElem
                    ) {
                        visible = (getCSS(parent, "opacity") || 1) > 0;
                        if (
                            visible &&
                            getCSS(parent, "overflow") != "visible"
                        ) {
                            outerRect = parent.getBoundingClientRect();
                            visible =
                                eLright > outerRect.left &&
                                eLleft < outerRect.right &&
                                eLbottom > outerRect.top - 1 &&
                                eLtop < outerRect.bottom + 1;
                        }
                    }
                    return visible;
                };
                var checkElements = function () {
                    var eLlen,
                        i,
                        rect,
                        autoLoadElem,
                        loadedSomething,
                        elemExpand,
                        elemNegativeExpand,
                        elemExpandVal,
                        beforeExpandVal,
                        defaultExpand,
                        preloadExpand,
                        hFac;
                    var lazyloadElems = lazysizes.elements;
                    if (
                        (loadMode = lazySizesCfg.loadMode) &&
                        isLoading < 8 &&
                        (eLlen = lazyloadElems.length)
                    ) {
                        i = 0;
                        lowRuns++;
                        for (; i < eLlen; i++) {
                            if (
                                !lazyloadElems[i] ||
                                lazyloadElems[i]._lazyRace
                            ) {
                                continue;
                            }
                            if (
                                !supportScroll ||
                                (lazysizes.prematureUnveil &&
                                    lazysizes.prematureUnveil(lazyloadElems[i]))
                            ) {
                                unveilElement(lazyloadElems[i]);
                                continue;
                            }
                            if (
                                !(elemExpandVal =
                                    lazyloadElems[i][_getAttribute](
                                        "data-expand",
                                    )) ||
                                !(elemExpand = elemExpandVal * 1)
                            ) {
                                elemExpand = currentExpand;
                            }
                            if (!defaultExpand) {
                                defaultExpand =
                                    !lazySizesCfg.expand ||
                                    lazySizesCfg.expand < 1
                                        ? docElem.clientHeight > 500 &&
                                          docElem.clientWidth > 500
                                            ? 500
                                            : 370
                                        : lazySizesCfg.expand;
                                lazysizes._defEx = defaultExpand;
                                preloadExpand =
                                    defaultExpand * lazySizesCfg.expFactor;
                                hFac = lazySizesCfg.hFac;
                                isBodyHidden = null;
                                if (
                                    currentExpand < preloadExpand &&
                                    isLoading < 1 &&
                                    lowRuns > 2 &&
                                    loadMode > 2 &&
                                    !document.hidden
                                ) {
                                    currentExpand = preloadExpand;
                                    lowRuns = 0;
                                } else if (
                                    loadMode > 1 &&
                                    lowRuns > 1 &&
                                    isLoading < 6
                                ) {
                                    currentExpand = defaultExpand;
                                } else {
                                    currentExpand = shrinkExpand;
                                }
                            }
                            if (beforeExpandVal !== elemExpand) {
                                eLvW = innerWidth + elemExpand * hFac;
                                elvH = innerHeight + elemExpand;
                                elemNegativeExpand = elemExpand * -1;
                                beforeExpandVal = elemExpand;
                            }
                            rect = lazyloadElems[i].getBoundingClientRect();
                            if (
                                (eLbottom = rect.bottom) >=
                                    elemNegativeExpand &&
                                (eLtop = rect.top) <= elvH &&
                                (eLright = rect.right) >=
                                    elemNegativeExpand * hFac &&
                                (eLleft = rect.left) <= eLvW &&
                                (eLbottom || eLright || eLleft || eLtop) &&
                                (lazySizesCfg.loadHidden ||
                                    isVisible(lazyloadElems[i])) &&
                                ((isCompleted &&
                                    isLoading < 3 &&
                                    !elemExpandVal &&
                                    (loadMode < 3 || lowRuns < 4)) ||
                                    isNestedVisible(
                                        lazyloadElems[i],
                                        elemExpand,
                                    ))
                            ) {
                                unveilElement(lazyloadElems[i]);
                                loadedSomething = true;
                                if (isLoading > 9) {
                                    break;
                                }
                            } else if (
                                !loadedSomething &&
                                isCompleted &&
                                !autoLoadElem &&
                                isLoading < 4 &&
                                lowRuns < 4 &&
                                loadMode > 2 &&
                                (preloadElems[0] ||
                                    lazySizesCfg.preloadAfterLoad) &&
                                (preloadElems[0] ||
                                    (!elemExpandVal &&
                                        (eLbottom ||
                                            eLright ||
                                            eLleft ||
                                            eLtop ||
                                            lazyloadElems[i][_getAttribute](
                                                lazySizesCfg.sizesAttr,
                                            ) != "auto")))
                            ) {
                                autoLoadElem =
                                    preloadElems[0] || lazyloadElems[i];
                            }
                        }
                        if (autoLoadElem && !loadedSomething) {
                            unveilElement(autoLoadElem);
                        }
                    }
                };
                var throttledCheckElements = throttle(checkElements);
                var switchLoadingClass = function (e) {
                    var elem = e.target;
                    if (elem._lazyCache) {
                        delete elem._lazyCache;
                        return;
                    }
                    resetPreloading(e);
                    addClass(elem, lazySizesCfg.loadedClass);
                    removeClass(elem, lazySizesCfg.loadingClass);
                    addRemoveLoadEvents(elem, rafSwitchLoadingClass);
                    triggerEvent(elem, "lazyloaded");
                };
                var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
                var rafSwitchLoadingClass = function (e) {
                    rafedSwitchLoadingClass({
                        target: e.target,
                    });
                };
                var changeIframeSrc = function (elem, src) {
                    var loadMode =
                        elem.getAttribute("data-load-mode") ||
                        lazySizesCfg.iframeLoadMode;
                    if (loadMode == 0) {
                        elem.contentWindow.location.replace(src);
                    } else if (loadMode == 1) {
                        elem.src = src;
                    }
                };
                var handleSources = function (source) {
                    var customMedia;
                    var sourceSrcset = source[_getAttribute](
                        lazySizesCfg.srcsetAttr,
                    );
                    if (
                        (customMedia =
                            lazySizesCfg.customMedia[
                                source[_getAttribute]("data-media") ||
                                    source[_getAttribute]("media")
                            ])
                    ) {
                        source.setAttribute("media", customMedia);
                    }
                    if (sourceSrcset) {
                        source.setAttribute("srcset", sourceSrcset);
                    }
                };
                var lazyUnveil = rAFIt(function (
                    elem,
                    detail,
                    isAuto,
                    sizes,
                    isImg,
                ) {
                    var src, srcset, parent, isPicture, event, firesLoad;
                    if (
                        !(event = triggerEvent(
                            elem,
                            "lazybeforeunveil",
                            detail,
                        )).defaultPrevented
                    ) {
                        if (sizes) {
                            if (isAuto) {
                                addClass(elem, lazySizesCfg.autosizesClass);
                            } else {
                                elem.setAttribute("sizes", sizes);
                            }
                        }
                        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                        src = elem[_getAttribute](lazySizesCfg.srcAttr);
                        if (isImg) {
                            parent = elem.parentNode;
                            isPicture =
                                parent &&
                                regPicture.test(parent.nodeName || "");
                        }
                        firesLoad =
                            detail.firesLoad ||
                            ("src" in elem && (srcset || src || isPicture));
                        event = {
                            target: elem,
                        };
                        addClass(elem, lazySizesCfg.loadingClass);
                        if (firesLoad) {
                            clearTimeout(resetPreloadingTimer);
                            resetPreloadingTimer = setTimeout(
                                resetPreloading,
                                2500,
                            );
                            addRemoveLoadEvents(
                                elem,
                                rafSwitchLoadingClass,
                                true,
                            );
                        }
                        if (isPicture) {
                            forEach.call(
                                parent.getElementsByTagName("source"),
                                handleSources,
                            );
                        }
                        if (srcset) {
                            elem.setAttribute("srcset", srcset);
                        } else if (src && !isPicture) {
                            if (regIframe.test(elem.nodeName)) {
                                changeIframeSrc(elem, src);
                            } else {
                                elem.src = src;
                            }
                        }
                        if (isImg && (srcset || isPicture)) {
                            updatePolyfill(elem, {
                                src: src,
                            });
                        }
                    }
                    if (elem._lazyRace) {
                        delete elem._lazyRace;
                    }
                    removeClass(elem, lazySizesCfg.lazyClass);
                    rAF(function () {
                        var isLoaded = elem.complete && elem.naturalWidth > 1;
                        if (!firesLoad || isLoaded) {
                            if (isLoaded) {
                                addClass(elem, lazySizesCfg.fastLoadedClass);
                            }
                            switchLoadingClass(event);
                            elem._lazyCache = true;
                            setTimeout(function () {
                                if ("_lazyCache" in elem) {
                                    delete elem._lazyCache;
                                }
                            }, 9);
                        }
                        if (elem.loading == "lazy") {
                            isLoading--;
                        }
                    }, true);
                });
                var unveilElement = function (elem) {
                    if (elem._lazyRace) {
                        return;
                    }
                    var detail;
                    var isImg = regImg.test(elem.nodeName);
                    var sizes =
                        isImg &&
                        (elem[_getAttribute](lazySizesCfg.sizesAttr) ||
                            elem[_getAttribute]("sizes"));
                    var isAuto = sizes == "auto";
                    if (
                        (isAuto || !isCompleted) &&
                        isImg &&
                        (elem[_getAttribute]("src") || elem.srcset) &&
                        !elem.complete &&
                        !hasClass(elem, lazySizesCfg.errorClass) &&
                        hasClass(elem, lazySizesCfg.lazyClass)
                    ) {
                        return;
                    }
                    detail = triggerEvent(elem, "lazyunveilread").detail;
                    if (isAuto) {
                        autoSizer.updateElem(elem, true, elem.offsetWidth);
                    }
                    elem._lazyRace = true;
                    isLoading++;
                    lazyUnveil(elem, detail, isAuto, sizes, isImg);
                };
                var afterScroll = debounce(function () {
                    lazySizesCfg.loadMode = 3;
                    throttledCheckElements();
                });
                var altLoadmodeScrollListner = function () {
                    if (lazySizesCfg.loadMode == 3) {
                        lazySizesCfg.loadMode = 2;
                    }
                    afterScroll();
                };
                var onload = function () {
                    if (isCompleted) {
                        return;
                    }
                    if (Date.now() - started < 999) {
                        setTimeout(onload, 999);
                        return;
                    }
                    isCompleted = true;
                    lazySizesCfg.loadMode = 3;
                    throttledCheckElements();
                    addEventListener("scroll", altLoadmodeScrollListner, true);
                };
                return {
                    _: function () {
                        started = Date.now();
                        lazysizes.elements = document.getElementsByClassName(
                            lazySizesCfg.lazyClass,
                        );
                        preloadElems = document.getElementsByClassName(
                            lazySizesCfg.lazyClass +
                                " " +
                                lazySizesCfg.preloadClass,
                        );
                        addEventListener(
                            "scroll",
                            throttledCheckElements,
                            true,
                        );
                        addEventListener(
                            "resize",
                            throttledCheckElements,
                            true,
                        );
                        addEventListener("pageshow", function (e) {
                            if (e.persisted) {
                                var loadingElements = document.querySelectorAll(
                                    "." + lazySizesCfg.loadingClass,
                                );
                                if (
                                    loadingElements.length &&
                                    loadingElements.forEach
                                ) {
                                    requestAnimationFrame(function () {
                                        loadingElements.forEach(function (img) {
                                            if (img.complete) {
                                                unveilElement(img);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                        if (window.MutationObserver) {
                            new MutationObserver(
                                throttledCheckElements,
                            ).observe(docElem, {
                                childList: true,
                                subtree: true,
                                attributes: true,
                            });
                        } else {
                            docElem[_addEventListener](
                                "DOMNodeInserted",
                                throttledCheckElements,
                                true,
                            );
                            docElem[_addEventListener](
                                "DOMAttrModified",
                                throttledCheckElements,
                                true,
                            );
                            setInterval(throttledCheckElements, 999);
                        }
                        addEventListener(
                            "hashchange",
                            throttledCheckElements,
                            true,
                        );
                        [
                            "focus",
                            "mouseover",
                            "click",
                            "load",
                            "transitionend",
                            "animationend",
                        ].forEach(function (name) {
                            document[_addEventListener](
                                name,
                                throttledCheckElements,
                                true,
                            );
                        });
                        if (/d$|^c/.test(document.readyState)) {
                            onload();
                        } else {
                            addEventListener("load", onload);
                            document[_addEventListener](
                                "DOMContentLoaded",
                                throttledCheckElements,
                            );
                            setTimeout(onload, 20000);
                        }
                        if (lazysizes.elements.length) {
                            checkElements();
                            rAF._lsFlush();
                        } else {
                            throttledCheckElements();
                        }
                    },
                    checkElems: throttledCheckElements,
                    unveil: unveilElement,
                    _aLSL: altLoadmodeScrollListner,
                };
            })();
            var autoSizer = (function () {
                var autosizesElems;
                var sizeElement = rAFIt(function (elem, parent, event, width) {
                    var sources, i, len;
                    elem._lazysizesWidth = width;
                    width += "px";
                    elem.setAttribute("sizes", width);
                    if (regPicture.test(parent.nodeName || "")) {
                        sources = parent.getElementsByTagName("source");
                        for (i = 0, len = sources.length; i < len; i++) {
                            sources[i].setAttribute("sizes", width);
                        }
                    }
                    if (!event.detail.dataAttr) {
                        updatePolyfill(elem, event.detail);
                    }
                });
                var getSizeElement = function (elem, dataAttr, width) {
                    var event;
                    var parent = elem.parentNode;
                    if (parent) {
                        width = getWidth(elem, parent, width);
                        event = triggerEvent(elem, "lazybeforesizes", {
                            width: width,
                            dataAttr: !!dataAttr,
                        });
                        if (!event.defaultPrevented) {
                            width = event.detail.width;
                            if (width && width !== elem._lazysizesWidth) {
                                sizeElement(elem, parent, event, width);
                            }
                        }
                    }
                };
                var updateElementsSizes = function () {
                    var i;
                    var len = autosizesElems.length;
                    if (len) {
                        i = 0;
                        for (; i < len; i++) {
                            getSizeElement(autosizesElems[i]);
                        }
                    }
                };
                var debouncedUpdateElementsSizes =
                    debounce(updateElementsSizes);
                return {
                    _: function () {
                        autosizesElems = document.getElementsByClassName(
                            lazySizesCfg.autosizesClass,
                        );
                        addEventListener(
                            "resize",
                            debouncedUpdateElementsSizes,
                        );
                    },
                    checkElems: debouncedUpdateElementsSizes,
                    updateElem: getSizeElement,
                };
            })();
            var init = function () {
                if (!init.i && document.getElementsByClassName) {
                    init.i = true;
                    autoSizer._();
                    loader._();
                }
            };
            setTimeout(function () {
                if (lazySizesCfg.init) {
                    init();
                }
            });
            lazysizes = {
                cfg: lazySizesCfg,
                autoSizer: autoSizer,
                loader: loader,
                init: init,
                uP: updatePolyfill,
                aC: addClass,
                rC: removeClass,
                hC: hasClass,
                fire: triggerEvent,
                gW: getWidth,
                rAF: rAF,
            };
            return lazysizes;
        },
    );
} catch (e) {
    console.error(
        "Error in file:/media/com_jchoptimize/lazysizes/lazysizes.js; Error:" +
            e.message,
    );
}
try {
    !(function (t, e) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = e())
            : "function" == typeof define && define.amd
            ? define("uikit", e)
            : ((t = t || self).UIkit = e());
    })(this, function () {
        "use strict";
        function p(i, n) {
            return function (t) {
                var e = arguments.length;
                return e
                    ? 1 < e
                        ? i.apply(n, arguments)
                        : i.call(n, t)
                    : i.call(n);
            };
        }
        var e = Object.prototype,
            i = e.hasOwnProperty;
        function l(t, e) {
            return i.call(t, e);
        }
        var n = {},
            r = /([a-z\d])([A-Z])/g;
        function m(t) {
            return t in n || (n[t] = t.replace(r, "$1-$2").toLowerCase()), n[t];
        }
        var o = /-(\w)/g;
        function g(t) {
            return t.replace(o, s);
        }
        function s(t, e) {
            return e ? e.toUpperCase() : "";
        }
        function f(t) {
            return t.length ? s(0, t.charAt(0)) + t.slice(1) : "";
        }
        var t = String.prototype,
            a =
                t.startsWith ||
                function (t) {
                    return 0 === this.lastIndexOf(t, 0);
                };
        function w(t, e) {
            return a.call(t, e);
        }
        var h =
            t.endsWith ||
            function (t) {
                return this.substr(-t.length) === t;
            };
        function c(t, e) {
            return h.call(t, e);
        }
        var u = function (t, e) {
                return ~this.indexOf(t, e);
            },
            d = t.includes || u,
            v = Array.prototype.includes || u;
        function b(t, e) {
            return t && (_(t) ? d : v).call(t, e);
        }
        var y = Array.isArray;
        function x(t) {
            return "function" == typeof t;
        }
        function k(t) {
            return null !== t && "object" == typeof t;
        }
        function $(t) {
            return k(t) && Object.getPrototypeOf(t) === e;
        }
        function I(t) {
            return k(t) && t === t.window;
        }
        function S(t) {
            return k(t) && 9 === t.nodeType;
        }
        function T(t) {
            return k(t) && !!t.jquery;
        }
        function E(t) {
            return t instanceof Node || (k(t) && 1 <= t.nodeType);
        }
        var A = e.toString;
        function C(t) {
            return A.call(t).match(/^\[object (NodeList|HTMLCollection)\]$/);
        }
        function N(t) {
            return "boolean" == typeof t;
        }
        function _(t) {
            return "string" == typeof t;
        }
        function M(t) {
            return "number" == typeof t;
        }
        function D(t) {
            return M(t) || (_(t) && !isNaN(t - parseFloat(t)));
        }
        function O(t) {
            return void 0 === t;
        }
        function B(t) {
            return N(t)
                ? t
                : "true" === t ||
                      "1" === t ||
                      "" === t ||
                      ("false" !== t && "0" !== t && t);
        }
        function z(t) {
            var e = Number(t);
            return !isNaN(e) && e;
        }
        function P(t) {
            return parseFloat(t) || 0;
        }
        function H(t) {
            return E(t) || I(t) || S(t)
                ? t
                : C(t) || T(t)
                ? t[0]
                : y(t)
                ? H(t[0])
                : null;
        }
        var L = Array.prototype;
        function F(t) {
            return E(t)
                ? [t]
                : C(t)
                ? L.slice.call(t)
                : y(t)
                ? t.map(H).filter(Boolean)
                : T(t)
                ? t.toArray()
                : [];
        }
        function j(t) {
            return y(t)
                ? t
                : _(t)
                ? t.split(/,(?![^(]*\))/).map(function (t) {
                      return D(t) ? z(t) : B(t.trim());
                  })
                : [t];
        }
        function W(t) {
            return t ? (c(t, "ms") ? P(t) : 1e3 * P(t)) : 0;
        }
        function V(t, i) {
            return (
                t === i ||
                (k(t) &&
                    k(i) &&
                    Object.keys(t).length === Object.keys(i).length &&
                    q(t, function (t, e) {
                        return t === i[e];
                    }))
            );
        }
        function Y(t, e, i) {
            return t.replace(new RegExp(e + "|" + i, "mg"), function (t) {
                return t === e ? i : e;
            });
        }
        var R =
            Object.assign ||
            function (t) {
                for (var e = [], i = arguments.length - 1; 0 < i--; )
                    e[i] = arguments[i + 1];
                t = Object(t);
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (null !== r) for (var o in r) l(r, o) && (t[o] = r[o]);
                }
                return t;
            };
        function q(t, e) {
            for (var i in t) if (!1 === e(t[i], i)) return !1;
            return !0;
        }
        function U(t, r) {
            return t.sort(function (t, e) {
                var i = t[r];
                void 0 === i && (i = 0);
                var n = e[r];
                return void 0 === n && (n = 0), n < i ? 1 : i < n ? -1 : 0;
            });
        }
        function X(t, i) {
            var n = new Set();
            return t.filter(function (t) {
                var e = t[i];
                return !n.has(e) && (n.add(e) || !0);
            });
        }
        function K(t, e, i) {
            return (
                void 0 === e && (e = 0),
                void 0 === i && (i = 1),
                Math.min(Math.max(z(t) || 0, e), i)
            );
        }
        function G() {}
        function J(t, e) {
            return (
                t.left < e.right &&
                t.right > e.left &&
                t.top < e.bottom &&
                t.bottom > e.top
            );
        }
        function Z(t, e) {
            return (
                t.x <= e.right &&
                t.x >= e.left &&
                t.y <= e.bottom &&
                t.y >= e.top
            );
        }
        var Q = {
            ratio: function (t, e, i) {
                var n,
                    r = "width" === e ? "height" : "width";
                return (
                    ((n = {})[r] = t[e] ? Math.round((i * t[r]) / t[e]) : t[r]),
                    (n[e] = i),
                    n
                );
            },
            contain: function (i, n) {
                var r = this;
                return (
                    q((i = R({}, i)), function (t, e) {
                        return (i = i[e] > n[e] ? r.ratio(i, e, n[e]) : i);
                    }),
                    i
                );
            },
            cover: function (i, n) {
                var r = this;
                return (
                    q((i = this.contain(i, n)), function (t, e) {
                        return (i = i[e] < n[e] ? r.ratio(i, e, n[e]) : i);
                    }),
                    i
                );
            },
        };
        function tt(t, e, i) {
            if (k(e)) for (var n in e) tt(t, n, e[n]);
            else {
                if (O(i)) return (t = H(t)) && t.getAttribute(e);
                F(t).forEach(function (t) {
                    x(i) && (i = i.call(t, tt(t, e))),
                        null === i ? it(t, e) : t.setAttribute(e, i);
                });
            }
        }
        function et(t, e) {
            return F(t).some(function (t) {
                return t.hasAttribute(e);
            });
        }
        function it(t, e) {
            (t = F(t)),
                e.split(" ").forEach(function (e) {
                    return t.forEach(function (t) {
                        return t.hasAttribute(e) && t.removeAttribute(e);
                    });
                });
        }
        function nt(t, e) {
            for (var i = 0, n = [e, "data-" + e]; i < n.length; i++)
                if (et(t, n[i])) return tt(t, n[i]);
        }
        function rt(t, e) {
            return H(t) || at(t, st(t, e));
        }
        function ot(t, e) {
            var i = F(t);
            return (i.length && i) || ht(t, st(t, e));
        }
        function st(t, e) {
            return (
                void 0 === e && (e = document),
                dt(t) || S(e) ? e : e.ownerDocument
            );
        }
        function at(t, e) {
            return H(lt(t, e, "querySelector"));
        }
        function ht(t, e) {
            return F(lt(t, e, "querySelectorAll"));
        }
        function lt(t, s, e) {
            if ((void 0 === s && (s = document), !t || !_(t))) return null;
            var a;
            dt((t = t.replace(ut, "$1 *"))) &&
                ((a = []),
                (t = t
                    .split(",")
                    .map(function (t, e) {
                        var i = s;
                        if ("!" === (t = t.trim())[0]) {
                            var n = t.substr(1).trim().split(" ");
                            (i = vt(s.parentNode, n[0])),
                                (t = n.slice(1).join(" ").trim());
                        }
                        if ("-" === t[0]) {
                            var r = t.substr(1).trim().split(" "),
                                o = (i || s).previousElementSibling;
                            (i = mt(o, t.substr(1)) ? o : null),
                                (t = r.slice(1).join(" "));
                        }
                        return i
                            ? (i.id ||
                                  ((i.id = "uk-" + Date.now() + e),
                                  a.push(function () {
                                      return it(i, "id");
                                  })),
                              "#" + yt(i.id) + " " + t)
                            : null;
                    })
                    .filter(Boolean)
                    .join(",")),
                (s = document));
            try {
                return s[e](t);
            } catch (t) {
                return null;
            } finally {
                a &&
                    a.forEach(function (t) {
                        return t();
                    });
            }
        }
        var ct = /(^|,)\s*[!>+~-]/,
            ut = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
        function dt(t) {
            return _(t) && t.match(ct);
        }
        var ft = Element.prototype,
            pt = ft.matches || ft.webkitMatchesSelector || ft.msMatchesSelector;
        function mt(t, e) {
            return F(t).some(function (t) {
                return pt.call(t, e);
            });
        }
        var gt =
            ft.closest ||
            function (t) {
                var e = this;
                do {
                    if (mt(e, t)) return e;
                    e = e.parentNode;
                } while (e && 1 === e.nodeType);
            };
        function vt(t, e) {
            return (
                w(e, ">") && (e = e.slice(1)),
                E(t)
                    ? t.parentNode && gt.call(t, e)
                    : F(t)
                          .map(function (t) {
                              return vt(t, e);
                          })
                          .filter(Boolean)
            );
        }
        function wt(t, e) {
            for (var i = [], n = H(t).parentNode; n && 1 === n.nodeType; )
                mt(n, e) && i.push(n), (n = n.parentNode);
            return i;
        }
        var bt =
            (window.CSS && CSS.escape) ||
            function (t) {
                return t.replace(/([^\x7f-\uFFFF\w-])/g, function (t) {
                    return "\\" + t;
                });
            };
        function yt(t) {
            return _(t) ? bt.call(null, t) : "";
        }
        var xt = {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            menuitem: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
        };
        function kt(t) {
            return F(t).some(function (t) {
                return xt[t.tagName.toLowerCase()];
            });
        }
        function $t(t) {
            return F(t).some(function (t) {
                return (
                    t.offsetWidth || t.offsetHeight || t.getClientRects().length
                );
            });
        }
        var It = "input,select,textarea,button";
        function St(t) {
            return F(t).some(function (t) {
                return mt(t, It);
            });
        }
        function Tt(t, e) {
            return F(t).filter(function (t) {
                return mt(t, e);
            });
        }
        function Et(t, e) {
            return _(e)
                ? mt(t, e) || vt(t, e)
                : t === e || (S(e) ? e.documentElement : H(e)).contains(H(t));
        }
        function At() {
            for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
            var i,
                n = Dt(t),
                r = n[0],
                o = n[1],
                s = n[2],
                a = n[3],
                h = n[4];
            return (
                (r = zt(r)),
                s &&
                    (a = (function (t, n, r) {
                        var o = this;
                        return function (i) {
                            t.forEach(function (t) {
                                var e =
                                    ">" === n[0]
                                        ? ht(n, t)
                                              .reverse()
                                              .filter(function (t) {
                                                  return Et(i.target, t);
                                              })[0]
                                        : vt(i.target, n);
                                e &&
                                    ((i.delegate = t),
                                    (i.current = e),
                                    r.call(o, i));
                            });
                        };
                    })(r, s, a)),
                1 < a.length &&
                    ((i = a),
                    (a = function (t) {
                        return y(t.detail)
                            ? i.apply(void 0, [t].concat(t.detail))
                            : i(t);
                    })),
                o.split(" ").forEach(function (e) {
                    return r.forEach(function (t) {
                        return t.addEventListener(e, a, h);
                    });
                }),
                function () {
                    return Ct(r, o, a, h);
                }
            );
        }
        function Ct(t, e, i, n) {
            void 0 === n && (n = !1),
                (t = zt(t)),
                e.split(" ").forEach(function (e) {
                    return t.forEach(function (t) {
                        return t.removeEventListener(e, i, n);
                    });
                });
        }
        function Nt() {
            for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
            var i = Dt(t),
                n = i[0],
                r = i[1],
                o = i[2],
                s = i[3],
                a = i[4],
                h = i[5],
                l = At(
                    n,
                    r,
                    o,
                    function (t) {
                        var e = !h || h(t);
                        e && (l(), s(t, e));
                    },
                    a,
                );
            return l;
        }
        function _t(t, i, n) {
            return zt(t).reduce(function (t, e) {
                return t && e.dispatchEvent(Mt(i, !0, !0, n));
            }, !0);
        }
        function Mt(t, e, i, n) {
            if ((void 0 === e && (e = !0), void 0 === i && (i = !1), _(t))) {
                var r = document.createEvent("CustomEvent");
                r.initCustomEvent(t, e, i, n), (t = r);
            }
            return t;
        }
        function Dt(t) {
            return x(t[2]) && t.splice(2, 0, !1), t;
        }
        function Ot(t) {
            return t && "addEventListener" in t;
        }
        function Bt(t) {
            return Ot(t) ? t : H(t);
        }
        function zt(t) {
            return y(t)
                ? t.map(Bt).filter(Boolean)
                : _(t)
                ? ht(t)
                : Ot(t)
                ? [t]
                : F(t);
        }
        var Pt = "Promise" in window ? window.Promise : jt,
            Ht = function () {
                var i = this;
                this.promise = new Pt(function (t, e) {
                    (i.reject = e), (i.resolve = t);
                });
            },
            Lt = 2,
            Ft = "setImmediate" in window ? setImmediate : setTimeout;
        function jt(t) {
            (this.state = Lt), (this.value = void 0), (this.deferred = []);
            var e = this;
            try {
                t(
                    function (t) {
                        e.resolve(t);
                    },
                    function (t) {
                        e.reject(t);
                    },
                );
            } catch (t) {
                e.reject(t);
            }
        }
        (jt.reject = function (i) {
            return new jt(function (t, e) {
                e(i);
            });
        }),
            (jt.resolve = function (i) {
                return new jt(function (t, e) {
                    t(i);
                });
            }),
            (jt.all = function (s) {
                return new jt(function (i, t) {
                    var n = [],
                        r = 0;
                    function e(e) {
                        return function (t) {
                            (n[e] = t), (r += 1) === s.length && i(n);
                        };
                    }
                    0 === s.length && i(n);
                    for (var o = 0; o < s.length; o += 1)
                        jt.resolve(s[o]).then(e(o), t);
                });
            }),
            (jt.race = function (n) {
                return new jt(function (t, e) {
                    for (var i = 0; i < n.length; i += 1)
                        jt.resolve(n[i]).then(t, e);
                });
            });
        var Wt = jt.prototype;
        function Vt(s, a) {
            return new Pt(function (t, e) {
                var i = R(
                    {
                        data: null,
                        method: "GET",
                        headers: {},
                        xhr: new XMLHttpRequest(),
                        beforeSend: G,
                        responseType: "",
                    },
                    a,
                );
                i.beforeSend(i);
                var n = i.xhr;
                for (var r in i)
                    if (r in n)
                        try {
                            n[r] = i[r];
                        } catch (t) {}
                for (var o in (n.open(i.method.toUpperCase(), s), i.headers))
                    n.setRequestHeader(o, i.headers[o]);
                At(n, "load", function () {
                    0 === n.status ||
                    (200 <= n.status && n.status < 300) ||
                    304 === n.status
                        ? t(n)
                        : e(
                              R(Error(n.statusText), {
                                  xhr: n,
                                  status: n.status,
                              }),
                          );
                }),
                    At(n, "error", function () {
                        return e(
                            R(Error("Network Error"), {
                                xhr: n,
                            }),
                        );
                    }),
                    At(n, "timeout", function () {
                        return e(
                            R(Error("Network Timeout"), {
                                xhr: n,
                            }),
                        );
                    }),
                    n.send(i.data);
            });
        }
        function Yt(n, r, o) {
            return new Pt(function (t, e) {
                var i = new Image();
                (i.onerror = e),
                    (i.onload = function () {
                        return t(i);
                    }),
                    o && (i.sizes = o),
                    r && (i.srcset = r),
                    (i.src = n);
            });
        }
        (Wt.resolve = function (t) {
            var e = this;
            if (e.state === Lt) {
                if (t === e)
                    throw new TypeError("Promise settled with itself.");
                var i = !1;
                try {
                    var n = t && t.then;
                    if (null !== t && k(t) && x(n))
                        return void n.call(
                            t,
                            function (t) {
                                i || e.resolve(t), (i = !0);
                            },
                            function (t) {
                                i || e.reject(t), (i = !0);
                            },
                        );
                } catch (t) {
                    return void (i || e.reject(t));
                }
                (e.state = 0), (e.value = t), e.notify();
            }
        }),
            (Wt.reject = function (t) {
                var e = this;
                if (e.state === Lt) {
                    if (t === e)
                        throw new TypeError("Promise settled with itself.");
                    (e.state = 1), (e.value = t), e.notify();
                }
            }),
            (Wt.notify = function () {
                var o = this;
                Ft(function () {
                    if (o.state !== Lt)
                        for (; o.deferred.length; ) {
                            var t = o.deferred.shift(),
                                e = t[0],
                                i = t[1],
                                n = t[2],
                                r = t[3];
                            try {
                                0 === o.state
                                    ? x(e)
                                        ? n(e.call(void 0, o.value))
                                        : n(o.value)
                                    : 1 === o.state &&
                                      (x(i)
                                          ? n(i.call(void 0, o.value))
                                          : r(o.value));
                            } catch (t) {
                                r(t);
                            }
                        }
                });
            }),
            (Wt.then = function (i, n) {
                var r = this;
                return new jt(function (t, e) {
                    r.deferred.push([i, n, t, e]), r.notify();
                });
            }),
            (Wt.catch = function (t) {
                return this.then(void 0, t);
            });
        var Rt = /msie|trident/i.test(window.navigator.userAgent),
            qt = "rtl" === tt(document.documentElement, "dir"),
            Ut = "ontouchstart" in window,
            Xt = window.PointerEvent,
            Kt =
                Ut ||
                (window.DocumentTouch && document instanceof DocumentTouch) ||
                navigator.maxTouchPoints,
            Gt = Xt ? "pointerdown" : Ut ? "touchstart" : "mousedown",
            Jt = Xt ? "pointermove" : Ut ? "touchmove" : "mousemove",
            Zt = Xt ? "pointerup" : Ut ? "touchend" : "mouseup",
            Qt = Xt ? "pointerenter" : Ut ? "" : "mouseenter",
            te = Xt ? "pointerleave" : Ut ? "" : "mouseleave",
            ee = Xt ? "pointercancel" : "touchcancel";
        function ie(t) {
            if ("loading" === document.readyState)
                var e = At(document, "DOMContentLoaded", function () {
                    e(), t();
                });
            else t();
        }
        function ne(t, e) {
            return e
                ? F(t).indexOf(H(e))
                : F((t = H(t)) && t.parentNode.children).indexOf(t);
        }
        function re(t, e, i, n) {
            void 0 === i && (i = 0), void 0 === n && (n = !1);
            var r = (e = F(e)).length;
            return (
                (t = D(t)
                    ? z(t)
                    : "next" === t
                    ? i + 1
                    : "previous" === t
                    ? i - 1
                    : ne(e, t)),
                n ? K(t, 0, r - 1) : (t %= r) < 0 ? t + r : t
            );
        }
        function oe(t) {
            return ((t = be(t)).innerHTML = ""), t;
        }
        function se(t, e) {
            return (
                (t = be(t)),
                O(e) ? t.innerHTML : ae(t.hasChildNodes() ? oe(t) : t, e)
            );
        }
        function ae(e, t) {
            return (
                (e = be(e)),
                ce(t, function (t) {
                    return e.appendChild(t);
                })
            );
        }
        function he(e, t) {
            return (
                (e = be(e)),
                ce(t, function (t) {
                    return e.parentNode.insertBefore(t, e);
                })
            );
        }
        function le(e, t) {
            return (
                (e = be(e)),
                ce(t, function (t) {
                    return e.nextSibling
                        ? he(e.nextSibling, t)
                        : ae(e.parentNode, t);
                })
            );
        }
        function ce(t, e) {
            return (t = _(t) ? ve(t) : t)
                ? "length" in t
                    ? F(t).map(e)
                    : e(t)
                : null;
        }
        function ue(t) {
            F(t).map(function (t) {
                return t.parentNode && t.parentNode.removeChild(t);
            });
        }
        function de(t, e) {
            for (e = H(he(t, e)); e.firstChild; ) e = e.firstChild;
            return ae(e, t), e;
        }
        function fe(t, e) {
            return F(
                F(t).map(function (t) {
                    return t.hasChildNodes ? de(F(t.childNodes), e) : ae(t, e);
                }),
            );
        }
        function pe(t) {
            F(t)
                .map(function (t) {
                    return t.parentNode;
                })
                .filter(function (t, e, i) {
                    return i.indexOf(t) === e;
                })
                .forEach(function (t) {
                    he(t, t.childNodes), ue(t);
                });
        }
        var me = /^\s*<(\w+|!)[^>]*>/,
            ge = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
        function ve(t) {
            var e = ge.exec(t);
            if (e) return document.createElement(e[1]);
            var i = document.createElement("div");
            return (
                me.test(t)
                    ? i.insertAdjacentHTML("beforeend", t.trim())
                    : (i.textContent = t),
                1 < i.childNodes.length ? F(i.childNodes) : i.firstChild
            );
        }
        function we(t, e) {
            if (t && 1 === t.nodeType)
                for (e(t), t = t.firstElementChild; t; )
                    we(t, e), (t = t.nextElementSibling);
        }
        function be(t, e) {
            return _(t) ? (xe(t) ? H(ve(t)) : at(t, e)) : H(t);
        }
        function ye(t, e) {
            return _(t) ? (xe(t) ? F(ve(t)) : ht(t, e)) : F(t);
        }
        function xe(t) {
            return "<" === t[0] || t.match(/^\s*</);
        }
        function ke(t) {
            for (var e = [], i = arguments.length - 1; 0 < i--; )
                e[i] = arguments[i + 1];
            Ae(t, e, "add");
        }
        function $e(t) {
            for (var e = [], i = arguments.length - 1; 0 < i--; )
                e[i] = arguments[i + 1];
            Ae(t, e, "remove");
        }
        function Ie(t, e) {
            tt(t, "class", function (t) {
                return (t || "").replace(
                    new RegExp("\\b" + e + "\\b", "g"),
                    "",
                );
            });
        }
        function Se(t) {
            for (var e = [], i = arguments.length - 1; 0 < i--; )
                e[i] = arguments[i + 1];
            e[0] && $e(t, e[0]), e[1] && ke(t, e[1]);
        }
        function Te(t, e) {
            return (
                e &&
                F(t).some(function (t) {
                    return t.classList.contains(e.split(" ")[0]);
                })
            );
        }
        function Ee(t) {
            for (var n = [], e = arguments.length - 1; 0 < e--; )
                n[e] = arguments[e + 1];
            if (n.length) {
                var r = _((n = Ce(n))[n.length - 1]) ? [] : n.pop();
                (n = n.filter(Boolean)),
                    F(t).forEach(function (t) {
                        for (var e = t.classList, i = 0; i < n.length; i++)
                            _e.Force
                                ? e.toggle.apply(e, [n[i]].concat(r))
                                : e[
                                      (O(r) ? !e.contains(n[i]) : r)
                                          ? "add"
                                          : "remove"
                                  ](n[i]);
                    });
            }
        }
        function Ae(t, i, n) {
            (i = Ce(i).filter(Boolean)).length &&
                F(t).forEach(function (t) {
                    var e = t.classList;
                    _e.Multiple
                        ? e[n].apply(e, i)
                        : i.forEach(function (t) {
                              return e[n](t);
                          });
                });
        }
        function Ce(t) {
            return t.reduce(function (t, e) {
                return t.concat.call(
                    t,
                    _(e) && b(e, " ") ? e.trim().split(" ") : e,
                );
            }, []);
        }
        var Ne,
            _e = {};
        (Ne = document.createElement("_").classList) &&
            (Ne.add("a", "b"),
            Ne.toggle("c", !1),
            (_e.Multiple = Ne.contains("b")),
            (_e.Force = !Ne.contains("c")));
        var Me = {
            "animation-iteration-count": !(Ne = null),
            "column-count": !0,
            "fill-opacity": !0,
            "flex-grow": !0,
            "flex-shrink": !0,
            "font-weight": !0,
            "line-height": !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            "stroke-dasharray": !0,
            "stroke-dashoffset": !0,
            widows: !0,
            "z-index": !0,
            zoom: !0,
        };
        function De(t, e, r) {
            return F(t).map(function (i) {
                if (_(e)) {
                    if (((e = Le(e)), O(r))) return Be(i, e);
                    r || M(r)
                        ? (i.style[e] = D(r) && !Me[e] ? r + "px" : r)
                        : i.style.removeProperty(e);
                } else {
                    if (y(e)) {
                        var n = Oe(i);
                        return e.reduce(function (t, e) {
                            return (t[e] = n[Le(e)]), t;
                        }, {});
                    }
                    k(e) &&
                        q(e, function (t, e) {
                            return De(i, e, t);
                        });
                }
                return i;
            })[0];
        }
        function Oe(t, e) {
            return (t = H(t)).ownerDocument.defaultView.getComputedStyle(t, e);
        }
        function Be(t, e, i) {
            return Oe(t, i)[e];
        }
        var ze = {};
        function Pe(t) {
            var e = document.documentElement;
            if (!Rt) return Oe(e).getPropertyValue("--uk-" + t);
            if (!(t in ze)) {
                var i = ae(e, document.createElement("div"));
                ke(i, "uk-" + t),
                    (ze[t] = Be(i, "content", ":before").replace(
                        /^["'](.*)["']$/,
                        "$1",
                    )),
                    ue(i);
            }
            return ze[t];
        }
        var He = {};
        function Le(t) {
            var e = He[t];
            return (
                e ||
                    (e = He[t] =
                        (function (t) {
                            if ((t = m(t)) in je) return t;
                            var e,
                                i = Fe.length;
                            for (; i--; )
                                if ((e = "-" + Fe[i] + "-" + t) in je) return e;
                        })(t) || t),
                e
            );
        }
        var Fe = ["webkit", "moz", "ms"],
            je = document.createElement("_").style;
        function We(t, s, a, h) {
            return (
                void 0 === a && (a = 400),
                void 0 === h && (h = "linear"),
                Pt.all(
                    F(t).map(function (o) {
                        return new Pt(function (i, n) {
                            for (var t in s) {
                                var e = De(o, t);
                                "" === e && De(o, t, e);
                            }
                            var r = setTimeout(function () {
                                return _t(o, "transitionend");
                            }, a);
                            Nt(
                                o,
                                "transitionend transitioncanceled",
                                function (t) {
                                    var e = t.type;
                                    clearTimeout(r),
                                        $e(o, "uk-transition"),
                                        De(o, {
                                            "transition-property": "",
                                            "transition-duration": "",
                                            "transition-timing-function": "",
                                        }),
                                        "transitioncanceled" === e ? n() : i();
                                },
                                !1,
                                function (t) {
                                    var e = t.target;
                                    return o === e;
                                },
                            ),
                                ke(o, "uk-transition"),
                                De(
                                    o,
                                    R(
                                        {
                                            "transition-property": Object.keys(
                                                s,
                                            )
                                                .map(Le)
                                                .join(","),
                                            "transition-duration": a + "ms",
                                            "transition-timing-function": h,
                                        },
                                        s,
                                    ),
                                );
                        });
                    }),
                )
            );
        }
        var Ve = {
                start: We,
                stop: function (t) {
                    return _t(t, "transitionend"), Pt.resolve();
                },
                cancel: function (t) {
                    _t(t, "transitioncanceled");
                },
                inProgress: function (t) {
                    return Te(t, "uk-transition");
                },
            },
            Ye = "uk-animation-",
            Re = "uk-cancel-animation";
        function qe(t, e, i, a, h) {
            var l = arguments;
            return (
                void 0 === i && (i = 200),
                Pt.all(
                    F(t).map(function (s) {
                        return new Pt(function (n, r) {
                            if (Te(s, Re))
                                requestAnimationFrame(function () {
                                    return Pt.resolve().then(function () {
                                        return qe.apply(void 0, l).then(n, r);
                                    });
                                });
                            else {
                                var t = e + " " + Ye + (h ? "leave" : "enter");
                                w(e, Ye) &&
                                    (a && (t += " uk-transform-origin-" + a),
                                    h && (t += " " + Ye + "reverse")),
                                    o(),
                                    Nt(
                                        s,
                                        "animationend animationcancel",
                                        function (t) {
                                            var e = t.type,
                                                i = !1;
                                            "animationcancel" === e
                                                ? (r(), o())
                                                : (n(),
                                                  Pt.resolve().then(
                                                      function () {
                                                          (i = !0), o();
                                                      },
                                                  )),
                                                requestAnimationFrame(
                                                    function () {
                                                        i ||
                                                            (ke(s, Re),
                                                            requestAnimationFrame(
                                                                function () {
                                                                    return $e(
                                                                        s,
                                                                        Re,
                                                                    );
                                                                },
                                                            ));
                                                    },
                                                );
                                        },
                                        !1,
                                        function (t) {
                                            var e = t.target;
                                            return s === e;
                                        },
                                    ),
                                    De(s, "animationDuration", i + "ms"),
                                    ke(s, t);
                            }
                            function o() {
                                De(s, "animationDuration", ""),
                                    Ie(s, Ye + "\\S*");
                            }
                        });
                    }),
                )
            );
        }
        var Ue = new RegExp(Ye + "(enter|leave)"),
            Xe = {
                in: function (t, e, i, n) {
                    return qe(t, e, i, n, !1);
                },
                out: function (t, e, i, n) {
                    return qe(t, e, i, n, !0);
                },
                inProgress: function (t) {
                    return Ue.test(tt(t, "class"));
                },
                cancel: function (t) {
                    _t(t, "animationcancel");
                },
            },
            Ke = {
                width: ["x", "left", "right"],
                height: ["y", "top", "bottom"],
            };
        function Ge(t, e, c, u, d, i, n, r) {
            (c = oi(c)), (u = oi(u));
            var f = {
                element: c,
                target: u,
            };
            if (!t || !e) return f;
            var p = Ze(t),
                m = Ze(e),
                g = m;
            if (
                (ri(g, c, p, -1),
                ri(g, u, m, 1),
                (d = si(d, p.width, p.height)),
                (i = si(i, m.width, m.height)),
                (d.x += i.x),
                (d.y += i.y),
                (g.left += d.x),
                (g.top += d.y),
                n)
            ) {
                var o = [Ze(pi(t))];
                r && o.unshift(Ze(r)),
                    q(Ke, function (t, s) {
                        var a = t[0],
                            h = t[1],
                            l = t[2];
                        (!0 === n || b(n, a)) &&
                            o.some(function (n) {
                                var t =
                                        c[a] === h
                                            ? -p[s]
                                            : c[a] === l
                                            ? p[s]
                                            : 0,
                                    e =
                                        u[a] === h
                                            ? m[s]
                                            : u[a] === l
                                            ? -m[s]
                                            : 0;
                                if (g[h] < n[h] || g[h] + p[s] > n[l]) {
                                    var i = p[s] / 2,
                                        r = "center" === u[a] ? -m[s] / 2 : 0;
                                    return (
                                        ("center" === c[a] &&
                                            (o(i, r) || o(-i, -r))) ||
                                        o(t, e)
                                    );
                                }
                                function o(e, t) {
                                    var i = g[h] + e + t - 2 * d[a];
                                    if (i >= n[h] && i + p[s] <= n[l])
                                        return (
                                            (g[h] = i),
                                            ["element", "target"].forEach(
                                                function (t) {
                                                    f[t][a] = e
                                                        ? f[t][a] === Ke[s][1]
                                                            ? Ke[s][2]
                                                            : Ke[s][1]
                                                        : f[t][a];
                                                },
                                            ),
                                            !0
                                        );
                                }
                            });
                    });
            }
            return Je(t, g), f;
        }
        function Je(i, n) {
            if (((i = H(i)), !n)) return Ze(i);
            var r = Je(i),
                o = De(i, "position");
            ["left", "top"].forEach(function (t) {
                if (t in n) {
                    var e = De(i, t);
                    De(
                        i,
                        t,
                        n[t] -
                            r[t] +
                            P("absolute" === o && "auto" === e ? Qe(i)[t] : e),
                    );
                }
            });
        }
        function Ze(t) {
            var e,
                i,
                n = pi((t = H(t))),
                r = n.pageYOffset,
                o = n.pageXOffset;
            if (I(t)) {
                var s = t.innerHeight,
                    a = t.innerWidth;
                return {
                    top: r,
                    left: o,
                    height: s,
                    width: a,
                    bottom: r + s,
                    right: o + a,
                };
            }
            $t(t) ||
                ((e = tt(t, "style")),
                (i = tt(t, "hidden")),
                tt(t, {
                    style: (e || "") + ";display:block !important;",
                    hidden: null,
                }));
            var h = t.getBoundingClientRect();
            return (
                O(e) ||
                    tt(t, {
                        style: e,
                        hidden: i,
                    }),
                {
                    height: h.height,
                    width: h.width,
                    top: h.top + r,
                    left: h.left + o,
                    bottom: h.bottom + r,
                    right: h.right + o,
                }
            );
        }
        function Qe(n) {
            var r = (n = H(n)).offsetParent || mi(n).documentElement,
                o = Je(r),
                t = ["top", "left"].reduce(function (t, e) {
                    var i = f(e);
                    return (
                        (t[e] -=
                            o[e] +
                            P(De(n, "margin" + i)) +
                            P(De(r, "border" + i + "Width"))),
                        t
                    );
                }, Je(n));
            return {
                top: t.top,
                left: t.left,
            };
        }
        var ti = ii("height"),
            ei = ii("width");
        function ii(n) {
            var r = f(n);
            return function (t, e) {
                if (((t = H(t)), O(e))) {
                    if (I(t)) return t["inner" + r];
                    if (S(t)) {
                        var i = t.documentElement;
                        return Math.max(i["offset" + r], i["scroll" + r]);
                    }
                    return (
                        (e =
                            "auto" === (e = De(t, n))
                                ? t["offset" + r]
                                : P(e) || 0) - ni(n, t)
                    );
                }
                De(t, n, e || 0 === e ? +e + ni(n, t) + "px" : "");
            };
        }
        function ni(t, i, e) {
            return (
                void 0 === e && (e = "border-box"),
                De(i, "boxSizing") === e
                    ? Ke[t]
                          .slice(1)
                          .map(f)
                          .reduce(function (t, e) {
                              return (
                                  t +
                                  P(De(i, "padding" + e)) +
                                  P(De(i, "border" + e + "Width"))
                              );
                          }, 0)
                    : 0
            );
        }
        function ri(o, s, a, h) {
            q(Ke, function (t, e) {
                var i = t[0],
                    n = t[1],
                    r = t[2];
                s[i] === r
                    ? (o[n] += a[e] * h)
                    : "center" === s[i] && (o[n] += (a[e] * h) / 2);
            });
        }
        function oi(t) {
            var e = /left|center|right/,
                i = /top|center|bottom/;
            return (
                1 === (t = (t || "").split(" ")).length &&
                    (t = e.test(t[0])
                        ? t.concat(["center"])
                        : i.test(t[0])
                        ? ["center"].concat(t)
                        : ["center", "center"]),
                {
                    x: e.test(t[0]) ? t[0] : "center",
                    y: i.test(t[1]) ? t[1] : "center",
                }
            );
        }
        function si(t, e, i) {
            var n = (t || "").split(" "),
                r = n[0],
                o = n[1];
            return {
                x: r ? P(r) * (c(r, "%") ? e / 100 : 1) : 0,
                y: o ? P(o) * (c(o, "%") ? i / 100 : 1) : 0,
            };
        }
        function ai(t) {
            switch (t) {
                case "left":
                    return "right";
                case "right":
                    return "left";
                case "top":
                    return "bottom";
                case "bottom":
                    return "top";
                default:
                    return t;
            }
        }
        function hi(t, e, i) {
            if ((void 0 === e && (e = 0), void 0 === i && (i = 0), !$t(t)))
                return !1;
            var n = pi((t = H(t))),
                r = t.getBoundingClientRect(),
                o = {
                    top: -e,
                    left: -i,
                    bottom: e + ti(n),
                    right: i + ei(n),
                };
            return (
                J(r, o) ||
                Z(
                    {
                        x: r.left,
                        y: r.top,
                    },
                    o,
                )
            );
        }
        function li(t, e) {
            if ((void 0 === e && (e = 0), !$t(t))) return 0;
            var i = pi((t = H(t))),
                n = mi(t),
                r = t.offsetHeight + e,
                o = ui(t)[0],
                s = ti(i),
                a = s + Math.min(0, o - s),
                h = Math.max(0, s - (ti(n) + e - (o + r)));
            return K(
                (a + i.pageYOffset - o) /
                    ((a + (r - (h < s ? h : 0))) / 100) /
                    100,
            );
        }
        function ci(t, e) {
            if (I((t = H(t))) || S(t)) {
                var i = pi(t);
                (0, i.scrollTo)(i.pageXOffset, e);
            } else t.scrollTop = e;
        }
        function ui(t) {
            var e = [0, 0];
            do {
                if (
                    ((e[0] += t.offsetTop),
                    (e[1] += t.offsetLeft),
                    "fixed" === De(t, "position"))
                ) {
                    var i = pi(t);
                    return (e[0] += i.pageYOffset), (e[1] += i.pageXOffset), e;
                }
            } while ((t = t.offsetParent));
            return e;
        }
        function di(t, e, i) {
            return (
                void 0 === e && (e = "width"),
                void 0 === i && (i = window),
                D(t)
                    ? +t
                    : c(t, "vh")
                    ? fi(ti(pi(i)), t)
                    : c(t, "vw")
                    ? fi(ei(pi(i)), t)
                    : c(t, "%")
                    ? fi(Ze(i)[e], t)
                    : P(t)
            );
        }
        function fi(t, e) {
            return (t * P(e)) / 100;
        }
        function pi(t) {
            return I(t) ? t : mi(t).defaultView;
        }
        function mi(t) {
            return H(t).ownerDocument;
        }
        var gi = {
            reads: [],
            writes: [],
            read: function (t) {
                return this.reads.push(t), vi(), t;
            },
            write: function (t) {
                return this.writes.push(t), vi(), t;
            },
            clear: function (t) {
                return bi(this.reads, t) || bi(this.writes, t);
            },
            flush: function () {
                wi(this.reads),
                    wi(this.writes.splice(0, this.writes.length)),
                    (this.scheduled = !1),
                    (this.reads.length || this.writes.length) && vi();
            },
        };
        function vi() {
            gi.scheduled ||
                ((gi.scheduled = !0), requestAnimationFrame(gi.flush.bind(gi)));
        }
        function wi(t) {
            for (var e; (e = t.shift()); ) e();
        }
        function bi(t, e) {
            var i = t.indexOf(e);
            return !!~i && !!t.splice(i, 1);
        }
        function yi() {}
        function xi(t, e) {
            return (e.y - t.y) / (e.x - t.x);
        }
        yi.prototype = {
            positions: [],
            position: null,
            init: function () {
                var n = this;
                (this.positions = []), (this.position = null);
                var r = !1;
                this.unbind = At(document, "mousemove", function (i) {
                    r ||
                        (setTimeout(function () {
                            var t = Date.now(),
                                e = n.positions.length;
                            e &&
                                100 < t - n.positions[e - 1].time &&
                                n.positions.splice(0, e),
                                n.positions.push({
                                    time: t,
                                    x: i.pageX,
                                    y: i.pageY,
                                }),
                                5 < n.positions.length && n.positions.shift(),
                                (r = !1);
                        }, 5),
                        (r = !0));
                });
            },
            cancel: function () {
                this.unbind && this.unbind();
            },
            movesTo: function (t) {
                if (this.positions.length < 2) return !1;
                var e = Je(t),
                    i = this.positions[this.positions.length - 1],
                    n = this.positions[0];
                if (
                    e.left <= i.x &&
                    i.x <= e.right &&
                    e.top <= i.y &&
                    i.y <= e.bottom
                )
                    return !1;
                var r = [
                    [
                        {
                            x: e.left,
                            y: e.top,
                        },
                        {
                            x: e.right,
                            y: e.bottom,
                        },
                    ],
                    [
                        {
                            x: e.right,
                            y: e.top,
                        },
                        {
                            x: e.left,
                            y: e.bottom,
                        },
                    ],
                ];
                return (
                    e.right <= i.x ||
                        (e.left >= i.x
                            ? (r[0].reverse(), r[1].reverse())
                            : e.bottom <= i.y
                            ? r[0].reverse()
                            : e.top >= i.y && r[1].reverse()),
                    !!r.reduce(function (t, e) {
                        return (
                            t +
                            (xi(n, e[0]) < xi(i, e[0]) &&
                                xi(n, e[1]) > xi(i, e[1]))
                        );
                    }, 0)
                );
            },
        };
        var ki = {};
        function $i(t, e, i) {
            return ki.computed(
                x(t) ? t.call(i, i) : t,
                x(e) ? e.call(i, i) : e,
            );
        }
        function Ii(t, e) {
            return (
                (t = t && !y(t) ? [t] : t),
                e ? (t ? t.concat(e) : y(e) ? e : [e]) : t
            );
        }
        function Si(e, i, n) {
            var r = {};
            if (
                (x(i) && (i = i.options),
                i.extends && (e = Si(e, i.extends, n)),
                i.mixins)
            )
                for (var t = 0, o = i.mixins.length; t < o; t++)
                    e = Si(e, i.mixins[t], n);
            for (var s in e) h(s);
            for (var a in i) l(e, a) || h(a);
            function h(t) {
                r[t] = (
                    ki[t] ||
                    function (t, e) {
                        return O(e) ? t : e;
                    }
                )(e[t], i[t], n);
            }
            return r;
        }
        function Ti(t, e) {
            var i;
            void 0 === e && (e = []);
            try {
                return t
                    ? w(t, "{")
                        ? JSON.parse(t)
                        : e.length && !b(t, ":")
                        ? (((i = {})[e[0]] = t), i)
                        : t.split(";").reduce(function (t, e) {
                              var i = e.split(/:(.*)/),
                                  n = i[0],
                                  r = i[1];
                              return n && !O(r) && (t[n.trim()] = r.trim()), t;
                          }, {})
                    : {};
            } catch (t) {
                return {};
            }
        }
        (ki.events =
            ki.created =
            ki.beforeConnect =
            ki.connected =
            ki.beforeDisconnect =
            ki.disconnected =
            ki.destroy =
                Ii),
            (ki.args = function (t, e) {
                return Ii(e || t);
            }),
            (ki.update = function (t, e) {
                return U(
                    Ii(
                        t,
                        x(e)
                            ? {
                                  read: e,
                              }
                            : e,
                    ),
                    "order",
                );
            }),
            (ki.props = function (t, e) {
                return (
                    y(e) &&
                        (e = e.reduce(function (t, e) {
                            return (t[e] = String), t;
                        }, {})),
                    ki.methods(t, e)
                );
            }),
            (ki.computed = ki.methods =
                function (t, e) {
                    return e ? (t ? R({}, t, e) : e) : t;
                }),
            (ki.data = function (e, i, t) {
                return t
                    ? $i(e, i, t)
                    : i
                    ? e
                        ? function (t) {
                              return $i(e, i, t);
                          }
                        : i
                    : e;
            });
        var Ei = 0,
            Ai = function (t) {
                (this.id = ++Ei), (this.el = H(t));
            };
        function Ci(t, e) {
            try {
                t.contentWindow.postMessage(
                    JSON.stringify(
                        R(
                            {
                                event: "command",
                            },
                            e,
                        ),
                    ),
                    "*",
                );
            } catch (t) {}
        }
        (Ai.prototype.isVideo = function () {
            return this.isYoutube() || this.isVimeo() || this.isHTML5();
        }),
            (Ai.prototype.isHTML5 = function () {
                return "VIDEO" === this.el.tagName;
            }),
            (Ai.prototype.isIFrame = function () {
                return "IFRAME" === this.el.tagName;
            }),
            (Ai.prototype.isYoutube = function () {
                return (
                    this.isIFrame() &&
                    !!this.el.src.match(
                        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/,
                    )
                );
            }),
            (Ai.prototype.isVimeo = function () {
                return (
                    this.isIFrame() &&
                    !!this.el.src.match(/vimeo\.com\/video\/.*/)
                );
            }),
            (Ai.prototype.enableApi = function () {
                var e = this;
                if (this.ready) return this.ready;
                var i,
                    r = this.isYoutube(),
                    o = this.isVimeo();
                return r || o
                    ? (this.ready = new Pt(function (t) {
                          var n;
                          Nt(e.el, "load", function () {
                              if (r) {
                                  var t = function () {
                                      return Ci(e.el, {
                                          event: "listening",
                                          id: e.id,
                                      });
                                  };
                                  (i = setInterval(t, 100)), t();
                              }
                          }),
                              ((n = function (t) {
                                  return (
                                      (r &&
                                          t.id === e.id &&
                                          "onReady" === t.event) ||
                                      (o && Number(t.player_id) === e.id)
                                  );
                              }),
                              new Pt(function (i) {
                                  Nt(
                                      window,
                                      "message",
                                      function (t, e) {
                                          return i(e);
                                      },
                                      !1,
                                      function (t) {
                                          var e = t.data;
                                          if (e && _(e)) {
                                              try {
                                                  e = JSON.parse(e);
                                              } catch (t) {
                                                  return;
                                              }
                                              return e && n(e);
                                          }
                                      },
                                  );
                              })).then(function () {
                                  t(), i && clearInterval(i);
                              }),
                              tt(
                                  e.el,
                                  "src",
                                  e.el.src +
                                      (b(e.el.src, "?") ? "&" : "?") +
                                      (r
                                          ? "enablejsapi=1"
                                          : "api=1&player_id=" + e.id),
                              );
                      }))
                    : Pt.resolve();
            }),
            (Ai.prototype.play = function () {
                var t = this;
                if (this.isVideo())
                    if (this.isIFrame())
                        this.enableApi().then(function () {
                            return Ci(t.el, {
                                func: "playVideo",
                                method: "play",
                            });
                        });
                    else if (this.isHTML5())
                        try {
                            var e = this.el.play();
                            e && e.catch(G);
                        } catch (t) {}
            }),
            (Ai.prototype.pause = function () {
                var t = this;
                this.isVideo() &&
                    (this.isIFrame()
                        ? this.enableApi().then(function () {
                              return Ci(t.el, {
                                  func: "pauseVideo",
                                  method: "pause",
                              });
                          })
                        : this.isHTML5() && this.el.pause());
            }),
            (Ai.prototype.mute = function () {
                var t = this;
                this.isVideo() &&
                    (this.isIFrame()
                        ? this.enableApi().then(function () {
                              return Ci(t.el, {
                                  func: "mute",
                                  method: "setVolume",
                                  value: 0,
                              });
                          })
                        : this.isHTML5() &&
                          ((this.el.muted = !0), tt(this.el, "muted", "")));
            });
        var Ni,
            _i =
                "IntersectionObserver" in window
                    ? window.IntersectionObserver
                    : (function () {
                          function t(e, t) {
                              var i = this;
                              void 0 === t && (t = {});
                              var n = t.rootMargin;
                              void 0 === n && (n = "0 0"), (this.targets = []);
                              var r,
                                  o = (n || "0 0").split(" ").map(P),
                                  s = o[0],
                                  a = o[1];
                              (this.offsetTop = s),
                                  (this.offsetLeft = a),
                                  (this.apply = function () {
                                      r ||
                                          (r = requestAnimationFrame(
                                              function () {
                                                  return setTimeout(
                                                      function () {
                                                          var t =
                                                              i.takeRecords();
                                                          t.length && e(t, i),
                                                              (r = !1);
                                                      },
                                                  );
                                              },
                                          ));
                                  }),
                                  (this.off = At(
                                      window,
                                      "scroll resize load",
                                      this.apply,
                                      {
                                          passive: !0,
                                          capture: !0,
                                      },
                                  ));
                          }
                          return (
                              (t.prototype.takeRecords = function () {
                                  var i = this;
                                  return this.targets.filter(function (t) {
                                      var e = hi(
                                          t.target,
                                          i.offsetTop,
                                          i.offsetLeft,
                                      );
                                      if (
                                          null === t.isIntersecting ||
                                          e ^ t.isIntersecting
                                      )
                                          return (t.isIntersecting = e), !0;
                                  });
                              }),
                              (t.prototype.observe = function (t) {
                                  this.targets.push({
                                      target: t,
                                      isIntersecting: null,
                                  }),
                                      this.apply();
                              }),
                              (t.prototype.disconnect = function () {
                                  (this.targets = []), this.off();
                              }),
                              t
                          );
                      })();
        function Mi(t) {
            return "touch" === t.pointerType || t.touches;
        }
        function Di(t, e) {
            void 0 === e && (e = "client");
            var i = t.touches,
                n = t.changedTouches,
                r = (i && i[0]) || (n && n[0]) || t;
            return {
                x: r[e + "X"],
                y: r[e + "Y"],
            };
        }
        function Oi(t) {
            return (
                !(!w(t, "uk-") && !w(t, "data-uk-")) &&
                g(t.replace("data-uk-", "").replace("uk-", ""))
            );
        }
        At(document, Gt, function (t) {
            if ((Ni && Ni(), Mi(t))) {
                var s = Di(t),
                    a = "tagName" in t.target ? t.target : t.target.parentNode;
                Ni = Nt(document, Zt, function (t) {
                    var e = Di(t),
                        r = e.x,
                        o = e.y;
                    ((a && r && 100 < Math.abs(s.x - r)) ||
                        (o && 100 < Math.abs(s.y - o))) &&
                        setTimeout(function () {
                            var t, e, i, n;
                            _t(a, "swipe"),
                                _t(
                                    a,
                                    "swipe" +
                                        ((t = s.x),
                                        (e = s.y),
                                        (i = r),
                                        (n = o),
                                        Math.abs(t - i) >= Math.abs(e - n)
                                            ? 0 < t - i
                                                ? "Left"
                                                : "Right"
                                            : 0 < e - n
                                            ? "Up"
                                            : "Down"),
                                );
                        });
                });
            }
        });
        var Bi,
            zi,
            Pi,
            Hi,
            Li = function (t) {
                this._init(t);
            };
        (Li.util = Object.freeze({
            ajax: Vt,
            getImage: Yt,
            transition: We,
            Transition: Ve,
            animate: qe,
            Animation: Xe,
            attr: tt,
            hasAttr: et,
            removeAttr: it,
            data: nt,
            addClass: ke,
            removeClass: $e,
            removeClasses: Ie,
            replaceClass: Se,
            hasClass: Te,
            toggleClass: Ee,
            positionAt: Ge,
            offset: Je,
            position: Qe,
            height: ti,
            width: ei,
            boxModelAdjust: ni,
            flipPosition: ai,
            isInView: hi,
            scrolledOver: li,
            scrollTop: ci,
            offsetPosition: ui,
            toPx: di,
            ready: ie,
            index: ne,
            getIndex: re,
            empty: oe,
            html: se,
            prepend: function (e, t) {
                return (e = be(e)).hasChildNodes()
                    ? ce(t, function (t) {
                          return e.insertBefore(t, e.firstChild);
                      })
                    : ae(e, t);
            },
            append: ae,
            before: he,
            after: le,
            remove: ue,
            wrapAll: de,
            wrapInner: fe,
            unwrap: pe,
            fragment: ve,
            apply: we,
            $: be,
            $$: ye,
            isIE: Rt,
            isRtl: qt,
            hasTouch: Kt,
            pointerDown: Gt,
            pointerMove: Jt,
            pointerUp: Zt,
            pointerEnter: Qt,
            pointerLeave: te,
            pointerCancel: ee,
            on: At,
            off: Ct,
            once: Nt,
            trigger: _t,
            createEvent: Mt,
            toEventTargets: zt,
            fastdom: gi,
            isVoidElement: kt,
            isVisible: $t,
            selInput: It,
            isInput: St,
            filter: Tt,
            within: Et,
            bind: p,
            hasOwn: l,
            hyphenate: m,
            camelize: g,
            ucfirst: f,
            startsWith: w,
            endsWith: c,
            includes: b,
            isArray: y,
            isFunction: x,
            isObject: k,
            isPlainObject: $,
            isWindow: I,
            isDocument: S,
            isJQuery: T,
            isNode: E,
            isNodeCollection: C,
            isBoolean: N,
            isString: _,
            isNumber: M,
            isNumeric: D,
            isUndefined: O,
            toBoolean: B,
            toNumber: z,
            toFloat: P,
            toNode: H,
            toNodes: F,
            toList: j,
            toMs: W,
            isEqual: V,
            swap: Y,
            assign: R,
            each: q,
            sortBy: U,
            uniqueBy: X,
            clamp: K,
            noop: G,
            intersectRect: J,
            pointInRect: Z,
            Dimensions: Q,
            MouseTracker: yi,
            mergeOptions: Si,
            parseOptions: Ti,
            Player: Ai,
            Promise: Pt,
            Deferred: Ht,
            IntersectionObserver: _i,
            query: rt,
            queryAll: ot,
            find: at,
            findAll: ht,
            matches: mt,
            closest: vt,
            parents: wt,
            escape: yt,
            css: De,
            getStyles: Oe,
            getStyle: Be,
            getCssVar: Pe,
            propName: Le,
            isTouch: Mi,
            getPos: Di,
        })),
            (Li.data = "__uikit__"),
            (Li.prefix = "uk-"),
            (Li.options = {}),
            (function (i) {
                var e,
                    n = i.data;
                function r(t, e) {
                    if (t)
                        for (var i in t) t[i]._connected && t[i]._callUpdate(e);
                }
                (i.use = function (t) {
                    if (!t.installed)
                        return t.call(null, this), (t.installed = !0), this;
                }),
                    (i.mixin = function (t, e) {
                        (e = (_(e) ? i.component(e) : e) || this).options = Si(
                            e.options,
                            t,
                        );
                    }),
                    (i.extend = function (t) {
                        t = t || {};
                        var e = function (t) {
                            this._init(t);
                        };
                        return (
                            (((e.prototype = Object.create(
                                this.prototype,
                            )).constructor = e).options = Si(this.options, t)),
                            (e.super = this),
                            (e.extend = this.extend),
                            e
                        );
                    }),
                    (i.update = function (t, e) {
                        (function t(e, i) {
                            e &&
                                e !== document.body &&
                                e.parentNode &&
                                (t(e.parentNode, i), i(e.parentNode));
                        })((t = t ? H(t) : document.body), function (t) {
                            return r(t[n], e);
                        }),
                            we(t, function (t) {
                                return r(t[n], e);
                            });
                    }),
                    Object.defineProperty(i, "container", {
                        get: function () {
                            return e || document.body;
                        },
                        set: function (t) {
                            e = be(t);
                        },
                    });
            })(Li),
            ((Bi = Li).prototype._callHook = function (t) {
                var e = this,
                    i = this.$options[t];
                i &&
                    i.forEach(function (t) {
                        return t.call(e);
                    });
            }),
            (Bi.prototype._callConnected = function () {
                this._connected ||
                    ((this._data = {}),
                    (this._computeds = {}),
                    this._initProps(),
                    this._callHook("beforeConnect"),
                    (this._connected = !0),
                    this._initEvents(),
                    this._initObserver(),
                    this._callHook("connected"),
                    this._callUpdate());
            }),
            (Bi.prototype._callDisconnected = function () {
                this._connected &&
                    (this._callHook("beforeDisconnect"),
                    this._observer &&
                        (this._observer.disconnect(), (this._observer = null)),
                    this._unbindEvents(),
                    this._callHook("disconnected"),
                    (this._connected = !1));
            }),
            (Bi.prototype._callUpdate = function (t) {
                var o = this;
                void 0 === t && (t = "update");
                var s = t.type || t;
                b(["update", "resize"], s) && this._callWatches();
                var e = this.$options.update,
                    i = this._frames,
                    a = i.reads,
                    h = i.writes;
                e &&
                    e.forEach(function (t, e) {
                        var i = t.read,
                            n = t.write,
                            r = t.events;
                        ("update" === s || b(r, s)) &&
                            (i &&
                                !b(gi.reads, a[e]) &&
                                (a[e] = gi.read(function () {
                                    var t =
                                        o._connected && i.call(o, o._data, s);
                                    !1 === t && n
                                        ? gi.clear(h[e])
                                        : $(t) && R(o._data, t);
                                })),
                            n &&
                                !b(gi.writes, h[e]) &&
                                (h[e] = gi.write(function () {
                                    return (
                                        o._connected && n.call(o, o._data, s)
                                    );
                                })));
                    });
            }),
            (function (t) {
                var e = 0;
                function s(t, e) {
                    var i = {},
                        n = t.args;
                    void 0 === n && (n = []);
                    var r = t.props;
                    void 0 === r && (r = {});
                    var o = t.el;
                    if (!r) return i;
                    for (var s in r) {
                        var a = m(s),
                            h = nt(o, a);
                        if (!O(h)) {
                            if (
                                ((h =
                                    (r[s] === Boolean && "" === h) ||
                                    d(r[s], h)),
                                "target" === a && (!h || w(h, "_")))
                            )
                                continue;
                            i[s] = h;
                        }
                    }
                    var l = Ti(nt(o, e), n);
                    for (var c in l) {
                        var u = g(c);
                        void 0 !== r[u] && (i[u] = d(r[u], l[c]));
                    }
                    return i;
                }
                function i(n, r, o) {
                    Object.defineProperty(n, r, {
                        enumerable: !0,
                        get: function () {
                            var t = n._computeds,
                                e = n.$props,
                                i = n.$el;
                            return (
                                l(t, r) || (t[r] = (o.get || o).call(n, e, i)),
                                t[r]
                            );
                        },
                        set: function (t) {
                            var e = n._computeds;
                            (e[r] = o.set ? o.set.call(n, t) : t),
                                O(e[r]) && delete e[r];
                        },
                    });
                }
                function f(e, i, n) {
                    $(i) ||
                        (i = {
                            name: n,
                            handler: i,
                        });
                    var r,
                        o,
                        t = i.name,
                        s = i.el,
                        a = i.handler,
                        h = i.capture,
                        l = i.passive,
                        c = i.delegate,
                        u = i.filter,
                        d = i.self;
                    (s = x(s) ? s.call(e) : s || e.$el),
                        y(s)
                            ? s.forEach(function (t) {
                                  return f(
                                      e,
                                      R({}, i, {
                                          el: t,
                                      }),
                                      n,
                                  );
                              })
                            : !s ||
                              (u && !u.call(e)) ||
                              ((r = _(a) ? e[a] : p(a, e)),
                              (a = function (t) {
                                  return y(t.detail)
                                      ? r.apply(void 0, [t].concat(t.detail))
                                      : r(t);
                              }),
                              d &&
                                  ((o = a),
                                  (a = function (t) {
                                      if (
                                          t.target === t.currentTarget ||
                                          t.target === t.current
                                      )
                                          return o.call(null, t);
                                  })),
                              e._events.push(
                                  At(
                                      s,
                                      t,
                                      c ? (_(c) ? c : c.call(e)) : null,
                                      a,
                                      N(l)
                                          ? {
                                                passive: l,
                                                capture: h,
                                            }
                                          : h,
                                  ),
                              ));
                }
                function n(t, e) {
                    return t.every(function (t) {
                        return !t || !l(t, e);
                    });
                }
                function d(t, e) {
                    return t === Boolean
                        ? B(e)
                        : t === Number
                        ? z(e)
                        : "list" === t
                        ? j(e)
                        : t
                        ? t(e)
                        : e;
                }
                (t.prototype._init = function (t) {
                    ((t = t || {}).data = (function (t, e) {
                        var i = t.data,
                            n = (t.el, e.args),
                            r = e.props;
                        if (
                            (void 0 === r && (r = {}),
                            (i = y(i)
                                ? n && n.length
                                    ? i
                                          .slice(0, n.length)
                                          .reduce(function (t, e, i) {
                                              return (
                                                  $(e)
                                                      ? R(t, e)
                                                      : (t[n[i]] = e),
                                                  t
                                              );
                                          }, {})
                                    : void 0
                                : i))
                        )
                            for (var o in i)
                                O(i[o])
                                    ? delete i[o]
                                    : (i[o] = r[o] ? d(r[o], i[o]) : i[o]);
                        return i;
                    })(t, this.constructor.options)),
                        (this.$options = Si(this.constructor.options, t, this)),
                        (this.$el = null),
                        (this.$props = {}),
                        (this._frames = {
                            reads: {},
                            writes: {},
                        }),
                        (this._events = []),
                        (this._uid = e++),
                        this._initData(),
                        this._initMethods(),
                        this._initComputeds(),
                        this._callHook("created"),
                        t.el && this.$mount(t.el);
                }),
                    (t.prototype._initData = function () {
                        var t = this.$options.data;
                        for (var e in (void 0 === t && (t = {}), t))
                            this.$props[e] = this[e] = t[e];
                    }),
                    (t.prototype._initMethods = function () {
                        var t = this.$options.methods;
                        if (t) for (var e in t) this[e] = p(t[e], this);
                    }),
                    (t.prototype._initComputeds = function () {
                        var t = this.$options.computed;
                        if (((this._computeds = {}), t))
                            for (var e in t) i(this, e, t[e]);
                    }),
                    (t.prototype._callWatches = function () {
                        var t = this.$options.computed,
                            e = this._computeds;
                        for (var i in e) {
                            var n = e[i];
                            delete e[i],
                                t[i].watch &&
                                    !V(n, this[i]) &&
                                    t[i].watch.call(this, this[i], n);
                        }
                    }),
                    (t.prototype._initProps = function (t) {
                        var e;
                        for (e in (t = t || s(this.$options, this.$name)))
                            O(t[e]) || (this.$props[e] = t[e]);
                        var i = [this.$options.computed, this.$options.methods];
                        for (e in this.$props)
                            e in t && n(i, e) && (this[e] = this.$props[e]);
                    }),
                    (t.prototype._initEvents = function () {
                        var i = this,
                            t = this.$options.events;
                        t &&
                            t.forEach(function (t) {
                                if (l(t, "handler")) f(i, t);
                                else for (var e in t) f(i, t[e], e);
                            });
                    }),
                    (t.prototype._unbindEvents = function () {
                        this._events.forEach(function (t) {
                            return t();
                        }),
                            (this._events = []);
                    }),
                    (t.prototype._initObserver = function () {
                        var i = this,
                            t = this.$options,
                            n = t.attrs,
                            e = t.props,
                            r = t.el;
                        if (!this._observer && e && !1 !== n) {
                            (n = y(n) ? n : Object.keys(e)),
                                (this._observer = new MutationObserver(
                                    function () {
                                        var e = s(i.$options, i.$name);
                                        n.some(function (t) {
                                            return (
                                                !O(e[t]) && e[t] !== i.$props[t]
                                            );
                                        }) && i.$reset();
                                    },
                                ));
                            var o = n
                                .map(function (t) {
                                    return m(t);
                                })
                                .concat(this.$name);
                            this._observer.observe(r, {
                                attributes: !0,
                                attributeFilter: o.concat(
                                    o.map(function (t) {
                                        return "data-" + t;
                                    }),
                                ),
                            });
                        }
                    });
            })(Li),
            (Pi = (zi = Li).data),
            (Hi = {}),
            (zi.component = function (s, t) {
                if (!t) return $(Hi[s]) && (Hi[s] = zi.extend(Hi[s])), Hi[s];
                zi[s] = function (t, i) {
                    for (var e = arguments.length, n = Array(e); e--; )
                        n[e] = arguments[e];
                    var r = zi.component(s);
                    return $(t)
                        ? new r({
                              data: t,
                          })
                        : r.options.functional
                        ? new r({
                              data: [].concat(n),
                          })
                        : t && t.nodeType
                        ? o(t)
                        : ye(t).map(o)[0];
                    function o(t) {
                        var e = zi.getComponent(t, s);
                        if (e) {
                            if (!i) return e;
                            e.$destroy();
                        }
                        return new r({
                            el: t,
                            data: i,
                        });
                    }
                };
                var e = $(t) ? R({}, t) : t.options;
                if (
                    ((e.name = s),
                    e.install && e.install(zi, e, s),
                    zi._initialized && !e.functional)
                ) {
                    var i = m(s);
                    gi.read(function () {
                        return zi[s]("[uk-" + i + "],[data-uk-" + i + "]");
                    });
                }
                return (Hi[s] = $(t) ? e : t);
            }),
            (zi.getComponents = function (t) {
                return (t && t[Pi]) || {};
            }),
            (zi.getComponent = function (t, e) {
                return zi.getComponents(t)[e];
            }),
            (zi.connect = function (t) {
                if (t[Pi]) for (var e in t[Pi]) t[Pi][e]._callConnected();
                for (var i = 0; i < t.attributes.length; i++) {
                    var n = Oi(t.attributes[i].name);
                    n && n in Hi && zi[n](t);
                }
            }),
            (zi.disconnect = function (t) {
                for (var e in t[Pi]) t[Pi][e]._callDisconnected();
            }),
            (function (n) {
                var r = n.data;
                (n.prototype.$mount = function (t) {
                    var e = this.$options.name;
                    t[r] || (t[r] = {}),
                        t[r][e] ||
                            (((t[r][e] = this).$el = this.$options.el =
                                this.$options.el || t),
                            Et(t, document) && this._callConnected());
                }),
                    (n.prototype.$emit = function (t) {
                        this._callUpdate(t);
                    }),
                    (n.prototype.$reset = function () {
                        this._callDisconnected(), this._callConnected();
                    }),
                    (n.prototype.$destroy = function (t) {
                        void 0 === t && (t = !1);
                        var e = this.$options,
                            i = e.el,
                            n = e.name;
                        i && this._callDisconnected(),
                            this._callHook("destroy"),
                            i &&
                                i[r] &&
                                (delete i[r][n],
                                Object.keys(i[r]).length || delete i[r],
                                t && ue(this.$el));
                    }),
                    (n.prototype.$create = function (t, e, i) {
                        return n[t](e, i);
                    }),
                    (n.prototype.$update = n.update),
                    (n.prototype.$getComponent = n.getComponent);
                var e = {};
                Object.defineProperties(n.prototype, {
                    $container: Object.getOwnPropertyDescriptor(n, "container"),
                    $name: {
                        get: function () {
                            var t = this.$options.name;
                            return e[t] || (e[t] = n.prefix + m(t)), e[t];
                        },
                    },
                });
            })(Li);
        var Fi = {
                connected: function () {
                    !Te(this.$el, this.$name) && ke(this.$el, this.$name);
                },
            },
            ji = {
                props: {
                    cls: Boolean,
                    animation: "list",
                    duration: Number,
                    origin: String,
                    transition: String,
                    queued: Boolean,
                },
                data: {
                    cls: !1,
                    animation: [!1],
                    duration: 200,
                    origin: !1,
                    transition: "linear",
                    queued: !1,
                    initProps: {
                        overflow: "",
                        height: "",
                        paddingTop: "",
                        paddingBottom: "",
                        marginTop: "",
                        marginBottom: "",
                    },
                    hideProps: {
                        overflow: "hidden",
                        height: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        marginTop: 0,
                        marginBottom: 0,
                    },
                },
                computed: {
                    hasAnimation: function (t) {
                        return !!t.animation[0];
                    },
                    hasTransition: function (t) {
                        var e = t.animation;
                        return this.hasAnimation && !0 === e[0];
                    },
                },
                methods: {
                    toggleElement: function (l, c, u) {
                        var d = this;
                        return new Pt(function (t) {
                            l = F(l);
                            var e,
                                i = function (t) {
                                    return Pt.all(
                                        t.map(function (t) {
                                            return d._toggleElement(t, c, u);
                                        }),
                                    );
                                },
                                n = l.filter(function (t) {
                                    return d.isToggled(t);
                                }),
                                r = l.filter(function (t) {
                                    return !b(n, t);
                                });
                            if (
                                d.queued &&
                                O(u) &&
                                O(c) &&
                                d.hasAnimation &&
                                !(l.length < 2)
                            ) {
                                var o = document.body,
                                    s = o.scrollTop,
                                    a = n[0],
                                    h =
                                        (Xe.inProgress(a) &&
                                            Te(a, "uk-animation-leave")) ||
                                        (Ve.inProgress(a) &&
                                            "0px" === a.style.height);
                                (e = i(n)),
                                    h ||
                                        (e = e.then(function () {
                                            var t = i(r);
                                            return (o.scrollTop = s), t;
                                        }));
                            } else e = i(r.concat(n));
                            e.then(t, G);
                        });
                    },
                    toggleNow: function (e, i) {
                        var n = this;
                        return new Pt(function (t) {
                            return Pt.all(
                                F(e).map(function (t) {
                                    return n._toggleElement(t, i, !1);
                                }),
                            ).then(t, G);
                        });
                    },
                    isToggled: function (t) {
                        var e = F(t || this.$el);
                        return this.cls
                            ? Te(e, this.cls.split(" ")[0])
                            : !et(e, "hidden");
                    },
                    updateAria: function (t) {
                        !1 === this.cls &&
                            tt(t, "aria-hidden", !this.isToggled(t));
                    },
                    _toggleElement: function (t, e, i) {
                        var n = this;
                        if (
                            ((e = N(e)
                                ? e
                                : Xe.inProgress(t)
                                ? Te(t, "uk-animation-leave")
                                : Ve.inProgress(t)
                                ? "0px" === t.style.height
                                : !this.isToggled(t)),
                            !_t(t, "before" + (e ? "show" : "hide"), [this]))
                        )
                            return Pt.reject();
                        var r,
                            o,
                            s,
                            a,
                            h,
                            l,
                            c,
                            u,
                            d,
                            f,
                            p,
                            m,
                            g = (
                                x(i)
                                    ? i
                                    : !1 !== i && this.hasAnimation
                                    ? this.hasTransition
                                        ? ((c = (l = this).isToggled),
                                          (u = l.duration),
                                          (d = l.initProps),
                                          (f = l.hideProps),
                                          (p = l.transition),
                                          (m = l._toggle),
                                          function (t, e) {
                                              var i = Ve.inProgress(t),
                                                  n = t.hasChildNodes
                                                      ? P(
                                                            De(
                                                                t.firstElementChild,
                                                                "marginTop",
                                                            ),
                                                        ) +
                                                        P(
                                                            De(
                                                                t.lastElementChild,
                                                                "marginBottom",
                                                            ),
                                                        )
                                                      : 0,
                                                  r = $t(t)
                                                      ? ti(t) + (i ? 0 : n)
                                                      : 0;
                                              Ve.cancel(t),
                                                  c(t) || m(t, !0),
                                                  ti(t, ""),
                                                  gi.flush();
                                              var o = ti(t) + (i ? 0 : n);
                                              return (
                                                  ti(t, r),
                                                  (e
                                                      ? Ve.start(
                                                            t,
                                                            R({}, d, {
                                                                overflow:
                                                                    "hidden",
                                                                height: o,
                                                            }),
                                                            Math.round(
                                                                u * (1 - r / o),
                                                            ),
                                                            p,
                                                        )
                                                      : Ve.start(
                                                            t,
                                                            f,
                                                            Math.round(
                                                                u * (r / o),
                                                            ),
                                                            p,
                                                        ).then(function () {
                                                            return m(t, !1);
                                                        })
                                                  ).then(function () {
                                                      return De(t, d);
                                                  })
                                              );
                                          })
                                        : ((o = (r = this).animation),
                                          (s = r.duration),
                                          (a = r.origin),
                                          (h = r._toggle),
                                          function (t, e) {
                                              return (
                                                  Xe.cancel(t),
                                                  e
                                                      ? (h(t, !0),
                                                        Xe.in(t, o[0], s, a))
                                                      : Xe.out(
                                                            t,
                                                            o[1] || o[0],
                                                            s,
                                                            a,
                                                        ).then(function () {
                                                            return h(t, !1);
                                                        })
                                              );
                                          })
                                    : this._toggle
                            )(t, e);
                        _t(t, e ? "show" : "hide", [this]);
                        var v = function () {
                            _t(t, e ? "shown" : "hidden", [n]), n.$update(t);
                        };
                        return g ? g.then(v) : Pt.resolve(v());
                    },
                    _toggle: function (t, e) {
                        var i;
                        t &&
                            ((e = Boolean(e)),
                            this.cls
                                ? (i =
                                      b(this.cls, " ") ||
                                      e !== Te(t, this.cls)) &&
                                  Ee(t, this.cls, b(this.cls, " ") ? void 0 : e)
                                : (i = e === et(t, "hidden")) &&
                                  tt(t, "hidden", e ? null : ""),
                            ye("[autofocus]", t).some(function (t) {
                                return $t(t) ? t.focus() || !0 : t.blur();
                            }),
                            this.updateAria(t),
                            i && this.$update(t));
                    },
                },
            };
        var Wi = {
                mixins: [Fi, ji],
                props: {
                    targets: String,
                    active: null,
                    collapsible: Boolean,
                    multiple: Boolean,
                    toggle: String,
                    content: String,
                    transition: String,
                },
                data: {
                    targets: "> *",
                    active: !1,
                    animation: [!0],
                    collapsible: !0,
                    multiple: !1,
                    clsOpen: "uk-open",
                    toggle: "> .uk-accordion-title",
                    content: "> .uk-accordion-content",
                    transition: "ease",
                },
                computed: {
                    items: function (t, e) {
                        return ye(t.targets, e);
                    },
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return this.targets + " " + this.$props.toggle;
                        },
                        handler: function (t) {
                            t.preventDefault(),
                                this.toggle(
                                    ne(
                                        ye(
                                            this.targets +
                                                " " +
                                                this.$props.toggle,
                                            this.$el,
                                        ),
                                        t.current,
                                    ),
                                );
                        },
                    },
                ],
                connected: function () {
                    if (!1 !== this.active) {
                        var t = this.items[Number(this.active)];
                        t && !Te(t, this.clsOpen) && this.toggle(t, !1);
                    }
                },
                update: function () {
                    var e = this;
                    this.items.forEach(function (t) {
                        return e._toggle(be(e.content, t), Te(t, e.clsOpen));
                    });
                    var t =
                        !this.collapsible &&
                        !Te(this.items, this.clsOpen) &&
                        this.items[0];
                    t && this.toggle(t, !1);
                },
                methods: {
                    toggle: function (r, o) {
                        var s = this,
                            t = re(r, this.items),
                            a = Tt(this.items, "." + this.clsOpen);
                        (r = this.items[t]) &&
                            [r]
                                .concat((!this.multiple && !b(a, r) && a) || [])
                                .forEach(function (t) {
                                    var e = t === r,
                                        i = e && !Te(t, s.clsOpen);
                                    if (
                                        i ||
                                        !e ||
                                        s.collapsible ||
                                        !(a.length < 2)
                                    ) {
                                        Ee(t, s.clsOpen, i);
                                        var n = t._wrapper
                                            ? t._wrapper.firstElementChild
                                            : be(s.content, t);
                                        t._wrapper ||
                                            ((t._wrapper = de(n, "<div>")),
                                            tt(
                                                t._wrapper,
                                                "hidden",
                                                i ? "" : null,
                                            )),
                                            s._toggle(n, !0),
                                            s
                                                .toggleElement(t._wrapper, i, o)
                                                .then(function () {
                                                    Te(t, s.clsOpen) === i &&
                                                        (i || s._toggle(n, !1),
                                                        (t._wrapper = null),
                                                        pe(n));
                                                });
                                    }
                                });
                    },
                },
            },
            Vi = {
                mixins: [Fi, ji],
                args: "animation",
                props: {
                    close: String,
                },
                data: {
                    animation: [!0],
                    selClose: ".uk-alert-close",
                    duration: 150,
                    hideProps: R(
                        {
                            opacity: 0,
                        },
                        ji.data.hideProps,
                    ),
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return this.selClose;
                        },
                        handler: function (t) {
                            t.preventDefault(), this.close();
                        },
                    },
                ],
                methods: {
                    close: function () {
                        var t = this;
                        this.toggleElement(this.$el).then(function () {
                            return t.$destroy(!0);
                        });
                    },
                },
            };
        function Yi(r) {
            ie(function () {
                var i;
                r.update(),
                    At(window, "load resize", function () {
                        return r.update(null, "resize");
                    }),
                    At(
                        document,
                        "loadedmetadata load",
                        function (t) {
                            var e = t.target;
                            return r.update(e, "resize");
                        },
                        !0,
                    ),
                    At(
                        window,
                        "scroll",
                        function (t) {
                            if (!i) {
                                (i = !0),
                                    gi.write(function () {
                                        return (i = !1);
                                    });
                                var e = t.target;
                                r.update(
                                    1 !== e.nodeType ? document.body : e,
                                    t.type,
                                );
                            }
                        },
                        {
                            passive: !0,
                            capture: !0,
                        },
                    );
                var n = 0;
                At(
                    document,
                    "animationstart",
                    function (t) {
                        var e = t.target;
                        (De(e, "animationName") || "").match(
                            /^uk-.*(left|right)/,
                        ) &&
                            (n++,
                            De(document.body, "overflowX", "hidden"),
                            setTimeout(function () {
                                --n || De(document.body, "overflowX", "");
                            }, W(De(e, "animationDuration")) + 100));
                    },
                    !0,
                );
            });
        }
        var Ri,
            qi,
            Ui = {
                args: "autoplay",
                props: {
                    automute: Boolean,
                    autoplay: Boolean,
                },
                data: {
                    automute: !1,
                    autoplay: !0,
                },
                computed: {
                    inView: function (t) {
                        return "inview" === t.autoplay;
                    },
                },
                connected: function () {
                    this.inView &&
                        !et(this.$el, "preload") &&
                        (this.$el.preload = "none"),
                        (this.player = new Ai(this.$el)),
                        this.automute && this.player.mute();
                },
                update: {
                    read: function () {
                        return (
                            !!this.player && {
                                visible:
                                    $t(this.$el) &&
                                    "hidden" !== De(this.$el, "visibility"),
                                inView: this.inView && hi(this.$el),
                            }
                        );
                    },
                    write: function (t) {
                        var e = t.visible,
                            i = t.inView;
                        !e || (this.inView && !i)
                            ? this.player.pause()
                            : (!0 === this.autoplay || (this.inView && i)) &&
                              this.player.play();
                    },
                    events: ["resize", "scroll"],
                },
            },
            Xi = {
                mixins: [Fi, Ui],
                props: {
                    width: Number,
                    height: Number,
                },
                data: {
                    automute: !0,
                },
                update: {
                    read: function () {
                        var t = this.$el;
                        if (!$t(t)) return !1;
                        var e = t.parentNode;
                        return {
                            height: e.offsetHeight,
                            width: e.offsetWidth,
                        };
                    },
                    write: function (t) {
                        var e = t.height,
                            i = t.width,
                            n = this.$el,
                            r =
                                this.width ||
                                n.naturalWidth ||
                                n.videoWidth ||
                                n.clientWidth,
                            o =
                                this.height ||
                                n.naturalHeight ||
                                n.videoHeight ||
                                n.clientHeight;
                        r &&
                            o &&
                            De(
                                n,
                                Q.cover(
                                    {
                                        width: r,
                                        height: o,
                                    },
                                    {
                                        width: i + (i % 2 ? 1 : 0),
                                        height: e + (e % 2 ? 1 : 0),
                                    },
                                ),
                            );
                    },
                    events: ["resize"],
                },
            },
            Ki = {
                props: {
                    pos: String,
                    offset: null,
                    flip: Boolean,
                    clsPos: String,
                },
                data: {
                    pos: "bottom-" + (qt ? "right" : "left"),
                    flip: !0,
                    offset: !1,
                    clsPos: "",
                },
                computed: {
                    pos: function (t) {
                        var e = t.pos;
                        return (e + (b(e, "-") ? "" : "-center")).split("-");
                    },
                    dir: function () {
                        return this.pos[0];
                    },
                    align: function () {
                        return this.pos[1];
                    },
                },
                methods: {
                    positionAt: function (t, e, i) {
                        var n;
                        Ie(
                            t,
                            this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?",
                        ),
                            De(t, {
                                top: "",
                                left: "",
                            });
                        var r = this.offset,
                            o = this.getAxis();
                        D(r) ||
                            (r = (n = be(r))
                                ? Je(n)["x" === o ? "left" : "top"] -
                                  Je(e)["x" === o ? "right" : "bottom"]
                                : 0);
                        var s = Ge(
                                t,
                                e,
                                "x" === o
                                    ? ai(this.dir) + " " + this.align
                                    : this.align + " " + ai(this.dir),
                                "x" === o
                                    ? this.dir + " " + this.align
                                    : this.align + " " + this.dir,
                                "x" === o
                                    ? "" + ("left" === this.dir ? -r : r)
                                    : " " + ("top" === this.dir ? -r : r),
                                null,
                                this.flip,
                                i,
                            ).target,
                            a = s.x,
                            h = s.y;
                        (this.dir = "x" === o ? a : h),
                            (this.align = "x" === o ? h : a),
                            Ee(
                                t,
                                this.clsPos + "-" + this.dir + "-" + this.align,
                                !1 === this.offset,
                            );
                    },
                    getAxis: function () {
                        return "top" === this.dir || "bottom" === this.dir
                            ? "y"
                            : "x";
                    },
                },
            },
            Gi = {
                mixins: [Ki, ji],
                args: "pos",
                props: {
                    mode: "list",
                    toggle: Boolean,
                    boundary: Boolean,
                    boundaryAlign: Boolean,
                    delayShow: Number,
                    delayHide: Number,
                    clsDrop: String,
                },
                data: {
                    mode: ["click", "hover"],
                    toggle: "- *",
                    boundary: window,
                    boundaryAlign: !1,
                    delayShow: 0,
                    delayHide: 800,
                    clsDrop: !1,
                    hoverIdle: 200,
                    animation: ["uk-animation-fade"],
                    cls: "uk-open",
                },
                computed: {
                    boundary: function (t, e) {
                        return rt(t.boundary, e);
                    },
                    clsDrop: function (t) {
                        return t.clsDrop || "uk-" + this.$options.name;
                    },
                    clsPos: function () {
                        return this.clsDrop;
                    },
                },
                created: function () {
                    this.tracker = new yi();
                },
                connected: function () {
                    ke(this.$el, this.clsDrop);
                    var t = this.$props.toggle;
                    (this.toggle =
                        t &&
                        this.$create("toggle", rt(t, this.$el), {
                            target: this.$el,
                            mode: this.mode,
                        })),
                        !this.toggle && _t(this.$el, "updatearia");
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return "." + this.clsDrop + "-close";
                        },
                        handler: function (t) {
                            t.preventDefault(), this.hide(!1);
                        },
                    },
                    {
                        name: "click",
                        delegate: function () {
                            return 'a[href^="#"]';
                        },
                        handler: function (t) {
                            if (!t.defaultPrevented) {
                                var e = t.target.hash;
                                e || t.preventDefault(),
                                    (e && Et(e, this.$el)) || this.hide(!1);
                            }
                        },
                    },
                    {
                        name: "beforescroll",
                        handler: function () {
                            this.hide(!1);
                        },
                    },
                    {
                        name: "toggle",
                        self: !0,
                        handler: function (t, e) {
                            t.preventDefault(),
                                this.isToggled()
                                    ? this.hide(!1)
                                    : this.show(e, !1);
                        },
                    },
                    {
                        name: Qt,
                        filter: function () {
                            return b(this.mode, "hover");
                        },
                        handler: function (t) {
                            Mi(t) ||
                                (Ri &&
                                    Ri !== this &&
                                    Ri.toggle &&
                                    b(Ri.toggle.mode, "hover") &&
                                    !Et(t.target, Ri.toggle.$el) &&
                                    !Z(
                                        {
                                            x: t.pageX,
                                            y: t.pageY,
                                        },
                                        Je(Ri.$el),
                                    ) &&
                                    Ri.hide(!1),
                                t.preventDefault(),
                                this.show(this.toggle));
                        },
                    },
                    {
                        name: "toggleshow",
                        handler: function (t, e) {
                            (e && !b(e.target, this.$el)) ||
                                (t.preventDefault(),
                                this.show(e || this.toggle));
                        },
                    },
                    {
                        name: "togglehide " + te,
                        handler: function (t, e) {
                            Mi(t) ||
                                (e && !b(e.target, this.$el)) ||
                                (t.preventDefault(),
                                this.toggle &&
                                    b(this.toggle.mode, "hover") &&
                                    this.hide());
                        },
                    },
                    {
                        name: "beforeshow",
                        self: !0,
                        handler: function () {
                            this.clearTimers(),
                                Xe.cancel(this.$el),
                                this.position();
                        },
                    },
                    {
                        name: "show",
                        self: !0,
                        handler: function () {
                            this.tracker.init(),
                                _t(this.$el, "updatearia"),
                                (function () {
                                    if (qi) return;
                                    (qi = !0),
                                        At(document, Zt, function (t) {
                                            var e,
                                                i = t.target,
                                                n = t.defaultPrevented;
                                            if (!n)
                                                for (
                                                    ;
                                                    Ri &&
                                                    Ri !== e &&
                                                    !Et(i, Ri.$el) &&
                                                    (!Ri.toggle ||
                                                        !Et(i, Ri.toggle.$el));

                                                )
                                                    (e = Ri).hide(!1);
                                        });
                                })();
                        },
                    },
                    {
                        name: "beforehide",
                        self: !0,
                        handler: function () {
                            this.clearTimers();
                        },
                    },
                    {
                        name: "hide",
                        handler: function (t) {
                            var e = t.target;
                            this.$el === e
                                ? ((Ri = this.isActive() ? null : Ri),
                                  _t(this.$el, "updatearia"),
                                  this.tracker.cancel())
                                : (Ri =
                                      null === Ri &&
                                      Et(e, this.$el) &&
                                      this.isToggled()
                                          ? this
                                          : Ri);
                        },
                    },
                    {
                        name: "updatearia",
                        self: !0,
                        handler: function (t, e) {
                            t.preventDefault(),
                                this.updateAria(this.$el),
                                (e || this.toggle) &&
                                    (tt(
                                        (e || this.toggle).$el,
                                        "aria-expanded",
                                        this.isToggled() ? "true" : "false",
                                    ),
                                    Ee(
                                        this.toggle.$el,
                                        this.cls,
                                        this.isToggled(),
                                    ));
                        },
                    },
                ],
                update: {
                    write: function () {
                        this.isToggled() &&
                            !Xe.inProgress(this.$el) &&
                            this.position();
                    },
                    events: ["resize"],
                },
                methods: {
                    show: function (e, i) {
                        var n = this;
                        void 0 === i && (i = !0);
                        var r = function () {
                                return (
                                    !n.isToggled() && n.toggleElement(n.$el, !0)
                                );
                            },
                            t = function () {
                                if (
                                    ((n.toggle = e || n.toggle),
                                    n.clearTimers(),
                                    !n.isActive())
                                )
                                    if (i && Ri && Ri !== n && Ri.isDelaying)
                                        n.showTimer = setTimeout(n.show, 10);
                                    else {
                                        if (n.isParentOf(Ri)) {
                                            if (!Ri.hideTimer) return;
                                            Ri.hide(!1);
                                        } else if (Ri && n.isChildOf(Ri))
                                            Ri.clearTimers();
                                        else if (
                                            Ri &&
                                            !n.isChildOf(Ri) &&
                                            !n.isParentOf(Ri)
                                        )
                                            for (
                                                var t;
                                                Ri &&
                                                Ri !== t &&
                                                !n.isChildOf(Ri);

                                            )
                                                (t = Ri).hide(!1);
                                        i && n.delayShow
                                            ? (n.showTimer = setTimeout(
                                                  r,
                                                  n.delayShow,
                                              ))
                                            : r(),
                                            (Ri = n);
                                    }
                            };
                        e && this.toggle && e.$el !== this.toggle.$el
                            ? (Nt(this.$el, "hide", t), this.hide(!1))
                            : t();
                    },
                    hide: function (t) {
                        var e = this;
                        void 0 === t && (t = !0);
                        var i = function () {
                            return e.toggleNow(e.$el, !1);
                        };
                        this.clearTimers(),
                            (this.isDelaying = this.tracker.movesTo(this.$el)),
                            t && this.isDelaying
                                ? (this.hideTimer = setTimeout(
                                      this.hide,
                                      this.hoverIdle,
                                  ))
                                : t && this.delayHide
                                ? (this.hideTimer = setTimeout(
                                      i,
                                      this.delayHide,
                                  ))
                                : i();
                    },
                    clearTimers: function () {
                        clearTimeout(this.showTimer),
                            clearTimeout(this.hideTimer),
                            (this.showTimer = null),
                            (this.hideTimer = null),
                            (this.isDelaying = !1);
                    },
                    isActive: function () {
                        return Ri === this;
                    },
                    isChildOf: function (t) {
                        return t && t !== this && Et(this.$el, t.$el);
                    },
                    isParentOf: function (t) {
                        return t && t !== this && Et(t.$el, this.$el);
                    },
                    position: function () {
                        Ie(this.$el, this.clsDrop + "-(stack|boundary)"),
                            De(this.$el, {
                                top: "",
                                left: "",
                                display: "block",
                            }),
                            Ee(
                                this.$el,
                                this.clsDrop + "-boundary",
                                this.boundaryAlign,
                            );
                        var t = Je(this.boundary),
                            e = this.boundaryAlign ? t : Je(this.toggle.$el);
                        if ("justify" === this.align) {
                            var i = "y" === this.getAxis() ? "width" : "height";
                            De(this.$el, i, e[i]);
                        } else
                            this.$el.offsetWidth >
                                Math.max(t.right - e.left, e.right - t.left) &&
                                ke(this.$el, this.clsDrop + "-stack");
                        this.positionAt(
                            this.$el,
                            this.boundaryAlign
                                ? this.boundary
                                : this.toggle.$el,
                            this.boundary,
                        ),
                            De(this.$el, "display", "");
                    },
                },
            };
        var Ji = {
                extends: Gi,
            },
            Zi = {
                mixins: [Fi],
                args: "target",
                props: {
                    target: Boolean,
                },
                data: {
                    target: !1,
                },
                computed: {
                    input: function (t, e) {
                        return be(It, e);
                    },
                    state: function () {
                        return this.input.nextElementSibling;
                    },
                    target: function (t, e) {
                        var i = t.target;
                        return (
                            i &&
                            ((!0 === i &&
                                this.input.parentNode === e &&
                                this.input.nextElementSibling) ||
                                rt(i, e))
                        );
                    },
                },
                update: function () {
                    var t = this.target,
                        e = this.input;
                    if (t) {
                        var i,
                            n = St(t) ? "value" : "textContent",
                            r = t[n],
                            o =
                                e.files && e.files[0]
                                    ? e.files[0].name
                                    : mt(e, "select") &&
                                      (i = ye("option", e).filter(function (t) {
                                          return t.selected;
                                      })[0])
                                    ? i.textContent
                                    : e.value;
                        r !== o && (t[n] = o);
                    }
                },
                events: {
                    change: function () {
                        this.$emit();
                    },
                },
            },
            Qi = {
                update: {
                    read: function (t) {
                        var e = hi(this.$el);
                        if (!e || t.isInView === e) return !1;
                        t.isInView = e;
                    },
                    write: function () {
                        this.$el.src = this.$el.src;
                    },
                    events: ["scroll", "resize"],
                },
            },
            tn = {
                props: {
                    margin: String,
                    firstColumn: Boolean,
                },
                data: {
                    margin: "uk-margin-small-top",
                    firstColumn: "uk-first-column",
                },
                update: {
                    read: function (t) {
                        var e = this.$el.children;
                        if (!e.length || !$t(this.$el)) return (t.rows = [[]]);
                        (t.rows = en(e)),
                            (t.stacks = !t.rows.some(function (t) {
                                return 1 < t.length;
                            }));
                    },
                    write: function (t) {
                        var n = this;
                        t.rows.forEach(function (t, i) {
                            return t.forEach(function (t, e) {
                                Ee(t, n.margin, 0 !== i),
                                    Ee(t, n.firstColumn, 0 === e);
                            });
                        });
                    },
                    events: ["resize"],
                },
            };
        function en(t) {
            for (var e = [[]], i = 0; i < t.length; i++) {
                var n = t[i],
                    r = nn(n);
                if (r.height)
                    for (var o = e.length - 1; 0 <= o; o--) {
                        var s = e[o];
                        if (!s[0]) {
                            s.push(n);
                            break;
                        }
                        var a = void 0;
                        if (
                            ((a =
                                s[0].offsetParent === n.offsetParent
                                    ? nn(s[0])
                                    : ((r = nn(n, !0)), nn(s[0], !0))),
                            r.top >= a.bottom - 1)
                        ) {
                            e.push([n]);
                            break;
                        }
                        if (r.bottom > a.top) {
                            if (r.left < a.left && !qt) {
                                s.unshift(n);
                                break;
                            }
                            s.push(n);
                            break;
                        }
                        if (0 === o) {
                            e.unshift([n]);
                            break;
                        }
                    }
            }
            return e;
        }
        function nn(t, e) {
            var i;
            void 0 === e && (e = !1);
            var n = t.offsetTop,
                r = t.offsetLeft,
                o = t.offsetHeight;
            return (
                e && ((n = (i = ui(t))[0]), (r = i[1])),
                {
                    top: n,
                    left: r,
                    height: o,
                    bottom: n + o,
                }
            );
        }
        var rn = {
            extends: tn,
            mixins: [Fi],
            name: "grid",
            props: {
                masonry: Boolean,
                parallax: Number,
            },
            data: {
                margin: "uk-grid-margin",
                clsStack: "uk-grid-stack",
                masonry: !1,
                parallax: 0,
            },
            computed: {
                length: function (t, e) {
                    return e.children.length;
                },
                parallax: function (t) {
                    var e = t.parallax;
                    return e && this.length ? Math.abs(e) : "";
                },
            },
            connected: function () {
                this.masonry && ke(this.$el, "uk-flex-top uk-flex-wrap-top");
            },
            update: [
                {
                    read: function (t) {
                        var r = t.rows;
                        (this.masonry || this.parallax) &&
                            ((r = r.map(function (t) {
                                return U(t, "offsetLeft");
                            })),
                            qt &&
                                r.map(function (t) {
                                    return t.reverse();
                                }));
                        var e,
                            i,
                            n,
                            o,
                            s,
                            a = r.some(function (t) {
                                return t.some(Ve.inProgress);
                            }),
                            h = !1,
                            l = "";
                        if (this.masonry && this.length) {
                            var c = 0;
                            (h = r.reduce(function (i, t, n) {
                                return (
                                    (i[n] = t.map(function (t, e) {
                                        return 0 === n
                                            ? 0
                                            : P(i[n - 1][e]) +
                                                  (c -
                                                      P(
                                                          r[n - 1][e] &&
                                                              r[n - 1][e]
                                                                  .offsetHeight,
                                                      ));
                                    })),
                                    (c = t.reduce(function (t, e) {
                                        return Math.max(t, e.offsetHeight);
                                    }, 0)),
                                    i
                                );
                            }, [])),
                                (s = r),
                                (l =
                                    Math.max.apply(
                                        Math,
                                        s.reduce(function (i, t) {
                                            return (
                                                t.forEach(function (t, e) {
                                                    return (i[e] =
                                                        (i[e] || 0) +
                                                        t.offsetHeight);
                                                }),
                                                i
                                            );
                                        }, []),
                                    ) +
                                    ((e = this.$el),
                                    (i = this.margin),
                                    (n = F(e.children)),
                                    P(
                                        (o = n.filter(function (t) {
                                            return Te(t, i);
                                        })[0])
                                            ? De(o, "marginTop")
                                            : De(n[0], "paddingLeft"),
                                    ) *
                                        (r.length - 1)));
                        }
                        return {
                            rows: r,
                            translates: h,
                            height: !a && l,
                        };
                    },
                    write: function (t) {
                        var e = t.stacks,
                            i = t.height;
                        Ee(this.$el, this.clsStack, e),
                            De(this.$el, "paddingBottom", this.parallax),
                            !1 !== i && De(this.$el, "height", i);
                    },
                    events: ["resize"],
                },
                {
                    read: function (t) {
                        var e = t.height;
                        return {
                            scrolled:
                                !!this.parallax &&
                                li(this.$el, e ? e - ti(this.$el) : 0) *
                                    this.parallax,
                        };
                    },
                    write: function (t) {
                        var e = t.rows,
                            n = t.scrolled,
                            r = t.translates;
                        (!1 !== n || r) &&
                            e.forEach(function (t, i) {
                                return t.forEach(function (t, e) {
                                    return De(
                                        t,
                                        "transform",
                                        n || r
                                            ? "translateY(" +
                                                  ((r && -r[i][e]) +
                                                      (n
                                                          ? e % 2
                                                              ? n
                                                              : n / 8
                                                          : 0)) +
                                                  "px)"
                                            : "",
                                    );
                                });
                            });
                    },
                    events: ["scroll", "resize"],
                },
            ],
        };
        var on = Rt
                ? {
                      data: {
                          selMinHeight: !1,
                          forceHeight: !1,
                      },
                      computed: {
                          elements: function (t, e) {
                              var i = t.selMinHeight;
                              return i ? ye(i, e) : [e];
                          },
                      },
                      update: [
                          {
                              read: function () {
                                  De(this.elements, "height", "");
                              },
                              order: -5,
                              events: ["resize"],
                          },
                          {
                              write: function () {
                                  var i = this;
                                  this.elements.forEach(function (t) {
                                      var e = P(De(t, "minHeight"));
                                      e &&
                                          (i.forceHeight ||
                                              Math.round(
                                                  e +
                                                      ni(
                                                          "height",
                                                          t,
                                                          "content-box",
                                                      ),
                                              ) >= t.offsetHeight) &&
                                          De(t, "height", e);
                                  });
                              },
                              order: 5,
                              events: ["resize"],
                          },
                      ],
                  }
                : {},
            sn = {
                mixins: [on],
                args: "target",
                props: {
                    target: String,
                    row: Boolean,
                },
                data: {
                    target: "> *",
                    row: !0,
                    forceHeight: !0,
                },
                computed: {
                    elements: function (t, e) {
                        return ye(t.target, e);
                    },
                },
                update: {
                    read: function () {
                        return {
                            rows: (this.row
                                ? en(this.elements)
                                : [this.elements]
                            ).map(an),
                        };
                    },
                    write: function (t) {
                        t.rows.forEach(function (t) {
                            var i = t.heights;
                            return t.elements.forEach(function (t, e) {
                                return De(t, "minHeight", i[e]);
                            });
                        });
                    },
                    events: ["resize"],
                },
            };
        function an(t) {
            var e;
            if (t.length < 2)
                return {
                    heights: [""],
                    elements: t,
                };
            var i = hn(t),
                n = i.heights,
                r = i.max,
                o = t.some(function (t) {
                    return t.style.minHeight;
                }),
                s = t.some(function (t, e) {
                    return !t.style.minHeight && n[e] < r;
                });
            return (
                o &&
                    s &&
                    (De(t, "minHeight", ""),
                    (e = hn(t)),
                    (n = e.heights),
                    (r = e.max)),
                {
                    heights: (n = t.map(function (t, e) {
                        return n[e] === r &&
                            P(t.style.minHeight).toFixed(2) !== r.toFixed(2)
                            ? ""
                            : r;
                    })),
                    elements: t,
                }
            );
        }
        function hn(t) {
            var e = t.map(function (t) {
                return Je(t).height - ni("height", t, "content-box");
            });
            return {
                heights: e,
                max: Math.max.apply(null, e),
            };
        }
        var ln = {
            mixins: [on],
            props: {
                expand: Boolean,
                offsetTop: Boolean,
                offsetBottom: Boolean,
                minHeight: Number,
            },
            data: {
                expand: !1,
                offsetTop: !1,
                offsetBottom: !1,
                minHeight: 0,
            },
            update: {
                read: function () {
                    var t = "",
                        e = ni("height", this.$el, "content-box");
                    if (this.expand)
                        t =
                            ti(window) -
                                (cn(document.documentElement) - cn(this.$el)) -
                                e || "";
                    else {
                        if (((t = "calc(100vh"), this.offsetTop)) {
                            var i = Je(this.$el).top;
                            t += i < ti(window) / 2 ? " - " + i + "px" : "";
                        }
                        !0 === this.offsetBottom
                            ? (t +=
                                  " - " +
                                  cn(this.$el.nextElementSibling) +
                                  "px")
                            : D(this.offsetBottom)
                            ? (t += " - " + this.offsetBottom + "vh")
                            : this.offsetBottom && c(this.offsetBottom, "px")
                            ? (t += " - " + P(this.offsetBottom) + "px")
                            : _(this.offsetBottom) &&
                              (t +=
                                  " - " +
                                  cn(rt(this.offsetBottom, this.$el)) +
                                  "px"),
                            (t += (e ? " - " + e + "px" : "") + ")");
                    }
                    return {
                        minHeight: t,
                    };
                },
                write: function (t) {
                    var e = t.minHeight;
                    De(this.$el, {
                        minHeight: e,
                    }),
                        this.minHeight &&
                            P(De(this.$el, "minHeight")) < this.minHeight &&
                            De(this.$el, "minHeight", this.minHeight);
                },
                events: ["resize"],
            },
        };
        function cn(t) {
            return (t && t.offsetHeight) || 0;
        }
        var un = {
                args: "src",
                props: {
                    id: Boolean,
                    icon: String,
                    src: String,
                    style: String,
                    width: Number,
                    height: Number,
                    ratio: Number,
                    class: String,
                    strokeAnimation: Boolean,
                    attributes: "list",
                },
                data: {
                    ratio: 1,
                    include: ["style", "class"],
                    class: "",
                    strokeAnimation: !1,
                },
                connected: function () {
                    var t,
                        e = this;
                    if (
                        ((this.class += " uk-svg"),
                        !this.icon && b(this.src, "#"))
                    ) {
                        var i = this.src.split("#");
                        1 < i.length &&
                            ((t = i), (this.src = t[0]), (this.icon = t[1]));
                    }
                    this.svg = this.getSvg().then(function (t) {
                        return (
                            e.applyAttributes(t),
                            (e.svgEl = (function (t, e) {
                                {
                                    if (kt(e) || "CANVAS" === e.tagName) {
                                        tt(e, "hidden", !0);
                                        var i = e.nextElementSibling;
                                        return gn(t, i) ? i : le(e, t);
                                    }
                                    var n = e.lastElementChild;
                                    return gn(t, n) ? n : ae(e, t);
                                }
                            })(t, e.$el))
                        );
                    }, G);
                },
                disconnected: function () {
                    var e = this;
                    kt(this.$el) && tt(this.$el, "hidden", null),
                        this.svg &&
                            this.svg.then(function (t) {
                                return (
                                    (!e._connected || t !== e.svgEl) && ue(t)
                                );
                            }, G),
                        (this.svg = this.svgEl = null);
                },
                update: {
                    read: function () {
                        return !!(
                            this.strokeAnimation &&
                            this.svgEl &&
                            $t(this.svgEl)
                        );
                    },
                    write: function () {
                        var t, e;
                        (t = this.svgEl),
                            (e = mn(t)) &&
                                t.style.setProperty("--uk-animation-stroke", e);
                    },
                    type: ["resize"],
                },
                methods: {
                    getSvg: function () {
                        var e = this;
                        return (function (i) {
                            if (dn[i]) return dn[i];
                            return (dn[i] = new Pt(function (e, t) {
                                i
                                    ? w(i, "data:")
                                        ? e(decodeURIComponent(i.split(",")[1]))
                                        : Vt(i).then(
                                              function (t) {
                                                  return e(t.response);
                                              },
                                              function () {
                                                  return t("SVG not found.");
                                              },
                                          )
                                    : t();
                            }));
                        })(this.src).then(function (t) {
                            return (
                                (function (t, e) {
                                    e &&
                                        b(t, "<symbol") &&
                                        (t =
                                            (function (t, e) {
                                                if (!pn[t]) {
                                                    var i;
                                                    for (
                                                        pn[t] = {};
                                                        (i = fn.exec(t));

                                                    )
                                                        pn[t][i[3]] =
                                                            '<svg xmlns="http://www.w3.org/2000/svg"' +
                                                            i[1] +
                                                            "svg>";
                                                    fn.lastIndex = 0;
                                                }
                                                return pn[t][e];
                                            })(t, e) || t);
                                    return (
                                        (t = be(t.substr(t.indexOf("<svg")))) &&
                                        t.hasChildNodes() &&
                                        t
                                    );
                                })(t, e.icon) || Pt.reject("SVG not found.")
                            );
                        });
                    },
                    applyAttributes: function (i) {
                        var n = this;
                        for (var t in this.$options.props)
                            this[t] && b(this.include, t) && tt(i, t, this[t]);
                        for (var e in this.attributes) {
                            var r = this.attributes[e].split(":", 2),
                                o = r[0],
                                s = r[1];
                            tt(i, o, s);
                        }
                        this.id || it(i, "id");
                        var a = ["width", "height"],
                            h = [this.width, this.height];
                        h.some(function (t) {
                            return t;
                        }) ||
                            (h = a.map(function (t) {
                                return tt(i, t);
                            }));
                        var l = tt(i, "viewBox");
                        l &&
                            !h.some(function (t) {
                                return t;
                            }) &&
                            (h = l.split(" ").slice(2)),
                            h.forEach(function (t, e) {
                                (t = (0 | t) * n.ratio) && tt(i, a[e], t),
                                    t && !h[1 ^ e] && it(i, a[1 ^ e]);
                            }),
                            tt(i, "data-svg", this.icon || this.src);
                    },
                },
            },
            dn = {};
        var fn = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,
            pn = {};
        function mn(t) {
            return Math.ceil(
                Math.max.apply(
                    Math,
                    ye("[stroke]", t)
                        .map(function (t) {
                            return (
                                (t.getTotalLength && t.getTotalLength()) || 0
                            );
                        })
                        .concat([0]),
                ),
            );
        }
        function gn(t, e) {
            return tt(t, "data-svg") === tt(e, "data-svg");
        }
        var vn = {},
            wn = {
                spinner:
                    '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',
                totop: '<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>',
                marker: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',
                "close-icon":
                    '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',
                "close-large":
                    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',
                "navbar-toggle-icon":
                    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',
                "overlay-icon":
                    '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',
                "pagination-next":
                    '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',
                "pagination-previous":
                    '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',
                "search-icon":
                    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
                "search-large":
                    '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',
                "search-navbar":
                    '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',
                "slidenav-next":
                    '<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',
                "slidenav-next-large":
                    '<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',
                "slidenav-previous":
                    '<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',
                "slidenav-previous-large":
                    '<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>',
            },
            bn = {
                install: function (r) {
                    r.icon.add = function (t, e) {
                        var i,
                            n = _(t) ? (((i = {})[t] = e), i) : t;
                        q(n, function (t, e) {
                            (wn[e] = t), delete vn[e];
                        }),
                            r._initialized &&
                                we(document.body, function (t) {
                                    return q(r.getComponents(t), function (t) {
                                        t.$options.isIcon &&
                                            t.icon in n &&
                                            t.$reset();
                                    });
                                });
                    };
                },
                mixins: [Fi, un],
                args: "icon",
                props: ["icon"],
                data: {
                    include: [],
                },
                isIcon: !0,
                connected: function () {
                    ke(this.$el, "uk-icon");
                },
                methods: {
                    getSvg: function () {
                        var t,
                            e = (function (t) {
                                if (!wn[t]) return null;
                                vn[t] || (vn[t] = be(wn[t].trim()));
                                return vn[t].cloneNode(!0);
                            })(
                                ((t = this.icon),
                                qt
                                    ? Y(
                                          Y(t, "left", "right"),
                                          "previous",
                                          "next",
                                      )
                                    : t),
                            );
                        return e ? Pt.resolve(e) : Pt.reject("Icon not found.");
                    },
                },
            },
            yn = {
                extends: bn,
                data: function (t) {
                    return {
                        icon: m(t.constructor.options.name),
                    };
                },
            },
            xn = {
                extends: yn,
                connected: function () {
                    ke(this.$el, "uk-slidenav");
                },
                computed: {
                    icon: function (t, e) {
                        var i = t.icon;
                        return Te(e, "uk-slidenav-large") ? i + "-large" : i;
                    },
                },
            },
            kn = {
                extends: yn,
                computed: {
                    icon: function (t, e) {
                        var i = t.icon;
                        return Te(e, "uk-search-icon") &&
                            wt(e, ".uk-search-large").length
                            ? "search-large"
                            : wt(e, ".uk-search-navbar").length
                            ? "search-navbar"
                            : i;
                    },
                },
            },
            $n = {
                extends: yn,
                computed: {
                    icon: function () {
                        return (
                            "close-" +
                            (Te(this.$el, "uk-close-large") ? "large" : "icon")
                        );
                    },
                },
            },
            In = {
                extends: yn,
                connected: function () {
                    var e = this;
                    this.svg.then(function (t) {
                        return (
                            1 !== e.ratio &&
                            De(be("circle", t), "strokeWidth", 1 / e.ratio)
                        );
                    }, G);
                },
            };
        var Sn = {
            args: "dataSrc",
            props: {
                dataSrc: String,
                dataSrcset: Boolean,
                sizes: String,
                width: Number,
                height: Number,
                offsetTop: String,
                offsetLeft: String,
                target: String,
            },
            data: {
                dataSrc: "",
                dataSrcset: !1,
                sizes: !1,
                width: !1,
                height: !1,
                offsetTop: "50vh",
                offsetLeft: 0,
                target: !1,
            },
            computed: {
                cacheKey: function (t) {
                    var e = t.dataSrc;
                    return this.$name + "." + e;
                },
                width: function (t) {
                    var e = t.width,
                        i = t.dataWidth;
                    return e || i;
                },
                height: function (t) {
                    var e = t.height,
                        i = t.dataHeight;
                    return e || i;
                },
                sizes: function (t) {
                    var e = t.sizes,
                        i = t.dataSizes;
                    return e || i;
                },
                isImg: function (t, e) {
                    return Mn(e);
                },
                target: {
                    get: function (t) {
                        var e = t.target;
                        return [this.$el].concat(ot(e, this.$el));
                    },
                    watch: function () {
                        this.observe();
                    },
                },
                offsetTop: function (t) {
                    return di(t.offsetTop, "height");
                },
                offsetLeft: function (t) {
                    return di(t.offsetLeft, "width");
                },
            },
            connected: function () {
                On[this.cacheKey]
                    ? Tn(
                          this.$el,
                          On[this.cacheKey] || this.dataSrc,
                          this.dataSrcset,
                          this.sizes,
                      )
                    : this.isImg &&
                      this.width &&
                      this.height &&
                      Tn(
                          this.$el,
                          (function (t, e, i) {
                              var n;
                              i &&
                                  ((n = Q.ratio(
                                      {
                                          width: t,
                                          height: e,
                                      },
                                      "width",
                                      di(An(i)),
                                  )),
                                  (t = n.width),
                                  (e = n.height));
                              return (
                                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
                                  t +
                                  '" height="' +
                                  e +
                                  '"></svg>'
                              );
                          })(this.width, this.height, this.sizes),
                      ),
                    (this.observer = new _i(this.load, {
                        rootMargin:
                            this.offsetTop + "px " + this.offsetLeft + "px",
                    })),
                    requestAnimationFrame(this.observe);
            },
            disconnected: function () {
                this.observer.disconnect();
            },
            update: {
                read: function (t) {
                    var e = this,
                        i = t.image;
                    if (
                        (i ||
                            "complete" !== document.readyState ||
                            this.load(this.observer.takeRecords()),
                        this.isImg)
                    )
                        return !1;
                    i &&
                        i.then(function (t) {
                            return t && "" !== t.currentSrc && Tn(e.$el, Dn(t));
                        });
                },
                write: function (t) {
                    if (this.dataSrcset && 1 !== window.devicePixelRatio) {
                        var e = De(this.$el, "backgroundSize");
                        (e.match(/^(auto\s?)+$/) || P(e) === t.bgSize) &&
                            ((t.bgSize =
                                ((i = this.dataSrcset),
                                (n = this.sizes),
                                (r = di(An(n))),
                                (o = (i.match(_n) || [])
                                    .map(P)
                                    .sort(function (t, e) {
                                        return t - e;
                                    })).filter(function (t) {
                                    return r <= t;
                                })[0] ||
                                    o.pop() ||
                                    "")),
                            De(this.$el, "backgroundSize", t.bgSize + "px"));
                    }
                    var i, n, r, o;
                },
                events: ["resize"],
            },
            methods: {
                load: function (t) {
                    var e = this;
                    t.some(function (t) {
                        return t.isIntersecting;
                    }) &&
                        ((this._data.image = Yt(
                            this.dataSrc,
                            this.dataSrcset,
                            this.sizes,
                        ).then(function (t) {
                            return (
                                Tn(e.$el, Dn(t), t.srcset, t.sizes),
                                (On[e.cacheKey] = Dn(t)),
                                t
                            );
                        }, G)),
                        this.observer.disconnect());
                },
                observe: function () {
                    var e = this;
                    !this._data.image &&
                        this._connected &&
                        this.target.forEach(function (t) {
                            return e.observer.observe(t);
                        });
                },
            },
        };
        function Tn(t, e, i, n) {
            if (Mn(t))
                n && (t.sizes = n), i && (t.srcset = i), e && (t.src = e);
            else if (e) {
                !b(t.style.backgroundImage, e) &&
                    (De(t, "backgroundImage", "url(" + yt(e) + ")"),
                    _t(t, Mt("load", !1)));
            }
        }
        var En = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
        function An(t) {
            var e, i;
            for (En.lastIndex = 0; (e = En.exec(t)); )
                if (!e[1] || window.matchMedia(e[1]).matches) {
                    e = w((i = e[2]), "calc")
                        ? i
                              .substring(5, i.length - 1)
                              .replace(Cn, function (t) {
                                  return di(t);
                              })
                              .replace(/ /g, "")
                              .match(Nn)
                              .reduce(function (t, e) {
                                  return t + +e;
                              }, 0)
                        : i;
                    break;
                }
            return e || "100vw";
        }
        var Cn = /\d+(?:\w+|%)/g,
            Nn = /[+-]?(\d+)/g;
        var _n = /\s+\d+w\s*(?:,|$)/g;
        function Mn(t) {
            return "IMG" === t.tagName;
        }
        function Dn(t) {
            return t.currentSrc || t.src;
        }
        var On,
            Bn = "__test__";
        try {
            ((On = window.sessionStorage || {})[Bn] = 1), delete On[Bn];
        } catch (t) {
            On = {};
        }
        var zn = {
            props: {
                media: Boolean,
            },
            data: {
                media: !1,
            },
            computed: {
                matchMedia: function () {
                    var t = (function (t) {
                        if (_(t))
                            if ("@" === t[0]) {
                                var e = "breakpoint-" + t.substr(1);
                                t = P(Pe(e));
                            } else if (isNaN(t)) return t;
                        return !(!t || isNaN(t)) && "(min-width: " + t + "px)";
                    })(this.media);
                    return !t || window.matchMedia(t).matches;
                },
            },
        };
        var Pn,
            Hn,
            Ln = {
                mixins: [Fi, zn],
                props: {
                    fill: String,
                },
                data: {
                    fill: "",
                    clsWrapper: "uk-leader-fill",
                    clsHide: "uk-leader-hide",
                    attrFill: "data-fill",
                },
                computed: {
                    fill: function (t) {
                        return t.fill || Pe("leader-fill-content");
                    },
                },
                connected: function () {
                    var t;
                    (t = fe(
                        this.$el,
                        '<span class="' + this.clsWrapper + '">',
                    )),
                        (this.wrapper = t[0]);
                },
                disconnected: function () {
                    pe(this.wrapper.childNodes);
                },
                update: {
                    read: function (t) {
                        var e = t.changed,
                            i = t.width,
                            n = i;
                        return {
                            width: (i = Math.floor(this.$el.offsetWidth / 2)),
                            fill: this.fill,
                            changed: e || n !== i,
                            hide: !this.matchMedia,
                        };
                    },
                    write: function (t) {
                        Ee(this.wrapper, this.clsHide, t.hide),
                            t.changed &&
                                ((t.changed = !1),
                                tt(
                                    this.wrapper,
                                    this.attrFill,
                                    new Array(t.width).join(t.fill),
                                ));
                    },
                    events: ["resize"],
                },
            },
            Fn = {
                props: {
                    container: Boolean,
                },
                data: {
                    container: !0,
                },
                computed: {
                    container: function (t) {
                        var e = t.container;
                        return (!0 === e && this.$container) || (e && be(e));
                    },
                },
            },
            jn = {
                mixins: [Fi, Fn, ji],
                props: {
                    selPanel: String,
                    selClose: String,
                    escClose: Boolean,
                    bgClose: Boolean,
                    stack: Boolean,
                },
                data: {
                    cls: "uk-open",
                    escClose: !0,
                    bgClose: !0,
                    overlay: !0,
                    stack: !1,
                },
                computed: {
                    panel: function (t, e) {
                        return be(t.selPanel, e);
                    },
                    transitionElement: function () {
                        return this.panel;
                    },
                    bgClose: function (t) {
                        return t.bgClose && this.panel;
                    },
                },
                beforeDisconnect: function () {
                    this.isToggled() && this.toggleNow(this.$el, !1);
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return this.selClose;
                        },
                        handler: function (t) {
                            t.preventDefault(), this.hide();
                        },
                    },
                    {
                        name: "toggle",
                        self: !0,
                        handler: function (t) {
                            t.defaultPrevented ||
                                (t.preventDefault(), this.toggle());
                        },
                    },
                    {
                        name: "beforeshow",
                        self: !0,
                        handler: function (t) {
                            var i = Pn && Pn !== this && Pn;
                            (Pn = this),
                                i
                                    ? this.stack
                                        ? (this.prev = i)
                                        : ((Pn = i).isToggled()
                                              ? i.hide().then(this.show)
                                              : Nt(
                                                    i.$el,
                                                    "beforeshow hidden",
                                                    this.show,
                                                    !1,
                                                    function (t) {
                                                        var e = t.target;
                                                        return (
                                                            "hidden" ===
                                                                t.type &&
                                                            e === i.$el
                                                        );
                                                    },
                                                ),
                                          t.preventDefault())
                                    : (function () {
                                          if (Hn) return;
                                          Hn = [
                                              At(document, Zt, function (t) {
                                                  var e = t.target,
                                                      i = t.defaultPrevented;
                                                  !Pn ||
                                                      !Pn.bgClose ||
                                                      i ||
                                                      (Pn.overlay &&
                                                          !Et(e, Pn.$el)) ||
                                                      Et(e, Pn.panel) ||
                                                      Pn.hide();
                                              }),
                                              At(
                                                  document,
                                                  "keydown",
                                                  function (t) {
                                                      27 === t.keyCode &&
                                                          Pn &&
                                                          Pn.escClose &&
                                                          (t.preventDefault(),
                                                          Pn.hide());
                                                  },
                                              ),
                                          ];
                                      })();
                        },
                    },
                    {
                        name: "show",
                        self: !0,
                        handler: function () {
                            Te(document.documentElement, this.clsPage) ||
                                ((this.scrollbarWidth =
                                    ei(window) - ei(document)),
                                De(
                                    document.body,
                                    "overflowY",
                                    this.scrollbarWidth && this.overlay
                                        ? "scroll"
                                        : "",
                                )),
                                ke(document.documentElement, this.clsPage);
                        },
                    },
                    {
                        name: "hide",
                        self: !0,
                        handler: function () {
                            (Pn && (Pn !== this || this.prev)) ||
                                (Hn &&
                                    Hn.forEach(function (t) {
                                        return t();
                                    }),
                                (Hn = null));
                        },
                    },
                    {
                        name: "hidden",
                        self: !0,
                        handler: function () {
                            var t,
                                e = this.prev;
                            if ((Pn = (Pn && Pn !== this && Pn) || e))
                                for (; e; ) {
                                    if (e.clsPage === this.clsPage) {
                                        t = !0;
                                        break;
                                    }
                                    e = e.prev;
                                }
                            else De(document.body, "overflowY", "");
                            t || $e(document.documentElement, this.clsPage);
                        },
                    },
                ],
                methods: {
                    toggle: function () {
                        return this.isToggled() ? this.hide() : this.show();
                    },
                    show: function () {
                        var e = this;
                        return this.isToggled()
                            ? Pt.resolve()
                            : this.container &&
                              this.$el.parentNode !== this.container
                            ? (ae(this.container, this.$el),
                              new Pt(function (t) {
                                  return requestAnimationFrame(function () {
                                      return e.show().then(t);
                                  });
                              }))
                            : this.toggleElement(this.$el, !0, Wn(this));
                    },
                    hide: function () {
                        return this.isToggled()
                            ? this.toggleElement(this.$el, !1, Wn(this))
                            : Pt.resolve();
                    },
                    getActive: function () {
                        return Pn;
                    },
                },
            };
        function Wn(t) {
            var r = t.transitionElement,
                o = t._toggle;
            return function (i, n) {
                return new Pt(function (t, e) {
                    return Nt(i, "show hide", function () {
                        i._reject && i._reject(),
                            (i._reject = e),
                            o(i, n),
                            W(De(r, "transitionDuration"))
                                ? Nt(r, "transitionend", t, !1, function (t) {
                                      return t.target === r;
                                  })
                                : t();
                    });
                });
            };
        }
        var Vn = {
            install: function (a) {
                (a.modal.dialog = function (t, e) {
                    var n = a.modal(
                        ' <div class="uk-modal"> <div class="uk-modal-dialog">' +
                            t +
                            "</div> </div> ",
                        e,
                    );
                    return (
                        n.show(),
                        At(n.$el, "hidden", function (t) {
                            var e = t.target,
                                i = t.currentTarget;
                            e === i &&
                                Pt.resolve(function () {
                                    return n.$destroy(!0);
                                });
                        }),
                        n
                    );
                }),
                    (a.modal.alert = function (e, i) {
                        return (
                            (i = R(
                                {
                                    bgClose: !1,
                                    escClose: !1,
                                    labels: a.modal.labels,
                                },
                                i,
                            )),
                            new Pt(function (t) {
                                return At(
                                    a.modal.dialog(
                                        ' <div class="uk-modal-body">' +
                                            (_(e) ? e : se(e)) +
                                            '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>' +
                                            i.labels.ok +
                                            "</button> </div> ",
                                        i,
                                    ).$el,
                                    "hide",
                                    t,
                                );
                            })
                        );
                    }),
                    (a.modal.confirm = function (r, o) {
                        return (
                            (o = R(
                                {
                                    bgClose: !1,
                                    escClose: !0,
                                    labels: a.modal.labels,
                                },
                                o,
                            )),
                            new Pt(function (e, t) {
                                var i = a.modal.dialog(
                                        ' <form> <div class="uk-modal-body">' +
                                            (_(r) ? r : se(r)) +
                                            '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' +
                                            o.labels.cancel +
                                            '</button> <button class="uk-button uk-button-primary" autofocus>' +
                                            o.labels.ok +
                                            "</button> </div> </form> ",
                                        o,
                                    ),
                                    n = !1;
                                At(i.$el, "submit", "form", function (t) {
                                    t.preventDefault(), e(), (n = !0), i.hide();
                                }),
                                    At(i.$el, "hide", function () {
                                        n || t();
                                    });
                            })
                        );
                    }),
                    (a.modal.prompt = function (t, o, s) {
                        return (
                            (s = R(
                                {
                                    bgClose: !1,
                                    escClose: !0,
                                    labels: a.modal.labels,
                                },
                                s,
                            )),
                            new Pt(function (e) {
                                var i = a.modal.dialog(
                                        ' <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>' +
                                            (_(t) ? t : se(t)) +
                                            '</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">' +
                                            s.labels.cancel +
                                            '</button> <button class="uk-button uk-button-primary">' +
                                            s.labels.ok +
                                            "</button> </div> </form> ",
                                        s,
                                    ),
                                    n = be("input", i.$el);
                                n.value = o;
                                var r = !1;
                                At(i.$el, "submit", "form", function (t) {
                                    t.preventDefault(),
                                        e(n.value),
                                        (r = !0),
                                        i.hide();
                                }),
                                    At(i.$el, "hide", function () {
                                        r || e(null);
                                    });
                            })
                        );
                    }),
                    (a.modal.labels = {
                        ok: "Ok",
                        cancel: "Cancel",
                    });
            },
            mixins: [jn],
            data: {
                clsPage: "uk-modal-page",
                selPanel: ".uk-modal-dialog",
                selClose:
                    ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full",
            },
            events: [
                {
                    name: "show",
                    self: !0,
                    handler: function () {
                        Te(this.panel, "uk-margin-auto-vertical")
                            ? ke(this.$el, "uk-flex")
                            : De(this.$el, "display", "block"),
                            ti(this.$el);
                    },
                },
                {
                    name: "hidden",
                    self: !0,
                    handler: function () {
                        De(this.$el, "display", ""), $e(this.$el, "uk-flex");
                    },
                },
            ],
        };
        var Yn = {
                extends: Wi,
                data: {
                    targets: "> .uk-parent",
                    toggle: "> a",
                    content: "> ul",
                },
            },
            Rn = {
                mixins: [Fi, on],
                props: {
                    dropdown: String,
                    mode: "list",
                    align: String,
                    offset: Number,
                    boundary: Boolean,
                    boundaryAlign: Boolean,
                    clsDrop: String,
                    delayShow: Number,
                    delayHide: Number,
                    dropbar: Boolean,
                    dropbarMode: String,
                    dropbarAnchor: Boolean,
                    duration: Number,
                },
                data: {
                    dropdown: ".uk-navbar-nav > li",
                    align: qt ? "right" : "left",
                    clsDrop: "uk-navbar-dropdown",
                    mode: void 0,
                    offset: void 0,
                    delayShow: void 0,
                    delayHide: void 0,
                    boundaryAlign: void 0,
                    flip: "x",
                    boundary: !0,
                    dropbar: !1,
                    dropbarMode: "slide",
                    dropbarAnchor: !1,
                    duration: 200,
                    forceHeight: !0,
                    selMinHeight:
                        ".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle",
                },
                computed: {
                    boundary: function (t, e) {
                        var i = t.boundary,
                            n = t.boundaryAlign;
                        return !0 === i || n ? e : i;
                    },
                    dropbarAnchor: function (t, e) {
                        return rt(t.dropbarAnchor, e);
                    },
                    pos: function (t) {
                        return "bottom-" + t.align;
                    },
                    dropdowns: function (t, e) {
                        return ye(t.dropdown + " ." + t.clsDrop, e);
                    },
                },
                beforeConnect: function () {
                    var t = this.$props.dropbar;
                    (this.dropbar =
                        t &&
                        (rt(t, this.$el) ||
                            be("+ .uk-navbar-dropbar", this.$el) ||
                            be("<div></div>"))),
                        this.dropbar &&
                            (ke(this.dropbar, "uk-navbar-dropbar"),
                            "slide" === this.dropbarMode &&
                                ke(this.dropbar, "uk-navbar-dropbar-slide"));
                },
                disconnected: function () {
                    this.dropbar && ue(this.dropbar);
                },
                update: function () {
                    var e = this;
                    this.$create(
                        "drop",
                        this.dropdowns.filter(function (t) {
                            return !e.getDropdown(t);
                        }),
                        R({}, this.$props, {
                            boundary: this.boundary,
                            pos: this.pos,
                            offset: this.dropbar || this.offset,
                        }),
                    );
                },
                events: [
                    {
                        name: "mouseover",
                        delegate: function () {
                            return this.dropdown;
                        },
                        handler: function (t) {
                            var e = t.current,
                                i = this.getActive();
                            i &&
                                i.toggle &&
                                !Et(i.toggle.$el, e) &&
                                !i.tracker.movesTo(i.$el) &&
                                i.hide(!1);
                        },
                    },
                    {
                        name: "mouseleave",
                        el: function () {
                            return this.dropbar;
                        },
                        handler: function () {
                            var t = this.getActive();
                            t && !mt(this.dropbar, ":hover") && t.hide();
                        },
                    },
                    {
                        name: "beforeshow",
                        capture: !0,
                        filter: function () {
                            return this.dropbar;
                        },
                        handler: function () {
                            this.dropbar.parentNode ||
                                le(
                                    this.dropbarAnchor || this.$el,
                                    this.dropbar,
                                );
                        },
                    },
                    {
                        name: "show",
                        capture: !0,
                        filter: function () {
                            return this.dropbar;
                        },
                        handler: function (t, e) {
                            var i = e.$el,
                                n = e.dir;
                            this.clsDrop && ke(i, this.clsDrop + "-dropbar"),
                                "bottom" === n &&
                                    this.transitionTo(
                                        i.offsetHeight +
                                            P(De(i, "marginTop")) +
                                            P(De(i, "marginBottom")),
                                        i,
                                    );
                        },
                    },
                    {
                        name: "beforehide",
                        filter: function () {
                            return this.dropbar;
                        },
                        handler: function (t, e) {
                            var i = e.$el,
                                n = this.getActive();
                            mt(this.dropbar, ":hover") &&
                                n &&
                                n.$el === i &&
                                t.preventDefault();
                        },
                    },
                    {
                        name: "hide",
                        filter: function () {
                            return this.dropbar;
                        },
                        handler: function (t, e) {
                            var i = e.$el,
                                n = this.getActive();
                            (!n || (n && n.$el === i)) && this.transitionTo(0);
                        },
                    },
                ],
                methods: {
                    getActive: function () {
                        var t = this.dropdowns
                            .map(this.getDropdown)
                            .filter(function (t) {
                                return t && t.isActive();
                            })[0];
                        return (
                            t &&
                            b(t.mode, "hover") &&
                            Et(t.toggle.$el, this.$el) &&
                            t
                        );
                    },
                    transitionTo: function (t, e) {
                        var i = this,
                            n = this.dropbar,
                            r = $t(n) ? ti(n) : 0;
                        return (
                            De(
                                (e = r < t && e),
                                "clip",
                                "rect(0," + e.offsetWidth + "px," + r + "px,0)",
                            ),
                            ti(n, r),
                            Ve.cancel([e, n]),
                            Pt.all([
                                Ve.start(
                                    n,
                                    {
                                        height: t,
                                    },
                                    this.duration,
                                ),
                                Ve.start(
                                    e,
                                    {
                                        clip:
                                            "rect(0," +
                                            e.offsetWidth +
                                            "px," +
                                            t +
                                            "px,0)",
                                    },
                                    this.duration,
                                ),
                            ])
                                .catch(G)
                                .then(function () {
                                    De(e, {
                                        clip: "",
                                    }),
                                        i.$update(n);
                                })
                        );
                    },
                    getDropdown: function (t) {
                        return (
                            this.$getComponent(t, "drop") ||
                            this.$getComponent(t, "dropdown")
                        );
                    },
                },
            },
            qn = {
                mixins: [jn],
                args: "mode",
                props: {
                    mode: String,
                    flip: Boolean,
                    overlay: Boolean,
                },
                data: {
                    mode: "slide",
                    flip: !1,
                    overlay: !1,
                    clsPage: "uk-offcanvas-page",
                    clsContainer: "uk-offcanvas-container",
                    selPanel: ".uk-offcanvas-bar",
                    clsFlip: "uk-offcanvas-flip",
                    clsContainerAnimation: "uk-offcanvas-container-animation",
                    clsSidebarAnimation: "uk-offcanvas-bar-animation",
                    clsMode: "uk-offcanvas",
                    clsOverlay: "uk-offcanvas-overlay",
                    selClose: ".uk-offcanvas-close",
                },
                computed: {
                    clsFlip: function (t) {
                        var e = t.flip,
                            i = t.clsFlip;
                        return e ? i : "";
                    },
                    clsOverlay: function (t) {
                        var e = t.overlay,
                            i = t.clsOverlay;
                        return e ? i : "";
                    },
                    clsMode: function (t) {
                        var e = t.mode;
                        return t.clsMode + "-" + e;
                    },
                    clsSidebarAnimation: function (t) {
                        var e = t.mode,
                            i = t.clsSidebarAnimation;
                        return "none" === e || "reveal" === e ? "" : i;
                    },
                    clsContainerAnimation: function (t) {
                        var e = t.mode,
                            i = t.clsContainerAnimation;
                        return "push" !== e && "reveal" !== e ? "" : i;
                    },
                    transitionElement: function (t) {
                        return "reveal" === t.mode
                            ? this.panel.parentNode
                            : this.panel;
                    },
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return 'a[href^="#"]';
                        },
                        handler: function (t) {
                            var e = t.current;
                            e.hash && be(e.hash, document.body) && this.hide();
                        },
                    },
                    {
                        name: "touchstart",
                        el: function () {
                            return this.panel;
                        },
                        handler: function (t) {
                            var e = t.targetTouches;
                            1 === e.length && (this.clientY = e[0].clientY);
                        },
                    },
                    {
                        name: "touchmove",
                        self: !0,
                        passive: !1,
                        filter: function () {
                            return this.overlay;
                        },
                        handler: function (t) {
                            t.preventDefault();
                        },
                    },
                    {
                        name: "touchmove",
                        passive: !1,
                        el: function () {
                            return this.panel;
                        },
                        handler: function (t) {
                            if (1 === t.targetTouches.length) {
                                var e =
                                        event.targetTouches[0].clientY -
                                        this.clientY,
                                    i = this.panel,
                                    n = i.scrollTop,
                                    r = i.scrollHeight,
                                    o = i.clientHeight;
                                (r <= o ||
                                    (0 === n && 0 < e) ||
                                    (r - n <= o && e < 0)) &&
                                    t.preventDefault();
                            }
                        },
                    },
                    {
                        name: "show",
                        self: !0,
                        handler: function () {
                            "reveal" !== this.mode ||
                                Te(this.panel.parentNode, this.clsMode) ||
                                (de(this.panel, "<div>"),
                                ke(this.panel.parentNode, this.clsMode)),
                                De(
                                    document.documentElement,
                                    "overflowY",
                                    this.overlay ? "hidden" : "",
                                ),
                                ke(
                                    document.body,
                                    this.clsContainer,
                                    this.clsFlip,
                                ),
                                De(this.$el, "display", "block"),
                                ke(this.$el, this.clsOverlay),
                                ke(
                                    this.panel,
                                    this.clsSidebarAnimation,
                                    "reveal" !== this.mode ? this.clsMode : "",
                                ),
                                ti(document.body),
                                ke(document.body, this.clsContainerAnimation),
                                this.clsContainerAnimation &&
                                    (Un().content += ",user-scalable=0");
                        },
                    },
                    {
                        name: "hide",
                        self: !0,
                        handler: function () {
                            $e(document.body, this.clsContainerAnimation);
                            var t = this.getActive();
                            ("none" === this.mode ||
                                (t && t !== this && t !== this.prev)) &&
                                _t(this.panel, "transitionend");
                        },
                    },
                    {
                        name: "hidden",
                        self: !0,
                        handler: function () {
                            var t;
                            this.clsContainerAnimation &&
                                ((t = Un()).content = t.content.replace(
                                    /,user-scalable=0$/,
                                    "",
                                )),
                                "reveal" === this.mode && pe(this.panel),
                                $e(
                                    this.panel,
                                    this.clsSidebarAnimation,
                                    this.clsMode,
                                ),
                                $e(this.$el, this.clsOverlay),
                                De(this.$el, "display", ""),
                                $e(
                                    document.body,
                                    this.clsContainer,
                                    this.clsFlip,
                                ),
                                De(document.documentElement, "overflowY", "");
                        },
                    },
                    {
                        name: "swipeLeft swipeRight",
                        handler: function (t) {
                            this.isToggled() &&
                                c(t.type, "Left") ^ this.flip &&
                                this.hide();
                        },
                    },
                ],
            };
        function Un() {
            return (
                be('meta[name="viewport"]', document.head) ||
                ae(document.head, '<meta name="viewport">')
            );
        }
        var Xn = {
                mixins: [Fi],
                props: {
                    selContainer: String,
                    selContent: String,
                },
                data: {
                    selContainer: ".uk-modal",
                    selContent: ".uk-modal-dialog",
                },
                computed: {
                    container: function (t, e) {
                        return vt(e, t.selContainer);
                    },
                    content: function (t, e) {
                        return vt(e, t.selContent);
                    },
                },
                connected: function () {
                    De(this.$el, "minHeight", 150);
                },
                update: {
                    read: function () {
                        return (
                            !(!this.content || !this.container) && {
                                current: P(De(this.$el, "maxHeight")),
                                max: Math.max(
                                    150,
                                    ti(this.container) -
                                        (Je(this.content).height -
                                            ti(this.$el)),
                                ),
                            }
                        );
                    },
                    write: function (t) {
                        var e = t.current,
                            i = t.max;
                        De(this.$el, "maxHeight", i),
                            Math.round(e) !== Math.round(i) &&
                                _t(this.$el, "resize");
                    },
                    events: ["resize"],
                },
            },
            Kn = {
                props: ["width", "height"],
                connected: function () {
                    ke(this.$el, "uk-responsive-width");
                },
                update: {
                    read: function () {
                        return (
                            !!($t(this.$el) && this.width && this.height) && {
                                width: ei(this.$el.parentNode),
                                height: this.height,
                            }
                        );
                    },
                    write: function (t) {
                        ti(
                            this.$el,
                            Q.contain(
                                {
                                    height: this.height,
                                    width: this.width,
                                },
                                t,
                            ).height,
                        );
                    },
                    events: ["resize"],
                },
            },
            Gn = {
                props: {
                    duration: Number,
                    offset: Number,
                },
                data: {
                    duration: 1e3,
                    offset: 0,
                },
                methods: {
                    scrollTo: function (i) {
                        var n = this;
                        i = (i && be(i)) || document.body;
                        var t = ti(document),
                            e = ti(window),
                            r = Je(i).top - this.offset;
                        if (
                            (t < r + e && (r = t - e),
                            _t(this.$el, "beforescroll", [this, i]))
                        ) {
                            var o = Date.now(),
                                s = window.pageYOffset,
                                a = function () {
                                    var t,
                                        e =
                                            s +
                                            (r - s) *
                                                ((t = K(
                                                    (Date.now() - o) /
                                                        n.duration,
                                                )),
                                                0.5 *
                                                    (1 -
                                                        Math.cos(Math.PI * t)));
                                    ci(window, e),
                                        e !== r
                                            ? requestAnimationFrame(a)
                                            : _t(n.$el, "scrolled", [n, i]);
                                };
                            a();
                        }
                    },
                },
                events: {
                    click: function (t) {
                        t.defaultPrevented ||
                            (t.preventDefault(),
                            this.scrollTo(
                                yt(decodeURIComponent(this.$el.hash)).substr(1),
                            ));
                    },
                },
            };
        var Jn = {
                args: "cls",
                props: {
                    cls: String,
                    target: String,
                    hidden: Boolean,
                    offsetTop: Number,
                    offsetLeft: Number,
                    repeat: Boolean,
                    delay: Number,
                },
                data: function () {
                    return {
                        cls: !1,
                        target: !1,
                        hidden: !0,
                        offsetTop: 0,
                        offsetLeft: 0,
                        repeat: !1,
                        delay: 0,
                        inViewClass: "uk-scrollspy-inview",
                    };
                },
                computed: {
                    elements: function (t, e) {
                        var i = t.target;
                        return i ? ye(i, e) : [e];
                    },
                },
                update: [
                    {
                        write: function () {
                            this.hidden &&
                                De(
                                    Tt(
                                        this.elements,
                                        ":not(." + this.inViewClass + ")",
                                    ),
                                    "visibility",
                                    "hidden",
                                );
                        },
                    },
                    {
                        read: function (t) {
                            var i = this;
                            t.update &&
                                this.elements.forEach(function (t) {
                                    var e = t._ukScrollspyState;
                                    e ||
                                        (e = {
                                            cls:
                                                nt(t, "uk-scrollspy-class") ||
                                                i.cls,
                                        }),
                                        (e.show = hi(
                                            t,
                                            i.offsetTop,
                                            i.offsetLeft,
                                        )),
                                        (t._ukScrollspyState = e);
                                });
                        },
                        write: function (r) {
                            var o = this;
                            if (!r.update) return this.$emit(), (r.update = !0);
                            this.elements.forEach(function (t) {
                                var i = t._ukScrollspyState,
                                    e = i.cls;
                                if (!i.show || i.inview || i.queued) {
                                    if (
                                        !i.show &&
                                        (i.inview || i.queued) &&
                                        o.repeat
                                    ) {
                                        if ((i.abort && i.abort(), !i.inview))
                                            return;
                                        De(
                                            t,
                                            "visibility",
                                            o.hidden ? "hidden" : "",
                                        ),
                                            $e(t, o.inViewClass),
                                            Ee(t, e),
                                            _t(t, "outview"),
                                            o.$update(t),
                                            (i.inview = !1);
                                    }
                                } else {
                                    var n = function () {
                                        De(t, "visibility", ""),
                                            ke(t, o.inViewClass),
                                            Ee(t, e),
                                            _t(t, "inview"),
                                            o.$update(t),
                                            (i.inview = !0),
                                            i.abort && i.abort();
                                    };
                                    o.delay
                                        ? ((i.queued = !0),
                                          (r.promise = (
                                              r.promise || Pt.resolve()
                                          ).then(function () {
                                              return (
                                                  !i.inview &&
                                                  new Pt(function (t) {
                                                      var e = setTimeout(
                                                          function () {
                                                              n(), t();
                                                          },
                                                          r.promise ||
                                                              1 ===
                                                                  o.elements
                                                                      .length
                                                              ? o.delay
                                                              : 0,
                                                      );
                                                      i.abort = function () {
                                                          clearTimeout(e),
                                                              t(),
                                                              (i.queued = !1);
                                                      };
                                                  })
                                              );
                                          })))
                                        : n();
                                }
                            });
                        },
                        events: ["scroll", "resize"],
                    },
                ],
            },
            Zn = {
                props: {
                    cls: String,
                    closest: String,
                    scroll: Boolean,
                    overflow: Boolean,
                    offset: Number,
                },
                data: {
                    cls: "uk-active",
                    closest: !1,
                    scroll: !1,
                    overflow: !0,
                    offset: 0,
                },
                computed: {
                    links: function (t, e) {
                        return ye('a[href^="#"]', e).filter(function (t) {
                            return t.hash;
                        });
                    },
                    elements: function (t) {
                        var e = t.closest;
                        return vt(this.links, e || "*");
                    },
                    targets: function () {
                        return ye(
                            this.links
                                .map(function (t) {
                                    return t.hash;
                                })
                                .join(","),
                        );
                    },
                },
                update: [
                    {
                        read: function () {
                            this.scroll &&
                                this.$create("scroll", this.links, {
                                    offset: this.offset || 0,
                                });
                        },
                    },
                    {
                        read: function (o) {
                            var s = this,
                                a = window.pageYOffset + this.offset + 1,
                                h = ti(document) - ti(window) + this.offset;
                            (o.active = !1),
                                this.targets.every(function (t, e) {
                                    var i = Je(t).top,
                                        n = e + 1 === s.targets.length;
                                    if (
                                        !s.overflow &&
                                        ((0 === e && a < i) ||
                                            (n && i + t.offsetTop < a))
                                    )
                                        return !1;
                                    if (!n && Je(s.targets[e + 1]).top <= a)
                                        return !0;
                                    if (h <= a)
                                        for (
                                            var r = s.targets.length - 1;
                                            e < r;
                                            r--
                                        )
                                            if (hi(s.targets[r])) {
                                                t = s.targets[r];
                                                break;
                                            }
                                    return !(o.active = be(
                                        Tt(s.links, '[href="#' + t.id + '"]'),
                                    ));
                                });
                        },
                        write: function (t) {
                            var e = t.active;
                            this.links.forEach(function (t) {
                                return t.blur();
                            }),
                                $e(this.elements, this.cls),
                                e &&
                                    _t(this.$el, "active", [
                                        e,
                                        ke(
                                            this.closest
                                                ? vt(e, this.closest)
                                                : e,
                                            this.cls,
                                        ),
                                    ]);
                        },
                        events: ["scroll", "resize"],
                    },
                ],
            },
            Qn = {
                mixins: [Fi, zn],
                props: {
                    top: null,
                    bottom: Boolean,
                    offset: Number,
                    animation: String,
                    clsActive: String,
                    clsInactive: String,
                    clsFixed: String,
                    clsBelow: String,
                    selTarget: String,
                    widthElement: Boolean,
                    showOnUp: Boolean,
                    targetOffset: Number,
                },
                data: {
                    top: 0,
                    bottom: !1,
                    offset: 0,
                    animation: "",
                    clsActive: "uk-active",
                    clsInactive: "",
                    clsFixed: "uk-sticky-fixed",
                    clsBelow: "uk-sticky-below",
                    selTarget: "",
                    widthElement: !1,
                    showOnUp: !1,
                    targetOffset: !1,
                },
                computed: {
                    selTarget: function (t, e) {
                        var i = t.selTarget;
                        return (i && be(i, e)) || e;
                    },
                    widthElement: function (t, e) {
                        return rt(t.widthElement, e) || this.placeholder;
                    },
                    isActive: {
                        get: function () {
                            return Te(this.selTarget, this.clsActive);
                        },
                        set: function (t) {
                            t && !this.isActive
                                ? (Se(
                                      this.selTarget,
                                      this.clsInactive,
                                      this.clsActive,
                                  ),
                                  _t(this.$el, "active"))
                                : t ||
                                  Te(this.selTarget, this.clsInactive) ||
                                  (Se(
                                      this.selTarget,
                                      this.clsActive,
                                      this.clsInactive,
                                  ),
                                  _t(this.$el, "inactive"));
                        },
                    },
                },
                connected: function () {
                    (this.placeholder =
                        be("+ .uk-sticky-placeholder", this.$el) ||
                        be('<div class="uk-sticky-placeholder"></div>')),
                        (this.isFixed = !1),
                        (this.isActive = !1);
                },
                disconnected: function () {
                    this.isFixed &&
                        (this.hide(), $e(this.selTarget, this.clsInactive)),
                        ue(this.placeholder),
                        (this.placeholder = null),
                        (this.widthElement = null);
                },
                events: [
                    {
                        name: "load hashchange popstate",
                        el: window,
                        handler: function () {
                            var n = this;
                            if (
                                !1 !== this.targetOffset &&
                                location.hash &&
                                0 < window.pageYOffset
                            ) {
                                var r = be(location.hash);
                                r &&
                                    gi.read(function () {
                                        var t = Je(r).top,
                                            e = Je(n.$el).top,
                                            i = n.$el.offsetHeight;
                                        n.isFixed &&
                                            t <= e + i &&
                                            e <= t + r.offsetHeight &&
                                            ci(
                                                window,
                                                t -
                                                    i -
                                                    (D(n.targetOffset)
                                                        ? n.targetOffset
                                                        : 0) -
                                                    n.offset,
                                            );
                                    });
                            }
                        },
                    },
                ],
                update: [
                    {
                        read: function (t, e) {
                            var i = t.height;
                            this.isActive &&
                                "update" !== e &&
                                (this.hide(),
                                (i = this.$el.offsetHeight),
                                this.show()),
                                (i = this.isActive ? i : this.$el.offsetHeight),
                                (this.topOffset = Je(
                                    this.isFixed ? this.placeholder : this.$el,
                                ).top),
                                (this.bottomOffset = this.topOffset + i);
                            var n = tr("bottom", this);
                            return (
                                (this.top =
                                    Math.max(
                                        P(tr("top", this)),
                                        this.topOffset,
                                    ) - this.offset),
                                (this.bottom = n && n - i),
                                (this.inactive = !this.matchMedia),
                                {
                                    lastScroll: !1,
                                    height: i,
                                    margins: De(this.$el, [
                                        "marginTop",
                                        "marginBottom",
                                        "marginLeft",
                                        "marginRight",
                                    ]),
                                }
                            );
                        },
                        write: function (t) {
                            var e = t.height,
                                i = t.margins,
                                n = this.placeholder;
                            De(
                                n,
                                R(
                                    {
                                        height: e,
                                    },
                                    i,
                                ),
                            ),
                                Et(n, document) ||
                                    (le(this.$el, n), tt(n, "hidden", "")),
                                (this.isActive = this.isActive);
                        },
                        events: ["resize"],
                    },
                    {
                        read: function (t) {
                            var e = t.scroll;
                            return (
                                void 0 === e && (e = 0),
                                (this.width = (
                                    $t(this.widthElement)
                                        ? this.widthElement
                                        : this.$el
                                ).offsetWidth),
                                (this.scroll = window.pageYOffset),
                                {
                                    dir: e <= this.scroll ? "down" : "up",
                                    scroll: this.scroll,
                                    visible: $t(this.$el),
                                    top: ui(this.placeholder)[0],
                                }
                            );
                        },
                        write: function (t, e) {
                            var i = this,
                                n = t.initTimestamp;
                            void 0 === n && (n = 0);
                            var r = t.dir,
                                o = t.lastDir,
                                s = t.lastScroll,
                                a = t.scroll,
                                h = t.top,
                                l = t.visible,
                                c = performance.now();
                            if (
                                !(
                                    (t.lastScroll = a) < 0 ||
                                    a === s ||
                                    !l ||
                                    this.disabled ||
                                    (this.showOnUp && "scroll" !== e) ||
                                    ((300 < c - n || r !== o) &&
                                        ((t.initScroll = a),
                                        (t.initTimestamp = c)),
                                    (t.lastDir = r),
                                    this.showOnUp &&
                                        Math.abs(t.initScroll - a) <= 30 &&
                                        Math.abs(s - a) <= 10)
                                )
                            )
                                if (
                                    this.inactive ||
                                    a < this.top ||
                                    (this.showOnUp &&
                                        (a <= this.top ||
                                            "down" === r ||
                                            ("up" === r &&
                                                !this.isFixed &&
                                                a <= this.bottomOffset)))
                                ) {
                                    if (!this.isFixed)
                                        return void (
                                            Xe.inProgress(this.$el) &&
                                            a < h &&
                                            (Xe.cancel(this.$el), this.hide())
                                        );
                                    (this.isFixed = !1),
                                        this.animation && a > this.topOffset
                                            ? (Xe.cancel(this.$el),
                                              Xe.out(
                                                  this.$el,
                                                  this.animation,
                                              ).then(function () {
                                                  return i.hide();
                                              }, G))
                                            : this.hide();
                                } else
                                    this.isFixed
                                        ? this.update()
                                        : this.animation
                                        ? (Xe.cancel(this.$el),
                                          this.show(),
                                          Xe.in(this.$el, this.animation).catch(
                                              G,
                                          ))
                                        : this.show();
                        },
                        events: ["resize", "scroll"],
                    },
                ],
                methods: {
                    show: function () {
                        (this.isFixed = !0),
                            this.update(),
                            tt(this.placeholder, "hidden", null);
                    },
                    hide: function () {
                        (this.isActive = !1),
                            $e(this.$el, this.clsFixed, this.clsBelow),
                            De(this.$el, {
                                position: "",
                                top: "",
                                width: "",
                            }),
                            tt(this.placeholder, "hidden", "");
                    },
                    update: function () {
                        var t = 0 !== this.top || this.scroll > this.top,
                            e = Math.max(0, this.offset);
                        this.bottom &&
                            this.scroll > this.bottom - this.offset &&
                            (e = this.bottom - this.scroll),
                            De(this.$el, {
                                position: "fixed",
                                top: e + "px",
                                width: this.width,
                            }),
                            (this.isActive = t),
                            Ee(
                                this.$el,
                                this.clsBelow,
                                this.scroll > this.bottomOffset,
                            ),
                            ke(this.$el, this.clsFixed);
                    },
                },
            };
        function tr(t, e) {
            var i = e.$props,
                n = e.$el,
                r = e[t + "Offset"],
                o = i[t];
            if (o) {
                if (D(o)) return r + P(o);
                if (_(o) && o.match(/^-?\d+vh$/))
                    return (ti(window) * P(o)) / 100;
                var s = !0 === o ? n.parentNode : rt(o, n);
                return s ? Je(s).top + s.offsetHeight : void 0;
            }
        }
        var er,
            ir = {
                mixins: [ji],
                args: "connect",
                props: {
                    connect: String,
                    toggle: String,
                    active: Number,
                    swiping: Boolean,
                },
                data: {
                    connect: "~.uk-switcher",
                    toggle: "> * > :first-child",
                    active: 0,
                    swiping: !0,
                    cls: "uk-active",
                    clsContainer: "uk-switcher",
                    attrItem: "uk-switcher-item",
                    queued: !0,
                },
                computed: {
                    connects: function (t, e) {
                        return ot(t.connect, e);
                    },
                    toggles: function (t, e) {
                        return ye(t.toggle, e);
                    },
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return this.toggle + ":not(.uk-disabled)";
                        },
                        handler: function (e) {
                            e.preventDefault(),
                                this.show(
                                    F(this.$el.children).filter(function (t) {
                                        return Et(e.current, t);
                                    })[0],
                                );
                        },
                    },
                    {
                        name: "click",
                        el: function () {
                            return this.connects;
                        },
                        delegate: function () {
                            return (
                                "[" +
                                this.attrItem +
                                "],[data-" +
                                this.attrItem +
                                "]"
                            );
                        },
                        handler: function (t) {
                            t.preventDefault(),
                                this.show(nt(t.current, this.attrItem));
                        },
                    },
                    {
                        name: "swipeRight swipeLeft",
                        filter: function () {
                            return this.swiping;
                        },
                        el: function () {
                            return this.connects;
                        },
                        handler: function (t) {
                            var e = t.type;
                            this.show(c(e, "Left") ? "next" : "previous");
                        },
                    },
                ],
                update: function () {
                    var e = this;
                    this.connects.forEach(function (t) {
                        return e.updateAria(t.children);
                    });
                    var t = this.$el.children;
                    this.show(
                        Tt(t, "." + this.cls)[0] || t[this.active] || t[0],
                    );
                },
                methods: {
                    index: function () {
                        return (
                            !!this.connects.length &&
                            ne(Tt(this.connects[0].children, "." + this.cls)[0])
                        );
                    },
                    show: function (t) {
                        for (
                            var e,
                                i,
                                n = this,
                                r = this.$el.children,
                                o = r.length,
                                s = this.index(),
                                a = 0 <= s,
                                h = "previous" === t ? -1 : 1,
                                l = re(t, r, s),
                                c = 0;
                            c < o;
                            c++, l = (l + h + o) % o
                        )
                            if (
                                !mt(
                                    this.toggles[l],
                                    ".uk-disabled *, .uk-disabled, [disabled]",
                                )
                            ) {
                                (e = this.toggles[l]), (i = r[l]);
                                break;
                            }
                        !i ||
                            (0 <= s && Te(i, this.cls)) ||
                            s === l ||
                            ($e(r, this.cls),
                            ke(i, this.cls),
                            tt(this.toggles, "aria-expanded", !1),
                            tt(e, "aria-expanded", !0),
                            this.connects.forEach(function (t) {
                                a
                                    ? n.toggleElement([
                                          t.children[s],
                                          t.children[l],
                                      ])
                                    : n.toggleNow(t.children[l]);
                            }));
                    },
                },
            },
            nr = {
                mixins: [Fi],
                extends: ir,
                props: {
                    media: Boolean,
                },
                data: {
                    media: 960,
                    attrItem: "uk-tab-item",
                },
                connected: function () {
                    var t = Te(this.$el, "uk-tab-left")
                        ? "uk-tab-left"
                        : !!Te(this.$el, "uk-tab-right") && "uk-tab-right";
                    t &&
                        this.$create("toggle", this.$el, {
                            cls: t,
                            mode: "media",
                            media: this.media,
                        });
                },
            },
            rr = {
                mixins: [zn, ji],
                args: "target",
                props: {
                    href: String,
                    target: null,
                    mode: "list",
                },
                data: {
                    href: !1,
                    target: !1,
                    mode: "click",
                    queued: !0,
                },
                computed: {
                    target: function (t, e) {
                        var i = t.href,
                            n = t.target;
                        return ((n = ot(n || i, e)).length && n) || [e];
                    },
                },
                connected: function () {
                    _t(this.target, "updatearia", [this]);
                },
                events: [
                    {
                        name: Qt + " " + te,
                        filter: function () {
                            return b(this.mode, "hover");
                        },
                        handler: function (t) {
                            Mi(t) ||
                                this.toggle(
                                    "toggle" +
                                        (t.type === Qt ? "show" : "hide"),
                                );
                        },
                    },
                    {
                        name: "click",
                        filter: function () {
                            return (
                                b(this.mode, "click") ||
                                (Kt && b(this.mode, "hover"))
                            );
                        },
                        handler: function (t) {
                            var e;
                            (vt(t.target, 'a[href="#"], a[href=""], button') ||
                                ((e = vt(t.target, "a[href]")) &&
                                    (this.cls ||
                                        !$t(this.target) ||
                                        (e.hash &&
                                            mt(this.target, e.hash))))) &&
                                t.preventDefault(),
                                this.toggle();
                        },
                    },
                ],
                update: {
                    read: function () {
                        return (
                            !(!b(this.mode, "media") || !this.media) && {
                                match: this.matchMedia,
                            }
                        );
                    },
                    write: function (t) {
                        var e = t.match,
                            i = this.isToggled(this.target);
                        (e ? !i : i) && this.toggle();
                    },
                    events: ["resize"],
                },
                methods: {
                    toggle: function (t) {
                        _t(this.target, t || "toggle", [this]) &&
                            this.toggleElement(this.target);
                    },
                },
            };
        (Li.version = "3.0.4-dev.23e36d517"),
            (er = Li).component("accordion", Wi),
            er.component("alert", Vi),
            er.component("cover", Xi),
            er.component("drop", Gi),
            er.component("dropdown", Ji),
            er.component("formCustom", Zi),
            er.component("gif", Qi),
            er.component("grid", rn),
            er.component("heightMatch", sn),
            er.component("heightViewport", ln),
            er.component("icon", bn),
            er.component("img", Sn),
            er.component("leader", Ln),
            er.component("margin", tn),
            er.component("modal", Vn),
            er.component("nav", Yn),
            er.component("navbar", Rn),
            er.component("offcanvas", qn),
            er.component("overflowAuto", Xn),
            er.component("responsive", Kn),
            er.component("scroll", Gn),
            er.component("scrollspy", Jn),
            er.component("scrollspyNav", Zn),
            er.component("sticky", Qn),
            er.component("svg", un),
            er.component("switcher", ir),
            er.component("tab", nr),
            er.component("toggle", rr),
            er.component("video", Ui),
            er.component("close", $n),
            er.component("marker", yn),
            er.component("navbarToggleIcon", yn),
            er.component("overlayIcon", yn),
            er.component("paginationNext", yn),
            er.component("paginationPrevious", yn),
            er.component("searchIcon", kn),
            er.component("slidenavNext", xn),
            er.component("slidenavPrevious", xn),
            er.component("spinner", In),
            er.component("totop", yn),
            er.use(Yi);
        var or = {
            mixins: [Fi],
            props: {
                date: String,
                clsWrapper: String,
            },
            data: {
                date: "",
                clsWrapper: ".uk-countdown-%unit%",
            },
            computed: {
                date: function (t) {
                    var e = t.date;
                    return Date.parse(e);
                },
                days: function (t, e) {
                    return be(t.clsWrapper.replace("%unit%", "days"), e);
                },
                hours: function (t, e) {
                    return be(t.clsWrapper.replace("%unit%", "hours"), e);
                },
                minutes: function (t, e) {
                    return be(t.clsWrapper.replace("%unit%", "minutes"), e);
                },
                seconds: function (t, e) {
                    return be(t.clsWrapper.replace("%unit%", "seconds"), e);
                },
                units: function () {
                    var e = this;
                    return ["days", "hours", "minutes", "seconds"].filter(
                        function (t) {
                            return e[t];
                        },
                    );
                },
            },
            connected: function () {
                this.start();
            },
            disconnected: function () {
                var e = this;
                this.stop(),
                    this.units.forEach(function (t) {
                        return oe(e[t]);
                    });
            },
            events: [
                {
                    name: "visibilitychange",
                    el: document,
                    handler: function () {
                        document.hidden ? this.stop() : this.start();
                    },
                },
            ],
            update: {
                write: function () {
                    var t,
                        e,
                        n = this,
                        r =
                            ((t = this.date),
                            {
                                total: (e = t - Date.now()),
                                seconds: (e / 1e3) % 60,
                                minutes: (e / 1e3 / 60) % 60,
                                hours: (e / 1e3 / 60 / 60) % 24,
                                days: e / 1e3 / 60 / 60 / 24,
                            });
                    r.total <= 0 &&
                        (this.stop(),
                        (r.days = r.hours = r.minutes = r.seconds = 0)),
                        this.units.forEach(function (t) {
                            var e = String(Math.floor(r[t]));
                            e = e.length < 2 ? "0" + e : e;
                            var i = n[t];
                            i.textContent !== e &&
                                ((e = e.split("")).length !==
                                    i.children.length &&
                                    se(
                                        i,
                                        e
                                            .map(function () {
                                                return "<span></span>";
                                            })
                                            .join(""),
                                    ),
                                e.forEach(function (t, e) {
                                    return (i.children[e].textContent = t);
                                }));
                        });
                },
            },
            methods: {
                start: function () {
                    var t = this;
                    this.stop(),
                        this.date &&
                            this.units.length &&
                            (this.$emit(),
                            (this.timer = setInterval(function () {
                                return t.$emit();
                            }, 1e3)));
                },
                stop: function () {
                    this.timer &&
                        (clearInterval(this.timer), (this.timer = null));
                },
            },
        };
        var sr,
            ar = "uk-animation-target",
            hr = {
                props: {
                    animation: Number,
                },
                data: {
                    animation: 150,
                },
                computed: {
                    target: function () {
                        return this.$el;
                    },
                },
                methods: {
                    animate: function (t) {
                        var n = this;
                        !(function () {
                            if (sr) return;
                            (sr = ae(
                                document.head,
                                "<style>",
                            ).sheet).insertRule(
                                "." +
                                    ar +
                                    " > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }",
                                0,
                            );
                        })();
                        var r = F(this.target.children),
                            o = r.map(function (t) {
                                return lr(t, !0);
                            }),
                            e = ti(this.target),
                            i = window.pageYOffset;
                        t(),
                            Ve.cancel(this.target),
                            r.forEach(Ve.cancel),
                            cr(this.target),
                            this.$update(this.target),
                            gi.flush();
                        var s = ti(this.target),
                            a = (r = r.concat(
                                F(this.target.children).filter(function (t) {
                                    return !b(r, t);
                                }),
                            )).map(function (t, e) {
                                return (
                                    !!(t.parentNode && e in o) &&
                                    (o[e]
                                        ? $t(t)
                                            ? ur(t)
                                            : {
                                                  opacity: 0,
                                              }
                                        : {
                                              opacity: $t(t) ? 1 : 0,
                                          })
                                );
                            });
                        return (
                            (o = a.map(function (t, e) {
                                var i =
                                    r[e].parentNode === n.target &&
                                    (o[e] || lr(r[e]));
                                if (i)
                                    if (t) {
                                        if (!("opacity" in t)) {
                                            i.opacity % 1
                                                ? (t.opacity = 1)
                                                : delete i.opacity;
                                        }
                                    } else delete i.opacity;
                                return i;
                            })),
                            ke(this.target, ar),
                            r.forEach(function (t, e) {
                                return o[e] && De(t, o[e]);
                            }),
                            De(this.target, "height", e),
                            ci(window, i),
                            Pt.all(
                                r
                                    .map(function (t, e) {
                                        return o[e] && a[e]
                                            ? Ve.start(
                                                  t,
                                                  a[e],
                                                  n.animation,
                                                  "ease",
                                              )
                                            : Pt.resolve();
                                    })
                                    .concat(
                                        Ve.start(
                                            this.target,
                                            {
                                                height: s,
                                            },
                                            this.animation,
                                            "ease",
                                        ),
                                    ),
                            ).then(function () {
                                r.forEach(function (t, e) {
                                    return De(t, {
                                        display:
                                            0 === a[e].opacity ? "none" : "",
                                        zIndex: "",
                                    });
                                }),
                                    cr(n.target),
                                    n.$update(n.target),
                                    gi.flush();
                            }, G)
                        );
                    },
                },
            };
        function lr(t, e) {
            var i = De(t, "zIndex");
            return (
                !!$t(t) &&
                R(
                    {
                        display: "",
                        opacity: e ? De(t, "opacity") : "0",
                        pointerEvents: "none",
                        position: "absolute",
                        zIndex: "auto" === i ? ne(t) : i,
                    },
                    ur(t),
                )
            );
        }
        function cr(t) {
            De(t.children, {
                height: "",
                left: "",
                opacity: "",
                pointerEvents: "",
                position: "",
                top: "",
                width: "",
            }),
                $e(t, ar),
                De(t, "height", "");
        }
        function ur(t) {
            var e = t.getBoundingClientRect(),
                i = e.height,
                n = e.width,
                r = Qe(t),
                o = r.top,
                s = r.left;
            return {
                top: (o += P(De(t, "marginTop"))),
                left: s,
                height: i,
                width: n,
            };
        }
        var dr = {
            mixins: [hr],
            args: "target",
            props: {
                target: Boolean,
                selActive: Boolean,
            },
            data: {
                target: null,
                selActive: !1,
                attrItem: "uk-filter-control",
                cls: "uk-active",
                animation: 250,
            },
            computed: {
                toggles: {
                    get: function (t, e) {
                        t.attrItem;
                        return ye(
                            "[" +
                                this.attrItem +
                                "],[data-" +
                                this.attrItem +
                                "]",
                            e,
                        );
                    },
                    watch: function () {
                        this.updateState();
                    },
                },
                target: function (t, e) {
                    return be(t.target, e);
                },
                children: {
                    get: function () {
                        return F(this.target.children);
                    },
                    watch: function (t, e) {
                        var i, n;
                        (n = e),
                            ((i = t).length === n.length &&
                                i.every(function (t) {
                                    return ~n.indexOf(t);
                                })) ||
                                this.updateState();
                    },
                },
            },
            events: [
                {
                    name: "click",
                    delegate: function () {
                        return (
                            "[" +
                            this.attrItem +
                            "],[data-" +
                            this.attrItem +
                            "]"
                        );
                    },
                    handler: function (t) {
                        t.preventDefault(), this.apply(t.current);
                    },
                },
            ],
            connected: function () {
                var e = this;
                if ((this.updateState(), !1 !== this.selActive)) {
                    var i = ye(this.selActive, this.$el);
                    this.toggles.forEach(function (t) {
                        return Ee(t, e.cls, b(i, t));
                    });
                }
            },
            methods: {
                apply: function (t) {
                    this.setState(pr(t, this.attrItem, this.getState()));
                },
                getState: function () {
                    var i = this;
                    return this.toggles
                        .filter(function (t) {
                            return Te(t, i.cls);
                        })
                        .reduce(
                            function (t, e) {
                                return pr(e, i.attrItem, t);
                            },
                            {
                                filter: {
                                    "": "",
                                },
                                sort: [],
                            },
                        );
                },
                setState: function (l, t) {
                    var c = this;
                    void 0 === t && (t = !0),
                        (l = R(
                            {
                                filter: {
                                    "": "",
                                },
                                sort: [],
                            },
                            l,
                        )),
                        _t(this.$el, "beforeFilter", [this, l]);
                    var u = this.children;
                    this.toggles.forEach(function (t) {
                        return Ee(
                            t,
                            c.cls,
                            (function (t, e, i) {
                                var n = i.filter;
                                void 0 === n &&
                                    (n = {
                                        "": "",
                                    });
                                var r = i.sort,
                                    o = r[0],
                                    s = r[1],
                                    a = fr(t, e),
                                    h = a.filter,
                                    l = a.group;
                                void 0 === l && (l = "");
                                var c = a.sort,
                                    u = a.order;
                                void 0 === u && (u = "asc");
                                return (
                                    (h = O(c) ? h || "" : h),
                                    (c = O(h) ? c || "" : c),
                                    (O(h) || (l in n && h === n[l])) &&
                                        (O(c) || (o === c && s === u))
                                );
                            })(t, c.attrItem, l),
                        );
                    });
                    var e = function () {
                        var t,
                            e,
                            i =
                                ((t = l.filter),
                                (e = ""),
                                q(t, function (t) {
                                    return (e += t || "");
                                }),
                                e);
                        u.forEach(function (t) {
                            return De(
                                t,
                                "display",
                                i && !mt(t, i) ? "none" : "",
                            );
                        });
                        var n,
                            r,
                            o = l.sort,
                            s = o[0],
                            a = o[1];
                        if (s) {
                            var h =
                                ((n = s),
                                (r = a),
                                R([], u).sort(function (t, e) {
                                    return (
                                        nt(t, n).localeCompare(
                                            nt(e, n),
                                            void 0,
                                            {
                                                numeric: !0,
                                            },
                                        ) * ("asc" === r || -1)
                                    );
                                }));
                            V(h, u) ||
                                h.forEach(function (t) {
                                    return ae(c.target, t);
                                });
                        }
                    };
                    t
                        ? this.animate(e).then(function () {
                              return _t(c.$el, "afterFilter", [c]);
                          })
                        : (e(), _t(this.$el, "afterFilter", [this]));
                },
                updateState: function () {
                    var t = this;
                    gi.write(function () {
                        return t.setState(t.getState(), !1);
                    });
                },
            },
        };
        function fr(t, e) {
            return Ti(nt(t, e), ["filter"]);
        }
        function pr(t, s, a) {
            return (
                F(t).forEach(function (t) {
                    var e = fr(t, s),
                        i = e.filter,
                        n = e.group,
                        r = e.sort,
                        o = e.order;
                    void 0 === o && (o = "asc"),
                        (i || O(r)) &&
                            (n
                                ? (delete a.filter[""], (a.filter[n] = i))
                                : (a.filter = {
                                      "": i || "",
                                  })),
                        O(r) || (a.sort = [r, o]);
                }),
                a
            );
        }
        var mr = {
            slide: {
                show: function (t) {
                    return [
                        {
                            transform: vr(-100 * t),
                        },
                        {
                            transform: vr(),
                        },
                    ];
                },
                percent: function (t) {
                    return gr(t);
                },
                translate: function (t, e) {
                    return [
                        {
                            transform: vr(-100 * e * t),
                        },
                        {
                            transform: vr(100 * e * (1 - t)),
                        },
                    ];
                },
            },
        };
        function gr(t) {
            return (
                Math.abs(De(t, "transform").split(",")[4] / t.offsetWidth) || 0
            );
        }
        function vr(t, e) {
            return (
                void 0 === t && (t = 0),
                void 0 === e && (e = "%"),
                "translateX(" + t + (t ? e : "") + ")"
            );
        }
        function wr(t) {
            return "scale3d(" + t + ", " + t + ", 1)";
        }
        var br = R({}, mr, {
            fade: {
                show: function () {
                    return [
                        {
                            opacity: 0,
                        },
                        {
                            opacity: 1,
                        },
                    ];
                },
                percent: function (t) {
                    return 1 - De(t, "opacity");
                },
                translate: function (t) {
                    return [
                        {
                            opacity: 1 - t,
                        },
                        {
                            opacity: t,
                        },
                    ];
                },
            },
            scale: {
                show: function () {
                    return [
                        {
                            opacity: 0,
                            transform: wr(0.8),
                        },
                        {
                            opacity: 1,
                            transform: wr(1),
                        },
                    ];
                },
                percent: function (t) {
                    return 1 - De(t, "opacity");
                },
                translate: function (t) {
                    return [
                        {
                            opacity: 1 - t,
                            transform: wr(1 - 0.2 * t),
                        },
                        {
                            opacity: t,
                            transform: wr(0.8 + 0.2 * t),
                        },
                    ];
                },
            },
        });
        function yr(t, e, i) {
            _t(t, Mt(e, !1, !1, i));
        }
        var xr = {
            mixins: [
                {
                    props: {
                        autoplay: Boolean,
                        autoplayInterval: Number,
                        pauseOnHover: Boolean,
                    },
                    data: {
                        autoplay: !1,
                        autoplayInterval: 7e3,
                        pauseOnHover: !0,
                    },
                    connected: function () {
                        this.autoplay && this.startAutoplay();
                    },
                    disconnected: function () {
                        this.stopAutoplay();
                    },
                    update: function () {
                        tt(this.slides, "tabindex", "-1");
                    },
                    events: [
                        {
                            name: "visibilitychange",
                            el: document,
                            filter: function () {
                                return this.autoplay;
                            },
                            handler: function () {
                                document.hidden
                                    ? this.stopAutoplay()
                                    : this.startAutoplay();
                            },
                        },
                        {
                            name: "mouseenter",
                            filter: function () {
                                return this.autoplay && this.pauseOnHover;
                            },
                            handler: function () {
                                this.isHovering = !0;
                            },
                        },
                        {
                            name: "mouseleave",
                            filter: function () {
                                return this.autoplay && this.pauseOnHover;
                            },
                            handler: function () {
                                this.isHovering = !1;
                            },
                        },
                    ],
                    methods: {
                        startAutoplay: function () {
                            var t = this;
                            this.stopAutoplay(),
                                (this.interval = setInterval(function () {
                                    return (
                                        !Et(document.activeElement, t.$el) &&
                                        !t.isHovering &&
                                        !t.stack.length &&
                                        t.show("next")
                                    );
                                }, this.autoplayInterval));
                        },
                        stopAutoplay: function () {
                            this.interval && clearInterval(this.interval);
                        },
                    },
                },
                {
                    props: {
                        draggable: Boolean,
                    },
                    data: {
                        draggable: !0,
                        threshold: 10,
                    },
                    created: function () {
                        var n = this;
                        ["start", "move", "end"].forEach(function (t) {
                            var i = n[t];
                            n[t] = function (t) {
                                var e = Di(t).x * (qt ? -1 : 1);
                                (n.prevPos = e !== n.pos ? n.pos : n.prevPos),
                                    (n.pos = e),
                                    i(t);
                            };
                        });
                    },
                    events: [
                        {
                            name: Gt,
                            delegate: function () {
                                return this.selSlides;
                            },
                            handler: function (t) {
                                var e;
                                !this.draggable ||
                                    (!Mi(t) &&
                                        !(e = t.target).children.length &&
                                        e.childNodes.length) ||
                                    0 < t.button ||
                                    this.length < 2 ||
                                    this.start(t);
                            },
                        },
                        {
                            name: "touchmove",
                            passive: !1,
                            handler: "move",
                            delegate: function () {
                                return this.selSlides;
                            },
                        },
                        {
                            name: "dragstart",
                            handler: function (t) {
                                t.preventDefault();
                            },
                        },
                    ],
                    methods: {
                        start: function () {
                            var t = this;
                            (this.drag = this.pos),
                                this._transitioner
                                    ? ((this.percent =
                                          this._transitioner.percent()),
                                      (this.drag +=
                                          this._transitioner.getDistance() *
                                          this.percent *
                                          this.dir),
                                      this._transitioner.cancel(),
                                      this._transitioner.translate(
                                          this.percent,
                                      ),
                                      (this.dragging = !0),
                                      (this.stack = []))
                                    : (this.prevIndex = this.index);
                            var e =
                                "touchmove" !== Jt
                                    ? At(document, Jt, this.move, {
                                          passive: !1,
                                      })
                                    : G;
                            (this.unbindMove = function () {
                                e(), (t.unbindMove = null);
                            }),
                                At(window, "scroll", this.unbindMove),
                                At(document, Zt, this.end, !0);
                        },
                        move: function (t) {
                            var e = this;
                            if (this.unbindMove) {
                                var i = this.pos - this.drag;
                                if (
                                    !(
                                        0 === i ||
                                        this.prevPos === this.pos ||
                                        (!this.dragging &&
                                            Math.abs(i) < this.threshold)
                                    )
                                ) {
                                    De(this.list, "pointer-events", "none"),
                                        t.cancelable && t.preventDefault(),
                                        (this.dragging = !0),
                                        (this.dir = i < 0 ? 1 : -1);
                                    for (
                                        var n = this.slides,
                                            r = this.prevIndex,
                                            o = Math.abs(i),
                                            s = this.getIndex(r + this.dir, r),
                                            a =
                                                this._getDistance(r, s) ||
                                                n[r].offsetWidth;
                                        s !== r && a < o;

                                    )
                                        (this.drag -= a * this.dir),
                                            (r = s),
                                            (o -= a),
                                            (s = this.getIndex(
                                                r + this.dir,
                                                r,
                                            )),
                                            (a =
                                                this._getDistance(r, s) ||
                                                n[r].offsetWidth);
                                    this.percent = o / a;
                                    var h,
                                        l = n[r],
                                        c = n[s],
                                        u = this.index !== s,
                                        d = r === s;
                                    [this.index, this.prevIndex]
                                        .filter(function (t) {
                                            return !b([s, r], t);
                                        })
                                        .forEach(function (t) {
                                            _t(n[t], "itemhidden", [e]),
                                                d &&
                                                    ((h = !0),
                                                    (e.prevIndex = r));
                                        }),
                                        ((this.index === r &&
                                            this.prevIndex !== r) ||
                                            h) &&
                                            _t(n[this.index], "itemshown", [
                                                this,
                                            ]),
                                        u &&
                                            ((this.prevIndex = r),
                                            (this.index = s),
                                            !d &&
                                                _t(l, "beforeitemhide", [this]),
                                            _t(c, "beforeitemshow", [this])),
                                        (this._transitioner = this._translate(
                                            Math.abs(this.percent),
                                            l,
                                            !d && c,
                                        )),
                                        u &&
                                            (!d && _t(l, "itemhide", [this]),
                                            _t(c, "itemshow", [this]));
                                }
                            }
                        },
                        end: function () {
                            if (
                                (Ct(window, "scroll", this.unbindMove),
                                this.unbindMove && this.unbindMove(),
                                Ct(document, Zt, this.end, !0),
                                this.dragging)
                            )
                                if (
                                    ((this.dragging = null),
                                    this.index === this.prevIndex)
                                )
                                    (this.percent = 1 - this.percent),
                                        (this.dir *= -1),
                                        this._show(!1, this.index, !0),
                                        (this._transitioner = null);
                                else {
                                    var t =
                                        (qt
                                            ? this.dir * (qt ? 1 : -1)
                                            : this.dir) <
                                            0 ==
                                        this.prevPos > this.pos;
                                    (this.index = t
                                        ? this.index
                                        : this.prevIndex),
                                        t && (this.percent = 1 - this.percent),
                                        this.show(
                                            (0 < this.dir && !t) ||
                                                (this.dir < 0 && t)
                                                ? "next"
                                                : "previous",
                                            !0,
                                        );
                                }
                            De(this.list, "pointer-events", ""),
                                (this.drag = this.percent = null);
                        },
                    },
                },
                {
                    data: {
                        selNav: !1,
                    },
                    computed: {
                        nav: function (t, e) {
                            return be(t.selNav, e);
                        },
                        selNavItem: function (t) {
                            var e = t.attrItem;
                            return "[" + e + "],[data-" + e + "]";
                        },
                        navItems: function (t, e) {
                            return ye(this.selNavItem, e);
                        },
                    },
                    update: {
                        write: function () {
                            var i = this;
                            this.nav &&
                                this.length !== this.nav.children.length &&
                                se(
                                    this.nav,
                                    this.slides
                                        .map(function (t, e) {
                                            return (
                                                "<li " +
                                                i.attrItem +
                                                '="' +
                                                e +
                                                '"><a href="#"></a></li>'
                                            );
                                        })
                                        .join(""),
                                ),
                                Ee(
                                    ye(this.selNavItem, this.$el).concat(
                                        this.nav,
                                    ),
                                    "uk-hidden",
                                    !this.maxIndex,
                                ),
                                this.updateNav();
                        },
                        events: ["resize"],
                    },
                    events: [
                        {
                            name: "click",
                            delegate: function () {
                                return this.selNavItem;
                            },
                            handler: function (t) {
                                t.preventDefault(),
                                    this.show(nt(t.current, this.attrItem));
                            },
                        },
                        {
                            name: "itemshow",
                            handler: "updateNav",
                        },
                    ],
                    methods: {
                        updateNav: function () {
                            var i = this,
                                n = this.getValidIndex();
                            this.navItems.forEach(function (t) {
                                var e = nt(t, i.attrItem);
                                Ee(t, i.clsActive, z(e) === n),
                                    Ee(
                                        t,
                                        "uk-invisible",
                                        i.finite &&
                                            (("previous" === e && 0 === n) ||
                                                ("next" === e &&
                                                    n >= i.maxIndex)),
                                    );
                            });
                        },
                    },
                },
            ],
            props: {
                clsActivated: Boolean,
                easing: String,
                index: Number,
                finite: Boolean,
                velocity: Number,
            },
            data: function () {
                return {
                    easing: "ease",
                    finite: !1,
                    velocity: 1,
                    index: 0,
                    stack: [],
                    percent: 0,
                    clsActive: "uk-active",
                    clsActivated: !1,
                    Transitioner: !1,
                    transitionOptions: {},
                };
            },
            computed: {
                duration: function (t, e) {
                    var i = t.velocity;
                    return kr(e.offsetWidth / i);
                },
                length: function () {
                    return this.slides.length;
                },
                list: function (t, e) {
                    return be(t.selList, e);
                },
                maxIndex: function () {
                    return this.length - 1;
                },
                selSlides: function (t) {
                    return t.selList + " > *";
                },
                slides: function () {
                    return F(this.list.children);
                },
            },
            events: {
                itemshown: function () {
                    this.$update(this.list);
                },
            },
            methods: {
                show: function (t, e) {
                    var i = this;
                    if (
                        (void 0 === e && (e = !1),
                        !this.dragging && this.length)
                    ) {
                        var n = this.stack,
                            r = e ? 0 : n.length,
                            o = function () {
                                n.splice(r, 1),
                                    n.length && i.show(n.shift(), !0);
                            };
                        if ((n[e ? "unshift" : "push"](t), !e && 1 < n.length))
                            2 === n.length &&
                                this._transitioner.forward(
                                    Math.min(this.duration, 200),
                                );
                        else {
                            var s = this.index,
                                a =
                                    Te(this.slides, this.clsActive) &&
                                    this.slides[s],
                                h = this.getIndex(t, this.index),
                                l = this.slides[h];
                            if (a !== l) {
                                var c, u;
                                if (
                                    ((this.dir =
                                        ((u = s),
                                        "next" === (c = t)
                                            ? 1
                                            : "previous" === c
                                            ? -1
                                            : c < u
                                            ? -1
                                            : 1)),
                                    (this.prevIndex = s),
                                    (this.index = h),
                                    a && _t(a, "beforeitemhide", [this]),
                                    !_t(l, "beforeitemshow", [this, a]))
                                )
                                    return (
                                        (this.index = this.prevIndex), void o()
                                    );
                                var d = this._show(a, l, e).then(function () {
                                    return (
                                        a && _t(a, "itemhidden", [i]),
                                        _t(l, "itemshown", [i]),
                                        new Pt(function (t) {
                                            gi.write(function () {
                                                n.shift(),
                                                    n.length
                                                        ? i.show(n.shift(), !0)
                                                        : (i._transitioner =
                                                              null),
                                                    t();
                                            });
                                        })
                                    );
                                });
                                return (
                                    a && _t(a, "itemhide", [this]),
                                    _t(l, "itemshow", [this]),
                                    d
                                );
                            }
                            o();
                        }
                    }
                },
                getIndex: function (t, e) {
                    return (
                        void 0 === t && (t = this.index),
                        void 0 === e && (e = this.index),
                        K(re(t, this.slides, e, this.finite), 0, this.maxIndex)
                    );
                },
                getValidIndex: function (t, e) {
                    return (
                        void 0 === t && (t = this.index),
                        void 0 === e && (e = this.prevIndex),
                        this.getIndex(t, e)
                    );
                },
                _show: function (t, e, i) {
                    if (
                        ((this._transitioner = this._getTransitioner(
                            t,
                            e,
                            this.dir,
                            R(
                                {
                                    easing: i
                                        ? e.offsetWidth < 600
                                            ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                            : "cubic-bezier(0.165, 0.84, 0.44, 1)"
                                        : this.easing,
                                },
                                this.transitionOptions,
                            ),
                        )),
                        !i && !t)
                    )
                        return this._transitioner.translate(1), Pt.resolve();
                    var n = this.stack.length;
                    return this._transitioner[1 < n ? "forward" : "show"](
                        1 < n
                            ? Math.min(this.duration, 75 + 75 / (n - 1))
                            : this.duration,
                        this.percent,
                    );
                },
                _getDistance: function (t, e) {
                    return new this._getTransitioner(
                        t,
                        t !== e && e,
                    ).getDistance();
                },
                _translate: function (t, e, i) {
                    void 0 === e && (e = this.prevIndex),
                        void 0 === i && (i = this.index);
                    var n = this._getTransitioner(e !== i && e, i);
                    return n.translate(t), n;
                },
                _getTransitioner: function (t, e, i, n) {
                    return (
                        void 0 === t && (t = this.prevIndex),
                        void 0 === e && (e = this.index),
                        void 0 === i && (i = this.dir || 1),
                        void 0 === n && (n = this.transitionOptions),
                        new this.Transitioner(
                            M(t) ? this.slides[t] : t,
                            M(e) ? this.slides[e] : e,
                            i * (qt ? -1 : 1),
                            n,
                        )
                    );
                },
            },
        };
        function kr(t) {
            return 0.5 * t + 300;
        }
        var $r = {
                mixins: [xr],
                props: {
                    animation: String,
                },
                data: {
                    animation: "slide",
                    clsActivated: "uk-transition-active",
                    Animations: mr,
                    Transitioner: function (o, s, a, t) {
                        var e = t.animation,
                            h = t.easing,
                            i = e.percent,
                            n = e.translate,
                            r = e.show;
                        void 0 === r && (r = G);
                        var l = r(a),
                            c = new Ht();
                        return {
                            dir: a,
                            show: function (t, e, i) {
                                var n = this;
                                void 0 === e && (e = 0);
                                var r = i ? "linear" : h;
                                return (
                                    (t -= Math.round(t * K(e, -1, 1))),
                                    this.translate(e),
                                    yr(s, "itemin", {
                                        percent: e,
                                        duration: t,
                                        timing: r,
                                        dir: a,
                                    }),
                                    yr(o, "itemout", {
                                        percent: 1 - e,
                                        duration: t,
                                        timing: r,
                                        dir: a,
                                    }),
                                    Pt.all([
                                        Ve.start(s, l[1], t, r),
                                        Ve.start(o, l[0], t, r),
                                    ]).then(function () {
                                        n.reset(), c.resolve();
                                    }, G),
                                    c.promise
                                );
                            },
                            stop: function () {
                                return Ve.stop([s, o]);
                            },
                            cancel: function () {
                                Ve.cancel([s, o]);
                            },
                            reset: function () {
                                for (var t in l[0]) De([s, o], t, "");
                            },
                            forward: function (t, e) {
                                return (
                                    void 0 === e && (e = this.percent()),
                                    Ve.cancel([s, o]),
                                    this.show(t, e, !0)
                                );
                            },
                            translate: function (t) {
                                this.reset();
                                var e = n(t, a);
                                De(s, e[1]),
                                    De(o, e[0]),
                                    yr(s, "itemtranslatein", {
                                        percent: t,
                                        dir: a,
                                    }),
                                    yr(o, "itemtranslateout", {
                                        percent: 1 - t,
                                        dir: a,
                                    });
                            },
                            percent: function () {
                                return i(o || s, s, a);
                            },
                            getDistance: function () {
                                return o && o.offsetWidth;
                            },
                        };
                    },
                },
                computed: {
                    animation: function (t) {
                        var e = t.animation,
                            i = t.Animations;
                        return R(e in i ? i[e] : i.slide, {
                            name: e,
                        });
                    },
                    transitionOptions: function () {
                        return {
                            animation: this.animation,
                        };
                    },
                },
                events: {
                    "itemshow itemhide itemshown itemhidden": function (t) {
                        var e = t.target;
                        this.$update(e);
                    },
                    itemshow: function () {
                        M(this.prevIndex) && gi.flush();
                    },
                    beforeitemshow: function (t) {
                        ke(t.target, this.clsActive);
                    },
                    itemshown: function (t) {
                        ke(t.target, this.clsActivated);
                    },
                    itemhidden: function (t) {
                        $e(t.target, this.clsActive, this.clsActivated);
                    },
                },
            },
            Ir = {
                mixins: [Fn, jn, ji, $r],
                functional: !0,
                props: {
                    delayControls: Number,
                    preload: Number,
                    videoAutoplay: Boolean,
                    template: String,
                },
                data: function () {
                    return {
                        preload: 1,
                        videoAutoplay: !1,
                        delayControls: 3e3,
                        items: [],
                        cls: "uk-open",
                        clsPage: "uk-lightbox-page",
                        selList: ".uk-lightbox-items",
                        attrItem: "uk-lightbox-item",
                        selClose: ".uk-close-large",
                        pauseOnHover: !1,
                        velocity: 2,
                        Animations: br,
                        template:
                            '<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href="#" uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href="#" uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>',
                    };
                },
                created: function () {
                    var t = this;
                    this.$mount(ae(this.container, this.template)),
                        (this.caption = be(".uk-lightbox-caption", this.$el)),
                        this.items.forEach(function () {
                            return ae(t.list, "<li></li>");
                        });
                },
                events: [
                    {
                        name: Jt + " " + Gt + " keydown",
                        handler: "showControls",
                    },
                    {
                        name: Zt,
                        self: !0,
                        delegate: function () {
                            return this.selSlides;
                        },
                        handler: function (t) {
                            t.defaultPrevented ||
                                (t.preventDefault(), this.hide());
                        },
                    },
                    {
                        name: "shown",
                        self: !0,
                        handler: function () {
                            this.showControls();
                        },
                    },
                    {
                        name: "hide",
                        self: !0,
                        handler: function () {
                            this.hideControls(),
                                $e(this.slides, this.clsActive),
                                Ve.stop(this.slides);
                        },
                    },
                    {
                        name: "hidden",
                        self: !0,
                        handler: function () {
                            this.$destroy(!0);
                        },
                    },
                    {
                        name: "keyup",
                        el: document,
                        handler: function (t) {
                            if (this.isToggled(this.$el))
                                switch (t.keyCode) {
                                    case 37:
                                        this.show("previous");
                                        break;
                                    case 39:
                                        this.show("next");
                                }
                        },
                    },
                    {
                        name: "beforeitemshow",
                        handler: function (t) {
                            this.isToggled() ||
                                ((this.draggable = !1),
                                t.preventDefault(),
                                this.toggleNow(this.$el, !0),
                                (this.animation = br.scale),
                                $e(t.target, this.clsActive),
                                this.stack.splice(1, 0, this.index));
                        },
                    },
                    {
                        name: "itemshow",
                        handler: function (t) {
                            var e = ne(t.target),
                                i = this.getItem(e).caption;
                            De(this.caption, "display", i ? "" : "none"),
                                se(this.caption, i);
                            for (var n = 0; n <= this.preload; n++)
                                this.loadItem(this.getIndex(e + n)),
                                    this.loadItem(this.getIndex(e - n));
                        },
                    },
                    {
                        name: "itemshown",
                        handler: function () {
                            this.draggable = this.$props.draggable;
                        },
                    },
                    {
                        name: "itemload",
                        handler: function (t, r) {
                            var o,
                                s = this,
                                e = r.source,
                                i = r.type,
                                n = r.alt;
                            if (
                                (this.setItem(r, "<span uk-spinner></span>"), e)
                            )
                                if (
                                    "image" === i ||
                                    e.match(
                                        /\.(jp(e)?g|png|gif|svg|webp)($|\?)/i,
                                    )
                                )
                                    Yt(e).then(
                                        function (t) {
                                            return s.setItem(
                                                r,
                                                '<img width="' +
                                                    t.width +
                                                    '" height="' +
                                                    t.height +
                                                    '" src="' +
                                                    e +
                                                    '" alt="' +
                                                    (n || "") +
                                                    '">',
                                            );
                                        },
                                        function () {
                                            return s.setError(r);
                                        },
                                    );
                                else if (
                                    "video" === i ||
                                    e.match(/\.(mp4|webm|ogv)($|\?)/i)
                                ) {
                                    var a = be(
                                        "<video controls playsinline" +
                                            (r.poster
                                                ? ' poster="' + r.poster + '"'
                                                : "") +
                                            ' uk-video="' +
                                            this.videoAutoplay +
                                            '"></video>',
                                    );
                                    tt(a, "src", e),
                                        Nt(
                                            a,
                                            "error loadedmetadata",
                                            function (t) {
                                                "error" === t
                                                    ? s.setError(r)
                                                    : (tt(a, {
                                                          width: a.videoWidth,
                                                          height: a.videoHeight,
                                                      }),
                                                      s.setItem(r, a));
                                            },
                                        );
                                } else if (
                                    "iframe" === i ||
                                    e.match(/\.(html|php)($|\?)/i)
                                )
                                    this.setItem(
                                        r,
                                        '<iframe class="uk-lightbox-iframe" src="' +
                                            e +
                                            '" frameborder="0" allowfullscreen></iframe>',
                                    );
                                else if (
                                    (o =
                                        e.match(
                                            /\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/,
                                        ) || e.match(/()youtu\.be\/(.*)/))
                                ) {
                                    var h = o[2],
                                        l = function (t, e) {
                                            return (
                                                void 0 === t && (t = 640),
                                                void 0 === e && (e = 450),
                                                s.setItem(
                                                    r,
                                                    Sr(
                                                        "https://www.youtube" +
                                                            (o[1] || "") +
                                                            ".com/embed/" +
                                                            h,
                                                        t,
                                                        e,
                                                        s.videoAutoplay,
                                                    ),
                                                )
                                            );
                                        };
                                    Yt(
                                        "https://img.youtube.com/vi/" +
                                            h +
                                            "/maxresdefault.jpg",
                                    ).then(function (t) {
                                        var e = t.width,
                                            i = t.height;
                                        120 === e && 90 === i
                                            ? Yt(
                                                  "https://img.youtube.com/vi/" +
                                                      h +
                                                      "/0.jpg",
                                              ).then(function (t) {
                                                  var e = t.width,
                                                      i = t.height;
                                                  return l(e, i);
                                              }, l)
                                            : l(e, i);
                                    }, l);
                                } else
                                    (o = e.match(
                                        /(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/,
                                    )) &&
                                        Vt(
                                            "https://vimeo.com/api/oembed.json?maxwidth=1920&url=" +
                                                encodeURI(e),
                                            {
                                                responseType: "json",
                                                withCredentials: !1,
                                            },
                                        ).then(
                                            function (t) {
                                                var e = t.response,
                                                    i = e.height,
                                                    n = e.width;
                                                return s.setItem(
                                                    r,
                                                    Sr(
                                                        "https://player.vimeo.com/video/" +
                                                            o[2],
                                                        n,
                                                        i,
                                                        s.videoAutoplay,
                                                    ),
                                                );
                                            },
                                            function () {
                                                return s.setError(r);
                                            },
                                        );
                        },
                    },
                ],
                methods: {
                    loadItem: function (t) {
                        void 0 === t && (t = this.index);
                        var e = this.getItem(t);
                        e.content || _t(this.$el, "itemload", [e]);
                    },
                    getItem: function (t) {
                        return (
                            void 0 === t && (t = this.index),
                            this.items[t] || {}
                        );
                    },
                    setItem: function (t, e) {
                        R(t, {
                            content: e,
                        });
                        var i = se(this.slides[this.items.indexOf(t)], e);
                        _t(this.$el, "itemloaded", [this, i]), this.$update(i);
                    },
                    setError: function (t) {
                        this.setItem(
                            t,
                            '<span uk-icon="icon: bolt; ratio: 2"></span>',
                        );
                    },
                    showControls: function () {
                        clearTimeout(this.controlsTimer),
                            (this.controlsTimer = setTimeout(
                                this.hideControls,
                                this.delayControls,
                            )),
                            ke(this.$el, "uk-active", "uk-transition-active");
                    },
                    hideControls: function () {
                        $e(this.$el, "uk-active", "uk-transition-active");
                    },
                },
            };
        function Sr(t, e, i, n) {
            return (
                '<iframe src="' +
                t +
                '" width="' +
                e +
                '" height="' +
                i +
                '" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: ' +
                n +
                '" uk-responsive></iframe>'
            );
        }
        var Tr,
            Er = {
                install: function (t, e) {
                    t.lightboxPanel || t.component("lightboxPanel", Ir);
                    R(e.props, t.component("lightboxPanel").options.props);
                },
                props: {
                    toggle: String,
                },
                data: {
                    toggle: "a",
                },
                computed: {
                    toggles: {
                        get: function (t, e) {
                            return ye(t.toggle, e);
                        },
                        watch: function () {
                            this.hide();
                        },
                    },
                },
                disconnected: function () {
                    this.hide();
                },
                events: [
                    {
                        name: "click",
                        delegate: function () {
                            return this.toggle + ":not(.uk-disabled)";
                        },
                        handler: function (t) {
                            t.preventDefault(),
                                this.show(ne(this.toggles, t.current));
                        },
                    },
                ],
                methods: {
                    show: function (t) {
                        var e = this;
                        return (
                            (this.panel =
                                this.panel ||
                                this.$create(
                                    "lightboxPanel",
                                    R({}, this.$props, {
                                        items: X(
                                            this.toggles.reduce(function (
                                                t,
                                                i,
                                            ) {
                                                return (
                                                    t.push(
                                                        [
                                                            "href",
                                                            "caption",
                                                            "type",
                                                            "poster",
                                                            "alt",
                                                        ].reduce(function (
                                                            t,
                                                            e,
                                                        ) {
                                                            return (
                                                                (t[
                                                                    "href" === e
                                                                        ? "source"
                                                                        : e
                                                                ] = nt(i, e)),
                                                                t
                                                            );
                                                        },
                                                        {}),
                                                    ),
                                                    t
                                                );
                                            },
                                            []),
                                            "source",
                                        ),
                                    }),
                                )),
                            At(this.panel.$el, "hidden", function () {
                                return (e.panel = !1);
                            }),
                            this.panel.show(t)
                        );
                    },
                    hide: function () {
                        return this.panel && this.panel.hide();
                    },
                },
            };
        var Ar = {},
            Cr = {
                functional: !0,
                args: ["message", "status"],
                data: {
                    message: "",
                    status: "",
                    timeout: 5e3,
                    group: null,
                    pos: "top-center",
                    clsClose: "uk-notification-close",
                    clsMsg: "uk-notification-message",
                },
                install: function (r) {
                    r.notification.closeAll = function (i, n) {
                        we(document.body, function (t) {
                            var e = r.getComponent(t, "notification");
                            !e || (i && i !== e.group) || e.close(n);
                        });
                    };
                },
                computed: {
                    marginProp: function (t) {
                        return "margin" + (w(t.pos, "top") ? "Top" : "Bottom");
                    },
                    startProps: function () {
                        var t;
                        return (
                            ((t = {
                                opacity: 0,
                            })[this.marginProp] = -this.$el.offsetHeight),
                            t
                        );
                    },
                },
                created: function () {
                    Ar[this.pos] ||
                        (Ar[this.pos] = ae(
                            this.$container,
                            '<div class="uk-notification uk-notification-' +
                                this.pos +
                                '"></div>',
                        ));
                    var t = De(Ar[this.pos], "display", "block");
                    this.$mount(
                        ae(
                            t,
                            '<div class="' +
                                this.clsMsg +
                                (this.status
                                    ? " " + this.clsMsg + "-" + this.status
                                    : "") +
                                '"> <a href="#" class="' +
                                this.clsClose +
                                '" data-uk-close></a> <div>' +
                                this.message +
                                "</div> </div>",
                        ),
                    );
                },
                connected: function () {
                    var t,
                        e = this,
                        i = P(De(this.$el, this.marginProp));
                    Ve.start(
                        De(this.$el, this.startProps),
                        ((t = {
                            opacity: 1,
                        }),
                        (t[this.marginProp] = i),
                        t),
                    ).then(function () {
                        e.timeout && (e.timer = setTimeout(e.close, e.timeout));
                    });
                },
                events:
                    ((Tr = {
                        click: function (t) {
                            vt(t.target, 'a[href="#"],a[href=""]') &&
                                t.preventDefault(),
                                this.close();
                        },
                    }),
                    (Tr[Qt] = function () {
                        this.timer && clearTimeout(this.timer);
                    }),
                    (Tr[te] = function () {
                        this.timeout &&
                            (this.timer = setTimeout(this.close, this.timeout));
                    }),
                    Tr),
                methods: {
                    close: function (t) {
                        var e = this,
                            i = function () {
                                _t(e.$el, "close", [e]),
                                    ue(e.$el),
                                    Ar[e.pos].children.length ||
                                        De(Ar[e.pos], "display", "none");
                            };
                        this.timer && clearTimeout(this.timer),
                            t
                                ? i()
                                : Ve.start(this.$el, this.startProps).then(i);
                    },
                },
            };
        var Nr = [
                "x",
                "y",
                "bgx",
                "bgy",
                "rotate",
                "scale",
                "color",
                "backgroundColor",
                "borderColor",
                "opacity",
                "blur",
                "hue",
                "grayscale",
                "invert",
                "saturate",
                "sepia",
                "fopacity",
                "stroke",
            ],
            _r = {
                mixins: [zn],
                props: Nr.reduce(function (t, e) {
                    return (t[e] = "list"), t;
                }, {}),
                data: Nr.reduce(function (t, e) {
                    return (t[e] = void 0), t;
                }, {}),
                computed: {
                    props: function (m, g) {
                        var v = this;
                        return Nr.reduce(function (t, e) {
                            if (O(m[e])) return t;
                            var i,
                                n,
                                r,
                                o = e.match(/color/i),
                                s = o || "opacity" === e,
                                a = m[e].slice(0);
                            s && De(g, e, ""),
                                a.length < 2 &&
                                    a.unshift(
                                        ("scale" === e
                                            ? 1
                                            : s
                                            ? De(g, e)
                                            : 0) || 0,
                                    );
                            var h = a.reduce(function (t, e) {
                                return (
                                    (_(e) && e.replace(/-|\d/g, "").trim()) || t
                                );
                            }, "");
                            if (o) {
                                var l = g.style.color;
                                (a = a.map(function (t) {
                                    return De(De(g, "color", t), "color")
                                        .split(/[(),]/g)
                                        .slice(1, -1)
                                        .concat(1)
                                        .slice(0, 4)
                                        .map(P);
                                })),
                                    (g.style.color = l);
                            } else if (w(e, "bg")) {
                                var c = "bgy" === e ? "height" : "width";
                                if (
                                    ((a = a.map(function (t) {
                                        return di(t, c, v.$el);
                                    })),
                                    De(g, "background-position-" + e[2], ""),
                                    (n = De(g, "backgroundPosition").split(" ")[
                                        "x" === e[2] ? 0 : 1
                                    ]),
                                    v.covers)
                                ) {
                                    var u = Math.min.apply(Math, a),
                                        d = Math.max.apply(Math, a),
                                        f = a.indexOf(u) < a.indexOf(d);
                                    (r = d - u),
                                        (a = a.map(function (t) {
                                            return t - (f ? u : d);
                                        })),
                                        (i = (f ? -r : 0) + "px");
                                } else i = n;
                            } else a = a.map(P);
                            if ("stroke" === e) {
                                if (
                                    !a.some(function (t) {
                                        return t;
                                    })
                                )
                                    return t;
                                var p = mn(v.$el);
                                De(g, "strokeDasharray", p),
                                    "%" === h &&
                                        (a = a.map(function (t) {
                                            return (t * p) / 100;
                                        })),
                                    (a = a.reverse()),
                                    (e = "strokeDashoffset");
                            }
                            return (
                                (t[e] = {
                                    steps: a,
                                    unit: h,
                                    pos: i,
                                    bgPos: n,
                                    diff: r,
                                }),
                                t
                            );
                        }, {});
                    },
                    bgProps: function () {
                        var e = this;
                        return ["bgx", "bgy"].filter(function (t) {
                            return t in e.props;
                        });
                    },
                    covers: function (t, e) {
                        return (
                            (n = (i = e).style.backgroundSize),
                            (r =
                                "cover" ===
                                De(
                                    De(i, "backgroundSize", ""),
                                    "backgroundSize",
                                )),
                            (i.style.backgroundSize = n),
                            r
                        );
                        var i, n, r;
                    },
                },
                disconnected: function () {
                    delete this._image;
                },
                update: {
                    read: function (t) {
                        var h = this;
                        if (((t.active = this.matchMedia), t.active)) {
                            if (
                                !t.image &&
                                this.covers &&
                                this.bgProps.length
                            ) {
                                var e = De(this.$el, "backgroundImage").replace(
                                    /^none|url\(["']?(.+?)["']?\)$/,
                                    "$1",
                                );
                                if (e) {
                                    var i = new Image();
                                    (i.src = e),
                                        (t.image = i).naturalWidth ||
                                            (i.onload = function () {
                                                return h.$emit();
                                            });
                                }
                            }
                            var n = t.image;
                            if (n && n.naturalWidth) {
                                var l = {
                                        width: this.$el.offsetWidth,
                                        height: this.$el.offsetHeight,
                                    },
                                    c = {
                                        width: n.naturalWidth,
                                        height: n.naturalHeight,
                                    },
                                    u = Q.cover(c, l);
                                this.bgProps.forEach(function (t) {
                                    var e = h.props[t],
                                        i = e.diff,
                                        n = e.bgPos,
                                        r = e.steps,
                                        o = "bgy" === t ? "height" : "width",
                                        s = u[o] - l[o];
                                    if (s < i) l[o] = u[o] + i - s;
                                    else if (i < s) {
                                        var a = l[o] / di(n, o, h.$el);
                                        a &&
                                            (h.props[t].steps = r.map(function (
                                                t,
                                            ) {
                                                return t - (s - i) / a;
                                            }));
                                    }
                                    u = Q.cover(c, l);
                                }),
                                    (t.dim = u);
                            }
                        }
                    },
                    write: function (t) {
                        var e = t.dim;
                        t.active
                            ? e &&
                              De(this.$el, {
                                  backgroundSize:
                                      e.width + "px " + e.height + "px",
                                  backgroundRepeat: "no-repeat",
                              })
                            : De(this.$el, {
                                  backgroundSize: "",
                                  backgroundRepeat: "",
                              });
                    },
                    events: ["resize"],
                },
                methods: {
                    reset: function () {
                        var i = this;
                        q(this.getCss(0), function (t, e) {
                            return De(i.$el, e, "");
                        });
                    },
                    getCss: function (u) {
                        var d = this.props;
                        return Object.keys(d).reduce(
                            function (t, e) {
                                var i = d[e],
                                    n = i.steps,
                                    r = i.unit,
                                    o = i.pos,
                                    s = (function (t, e, i) {
                                        void 0 === i && (i = 2);
                                        var n = Mr(t, e),
                                            r = n[0],
                                            o = n[1],
                                            s = n[2];
                                        return (
                                            M(r)
                                                ? r +
                                                  Math.abs(r - o) *
                                                      s *
                                                      (r < o ? 1 : -1)
                                                : +o
                                        ).toFixed(i);
                                    })(n, u);
                                switch (e) {
                                    case "x":
                                    case "y":
                                        (r = r || "px"),
                                            (t.transform +=
                                                " translate" +
                                                f(e) +
                                                "(" +
                                                P(s).toFixed(
                                                    "px" === r ? 0 : 2,
                                                ) +
                                                r +
                                                ")");
                                        break;
                                    case "rotate":
                                        (r = r || "deg"),
                                            (t.transform +=
                                                " rotate(" + (s + r) + ")");
                                        break;
                                    case "scale":
                                        t.transform += " scale(" + s + ")";
                                        break;
                                    case "bgy":
                                    case "bgx":
                                        t["background-position-" + e[2]] =
                                            "calc(" + o + " + " + s + "px)";
                                        break;
                                    case "color":
                                    case "backgroundColor":
                                    case "borderColor":
                                        var a = Mr(n, u),
                                            h = a[0],
                                            l = a[1],
                                            c = a[2];
                                        t[e] =
                                            "rgba(" +
                                            h
                                                .map(function (t, e) {
                                                    return (
                                                        (t += c * (l[e] - t)),
                                                        3 === e
                                                            ? P(t)
                                                            : parseInt(t, 10)
                                                    );
                                                })
                                                .join(",") +
                                            ")";
                                        break;
                                    case "blur":
                                        (r = r || "px"),
                                            (t.filter +=
                                                " blur(" + (s + r) + ")");
                                        break;
                                    case "hue":
                                        (r = r || "deg"),
                                            (t.filter +=
                                                " hue-rotate(" + (s + r) + ")");
                                        break;
                                    case "fopacity":
                                        (r = r || "%"),
                                            (t.filter +=
                                                " opacity(" + (s + r) + ")");
                                        break;
                                    case "grayscale":
                                    case "invert":
                                    case "saturate":
                                    case "sepia":
                                        (r = r || "%"),
                                            (t.filter +=
                                                " " + e + "(" + (s + r) + ")");
                                        break;
                                    default:
                                        t[e] = s;
                                }
                                return t;
                            },
                            {
                                transform: "",
                                filter: "",
                            },
                        );
                    },
                },
            };
        function Mr(t, e) {
            var i = t.length - 1,
                n = Math.min(Math.floor(i * e), i - 1),
                r = t.slice(n, n + 2);
            return r.push(1 === e ? 1 : (e % (1 / i)) * i), r;
        }
        var Dr = {
            mixins: [_r],
            props: {
                target: String,
                viewport: Number,
                easing: Number,
            },
            data: {
                target: !1,
                viewport: 1,
                easing: 1,
            },
            computed: {
                target: function (t, e) {
                    var i = t.target;
                    return (function t(e) {
                        return e
                            ? "offsetTop" in e
                                ? e
                                : t(e.parentNode)
                            : document.body;
                    })((i && rt(i, e)) || e);
                },
            },
            update: {
                read: function (t, e) {
                    var i = t.percent;
                    if (("scroll" !== e && (i = !1), t.active)) {
                        var n,
                            r,
                            o = i;
                        return (
                            (n = li(this.target) / (this.viewport || 1)),
                            (r = this.easing),
                            {
                                percent: (i = K(n * (1 - (r - r * n)))),
                                style: o !== i && this.getCss(i),
                            }
                        );
                    }
                },
                write: function (t) {
                    var e = t.style;
                    t.active ? e && De(this.$el, e) : this.reset();
                },
                events: ["scroll", "resize"],
            },
        };
        var Or = {
            update: {
                write: function () {
                    if (!this.stack.length && !this.dragging) {
                        var t = this.getValidIndex();
                        delete this.index,
                            $e(this.slides, this.clsActive, this.clsActivated),
                            this.show(t);
                    }
                },
                events: ["resize"],
            },
        };
        function Br(t, e, i) {
            var n,
                r = Hr(t, e);
            return i
                ? r - ((n = t), Lr(e).width / 2 - Lr(n).width / 2)
                : Math.min(r, zr(e));
        }
        function zr(t) {
            return Math.max(0, Pr(t) - Lr(t).width);
        }
        function Pr(t) {
            return jr(t).reduce(function (t, e) {
                return Lr(e).width + t;
            }, 0);
        }
        function Hr(t, e) {
            return (
                (Qe(t).left + (qt ? Lr(t).width - Lr(e).width : 0)) *
                (qt ? -1 : 1)
            );
        }
        function Lr(t) {
            return t.getBoundingClientRect();
        }
        function Fr(t, e, i) {
            _t(t, Mt(e, !1, !1, i));
        }
        function jr(t) {
            return F(t.children);
        }
        var Wr = {
                mixins: [Fi, xr, Or],
                props: {
                    center: Boolean,
                    sets: Boolean,
                },
                data: {
                    center: !1,
                    sets: !1,
                    attrItem: "uk-slider-item",
                    selList: ".uk-slider-items",
                    selNav: ".uk-slider-nav",
                    clsContainer: "uk-slider-container",
                    Transitioner: function (r, n, o, t) {
                        var e = t.center,
                            s = t.easing,
                            a = t.list,
                            h = new Ht(),
                            i = r ? Br(r, a, e) : Br(n, a, e) + Lr(n).width * o,
                            l = n
                                ? Br(n, a, e)
                                : i + Lr(r).width * o * (qt ? -1 : 1);
                        return {
                            dir: o,
                            show: function (t, e, i) {
                                void 0 === e && (e = 0);
                                var n = i ? "linear" : s;
                                return (
                                    (t -= Math.round(t * K(e, -1, 1))),
                                    this.translate(e),
                                    r && this.updateTranslates(),
                                    (e = r ? e : K(e, 0, 1)),
                                    Fr(this.getItemIn(), "itemin", {
                                        percent: e,
                                        duration: t,
                                        timing: n,
                                        dir: o,
                                    }),
                                    r &&
                                        Fr(this.getItemIn(!0), "itemout", {
                                            percent: 1 - e,
                                            duration: t,
                                            timing: n,
                                            dir: o,
                                        }),
                                    Ve.start(
                                        a,
                                        {
                                            transform: vr(
                                                -l * (qt ? -1 : 1),
                                                "px",
                                            ),
                                        },
                                        t,
                                        n,
                                    ).then(h.resolve, G),
                                    h.promise
                                );
                            },
                            stop: function () {
                                return Ve.stop(a);
                            },
                            cancel: function () {
                                Ve.cancel(a);
                            },
                            reset: function () {
                                De(a, "transform", "");
                            },
                            forward: function (t, e) {
                                return (
                                    void 0 === e && (e = this.percent()),
                                    Ve.cancel(a),
                                    this.show(t, e, !0)
                                );
                            },
                            translate: function (t) {
                                var e = this.getDistance() * o * (qt ? -1 : 1);
                                De(
                                    a,
                                    "transform",
                                    vr(
                                        K(e - e * t - l, -Pr(a), Lr(a).width) *
                                            (qt ? -1 : 1),
                                        "px",
                                    ),
                                ),
                                    this.updateTranslates(),
                                    r &&
                                        ((t = K(t, -1, 1)),
                                        Fr(
                                            this.getItemIn(),
                                            "itemtranslatein",
                                            {
                                                percent: t,
                                                dir: o,
                                            },
                                        ),
                                        Fr(
                                            this.getItemIn(!0),
                                            "itemtranslateout",
                                            {
                                                percent: 1 - t,
                                                dir: o,
                                            },
                                        ));
                            },
                            percent: function () {
                                return Math.abs(
                                    (De(a, "transform").split(",")[4] *
                                        (qt ? -1 : 1) +
                                        i) /
                                        (l - i),
                                );
                            },
                            getDistance: function () {
                                return Math.abs(l - i);
                            },
                            getItemIn: function (t) {
                                void 0 === t && (t = !1);
                                var e = this.getActives(),
                                    i = U(jr(a), "offsetLeft"),
                                    n = ne(
                                        i,
                                        e[
                                            0 < o * (t ? -1 : 1)
                                                ? e.length - 1
                                                : 0
                                        ],
                                    );
                                return ~n && i[n + (r && !t ? o : 0)];
                            },
                            getActives: function () {
                                var i = Br(r || n, a, e);
                                return U(
                                    jr(a).filter(function (t) {
                                        var e = Hr(t, a);
                                        return (
                                            i <= e &&
                                            e + Lr(t).width <= Lr(a).width + i
                                        );
                                    }),
                                    "offsetLeft",
                                );
                            },
                            updateTranslates: function () {
                                var i = this.getActives();
                                jr(a).forEach(function (t) {
                                    var e = b(i, t);
                                    Fr(
                                        t,
                                        "itemtranslate" + (e ? "in" : "out"),
                                        {
                                            percent: e ? 1 : 0,
                                            dir:
                                                t.offsetLeft <= n.offsetLeft
                                                    ? 1
                                                    : -1,
                                        },
                                    );
                                });
                            },
                        };
                    },
                },
                computed: {
                    avgWidth: function () {
                        return Pr(this.list) / this.length;
                    },
                    finite: function (t) {
                        return (
                            t.finite ||
                            Pr(this.list) <
                                Lr(this.list).width +
                                    jr(this.list).reduce(function (t, e) {
                                        return Math.max(t, Lr(e).width);
                                    }, 0) +
                                    this.center
                        );
                    },
                    maxIndex: function () {
                        if (!this.finite || (this.center && !this.sets))
                            return this.length - 1;
                        if (this.center) return this.sets[this.sets.length - 1];
                        De(this.slides, "order", "");
                        for (var t = zr(this.list), e = this.length; e--; )
                            if (Hr(this.list.children[e], this.list) < t)
                                return Math.min(e + 1, this.length - 1);
                        return 0;
                    },
                    sets: function (t) {
                        var o = this,
                            e = t.sets,
                            s = Lr(this.list).width / (this.center ? 2 : 1),
                            a = 0,
                            h = s,
                            l = 0;
                        return (
                            (e =
                                e &&
                                this.slides.reduce(function (t, e, i) {
                                    var n = Lr(e).width;
                                    if (
                                        a < l + n &&
                                        (!o.center &&
                                            i > o.maxIndex &&
                                            (i = o.maxIndex),
                                        !b(t, i))
                                    ) {
                                        var r = o.slides[i + 1];
                                        o.center && r && n < h - Lr(r).width / 2
                                            ? (h -= n)
                                            : ((h = s),
                                              t.push(i),
                                              (a =
                                                  l +
                                                  s +
                                                  (o.center ? n / 2 : 0)));
                                    }
                                    return (l += n), t;
                                }, [])) &&
                            e.length &&
                            e
                        );
                    },
                    transitionOptions: function () {
                        return {
                            center: this.center,
                            list: this.list,
                        };
                    },
                },
                connected: function () {
                    Ee(
                        this.$el,
                        this.clsContainer,
                        !be("." + this.clsContainer, this.$el),
                    );
                },
                update: {
                    write: function () {
                        var i = this;
                        ye(
                            "[" +
                                this.attrItem +
                                "],[data-" +
                                this.attrItem +
                                "]",
                            this.$el,
                        ).forEach(function (t) {
                            var e = nt(t, i.attrItem);
                            i.maxIndex &&
                                Ee(
                                    t,
                                    "uk-hidden",
                                    D(e) &&
                                        ((i.sets && !b(i.sets, P(e))) ||
                                            e > i.maxIndex),
                                );
                        });
                    },
                    events: ["resize"],
                },
                events: {
                    beforeitemshow: function (t) {
                        !this.dragging &&
                            this.sets &&
                            this.stack.length < 2 &&
                            !b(this.sets, this.index) &&
                            (this.index = this.getValidIndex());
                        var e = Math.abs(
                            this.index -
                                this.prevIndex +
                                ((0 < this.dir &&
                                    this.index < this.prevIndex) ||
                                (this.dir < 0 && this.index > this.prevIndex)
                                    ? (this.maxIndex + 1) * this.dir
                                    : 0),
                        );
                        if (!this.dragging && 1 < e) {
                            for (var i = 0; i < e; i++)
                                this.stack.splice(
                                    1,
                                    0,
                                    0 < this.dir ? "next" : "previous",
                                );
                            t.preventDefault();
                        } else
                            (this.duration =
                                kr(this.avgWidth / this.velocity) *
                                (Lr(
                                    this.dir < 0 || !this.slides[this.prevIndex]
                                        ? this.slides[this.index]
                                        : this.slides[this.prevIndex],
                                ).width /
                                    this.avgWidth)),
                                this.reorder();
                    },
                    itemshow: function () {
                        !O(this.prevIndex) &&
                            ke(
                                this._getTransitioner().getItemIn(),
                                this.clsActive,
                            );
                    },
                    itemshown: function () {
                        var e = this,
                            i = this._getTransitioner(this.index).getActives();
                        this.slides.forEach(function (t) {
                            return Ee(t, e.clsActive, b(i, t));
                        }),
                            (!this.sets || b(this.sets, P(this.index))) &&
                                this.slides.forEach(function (t) {
                                    return Ee(t, e.clsActivated, b(i, t));
                                });
                    },
                },
                methods: {
                    reorder: function () {
                        var i = this;
                        if ((De(this.slides, "order", ""), !this.finite)) {
                            var n =
                                0 < this.dir && this.slides[this.prevIndex]
                                    ? this.prevIndex
                                    : this.index;
                            if (
                                (this.slides.forEach(function (t, e) {
                                    return De(
                                        t,
                                        "order",
                                        0 < i.dir && e < n
                                            ? 1
                                            : i.dir < 0 && e >= i.index
                                            ? -1
                                            : "",
                                    );
                                }),
                                this.center)
                            )
                                for (
                                    var t = this.slides[n],
                                        e =
                                            Lr(this.list).width / 2 -
                                            Lr(t).width / 2,
                                        r = 0;
                                    0 < e;

                                ) {
                                    var o = this.getIndex(--r + n, n),
                                        s = this.slides[o];
                                    De(s, "order", n < o ? -2 : -1),
                                        (e -= Lr(s).width);
                                }
                        }
                    },
                    getValidIndex: function (t, e) {
                        if (
                            (void 0 === t && (t = this.index),
                            void 0 === e && (e = this.prevIndex),
                            (t = this.getIndex(t, e)),
                            !this.sets)
                        )
                            return t;
                        var i;
                        do {
                            if (b(this.sets, t)) return t;
                            (i = t), (t = this.getIndex(t + this.dir, e));
                        } while (t !== i);
                        return t;
                    },
                },
            },
            Vr = {
                mixins: [_r],
                data: {
                    selItem: "!li",
                },
                computed: {
                    item: function (t, e) {
                        return rt(t.selItem, e);
                    },
                },
                events: [
                    {
                        name: "itemshown",
                        self: !0,
                        el: function () {
                            return this.item;
                        },
                        handler: function () {
                            De(this.$el, this.getCss(0.5));
                        },
                    },
                    {
                        name: "itemin itemout",
                        self: !0,
                        el: function () {
                            return this.item;
                        },
                        handler: function (t) {
                            var e = t.type,
                                i = t.detail,
                                n = i.percent,
                                r = i.duration,
                                o = i.timing,
                                s = i.dir;
                            Ve.cancel(this.$el),
                                De(this.$el, this.getCss(Rr(e, s, n))),
                                Ve.start(
                                    this.$el,
                                    this.getCss(Yr(e) ? 0.5 : 0 < s ? 1 : 0),
                                    r,
                                    o,
                                ).catch(G);
                        },
                    },
                    {
                        name: "transitioncanceled transitionend",
                        self: !0,
                        el: function () {
                            return this.item;
                        },
                        handler: function () {
                            Ve.cancel(this.$el);
                        },
                    },
                    {
                        name: "itemtranslatein itemtranslateout",
                        self: !0,
                        el: function () {
                            return this.item;
                        },
                        handler: function (t) {
                            var e = t.type,
                                i = t.detail,
                                n = i.percent,
                                r = i.dir;
                            Ve.cancel(this.$el),
                                De(this.$el, this.getCss(Rr(e, r, n)));
                        },
                    },
                ],
            };
        function Yr(t) {
            return c(t, "in");
        }
        function Rr(t, e, i) {
            return (i /= 2), Yr(t) ? (e < 0 ? 1 - i : i) : e < 0 ? i : 1 - i;
        }
        var qr,
            Ur = R({}, mr, {
                fade: {
                    show: function () {
                        return [
                            {
                                opacity: 0,
                                zIndex: 0,
                            },
                            {
                                zIndex: -1,
                            },
                        ];
                    },
                    percent: function (t) {
                        return 1 - De(t, "opacity");
                    },
                    translate: function (t) {
                        return [
                            {
                                opacity: 1 - t,
                                zIndex: 0,
                            },
                            {
                                zIndex: -1,
                            },
                        ];
                    },
                },
                scale: {
                    show: function () {
                        return [
                            {
                                opacity: 0,
                                transform: wr(1.5),
                                zIndex: 0,
                            },
                            {
                                zIndex: -1,
                            },
                        ];
                    },
                    percent: function (t) {
                        return 1 - De(t, "opacity");
                    },
                    translate: function (t) {
                        return [
                            {
                                opacity: 1 - t,
                                transform: wr(1 + 0.5 * t),
                                zIndex: 0,
                            },
                            {
                                zIndex: -1,
                            },
                        ];
                    },
                },
                pull: {
                    show: function (t) {
                        return t < 0
                            ? [
                                  {
                                      transform: vr(30),
                                      zIndex: -1,
                                  },
                                  {
                                      transform: vr(),
                                      zIndex: 0,
                                  },
                              ]
                            : [
                                  {
                                      transform: vr(-100),
                                      zIndex: 0,
                                  },
                                  {
                                      transform: vr(),
                                      zIndex: -1,
                                  },
                              ];
                    },
                    percent: function (t, e, i) {
                        return i < 0 ? 1 - gr(e) : gr(t);
                    },
                    translate: function (t, e) {
                        return e < 0
                            ? [
                                  {
                                      transform: vr(30 * t),
                                      zIndex: -1,
                                  },
                                  {
                                      transform: vr(-100 * (1 - t)),
                                      zIndex: 0,
                                  },
                              ]
                            : [
                                  {
                                      transform: vr(100 * -t),
                                      zIndex: 0,
                                  },
                                  {
                                      transform: vr(30 * (1 - t)),
                                      zIndex: -1,
                                  },
                              ];
                    },
                },
                push: {
                    show: function (t) {
                        return t < 0
                            ? [
                                  {
                                      transform: vr(100),
                                      zIndex: 0,
                                  },
                                  {
                                      transform: vr(),
                                      zIndex: -1,
                                  },
                              ]
                            : [
                                  {
                                      transform: vr(-30),
                                      zIndex: -1,
                                  },
                                  {
                                      transform: vr(),
                                      zIndex: 0,
                                  },
                              ];
                    },
                    percent: function (t, e, i) {
                        return 0 < i ? 1 - gr(e) : gr(t);
                    },
                    translate: function (t, e) {
                        return e < 0
                            ? [
                                  {
                                      transform: vr(100 * t),
                                      zIndex: 0,
                                  },
                                  {
                                      transform: vr(-30 * (1 - t)),
                                      zIndex: -1,
                                  },
                              ]
                            : [
                                  {
                                      transform: vr(-30 * t),
                                      zIndex: -1,
                                  },
                                  {
                                      transform: vr(100 * (1 - t)),
                                      zIndex: 0,
                                  },
                              ];
                    },
                },
            }),
            Xr = {
                mixins: [Fi, $r, Or],
                props: {
                    ratio: String,
                    minHeight: Number,
                    maxHeight: Number,
                },
                data: {
                    ratio: "16:9",
                    minHeight: !1,
                    maxHeight: !1,
                    selList: ".uk-slideshow-items",
                    attrItem: "uk-slideshow-item",
                    selNav: ".uk-slideshow-nav",
                    Animations: Ur,
                },
                update: {
                    read: function () {
                        var t = this.ratio.split(":").map(Number),
                            e = t[0],
                            i = t[1];
                        return (
                            (i = (i * this.list.offsetWidth) / e || 0),
                            this.minHeight && (i = Math.max(this.minHeight, i)),
                            this.maxHeight && (i = Math.min(this.maxHeight, i)),
                            {
                                height: i - ni(this.list, "content-box"),
                            }
                        );
                    },
                    write: function (t) {
                        var e = t.height;
                        De(this.list, "minHeight", e);
                    },
                    events: ["resize"],
                },
            },
            Kr = {
                mixins: [Fi, hr],
                props: {
                    group: String,
                    threshold: Number,
                    clsItem: String,
                    clsPlaceholder: String,
                    clsDrag: String,
                    clsDragState: String,
                    clsBase: String,
                    clsNoDrag: String,
                    clsEmpty: String,
                    clsCustom: String,
                    handle: String,
                },
                data: {
                    group: !1,
                    threshold: 5,
                    clsItem: "uk-sortable-item",
                    clsPlaceholder: "uk-sortable-placeholder",
                    clsDrag: "uk-sortable-drag",
                    clsDragState: "uk-drag",
                    clsBase: "uk-sortable",
                    clsNoDrag: "uk-sortable-nodrag",
                    clsEmpty: "uk-sortable-empty",
                    clsCustom: "",
                    handle: !1,
                },
                created: function () {
                    var o = this;
                    ["init", "start", "move", "end"].forEach(function (t) {
                        var r = o[t];
                        o[t] = function (t) {
                            o.scrollY = window.pageYOffset;
                            var e = Di(t, "page"),
                                i = e.x,
                                n = e.y;
                            (o.pos = {
                                x: i,
                                y: n,
                            }),
                                r(t);
                        };
                    });
                },
                events: {
                    name: Gt,
                    passive: !1,
                    handler: "init",
                },
                update: {
                    write: function () {
                        if (
                            (this.clsEmpty &&
                                Ee(
                                    this.$el,
                                    this.clsEmpty,
                                    !this.$el.children.length,
                                ),
                            De(
                                this.handle
                                    ? ye(this.handle, this.$el)
                                    : this.$el.children,
                                "touchAction",
                                "none",
                            ),
                            this.drag)
                        ) {
                            Je(this.drag, {
                                top: this.pos.y + this.origin.top,
                                left: this.pos.x + this.origin.left,
                            });
                            var t,
                                e = Je(this.drag),
                                i = e.top,
                                n = i + e.height;
                            0 < i && i < this.scrollY
                                ? (t = this.scrollY - 5)
                                : n < ti(document) &&
                                  n > ti(window) + this.scrollY &&
                                  (t = this.scrollY + 5),
                                t &&
                                    setTimeout(function () {
                                        return ci(window, t);
                                    }, 5);
                        }
                    },
                },
                methods: {
                    init: function (t) {
                        var e = t.target,
                            i = t.button,
                            n = t.defaultPrevented,
                            r = F(this.$el.children).filter(function (t) {
                                return Et(e, t);
                            })[0];
                        !r ||
                            St(e) ||
                            (this.handle && !Et(e, this.handle)) ||
                            0 < i ||
                            Et(e, "." + this.clsNoDrag) ||
                            n ||
                            (t.preventDefault(),
                            (this.touched = [this]),
                            (this.placeholder = r),
                            (this.origin = R(
                                {
                                    target: e,
                                    index: ne(r),
                                },
                                this.pos,
                            )),
                            At(document, Jt, this.move),
                            At(document, Zt, this.end),
                            At(window, "scroll", this.scroll),
                            this.threshold || this.start(t));
                    },
                    start: function (t) {
                        (this.drag = ae(
                            this.$container,
                            this.placeholder.outerHTML
                                .replace(/^<li/i, "<div")
                                .replace(/li>$/i, "div>"),
                        )),
                            De(
                                this.drag,
                                R(
                                    {
                                        boxSizing: "border-box",
                                        width: this.placeholder.offsetWidth,
                                        height: this.placeholder.offsetHeight,
                                    },
                                    De(this.placeholder, [
                                        "paddingLeft",
                                        "paddingRight",
                                        "paddingTop",
                                        "paddingBottom",
                                    ]),
                                ),
                            ),
                            tt(this.drag, "uk-no-boot", ""),
                            ke(this.drag, this.clsDrag, this.clsCustom),
                            ti(
                                this.drag.firstElementChild,
                                ti(this.placeholder.firstElementChild),
                            );
                        var e = Je(this.placeholder),
                            i = e.left,
                            n = e.top;
                        R(this.origin, {
                            left: i - this.pos.x,
                            top: n - this.pos.y,
                        }),
                            ke(this.placeholder, this.clsPlaceholder),
                            ke(this.$el.children, this.clsItem),
                            ke(document.documentElement, this.clsDragState),
                            _t(this.$el, "start", [this, this.placeholder]),
                            this.move(t);
                    },
                    move: function (t) {
                        if (this.drag) {
                            this.$emit();
                            var e =
                                    "mousemove" === t.type
                                        ? t.target
                                        : document.elementFromPoint(
                                              this.pos.x - window.pageXOffset,
                                              this.pos.y - window.pageYOffset,
                                          ),
                                i = this.getSortable(e),
                                n = this.getSortable(this.placeholder),
                                r = i !== n;
                            if (
                                i &&
                                !Et(e, this.placeholder) &&
                                (!r || (i.group && i.group === n.group))
                            ) {
                                if (
                                    ((e =
                                        (i.$el === e.parentNode && e) ||
                                        F(i.$el.children).filter(function (t) {
                                            return Et(e, t);
                                        })[0]),
                                    r)
                                )
                                    n.remove(this.placeholder);
                                else if (!e) return;
                                i.insert(this.placeholder, e),
                                    b(this.touched, i) || this.touched.push(i);
                            }
                        } else
                            (Math.abs(this.pos.x - this.origin.x) >
                                this.threshold ||
                                Math.abs(this.pos.y - this.origin.y) >
                                    this.threshold) &&
                                this.start(t);
                    },
                    end: function (t) {
                        if (
                            (Ct(document, Jt, this.move),
                            Ct(document, Zt, this.end),
                            Ct(window, "scroll", this.scroll),
                            this.drag)
                        ) {
                            var e = this.getSortable(this.placeholder);
                            this === e
                                ? this.origin.index !== ne(this.placeholder) &&
                                  _t(this.$el, "moved", [
                                      this,
                                      this.placeholder,
                                  ])
                                : (_t(e.$el, "added", [e, this.placeholder]),
                                  _t(this.$el, "removed", [
                                      this,
                                      this.placeholder,
                                  ])),
                                _t(this.$el, "stop", [this, this.placeholder]),
                                ue(this.drag),
                                (this.drag = null);
                            var i = this.touched
                                .map(function (t) {
                                    return t.clsPlaceholder + " " + t.clsItem;
                                })
                                .join(" ");
                            this.touched.forEach(function (t) {
                                return $e(t.$el.children, i);
                            }),
                                $e(document.documentElement, this.clsDragState);
                        } else "touchend" === t.type && t.target.click();
                    },
                    scroll: function () {
                        var t = window.pageYOffset;
                        t !== this.scrollY &&
                            ((this.pos.y += t - this.scrollY),
                            (this.scrollY = t),
                            this.$emit());
                    },
                    insert: function (i, n) {
                        var r = this;
                        ke(this.$el.children, this.clsItem);
                        var t = function () {
                            var t, e;
                            n
                                ? !Et(i, r.$el) ||
                                  ((e = n),
                                  (t = i).parentNode === e.parentNode &&
                                      ne(t) > ne(e))
                                    ? he(n, i)
                                    : le(n, i)
                                : ae(r.$el, i);
                        };
                        this.animation ? this.animate(t) : t();
                    },
                    remove: function (t) {
                        Et(t, this.$el) &&
                            (this.animation
                                ? this.animate(function () {
                                      return ue(t);
                                  })
                                : ue(t));
                    },
                    getSortable: function (t) {
                        return (
                            t &&
                            (this.$getComponent(t, "sortable") ||
                                this.getSortable(t.parentNode))
                        );
                    },
                },
            };
        var Gr = [],
            Jr = {
                mixins: [Fn, ji, Ki],
                args: "title",
                props: {
                    delay: Number,
                    title: String,
                },
                data: {
                    pos: "top",
                    title: "",
                    delay: 0,
                    animation: ["uk-animation-scale-up"],
                    duration: 100,
                    cls: "uk-active",
                    clsPos: "uk-tooltip",
                },
                beforeConnect: function () {
                    (this._hasTitle = et(this.$el, "title")),
                        tt(this.$el, {
                            title: "",
                            "aria-expanded": !1,
                        });
                },
                disconnected: function () {
                    this.hide(),
                        tt(this.$el, {
                            title: this._hasTitle ? this.title : null,
                            "aria-expanded": null,
                        });
                },
                methods: {
                    show: function () {
                        var e = this;
                        this.isActive() ||
                            (Gr.forEach(function (t) {
                                return t.hide();
                            }),
                            Gr.push(this),
                            (this._unbind = At(document, Zt, function (t) {
                                return !Et(t.target, e.$el) && e.hide();
                            })),
                            clearTimeout(this.showTimer),
                            (this.showTimer = setTimeout(function () {
                                e._show(),
                                    (e.hideTimer = setInterval(function () {
                                        $t(e.$el) || e.hide();
                                    }, 150));
                            }, this.delay)));
                    },
                    hide: function () {
                        !this.isActive() ||
                            (mt(this.$el, "input") &&
                                this.$el === document.activeElement) ||
                            (Gr.splice(Gr.indexOf(this), 1),
                            clearTimeout(this.showTimer),
                            clearInterval(this.hideTimer),
                            tt(this.$el, "aria-expanded", !1),
                            this.toggleElement(this.tooltip, !1),
                            this.tooltip && ue(this.tooltip),
                            (this.tooltip = !1),
                            this._unbind());
                    },
                    _show: function () {
                        (this.tooltip = ae(
                            this.container,
                            '<div class="' +
                                this.clsPos +
                                '" aria-expanded="true" aria-hidden> <div class="' +
                                this.clsPos +
                                '-inner">' +
                                this.title +
                                "</div> </div>",
                        )),
                            this.positionAt(this.tooltip, this.$el),
                            (this.origin =
                                "y" === this.getAxis()
                                    ? ai(this.dir) + "-" + this.align
                                    : this.align + "-" + ai(this.dir)),
                            this.toggleElement(this.tooltip, !0);
                    },
                    isActive: function () {
                        return b(Gr, this);
                    },
                },
                events:
                    ((qr = {
                        focus: "show",
                        blur: "hide",
                    }),
                    (qr[Qt + " " + te] = function (t) {
                        Mi(t) || (t.type === Qt ? this.show() : this.hide());
                    }),
                    (qr[Gt] = function (t) {
                        Mi(t) && (this.isActive() ? this.hide() : this.show());
                    }),
                    qr),
            },
            Zr = {
                props: {
                    allow: String,
                    clsDragover: String,
                    concurrent: Number,
                    maxSize: Number,
                    method: String,
                    mime: String,
                    msgInvalidMime: String,
                    msgInvalidName: String,
                    msgInvalidSize: String,
                    multiple: Boolean,
                    name: String,
                    params: Object,
                    type: String,
                    url: String,
                },
                data: {
                    allow: !1,
                    clsDragover: "uk-dragover",
                    concurrent: 1,
                    maxSize: 0,
                    method: "POST",
                    mime: !1,
                    msgInvalidMime: "Invalid File Type: %s",
                    msgInvalidName: "Invalid File Name: %s",
                    msgInvalidSize: "Invalid File Size: %s Kilobytes Max",
                    multiple: !1,
                    name: "files[]",
                    params: {},
                    type: "",
                    url: "",
                    abort: G,
                    beforeAll: G,
                    beforeSend: G,
                    complete: G,
                    completeAll: G,
                    error: G,
                    fail: G,
                    load: G,
                    loadEnd: G,
                    loadStart: G,
                    progress: G,
                },
                events: {
                    change: function (t) {
                        mt(t.target, 'input[type="file"]') &&
                            (t.preventDefault(),
                            t.target.files && this.upload(t.target.files),
                            (t.target.value = ""));
                    },
                    drop: function (t) {
                        to(t);
                        var e = t.dataTransfer;
                        e &&
                            e.files &&
                            ($e(this.$el, this.clsDragover),
                            this.upload(e.files));
                    },
                    dragenter: function (t) {
                        to(t);
                    },
                    dragover: function (t) {
                        to(t), ke(this.$el, this.clsDragover);
                    },
                    dragleave: function (t) {
                        to(t), $e(this.$el, this.clsDragover);
                    },
                },
                methods: {
                    upload: function (t) {
                        var n = this;
                        if (t.length) {
                            _t(this.$el, "upload", [t]);
                            for (var e = 0; e < t.length; e++) {
                                if (
                                    this.maxSize &&
                                    1e3 * this.maxSize < t[e].size
                                )
                                    return void this.fail(
                                        this.msgInvalidSize.replace(
                                            "%s",
                                            this.maxSize,
                                        ),
                                    );
                                if (this.allow && !Qr(this.allow, t[e].name))
                                    return void this.fail(
                                        this.msgInvalidName.replace(
                                            "%s",
                                            this.allow,
                                        ),
                                    );
                                if (this.mime && !Qr(this.mime, t[e].type))
                                    return void this.fail(
                                        this.msgInvalidMime.replace(
                                            "%s",
                                            this.mime,
                                        ),
                                    );
                            }
                            this.multiple || (t = [t[0]]),
                                this.beforeAll(this, t);
                            var r = (function (t, e) {
                                    for (
                                        var i = [], n = 0;
                                        n < t.length;
                                        n += e
                                    ) {
                                        for (var r = [], o = 0; o < e; o++)
                                            r.push(t[n + o]);
                                        i.push(r);
                                    }
                                    return i;
                                })(t, this.concurrent),
                                o = function (t) {
                                    var e = new FormData();
                                    for (var i in (t.forEach(function (t) {
                                        return e.append(n.name, t);
                                    }),
                                    n.params))
                                        e.append(i, n.params[i]);
                                    Vt(n.url, {
                                        data: e,
                                        method: n.method,
                                        responseType: n.type,
                                        beforeSend: function (t) {
                                            var e = t.xhr;
                                            e.upload &&
                                                At(
                                                    e.upload,
                                                    "progress",
                                                    n.progress,
                                                ),
                                                [
                                                    "loadStart",
                                                    "load",
                                                    "loadEnd",
                                                    "abort",
                                                ].forEach(function (t) {
                                                    return At(
                                                        e,
                                                        t.toLowerCase(),
                                                        n[t],
                                                    );
                                                }),
                                                n.beforeSend(t);
                                        },
                                    }).then(
                                        function (t) {
                                            n.complete(t),
                                                r.length
                                                    ? o(r.shift())
                                                    : n.completeAll(t);
                                        },
                                        function (t) {
                                            return n.error(t);
                                        },
                                    );
                                };
                            o(r.shift());
                        }
                    },
                },
            };
        function Qr(t, e) {
            return e.match(
                new RegExp(
                    "^" +
                        t
                            .replace(/\//g, "\\/")
                            .replace(/\*\*/g, "(\\/[^\\/]+)*")
                            .replace(/\*/g, "[^\\/]+")
                            .replace(/((?!\\))\?/g, "$1.") +
                        "$",
                    "i",
                ),
            );
        }
        function to(t) {
            t.preventDefault(), t.stopPropagation();
        }
        return (
            Li.component("countdown", or),
            Li.component("filter", dr),
            Li.component("lightbox", Er),
            Li.component("lightboxPanel", Ir),
            Li.component("notification", Cr),
            Li.component("parallax", Dr),
            Li.component("slider", Wr),
            Li.component("sliderParallax", Vr),
            Li.component("slideshow", Xr),
            Li.component("slideshowParallax", Vr),
            Li.component("sortable", Kr),
            Li.component("tooltip", Jr),
            Li.component("upload", Zr),
            (function (o) {
                var s = o.connect,
                    a = o.disconnect;
                function t() {
                    h(document.body, s),
                        gi.flush(),
                        new MutationObserver(function (t) {
                            return t.forEach(e);
                        }).observe(document, {
                            childList: !0,
                            subtree: !0,
                            characterData: !0,
                            attributes: !0,
                        }),
                        (o._initialized = !0);
                }
                function e(t) {
                    var e = t.target;
                    ("attributes" !== t.type
                        ? (function (t) {
                              for (
                                  var e = t.addedNodes,
                                      i = t.removedNodes,
                                      n = 0;
                                  n < e.length;
                                  n++
                              )
                                  h(e[n], s);
                              for (var r = 0; r < i.length; r++) h(i[r], a);
                              return !0;
                          })(t)
                        : (function (t) {
                              var e = t.target,
                                  i = t.attributeName;
                              if ("href" === i) return !0;
                              var n = Oi(i);
                              if (n && n in o) {
                                  if (et(e, i)) return o[n](e), !0;
                                  var r = o.getComponent(e, n);
                                  return r ? (r.$destroy(), !0) : void 0;
                              }
                          })(t)) && o.update(e);
                }
                function h(t, e) {
                    if (1 === t.nodeType && !et(t, "uk-no-boot"))
                        for (e(t), t = t.firstElementChild; t; ) {
                            var i = t.nextElementSibling;
                            h(t, e), (t = i);
                        }
                }
                "MutationObserver" in window &&
                    (document.body
                        ? t()
                        : new MutationObserver(function () {
                              document.body && (this.disconnect(), t());
                          }).observe(document, {
                              childList: !0,
                              subtree: !0,
                          }));
            })(Li),
            Li
        );
    });
} catch (e) {
    console.error(
        "Error in file:/templates/yootheme/vendor/assets/uikit/dist/js/uikit.min.js?v=1.19.1; Error:" +
            e.message,
    );
}
try {
    !(function (t, i) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = i())
            : "function" == typeof define && define.amd
            ? define("uikitmorgan_consulting", i)
            : ((t = t || self).UIkitMorgan_consulting = i());
    })(this, function () {
        "use strict";
        // function i(t) {
        //     i.installed ||
        //         t.icon.add({
        //             "500px":
        //         });
        // }
        return (
            "undefined" != typeof window && window.UIkit && window.UIkit.use(i),
            i
        );
    });
} catch (e) {
    console.error(
        "Error in file:/templates/yootheme/vendor/assets/uikit/dist/js/uikit-icons-morgan-consulting.min.js?v=1.19.1; Error:" +
            e.message,
    );
}
try {
    !(function (i, n) {
        "use strict";
        i = i && i.hasOwnProperty("default") ? i.default : i;
        var o =
                '.tm-header ~ [class*="uk-section"], .tm-header ~ :not(.tm-page) > [class*="uk-section"]',
            t = {
                update: [
                    {
                        read: function () {
                            var t = n.$(o),
                                e = n.attr(t, "tm-header-transparent");
                            if (!e || !t) return !1;
                            var a = i.getComponent(
                                n.$("[uk-sticky]", this.$el),
                                "sticky",
                            );
                            if (a) {
                                var r = a.$options.data;
                                "uk-animation-slide-top" !== r.animation &&
                                    n.each(
                                        {
                                            top: o,
                                            animation: "uk-animation-slide-top",
                                            clsInactive:
                                                "uk-navbar-transparent uk-" + e,
                                        },
                                        function (t, e) {
                                            return (r[e] =
                                                a[e] =
                                                a.$props[e] =
                                                    t);
                                        },
                                    ),
                                    (a.$props.top =
                                        t.offsetHeight <= window.innerHeight
                                            ? o
                                            : n.offset(t).top + 300);
                            }
                            return {
                                section: t,
                                modifier: e,
                                height: this.$el.offsetHeight,
                            };
                        },
                        write: function (t) {
                            var e = t.height,
                                a = t.modifier,
                                r = t.section;
                            if (!this.placeholder) {
                                n.addClass(
                                    this.$el,
                                    "tm-header-transparent tm-header-overlay",
                                ),
                                    n.addClass(
                                        n.$$(
                                            ".tm-headerbar-top, .tm-headerbar-bottom, .tm-toolbar-transparent",
                                        ),
                                        "uk-" + a,
                                    ),
                                    n.removeClass(
                                        n.$(
                                            ".tm-toolbar-transparent.tm-toolbar-default",
                                        ),
                                        "tm-toolbar-default",
                                    );
                                var i = n.$("[uk-navbar]", this.$el);
                                "push" === n.attr(i, "dropbar-mode") &&
                                    n.attr(i, "dropbar-mode", "slide"),
                                    n.$("[uk-sticky]", this.$el) ||
                                        n.addClass(
                                            n.$(
                                                ".uk-navbar-container",
                                                this.$el,
                                            ),
                                            "uk-navbar-transparent uk-" + a,
                                        );
                                var o = n.$("[uk-grid]", r);
                                this.placeholder =
                                    o &&
                                    n.hasAttr(
                                        r,
                                        "tm-header-transparent-placeholder",
                                    ) &&
                                    n.before(
                                        o,
                                        '<div class="tm-header-placeholder uk-margin-remove-adjacent"></div>',
                                    );
                            }
                            n.css(this.placeholder, {
                                height: e,
                            });
                        },
                        events: ["load", "resize"],
                    },
                ],
            };
        if ((i.component("header", t), n.isRtl)) {
            var e = {
                init: function () {
                    this.$props.pos = n.swap(this.$props.pos, "left", "right");
                },
            };
            i.mixin(e, "drop"), i.mixin(e, "tooltip");
        }
        n.ready(function () {
            var t = window,
                e = t.$load,
                a = void 0 === e ? [] : e,
                r = t.$theme;
            !(function t(e, a) {
                e.length &&
                    e.shift()(a, function () {
                        return t(e, a);
                    });
            })(a, void 0 === r ? {} : r);
        });
    })(UIkit, UIkit.util);
} catch (e) {
    console.error(
        "Error in file:/templates/yootheme/js/theme.js?v=1.19.1; Error:" +
            e.message,
    );
}
try {
    document.addEventListener("DOMContentLoaded", function () {
        Array.prototype.slice
            .call(document.querySelectorAll('a span[id^="cloak"]'))
            .forEach(function (span) {
                span.innerText = span.textContent;
            });
    });
    var $theme = {};
} catch (e) {
    console.error("Error in script declaration; Error:" + e.message);
}
