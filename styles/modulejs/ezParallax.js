/**
 * Set ez Parallax
 * @param {String} selector
*/
function ezParallaxEcs(selector, parallaxJson) {
    Ecsgroup.$(selector).each(function () {
        var $this = $(this);
        $this.css(parallaxJson);
    });
};

Ecsgroup.ezParallax = function (selector, parallaxJson) {
    return new ezParallaxEcs(selector, parallaxJson);
};