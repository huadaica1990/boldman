/**
 * Ecsgroup Plugin - Sidebar
 * 
 * sidebar active class will be added to body tag: "sidebar class" + "-active"
 */
(function ($) {
    'use strict';
    function Sidebar(name) {
        return this.init(name);
    }
    var onResizeNavigationStyle = function () {
        if (window.innerWidth < 992) {
            this.$sidebar.find('.sidebar-content').removeAttr('style');
            this.$sidebar.find('.sidebar-content').attr('style', '');
            this.$sidebar.find('.toolbox').children(':not(:first-child)').removeAttr('style');
        }
    }
    Sidebar.prototype.init = function(name) {
        var self = this;
        self.name = name;
        self.$sidebar = $('.' + name);
        self.isNavigation = false;

        // If sidebar exists
        if (self.$sidebar.length) {

            // check if navigation style
            // self.isNavigation = self.$sidebar.hasClass('sidebar-fixed') && self.$sidebar.parent().hasClass('toolbox-wrap');

            // if (self.isNavigation) {
            //     onResizeNavigationStyle = onResizeNavigationStyle.bind(this);
            //     Ecsgroup.$window.on('resize', onResizeNavigationStyle);
            // }

            Ecsgroup.$window.on('resize', function (e) {
                if (Ecsgroup.windowResized(e.timeStamp)) {
                    Ecsgroup.$body.removeClass(name + '-active');
                }
            });

            // Register toggle event
            self.$sidebar.find('.sidebar-toggle, .sidebar-toggle-btn')
                .add(name === 'sidebar' ? '.left-sidebar-toggle' : '.' + name + '-toggle')
                .on('click', function (e) {
                    self.toggle();
                    $(this).blur();
                    e.preventDefault();
                });

            // Register close event
            self.$sidebar.find('.sidebar-overlay, .sidebar-close')
                .on('click', function (e) {
                    Ecsgroup.$body.removeClass(name + '-active');
                    e.preventDefault();
                });
        }
        return false;
    }
    Sidebar.prototype.toggle = function() {
        var self = this;
        var minwidth = 992;
        //if Xl sidebar
        if (self.$sidebar.hasClass('sidebar-switch-xl')) {
            minwidth = 1200;
        }
        // if fixed sidebar
        if (window.innerWidth >= minwidth && self.$sidebar.hasClass('sidebar-fixed')) {

            // is closed ?
            // var isClosed = self.$sidebar.hasClass('closed');

            // if navigation style's sidebar
            // if (self.isNavigation) {

            //     isClosed || self.$sidebar.find('.filter-clean').hide();

            //     self.$sidebar.siblings('.toolbox').children(':not(:first-child)').fadeToggle('fast');

            //     self.$sidebar
            //         .find('.sidebar-content')
            //         .stop()
            //         .animate(
            //             {
            //                 'height': 'toggle',
            //                 'margin-bottom': isClosed ? 'toggle' : -6
            //             }, function () {
            //                 $(this).css('margin-bottom', '');
            //                 isClosed && self.$sidebar.find('.filter-clean').fadeIn('fast');
            //             }
            //         );
            // }

            // If shop sidebar
            // if (self.$sidebar.hasClass('shop-sidebar')) {

            //     // change column
            //     var $wrapper = $('.main-content .product-wrapper');
            //     if ($wrapper.length) {
            //         if ($wrapper.hasClass('product-lists')) {

            //             // if list type, toggle 2 cols or 1 col
            //             $wrapper.toggleClass('row cols-xl-2', !isClosed);
            //         } else {

            //         }
            //     }
            // }
        } else {
            self.$sidebar.find('.sidebar-overlay .sidebar-close').css('margin-left', - (window.innerWidth - document.body.clientWidth));

            // activate sidebar
            Ecsgroup.$body
                .toggleClass(self.name + '-active')
                .removeClass('closed');
        }

        setTimeout(function () {
            Ecsgroup.$window.trigger('appear.check');
        }, 400);
    }
    Ecsgroup.sidebar = function (name) {
        return new Sidebar().init(name);
    }
})(jQuery);
