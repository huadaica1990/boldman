/**
 * Ecsgroup Plugin - Popup
 *
 * @requires magnificPopup 
 * @instance multiple
 */
function Popup(items,options, preset) {
    return this.init(items,options, preset);
}
Popup.defaults = {
    infinite: false,
    dragToClose: false,
    on: {
        init: ()=> {
            $('html').css('overflow-y', 'hidden');
            $('body').css('overflow-x', 'visible');
            $('.mfp-wrap').css('overflow', 'hidden auto');
            $('.sticky-header.fixed').css('padding-right', window.innerWidth - document.body.clientWidth);
        },
        done: () => {
            if (document.documentElement.clientWidth < 800) {
                $("#fb-root").hide();
            }
        },
        destroy: () => {
            $('html').css('overflow-y', '');
            $('body').css('overflow-x', 'hidden');
            $('.mfp-wrap').css('overflow', '');
            $('.sticky-header.fixed').css('padding-right', '');
            $("#fb-root").show();
        }
    }
    //removalDelay: 300,
    //callbacks: {
    //    open: function () {
    //        $('html').css('overflow-y', 'hidden');
    //        $('body').css('overflow-x', 'visible');
    //        $('.mfp-wrap').css('overflow', 'hidden auto');
    //        $('.sticky-header.fixed').css('padding-right', window.innerWidth - document.body.clientWidth);
    //    },
    //    close: function () {
    //        $('html').css('overflow-y', '');
    //        $('body').css('overflow-x', 'hidden');
    //        $('.mfp-wrap').css('overflow', '');
    //        $('.sticky-header.fixed').css('padding-right', '');
    //    }
    //}
}
Popup.presets = {
    'quickview': {
        mainClass: 'fancybox-product-popup fancybox-modal-popup fancybox-wrapper',
        showClass: "fancybox-fadeInUp",
        hideClass: "fancybox-fadeOutDown",
    },
    'error': {
        mainClass: "fancybox-modal-popup fancybox-wrapper",
    },
    'video': {
        type: 'iframe',
        mainClass: "mfp-fade",
        preloader: false,
        closeBtnInside: false
    },
    'login': {
        mainClass: "fancybox-login-popup fancybox-modal-popup fancybox-wrapper fancybox-modal-close",
        showClass: "fancybox-fadeInUp",
        hideClass: "fancybox-fadeOutDown",
        closeButton: false,
        click: false,
    },
    'modal': {
        mainClass: "fancybox-modal-popup fancybox-wrapper fancybox-modal-close",
        showClass: "fancybox-fadeInUp",
        hideClass: "fancybox-fadeOutDown",
    },
}
Popup.prototype.init = function (items, options, preset) {
    Fancybox.show(items,
        $.extend(true, {},
            Popup.defaults,
            preset ? Popup.presets[preset] : {},
            options
        )
    );
    //var mpIns = $.magnificPopup.instance;
    ///*if (mpIns.isOpen && mpIns.content && $(mpIns.content).hasClass('login-popup')) {*/
    //if (mpIns.isOpen && mpIns.content) {
    //    // close current
    //    mpIns.close();

    //    // open a new one after a few moment
    //    setTimeout(function () {
    //        $.magnificPopup.open(
    //            $.extend(true, {},
    //                Popup.defaults,
    //                preset ? Popup.presets[preset] : {},
    //                options
    //            )
    //        )
    //    }, 500);
    //} else {
    //    $.magnificPopup.open(
    //        $.extend(true, {},
    //            Popup.defaults,
    //            preset ? Popup.presets[preset] : {},
    //            options
    //        )
    //    );
    //}
}
Ecsgroup.popup = function (items, options, preset) {
    return new Popup(items, options, preset);
}