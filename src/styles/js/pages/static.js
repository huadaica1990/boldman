(function ($) {
    Ecsgroup.initLayout = function () {};
    Ecsgroup.initPage = function () {
      // Page
        Ecsgroup.shareSocial.init();
        Ecsgroup.tableOfContent();
      // Default
        Ecsgroup.slider('.swiper-container');// Initialize Slider
        Ecsgroup.call(Ecsgroup.slider.pgToggle);
        Ecsgroup.$window.on('resize', function () {
          Ecsgroup.call(Ecsgroup.slider.pgToggle);
        });
    };
})(jQuery);
