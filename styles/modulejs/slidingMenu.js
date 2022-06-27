/**
 * Toggler Make
 *
 * @param {String} selector
 */
 Ecsgroup.slidingMenu = function(selector, marker) {
    let target = $(selector),
        targetCurent = $(selector).find('li.active a'),
        itemLink = target.find('a'),
        line = target.find(marker);
    function indicator(e) {
        line.css({
            'left': e[0].offsetLeft + "px",
            'width': e[0].offsetWidth + "px",
        });
    }
    indicator(targetCurent);
    itemLink.each(function() {
        $(this).on("click", function(event){
            $(event.target).parent().addClass('active').siblings().removeClass('active');
            indicator($(event.target));
        });
    });
 };