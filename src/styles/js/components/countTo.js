/**
 * countTo
 *
 * 
 * @requires jQuery.countTo
 * @param {String} selector
 */
function countToEcs (selector) {
    if ($.fn.countTo) {
        Ecsgroup.$(selector).each(function () {
            Ecsgroup.appear(this, function () {
                var $this = $(this);
                setTimeout(function () {
                    $this.countTo({
                        onComplete: function () {
                            $this.addClass('complete');
                        }
                    })
                }, 300);
            })
        });
    }
};

Ecsgroup.countTo = function (selector) {
    return new countToEcs(selector);
};