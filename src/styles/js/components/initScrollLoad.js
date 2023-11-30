/**
 * initScrollLoad
 *
 * Register events sroll loadmore
 * 
 * @param {String} selector 
 */

const scrollLoadEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start(selector, callback);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.initScrollLoad = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector, callback) {
            let $wrapper = Ecsgroup.$(selector),
            top;
            let loadProducts = function (e) {
                if (window.pageYOffset > top + $wrapper.outerHeight() - window.innerHeight && 'loading' != $wrapper.attr('data-load-state')) Ecsgroup.debounce(callback(), 1000);
            }
            if ($wrapper.length > 0) {
                top = $wrapper.offset().top;
                window.addEventListener('scroll', loadProducts, { passive: true });
            }
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initScrollLoad = function (selector, callback) {
    return scrollLoadEcs.init(selector, callback);
};
