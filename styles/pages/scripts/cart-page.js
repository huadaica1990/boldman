(function ($) {
    Ecsgroup.initLayout = function () {
        // do something later...
        // Side bar
        Ecsgroup.$window.on('resize', function () {
            Ecsgroup.mq(Ecsgroup.stickySidebar('.sticky-sidebar'), 992);
        });
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