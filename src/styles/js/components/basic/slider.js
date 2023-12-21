let sliderOption = {
    defaults: {
        slidesPerView: 1,
        speed: 300,
        lazy: true,
    },
    presets: {
        'product-thumbs-wrap': {
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            freeModeSticky: true
        }
    }
};
const sliderEcs = {
    init: function($el, options) {
        if (typeof Fancybox !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.init($el, options);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.slider = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        init: function($el, options) {
            sliderEcs.timers = [];
            sliderEcs.translateFlag = 0;
            sliderEcs.prev = 0;
            sliderEcs.next = 0;
            sliderEcs.container = $el[0];
            sliderEcs.wrapperEl = $el.children()[0];
            let $numberSlide = $el.find('.swiper-slide').length,
                $navigationNext = $el.children('.swiper-button-next'),
                $navigationPrev = $el.children('.swiper-button-prev'),
                $pagination = $el.children('.swiper-pagination'),
                $numbercontainer = $el.find('.swiper-number'),
                $dotscontainer = $el.children('.custom-dots'),
                $progresscontainer = $el.children('.progressbar');
            if ($el.data('slider')) {
                return;
            }
    
            // Ecsgroup.lazyLoad($el, true);
            let classes = $el.attr('class').split(' '),
                settings = $.extend(true, {}, sliderOption.defaults);
    
            // extend preset options
            classes.forEach(function (className) {
                let preset = sliderOption.presets[className];
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
            let $videos = $el.find('video');
            $videos.each(function () {
                sliderEcs.loop = false;
            });
    
            // extend user options
            $.extend(true, settings, Ecsgroup.parseOptions($el.attr('data-swiper-options')), options);
    
            // init
            sliderEcs.core.methods.onInitialize.call(sliderEcs); // remove grid classes from swiper-wrapper
            sliderEcs.slider = new Swiper(sliderEcs.container, settings);
            $el.data('slider', sliderEcs.slider);

            $el.trigger('initialized.slider', sliderEcs.slider);
    
            sliderEcs.slider.on('afterInit', sliderEcs.core.methods.onInitialized)
                .on('transitionEnd', sliderEcs.core.methods.onTranslated);
    
            // if animation slider
            if ($el.hasClass('animation-slider')) {
                sliderEcs.core.methods.onSliderInitialized.call(sliderEcs);
            }
            $el.hasClass('animation-slider') &&
            sliderEcs.slider.on('resize', sliderEcs.core.methods.onSliderResized)
                    .on('transitionStart', sliderEcs.core.methods.onSliderTranslate.bind(sliderEcs))
                    .on('transitionEnd', sliderEcs.core.methods.onSliderTranslated.bind(sliderEcs));
    
            // if slider has custom dots container
            if ($dotscontainer.length) {
                sliderEcs.slider.on('transitionEnd', function () {
                    let curIndex = sliderEcs.activeIndex;
                    $dotscontainer.children('a:nth-child(' + (++curIndex) + ')').addClass('active').siblings().removeClass('active');
                });
                $dotscontainer.children('a').on('click', function (e) {
                    e.preventDefault();
    
                    let $this = $(sliderEcs);
    
                    if (!$this.hasClass('active')) {
                        let index = $this.index(),
                            $slider = $this.closest('.swiper-container').data('slider');
    
                        $slider.slideTo(index);
                        $this.addClass('active').siblings().removeClass('active');
                    }
                });
            }
            // if slider has custom number container
            if ($numbercontainer.length) {
                let numberCurent = $numbercontainer.children('.swiper-number-current'),
                    numberTotal = $numbercontainer.children('.swiper-number-total');
                numberTotal.text(('0' + $numberSlide).slice(-2));
                numberCurent.text('01');
                sliderEcs.slider.on('slideChange', function () {
                    let curIndex = sliderEcs.realIndex + 1;
                    numberCurent.text(('0' + curIndex).slice(-2));
                });
            }
            // if slider has progress bar container
            if($progresscontainer.length) {
                let isPause,
                    tick,
                    percentTime,
                    $this = $(sliderEcs.container),
                    $slider = $this.data('slider');
                const timeloop = $slider.passedParams.autoplay.delay > 0 ? $slider.passedParams.autoplay.delay/1000 : 10;
                if ($slider.params.init) startProgressbar();
                $slider.on('slideChange', function () {
                    startProgressbar();
                });
                function startProgressbar() {
                    resetProgressbar();
                    percentTime = 0;
                    isPause = false;
                    tick = setInterval(interval, 10);
                }
                function interval() {
                    if (isPause === false) {
                        percentTime += 1/(timeloop);
                        $progresscontainer.css({
                            width: percentTime + "%"
                        });
                        if (percentTime >= 100) {
                            $slider.slideNext();
                        }
                    }
                }
                function resetProgressbar() {
                    $progresscontainer.css({
                        width: 0 + '%'
                    });
                    clearTimeout(tick);
                }
            }
        },
        methods: {
            onInitialize: function(e) {
                let wrapperEl = this.wrapperEl;
                let cls = wrapperEl.getAttribute('class');
                let match = cls.match(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g);
                if (match) {
                    wrapperEl.setAttribute('class', cls.replace(/row|gutter\-\w\w|cols\-\d|cols\-\w\w-\d/g, '').replace(/\s+/, ' '));
                }
                if (wrapperEl.classList.contains("animation-slider")) {
                    let els = wrapperEl.children,
                        len = els.length;
                    for (let i = 0; i < len; ++i) {
                        els[i].setAttribute('data-index', i + 1);
                    }
                }
            },
            onInitialized: function(e) {
                let els = this.firstElementChild.firstElementChild.children,
                    i, len = els.length;
                for (i = 0; i < len; ++i) {
                    if (!els[i].classList.contains('active')) {
                        let animates = Ecsgroup.byClass('appear-animate', els[i]),
                            j;
                        for (j = animates.length - 1; j >= 0; --j) {
                            animates[j].classList.remove('appear-animate');
                        }
                    }
                }
            },
            onTranslated: function(e) {
                Ecsgroup.$window.trigger('appear.check');
                // Video Play   
                let $el = $(e.currentTarget),
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
            },
            onSliderInitialized: function(e) {
                let self = this,
                    $el = $(this.wrapperEl);
                // carousel content animation
                $el.find('.swiper-slide-active .slide-animate').each(function () {
                    let $animation_item = $(this),
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
                            let width = $animation_item.width();
                            $animation_item.css('width', 0).css(
                                'transition',
                                'width ' + (duration ? duration : '0.75s') + ' linear ' + (delay ? delay : '0s'));
                            $animation_item.css('width', width);
                        }
                        duration = duration ? duration : '0.75s';
                        let temp = Ecsgroup.requestTimeout(function () {
                            $animation_item.addClass('show-content');
                        }, (delay ? Number((delay).slice(0, -1)) * 1000 + 200 : 200));
                        self.timers.push(temp);
                    }, 300);
                });
            },
            onSliderResized: function(e) {
                $(this.wrapperEl).find('.swiper-slide-active .slide-animate').each(function () {
                    let $animation_item = $(this);
                        $animation_item.addClass('show-content');
                        $animation_item.attr('style', '');
                });
            },
            onSliderTranslate: function(e) {
                let self = this,
                    $el = $(this.wrapperEl);
                self.translateFlag = 1;
                self.prev = self.next;
                $el.find('.swiper-slide .slide-animate').each(function () {
                    let $animation_item = $(this),
                        settings = $.extend(true, {}, Ecsgroup.animationOptions, Ecsgroup.parseOptions($animation_item.data('animation-options')));
                    $animation_item.removeClass(settings.name);
                });
            },
            onSliderTranslated: function(e) {
                let self = this,
                    $el = $(this.wrapperEl);
                if (1 == self.translateFlag) {
                    self.next = this.slider.activeIndex;
                    $el.find('.show-content').removeClass('show-content');
                    if (self.prev != self.next) {
                        $el.find('.show-content').removeClass('show-content');
                        /* clear all animations that are running. */
                        if ($el.hasClass("animation-slider")) {
                            for (let i = 0; i < self.timers.length; i++) {
                                Ecsgroup.deleteTimeout(self.timers[i]);
                            }
                            self.timers = [];
                        }
                        $el.find('.swiper-slide-active .slide-animate').each(function () {
                            let $animation_item = $(this),
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

                            let temp = Ecsgroup.requestTimeout(function () {
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
            },
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.slider = function (selector, options = {}, createDirectly = false) {
    Ecsgroup.$(selector).each(function () {
        let $this = $(this);
        if(createDirectly) return sliderEcs.init($this, options);
        else {
            Ecsgroup.call(function () {
                return sliderEcs.init($this, options);
            });
        }
    });
}
Ecsgroup.slider.pgToggle = function () {
    $(".swiper-container:not([class*='pg-']) .swiper-pagination").each(function () {
        let $this = $(this);
        if ($this.find('*').length <= 1)
            $this.css('display', 'none');
        else
            $this.css('display', 'block');
    });
}