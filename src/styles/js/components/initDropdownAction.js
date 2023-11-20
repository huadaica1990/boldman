/**
 * dropdownAction
 *
 */
var dropdownOptions = {
    clone: true,
    classBackdrop: 'black', //black, transparent, white
    zIndex: 90
};
function dropdowEcs() {
    if(Ecsgroup.isMobile) {
        Ecsgroup.$body.on('click', '[data-toggle="dropdown"]', function (e) {
            let settings = $.extend(true, {}, dropdownOptions, Ecsgroup.parseOptions($(e.target).attr('data-dropdown-options'))),
                dropdown = $(this).closest('.dropdown'),
                dropdownCon = $(this).closest('.dropdown').find('.dropdown-box'),
                offsetHeight = $(e.target).outerHeight(),
                offsetWidth = $(e.target).outerWidth(),
                offsetTop = $(e.target).offset().top,
                offsetRight = window.innerWidth - $(e.target).offset().left;
            Ecsgroup.$body.addClass('dropdown-active').append('<div style="z-index:'+ settings.zIndex +'" class="dropdown-backdrop backdrop dropdown-remove '+ settings.classBackdrop +'"></div>');
            if (settings.clone) {
                if (Ecsgroup.byId('dropdown-mobile-wrapper') == null) {
                    Ecsgroup.$body.append('<div id="dropdown-mobile-wrapper" class="dropdown-remove"><a class="dropdown-remove" href="javascript:">'+err4+'</a></div>');
                }
                dropdownCon.clone().appendTo('#dropdown-mobile-wrapper');
            }
            else {
                let scrollTop = 0;
                if(settings.scrollTop) scrollTop = $(document).scrollTop();
                let left = offsetRight - offsetWidth;
                let isView = (left + dropdownCon.outerWidth()) - window.innerWidth;
                if (isView > 0) dropdownCon.addClass('left');
                else dropdownCon.removeClass('left');
                dropdownCon.css({
                    position: 'fixed',
                    top: offsetTop + offsetHeight + 10 - scrollTop + 'px',
                    right: left + 'px',
                    left: 'auto'
                });
                if(dropdown.hasClass('show')) {
                    dropdown.removeClass('show');
                    Ecsgroup.$body.find('.dropdown-remove').remove();
                }
                else  dropdown.addClass('show');
            }
            e.preventDefault();
        })
        Ecsgroup.$body.on('click', function (e) {
            if ($(e.target).hasClass('backdrop')) {
                $('.dropdown.show').removeClass('show');
                Ecsgroup.$body.removeClass('dropdown-active').find('.dropdown-remove').remove();
                //$('.dropdown.show').removeClass('show');
            }
        })
    }
};
Ecsgroup.initDropdownAction = dropdowEcs;