/**
 * Ecsgroup Javascript File
 *
 * @version 1.0
 */
'use strict';

var $ = jQuery.noConflict();

/* jQuery easing */
$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
});

/**
 * Ecsgroup Object
 */
window.Ecsgroup = {};

/**
 * Ecsgroup Base
 */
(function ($) {
    Ecsgroup.popupPause = false;
    Ecsgroup.dist = '/wwwroot/templates/website/release';
    Ecsgroup.domain = 'localhost:3000';
    Ecsgroup.linkWishList = '/san-pham-yeu-thich';
    Ecsgroup.linkCompare = '/so-sanh';
    Ecsgroup.accInfo = '/thong-tin-tai-khoan';
    Ecsgroup.cartLink = '/gio-hang';
    // Function
    Ecsgroup.isWishList = true;
    Ecsgroup.isCountDown = true;
    Ecsgroup.isCompare = true;
    // $ = jQuery;
    /**
     * jQuery Window Handle
     * 
     * @var jQuery jQuery window handle
     */
    Ecsgroup.$window = $(window);

    /**
     * jQuery Body Handle
     * 
     * @var jQuery jQuery body handle
     */
    Ecsgroup.$body = $(document.body);

    /**
     * jQuery Main Handle
     * 
     * @var jQuery jQuery main handle
     */
    Ecsgroup.$main = $(document.body).find('main');

    /**
     * Status
     * 
     * @var string Status
     */
    Ecsgroup.status = '';

    /**
     * Check if the browser is internet explorer.
     * 
     * @var boolean isIE
     */
    Ecsgroup.isIE = navigator.userAgent.indexOf('Trident') >= 0;

    /**
     * Check if the browser is internet explorer.
     *
     * @var boolean isIE
     */
    Ecsgroup.isEdge = navigator.userAgent.indexOf('Edge') >= 0;
    Ecsgroup.isSafari = navigator.userAgent.indexOf('Safari') >= 0 && navigator.userAgent.indexOf('Chrome') < 0 && navigator.userAgent.indexOf('FxiOS') < 0;
    Ecsgroup.isFirefox = navigator.userAgent.indexOf('Firefox') >= 0 && navigator.userAgent.indexOf('Chrome') < 0 && navigator.userAgent.indexOf('Safari') < 0;
    Ecsgroup.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);

    /**
     * Make a macro task
     * 
     * @param {function} fn
     * @param {number} delay
     * @return {void}
     */
    Ecsgroup.call = function (fn, delay) {
        setTimeout(fn, delay);
    }

    /**
     * Make media query
     * 
     * @param {function} fn
     * @param {number} mq
     * @param {boolean} max
     * @return {void}
     */
    Ecsgroup.mq = function (fn, mq) {
        if (document.documentElement.clientWidth > mq) {
            if (typeof fn == 'function') fn();
            else fn;
        }
    }

    /**
     * Parse options string to object
     *
     * @param {String} options
     * @return {object} options
     */
    Ecsgroup.parseOptions = function (options) {
        return 'string' == typeof options ?
            JSON.parse(options.replace(/'/g, '"').replace(';', '')) :
            {};
    }

    /**
     * Parse html template with variables.
     *
     * @param {String} template
     * @param {object} vars
     * @return {String} parsed template
     */
    Ecsgroup.parseTemplate = function (template, vars) {
        return template.replace(/\{\{(\w+)\}\}/g, function () {
            return vars[arguments[1]];
        });
    }

    /**
     * Get dom element by id
     *
     * @param {String} id
     * @return {HTMLElement} element
     */
    Ecsgroup.byId = function (id) {
        return document.getElementById(id);
    }

    /**
     * Get dom elements by tagName
     *
     * @param {String} tagName
     * @param {HTMLElement} element this can be omitted.
     * @return {HTMLCollection}
     */
    Ecsgroup.byTag = function (tagName, element) {
        return element ?
            element.getElementsByTagName(tagName) :
            document.getElementsByTagName(tagName);
    }

    /**
     * Get dom elements by className
     *
     * @param {String} className
     * @param {HTMLElement} element this can be omitted.
     * @return {HTMLCollection}
     */
    Ecsgroup.byClass = function (className, element) {
        return element ?
            element.getElementsByClassName(className) :
            document.getElementsByClassName(className);
    }

    /**
     * Set cookie
     *
     * @param {String} name Cookie name
     * @param {String} value Cookie value
     * @param {number} exdays Expire period
     */
    Ecsgroup.setCookie = function (name, value, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
    }

    /**
     * Get cookie
     *
     * @param {String} name Cookie name
     * @return {String} Cookie value
     */
    Ecsgroup.getCookie = function (name) {
        var n = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; ++i) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(n) == 0) {
                return c.substring(n.length, c.length);
            }
        }
        return "";
    }
    Ecsgroup.removeCookie = function (name) {
        document.cookie = name + ";Max-Age=-99999999;";
    }

    /**
     * Get jQuery object
     * 
     * @param {string|jQuery} selector
     * @return {jQuery|Object} jQuery Object or {each: $.noop}
     */
    Ecsgroup.$ = function (selector) {
        if (selector instanceof jQuery) {
            return selector;
        }
        return $(selector);
    }

    /**
     * Check if DOM node is on screen
     *
     * @param {HTMLElement} el
     * @return {boolean}
     */
    
    Ecsgroup.isOnScreen = function(element, fullyInView) {
        var pageTop = $(window).scrollTop(),
            pageBottom = pageTop + $(window).height(),
            elementTop = $(element).offset().top,
            elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
    // Ecsgroup.isOnScreen = function (el) {
    //     var a = window.pageXOffset,
    //         b = window.pageYOffset,
    //         o = el.getBoundingClientRect(),
    //         x = o.left + a,
    //         y = o.top + b;
    //     return y + o.height >= b &&
    //         y <= b + window.innerHeight &&
    //         x + o.width >= a &&
    //         x <= a + window.innerWidth;
    // }
    // Ecsgroup.isOnScreen = new IntersectionObserver(function(entries) {
    //     if(entries[0].isIntersecting === true) {}
    // }, { threshold: [0] });

    // Ecsgroup.isVisible = new IntersectionObserver(function(entries) {
    //     if(entries[0].isIntersecting === true) {}
    // }, { threshold: [1] });

    /**
     * Do appear animations.
     *
     * @param {HTMLElement} el
     * @param {function} fn
     * @param {object} options
     * @return {boolean}
     */
    Ecsgroup.appear = function (el, fn, intObsOptions) {
        var interSectionObserverOptions = {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0,
            alwaysObserve: true
        };

        if (intObsOptions && Object.keys(intObsOptions).length) {
            $.extend(intersectionObserverOptions, intObsOptions);
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];

                if (entry.intersectionRatio > 0) {
                    if (typeof fn === 'string') {
                        var func = Function('return ' + functionName)();
                    } else {
                        var callback = fn;

                        callback.call($(entry.target));
                    }
                }
            }
        }, interSectionObserverOptions);

        observer.observe(el);

        return this;
    }

    /**
     * Request Timeout
     * 
     * @param {function} fn
     * @param {number} delay
     */
    Ecsgroup.requestTimeout = function (fn, delay) {
        var handler = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        if (!handler) {
            return setTimeout(fn, delay);
        }

        var start, rt = new Object();

        function loop(timestamp) {
            if (!start) {
                start = timestamp;
            }
            var progress = timestamp - start;
            progress >= delay ? fn() : rt.val = handler(loop);
        };

        rt.val = handler(loop);
        return rt;
    }

    /**
     * Request Interval
     *
     * @param {function} fn
     * @param {number} step
     * @param {number} timeOut
     */
    Ecsgroup.requestInterval = function (fn, step, timeOut) {
        var handler = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        if (!handler) {
            if (!timeOut)
                return setTimeout(fn, timeOut);
            else
                return setInterval(fn, step);
        }
        var start, last, rt = new Object();
        function loop(timestamp) {
            if (!start) {
                start = last = timestamp;
            }
            var progress = timestamp - start;
            var delta = timestamp - last;
            if (!timeOut || progress < timeOut) {
                if (delta > step) {
                    fn();
                    rt.val = handler(loop);
                    last = timestamp;
                } else {
                    rt.val = handler(loop);
                }
            } else {
                fn();
            }
        };
        rt.val = handler(loop);
        return rt;
    }

    /**
     * Delete Timeout
     *
     * @param {number} timerId 
     */
    Ecsgroup.deleteTimeout = function (timerId) {
        if (!timerId) {
            return;
        }
        var handler = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
        if (!handler) {
            return clearTimeout(timerId);
        }
        if (timerId.val) {
            return handler(timerId.val);
        }
    }

    /**
     * Check if window's width is really resized.
     * 
     * @since 1.0
     * @param {number} timeStamp
     * @return {boolean}
     */
    Ecsgroup.windowResized = function (timeStamp) {
        if (timeStamp == Ecsgroup.resizeTimeStamp) {
            return Ecsgroup.resizeChanged;
        }
        Ecsgroup.resizeChanged = Ecsgroup.canvasWidth != window.innerWidth;
        Ecsgroup.canvasWidth = window.innerWidth;
        Ecsgroup.resizeTimeStamp = timeStamp;
        return Ecsgroup.resizeChanged;
    }

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    Ecsgroup.debounce = function (func, delay = 1000) {
        let timeout;
        return function executedFunc(...args) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                func(...args);
                timeout = null;
            }, delay);
        };
    };
    /**
     * alert
     *
     * Register events for alert
     * 
     * @param {String} selector
     */
    Ecsgroup.alert = function (selector) {
        Ecsgroup.$body.on('click', selector + ' .btn-close', function (e) {
            e.preventDefault();
            $(this).closest(selector).fadeOut(function () {
                $(this).remove();
            });
        });
    }

    /**
     * localStorage
     *
     * Register localStorage
     * 
     * @param {String} name
     * @param {String} value
     */
    var localStorage = {
        get: function (name) {
            return JSON.parse(window.localStorage.getItem(name));
        },
        set: function (name, value) {
            var containerArray = new Array();
            if (window.localStorage.getItem(name) != null) containerArray = JSON.parse(window.localStorage.getItem(name));
            if (!containerArray.includes(value)) containerArray.push(value);
            window.localStorage.setItem(name, JSON.stringify(containerArray));
        },
        remove: function (name) {
            window.localStorage.removeItem(name);
        },
        clear: function () {
            window.localStorage.clear();
        }
    }
    Ecsgroup.localStorage = localStorage;

    /**
     * Back to url
     *
     * Register events back to url
     * 
     * @param {String} selector
     */
    Ecsgroup.backToUrl = function (selector) {
        Ecsgroup.$body.on('click', selector, function (e) {
            e.preventDefault();
            var prevUrl = document.referrer;
            if (!document.referrer && /Ecsgroup.domain/.test(document.referrer) == true) location.href = prevUrl;
            else location.href = '/';
        })
    }

    /**
     * Show password
     *
     * Register events show password
     * 
     * @param {String} selector
     */
    Ecsgroup.showPassword = function (selector) {
        Ecsgroup.$body.on('click', selector, function (e) {
            e.preventDefault();
            var targetInput = $(this).prev();
            if (targetInput.attr('type') == 'password') {
                $(this).removeClass('cus-eye');
                targetInput.attr('type', 'text');
                $(this).addClass('cus-eye-off');
            }
            else {
                $(this).removeClass('cus-eye-off');
                targetInput.attr('type', 'password');
                $(this).addClass('cus-eye');
            }
        })
    }

    /**
     * initNotificationAlert
     *
     */
    Ecsgroup.initNotificationAlert = function () {
        if (Ecsgroup.$body.hasClass('has-notification')) {
            setTimeout(function () {
                Ecsgroup.$body.addClass('show-notification');
            }, 5000);
        }
    }

    /**
     * confirmDialog
     *
     */




    /**
     * lazyLoad
     *
     * 
     * lazyload element
     * @param {String} selector
     * @param {boolean} force
     */
    Ecsgroup.lazyLoad = function (selector, force, classremove = 'lazyload', classadd = ' ls-is-cached lazyloaded') {
        function load() {
            this.setAttribute('src', this.getAttribute('data-src'));
            this.addEventListener('load', function () {
                this.style['padding-top'] = '';
                //this.classList.remove('lazy-img');
                $(this).removeClass(classremove);
                $(this).addClass(classadd);
            });
        }

        // Lazyload Images
        Ecsgroup.$(selector).find('.lazy-img').each(function () {
            if ('undefined' != typeof force && force) {
                load.call(this);
            } else {
                Ecsgroup.appear(this, load);
            }
        });
    }

    /**
     * Loading page
     *
     * Register events for loading page
     * 
     * @param {String} selector
     */
    Ecsgroup.showLoading = function (selector) {
        if (!selector) $(selector).addClass('load-more-overlay loading');
        $(".loader-precent").text('');
        Ecsgroup.byId('loading').style.display = 'block';
    }
    Ecsgroup.hideLoading = function (selector) {
        if (!selector) $(selector).removeClass('load-more-overlay loading');
        Ecsgroup.byId('loading').style.display = 'none';
    }
    Ecsgroup.pageLoading = function () {
        let width = 100,
            perfData = window.performance.timing,
            EstimatedTime = -(perfData.domContentLoadedEventEnd - perfData.navigationStart),
            time = parseInt((EstimatedTime/1000)%60)*100;

        // $(".loadbar").animate({
        //     width: width + "%"
        // }, time);
        // $(".glow").animate({
        //     width: width + "%"
        // }, time);
    
        let PercentageID = $(".loader-precent"),
            start = 0,
            end = 100,
            durataion = time;
            animateValue(PercentageID, start, end, durataion);
        function animateValue(id, start, end, duration) {
    
            let range = end - start,
                current = start,
                increment = end > start? 1 : -1,
                stepTime = Math.abs(Math.floor(duration / range)),
                obj = $(id);
            let timer = setInterval(function() {
                current += increment;
                $(obj).text(current + "%");
                if (current == end) {
                    clearInterval(timer);
                    setTimeout(function () {
                        Ecsgroup.byId('loading').style.display = 'none';
                    }, 100);
                    
                }
            }, stepTime);
        }
    }

    /**
     * Show/hide element
     *
     * @param {String} target
     * @param {String} selector
     * @param {String} classname
     */
    Ecsgroup.showHide = function (obj, selector, classname) {
        $(selector).toggleClass(classname);
        if (obj != null) {
            $(obj).toggleClass(classname);
        }
        else {
            Ecsgroup.$body.on('click', function (e) {
                if (!$(e.target).is('.ishow')) {
                    $(selector).removeClass(classname);
                }
            });
        }
    }

    /**
     * Copy content
     *
     * @param {String} selector
     * @param {Object} event
     */
    Ecsgroup.copyUrl = function (selector) {
        Ecsgroup.$body.on('click', selector, function (e) {
            e.preventDefault();
            var $this = $(e.currentTarget),
                temp = $('<input style="opacity:0;position absolute;z-index:-1;">'),
                val = $this.data('text');
            $("body").append(temp);
            temp.val(val).select();
            document.execCommand("copy");
            temp.remove();
            Ecsgroup.Minipopup.open({
                productClass: ' success minipopup-center',
                message: '<p><i class="demo-icon cus-ok-circled"></i>' + core1 + '</p>',
                template:
                    '<div class="minipopup-box {{productClass}}">' +
                    '<div class="minipopup-body">' +
                    '<div class="minipopup-content">{{message}}</div>' +
                    '</div>' +
                    '</div>',
            });
        });
    };

    /**
     * appearAnimate
     *
     * 
     * @param {String} selector
     */
    Ecsgroup.animationOptions = {
        name: 'animate__fadeIn',
        duration: '1.2s',
        delay: '.2s'
    }
    Ecsgroup.appearAnimate = function (selector) {
        Ecsgroup.$(selector).each(function () {
            var el = this;
            Ecsgroup.appear(el, function () {
                if (el.classList.contains('appear-animate')) {
                    var settings = $.extend({}, Ecsgroup.animationOptions, Ecsgroup.parseOptions(el.getAttribute('data-animation-options')));

                    setTimeout(function () {
                        el.style['animation-duration'] = settings.duration;
                        el.classList.add(settings.name);
                        el.classList.add('appear-animation-visible');
                    }, settings.delay ? Number(settings.delay.slice(0, -1)) * 1000 : 0);
                }
            });
        });
    }


    /**
     * clean Unicode
     *
     * @param {String} str
     */
    Ecsgroup.cleanUnicode = function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|\;|\||\{|\}|\~|\“|\”|\™|\–|\-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        str = str.replace(/\\/g, "");
        str = str.replace(/-+-/g, "-");
        return str;
    };

})(jQuery);

/**
 * Ecsgroup Theme
 */
(function ($) {

    // Initialize Method while document is being loaded
    Ecsgroup.prepare = function () {
        Ecsgroup.pageLoading();
        // Ecsgroup.$body.hasClass('with-flex-container') && window.innerWidth >= 1200 &&
        //     Ecsgroup.$body.addClass('sidebar-active');
    };

    // Initialize Method while document is interactive
    Ecsgroup.initLayout = function () {
        // do something later...
        // Ecsgroup.isotopes('.grid:not(.grid-float)');
        // Ecsgroup.stickySidebar('.sticky-sidebar');
    };

    // Initialize Method after document has been loaded
    Ecsgroup.init = function () {
        // Do something later...
        Ecsgroup.initPopup();                                                   // Initialize Popup
        Ecsgroup.showHide();                                                    // Initialize Show Hide
        Ecsgroup.accordion('.accordion-header > a')                             // Initialize Accordion
        Ecsgroup.appearAnimate('.appear-animate');                              // Run appear animation
        Ecsgroup.setTab('.nav-tabs-js');                                        // Initialize Tab
        Ecsgroup.initDropdownAction();                                          // Initialize Dropdown
        Ecsgroup.Minipopup.init();                                              // Initialize minipopup
        Ecsgroup.cutomizeSelect('.custom-select');                              // Initialize cutomizeSelect
        Ecsgroup.srcollTabActive('.scroll-tab-js','.active');                      // Initialize Srcoll Tab Active
        // Core
        Ecsgroup.stickyContent('.sticky-header-mobile', {                       // Initialize Sticky Header Mobile
            minWidth: 0,
            maxWidth: 768,
        });
        Ecsgroup.scrollDirection('.sticky-header-mobile', 'hidden');            // Initialize Scroll Direction
        Ecsgroup.stickyContent('.sticky-header');                               // Initialize Sticky Content
        // Ecsgroup.stickyContent('.sticky-footer', {         
        //     minWidth: 0,
        //     maxWidth: 767,
        //     top: 150,
        //     hide: true,
        //     max_index: 2100
        // });                                                                  // Initialize Sticky Footer
        // Ecsgroup.stickyContent('.sticky-toolbox', Ecsgroup.stickyToolboxOptions);
        // Ecsgroup.stickyContent('.product-sticky-content', Ecsgroup.stickyProductOptions);
        Ecsgroup.menu.init();                                                   // Initialize Menu
        Ecsgroup.initScrollTopButton();                                         // Initialize scroll top button
        // Side bar
        // Ecsgroup.sidebar('sidebar');                                         // Initialize Sidebar
        // Ecsgroup.sidebar('right-sidebar');                                   // Initialize Right Sidebar
        // Product
        Ecsgroup.shoppingCart;                                                  // Initialize add to cart
        // Ecsgroup.shop.init();                                                // Initialize Shop
        // Ecsgroup.productSingle('.single-product-item');                      // Initialize all single products
        // Ecsgroup.initProductSinglePage();                                    // Initialize Single Product Page
        // Ecsgroup.initQtyInput('.quantity');                                  // Initialize Quantity Input
        // Plugin
        Ecsgroup.preSearch('.pre-search');                                      // Initialize Pre search
        Ecsgroup.typeWriter('.typewrite');                                      // Initialize TypeWriter
        Ecsgroup.draggAbilly('.draggable-pc');                                  // Initialize draggAbilly
        Ecsgroup.tippy('.tooltips');                                            // Initialize Tool tips
        Ecsgroup.flatpickr('.flatpickr');                                       // Initialize Flatpickr
        // Ecsgroup.parallax('.parallax');                                      // Initialize Parallax
        // Ecsgroup.skrollrParallax();                                          // Initialize Skrollr Parallax
        // Ecsgroup.initFloatingParallax();                                     // Initialize Floating Parallax
        // Ecsgroup.alert('.alert')                                             // Initialize Alert
        // Ecsgroup.initNavFilter('.nav-filters .nav-filter')                   // Initialize Isotope Navigation Filters
        // Ecsgroup.calendar('.calendar-container');                            // Initialize Calendar
        // Ecsgroup.countDown('.product-countdown');                            // Initialize CountDown
        // Ecsgroup.initNotificationAlert();                                    // Initialize Notification Alert
        // Ecsgroup.countTo('.count-to');                                       // Initialize CountTo
        // Ecsgroup.initCartAction('.cart-offcanvas .cart-toggle');             // Initialize Product Cart
        // Ecsgroup.headerToggleSearch('.hs-toggle');                           // Initialize Header toggle search
        // Ecsgroup.marquee('.marquee')                                         // Initialize Marquee
        // Ecsgroup.initVendor('.store');                                       // Initialize Vendor
        // Ecsgroup.slideContent('.login-toggle');                              // Initialize Slide Content
        // Ecsgroup.slideContent('.coupon-toggle');
        // Ecsgroup.slideContent('.checkbox-toggle');   
        // Ecsgroup.initLoginVendor('.user-checkbox');                          // Initialize Vendor's Login
        // Ecsgroup.notiCustomer(100, new Array(20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000));  // Initialize Noti Customer
    };
})(jQuery);

/**
 * Ecsgroup Theme Initializer
 */

(function ($) {
    'use strict';

    // Prepare Ecsgroup Theme
    Ecsgroup.prepare();

    // Initialize Ecsgroup Theme
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            if (Ecsgroup.isSafari == true) {
                addCSS(Ecsgroup.dist + '/safari.css')
            }
            if (Ecsgroup.isFirefox == true) {
                addCSS(Ecsgroup.dist + '/firefox.css')
            }
        }
    }

    window.onload = function () {
        // Canvas Size
        Ecsgroup.canvasWidth = window.innerWidth;
        Ecsgroup.resizeTimeStamp = 0;
        Ecsgroup.resizeChanged = false;
        // loaded
        Ecsgroup.status = 'loaded';
        document.body.classList.add('loaded');
        Ecsgroup.call(Ecsgroup.initLayout);
        Ecsgroup.call(Ecsgroup.init);
        Ecsgroup.call(Ecsgroup.initPage);
        Ecsgroup.status = 'complete';
        Ecsgroup.$window.trigger('Ecsgroup_complete');
        //Ecsgroup.hideLoading();
    }
})(jQuery);