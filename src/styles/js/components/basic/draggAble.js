/**
 * Set Dragg
 * https://draggabilly.desandro.com/
 * @requires draggabilly
 * @param {String} selector
*/
let draggAbillyOptions = {
    autoLock: false
};
const draggAbillyEcs = {
    init: function(selector) {
        if ($.fn.draggabilly) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.draggAbilly = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            let autoLockListener = draggAbillyEcs.core.autoLockListener;
            Ecsgroup.$(selector).each(function () {
                let $this = $(this),
                    settings = $.extend(true, {}, draggAbillyOptions, Ecsgroup.parseOptions($this.attr('data-draggabilly-options'))),
                    autoLock = settings.autoLock;
                let $draggable = $this.draggabilly(settings);
                let dragXDefault = $draggable.data('draggabilly').startPosition.x;
                if (settings.autoLock === true) autoLockListener($draggable, dragXDefault);
                if (selector == '.draggable-pc' && document.documentElement.clientWidth < 1199) $draggable.draggabilly('destroy');
                if (selector == '.draggable-mobile' && document.documentElement.clientWidth > 1199) $draggable.draggabilly('destroy');
            });
        },
        autoLockListener: function(target, dragXDefault) {
            target.on('dragEnd', function () {
                let draggie = target.data('draggabilly'),
                    withContainer = $('body').width() / 2;
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
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}
Ecsgroup.draggAbilly = function (selector) {
    return draggAbillyEcs.init(selector);
};