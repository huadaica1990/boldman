/**
 * Page scroll to id
 * @functionn pageScrollToId
 *
 * @requires page-scroll-to-id
 * @param {String} selector
 */
function scrolToIdEcs(selector, option) {
    if ($.fn.mPageScroll2id) {
        var scrollToIOptions = {
                highlightClass: 'active',
                highlightSelectorParent: true,
                singleHighlight: true,
                onStart:function(){
                    closeMenu();
                }
            },
            $this = $(selector),
            settings = $.extend(true, {}, scrollToIOptions, option);
        $(selector).mPageScroll2id(settings);
        $this.on('click', function() {
            var liTarget = $(this).closest('li');
            liTarget.addClass('active').siblings().removeClass('active');
        });
        if (settings.singleHighlight) {
            window.addEventListener('scroll', function () {
                var idLink = $('.mPS2id-target').attr('id');
                $('a[href="#' + idLink + '"]').closest('li').addClass('active').siblings().removeClass('active');
                console.log(idLink);
            });
        }
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
Ecsgroup.pageScrollToId = function (selector, option) {
    return new scrolToIdEcs(selector, option);
};