/**
 * Set TypeWriter 
 * 
 * @param {string, Object} selector
 * @param {Object} options
 */
function TypeWriter($el) {
    return this.init($el);
}
// Public Properties
var typeWriterOptions = {
    loop: true,
    autoStart: true
};
function typeWriterEcs(selector) {
    if (typeof Fancybox !== 'undefined') {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);
            typeWriterOptions.strings = Ecsgroup.parseOptions($this.attr('data-typewriter-value'));
            var settings = $.extend(true, {}, typeWriterOptions, Ecsgroup.parseOptions($this.attr('data-typewriter-options')), Ecsgroup.parseOptions());
            console.log(typeWriterOptions);
            var $typeWriter = new Typewriter(this, settings);
        });
    }
};
Ecsgroup.typeWriter = function (selector) {
    return new typeWriterEcs(selector);
};
