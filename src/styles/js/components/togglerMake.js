/**
 * Toggler Make
 *
 * @param {String} selector
 */
 Ecsgroup.togglerMake = function(selector) {
    let targetParent = $(selector).find('.toggler-wrap'),
        limit = 5,
        hidenews = core10+' <i class=\"demo-icon cus-up-open-mini\"></i>',
        shownews = core11+' <i class=\"demo-icon cus-down-open-mini\"></i>';
    targetParent.each(function () {
        if ($(this).find('.toggler-item').length > 5) {
            let btn = $(this).find('.toggler-wrap-btn'),
                target = $(this);
            target.find('.toggler-item:not(:lt(' + limit + '))').hide();
            btn.css('margin-top', '1rem');
            btn.html(shownews);
            btn.on('click', function (e) {
                e.preventDefault();
                if (target.find(".toggler-item:eq(" + limit + ")").is(":hidden")) {
                    target.find(".toggler-item:hidden").show();
                    btn.html(hidenews);
                } else {
                    target.find(".toggler-item:not(:lt(" + limit + "))").hide();
                    btn.html(shownews);
                }
            })
        }
    });
 };