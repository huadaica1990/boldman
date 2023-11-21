/**
 * accordion
 *
 * Register events for accordion
 * 
 * @param {String} selector 
 */
let accordionOption = {
    classParent: '.accordion',
    classItem: '.accordion-item'
};
const accordionEcs = {
    init: function(selector) {
        let startPerformanceTime = performance.now();
        this.core.start(selector);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.accordion = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector) {
            let toggleSlide = accordionEcs.core.toggleSlide;
            Ecsgroup.$body.on('click', selector, function (e) {
                e.preventDefault();
                var $this = $(this),
                    eleBody = $this.closest(accordionOption.classItem).find($this.attr('href')),
                    eleParent = $this.closest(accordionOption.classParent);
                if (0 === eleParent.find(".collapsing").length && 0 === eleParent.find(".expanding").length) {
                    if (eleBody.hasClass('expanded')) {
                        if (!eleParent.hasClass('radio-type'))
                            toggleSlide(eleBody, selector);
                    } else if (eleBody.hasClass('collapsed')) {
                        if (eleParent.find('.expanded').length > 0) {
                            if (Ecsgroup.isIE) {
                                toggleSlide(eleParent.find('.expanded'), selector, function () {
                                    toggleSlide(eleBody, selector);
                                });
        
                            } else {
                                toggleSlide(eleParent.find('.expanded'), selector);
                                toggleSlide(eleBody, selector);
                            }
                        } else {
                            toggleSlide(eleBody, selector);
                        }
                    }
                }
            });
        },
        toggleSlide: function ($wrap, selector, cb) {
            let $header = $wrap.closest(accordionOption.classItem).find(selector);
            if ($wrap.hasClass('expanded')) {
                $header.first().removeClass('collapse').addClass('expand');
                $wrap.addClass('collapsing').slideUp(300, function () {
                    $wrap.removeClass('expanded collapsing').addClass('collapsed');
                    cb && cb();
                });
            } else if ($wrap.hasClass("collapsed")) {
                $header.first().removeClass("expand").addClass("collapse");
                $wrap.addClass("expanding").slideDown(300, function () {
                    $wrap.removeClass("collapsed expanding").addClass("expanded");
                    cb && cb();
                });
            }
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.accordion = function (selector) {
    return accordionEcs.init(selector);
};