const scrollToEcs = {
    init: function(target, duration) {
        let startPerformanceTime = performance.now();
        this.core.start(target, duration);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.scrollTo = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(target, duration) {
            let _duration = typeof duration == 'undefined' ? 0 : duration,
                offset;
            if (typeof target == 'number') {
                offset = target;
            } else {
                let $target = Ecsgroup.$(target);
                if (!$target.length || $target.css('display') == 'none') {
                    return;
                }
                let offset = $target.offset().top;
                //let $wpToolbar = $('#wp-toolbar');
                //window.innerWidth > 600 && $wpToolbar.length && (offset -= $wpToolbar.parent().outerHeight());
                $('.sticky-content.fix-top.fixed').each(function () {
                    offset -= this.offsetHeight;
                })
            }
            $('html,body').stop().animate({ scrollTop: offset }, _duration);
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.scrollTo = function (target, duration) {
    return scrollToEcs.init(target, duration);
}