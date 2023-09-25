/**
 * Fancybox
 * 
 * @requires jquery-fancybox
 * @param {String} selector
 */
var flatpickrOptions = {
    //groupAll: true,
    //classException
};
function flatpickrEcs (selector) {
    if ($.fn.flatpickr) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            var settings = $.extend(true, {}, flatpickrOptions, Ecsgroup.parseOptions($this.attr('data-flatpickr-options')));
            $this.flatpickr(settings);
        });
    }
};

Ecsgroup.flatpickr = function (selector) {
    return new flatpickrEcs(selector);
};