/**
 * Set TypeWriter 
 * 
 * @param {string, Object} selector
 * @param {Object} options
 */
let typeWriterOptions = {
    loop: true,
    autoStart: true
};
const typeWriterEcs = {
    init: function(selector) {
        if (typeof Typewriter !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.typeWriter = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this);
                typeWriterOptions.strings = Ecsgroup.parseOptions($this.attr('data-typewriter-value'));
                let settings = $.extend(true, {}, typeWriterOptions, Ecsgroup.parseOptions($this.attr('data-typewriter-options')), Ecsgroup.parseOptions());
                new Typewriter(this, settings);
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.typeWriter = function (selector) {
    return typeWriterEcs.init(selector);
};
