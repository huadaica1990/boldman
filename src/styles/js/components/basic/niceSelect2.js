/**
 * blank
 *
 * Register events for blank
 * 
 * @param {String} selector 
 */
let niceSelectOption = {};
const niceSelect2Ecs = {
    init: function(selector) {
        if (typeof NiceSelect !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.niceSelect2 = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let _this = this;
                let settings = $.extend(true, {}, niceSelectOption, Ecsgroup.parseOptions($(_this).attr('data-niceselect-options')));
                NiceSelect.bind(_this, settings);
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.niceSelect2 = function (selector) {
    return niceSelect2Ecs.init(selector);
};