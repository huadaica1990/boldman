/**
 * dropdownAction
 *
 */
let dropdownOptions = {
    clone: true,
    classBackdrop: 'black', //black, transparent, white
    zIndex: 90
};
const dropdowEcs = {
    init: function () {
        let startPerformanceTime = performance.now();
        this.core.start();
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.initDropdownAction = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function () {
            let hook = this.hook;
            if (Ecsgroup.isMobile) {
                Ecsgroup.$body.on('click', '[data-toggle="dropdown"]', function (e) {
                    e.preventDefault();
                    let elem = $(e.target);
                    let settings = $.extend(true, {}, dropdownOptions, Ecsgroup.parseOptions(elem.attr('data-dropdown-options'))),
                        dropdown = $(this).closest('.dropdown'),
                        dropdownBox = $(this).closest('.dropdown').find('.dropdown-box'),
                        dropdownHeight = elem.outerHeight(),
                        dropdownWidth = elem.outerWidth(),
                        dropdownTop = elem.offset().top,
                        dropdownRight = window.innerWidth - elem.offset().left;
                    Ecsgroup.$body.addClass('dropdown-active').append('<div style="z-index:'+ settings.zIndex +'" class="dropdown-backdrop backdrop dropdown-remove '+ settings.classBackdrop +'"></div>');
                    if (settings.clone) {
                        if (Ecsgroup.byId('dropdown-mobile-wrapper') == null) {
                            Ecsgroup.$body.append('<div id="dropdown-mobile-wrapper" class="dropdown-remove"><a class="dropdown-remove" href="javascript:">'+err4+'</a></div>');
                        }
                        dropdownBox.clone().appendTo('#dropdown-mobile-wrapper');
                    }
                    else {
                        let scrollTop = 0;
                        if(settings.scrollTop) scrollTop = $(document).scrollTop();
                        let left = dropdownRight - dropdownWidth;
                        let isView = (left + dropdownBox.outerWidth()) - window.innerWidth;
                        if (isView > 0) dropdownBox.addClass('left');
                        else dropdownBox.removeClass('left');
                        dropdownBox.css({
                            position: 'fixed',
                            top: dropdownTop + dropdownHeight + 10 - scrollTop + 'px',
                            right: left + 'px',
                            left: 'auto'
                        });
                        if(dropdown.hasClass('show')) {
                            dropdown.removeClass('show');
                            Ecsgroup.$body.find('.dropdown-remove').remove();
                        }
                        else dropdown.addClass('show');
                        Ecsgroup.trackTransition(dropdownBox[0]);
                        hook(dropdownBox);
                    }
                })
            }
            else {
                Ecsgroup.$body.on('click', '[data-toggle="dropdown"]', function (e) {
                    e.preventDefault();
                    let dropdown = $(this).closest('.dropdown');
                    dropdown.toggleClass('show');
                    Ecsgroup.$body.append('<div style="z-index:90" class="dropdown-backdrop backdrop dropdown-remove transparent"></div>');
                })
            }
            Ecsgroup.$body.on('click', function (e) {
                if ($(e.target).hasClass('backdrop')) {
                    dropdowEcs.core.close();
                }
            });
            Ecsgroup.$window.on('resize', function () {
                dropdowEcs.core.close();
            });
        },
        close: function () {
            $('.dropdown.show').removeClass('show');
            Ecsgroup.$body.removeClass('dropdown-active').find('.dropdown-remove').remove();
        },
        hook:  function(target) {
            target.on('transition_start', function () {
                target.addClass('transition_start');
            });
            target.on('transition_run', function () {
                target.removeClass('transition_start').addClass('transition_run');
            });
            target.on('transition_end', function () {
                target.removeClass('transition_start transition_run').addClass('transition_end');
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
// const extendPlugin = { 
//     name: 'extend',
//     exec: function(currentValue) {
//       return currentValue * currentValue;
//     }
// };
// dropdowEcs.register(extendPlugin);
Ecsgroup.initDropdownAction = dropdowEcs.init();