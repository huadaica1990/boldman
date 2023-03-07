/**
 * accordion
 *
 * Register events for accordion
 * 
 * @param {String} selector 
 */
var accordionOption = {
    classParent: '.accordion',
    classItem: '.accordion-item'
};
function accordionEcs(selector) {
    Ecsgroup.$body.on('click', selector, function (e) {
        var $this = $(this),
            eleBody = $this.closest(accordionOption.classItem).find($this.attr('href')),
            eleParent = $this.closest(accordionOption.classParent);
        e.preventDefault();

        if (0 === eleParent.find(".collapsing").length && 0 === eleParent.find(".expanding").length) {
            if (eleBody.hasClass('expanded')) {
                if (!eleParent.hasClass('radio-type'))
                    toggleSlide(eleBody);
            } else if (eleBody.hasClass('collapsed')) {
                if (eleParent.find('.expanded').length > 0) {
                    if (Ecsgroup.isIE) {
                        toggleSlide(eleParent.find('.expanded'), function () {
                            toggleSlide(eleBody);
                        });

                    } else {
                        toggleSlide(eleParent.find('.expanded'));
                        toggleSlide(eleBody);
                    }
                } else {
                    toggleSlide(eleBody);
                }
            }
        }
    });
    var toggleSlide = function ($wrap, cb) {
        var $header = $wrap.closest(accordionOption.classItem).find(selector);
        if ($wrap.hasClass('expanded')) {
            $header.removeClass('collapse').addClass('expand');
            $wrap.addClass('collapsing').slideUp(300, function () {
                $wrap.removeClass('expanded collapsing').addClass('collapsed');
                cb && cb();
            });
        } else if ($wrap.hasClass("collapsed")) {
            $header.removeClass("expand").addClass("collapse");
            $wrap.addClass("expanding").slideDown(300, function () {
                $wrap.removeClass("collapsed expanding").addClass("expanded");
                cb && cb();
            });
        }
    };
};
Ecsgroup.accordion = function (selector) {
    return new accordionEcs(selector);
};