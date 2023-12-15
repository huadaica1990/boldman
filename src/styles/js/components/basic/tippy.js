/**
 * Set Marquee
 * 
 * @requires Tippy
 * @param {String} selector
 * HTM <div data-tippy-options="{'content':'MSG'}"></div>
*/
let tippyOptions = {
    allowHTML: true,
    placement: 'top'
};
const tippyEcs = {
    init: function (selector) {
        if (typeof tippy !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.tippy = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function (selector) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this),
                    settings = $.extend(true, {}, tippyOptions, Ecsgroup.parseOptions($this.attr('data-tippy-options')));
                tippy(this, settings);
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}
Ecsgroup.tippy = function (selector) {
    return tippyEcs.init(selector);
};