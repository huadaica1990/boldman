/**
 * isotopes
 *
 *
 * @requires isotope,imagesLoaded
 * @param {String} selector,
 * @param {object} options
 */
let isotopeOptions = {
    itemsSelector: '.grid-item',
    layoutMode: 'fitRows',
    percentPosition: true,
    // masonry: {
    //     columnWidth: '.grid-space'
    // }
}

const isotopesEcs = {
    init: function(selector) {
        if (typeof imagesLoaded === 'function' && $.fn.isotope) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.isotopes = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                var $this = $(this),
                    settings = $.extend(true, {}, isotopeOptions, Ecsgroup.parseOptions($this.attr('data-grid-options')));
                // Ecsgroup.$(selector).find('img').each(function (e) {
                //     var img = this;
                //     Ecsgroup.lazyLoad(img);
                // });
                $this.imagesLoaded(function () {
                    settings.customInitHeight && $this.height($this.height());
                    settings.customDelay && Ecsgroup.call(function () {
                        $this.isotope(settings);
                    }, parseInt(settings.customDelay));
                    $this.isotope(settings);
                });
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.isotopes = function (selector) {
    return isotopesEcs.init(selector);
};