var preloadTemplate = '<div class="pre-load"><div class="flex-center"><div class="loader"></div></div></div>',
    errorTemplate = '<div class="alert-test"><div class="alert-title ecs-icon-times-circle" ></div > ERROR_MSG</div>';
// Effect
$('.input-group-effect .form-control').focus(function(event) {
    $(this).parent().addClass('focus');
}).blur(function(event) {
    if($(this).val() === '') $(this).parent().removeClass('focus');
});
function previewImg (event) {
    let reader = new FileReader(),
        imgWrap = $(event.target).closest('.preview-wrapper').find('.image-preview-wrapper');
    reader.onload = function(){
        if(reader.result != null) {
            imgWrap.find('img').attr('src', reader.result);
            imgWrap.addClass('preview-result');
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}
$(document).ajaxSend(function(e, xhr, options) {
    if (options.type.toUpperCase() == "POST" || options.type.toUpperCase() == "PUT") {
        var token = $('form').find("input[name='__RequestVerificationToken']").val();
        xhr.setRequestHeader("RequestVerificationToken", token);
    }
});
form.addEventListener('submit', function (event) {
    // Don't let the form reload the page
    event.preventDefault();
    // If the form is already submitting, do nothing
    if (form.hasAttribute('data-submitting')) return;
    // Add the [data-submitting] attribute to stop multiple submissions
    form.setAttribute('data-submitting', '');
    // Do more form stuff...
    // Remove the [data-submitting] attribute
    form.removeAttribute('data-submitting');
});

// View count
function updateViewCount(targetId, action) {
    $.ajax({
        url: action,
        type: 'GET',
        data: { id: targetId },
        beforeSend: function () { },
        success: function () { },
        error: function () { }
    });
}
function updateRateCount(targetId, viewname, action) {
    $.ajax({
        url: action,
        type: 'GET',
        data: { id: targetId, viewname: viewname },
        beforeSend: function () { },
        success: function (result) {
            $('#avg-rating-container-ajax').html(result.viewsrc)
        },
        error: function () { }
    });
}

// Search
function search(value) {
    $.ajax({
        url: '/aj/Search/PreSearch',
        type: 'GET',
        data: { keyword: value },
        beforeSend: function () { },
        success: function (result) {
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                $('.search-result-step2 .search-result-history').html(result.Data.viewsrc);
            }
        },
        error: function (result) {
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
// Rate
function addRating(btn, idform) {
    var submitted = true,
        $this = $(btn),
        formError = $(idform).find('.error-lst'),
        formImgLst = $(idform).find('.list-image');

    var form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                var summary = '<div>'+ text1 + this.numberOfInvalids() + text2 +'</div>';
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

            $.ajax({
                url: $(idform).attr('action'),
                type: 'POST',
                data: $(idform).serialize(),
                beforeSend: function () {
                    Ecsgroup.showLoading($this);
                },
                success: function (result) {
                    setTimeout(function () {
                        $this.removeClass('load-more-overlay loading');
                    }, 1000);
                    Ecsgroup.hideLoading();
                    if (!result.Ok) {
                        formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                    } else {
                        formError.hide();
                        $(idform).trigger('reset');
                        $('.rating-stars a').removeClass('active');
                        formImgLst.html('');
                        $(idform).find('input[name="ListImage"]').val('[]');
                        Ecsgroup.Minipopup.open({
                            productClass: ' success minipopup-center',
                            message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                            template:
                                '<div class="minipopup-box {{productClass}}">' +
                                '<div class="minipopup-body">' +
                                '<div class="minipopup-content">{{message}}</div>' +
                                '</div>' +
                                '</div>',
                        });
                    }
                    return false;
                },
                error: function (result) {
                    Ecsgroup.hideLoading($this);
                    Ecsgroup.resultDialog('error', result.msg);
                    return false;
                }
            });
        }
    });
}
function loadmorerating(obj, proid, pagesize) {
    var $this = $(obj),
        nextpage = $this.parent().find('#currentIndex');
    $.ajax({
        url: '/aj/Product/LoadmoreRating',
        type: 'GET',
        data: { productId: proid, page: nextpage.val(), pagesize: pagesize },
        beforeSend: function () {
            $this.addClass('load-more-overlay loading');
        },
        success: function (result) {
            $('html, body').animate({
                scrollTop: $('#rate .col-loadmore > *').last().offset().top - 80
            }, 500);
            $this.removeClass('load-more-overlay loading');
            nextpage.val(result.CurrentPage + 1);
            $('#rate .col-loadmore').append(result.viewsrc);
            if (result.CurrentPage >= result.TotalPageCount) $('#loadmorecmt').hide();
        },
        error: function (result) {
            $this.removeClass('load-more-overlay loading');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
// Comment
function showreply(obj, name) {
    $('.formreply').hide();
    $(obj).find('textarea').val('').focus();
    $(obj).show();
    $(obj).find('.formreply').show();
    $(obj).find('textarea').val('@' + name + ': ');
    $('html, body').animate({
        scrollTop: $(obj).offset().top - 190
    }, 200);
}
function addComment(btn, idform) {
    var submitted = true,
        $this = $(btn),
        formError = $(idform).find('.error-lst'),
        formImgLst = $(idform).find('.list-image');
    var form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                var summary = '<div>'+ text1 + this.numberOfInvalids() + text2 +'</div>';
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
            $.ajax({
                url: $(idform).attr('action'),
                type: 'POST',
                data: $(idform).serialize(),
                beforeSend: function () {
                    Ecsgroup.showLoading($this);
                },
                success: function (result) {
                    setTimeout(function () {
                        $this.removeClass('load-more-overlay loading');
                    }, 1000);
                    Ecsgroup.hideLoading();
                    if (!result.Ok) {
                        formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                    } else {
                        formError.hide();
                        $(idform).trigger('reset');
                        formImgLst.html('');
                        $(idform).find('input[name="ListImage"]').val('[]');
                        Ecsgroup.Minipopup.open({
                            productClass: ' success minipopup-center',
                            message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                            template:
                                '<div class="minipopup-box {{productClass}}">' +
                                '<div class="minipopup-body">' +
                                '<div class="minipopup-content">{{message}}</div>' +
                                '</div>' +
                                '</div>',
                        });
                    };
                    return false;
                },
                error: function (result) {
                    Ecsgroup.hideLoading($this);
                    Ecsgroup.resultDialog('error', result.msg);
                    return false;
                }
            });
        }
    });
}
function loadmorecomment(obj, newsid, pagesize) {
    var $this = $(obj),
        nextpage = $this.parent().find('#currentIndex');
    $.ajax({
        url: '/aj/News/LoadmoreComment',
        type: 'GET',
        data: { newsid: newsid, page: nextpage.val(), pagesize: pagesize },
        beforeSend: function () {
            $this.addClass('load-more-overlay loading');
        },
        success: function (result) {
            $('html, body').animate({
                scrollTop: $('#comment .col-loadmore > *').last().offset().top - 80
            }, 500);
            $this.removeClass('load-more-overlay loading');
            nextpage.val(result.CurrentPage + 1);
            $('#comment .col-loadmore').append(result.viewsrc);
            if (result.CurrentPage >= result.TotalPageCount) $('#loadmorecmt').hide();
            //else
            //$("#loadmorecmt").html("<a href=\"javascript:\" class=\"btn btn-primary btn-loading\" onclick=\"loadmorecomment(" + newsid + "," + (result.CurrentPage + 1) + "," + result.PageSize + ")\">Xem thêm bình luận</a>");
        },
        error: function (result) {
            $this.removeClass('load-more-overlay loading');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function removecmtimg(obj) {
    var target = $(obj).data('target'),
        value = $(target).find('input[name="ListImage"]').val(),
        src = $(obj).data('src'),
        valarray = JSON.parse(value);
    valarray = valarray.filter(function (item) {
        return item !== src
    })
    $(target).find('input[name="ListImage"]').val(JSON.stringify(valarray));
    $(obj).parent().remove();
}
    // Upload file
    function DeleteFile(file) {
        $.ajax({
            url: '/aj/Shared/DeleteFile',
            type: "POST",
            data: { path: file },
            beforeSend: function () {
                Ecsgroup.showLoading();
            },
            success: function () {
                Ecsgroup.hideLoading();
            },
            error: function () {
                Ecsgroup.hideLoading();
            }
        });
    };
    var fileCurrent;
    function UpdateFile(obj, direct, chipTemplate) {
        var data = new FormData();
        var files = obj._realInput.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].size > 1024 * 1024 * 5) {
                    alert(text3);
                    return -1;
                } else {
                    data.append('HelpSectionImages' + i, files[i]);
                }
            }
        }
        $.ajax({
            url: '/aj/Shared/UploadFile?pathStr=/file/' + (direct ? direct : 'banner') + '/',
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            beforeSend: function () {
                Ecsgroup.showLoading();
            },
            success: function (result) {
                Ecsgroup.hideLoading();
                if (!result.Ok) {
                    Ecsgroup.resultDialog('error', result.msg);
                }
                else {
                    obj._chipContainer.insertAdjacentHTML("beforeend", chipTemplate);
                    obj._toggleNoFile();
                    $(obj._realvalueInput).val(result.Data[0]);
                    Ecsgroup.Minipopup.open({
                        productClass: ' success minipopup-center',
                        message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                        template:
                            '<div class="minipopup-box {{productClass}}">' +
                            '<div class="minipopup-body">' +
                            '<div class="minipopup-content">{{message}}</div>' +
                            '</div>' +
                            '</div>',
                    });
                    fileCurrent = obj;
                }
            },
            error: function (result) {
                Ecsgroup.hideLoading();
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    };
    function UpdateImage(obj, input, direct, target) {
        var data = new FormData(),
            files = obj.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].size > 1024 * 1024 * 5) {
                    alert(text3);
                    return -1;
                } else {
                    data.append('HelpSectionImages' + i, files[i]);
                }
            }
        }
        $(obj).val('');
        $.ajax({
            url: '/aj/Shared/UploadImage?pathStr=/img/' + (direct ? direct : 'banner') + '/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            beforeSend: function () {
                Ecsgroup.showLoading();
            },
            success: function (result) {
                Ecsgroup.hideLoading();
                if (!result.Ok) {
                    Ecsgroup.resultDialog('error', result.msg);
                }
                else {
                    var html = '<div class="img-item br-sm"><a href="javascript:" class="img-cmt-js" data-target="' + target + '" data-src="' + result.Data + '" onclick="removecmtimg(this)"><i class="demo-icon cus-cancel"></i></a><img src="' + result.Data + '" alt="" width="150" height="100" loading="lazy"></div>';
                    $(target).find(".list-image").append(html);
                    var valueimg = new Array();
                    $(target).find('.list-image .img-item').each(function () {
                        var valsrc = $(this).find('img').attr("src");
                        valueimg.push(valsrc);
                    });
                    $(target).find('input[name="' + input + '"]').val(JSON.stringify(valueimg));
                    Ecsgroup.Minipopup.open({
                        productClass: ' success minipopup-center',
                        message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                        template:
                            '<div class="minipopup-box {{productClass}}">' +
                            '<div class="minipopup-body">' +
                            '<div class="minipopup-content">{{message}}</div>' +
                            '</div>' +
                            '</div>',
                    });
                }
            },
            error: function (result) {
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    };
    // End upload file
// Cart
// Cart
function addToCart(selector, quantityclass, url) {
    //var cartList = new Array()
    //if (window.localStorage.getItem("cartlist") != null) cartList = JSON.parse(window.localStorage.getItem("cartlist"));
    var $this = $(selector),
        productid = $this.data('id'),
        oldtext = $this.data('current-text'),
        loadingtext = $this.data('loading-text'),
        loadingdot = $this.data('loading-dot'),
        producttype = $this.data('producttype'),
        quantity = $this.parent().find(quantityclass).val();
    $this.addClass('load-more-overlay loading').html(loadingdot);
    Ecsgroup.shoppingCart.addItemToCart(productid, parseInt(quantity), producttype);
    if (url != null) {
        window.location.href = url;
    }
    else {
        setTimeout(function () {
            $this.html(loadingtext).css('pointer-events', 'none').removeClass('load-more-overlay loading');
            Ecsgroup.shoppingCart.showCartInfo();
        }, 1000);
        setTimeout(function () {
            $this.html(oldtext).css('pointer-events', 'auto');
        }, 2000);
    }
}
function addToCartList(obj, listid, url) {
    var $this = $(obj),
        oldtext = $this.data('current-text'),
        loadingtext = $this.data('loading-text'),
        loadingdot = $this.data('loading-dot'),
        listProduct = JSON.parse($(listid).val());
    $this.addClass('load-more-overlay loading').html(loadingdot);
    listProduct.forEach(function (elem) {
        Ecsgroup.shoppingCart.addItemToCart(elem.ProductId, parseInt(elem.Quantity), elem.Type);
    });
    if (url != null) {
        window.location.href = url;
    }
    else {
        setTimeout(function () {
            $this.html(loadingtext).css('pointer-events', 'none').removeClass('load-more-overlay loading');
            Ecsgroup.shoppingCart.showCartInfo();
        }, 1000);
        setTimeout(function () {
            $this.html(oldtext).css('pointer-events', 'auto');
        }, 2000);
    }
}

// Compare list
function initCompare(selector) {
    var compareList = new Array();
    if (window.localStorage.getItem("comparelist") != null) compareList = JSON.parse(window.localStorage.getItem("comparelist"));
    $(selector + ' .btn-compare').addClass('disabled');
    console.log("initCompare loading...");
    if (compareList.length > 0 && $(selector + ' .btn-compare').length > 0) {
        compareList.forEach(function (item) {
            $(selector + ' .btn-compare[data-id="' + item.id + '"]')
                .removeClass('ecs-icon-compare')
                .addClass('added ecs-icon-check-solid')
                .attr('href', Ecsgroup.linkCompare);
        });
    }
    else {
        $(selector + ' .btn-compare')
            .removeClass('added ecs-icon-check-solid')
            .addClass('ecs-icon-compare')
            .attr('href', 'javascript:');
    }
    console.log("initCompare complete");
    $(selector + ' .btn-compare').removeClass('disabled');
}
// Wish list
function updateWishLst(selector, productId) {
    var wishList = new Array();
    if (window.localStorage.getItem("wishlist") != null) wishList = JSON.parse(window.localStorage.getItem("wishlist"));
    var $this = $(selector);
    var wishListUpdate = wishList.find((elem, index) => {
        return elem === productId;
    });
    if (wishListUpdate == null) wishList.push(productId);
    $.ajax({
        url: "/aj/Account/UpdateWishList",
        type: 'POST',
        data: { listId: JSON.stringify(wishList)},
        beforeSend: function () {
            $this.addClass('load-more-overlay loading');
        },
        success: function (result) {
            if (!result.Ok) {
                $this.removeClass('load-more-overlay loading');
                Ecsgroup.resultDialog('error', result.msg);
            } else {
                $this.removeClass('load-more-overlay loading');
                $('body .btn-wishlist[data-id="' + productId + '"]')
                    .removeClass('ecs-icon-heart')
                    .addClass('added ecs-icon-heart-full')
                    .attr('href', Ecsgroup.linkWishList);
                Ecsgroup.Minipopup.open({
                    productClass: ' success minipopup-center',
                    message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                    template:
                        '<div class="minipopup-box {{productClass}}">' +
                        '<div class="minipopup-body">' +
                        '<div class="minipopup-content">{{message}}</div>' +
                        '</div>' +
                        '</div>',
                });
                window.localStorage.setItem('wishlist', JSON.stringify(wishList));
            }
        },
        error: function (result) {
            $this.removeClass('load-more-overlay loading');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function initHeart(selector) {
    console.log("initHeart loading...");
    var wishList = new Array();
    if (window.localStorage.getItem("wishlist") != null) wishList = JSON.parse(window.localStorage.getItem("wishlist"));
    $(selector + ' .btn-wishlist').addClass('disabled');
    $(selector + ' .btn-quickview').addClass('disabled');
    if (wishList.length > 0 && $(selector + ' .btn-wishlist').length > 0) {
        wishList.forEach(function (value) {
            $(selector + ' .btn-wishlist[data-id="' + value + '"]')
                .removeClass('ecs-icon-heart')
                .addClass('added ecs-icon-heart-full')
                .attr('href', Ecsgroup.linkWishList);
        });
        console.log("initHeart complete");
    }
    else {
        $.ajax({
            url: "/aj/Account/GetHeartStatus",
            type: 'POST',
            beforeSend: function () {},
            success: function (result) {
                if (result.Data) {
                    result.Data.forEach(function (value) {
                        $(selector + ' .btn-wishlist[data-id="' + value + '"]')
                            .removeClass('ecs-icon-heart')
                            .addClass('added ecs-icon-heart-full')
                            .attr('href', Ecsgroup.linkWishList);
                    });
                    window.localStorage.setItem('wishlist', JSON.stringify(result.Data));
                    console.log("initHeart complete");
                }
            },
            error: function () {
                console.log("initHeart error");
            }
        });
    }
    $(selector + ' .btn-wishlist').removeClass('disabled');
    $(selector + ' .btn-quickview').removeClass('disabled');
}
setTimeout(function () {
    if (Ecsgroup.isWishList) initHeart('body');
    if (Ecsgroup.isCompare) initCompare('body');
}, 3000);
// Sku
function selectSku(selector, viewname) {
    let $this = $(selector),
        htmlresult = $this.data('container'),
        attid = parseInt($this.data('attid')),
        attvalid = parseInt($this.data('attvalid')),
        productid = $this.data('productid'),
        iswishlist = $(htmlresult + ' .btn-wishlist.added').length,
        iscomparelist = $(htmlresult + ' .btn-compare.added').length,
        attlst = JSON.parse($(htmlresult + ' .attrlist-singlesku').val()),
        url = '/aj/Shared/SelectVerProduct?id=' + productid + '&ver=';
    urlprodut = $this.data('url');
    attlst.forEach(function (v, i) {
        if (v.ProductAttributeId === attid) {
            url += (i == 0 ? '' : 'v') + attid + '-' + attvalid;
            urlprodut += (i == 0 ? '' : 'v') + attid + '-' + attvalid;
        }
        else {
            url += (i == 0 ? '' : 'v') + v.ProductAttributeId + '-' + v.ProductAttributeValueId;
            urlprodut += (i == 0 ? '' : 'v') + v.ProductAttributeId + '-' + v.ProductAttributeValueId;
        }
    });
    if (Ecsgroup.isCountDown) $(htmlresult + ' .product-countdown').countdown('destroy');
    $.ajax({
        url: url,
        type: 'GET',
        data: { viewname: viewname },
        beforeSend: function () {
            if (htmlresult != '#product-popup-ajax') $(htmlresult).addClass('preload-container').append(preloadTemplate);
            else $(htmlresult).addClass('shimmer-container');
        },
        success: function (result) {
            if (htmlresult != '#product-popup-ajax') $(htmlresult).removeClass('preload-container').remove('.pre-load');
            else $(htmlresult).removeClass('shimmer-container');
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                $(htmlresult).html(result.Data.viewsrc).find('.product-url').attr('href', urlprodut);
                setTimeout(function () {
                    Ecsgroup.productSingle(htmlresult);
                    if (Ecsgroup.isCountDown) Ecsgroup.countDown(htmlresult + ' .product-countdown');
                    if (Ecsgroup.isWishList) $(htmlresult + ' .btn-wishlist').removeClass('disabled');
                    if (Ecsgroup.isCompare) $(htmlresult + ' .btn-compare').removeClass('disabled');
                    if (iswishlist > 0) $(htmlresult + ' .btn-wishlist').removeClass('ecs-icon-heart').addClass('added ecs-icon-heart-full').attr('href', Ecsgroup.linkWishList);
                    if (iscomparelist > 0) $(htmlresult + ' .btn-compare').removeClass('ecs-icon-compare').addClass('added ecs-icon-check-solid').attr('href', Ecsgroup.linkCompare);
                }, 500);
                if (htmlresult != '#product-popup-ajax') {
                    $('html, body').animate({
                        scrollTop: $(htmlresult).offset().top - 80
                    }, 500);
                }
                //Ecsgroup.shop.init();
            }
        },
        error: function (result) {
            if (htmlresult != '#product-popup-ajax') $(htmlresult).removeClass('preload-container').remove('.pre-load');
            else $(htmlresult).removeClass('shimmer-container');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function selectSkuDetail(obj) {
    var $this = $(obj),
        iswishlist = $('#product-info .btn-wishlist.added').length,
        iscomparelist = $('#product-info .btn-compare.added').length,
        producturl = $this.data('url'),
        attid = parseInt($this.data('id')),
        attvalid = parseInt($this.data('valid')),
        attlst = JSON.parse($('#attrlisthd').val()),
        urlbuilder = window.location.href.split('?')[0] + '?ver=',
        url = '/aj/product/selectverproduct?ver=';
    attlst.forEach(function (v, i) {
        if (v.ProductAttributeId === attid) {
            url += (i == 0 ? '' : 'v') + attid + '-' + attvalid;
            urlbuilder += (i == 0 ? '' : 'v') + attid + '-' + attvalid;
        }
        else {
            url += (i == 0 ? '' : 'v') + v.ProductAttributeId + '-' + v.ProductAttributeValueId;
            urlbuilder += (i == 0 ? '' : 'v') + v.ProductAttributeId + '-' + v.ProductAttributeValueId;
        }
    });
    $('#product-info').css('height', $('#product-info').height() + 'px');
    if (Ecsgroup.isCountDown) $('#product-info .product-countdown').countdown('destroy');
    $.ajax({
        url: url,
        type: 'POST',
        data: { url: producturl},
        beforeSend: function () {
            $('#product-info').addClass('shimmer-container');
        },
        success: function (result) {
            $('#product-info').removeClass('shimmer-container');
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                $('#product-info').html(result.Data.viewsrc).css('height', 'auto');
                $('.url-ajax').each(function () {
                    if ($(this).data('url')) $(this).attr('href', $(this).data('url') + window.location.href);
                    else $(this).attr('href', window.location.href);
                })
                window.history.pushState({ state: urlbuilder, rand: Math.random() }, document.title, urlbuilder);
                setTimeout(function () {
                    if (Ecsgroup.isCountDown) Ecsgroup.countDown('#product-info .product-countdown');
                    if (Ecsgroup.isWishList) $('#product-info .btn-wishlist').removeClass('disabled');
                    if (Ecsgroup.isCompare) $('#product-info .btn-compare').removeClass('disabled');
                    if (iswishlist > 0) $('#product-info .btn-wishlist').removeClass('ecs-icon-heart').addClass('added ecs-icon-heart-full').attr('href', Ecsgroup.linkWishList);
                    if (iscomparelist > 0) $('#product-info .btn-compare').removeClass('ecs-icon-compare').addClass('added ecs-icon-check-solid').attr('href', Ecsgroup.linkCompare);
                }, 1000);
                $('html, body').animate({
                    scrollTop: $('#product-info').offset().top - 80
                }, 500);
                Ecsgroup.stickyContent('.product-sticky-content', Ecsgroup.stickyProductOptions);
                Ecsgroup.productSingle('#product-info .product-single');
                Ecsgroup.initProductSinglePage.init();
                Ecsgroup.slider('#product-info .swiper-container');
                Ecsgroup.shop.init();
            }
            /*location.reload();*/
        },
        error: function (result) {
            $('#product-info').removeClass('shimmer-container');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function selectThumbSku(selector, id, url) {
    let $this = selector,
        html = '';
    $.ajax({
        url: '/aj/Shared/SelectSkuById',
        type: 'GET',
        data: { skuid: parseInt(id) },
        beforeSend: function () {
            $this.addClass('shimmer-container');
        },
        success: function (result) {
            $this.removeClass('shimmer-container');
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                if (result.Data.listedprice != 0) {
                    html = '<ins class="new-price price-promoprice">' + result.Data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) + '</ins>' +
                        '<label class="product-label label-discount"><span>-' + result.Data.percent + '%</span></label>';
                }
                else {
                    html = '<ins class="new-price">' + result.Data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) + '</ins>';
                }
                if ($this.find('input[type="checkbox"]').length > 0) {
                    $this.find('input[type="checkbox"]').attr({
                        'data-price': result.Data.price,
                        'data-promprice': result.Data.listedprice,
                        value: id
                    }).prop('checked', false);
                    Ecsgroup.initProductSinglePage.recommendItems();
                }
                $this.find('.product-url').attr('href', url + result.Data.url);
                $this.find('.btn-quickview ').attr('data-url', result.Data.url);
                $this.find('.product-price').html(html);
            }
        },
        error: function (result) {
            $this.removeClass('shimmer-container');
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function openProductPopup(btn) {
    var popup = '#product-popup',
        $this = $(btn),
        htmlresult = '#product-popup-ajax',
        productid = $this.data('id'),
        iswishlist = $this.parent().find('.btn-wishlist.added').length,
        iscomparelist = $this.parent().find('.btn-compare.added').length,
        url = '/aj/Shared/SelectVerProduct?id=' + productid + '&ver=' + $this.data('url');
    $.ajax({
        url: url,
        type: 'GET',
        data: { viewname: '_ItemProductPopup' },
        beforeSend: function () { },
        success: function (result) {
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                $(htmlresult).html(result.Data.viewsrc);
                Ecsgroup.popup(
                    [{
                        src: popup,
                        type: "inline"
                    }],
                    {
                        on: {
                            done: () => {
                                Ecsgroup.productSingle(htmlresult);
                                setTimeout(function () {
                                    if (Ecsgroup.isCountDown) Ecsgroup.countDown(htmlresult + ' .product-countdown');
                                    $this.removeClass('load-more-overlay loading');
                                    if (Ecsgroup.isWishList) $(htmlresult + ' .btn-wishlist').removeClass('disabled');
                                    if (Ecsgroup.isCompare) $(htmlresult + ' .btn-compare').removeClass('disabled');
                                    if (iswishlist > 0) $(htmlresult + ' .btn-wishlist').removeClass('ecs-icon-heart').addClass('added ecs-icon-heart-full').attr('href', Ecsgroup.linkWishList);
                                    if (iscomparelist > 0) $(htmlresult + ' .btn-compare').removeClass('ecs-icon-compare').addClass('added ecs-icon-check-solid').attr('href', Ecsgroup.linkCompare);
                                    $(htmlresult).removeClass('shimmer-container');
                                }, 500);
                            },
                            closing: () => {
                                if (Ecsgroup.isCountDown) $(htmlresult + ' .product-countdown').countdown('destroy');
                            }
                        },
                    }, 'quickview');
            }
        },
        error: function (result) {
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
// Filter news
function refreshFilterNews() {
    var form = $(Ecsgroup.byId('filterform'));
    form.find('input[name="sort"]').val($('#sortdropdown').val());
    form.find('input[name="page"]').val(1);
    getFilterResultNews();
}
function loadmoreFilterNews() {
    var form = $('#filterform'),
        page = parseInt(form.find('input[name="page"]').val()) + 1;
    form.find('input[name="page"]').val(page);
    form.find('input[name="sort"]').val($('#sortdropdown').val());
    getFilterResultNews('loadmore');
}
function getFilterResultNews(type) {
    var form = $("#filterform"),
        paramlist = ['page', 'sort'];
    if (type === 'loadmore') {
        var top = $('#list-filter-loadmore > *').last().offset().top;
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize() + '&type=loadmore',
            beforeSend: function () {
                $('#loadmore').addClass('load-more-overlay loading');
                $('#list-filter-loadmore').addClass('shimmer-container');
            },
            success: function (result) {
                $('html, body').animate({
                    scrollTop: top + 100
                }, 500);
                $('#list-filter-loadmore').append(result.viewsrc).removeClass('shimmer-container');
                totalitem = '1-' + $('#list-filter-loadmore > *').length + '/' + result.TotalItemCount;
                $('.readmore-count').text('(' + result.itemremaining + ')');
                $('.totalitem').text(totalitem);
                form.find('input[name="page"]').val(result.CurrentPage);
                if (result.CurrentPage >= result.TotalPageCount) $('#loadmore').hide();
                updateState(paramlist);
                $('#loadmore').removeClass('load-more-overlay loading');
            },
            error: function (result) {
                $('#list-filter-loadmore').removeClass('shimmer-container');
                $('#loadmore').removeClass('load-more-overlay loading');
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
    else {
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize(),
            beforeSend: function () {
                $('#list-filter').addClass('shimmer-container');
            },
            success: function (result) {
                $('#list-filter').html(result).removeClass('shimmer-container');
                $('.totalitem').text(totalitem);
                updateState(paramlist);
            },
            error: function (result) {
                $('#list-filter').removeClass('shimmer-container');
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
}
// Filter product
function refreshFilterProduct() {
    var form = $(Ecsgroup.byId('filterform'));
    //Lấy thuộc tính thả vào hidden field
    var pp = [];
    $('#filter input[name="attr"]:checked').each(function () {
        var atval = $(this).val().split("-");
        if (atval.length == 2) {
            var curentattr = pp.find(function (e) {
                return e.attid == atval[0];
            });

            if (curentattr) {
                curentattr.valid.push(atval[1]);
            } else {
                pp.push({
                    attid: atval[0],
                    valid: [atval[1]]
                });
            }
        }
    });

    form.find('input[name="pp"]').val('');
    if (pp.length > 0) {
        var valstr = '';
        for (var i = 0; i < pp.length; i++) {
            if (i != 0) {
                valstr += 'v';
            }
            valstr += pp[i].attid + '-' + pp[i].valid.join(',');
        }
        form.find('input[name="pp"]').val(valstr);
    }

    //Lấy thương hiệu thả vào hidden field
    var bp = [];
    $('#filter input[name="brand"]:checked').each(function () {
        bp.push($(this).val());
    });

    form.find('input[name="bp"]').val('');
    if (bp.length > 0) {
        form.find('input[name="bp"]').val(bp.join(','));
    }

    //Lấy giá thả vào hidden field
    var pr = [];
    $('#filter input[name="price"]:checked').each(function () {
        pr.push($(this).val());
    });

    form.find('input[name="pr"]').val('');
    if (pr.length > 0) {
        form.find('input[name="pr"]').val(pr.join(','));
    }

    //Lấy cách sắp xếp thả vào hidden field
    form.find('input[name="sort"]').val($('#sortdropdown').val());

    form.find('input[name="page"]').val(1);
    getFilterResultProduct();
}
function loadmoreFilterProduct() {
    var form = $('#filterform'),
        page = parseInt(form.find('input[name="page"]').val()) + 1;
    form.find('input[name="page"]').val(page);
    form.find('input[name="sort"]').val($('#sortdropdown').val());
    getFilterResultProduct('loadmore');
}
function getFilterResultProduct(type) {
    var form = $('#filterform'),
        paramlist = ['page', 'pp', 'bp', 'pr', 'sort'];
    if (Ecsgroup.isCountDown) $('#list-filter .product-countdown').countdown('destroy');
    if (type === 'loadmore') {
        var top = $('#list-filter-loadmore > *').last().offset().top;
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize() + '&type=loadmore',
            beforeSend: function () {
                $('#loadmore').addClass('load-more-overlay loading');
                $('#list-filter-loadmore').addClass('shimmer-container');
            },
            success: function (result) {
                $('html, body').animate({
                    scrollTop: top
                }, 500);
                $('#list-filter-loadmore').append(result.viewsrc).removeClass('shimmer-container');
                $('#list-filter-loadmore .lazyload-bg').each(function () {
                    $(this).css('background-image', 'url(' + $(this).data("bg") + ')').removeClass('lazyload-bg').addClass('ls-is-cached lazyloaded');
                })
                setTimeout(function () {
                    if (Ecsgroup.isCountDown) Ecsgroup.countDown('#list-filter .product-countdown');
                    if (Ecsgroup.isWishList) initHeart('#list-filter');
                }, 1000);
                totalitem = '1-' + $('#list-filter-loadmore > *').length + '/' + result.TotalItemCount;
                $('.readmore-count').text('(' + result.itemremaining + ')');
                $('.totalitem').text(totalitem);
                form.find('input[name="page"]').val(result.CurrentPage);
                if (result.CurrentPage >= result.TotalPageCount) $('#loadmore').hide();
                updateState(paramlist);
                $('#loadmore').removeClass('load-more-overlay loading');
            },
            error: function (result) {
                $('#list-filter-loadmore').removeClass('shimmer-container');
                $('#loadmore').removeClass('load-more-overlay loading');
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
    else {
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize(),
            beforeSend: function () {
                $('#list-filter').addClass('shimmer-container');
                Ecsgroup.showLoading();
            },
            success: function (result) {
                $('html, body').animate({
                    scrollTop: $('#productcat').offset().top - 100
                }, 500);
                $('#list-filter').html(result).removeClass('shimmer-container');
                $('#list-filter .lazyload-bg').each(function () {
                    $(this).css('background-image', 'url(' + $(this).data("bg") + ')').removeClass('lazyload-bg').addClass('ls-is-cached lazyloaded');
                })
                setTimeout(function () {
                    if (Ecsgroup.isCountDown) Ecsgroup.countDown('#list-filter .product-countdown');
                    if (Ecsgroup.isWishList) initHeart('#list-filter');
                    if (Ecsgroup.isCompare) initCompare('#list-filter');
                }, 1000);
                $('.totalitem').text(totalitem);
                Ecsgroup.hideLoading();
                updateState(paramlist);
            },
            error: function (result) {
                $('#list-filter').removeClass('shimmer-container');
                Ecsgroup.hideLoading();
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
}
// Filter store
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        $("#btn-near-location").addClass('active');
    } else {
        Ecsgroup.resultDialog('error', text4);
    }
}
function showPosition(position) {
    resetFilterStore();
    var form = $("#filterform"),
        formstore = $('#search-store-from'),
        latitude = position.coords.latitude,
        longitude = position.coords.longitude;
    formstore.find('input[name="lat"]').val(latitude);
    formstore.find('input[name="log"]').val(longitude);
    form.find("input[name='lat']").val(latitude);
    form.find("input[name='log']").val(longitude);
    if ($('.select-district li').length > 1) $('.select-district li[data-value="0"]').trigger('click');
    else refreshFilterStore();
}
function refreshDistrictList() {
    var provinceId = $("#filter input[name='province']:checked").val();
    $.ajax({
        url: '/aj/store/RefreshDistrictList',
        type: 'GET',
        data: { provinceid: provinceId },
        beforeSend: function () {
            Ecsgroup.showLoading();
        },
        success: function (result) {
            Ecsgroup.hideLoading();
            $('.select-district-js').html(result);
            //Ecsgroup.cutomizeSelect('.select-district');
        },
        error: function (result) {
            Ecsgroup.hideLoading();
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}
function resetFilterStore() {
    var form = $("#filterform"),
        formstore = $('#search-store-from'),
        pagesize = form.find('input[name="pagesize"]').val();
    $('#filter #select-district').val(null);
    form.find('input').val(null);
    formstore.find('input').val(null);
    formstore.find('input[name="sort"]').val(0);
    form.find('input[name="sort"]').val(0);
    form.find('input[name="pagesize"]').val(pagesize);
    form.find('input[name="page"]').val(1);
}
function refreshFilterStore() {
    var form = $(Ecsgroup.byId('filterform')),
        formstore = $('#search-store-from');
        form.find('input[name="sort"]').val($('#sortdropdown').val());

    //Lấy province vào hidden field
        var province = [];
        $('#filter input[name="province"]:checked').each(function () {
            province.push($(this).val());
        });
        form.find('input[name="province"]').val('');
        formstore.find('input[name="province"]').val('');
        if (province.length > 0) {
            form.find('input[name="province"]').val(province);
            formstore.find('input[name="province"]').val(province);
        }
    //Lấy district vào hidden field
        var district = [];
        district.push($('#filter #select-district').val());
        form.find('input[name="district"]').val('');
        formstore.find('input[name="district"]').val('');
        if (district.length > 0) {
            form.find('input[name="district"]').val(district);
            formstore.find('input[name="district"]').val(district);
        }


    form.find('input[name="page"]').val(1);
    getFilterResultStore();
}
function getFilterResultStore(type) {
    var form = $("#filterform"),
        paramlist = ['storekey', 'province', 'district', 'lat', 'log','page', 'sort'];
    if (type === 'loadmore') {
        var top = $('#list-filter-loadmore > *').last().offset().top;
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize() + '&type=loadmore',
            beforeSend: function () {
                $('#loadmore').addClass('load-more-overlay loading');
                $('#list-filter-loadmore').addClass('shimmer-container');
            },
            success: function (result) {
                $('html, body').animate({
                    scrollTop: top + 100
                }, 500);
                $('#list-filter-loadmore').append(result.viewsrc).removeClass('shimmer-container');
                totalitem = '1-' + $('#list-filter-loadmore > *').length + '/' + result.TotalItemCount;
                $('.readmore-count').text('(' + result.itemremaining + ')');
                $('.totalitem').text(totalitem);
                form.find('input[name="page"]').val(result.CurrentPage);
                if (result.CurrentPage >= result.TotalPageCount) $('#loadmore').hide();
                updateState(paramlist);
                $('#loadmore').removeClass('load-more-overlay loading');
            },
            error: function (result) {
                $('#list-filter-loadmore').removeClass('shimmer-container');
                $('#loadmore').removeClass('load-more-overlay loading');
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
    else {
        $.ajax({
            url: form.attr('action'),
            type: 'GET',
            data: form.serialize(),
            beforeSend: function () {
                $('#list-filter').addClass('shimmer-container');
            },
            success: function (result) {
                $('#list-filter').html(result).removeClass('shimmer-container');
                $('.totalitem').text(totalitem);
                updateState(paramlist);
            },
            error: function (result) {
                $('#list-filter').removeClass('shimmer-container');
                Ecsgroup.resultDialog('error', result.msg);
            }
        });
    }
}

// Loadmore srcoll
function loadmoreSrcoll() {
    var form = $('#filterform'),
        page = parseInt(form.find('input[name="page"]').val()) + 1,
        $wrapper = $('#list-filter-loadmore'),
        paramlist = ['keysearch', 'page', 'sort'];
    form.find('input[name="page"]').val(page);
    $.ajax({
        url: form.attr('action'),
        type: 'GET',
        data: form.serialize() + '&type=loadmore',
        beforeSend: function () {
            $wrapper.attr('data-load-state', 'loading');
            if (!$wrapper.next().hasClass('load-more-overlay')) {
                $('<div class="load-more-overlay loading"></div>').insertAfter($wrapper);
            } else {
                $wrapper.next().addClass('loading');
            }
        },
        success: function (result) {
            if (result.CurrentPage > result.TotalPageCount) {
                $wrapper.next().removeClass('loading');
                window.removeEventListener('scroll', loadmoreSrcoll, { passive: true });
            }
            else {
                $wrapper.attr('data-load-count', result.CurrentPage);
                setTimeout(function () {
                    $wrapper.next().removeClass('loading');
                    $wrapper.append(result.viewsrc);
                    initHeart('#list-filter-loadmore');
                    initCompare('#list-filter-loadmore');
                    $wrapper.data('load-state', 'loaded');
                }, 500);
                updateState(paramlist);
            }
        },
        error: function (result) {
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup({
                items: {
                    src: '#error-modal'
                },
            }, 'error');
        }
    });
}
function updateState(paramlist) {
    var frmData = $('#filterform').serializeArray(),
        qr = '',
        url = window.location.href.split('?')[0],
        title = document.title;
    for (var i = 0; i < frmData.length; i++) {
        var d = frmData[i];
        if (d.value === undefined || d.value === '')
            continue;
        if (paramlist.includes(d.name)) qr += '&' + d.name + '=' + d.value;
    }
    qr = qr.replace(/(^&)|(&$)/g, '');
    if (qr === '')
        qr = url;
    else
        qr = url + '?' + qr;
    window.history.pushState({ state: qr, rand: Math.random() }, title, qr);
}

function ajaxProduct(obj, id, viewname, htmlresult) {
    let $this = $(obj),
        parent = $this.parent(),
        stringVal = id.split('|'),
        targetType = stringVal[0],
        targetId = stringVal[1];
    if (Ecsgroup.isCountDown) $(htmlresult + ' .product-countdown').countdown('destroy');
    switch (targetType) {
        case 'productgroup':
            $.ajax({
                url: '/aj/Shared/ProductGroupAjax',
                type: 'GET',
                data: { id: targetId, viewname: viewname },
                beforeSend: function () {
                    parent.scrollLeft($this.offset().left - 15);
                    $this.addClass('active load-more-overlay loading').siblings().removeClass('active');
                    $(htmlresult).addClass('shimmer-container');
                },
                success: function (result) {
                    if (!result.Ok) {
                        $this.removeClass('load-more-overlay loading');
                        $(htmlresult).removeClass('shimmer-container');
                        Ecsgroup.resultDialog('error', result.msg);
                    }
                    else {
                        $this.removeClass('load-more-overlay loading');
                        $(htmlresult).html(result.Data.viewsrc).removeClass('shimmer-container');
                        $(htmlresult + ' .lazyload-bg').each(function () {
                            $(this).css('background-image', 'url(' + $(this).data("bg") + ')').removeClass('lazyload-bg').addClass('ls-is-cached lazyloaded');
                        })
                        setTimeout(function () {
                            if (Ecsgroup.isCountDown) Ecsgroup.countDown(htmlresult + ' .product-countdown');
                            if (Ecsgroup.isWishList) initHeart(htmlresult);
                            if (Ecsgroup.isCompare) initCompare(htmlresult);
                        }, 1000);
                        //Ecsgroup.shop.init();
                    }
                },
                error: function (result) {
                    $this.removeClass('load-more-overlay loading');
                    $(htmlresult).removeClass('shimmer-container');
                    Ecsgroup.resultDialog('error', result.msg);
                }
            });
            break;
        default:
            break;
    }
}
// Contact
$.extend($.validator.messages, {
    required: validate1,
    remote: validate2,
    email: validate3,
    url: validate4,
    date: validate5,
    dateISO: validate6,
    number: validate7,
    digits: validate8,
    creditcard: validate9,
    equalTo: validate10,
    accept: validate11,
    maxlength: $.validator.format(validate12),
    minlength: $.validator.format(validate13),
    rangelength: $.validator.format(validate14),
    range: $.validator.format(validate15),
    max: $.validator.format(validate16),
    min: $.validator.format(validate17)
});
jQuery.validator.addMethod("formattel", function (value, element, params) {
    $(element).val(intlTelVal.getNumber());
    return intlTelVal.isValidNumber();
}, validate19);
function validateForm(btn, idform, layout = 'default') {
    let submitted = true,
        formError = $(idform).find('.error-lst');
    let summary;
    let form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        rules: {
            phonenumber: {
                formattel: true
            }
        },
        messages: {
            phonenumber: {
                formattel: validate19,
            }
        },
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                switch (layout) {
                    case 'mini':
                        summary = text1 + this.numberOfInvalids() + text2 + '<br>';
                        $.each(errorList, function () {
                            summary += this.message + $(this.element).data('name') + '<br>';
                        });
                        setTimeout(() => {
                            $('#result-modal .modal-body p').html(summary);
                        }, 100);
                        break;
                    default:
                        summary = '<div>' + text1 + this.numberOfInvalids() + text2 + '</div>';
                        $.each(errorList, function () {
                            summary += '<div class="alert-test"><div class="alert-title ecs-icon-times-circle"></div> ' + this.message + $(this.element).data('name') + '</div>';
                        });
                        formError.html(summary);
                }
                submitted = false;
            }
            this.defaultShowErrors();
        },
        invalidHandler: function (event, validator) {
            // 'this' refers to the form
            switch (layout) {
                case 'mini':
                    if (validator.numberOfInvalids()) {
                        Ecsgroup.resultDialog('error', summary);
                    } else Fancybox.getInstance().close();
                    break;
                default:
                    if (validator.numberOfInvalids()) formError.show();
                    else formError.hide();
            }
            submitted = true;
        },
        submitHandler: function (form) {
            submitted = true;
            var note = $(idform).find('*[name="Note"]').val(),
                arr = [];
            $(idform).find('.get-value').each(function (e) {
                var check = $(this).attr('name');
                var arrayCheck = ['name', 'email', 'phonenumber', 'body', 'file'];
                if (!arrayCheck.includes(check) && $(this).prop('readonly') != true) {
                    var type = $(this).data('type');
                    var title = $(this).data('name');
                    var val = $(this).val();
                    var code = $(this).prop('name');
                    if (type === 6 || type === 7) {
                        if ($(this).is(':checked') === false) {
                            val = null;
                        }
                    }
                    arr.push({ "Name": title, "Value": val, "Tag": type, "Code": code });
                }
            });

            //var modal = {
            //    name: $(idform).find("*[name='name']").val(),
            //    phonenumber: $(idform).find("*[name='phonenumber']").val(),
            //    email: $(idform).find("*[name='email']").val(),
            //    body: $(idform).find("*[name='body']").val(),
            //    file: $(idform).find("*[name='file']").val(),
            //    Title: $(idform).find("*[name='Title']").val(),
            //    ContactType: $(idform).find("*[name='ContactType']").val(),
            //    Action: $(idform).find("*[name='Action']").val()
            //};
            $.ajax({
                url: $(idform).attr('action'),
                dataType: "json",
                method: "POST",
                /*data: { modal: modal, extentionfield: arr },*/
                data: $(idform).serialize() + '&ext=' + JSON.stringify(arr),
                beforeSend: function () {
                    $(btn).addClass('load-more-overlay loading');
                },
                success: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    switch (layout) {
                        case 'mini':
                            if (!result.Ok) {
                                Ecsgroup.resultDialog('error', result.msg);
                            }
                            else {
                                sendMail(result.Data.id, '/aj/Shared/SendEmail');
                                Ecsgroup.Minipopup.open({
                                    productClass: ' success minipopup-center',
                                    message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                                    template:
                                        '<div class="minipopup-box {{productClass}}">' +
                                        '<div class="minipopup-body">' +
                                        '<div class="minipopup-content">{{message}}</div>' +
                                        '</div>' +
                                        '</div>',
                                });
                                $(idform).trigger('reset');
                                if (Fancybox.getInstance() != null) Fancybox.getInstance().close();
                            }
                            return false;
                            break;
                        default:
                            if (!result.Ok) formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                            else {
                                sendMail(result.Data.id, '/aj/Shared/SendEmail');
                                formError.hide();
                                Ecsgroup.resultDialog('success', note);
                                $(idform).trigger('reset');
                                if (Fancybox.getInstance() != null) Fancybox.getInstance().close();
                                if (typeof fileCurrent !== 'undefined') fileCurrent._removeChips()
                            }
                            return false;
                    }
                },
                error: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    Ecsgroup.resultDialog('error', result.msg);
                    return false;
                }
            });
        }
    });
}
// function validateFormMini(btn, idform) {
//     let submitted = true;
//     let form = $(idform).validate({
//         focusInvalid: true,
//         errorPlacement: function (error, element) { return false; },
//         rules: {
//             phonenumber: {
//                 formattel: true
//             }
//         },
//         messages: {
//             phonenumber: {
//                 formattel: validate19,
//             }
//         },
//         //rules: {
//         //    email: {
//         //        required: true,
//         //    }
//         //},
//         //messages: {
//         //    email: {
//         //        required: validate18,
//         //    }
//         //},
//         showErrors: function (errorMap, errorList) {
//             if (submitted) {
//                 var summary = text1 + this.numberOfInvalids() + text2 + '<br>';
//                 $.each(errorList, function () {
//                     summary += this.message + $(this.element).data('name') + '<br>';
//                 });
//                 $('#error-modal p').html(summary);
//                 submitted = false;
//             }
//             this.defaultShowErrors();
//         },
//         invalidHandler: function (event, validator) {
//             // 'this' refers to the form
//             if (validator.numberOfInvalids()) {
//                Ecsgroup.resultDialog('error', null);
//             } else {
//                 Fancybox.getInstance().close();
//             }
//             submitted = true;
//         },
//         submitHandler: function (form) {
//             submitted = true;
//             var arr = [];
//             $(idform).find('.get-value').each(function (e) {
//                 var check = $(this).attr('name');
//                 var arrayCheck = ['name', 'email', 'phonenumber', 'body', 'file'];
//                 if (!arrayCheck.includes(check) && $(this).prop('readonly') != true) {
//                     var type = $(this).data('type');
//                     var title = $(this).data('name');
//                     var val = $(this).val();
//                     var code = $(this).prop('name');
//                     if (type === 6 || type === 7) {
//                         if ($(this).is(':checked') === false) {
//                             val = null;
//                         }
//                     }
//                     arr.push({ "Name": title, "Value": val, "Tag": type, "Code": code });
//                 }
//             });
//             //var modal = {
//             //    name: $(idform).find("*[name='name']").val(),
//             //    phonenumber: $(idform).find("*[name='phonenumber']").val(),
//             //    email: $(idform).find("*[name='email']").val(),
//             //    body: $(idform).find("*[name='body']").val(),
//             //    file: $(idform).find("*[name='file']").val(),
//             //    Title: $(idform).find("*[name='Title']").val(),
//             //    ContactType: $(idform).find("*[name='ContactType']").val(),
//             //    Action: $(idform).find("*[name='Action']").val()
//             //};
//             $.ajax({
//                 url: $(idform).attr('action'),
//                 dataType: "json",
//                 method: "POST",
//                 /*data: { modal: modal, extentionfield: null },*/
//                 data: $(idform).serialize() + '&ext=' + JSON.stringify(arr),
//                 beforeSend: function () {
//                     $(btn).addClass('load-more-overlay loading');
//                 },
//                 success: function (result) {
//                     $(btn).removeClass('load-more-overlay loading');
//                     if (!result.Ok) {
//                         Ecsgroup.resultDialog('error', result.msg);
//                     }
//                     else {
//                         sendMail(result.Data.id, '/aj/Shared/SendEmail');
//                         Ecsgroup.Minipopup.open({
//                             productClass: ' success minipopup-center',
//                             message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
//                             template:
//                                 '<div class="minipopup-box {{productClass}}">' +
//                                 '<div class="minipopup-body">' +
//                                 '<div class="minipopup-content">{{message}}</div>' +
//                                 '</div>' +
//                                 '</div>',
//                         });
//                         $(idform).trigger('reset');
//                     }
//                     return false;
//                 },
//                 error: function (result) {
//                     $(btn).removeClass('load-more-overlay loading');
//                      Ecsgroup.resultDialog('error', result.msg);
//                     return false;
//                 }
//             });
//         }
//     });
// }

function sendMail(targetId, action) {
    $.ajax({
        url: action,
        type: 'GET',
        data: { id: targetId },
        beforeSend: function () { },
        success: function () { },
        error: function () { }
    });
}
// Contact Api
function validateFormApi(btn, idform, source) {
    var submitted = true,
        emailto = 'tronghuy2208@gmail.com',
        exelApi = 'https://script.google.com/macros/s/AKfycbytuo2Pld01GVJjZrvlAMywFd6UJsN5Yy9-6SI90tGS9m1nR6aDhOy3yHJOppdo9QEHUg/exec', // https://github.com/levinunnink/html-form-to-google-sheet
        formError = $(idform).find('.error-lst');
    var form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                var summary = '<div>' + text1 + this.numberOfInvalids() + text2 + '</div>';
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
            var note = $(idform).find('*[name="Note"]').val(),
                arr = [];
            $(idform).find('.get-value').each(function (e) {
                var check = $(this).attr('name');
                var arrayCheck = ['name', 'email', 'phonenumber', 'body', 'file'];
                if (!arrayCheck.includes(check)) {
                    var type = $(this).data('type');
                    var title = $(this).data('name');
                    var val = $(this).val();
                    var code = $(this).prop('name');
                    if (type === 6 || type === 7) {
                        if ($(this).is(':checked') === false) {
                            val = null;
                        }
                    }
                    arr.push({ "Name": title, "Value": val, "Tag": type, "Code": code });
                }
            });

            //var modal = {
            //    name: $(idform).find("*[name='name']").val(),
            //    phonenumber: $(idform).find("*[name='phonenumber']").val(),
            //    email: $(idform).find("*[name='email']").val(),
            //    body: $(idform).find("*[name='body']").val(),
            //    file: $(idform).find("*[name='file']").val(),
            //    Title: $(idform).find("*[name='Title']").val(),
            //    ContactType: $(idform).find("*[name='ContactType']").val(),
            //    Action: $(idform).find("*[name='Action']").val()
            //};
            if (exelApi != '') {
                $.ajax({
                    url: exelApi,
                    method: "POST",
                    data: $(idform).serialize(),
                    beforeSend: function () {},
                    success: function (result) {},
                    error: function (result) {}
                });
            }
            $.ajax({
                url: 'https://boldman.vn/aj/StaticPage/ContactApi',
                dataType: "json",
                method: "POST",
                /*data: { modal: modal, extentionfield: arr },*/
                data: $(idform).serialize() + '&extentionfield=' + JSON.stringify(arr),
                beforeSend: function () {
                    $(btn).addClass('load-more-overlay loading');
                },
                success: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    if (!result.Ok) {
                        formError.html(errorTemplate.replace('ERROR_MSG', result.Msg)).show();
                    }
                    else {
                        sendMailApi(result.Data.id, 'https://boldman.vn/aj/staticpage/SendEmailApi', emailto);
                        formError.hide();
                        Ecsgroup.resultDialog('success', note);
                        $(idform).trigger('reset');
                        if (typeof fileCurrent !== 'undefined') {
                            fileCurrent._removeChips()
                        }
                    }
                    return false;
                },
                error: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                                        Ecsgroup.resultDialog('error', result.msg);
                    return false;
                }
            });
        }
    });
}
function sendMailApi(targetId, action, emailto) {
    $.ajax({
        url: action,
        type: 'GET',
        data: { id: targetId, emailTo: emailto },
        beforeSend: function () { },
        success: function () { },
        error: function () { }
    });
}

function choselang(lang) {
    $.ajax({
        url: '/aj/shared/CreateCookie',
        type: 'POST',
        data: { lang: lang},
        beforeSend: function () {
            Ecsgroup.showLoading($this);
        },
        success: function (data) {
            if (!data.Ok) location.reload();
            else alert("Lỗi");
        },
        error: function () { }
    });
}