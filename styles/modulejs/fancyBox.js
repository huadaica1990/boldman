/**
 * Fancybox
 * 
 * @requires jquery-fancybox
 * @param {String} selector
 */
var fancyboxOptions = {
    //groupAll: true,
    //classException
};
function fancyBoxEcs (selector) {
    if (typeof Fancybox !== 'undefined') {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this),
                $images, images, position;
            var settings = $.extend(true, {}, fancyboxOptions, Ecsgroup.parseOptions($this.attr('data-fancybox-options')));
            if ($this.hasClass('swiper-container')) {
                $images = $this.find('.swiper-slide:not(.cloned) picture img');
            }
            else {
                $images = $this.find('picture img, img');
            }
            if ($images.length) {
                images = $images.map(function () {
                    var $this = $(this);
                    return {
                        src: $this.attr('data-zoom-image'),
                        type: "image",
                        caption: $this.attr('alt')
                    };
                }).get();
            }
            $this.find('[data-fancybox-target]').on('click', function (event) {
                event.preventDefault();
                position = $(this).data('fancybox-pos');
                var fancybox = Fancybox.show(images, settings);
                if (position >= 0) {
                    var swiper = $this.data('slider');
                    Fancybox.getInstance().jumpTo(position);
                    fancybox.on('Carousel.selectSlide', (fancybox, carousel, slide) => {
                        swiper.slideTo(slide.index);
                    });
                    //swiper.slideTo(position);
                }
                // var fancybox = new Fancybox(images, settings);
                // fancybox.getInstance().jumpTo(position);
            });
        });
    }
};

Ecsgroup.fancyBox = function (selector) {
    return new fancyBoxEcs(selector);
};