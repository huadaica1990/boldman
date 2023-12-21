/**
 * parallax
 *
 * Set parallax background
 * 
 * @requires themePluginParallax
 * @param {string} selector
*/
const parallaxEcs = {
    init: function(selector, options) {
        if ($.fn.themePluginParallax) {
            let startPerformanceTime = performance.now();
            this.core.start(selector, options);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.parallax = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector, options) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this);
                $this.themePluginParallax(
                    $.extend(true, Ecsgroup.parseOptions($this.attr('data-parallax-options')), options)
                );
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.parallax = function (selector, options) {
    return parallaxEcs.init(selector, options);
};