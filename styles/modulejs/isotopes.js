/**
 * isotopes
 *
 *
 * @requires isotope,imagesLoaded
 * @param {String} selector,
 * @param {object} options
 */
Ecsgroup.isotopeOptions = {
    itemsSelector: '.grid-item',
    layoutMode: 'fitRows',
    percentPosition: true,
    // masonry: {
    //     columnWidth: '.grid-space'
    // }
}

Ecsgroup.isotopes = function (selector, options) {
    if (typeof imagesLoaded === 'function' && $.fn.isotope) {
        var self = this;
        Ecsgroup.$(selector).each(function () {
            var $this = $(this),
                settings = $.extend(true, {},
                    self.isotopeOptions,
                    Ecsgroup.parseOptions($this.attr('data-grid-options')),
                    options ? options : {}
                );
            Ecsgroup.$(selector).find('img').each(function (e) {
                var img = this;
                // Ecsgroup.lazyLoad(img);
            });
            $this.imagesLoaded(function () {
                settings.customInitHeight && $this.height($this.height());
                settings.customDelay && Ecsgroup.call(function () {
                    $this.isotope(settings);
                }, parseInt(settings.customDelay));
                $this.isotope(settings);
            });
        });
    }
}
