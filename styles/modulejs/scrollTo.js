Ecsgroup.scrollTo = function(target, duration) {
    var _duration = typeof duration == 'undefined' ? 0 : duration;
    var offset;

    if (typeof target == 'number') {
        offset = target;
    } else {
        var $target = Ecsgroup.$(target);
        if (!$target.length || $target.css('display') == 'none') {
            return;
        }

        var offset = $target.offset().top;
        //var $wpToolbar = $('#wp-toolbar');
        //window.innerWidth > 600 && $wpToolbar.length && (offset -= $wpToolbar.parent().outerHeight());
        $('.sticky-content.fix-top.fixed').each(function () {
            offset -= this.offsetHeight;
        })
    }

    $('html,body').stop().animate({ scrollTop: offset }, _duration);
}