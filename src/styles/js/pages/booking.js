(function ($) {
    Ecsgroup.initPage = function () {
        // Page
            Ecsgroup.initQtyInput('.quantity');
            $('input[name="dates"]').daterangepicker();
        // Default
    };
  })(jQuery);
  