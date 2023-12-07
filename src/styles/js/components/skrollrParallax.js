const skrollrParallaxEcs = {
    init: function() {
        if (typeof skrollr == 'undefined' || Ecsgroup.isMobile) {
            let startPerformanceTime = performance.now();
            this.core.start();
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.skrollrParallax = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function() {
            if (Ecsgroup.$('.skrollable').length) {
                skrollr.init({
                    forceHeight: false
                });
            }
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.skrollrParallax = function () {
    return skrollrParallaxEcs.init();
};