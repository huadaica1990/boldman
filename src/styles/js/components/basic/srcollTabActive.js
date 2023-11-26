/**
 * srcollTabActive
 *
 * 
 * @param {String} selector 
 * @param {String} classactive 
 */
const srcollTabActiveEcs = {
    init: function (selector, classactive) {
        let startPerformanceTime = performance.now();
        this.core.start(selector, classactive);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.srcollTabActive = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function (selector, classactive) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this),
                    eActiveLeft = $this.find(classactive).first().offset().left;
                $this.scrollLeft(eActiveLeft);
                $(selector + ' > *').on('click', function(ele){
                    ele.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                })
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}
Ecsgroup.srcollTabActive = function (selector, classactive) {
    return srcollTabActiveEcs.init(selector, classactive);
};