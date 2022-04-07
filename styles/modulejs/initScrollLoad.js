/**
 * initScrollLoad
 *
 * Register events sroll loadmore
 * 
 * @param {String} selector 
 */
function scrollLoadEcs (selector, cb) {
    var $wrapper = Ecsgroup.$(selector),
        top;
    var loadProducts = function (e) {
        if (window.pageYOffset > top + $wrapper.outerHeight() - window.innerHeight && 'loading' != $wrapper.attr('data-load-state')) {
            Ecsgroup.debounce(cb(), 1000);
        }
    }
    if ($wrapper.length > 0) {
        top = $wrapper.offset().top;
        window.addEventListener('scroll', loadProducts, { passive: true });
    }
};
Ecsgroup.initScrollLoad = function (selector, cb) {
    return new scrollLoadEcs(selector, cb);
};