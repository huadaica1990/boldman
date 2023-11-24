/**
 * Register event for tab click
 * 
 * @param {String} selector 
 */
const setTabEcs = {
    init: function(selector) {
        let startPerformanceTime = performance.now();
        this.core.init(selector);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.setTab = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        init: function(selector) {
            Ecsgroup.$body
            .on('click', '.tab-js .nav-link', setTabEcs.core.activeTab) // tab nav link
            .on('click', '.link-to-tab-js', setTabEcs.core.linkToTab);  // link to tab
        },
        activeTab: function(e) {
            let $this = $(this);
            e.preventDefault();
            if (!$this.hasClass("active")) {
                var $panel = $($this.attr('href'));
                $panel.siblings('.active').removeClass('in active');
                $panel.addClass('active in');
                $this.parent().parent().find('.active').removeClass('active');
                $this.addClass('active');
            }
        },
        linkToTab: function(e) {
            var selector = $(e.currentTarget).attr('href'),
            $tab = $(selector),
            $nav = $tab.parent().siblings('.nav');
            e.preventDefault();

            $tab.siblings().removeClass('active in');
            $tab.addClass('active in');
            $nav.find('.nav-link').removeClass('active');
            $nav.find('[href="' + selector + '"]').addClass('active');

            $('html').animate({
                scrollTop: $tab.offset().top - 150
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};

Ecsgroup.setTab = function (selector) {
    return setTabEcs.init(selector);
}