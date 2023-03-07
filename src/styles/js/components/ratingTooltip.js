/**
 * ratingTooltip
 *
 * 
 * Find all .ratings-full from root, and initialized tooltip.
 * @param {HTMLElement} root 
 */
 Ecsgroup.ratingTooltip = function ratingTooltip (root) {
    var els = Ecsgroup.byClass('ratings-full', root ? root : document.body),
        len = els.length;

    var ratingHandler = function () {
        var res = parseInt(this.firstElementChild.style.width.slice(0, -1)) / 20;
        this.lastElementChild.innerText = res ? res.toFixed(2) : res;
    }
    for (var i = 0; i < len; ++i) {
        els[i].addEventListener('mouseover', ratingHandler);
        els[i].addEventListener('touchstart', ratingHandler, { passive: true });
    }
};