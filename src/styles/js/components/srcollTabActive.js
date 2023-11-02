/**
 * countDown
 *
 * 
 * @param {String} selector 
 * @param {String} classactive 
 */
function srcollTabActiveEcs(selector, classactive) {
    Ecsgroup.$(selector).each(function () {
        var $this = $(this),
            eActiveLeft = $this.find(classactive).first().offset().left;
            $this.scrollLeft(eActiveLeft);
        $this.scrollLeft(eActiveLeft);
    });
};
Ecsgroup.srcollTabActive = function (selector, classactive) {
    return new srcollTabActiveEcs(selector, classactive);
};