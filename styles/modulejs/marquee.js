/**
 * Set Marquee
 * 
 * @requires jquery-marquee
 * @param {String} selector
*/
var marqueeOptions = {
    pauseOnHover: true,
    gap: 30,
    duplicated: true
};
function marqueeEcs(selector) {
    if ($.fn.marquee) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this),
                settings = $.extend(true, {}, marqueeOptions, Ecsgroup.parseOptions($this.attr('data-marquee-options')));
            $this.marquee(settings);
        });
    }
};

Ecsgroup.marquee = function (selector) {
    return new marqueeEcs(selector);
};