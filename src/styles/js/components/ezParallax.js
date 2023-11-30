/**
 * Set ez Parallax
 * @param {String} selector
*/

const blankEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start(selector, parallaxJson);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.ezParallax = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector, parallaxJson) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this);
                $this.css(parallaxJson);
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.ezParallax = function (selector, parallaxJson) {
    return ezParallaxEcs.init(selector, parallaxJson);
};
