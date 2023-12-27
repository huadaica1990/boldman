(function ($) {
    Ecsgroup.initLayout = function () {
        // do something later...
        // Side bar
        Ecsgroup.mq(Ecsgroup.stickySidebar('.sticky-sidebar'), 992);
    };
    Ecsgroup.initPage = function () {
      // Page
        Ecsgroup.copyUrl('.copy-button');
        Ecsgroup.backToUrl('.btn-back-url');
        //function processBar () {
        //  let dotCurent = document.querySelector('.dot-curent').style.width;
        //  if(parseInt(dotCurent) >= 100) {
        //    $('.dot-check').addClass('active');
        //    $('.dot-curent').closest('.process').addClass('active');
        //  }
        //  else {
        //    $('.dot-check').each(function() {
        //      let dataWidth = $(this).data('width');
        //      if(parseInt(dotCurent) >= dataWidth) $(this).addClass('active');
        //    });

        //  }
        //}
        //if(document.querySelector('.dot-curent') != null) processBar();
        $('input[type=radio][name=paymentopt]').change(function() {
          if (this.value == 1) {
            $('#paymentopt2-des').addClass('ishow');
          }
          else $('#paymentopt2-des').removeClass('ishow');
        });
      // Default
    };
})(jQuery);

function checkboxes(source, groupname) {
    var boxes = document.getElementsByName(groupname);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = source.checked;
    }
    $('.cart-current-count').text($('[name="' + groupname+'"]:checked').length);
};
Number.prototype.formatMoney = function (c, d, t, f) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 0 : c,
        d = d == undefined ? "," : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        f = f == undefined ? "₫" : f,
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + f;
};
Number.prototype.formatMoneyUSD = function () {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(this);
};