
Ecsgroup.showPassword('.btn-showpass');
$(document.body).on('click', '.login-popup .btn-back', function (e) {
    e.preventDefault();
    var container = '#'+$(e.currentTarget.closest('.login-popup')).attr('id');
    $(container).find('.login-pane').removeClass('active');
    $(container).find('.sign-in').addClass('active');
});

$(document.body).on('click', '.showhidetab-js', function (e) {
    e.preventDefault();
    var target = $(this).data('target'),
        backUrl = $(this).data('back'),
        container = '#' + $(e.currentTarget.closest('.login-popup')).attr('id');
    if (backUrl != null) {
        $(document.body).on('click', container+' .btn-back', function (e) {
            e.preventDefault();
            $(container).find('.login-pane').removeClass('active');
            $(container).find(backUrl).addClass('active');
        });
    }
    $(container).find('.login-pane').removeClass('active');
    $(container).find(target).addClass('active');
});


function validateLogin(btn, idform, callback) {
    let submitted = true,
        formError = $(idform).find('.error-lst');
    var form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                var summary = '<div>Có ' + this.numberOfInvalids() + ' lỗi, xem chi tiết bên dưới.</div>';
                $.each(errorList, function () {
                    summary += '<div class="alert-test"><div class="alert-title ecs-icon-times-circle"></div> ' + this.message + $(this.element).data('name') + '</div>';
                });
                formError.html(summary);
                submitted = false;
            }
            this.defaultShowErrors();
        },
        invalidHandler: function (event, validator) {
            // 'this' refers to the form
            if (validator.numberOfInvalids()) {
                formError.show();
            } else {
                formError.hide();
            }
            submitted = true;
        },
        submitHandler: function (form) {
            submitted = true;
            var formError = $(idform).find('.error-lst'),
                errorTemplate = '<div class="alert-test"><div class="alert-title ecs-icon-times-circle" ></div > ERROR_MSG</div>';
            $.ajax({
                url: $(idform).attr('action'),
                method: "POST",
                data: $(idform).serialize(),
                beforeSend: function () {
                    $(btn).addClass('load-more-overlay loading');
                },
                success: function (result) {
                    if (!result.Ok) {
                        $(btn).removeClass('load-more-overlay loading');
                        formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                    }
                    else {
                        formError.hide();
                        Ecsgroup.Minipopup.open({
                            productClass: ' success minipopup-center',
                            message: '<p><i class="demo-icon cus-ok-circled"></i>Gửi thành công</p>',
                            template:
                                '<div class="minipopup-box {{productClass}}">' +
                                '<div class="minipopup-body">' +
                                '<div class="minipopup-content">{{message}}</div>' +
                                '</div>' +
                                '</div>',
                        });
                        if (callback != null) {
                            location.href = callback;
                        }
                        else {
                            if (result.Data.callback != null) location.href = result.Data.callback;
                            else location.reload();
                        }
                    }
                    return false;
                },
                error: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                    return false;
                }
            });
        }
    });
}

$('#login-popup').removeClass('load-more-overlay loading');