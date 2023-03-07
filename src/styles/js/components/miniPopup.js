/**
 * @class MiniPopup
 */
var minipopupOption = {
    // info
    productClass: '', // ' product-cart', ' product-list-sm',
    imageSrc: '',
    imageLink: '#',
    name: '',
    nameLink: '#', // 'product.html',
    message: '',
    actionTemplate: '',
    isPurchased: false,

    // option
    delay: 4000, // milliseconds
    space: 20,

    // template
    template: '<div class="minipopup-box">' +
        '<div class="product product-list-sm {{productClass}}">' +
        '<figure class="product-media">' +
        '<a href="{{imageLink}}">' +
        '<img src="{{imageSrc}}" alt="Product" width="80" height="90" />' +
        '</a></figure>' +
        '<div class="product-details">' +
        '<h4 class="product-name"><a href="{{nameLink}}">{{name}}</a></h4>' +
        '{{message}}</div></div>' +
        '<div class="product-action">{{actionTemplate}}</div></div>',

};
var minipopupEcs = (function () {
    var $area,
        offset = 0,
        boxes = [],
        isPaused = false,
        timers = [],
        timerId = false,
        timerInterval = 200,
        timerClock = function () {
            if (isPaused) {
                return;
            }
            for (var i = 0; i < timers.length; ++i) {
                (timers[i] -= timerInterval) <= 0 && this.close(i--);
            }
        };

    return {
        init: function () {
            // init area
            var self = this;
            var area = document.createElement('div');
            area.className = "minipopup-area";
            Ecsgroup.byClass('page-wrapper')[0].appendChild(area);
            $area = $(area);

            // bind methods
            this.close = this.close.bind(this);
            timerClock = timerClock.bind(this);
        },

        open: function (options, callback) {
            var self = this,
                settings = $.extend(true, {}, minipopupOption, options),
                $box;

            $box = $(Ecsgroup.parseTemplate(settings.template, settings));
            self.space = settings.space;
            // open
            var $img = $box.appendTo($area).css('top', - offset).find("img");

            offset += $box[0].offsetHeight + self.space;

            $box.addClass('show');
            if ($box.offset().top - window.pageYOffset < 0) {
                self.close();
                $box.css('top', - offset + $box[0].offsetHeight + self.space);
            }
            $box.on('mouseenter', function () { self.pause() })
                .on('mouseleave', function () { self.resume() })
                .on('touchstart', function (e) { self.pause(); e.stopPropagation(); })
                .on('mousedown', function () {
                    $(this).addClass('focus');
                })
                .on('mouseup', function () {
                    self.close($(this).index());
                });
            Ecsgroup.$body.on('touchstart', function () {
                self.resume();
            });

            boxes.push($box);

            if (!timers.length) {
                timerId = setInterval(timerClock, timerInterval);
            }
            timers.push(settings.delay);

            callback && callback($box);

            // $img.length && $img.on('load', function () {
            // });
        },

        close: function (indexToClose) {
            var self = this,
                index = ('undefined' === typeof indexToClose) ? 0 : indexToClose,
                $box = boxes.splice(index, 1)[0];


            // remove timer
            timers.splice(index, 1)[0];

            var height = $box[0].offsetHeight;

            // remove box
            offset -= height + self.space;
            $box.removeClass('show');
            setTimeout(function () {
                $box.remove();
            }, 300);

            // slide down other boxes
            boxes.forEach(function ($box, i) {
                if (i >= index && $box.hasClass('show')) {
                    $box.stop(true, true).animate({
                        top: parseInt($box.css('top')) + height + 20
                    }, 600, 'easeOutQuint');
                }
            });

            // clear timer
            boxes.length || clearTimeout(timerId);
        },

        pause: function () {
            isPaused = true;
        },

        resume: function () {
            isPaused = false;
        }
    }
})();
Ecsgroup.Minipopup = minipopupEcs;