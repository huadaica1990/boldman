/**
 * stickySidebar
 *
 * 
 * @requires themeSticky
 * @param {String} selector
 */
 Ecsgroup.stickySidebarOptions = {
    autoInit: true,
    minWidth: 991,
    containerSelector: '.sticky-sidebar-wrapper',
    autoFit: true,
    activeClass: 'sticky-sidebar-fixed',
    top: 0,
    bottom: 0
};
Ecsgroup.stickySidebar = function (selector) {
    if ($.fn.themeSticky) {
    var top = 0;
    if (!$('.sticky-sidebar-notop').length && Ecsgroup.$window.width() >= 992) {
        $('.sticky-content.fix-top').each(function (e) {
            if (!$(this).hasClass('sticky-toolbox')) {
                var $fixed = $(this).hasClass('fixed');
                top += $(this).addClass('fixed').outerHeight();
                $fixed || $(this).removeClass('fixed');
            }
        });
    }

    Ecsgroup.$(selector).each(function () {
        var $this = $(this);
        $this.themeSticky($.extend({}, Ecsgroup.stickySidebarOptions, { padding: { top: top } }, Ecsgroup.parseOptions($this.attr('data-sticky-options'))));
    });

    function recalcSticky() {
        Ecsgroup.$(selector).trigger('recalc.pin');
        Ecsgroup.$window.trigger('appear.check');
    }

    setTimeout(recalcSticky, 300);
        Ecsgroup.$window.on('click', '.tab .nav-link', function () {
            setTimeout(recalcSticky);
        });
    }
}