/**
 * Ecsgroup Plugin - Product Single
 * 
 * @requires SwiperContainer
 * @requires zoom
 * @instance multiple
 */
(function ($) {
    function ProductSingle($el) {
        return this.init($el);
    }
    
    var thumbsInit = function (self) {
        // properties for thumbnails

        self.$thumbs = self.$wrapper.find('.product-thumbs');
        self.$thumbsWrap = self.$thumbs.parent();
        self.$thumbUp = self.$thumbsWrap.find('.thumb-up');
        self.$thumbDown = self.$thumbsWrap.find('.thumb-down');
        self.$thumbsDots = self.$thumbs.children();
        self.thumbsCount = self.$thumbsDots.length;
        self.$productThumb = self.$thumbsDots.eq(0);
        self._isPgVertical = self.$thumbsWrap.parent().hasClass('product-gallery-vertical');
        self.thumbsIsVertical = self._isPgVertical && window.innerWidth >= 992;

        // refresh thumbs
        Ecsgroup.slider(self.$thumbsWrap, {}, true);
    }
    
    var variationInit = function (self) {
        self.$selects = self.$wrapper.find('.product-variations select');
        self.$items = self.$wrapper.find('.product-variations');
        self.$priceWrap = self.$wrapper.find('.product-variation-price');
        self.$clean = self.$wrapper.find('.product-variation-clean'),
            self.$btnCart = self.$wrapper.find('.btn-cart');
    
        // check
        self.variationCheck();
        self.$selects.on('change', function (e) {
            self.variationCheck();
        });
        self.$items.children('a:not(.disabled)').on('click', function (e) {
    
            if (!$(this).hasClass('active')) {
                $(this).toggleClass('active').siblings().removeClass('active');
            }
            e.preventDefault();
            self.variationCheck();
            if (self.$items.parent('.product-image-swatch')) {
                self.swatchImage();
            }
        });
    
        // clean
        self.$clean.on('click', function (e) {
            e.preventDefault();
            self.variationClean(true);
        });
    
    }
    
    // For only Quickview
    var recalcDetailsHeight = function () {
        var self = this;
        self.$wrapper.find('.product-details').css(
            'height',
            window.innerWidth > 767 ? self.$wrapper.find('.product-gallery')[0].clientHeight : ''
        );
    }
    
    // var wishlistAction = function (e) { 
    // }
    
    var goToReviewPan = function (e) {
        e.preventDefault();
        Ecsgroup.scrollTo($('.product-tabs > .nav a[href="' + this.getAttribute('href') + '"]').trigger('click'));
    }

    ProductSingle.prototype.init = function ($el) {
        var self = this,
            $slider = $el.find('.product-single-swiper');
        // members
        self.$wrapper = $el;
        self.isQuickView = !!$el.closest('.fancybox__slide').length;
        self._isPgVertical = false;
        // bind
        if (self.isQuickView) {
            recalcDetailsHeight = recalcDetailsHeight.bind(this);
            //Ecsgroup.ratingTooltip();
        }

        // init thumbs
        thumbsInit(self);
        // if not quickview, make full image toggle
        // add gallery-video button
        // if (!document.body.classList.contains('home')) {
        //     if ($slider.parent().hasClass('product-gallery-video')) {
        //         self.isQuickView || $slider.append('<a href="#" class="product-gallery-btn product-degree-viewer" title="Product 360 Degree Gallery"><i class="ecs-icon-rotate-3d"></i></a>');
        //         self.isQuickView || $slider.append('<a href="#" class="product-gallery-btn product-video-viewer" title="Product Video Thumbnail"><i class="ecs-icon-movie"></i></a>');
        //     }
        // }

        //Wishlist button event
        /*Ecsgroup.wishlistAction(self.$wrapper);*/
        //self.$wrapper.on('click', '.btn-wishlist', wishlistAction);

        //Rating reviews evnet
        self.$wrapper.on('click', '.rating-reviews', goToReviewPan);

        // if this is created after document ready, init plugins
        if ('complete' === Ecsgroup.status) {
            Ecsgroup.slider($slider, {
                thumbs: {
                    swiper: self.$thumbsWrap.data('slider')
                }
            });
            Ecsgroup.initQtyInput($el.find('.quantity'));
        }
        if ($slider.length) {
            window.addEventListener('resize', function () {
                Ecsgroup.requestTimeout(function () {
                    if ($slider.data('slider') != undefined) {
                        $slider.data('slider').update();
                        self.$thumbsWrap.data('slider').update();
                    }
                }, 100)
            }, { passive: true });
        }

        self.$wrapper.find('.product-single-swiper').on('initialized.slider', function (e) {
            if(!Ecsgroup.isMobile) Ecsgroup.zoomImage($(e.target).find('.product-image'),Ecsgroup.zoomImageOptions);
        })

        // init sticky thumbnail

        if (self.$wrapper.find('.product-thumbs-sticky').length) {
            self.isStickyScrolling = false;
            self.$wrapper.on('click', '.product-thumb:not(.active)', self.clickStickyThumbnail.bind(this));
            window.addEventListener('scroll', self.scrollStickyThumbnail.bind(this), { passive: true });
        }
        variationInit(this);
    }

    ProductSingle.prototype.variationCheck = function () {
        var self = this,
        isAllSelected = true;
        // check all select variations are selected
        self.$selects.each(function () {
            return this.value || (isAllSelected = false);
        });

        // check all item variations are selected
        self.$items.each(function () {
            var $this = $(this);
            if ($this.children('a:not(.size-guide)').length) {
                return $this.children('.active').length || (isAllSelected = false);
            }
        });
        isAllSelected ?
            self.variationMatch() :
            self.variationClean();
    }

    ProductSingle.prototype.variationMatch = function(){
        // var self = this;
        // self.$priceWrap.find('span').text('$' + (Math.round(Math.random() * 50) + 200) + '.00');
        // self.$priceWrap.slideDown();
        // self.$clean.slideDown();
        // self.$btnCart.removeClass('disabled');
    }

    ProductSingle.prototype.variationClean = function(reset){
        // reset && this.$selects.val('');
        // reset && this.$items.children('.active').removeClass('active');
        // this.$priceWrap.slideUp();
        // this.$clean.css('display', 'none');
        // this.$btnCart.addClass('disabled');
    }

    ProductSingle.prototype.clickStickyThumbnail = function(e){
        var self = this;
        var $thumb = $(e.currentTarget);
        var currentIndex = $thumb.parent().children('.active').index();
        var newIndex = $thumb.index() + 1;
    
        $thumb.addClass('active').siblings('.active').removeClass('active');
        this.isStickyScrolling = true;
        var target = $thumb.closest('.product-thumbs-sticky').find('.product-image-wrapper > :nth-child(' + newIndex + ')');
        if (target.length) {
            target = target.offset().top + 10;
            Ecsgroup.scrollTo(target, 500);
        }
    
        setTimeout(function () {
            self.isStickyScrolling = false;
        }, 300);
    }

    ProductSingle.prototype.scrollStickyThumbnail = function(){
        var self = this;
        if (!this.isStickyScrolling) {
            self.$wrapper.find('.product-image-wrapper .product-image').each(function () {
                if (Ecsgroup.isOnScreen(this)) {
                    self.$wrapper.find('.product-thumbs > :nth-child(' + ($(this).index() + 1) + ')')
                        .addClass('active').siblings().removeClass('active');
                    return false;
                }
            });
        }
    }

    ProductSingle.prototype.swatchImage = function(){
        var src = this.$items.find('.active img').attr('src'),
        productImage = this.$wrapper.find('.swiper-slide:first-child .product-image img'),
        thumbImage = this.$wrapper.find('.swiper-slide:first-child .product-thumb img');

        productImage.attr('src', src);
        thumbImage.attr('src', src);
    }

    Ecsgroup.productSingle = function (selector) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            if (!$this.is('body > *')) {
                $this.data('product-single', new ProductSingle($this));
            }
        })
        return null;
    }

    Ecsgroup.call(function () {
        $('.swiper-container-vertical').each(function () {
            var swiperVertical = $(this);
            if (swiperVertical.data('slider').isVertical()) {
                swiperVertical.data('slider').update();
            }
        });
    }, 500)
})(jQuery);
