/**
 * countTo
 *
 * 
 * @requires jQuery.countTo
 * @param {String} selector
 */
const countToEcs = {
    init: function(selector) {
        if ($.fn.countTo) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.countTo = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                Ecsgroup.appear(this, function () {
                    let $this = $(this);
                    setTimeout(function () {
                        $this.countTo({
                            onComplete: function () {
                                $this.addClass('complete');
                            }
                        })
                    }, 300);
                })
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.countTo = function (selector) {
    return countToEcs.init(selector);
};