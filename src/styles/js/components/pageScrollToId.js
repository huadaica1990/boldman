/**
 * Page scroll to id
 * @functionn pageScrollToId
 *
 * @requires page-scroll-to-id
 * @param {String} selector
 */
function scrolToIdEcs(selector) {
    if ($.fn.mPageScroll2id) {
        var scrollToIOptions = {
                highlightClass: 'active',
                highlightSelectorParent: true,
                onStart:function(){
                    closeMenu();
                }
            },
            $this = $(selector),
            settings = $.extend(true, {}, scrollToIOptions, Ecsgroup.parseOptions($this.attr('data-scrollto-options')));
        $(selector).mPageScroll2id(settings);
        $this.on('click', function() {
            var liTarget = $(this).closest('li');
            liTarget.addClass('active').siblings().removeClass('active');
        });
        function closeMenu(){
            if(Ecsgroup.$body.hasClass('mmenu-active')) {
                //$(this).removeClass('show');
                $('.mobile-menu-btn').removeClass('show');
                $('#nav-mobile-content .show').removeClass('show');
                $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300');
                setTimeout(function () {
                    Ecsgroup.$body.removeClass('mmenu-active');
                }, 150);
            }
        }

    }
};
Ecsgroup.pageScrollToId = function (selector) {
    return new scrolToIdEcs(selector);
};