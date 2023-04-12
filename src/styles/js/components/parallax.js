/**
 * parallax
 *
 * Set parallax background
 * 
 * @requires themePluginParallax
 * @param {string} selector
*/
Ecsgroup.parallax = function (selector, options) {
    if ($.fn.themePluginParallax) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            $this.themePluginParallax(
                $.extend(true, Ecsgroup.parseOptions($this.attr('data-parallax-options')), options)
            );
        });
    }
}