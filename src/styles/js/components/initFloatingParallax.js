/**
 * Initialize floating elements
 * 
 * @since 1.0
 * @param {string|jQuery} selector
 * @return {void}
 */

const floatingParallaxEcs = {
    init: function(selector) {
        if ($.fn.parallax) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.initFloatingParallax = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function (e) {
                let $this = $(this);
                if ($this.data('parallax')) {
                    $this.parallax('disable');
                    $this.removeData('parallax');
                    $this.removeData('options');
                }
                $this.children().addClass('layer').attr('data-depth', $this.attr('data-child-depth'));
                $this.parallax(Ecsgroup.parseOptions($this.data('options')));
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initFloatingParallax = function (selector) {
    return floatingParallaxEcs.init(selector);
};