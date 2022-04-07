/**
 * Read More Content
 * @function readMore
 * 
 * @requires readmore-js
 * @param {String} selector
 */
Ecsgroup.readMore = function (selector, text1 = 'Xem thêm nội dung', text2 = 'Thu gọn nội dung') {
    var link = '<div class="readmore-js open"></div>',
        moreLink = '<a href="javascript:" class="btn-readmore-js">' + text1 + '</a>',
        lessLink = '<a href="javascript:" class="btn-readmore-js">' + text2 + '</a>';
    Ecsgroup.$(selector).each(function () {
        var $this = $(this);
        if ($this.height() > 200) {
            $this.css({
                'max-height': 'none',
                'pointer-events': 'none',
                'height': '200px',
                'overflow': 'hidden'
            });
            $(link).html(moreLink).insertAfter($this);
        }
    });
    Ecsgroup.$body.on('click', '.btn-readmore-js', function (event) {
        event.preventDefault();
        var $this = $(this),
            parent = $this.parent(),
            container = parent.prev();
        if (parent.hasClass('open')) {
            container.css({
                'max-height': 'none',
                'pointer-events': 'auto',
                'height': 'auto',
                'overflow': 'inherit'
            });
            parent.addClass('close').removeClass('open').html(lessLink);
        }
        else {
            container.css({
                'max-height': 'none',
                'pointer-events': 'none',
                'height': '200px',
                'overflow': 'hidden'
            });
            parent.addClass('open').removeClass('close').html(moreLink);
        }
        $('html, body').animate({ scrollTop: container.offset().top - 200 }, { duration: 100 });
    });
    //if ($.fn.readmore) {
    //    var readMoreOptions = {
    //        speed: 75,
    //        moreLink: '<div class="readmore-js open"><a href="#" class="btn-readmore-js">Xem thêm nội dung</a></div>',
    //        lessLink: '<div class="readmore-js close"><a href="#" class="btn-readmore-js">Thu gọn nội dung</a></div>',
    //        beforeToggle: function(trigger, element, expanded) 
    //        {
    //            console.log(element);
    //            element.find('.readmore-js').remove();
    //            $('html, body').animate({ scrollTop: element.offset().top - 200}, { duration: 100 });
    //        } 
    //    };
    //    Ecsgroup.$(selector).each(function () {
    //        var $this = $(this),
    //            settings = $.extend(true, {}, readMoreOptions, Ecsgroup.parseOptions($this.attr('data-readmore-options')));
    //            $this.readmore(settings);
    //    });
    //}
}