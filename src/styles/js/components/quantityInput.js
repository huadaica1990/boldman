/**
 * Ecsgroup Plugin - QuantityInput
 * 
 * @instance multiple
 */
 function QuantityInput($el) {
    return this.init($el);
}
(function ($) {

    // Public Members
    QuantityInput.min = 1;
    QuantityInput.max = 1000000;
    QuantityInput.value = 1;

    QuantityInput.prototype.init = function ($el) {
        var self = this;

        self.$minus = false;
        self.$plus = false;
        self.$value = false;
        self.value = false;

        // Bind Events
        self.startIncrease = self.startIncrease.bind(self);
        self.startDecrease = self.startDecrease.bind(self);
        self.stop = self.stop.bind(self);

        // Variables
        self.min = parseInt($el.attr('min'));
        self.max = parseInt($el.attr('max'));

        self.min || ($el.attr('min', self.min = self.min ? QuantityInput.min : self.min));
        self.max || ($el.attr('max', self.max = self.max ? QuantityInput.max : self.max));

        // Add DOM elements and event listeners
        if ($el.attr('value') != null) self.$value = $el.val(self.value = $el.attr('value'));
        else self.$value = $el.val(self.value = QuantityInput.value);

        self.$minus = $el.parent().find('.quantity-minus')
            .on('mousedown', function (e) {
                e.preventDefault();
                self.startDecrease();
            })
            .on('touchstart', function (e) {
                if (e.cancelable) {
                    e.preventDefault();
                }
                self.startDecrease();
            })
            .on('mouseup', self.stop);

        self.$plus = $el.parent().find('.quantity-plus')
            .on('mousedown', function (e) {
                e.preventDefault();
                self.startIncrease();
            })
            .on('touchstart', function (e) {
                if (e.cancelable) {
                    e.preventDefault();
                }
                self.startIncrease();
            })
            .on('mouseup', self.stop);

        Ecsgroup.$body.on('mouseup', self.stop)
            .on('touchend', self.stop)
            .on('touchcancel', self.stop);
    }

    QuantityInput.prototype.startIncrease = function (e) {
        e && e.preventDefault();

        var self = this;
        self.value = self.$value.val();

        self.value < self.max && self.$value.val(++self.value);
        self.increaseTimer = Ecsgroup.requestTimeout(function () {
            self.speed = 1;
            self.increaseTimer = Ecsgroup.requestInterval(function () {
                self.$value.val(self.value = Math.min(self.value + Math.floor(self.speed *= 1.05), self.max));
            }, 50);
        }, 400);
    }

    QuantityInput.prototype.startDecrease = function (e) {
        e && e.preventDefault();

        var self = this;
        self.value = self.$value.val();
        self.value > self.min && self.$value.val(--self.value);

        self.decreaseTimer = Ecsgroup.requestTimeout(function () {
            self.speed = 1;
            self.decreaseTimer = Ecsgroup.requestInterval(function () {
                self.$value.val(self.value = Math.max(self.value - Math.floor(self.speed *= 1.05), self.min))
            }, 50);
        }, 400);
    }

    QuantityInput.prototype.stop = function (e) {
        Ecsgroup.deleteTimeout(this.increaseTimer);
        Ecsgroup.deleteTimeout(this.decreaseTimer);
    }

    Ecsgroup.initQtyInput = function (selector) {
        Ecsgroup.$(selector).each(function () {
            var $this = $(this);

            // if not initialized
            $this.data('quantityInput') ||
                $this.data('quantityInput', new QuantityInput($this));
        })
    }
})(jQuery);
