/**
 * Set Dragg
 * https://draggabilly.desandro.com/
 * @requires draggabilly
 * @param {String} selector
*/
var draggAbillyOptions = {
    autoLock: false
};
function autoLockListener(target, dragXDefault) {
    target.on('dragEnd', function () {
        var draggie = target.data('draggabilly'),
            withContainer = $('body').width() / 2;
        console.log(draggie.position.x, withContainer);
        if (draggie.position.x > withContainer) {
            target.draggabilly('setPosition', 0, draggie.position.y);
            $(this).css({
                left: 'auto',
                right: dragXDefault
            }).addClass('--right');
        }
        else {
            target.draggabilly('setPosition', dragXDefault, draggie.position.y);
            $(this).css({
                right: 'auto'
            }).removeClass('--right');
        }
    });
}
function draggAbillyEcs(selector) {
    if ($.fn.draggabilly) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this),
                settings = $.extend(true, {}, draggAbillyOptions, Ecsgroup.parseOptions($this.attr('data-draggabilly-options'))),
                autoLock = settings.autoLock;
            var $draggable = $this.draggabilly(settings);
            var dragXDefault = $draggable.data('draggabilly').startPosition.x;
            if (settings.autoLock === true) autoLockListener($draggable, dragXDefault);
            if (selector == '.draggable-pc' && document.documentElement.clientWidth < 1199) $draggable.draggabilly('destroy');
            if (selector == '.draggable-mobile' && document.documentElement.clientWidth > 1199) $draggable.draggabilly('destroy');
        });
    }
};

Ecsgroup.draggAbilly = function (selector) {
    return new draggAbillyEcs(selector);
};