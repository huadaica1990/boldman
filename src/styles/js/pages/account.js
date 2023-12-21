(function ($) {
  Ecsgroup.initLayout = function () {
      // do something later...
      // Side bar
        Ecsgroup.stickySidebar('.sticky-sidebar');
        function openUpdate(target) {
          $(target).toggleClass('active');
          $(target).find('input')[0].focus();
        }
  };
  Ecsgroup.initPage = function () {
    // Side bar
        Ecsgroup.sidebar('left-sidebar');
    // Page
      Ecsgroup.showPassword('.btn-showpass');
      Ecsgroup.initScrollLoad('#list-filter-loadmore', loadmoreSrcoll);
  };
})(jQuery);
Ecsgroup.$body.on('click', '.btn-update', function () {
    let btn = $(this),
        beforetext = btn.data('before'),
        aftertext = btn.data('after'),
        target = $(this).data('id'),
        input = $(this).data('input');
    $('.col-update').removeClass('active');
    if (btn.hasClass('active')) {
        btn.removeClass('active');
        btn.text(beforetext);
        $('#' + target).find('input').prop('disabled', true);
    }
    else {
        btn.addClass('active');
        btn.text(aftertext);
        $('#' + target).addClass('active');
        $('#' + target).find('input').removeAttr('disabled');
        getSearchFocus(input);
    }
})
let offsetAcc = $("#acc-order-scroll").find(".active").offset();
if (offsetAcc != null)  $('#acc-order-scroll').scrollLeft(offsetAcc.left - 20);

Ecsgroup.$body.on('click', '.btn-remove-wishlist', function () {
    var productId = $(this).data('id');
    Ecsgroup.confirmDialog('Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích của mình?', RemoveWishItem, productId);
})
function RemoveWishItem(productId) {
    $.ajax({
        url: '/aj/Account/RemoveWishItem',
        type: 'POST',
        data: { id: productId },
        beforeSend: function () { Ecsgroup.showLoading(); },
        success: function (result) {
            Ecsgroup.hideLoading();
            if (!result.Ok) {
                Ecsgroup.resultDialog('error', result.msg);
            }
            else {
                Ecsgroup.miniPopup.core.open({
                    productClass: ' success minipopup-center',
                    message: '<p><i class="demo-icon cus-ok-circled"></i>' + result.Msg + '</p>',
                    template:
                        '<div class="minipopup-box {{productClass}}">' +
                        '<div class="minipopup-body">' +
                        '<div class="minipopup-content">{{message}}</div>' +
                        '</div>' +
                        '</div>',
                });
                window.localStorage.setItem('wishlist', JSON.stringify(result.Data));
                location.reload()
            }
        },
        error: function (result) {
            Ecsgroup.hideLoading();
            Ecsgroup.resultDialog('error', result.msg);
        }
    });
}