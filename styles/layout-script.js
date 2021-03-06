var preloadTemplate = '<div class="pre-load"><div class="flex-center"><div class="loader"></div></div></div>',
    errorTemplate = '<div class="alert-test"><div class="alert-title ecs-icon-times-circle" ></div > ERROR_MSG</div>';
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
                $('#error-modal p').text(result.msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
            else {
                $('.search-result-step2 .search-result-history').html(result.Data.viewsrc);
            }
        },
        error: function (result) {
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
                var summary = '<div>C?? ' + this.numberOfInvalids() + ' l???i, xem chi ti???t b??n d?????i.</div>';
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
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
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
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
                var summary = '<div>C?? ' + this.numberOfInvalids() + ' l???i, xem chi ti???t b??n d?????i.</div>';
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
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
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
            //$("#loadmorecmt").html("<a href=\"javascript:\" class=\"btn btn-primary btn-loading\" onclick=\"loadmorecomment(" + newsid + "," + (result.CurrentPage + 1) + "," + result.PageSize + ")\">Xem th??m b??nh lu???n</a>");
        },
        error: function (result) {
            $this.removeClass('load-more-overlay loading');
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
                    alert('File ???nh kh??ng ???????c qu?? 5MB');
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
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
        });
    };
    function UpdateImage(obj, input, direct, target) {
        var data = new FormData(),
            files = obj.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].size > 1024 * 1024 * 5) {
                    alert('File ???nh kh??ng ???????c qu?? 5MB');
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
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
        });
    };
    // End upload file
// Cart
updateCart();
function addToCart(selector, quantityclass, url) {
    var cartList = new Array()
    if (window.localStorage.getItem("cartlist") != null) cartList = JSON.parse(window.localStorage.getItem("cartlist"));
    var $this = $(selector),
        productid = $this.data('id'),
        oldtext = $this.data('current-text'),
        loadingtext = $this.data('loading-text'),
        loadingdot = $this.data('loading-dot'),
        producttype = $this.data('producttype'),
        quantity = $this.parent().find(quantityclass).val();
    $this.addClass('load-more-overlay loading').html(loadingdot);

    var cartListUpdate = cartList.find((elem, index) => {
        return elem.id === productid;
    });
    if (cartListUpdate != null) cartListUpdate.quantity += parseInt(quantity);
    else {
        var cartItem = { id: productid, quantity: parseInt(quantity), type: producttype, displayorder: cartList.length + 1 };
        cartList.push(cartItem);
    }
    window.localStorage.setItem('cartlist', JSON.stringify(cartList));
    if (url != null) {
        window.location.href = url;
    }
    else {
        updateCart();
        setTimeout(function () {
            $this.html(loadingtext).css('pointer-events', 'none').removeClass('load-more-overlay loading');
            showCartInfo();
        }, 1000);
        setTimeout(function () {
            $this.html(oldtext).css('pointer-events', 'auto');
        }, 2000);
    }
}
function addToCartList(obj, listid, url) {
    var cartList = new Array();
    if (window.localStorage.getItem("cartlist") != null) cartList = JSON.parse(window.localStorage.getItem("cartlist"));
    var $this = $(obj),
        oldtext = $this.data('current-text'),
        loadingtext = $this.data('loading-text'),
        loadingdot = $this.data('loading-dot'),
        listProduct = JSON.parse($(listid).val());
    $this.addClass('load-more-overlay loading').html(loadingdot);
    listProduct.forEach(function (elem) {
        var cartListUpdate = cartList.find((item, index) => {
            return item.id === elem.ProductId;
        });
        if (cartListUpdate != null) cartListUpdate.quantity += parseInt(elem.Quantity);
        else {
            var cartItem = { id: elem.ProductId, quantity: parseInt(elem.Quantity), type: elem.Type, displayorder: cartList.length + 1 };
            cartList.push(cartItem);
        }
    });
    window.localStorage.setItem('cartlist', JSON.stringify(cartList));
    if (url != null) {
        window.location.href = url;
    }
    else {
        updateCart();
        setTimeout(function () {
            $this.html(loadingtext).css('pointer-events', 'none').removeClass('load-more-overlay loading');
        }, 1000);
        setTimeout(function () {
            $this.html(oldtext).css('pointer-events', 'auto');
        }, 2000);
    }
    //$.ajax({
    //    url: '/aj/order/addtocartlist',
    //    type: 'POST',
    //    data: { listproductId: listproduct},
    //    beforeSend: function () {
    //        $this.addClass('load-more-overlay loading').text('...');
    //    },
    //    success: function (result) {
    //        Ecsgroup.initProductSinglePage.rsRecommend();
    //        if (!result.Ok) {
    //            $this.html(oldtext).removeClass('load-more-overlay loading');
    //            $('#error-modal p').text(result.Msg);
    //            Ecsgroup.popup({
    //                items: {
    //                    src: '#error-modal'
    //                },
    //            }, 'error');
    //        }
    //        else {
    //            $this.text(loadingtext).removeClass('load-more-overlay loading');
    //            $('.cart-count-txt').text(result.Data.TotalCount);
    //            $('.cart-money').text(result.Data.TotalAmount);
    //            Ecsgroup.showHide(null, '.cart-info', 'show');
    //            setTimeout(function () {
    //                $this.html(oldtext);
    //            }, 3000);
    //            if (url != null) {
    //                window.location.href = url;
    //            }
    //        }
    //    },
    //    error: function (result) {
    //        $this.html(oldtext).removeClass('load-more-overlay loading');
    //        Ecsgroup.initProductSinglePage.rsRecommend();
    //        $('#error-modal p').text(result.msg);
    //        Ecsgroup.popup({
    //            items: {
    //                src: '#error-modal'
    //            },
    //        }, 'error');
    //    }
    //});
}
function updateCart() {
    var cartList = new Array();
    if (window.localStorage.getItem("cartlist") != null) cartList = JSON.parse(window.localStorage.getItem("cartlist"));
    $('.cart-count-txt').text(cartList.length);
    //$('.cart-money').text(result.Data.TotalAmount);
}
function showCartInfo() {
    var cartInfo = '<div class="cart-info show"><p class="ishow"><i class="demo-icon cus-attention-circled"></i> Th??m v??o gi??? h??ng th??nh c??ng</p><a class="ishow btn" href="/gio-hang" title= "Th??m v??o gi??? h??ng th??nh c??ng">Xem gi??? h??ng v?? thanh to??n</a><a class="close ecs-icon-times-solid cart-info-close" href="javascript:"></a></div>';
    $('.js-cart-info').html(cartInfo);
    $('body').append('<div class="cart-info-backdrop cart-info-close show"></div>');
    Ecsgroup.$body.on('click', '.cart-info-close', function (e) {
        $('.cart-info-backdrop').remove();
        $('.cart-info').remove();
    });
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
    initHeart('body');
    initCompare('body');
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
    $(htmlresult + ' .product-countdown').countdown('destroy');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
            else {
                $(htmlresult).html(result.Data.viewsrc).find('.product-url').attr('href', urlprodut);
                setTimeout(function () {
                    Ecsgroup.productSingle(htmlresult);
                    Ecsgroup.countDown(htmlresult + ' .product-countdown');
                    $(htmlresult + ' .btn-wishlist').removeClass('disabled');
                    $(htmlresult + ' .btn-compare').removeClass('disabled');
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
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
    $('#product-info .product-countdown').countdown('destroy');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
            else {
                $('#product-info').html(result.Data.viewsrc).css('height', 'auto');
                $('.url-ajax').each(function () {
                    if ($(this).data('url')) $(this).attr('href', $(this).data('url') + window.location.href);
                    else $(this).attr('href', window.location.href);
                })
                window.history.pushState({ state: urlbuilder, rand: Math.random() }, document.title, urlbuilder);
                setTimeout(function () {
                    Ecsgroup.countDown('#product-info .product-countdown');
                    $('#product-info .btn-wishlist').removeClass('disabled');
                    $('#product-info .btn-compare').removeClass('disabled');
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
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
                $('#error-modal p').text(result.msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
                                    Ecsgroup.countDown(htmlresult + ' .product-countdown');
                                    $this.removeClass('load-more-overlay loading');
                                    $(htmlresult + ' .btn-wishlist').removeClass('disabled');
                                    $(htmlresult + ' .btn-compare').removeClass('disabled');
                                    if (iswishlist > 0) $(htmlresult + ' .btn-wishlist').removeClass('ecs-icon-heart').addClass('added ecs-icon-heart-full').attr('href', Ecsgroup.linkWishList);
                                    if (iscomparelist > 0) $(htmlresult + ' .btn-compare').removeClass('ecs-icon-compare').addClass('added ecs-icon-check-solid').attr('href', Ecsgroup.linkCompare);
                                    $(htmlresult).removeClass('shimmer-container');
                                }, 500);
                            },
                            closing: () => {
                                $(htmlresult + ' .product-countdown').countdown('destroy');
                            }
                        },
                    }, 'quickview');
            }
        },
        error: function (result) {
            $('#error-modal p').text(result.Msg);
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
        }
    });
}
// Filter news
function refreshFilterNews() {
    var form = $('#filterform');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
            }
        });
    }
}
// Filter product
function refreshFilterProduct() {
    var form = $('#filterform');
    //L???y thu???c t??nh th??? v??o hidden field
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

    //L???y th????ng hi???u th??? v??o hidden field
    var bp = [];
    $('#filter input[name="brand"]:checked').each(function () {
        bp.push($(this).val());
    });

    form.find('input[name="bp"]').val('');
    if (bp.length > 0) {
        form.find('input[name="bp"]').val(bp.join(','));
    }

    //L???y gi?? th??? v??o hidden field
    var pr = [];
    $('#filter input[name="price"]:checked').each(function () {
        pr.push($(this).val());
    });

    form.find('input[name="pr"]').val('');
    if (pr.length > 0) {
        form.find('input[name="pr"]').val(pr.join(','));
    }

    //L???y c??ch s???p x???p th??? v??o hidden field
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
    $('#list-filter .product-countdown').countdown('destroy');
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
                    Ecsgroup.countDown('#list-filter .product-countdown');
                    initHeart('#list-filter');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
                    Ecsgroup.countDown('#list-filter .product-countdown');
                    initHeart('#list-filter');
                    initCompare('#list-filter');
                }, 1000);
                $('.totalitem').text(totalitem);
                Ecsgroup.hideLoading();
                updateState(paramlist);
            },
            error: function (result) {
                $('#list-filter').removeClass('shimmer-container');
                Ecsgroup.hideLoading();
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
        $('#error-modal p').text('V??? tr?? ?????a l?? kh??ng ???????c tr??nh duy???t n??y h??? tr???');
        Ecsgroup.popup(
            [{
                src: '#error-modal',
                type: "inline"
            }],
            {}, 'error');
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
            Ecsgroup.popup(
                [{
                    src: '#error-modal',
                    type: "inline"
                }],
                {}, 'error');
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
    var form = $('#filterform'),
        formstore = $('#search-store-from');
        form.find('input[name="sort"]').val($('#sortdropdown').val());

    //L???y province v??o hidden field
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
    //L???y district v??o hidden field
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
                $('#error-modal p').text(result.Msg);
                Ecsgroup.popup(
                    [{
                        src: '#error-modal',
                        type: "inline"
                    }],
                    {}, 'error');
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
    $(htmlresult + ' .product-countdown').countdown('destroy');
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
                        $('#error-modal p').text(result.Msg);
                        Ecsgroup.popup(
                            [{
                                src: '#error-modal',
                                type: "inline"
                            }],
                            {}, 'error');
                    }
                    else {
                        $this.removeClass('load-more-overlay loading');
                        $(htmlresult).html(result.Data.viewsrc).removeClass('shimmer-container');
                        $(htmlresult + ' .lazyload-bg').each(function () {
                            $(this).css('background-image', 'url(' + $(this).data("bg") + ')').removeClass('lazyload-bg').addClass('ls-is-cached lazyloaded');
                        })
                        setTimeout(function () {
                            Ecsgroup.countDown(htmlresult + ' .product-countdown');
                            initHeart(htmlresult);
                            initCompare(htmlresult);
                        }, 1000);
                        //Ecsgroup.shop.init();
                    }
                },
                error: function (result) {
                    $this.removeClass('load-more-overlay loading');
                    $(htmlresult).removeClass('shimmer-container');
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
                }
            });
            break;
        default:
            break;
    }
}
// Contact
$.extend($.validator.messages, {
    required: "Vui l??ng ??i???n ?????y ????? th??ng tin ??? tr?????ng ",
    remote: "Vui l??ng s???a ph???m vi n??y.",
    email: "Vui l??ng nh???p m???t ?????a ch??? email h???p l??? ??? tr?????ng ",
    url: "Vui l??ng nh???p m???t URL h???p l???.",
    date: "Vui l??ng nh???p m???t ng??y h???p l???.",
    dateISO: "Vui l??ng nh???p ng??y h???p l??? (ISO).",
    number: "Vui l??ng nh???p m???t s??? h???p l???.",
    digits: "Vui l??ng ch??? nh???p c??c ch??? s???.",
    creditcard: "Vui l??ng nh???p s??? th??? t??n d???ng h???p l???.",
    equalTo: "Vui l??ng nh???p l???i c??ng m???t gi?? tr???.",
    accept: "Vui l??ng nh???p gi?? tr??? c?? ph???n m??? r???ng h???p l???.",
    maxlength: $.validator.format("Vui l??ng nh???p kh??ng qu?? {0} k?? t??? ??? tr?????ng "),
    minlength: $.validator.format("Vui l??ng nh???p ??t nh???t {0} k?? t??? ??? tr?????ng "),
    rangelength: $.validator.format("Vui l??ng nh???p m???t gi?? tr??? c?? ????? d??i t??? {0} ?????n {1} k?? t??? ??? tr?????ng "),
    range: $.validator.format("Vui l??ng nh???p gi?? tr??? t??? {0} ?????n {1} ??? tr?????ng "),
    max: $.validator.format("Vui l??ng nh???p gi?? tr??? nh??? h??n ho???c b???ng {0} ??? tr?????ng "),
    min: $.validator.format("Vui l??ng nh???p gi?? tr??? l???n h??n ho???c b???ng {0} ??? tr?????ng ")
});
function validateForm(btn, idform) {
    var submitted = true,
        formError = $(idform).find('.error-lst');
    var form = $(idform).validate({
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function (error, element) { return false; },
        showErrors: function (errorMap, errorList) {
            if (submitted) {
                var summary = '<div>C?? ' + this.numberOfInvalids() + ' l???i, xem chi ti???t b??n d?????i.</div>';
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
                    if (type === 7 || type === 8) {
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
                        sendMail(result.Data.id, '/aj/staticpage/SendEmail');
                        formError.hide();
                        $('#success-modal p').text(note);
                        Ecsgroup.popup(
                            [{
                                src: '#success-modal',
                                type: "inline"
                            }],
                            {}, 'error');
                        $(idform).trigger('reset');
                        if (typeof fileCurrent !== 'undefined') {
                            fileCurrent._removeChips()
                        }
                    }
                    return false;
                },
                error: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
                    return false;
                }
            });
        }
    });
}
function validateFormMini(btn, idform) {
    var form = $(idform).validate({
        focusInvalid: true,
        rules: {
            email: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "Vui l??ng ??i???n ?????y ????? th??ng tin ??? tr?????ng email.",
            }
        },
        submitHandler: function (form) {
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
                /*data: { modal: modal, extentionfield: null },*/
                data: $(idform).serialize() + '&extentionfield=' ,
                beforeSend: function () {
                    $(btn).addClass('load-more-overlay loading');
                },
                success: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    if (!result.Ok) {
                        $('#error-modal p').text(result.Msg);
                        Ecsgroup.popup(
                            [{
                                src: '#error-modal',
                                type: "inline"
                            }],
                            {}, 'error');
                    }
                    else {
                        sendMail(result.Data.id, '/aj/staticpage/SendEmail');
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
                        Fancybox.getInstance().close();
                    }
                    return false;
                },
                error: function (result) {
                    $(btn).removeClass('load-more-overlay loading');
                    $('#error-modal p').text(result.Msg);
                    Ecsgroup.popup(
                        [{
                            src: '#error-modal',
                            type: "inline"
                        }],
                        {}, 'error');
                    return false;
                }
            });
        }
    });
}
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
