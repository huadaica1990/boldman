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
        $(selector + ' > *').on('click', function(ele){
            ele.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        })
    });
};
Ecsgroup.srcollTabActive = function (selector, classactive) {
    return new srcollTabActiveEcs(selector, classactive);
};