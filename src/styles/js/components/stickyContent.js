 /**
 * Initialize Sticky Content
 * 
 * @class StickyContent
 * @since 1.0
 * @param {string, Object} selector
 * @param {Object} options
 * @return {void}
 */
/**
 * Sticky Default Options
 */
Ecsgroup.stickyDefaultOptions = {
    minWidth: 992,
    maxWidth: 20000,
    top: false,
    hide: false,
    scrollMode: true
}
Ecsgroup.stickyToolboxOptions = {
    minWidth: 0,
    maxWidth: 767,
    top: false,
    scrollMode: false
}
Ecsgroup.stickyProductOptions = {
    minWidth: 0,
    maxWidth: 20000,
    scrollMode: true,
    top: false,
    hide: false
}

Ecsgroup.stickyContent = (function () {
    function StickyContent($el, options) {
        return this.init($el, options);
    }
    function refreshAll() {
        Ecsgroup.$window.trigger('sticky_refresh.Ecsgroup', {
            index: 0,
            offsetTop: 0
        });
    }

    function refreshAllSize(e) {
        if (!e || Ecsgroup.windowResized(e.timeStamp)) {
            Ecsgroup.$window.trigger('sticky_refresh_size.Ecsgroup');
            refreshAll();
        }
    }

    StickyContent.prototype.init = function ($el, options) {
        this.$el = $el;
        this.options = $.extend(true, {}, Ecsgroup.stickyDefaultOptions, options, Ecsgroup.parseOptions($el.attr('data-sticky-options')));
        Ecsgroup.$window
            .on('sticky_refresh.Ecsgroup', this.refresh.bind(this))
            .on('sticky_refresh_size.Ecsgroup', this.refreshSize.bind(this));
    }

    StickyContent.prototype.refreshSize = function (e) {
        var beWrap = window.innerWidth >= this.options.minWidth && window.innerWidth <= this.options.maxWidth;
        this.scrollPos = window.pageYOffset;
        if (typeof this.top == 'undefined') {
            this.top = this.options.top;
        }

        if (window.innerWidth >= 768 && this.getTop) {
            this.top = this.getTop();
        } else if (!this.options.top) {
            this.top = this.isWrap ?
                this.$el.parent().offset().top :
                this.$el.offset().top + this.$el[0].offsetHeight;

            // if sticky header has toggle dropdown menu, increase top
            if (this.$el.hasClass('has-dropdown')) {

                this.top += this.$el.find('#nav-sidebar .dropdown-box')[0] ? this.$el.find('#nav-sidebar .dropdown-box')[0].offsetHeight : 0;
            }
        }
        if (!this.isWrap) {
            beWrap && this.wrap();
        } else {
            beWrap || this.unwrap();
        }

        Ecsgroup.sticky_top_height = 0;

        e && setTimeout(this.refreshSize.bind(this), 50);
    }

    StickyContent.prototype.wrap = function () {
        this.$el.wrap('<div class="sticky-content-wrapper"></div>');
        this.isWrap = true;
    }

    StickyContent.prototype.unwrap = function () {
        this.$el.unwrap('.sticky-content-wrapper');
        this.isWrap = false;
    }

    StickyContent.prototype.refresh = function (e, data) {
        var pageYOffset = window.pageYOffset + data.offsetTop,
            $el = this.$el;
        this.refreshSize();
        if (pageYOffset > this.top && this.isWrap) {

            // calculate height
            this.height = $el[0].offsetHeight;
            $el.hasClass('fixed') || $el.parent().css('height', this.height + 'px');

            // update sticky order
            if ($el.hasClass('fix-top')) {
                $el.css('margin-top', data.offsetTop + 'px');
                this.zIndex = this.options.max_index - data.index;
            } else if ($el.hasClass('fix-bottom')) {
                $el.css('margin-bottom', data.offsetBottom + 'px');
                this.zIndex = this.options.max_index - data.index;
            } else {
                //$el.css({ 'transition': 'all .5s', 'z-index': this.zIndex });
            }
            // update sticky status

            if (this.options.scrollMode) {
                if (this.scrollPos >= pageYOffset && $el.hasClass('fix-top') ||
                    this.scrollPos <= pageYOffset && $el.hasClass('fix-bottom')) {
                    $el.addClass('fixed');
                    this.onFixed && this.onFixed();
                    // for only sticky cart form.
                    $el.hasClass('product-sticky-content') && Ecsgroup.$body.addClass('addtocart-fixed');
                } else {
                    $el.removeClass('fixed').css('margin-top', '').css('margin-bottom', '');
                    this.onUnfixed && this.onUnfixed();
                    // for only sticky cart form.
                    $el.hasClass('product-sticky-content') && Ecsgroup.$body.removeClass('addtocart-fixed');
                }
                this.scrollPos = pageYOffset;
            } else {
                $el.addClass('fixed');
                this.onFixed && this.onFixed();
            }

            // stack offset
            if ($el.is('.fixed.fix-top')) {
                data.offsetTop += $el[0].offsetHeight;

                Ecsgroup.sticky_top_height = data.offsetTop;
            } else if ($el.is('.fixed.fix-bottom')) {
                data.offsetBottom += $el[0].offsetHeight;
            }

        }
        else {
            $el.parent().css('height', '');
            $el.removeClass('fixed').css({ 'margin-top': '', 'margin-bottom': '', 'z-index': '' });
            this.onUnfixed && this.onUnfixed();
            // for only sticky cart form.
            $el.hasClass('product-sticky-content') && Ecsgroup.$body.removeClass('addtocart-fixed');
        }
    }

    Ecsgroup.$window.on('Ecsgroup_complete', function () {
        window.addEventListener('scroll', refreshAll, { passive: true });
        Ecsgroup.$window.on('resize', refreshAllSize);
        setTimeout(function () {
            refreshAllSize();
        }, 300);
    })

    return function (selector, options) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            $this.data('sticky-content') || $this.data('sticky-content', new StickyContent($this, options));
        })
    }
})()