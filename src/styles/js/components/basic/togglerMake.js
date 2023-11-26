/**
 * Toggler Make
 *
 * @param {String} selector
 * HTML 
 *      <div class="toggler-wrap">
 *          <div class="toggler-item"></div>
 *          <div class="toggler-wrap-btn"></div>
 *      </div>
 */

const togglerMakeEcs = {
    init: function (selector, limit = 5) {
        if (typeof tippy !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector, limit);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.togglerMake = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function (selector, limit) {
            let targetParent = $(selector).find('.toggler-wrap'),
                page = limit,
                hidenews = core10+' <i class=\"demo-icon cus-up-open-mini\"></i>',
                shownews = core11+' <i class=\"demo-icon cus-down-open-mini\"></i>';
            targetParent.each(function () {
                if ($(this).find('.toggler-item').length > 5) {
                    let btn = $(this).find('.toggler-wrap-btn'),
                        target = $(this);
                    target.find('.toggler-item:not(:lt(' + page + '))').hide();
                    btn.css('margin-top', '1rem');
                    btn.html(shownews);
                    btn.on('click', function (e) {
                        e.preventDefault();
                        if (target.find(".toggler-item:eq(" + page + ")").is(":hidden")) {
                            target.find(".toggler-item:hidden").show();
                            btn.html(hidenews);
                        } else {
                            target.find(".toggler-item:not(:lt(" + page + "))").hide();
                            btn.html(shownews);
                        }
                    })
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
 Ecsgroup.togglerMake = function (selector, limit) {
     return togglerMakeEcs.init(selector, limit);
 };