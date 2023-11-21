/**
 * Fancybox
 * 
 * @requires jquery-fancybox
 * @param {String} selector
 */
let flatpickrOptions = {
    //groupAll: true,
    //classException
};
const flatpickrEcs = {
    init: function(selector) {
        if ($.fn.flatpickr) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.flatpickr = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this);
                let settings = $.extend(true, {}, flatpickrOptions, Ecsgroup.parseOptions($this.attr('data-flatpickr-options')));
                $this.flatpickr(settings);
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.flatpickr = function (selector) {
    return flatpickrEcs.init(selector);
};