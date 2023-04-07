/**
 * dropdownAction
 *
 */
function dropdowEcs() {
    if(Ecsgroup.isMobile) {
        Ecsgroup.$body.on('click', '[data-toggle="dropdown"]', function (e) {
            if (Ecsgroup.byId('dropdown-mobile-wrapper') == null) {
                Ecsgroup.$body.addClass('dropdown-active').append('<div id="dropdown-mobile-wrapper" class="dropdown-remove"><a class="dropdown-remove" href="javascript:">'+err4+'</a></div><div class="dropdown-backdrop backdrop dropdown-remove"></div>');
                $(this).parent().find('.dropdown-box').clone().appendTo('#dropdown-mobile-wrapper');
            }
            //$(this).parent().addClass('show');
            e.preventDefault();
        })
        Ecsgroup.$body.on('click', function (e) {
            if ($(e.target).hasClass('backdrop')) {
                Ecsgroup.$body.removeClass('dropdown-active').find('.dropdown-remove').remove();
                //$('.dropdown.show').removeClass('show');
            }
        })
    }
};
Ecsgroup.initDropdownAction = dropdowEcs;