/**
 * initPopup
 *
 */
let popupOptions = {
    classHome: 'home',
    newsLetter: {
        id: 'newsletter-popup',
        timeOut: 7500
    },
    allowCookie: {
        id: 'cookie-popup',
        timeOut: 8000
    },
    iframe: {
        class: '.btn-iframe',
    },
    login: {
        siginIn: '.sign-in-ajax',
        register: '.register-ajax',
    }
},
popupTemplateOptions = {
    error: {
        msg: err12,
        html: '<div class="alert alert-error alert-bg alert-button alert-block text-right"><button class="btn btn-link btn-close popup-close" aria-label="button"><i class="close-icon"></i></button><div class="alert-title text-left"><i class="ecs-icon-exclamation-triangle"></i>'+text9+'</div><p class="text-left">MSG</p><a class="btn btn-sm btn-primary btn-rounded popup-close" href="javascript:">Đóng</a></div>'
    },
    success: {
        msg: err13,
        html: '<div class="alert alert-success alert-bg alert-button alert-block text-right"><button class="btn btn-link btn-close popup-close" aria-label="button"><i class="close-icon"></i></button><div class="alert-title text-left"><i class="demo-icon cus-ok"></i>'+text10+'</div><p class="text-left">MSG</p><a class="popup-close" href="javascript:">'+text11+'</a><span class="text-grey mr-1 ml-1">'+text12+' </span><a class="text-lowercase text-underline text-primary" href="/">'+text13+'</a></div>'
    },
    requireLogin: {
        msg: err14,
        html: '<div class="alert alert-error alert-bg alert-button alert-block text-right"><button class="btn btn-link btn-close popup-close" aria-label="button"><i class="close-icon"></i></button><div class="alert-title text-left"><i class="ecs-icon-exclamation-triangle"></i>'+text9+'</div><p class="text-left">MSG</p><a class="btn btn-sm btn-default btn-rounded popup-close" href="javascript:">'+text11+'</a><a class="btn btn-sm btn-primary btn-rounded" href="'+Ecsgroup.options.links.accInfo+'">'+text14+'</a></div>'
    }
};
const popupEcs = {
    init: function () {
        if (typeof Fancybox !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.basic();
            this.core.newsLetter();
            this.core.iframe();
            this.core.login();
            this.core.modal();
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.initPopup = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        basic: function() {
            Ecsgroup.$body.on('click', '.popup-close, .fancyboxshow__backdrop', function (e) {
                e.preventDefault();
                if (Fancybox.getInstance() != null) Fancybox.getInstance().close();
                else {
                    $('.fancyboxshow__backdrop').remove();
                    $(".fancybox-show").addClass('fancybox-hide').removeClass('fancybox-show');
                    $('html').removeAttr('style');
                    $("#fb-root").show();
                }
            });
            Ecsgroup.resultDialog = function (template, message) {
                let opt = popupTemplateOptions[template],
                    html = opt.html,
                    msg = opt.msg;
                if (message != null) msg = message;
                $('#result-modal .modal-body').html(html.replace('MSG', msg));
                Ecsgroup.popup(
                    [{
                        src: '#result-modal',
                        type: 'inline'
                    }],
                    {}, "modal")
            }
            Ecsgroup.confirmDialog = function (message, func, value) {
                $('#confirm-modal p').text(message);
                Ecsgroup.popup(
                    [{
                        src: '#confirm-modal',
                        type: 'inline'
                    }],
                    {
                        closeButton: false,
                        click: false,
                        on: {
                            done: (fancybox, slide)=> {
                                $(slide.$content).on('click', '.popup-confirm', function () {
                                    if (typeof func == 'function') {
                                        func(value);
                                    }
                                    Fancybox.getInstance().close();
                                    $(document).off('keydown', keydownHandler);
                                });
                                $(slide.$content).on('click', '.popup-close', function () {
                                    /*Fancybox.getInstance().close();*/
                                    $(document).off('keydown', keydownHandler);
                                });
                                var keydownHandler = function (e) {
                                    if (e.keyCode == 13) {
                                        $(slide.$content).find('.popup-confirm').click();
                                        return false;
                                    } else if (e.keyCode == 27) {
                                        $(slide.$content).find('.popup-close').click();
                                        return false;
                                    }
                                };
                                $(document).on('keydown', keydownHandler);
                            }
                        }
                    }, "modal")
            }
        },
        newsLetter: function () {
            if (Ecsgroup.$main.hasClass(popupOptions.classHome) && Ecsgroup.byId(popupOptions.newsLetter.id) && Ecsgroup.getCookie('EcsHidePopup') !== 'true') {
                setTimeout(function () {
                    if (!Ecsgroup.popupPause) {
                        Ecsgroup.popup(
                            [{
                                src: '#'+popupOptions.newsLetter.id,
                                type: 'inline',
                            }],
                            {
                                mainClass: 'fancybox-modal-popup fancybox-wrapper',
                                on: {
                                    done: function() {
                                        Ecsgroup.popupPause = true;
                                    },
                                    closing: function () {
                                        Ecsgroup.popupPause = false;
                                        // if "do not show" is checked
                                        $('#hide-newsletter-popup')[0].checked && Ecsgroup.setCookie('EcsHidePopup', true, 7);
                                        if (Ecsgroup.options.initPopup.allowCookie_stt && Ecsgroup.byId(popupOptions.allowCookie.id) && Ecsgroup.getCookie('EcsAllowCookie') !== 'true') popupEcs.core.allowCookie(popupOptions.newsLetter.timeOut);
                                    }
                                },
                            }
                        );
                    }
                }, popupOptions.newsLetter.timeOut);
            }
            if (Ecsgroup.$main.hasClass(popupOptions.classHome) && Ecsgroup.byId(popupOptions.allowCookie.id) && !Ecsgroup.byId(popupOptions.allowCookie.id).classList.contains('fancybox__content') && Ecsgroup.getCookie('EcsAllowCookie') !== 'true') popupEcs.core.allowCookie(popupOptions.allowCookie.timeOut);
        },
        allowCookie: function(timeout) {
            if (Ecsgroup.options.initPopup.allowCookie_stt) {
                setTimeout(function () {
                    if (!Ecsgroup.popupPause) {
                        Ecsgroup.popup(
                            [{
                                src: '#' + popupOptions.allowCookie.id,
                                type: 'inline',
                            }],
                            {
                                closeButton: false,
                                mainClass: 'fancybox-modal-popup fancybox-modal-cookie fancybox-wrapper',
                                on: {
                                    done: (fancybox, slide)=> {
                                        $('#btn-acceptcookie').on('click', function() {
                                            Ecsgroup.setCookie('EcsAllowCookie', true, 30);
                                            Fancybox.getInstance().close();
                                        });
                                    },
                                    closing: function () {}
                                },
                            }
                        );
                    }
                }, timeout);
            }
        },
        iframe: function() {
            Ecsgroup.$body.on('click', popupOptions.iframe.class, function (e) {
                e.preventDefault();
                Ecsgroup.popupPause = true;
                Ecsgroup.popup(
                    [{
                        src: $(e.currentTarget).attr('href'),
                        type: 'iframe'
                    }], 'video')
            });
        },
        login: function() {
            Ecsgroup.$body.on('click', popupOptions.login.siginIn, function (e) {
                e.preventDefault();
                Ecsgroup.popupPause = true;
                Ecsgroup.popup(
                    [{
                        src: $(e.currentTarget).attr('href'),
                        type: 'ajax'
                    }],
                    {
                        on: {
                            load: () => {
                                if ($('#loginjs').length == 0) addScript('/wwwroot/templates/website/release/login-page.min.js', 'text/javascript', 'loginjs', false);
                            },
                            reveal: (fancybox, slide) => {
                                if ($('#loginjs').length != 0) $('#login-popup').removeClass('load-more-overlay loading');
                            },
                            shouldClose: () => {
                                if ($('#sign-up').hasClass('active') == true) {
                                    var message = core3;
                                    if (!confirm(message)) return false;
                                }
                            }
                        }
                    }, 'login')
            })
            .on('click', popupOptions.login.register, function (e) {
                e.preventDefault();
                Ecsgroup.popupPause = true;
                Ecsgroup.popup(
                    [{
                        src: $(e.currentTarget).attr('href'),
                        type: 'ajax'
                    }],
                    {
                        on: {
                            load: () => {
                                if ($('#loginjs').length == 0) addScript('/wwwroot/templates/website/release/login-page.min.js', 'text/javascript', 'loginjs', false);
                            },
                            reveal: (fancybox,slide) => {
                                $(slide.$content).find('.login-pane').removeClass('active');
                                $(slide.$content).find('#sign-up').addClass('active');
                                if ($('#loginjs').length != 0) $('#login-popup').removeClass('load-more-overlay loading');
                            },
                            shouldClose: () => {
                                if ($('#sign-up').hasClass('active') == true) {
                                    var message = core3;
                                    if (!confirm(message)) return false;
                                }
                            },
                        }
                    }, "login")
            });
        },
        modal: function() {
            Ecsgroup.$body.on('click', '[data-modal]', function (e) {
                e.preventDefault();
                var modalId = $(e.currentTarget).data('target') != null ? $(e.currentTarget).data('target') : $(e.currentTarget).attr('href'),
                    title = $(e.currentTarget).data('title');
                if (title != null) $(modalId).find('input[name="Title"]').val(title);
                if (document.documentElement.clientWidth < 576 && $(modalId).find('form') != null) {
                    $(modalId).toggleClass('fancybox-hide').toggleClass('fancybox-show');
                    $('html').append('<div class="fancyboxshow__backdrop"></div>').css('overflow-y', 'hidden');
                    $("#fb-root").hide();
                }
                else {
                    Ecsgroup.popup(
                        [{
                            src: modalId,
                            type: 'inline'
                        }],
                        {}, 'modal')
                }
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initPopup = function () {
    return popupEcs.init();
};