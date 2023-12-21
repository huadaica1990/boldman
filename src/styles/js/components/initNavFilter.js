/**
 * initNavFilter
 *
 * 
 * @requires isotope
 * @param {String} selector 
 */

const initNavFilterEcs = {
    init: function(selector) {
        if ($.fn.isotope) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.initNavFilter = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).on('click', function (e) {
                let $this = $(this),
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
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initNavFilter = function (selector) {
    return initNavFilterEcs.init(selector);
};

