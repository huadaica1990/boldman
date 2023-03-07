/**
 * initNavFilter
 *
 * 
 * @requires isotope
 * @param {String} selector 
 */
Ecsgroup.initNavFilter = function (selector) {
    if ($.fn.isotope) {
        Ecsgroup.$(selector).on('click', function (e) {
            var $this = $(this),
                filterValue = $this.attr('data-filter'),
                filterTarget = $this.parent().parent().attr('data-target');
            (filterTarget ? $(filterTarget) : $('.grid'))
                .isotope({ filter: filterValue })
                .isotope('on', 'arrangeComplete', function () {
                    Ecsgroup.$window.trigger('appear.check');
                });
            $this.parent().siblings().children().removeClass('active');
            $this.addClass('active');
            e.preventDefault();
        })
    }
};

