/**
 * Page scroll to id
 * @functionn pageScrollToId
 *
 * @requires page-scroll-to-id
 * @param {String} selector
 */
let scrollToIOptions = {
    highlightClass: 'active',
    highlightSelectorParent: true,
    singleHighlight: true,
    onStart:function(){
        scrolToIdEcs.core.closeMenu();
    }
}
const scrolToIdEcs = {
    init: function(selector, option) {
        if ($.fn.mPageScroll2id) {
            let startPerformanceTime = performance.now();
            this.core.start(selector, option);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.pageScrollToId = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector, option) {
            let $this = $(selector),
                settings = $.extend(true, {}, scrollToIOptions, option);
            $(selector).mPageScroll2id(settings);
            $this.on('click', function() {
                let liTarget = $(this).closest('li');
                liTarget.addClass('active').siblings().removeClass('active');
            });
            if (settings.singleHighlight) {
                window.addEventListener('scroll', function () {
                    let idLink = $('.mPS2id-target').attr('id');
                    $('a[href="#' + idLink + '"]').closest('li').addClass('active').siblings().removeClass('active');
                });
            }
        },
        closeMenu: function() {
            if(Ecsgroup.$body.hasClass('mmenu-active')) {
                $('.mobile-menu-btn').removeClass('show');
                $('#nav-mobile-content .show').removeClass('show');
                $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300');
                setTimeout(function () {
                    Ecsgroup.$body.removeClass('mmenu-active');
                }, 150);
            }
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.pageScrollToId = function (selector, option) {
    return scrolToIdEcs.init(selector, option);
};