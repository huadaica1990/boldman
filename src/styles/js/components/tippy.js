/**
 * Set Marquee
 * 
 * @requires Tippy
 * @param {String} selector
*/
var tippyOptions = {
    allowHTML: true,
};
function tippyEcs(selector) {
    if (typeof Fancybox !== 'undefined') {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this),
                settings = $.extend(true, {}, tippyOptions, Ecsgroup.parseOptions($this.attr('data-tippy-options')));
            tippy(this, settings);
        });
    }
};

Ecsgroup.tippy = function (selector) {
    return new tippyEcs(selector);
};