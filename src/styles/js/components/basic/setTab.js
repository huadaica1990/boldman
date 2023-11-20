/**
 * Register event for tab click
 * 
 * @param {String} selector 
 */
Ecsgroup.setTab = function (selector) {
    function _activeTab(e) {
        var $this = $(this);
        e.preventDefault();
        if (!$this.hasClass("active")) {
            var $panel = $($this.attr('href'));
            $panel.siblings('.active').removeClass('in active');
            $panel.addClass('active in');
    
            $this.parent().parent().find('.active').removeClass('active');
            $this.addClass('active');
        }
    }

    function _linkToTab(e) {
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

    Ecsgroup.$body
        .on('click', '.tab-js .nav-link', _activeTab) // tab nav link
        .on('click', '.link-to-tab-js', _linkToTab);  // link to tab
}