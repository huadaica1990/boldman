/**
 * Initialize floating elements
 * 
 * @since 1.0
 * @param {string|jQuery} selector
 * @return {void}
 */
Ecsgroup.initFloatingParallax = function (selector) {
    if ($.fn.parallax) {
        Ecsgroup.$(selector).each(function (e) {
            var $this = $(this);
            if ($this.data('parallax')) {
                $this.parallax('disable');
                $this.removeData('parallax');
                $this.removeData('options');
            }
            $this.children().addClass('layer').attr('data-depth', $this.attr('data-child-depth'));
            $this.parallax(Ecsgroup.parseOptions($this.data('options')));
        });
    }
};