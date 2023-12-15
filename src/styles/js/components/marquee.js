/**
 * Set Marquee
 * 
 * @requires jquery-marquee
 * @param {String} selector
*/
let marqueeOptions = {
    pauseOnHover: true,
    gap: 30,
    duplicated: true
};
const marqueeEcs = {
    init: function(selector) {
        if ($.fn.marquee) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.marquee = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this),
                    settings = $.extend(true, {}, marqueeOptions, Ecsgroup.parseOptions($this.attr('data-marquee-options')));
                $this.marquee(settings);
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.marquee = function (selector) {
    return marqueeEcs(selector);
};