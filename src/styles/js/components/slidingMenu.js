/**
 * Toggler Make
 *
 * @param {String} selector
 */
const slidingMenuEcs = {
    init: function(selector, marker) {
        let startPerformanceTime = performance.now();
        this.core.start(selector, marker);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.slidingMenu = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector, marker) {
            let target = $(selector),
                targetCurent = $(selector).find('li.active a'),
                itemLink = target.find('a'),
                line = target.find(marker);
            slidingMenuEcs.core.indicator(targetCurent, line);
            itemLink.each(function() {
                $(this).on("click", function(event){
                    $(event.target).parent().addClass('active').siblings().removeClass('active');
                    slidingMenuEcs.core.indicator($(event.target));
                });
            });
        },
        indicator: function(targetCurent, line) {
            line.css({
                'left': targetCurent[0].offsetLeft + "px",
                'width': targetCurent[0].offsetWidth + "px",
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.slidingMenu = function (selector, marker) {
    return slidingMenuEcs.init(selector, marker);
};