/**
 * initPopup
 *
 */
var popupOptions = {
    classHome: 'home'
};
function popupEcs (options, preset) {
    if (typeof Fancybox !== 'undefined') {
        // Newsletter popup
        if (Ecsgroup.$main.hasClass(popupOptions.classHome) && Ecsgroup.byId('newsletter-popup') && Ecsgroup.getCookie('EcsHidePopup') !== 'true') {
            setTimeout(function () {
                if (!Ecsgroup.popupPause) {
                    Ecsgroup.popup(
                        [{
                            src: '#newsletter-popup',
                            type: 'inline',
                        }],
                        {
                            mainClass: 'fancybox-modal-popup fancybox-wrapper',
                            on: {
                                closing: function () {
                                    // if "do not show" is checked
                                    $('#hide-newsletter-popup')[0].checked && Ecsgroup.setCookie('EcsHidePopup', true, 7);
                                }
                            },
                        }
                    );
                }
            }, 7500);
        }

        // Video popup
        Ecsgroup.$body.on('click', '.btn-iframe', function (e) {
            e.preventDefault();
            Ecsgroup.popupPause = true;
            Ecsgroup.popup({
                items: {
                    src: '<video src="' + $(e.currentTarget).attr('href') + '" autoplay loop controls>',
                    type: 'inline'
                },
                mainClass: 'mfp-video-popup'
            }, 'video')
        });

        // Login popup
        Ecsgroup.$body
            .on('click', '.sign-in-ajax', function (e) {
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
                                if ($('#loginjs').length == 0) addScript('/release/login-page.min.js', 'text/javascript', 'loginjs', false);
                            },
                            reveal: (fancybox, slide) => {
                                if ($('#loginjs').length != 0) $('#login-popup').removeClass('load-more-overlay loading');
                            }
                        }
                    }, 'login')
            })

            .on('click', '.register-ajax', function (e) {
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
                                if ($('#loginjs').length == 0) addScript('/release/login-page.min.js', 'text/javascript', 'loginjs', false);
                            },
                            reveal: (fancybox,slide) => {
                                $(slide.$content).find('.login-pane').removeClass('active');
                                $(slide.$content).find('#sign-up').addClass('active');
                                if ($('#loginjs').length != 0) $('#login-popup').removeClass('load-more-overlay loading');
                            },
                            shouldClose: () => {
                                if ($('#sign-up').hasClass('active') == true) {
                                    var message = 'Bạn có chắc chắn muốn rời khỏi hộp hội thoại này ngay bây giờ không';
                                    if (!confirm(message)) return false;
                                }
                            },
                        }
                    }, "login")
            });
        // Modal
        Ecsgroup.$body.on('click', '[data-modal]', function (e) {
            e.preventDefault();
            var modalId = $(e.currentTarget).data('target'),
                title = $(e.currentTarget).data('title');
            if (title != null) $(modalId).find('input[name="Title"]').val(title);
            if (document.documentElement.clientWidth < 576 && $(modalId).find('form') != null) {
                $(modalId).toggleClass('fancybox-hide').toggleClass('fancybox-show');
                $('html').append('<div class="fancyboxshow__backdrop"></div>').css('overflow', 'hidden');
                
            }
            else {
                Ecsgroup.popup(
                    [{
                        src: $(e.currentTarget).data('target'),
                        type: 'inline'
                    }],
                    {}, 'modal')
            }
        });

        Ecsgroup.$body.on('click', '.popup-close', function (e) {
            e.preventDefault();
            if (Fancybox.getInstance() != null) Fancybox.getInstance().close();
            else {
                $('.fancyboxshow__backdrop').remove();
                $(".fancybox-show").addClass('fancybox-hide').removeClass('fancybox-show');
            }
        });
        $(document).on('click', '.fancyboxshow__backdrop', function(e) {
            e.preventDefault();
            $('.fancyboxshow__backdrop').remove();
            $('.fancybox-show').addClass('fancybox-hide').removeClass('fancybox-show');
        });

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

    }
};
Ecsgroup.initPopup = function (options, preset) {
    return new popupEcs(options, preset);
};