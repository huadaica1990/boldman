/**
 * Set TypeWriter 
 * 
 * @param {string, Object} selector
 * @param {Object} options
 */
function TypeWriter($el) {
    return this.init($el);
}
// Public Properties
TypeWriter.defaults = {
    period: 5000,
}
TypeWriter.prototype.init = function ($el) {
    var settings = $.extend(true, {}, TypeWriter.defaults),
        value = Ecsgroup.parseOptions($el.attr('data-typewriter-value'));
    $.extend(true, settings, Ecsgroup.parseOptions($el.attr('data-typewriter-options')));
    this.el = $el;
    this.toRotate = value;
    this.loopNum = 0;
    this.period = parseInt(settings.period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
}
TypeWriter.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    };
    this.el[0].innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
}
Ecsgroup.typeWriter = function (selector) {
    Ecsgroup.$(selector).each(function () {
        var $this = $(this);

        Ecsgroup.call(function () {
            new TypeWriter($this);
        });
    });
}