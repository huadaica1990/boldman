/**
 * Fancybox
 * 
 * @requires jquery-fancybox
 * @param {String} selector
 */
let fancyboxOptions = {
    //groupAll: true,
    //classException
};
const fancyBoxEcs = {
    init: function(selector) {
        if (typeof Fancybox !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.fancyBox = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let $this = $(this),
                    $images, images, position;
                let settings = $.extend(true, {}, fancyboxOptions, Ecsgroup.parseOptions($this.attr('data-fancybox-options')));
                if ($this.hasClass('swiper-container')) 
                    $images = $this.find('.swiper-slide:not(.cloned) picture img');
                else 
                    $images = $this.find('picture img, img');
                if ($images.length) {
                    images = $images.map(function () {
                        let $this = $(this);
                        return {
                            src: $this.attr('data-zoom-image'),
                            type: "image",
                            caption: $this.attr('alt')
                        };
                    }).get();
                }
                Ecsgroup.$body.on('click', selector + ' [data-fancybox-target]', function (event) {
                    event.preventDefault();
                    position = $(this).data('fancybox-pos');
                    let fancybox = Fancybox.show(images, settings);
                    if (position >= 0) {
                        let swiper = $this.data('slider');
                        Fancybox.getInstance().jumpTo(position);
                        fancybox.on('Carousel.selectSlide', (fancybox, carousel, slide) => {
                            swiper.slideTo(slide.index);
                        });
                        //swiper.slideTo(position);
                    }
                    // let fancybox = new Fancybox(images, settings);
                    // fancybox.getInstance().jumpTo(position);
                });
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};

Ecsgroup.fancyBox = function (selector) {
    return fancyBoxEcs.init(selector);
};