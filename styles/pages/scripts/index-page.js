(function ($) {
  Ecsgroup.initLayout = function () {
    // Page
      Ecsgroup.isotopes('.grid:not(.grid-float)');
  };
  Ecsgroup.initPage = function () {
    // Page
      Ecsgroup.initNavFilter('.nav-filters .nav-filter')               // Initialize Isotope Navigation Filters
      Ecsgroup.initFloatingParallax('.floating-item');                 // Initialize Floating Parallax
    // Product
      Ecsgroup.productSingle('.product-single');                       // Initialize all single products
      Ecsgroup.initQtyInput('.quantity');                              // Initialize Quantity Input
      Ecsgroup.countDown('.countdown,.product-countdown');                        // Initialize CountDown
      Ecsgroup.shop.init();
    // Menu landing
      // Ecsgroup.pageScrollToId("a[rel='m_PageScroll2id']")
    // Default
      Ecsgroup.slider('.swiper-container');                            // Initialize Slider
      Ecsgroup.call(Ecsgroup.slider.pgToggle);
      Ecsgroup.$window.on('resize', function () {
        Ecsgroup.call(Ecsgroup.slider.pgToggle);
      });
  };
})(jQuery);