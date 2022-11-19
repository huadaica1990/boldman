(function ($) {
    function Slider($el, options) {
        return this.init($el, options);
    }
    // Private Properties
        var onInitialize = function (e) {
            var wrapperEl = this.wrapperEl;
            var cls = wrapperEl.getAttribute('class');
            var match = cls.match(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g);
            if (match) {
                wrapperEl.setAttribute('class', cls.replace(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g, '').replace(/\s+/, ' '));
            }
            if (wrapperEl.classList.contains("animation-slider")) {
                var els = wrapperEl.children,
                    len = els.length;
                for (var i = 0; i < len; ++i) {
                    els[i].setAttribute('data-index', i + 1);
                }
            }
        }
        var onInitialized = function (e) {
            var els = this.firstElementChild.firstElementChild.children,
                i,
                len = els.length;
            for (i = 0; i < len; ++i) {
                if (!els[i].classList.contains('active')) {
                    var animates = Ecsgroup.byClass('appear-animate', els[i]),
                        j;
                    for (j = animates.length - 1; j >= 0; --j) {
                        animates[j].classList.remove('appear-animate');
                    }
                }
            }
        }
        var onTranslated = function (e) {
            Ecsgroup.$window.trigger('appear.check');

            // Video Play   
            var $el = $(e.currentTarget),
                $activeVideos = $el.find('.swiper-slide.active video');

            $el.find('.swiper-slide:not(.swiper-slide-active) video').each(function () {
                if (!this.paused) {
                    $el.trigger('autoplayStart');
                }
                this.pause();
                this.currentTime = 0;
            });

            if ($activeVideos.length) {
                if (true === $el.data('slider').options.autoplay) {
                    $el.trigger('autoplayStop');
                }
                $activeVideos.each(function () {
                    this.paused && this.play();
                });
            }
        }
        var onSliderInitialized = function () {
            var self = this,
                $el = $(this.wrapperEl);
            // carousel content animation
            $el.find('.swiper-slide-active .slide-animate').each(function () {
                var $animation_item = $(this),
                    settings = $.extend(true, {},
                        Ecsgroup.animationOptions,
                        Ecsgroup.parseOptions($animation_item.data('animation-options'))
                    ),
                    duration = settings.duration,
                    delay = settings.delay,
                    aniName = settings.name;

                setTimeout(function () {
                    $animation_item.css('animation-duration', duration);
                    $animation_item.css('animation-delay', delay);
                    $animation_item.addClass(aniName);

                    if ($animation_item.hasClass('maskLeft')) {
                        $animation_item.css('width', 'fit-content');
                        var width = $animation_item.width();
                        $animation_item.css('width', 0).css(
                            'transition',
                            'width ' + (duration ? duration : '0.75s') + ' linear ' + (delay ? delay : '0s'));
                        $animation_item.css('width', width);
                    }
                    duration = duration ? duration : '0.75s';
                    var temp = Ecsgroup.requestTimeout(function () {
                        $animation_item.addClass('show-content');
                    }, (delay ? Number((delay).slice(0, -1)) * 1000 + 200 : 200));

                    self.timers.push(temp);
                }, 300);
            });
        }
        var onSliderResized = function (e) {
            $(this.wrapperEl).find('.swiper-slide-active .slide-animate').each(function () {
                var $animation_item = $(this);
                $animation_item.addClass('show-content');
                $animation_item.attr('style', '');
            });
        }
        var onSliderTranslate = function (e) {
            var self = this,
                $el = $(this.wrapperEl);
            self.translateFlag = 1;
            self.prev = self.next;
            $el.find('.swiper-slide .slide-animate').each(function () {
                var $animation_item = $(this),
                    settings = $.extend(true, {}, Ecsgroup.animationOptions, Ecsgroup.parseOptions($animation_item.data('animation-options')));
                $animation_item.removeClass(settings.name);
            });
        }
        var onSliderTranslated = function (e) {
            var self = this,
                $el = $(this.wrapperEl);
            if (1 == self.translateFlag) {
                self.next = this.slider.activeIndex;
                $el.find('.show-content').removeClass('show-content');
                if (self.prev != self.next) {
                    $el.find('.show-content').removeClass('show-content');
                    /* clear all animations that are running. */
                    if ($el.hasClass("animation-slider")) {
                        for (var i = 0; i < self.timers.length; i++) {
                            Ecsgroup.deleteTimeout(self.timers[i]);
                        }
                        self.timers = [];
                    }
                    $el.find('.swiper-slide-active .slide-animate').each(function () {
                        var $animation_item = $(this),
                            settings = $.extend(true, {}, Ecsgroup.animationOptions, Ecsgroup.parseOptions($animation_item.data('animation-options'))),
                            duration = settings.duration,
                            delay = settings.delay,
                            aniName = settings.name;

                        $animation_item.css('animation-duration', duration);
                        $animation_item.css('animation-delay', delay);
                        $animation_item.css('transition-property', 'visibility, opacity');
                        $animation_item.css('transition-delay', delay);
                        $animation_item.css('transition-duration', duration);
                        $animation_item.addClass(aniName);

                        duration = duration ? duration : '0.75s';

                        var temp = Ecsgroup.requestTimeout(function () {
                            $animation_item.css('transition-property', '');
                            $animation_item.css('transition-delay', '');
                            $animation_item.css('transition-duration', '');
                            $animation_item.addClass('show-content');
                            self.timers.splice(self.timers.indexOf(temp), 1)
                        }, (delay ? Number((delay).slice(0, -1)) * 1000 + Number((duration).slice(0, -1)) * 500 : Number((duration).slice(0, -1)) * 500));
                        self.timers.push(temp);
                    });
                } else {
                    $el.find('.swiper-slide').eq(this.slider.activeIndex).find('.slide-animate').addClass('show-content');
                }
                self.translateFlag = 0;
            }
        }
    // Public Properties
        Slider.defaults = {
            slidesPerView: 1,
            speed: 300,
            lazy: true,
        }
        Slider.presets = {
            'product-thumbs-wrap': {
                slidesPerView: 4,
                spaceBetween: 10,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                freeModeSticky: true
            }
        }
        Slider.prototype.init = function($el, options) {
            this.timers = [];
            this.translateFlag = 0;
            this.prev = 0;
            this.next = 0;
            this.container = $el[0];
            this.wrapperEl = $el.children()[0];
            var $numberSlide = $el.find('.swiper-slide').length,
                $navigationNext = $el.children('.swiper-button-next'),
                $navigationPrev = $el.children('.swiper-button-prev'),
                $pagination = $el.children('.swiper-pagination'),
                $numbercontainer = $el.find('.swiper-number'),
                $dotscontainer = $el.children('.custom-dots');
            if ($el.data('slider')) {
                return;
            }
    
            // Ecsgroup.lazyLoad($el, true);
            var classes = $el.attr('class').split(' '),
                settings = $.extend(true, {}, Slider.defaults);
    
            // extend preset options
            classes.forEach(function (className) {
                var preset = Slider.presets[className];
                preset && $.extend(true, settings, preset);
            });
    
            // navigation and pagination
            $navigationNext.length && $.extend(true, settings, {
                navigation: {
                    nextEl: $navigationNext[0]
                }
            });
            $navigationPrev.length && $.extend(true, settings, {
                navigation: {
                    prevEl: $navigationPrev[0]
                }
            });
            $pagination.length && $.extend(true, settings, {
                pagination: {
                    el: $pagination[0],
                    clickable: true
                }
            });
    
            // video
            var $videos = $el.find('video');
            $videos.each(function () {
                this.loop = false;
            });
    
            // extend user options
            $.extend(true, settings, Ecsgroup.parseOptions($el.attr('data-swiper-options')), options);
    
            // init
            onInitialize.call(this); // remove grid classes from swiper-wrapper
            this.slider = new Swiper(this.container, settings);
            $el.data('slider', this.slider);

            $el.trigger('initialized.slider', this.slider);
    
            this.slider.on('afterInit', onInitialized)
                .on('transitionEnd', onTranslated);
    
            // if animation slider
            if ($el.hasClass('animation-slider')) {
                onSliderInitialized.call(this);
            }
            $el.hasClass('animation-slider') &&
                this.slider.on('resize', onSliderResized)
                    .on('transitionStart', onSliderTranslate.bind(this))
                    .on('transitionEnd', onSliderTranslated.bind(this));
    
            // if slider has custom dots container
            if ($dotscontainer.length) {
                this.slider.on('transitionEnd', function () {
                    var curIndex = this.activeIndex;
                    $dotscontainer.children('a:nth-child(' + (++curIndex) + ')').addClass('active').siblings().removeClass('active');
                });
                $dotscontainer.children('a').on('click', function (e) {
                    e.preventDefault();
    
                    var $this = $(this);
    
                    if (!$this.hasClass('active')) {
                        var index = $this.index(),
                            $slider = $this.closest('.swiper-container').data('slider');
    
                        $slider.slideTo(index);
                        $this.addClass('active').siblings().removeClass('active');
                    }
                });
            }
            // if slider has custom number container
            
            if ($numbercontainer.length) {
                var numberCurent = $numbercontainer.children('.swiper-nummber-curent'),
                    numberTotal = $numbercontainer.children('.swiper-nummber-total');
                numberTotal.text(('0' + $numberSlide).slice(-2));
                numberCurent.text('01');
                this.slider.on('slideChange', function () {
                    var curIndex = this.realIndex + 1;
                    numberCurent.text(('0' + curIndex).slice(-2));
                });
            }
        }

    Ecsgroup.slider = function (selector, options = {}, createDirectly = false) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            createDirectly ? new Slider($this, options) : Ecsgroup.call(function () {
                new Slider($this, options);
            });
        });
    }
    
    Ecsgroup.slider.pgToggle = function () {
        $(".swiper-container:not([class*='pg-']) .swiper-pagination").each(function () {
            var $this = $(this);
            if ($this.find('*').length <= 1)
                $this.css('display', 'none');
            else
                $this.css('display', 'block');
        });
    }
})(jQuery);