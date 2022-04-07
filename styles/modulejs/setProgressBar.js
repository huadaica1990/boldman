/**
 * setProgressBar 
 *
 * 
 * Find all .progress-bar and set its value
 * @param { String } selector 
 */
 Ecsgroup.setProgressBar = function(selector) {
    Ecsgroup.$(selector).each(function () {
        var $this = $(this),
            sales_count = $this.parent().find('mark')[0].innerHTML,
            percent = '';
        if (-1 != sales_count.indexOf('%')) {
            percent = sales_count;
        } else if (-1 != sales_count.indexOf('/')) {
            percent = parseInt(sales_count.split('/')[0]) / parseInt(sales_count.split('/')[1]) * 100;
            percent = percent.toFixed(2).toString() + '%';
        }
        $this.find('span').css('width', percent);
    });
 };