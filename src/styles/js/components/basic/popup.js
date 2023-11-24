/**
 * Ecsgroup Plugin - Popup
 *
 * @requires magnificPopup 
 * @instance multiple
 */
const Popup = {
    init: function(items,options, preset) {
        let startPerformanceTime = performance.now();
        this.core.start(items,options, preset);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.popup = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function (items,options, preset){
            Fancybox.show(items,
                $.extend(true, {},
                    Popup.defaults,
                    preset ? Popup.presets : {},
                    options
                )
            )
        }
    },
    defaults: {
        infinite: false,
        dragToClose: false,
        on: {
            init: ()=> {
                // $('html').css('overflow-y', 'hidden');
                $('body').css('overflow-x', 'visible');
                $('.mfp-wrap').css('overflow', 'hidden auto');
                $('.sticky-header.fixed').css('padding-right', window.innerWidth - document.body.clientWidth);
            },
            done: () => {
                if (document.documentElement.clientWidth < 800) {
                    $('#fb-root').hide();
                }
            },
            destroy: () => {
                $('html').css('overflow-y', '');
                $('body').css('overflow-x', 'hidden');
                $('.mfp-wrap').css('overflow', '');
                $('.sticky-header.fixed').css('padding-right', '');
                $('#fb-root').show();
            }
        }
    },
    presets: {
        quickview: {
            mainClass: 'fancybox-product-popup fancybox-modal-popup fancybox-wrapper',
            showClass: 'fancybox-fadeInUp',
            hideClass: 'fancybox-fadeOutDown',
        },
        error: {
            mainClass: 'fancybox-modal-popup fancybox-wrapper',
        },
        video: {
            type: 'iframe',
            mainClass: 'fancybox-video',
            preloader: false,
            closeBtnInside: false
        },
        login: {
            mainClass: 'fancybox-login-popup fancybox-modal-popup fancybox-wrapper fancybox-modal-close',
            showClass: 'fancybox-fadeInUp',
            hideClass: 'fancybox-fadeOutDown',
            closeButton: false,
            // click: false,
        },
        modal: {
            mainClass: 'fancybox-modal-popup fancybox-wrapper fancybox-modal-close',
            showClass: 'fancybox-fadeInUp',
            hideClass: 'fancybox-fadeOutDown',
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};

Ecsgroup.popup = function (items, options, preset) {
    return Popup.init(items, options, preset);
}