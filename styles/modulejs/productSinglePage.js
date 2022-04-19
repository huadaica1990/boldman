/**
 * Ecsgroup Plugin - Product Single Page
 * 
 * @requires Slider
 * @requires ProductSingle
 * @requires PhotoSwipe
 * @instance single
 */
(function ($) {
    // Open Image Gallery
    function openImageGallery(e) {
        e.preventDefault();
        if (typeof Fancybox !== 'undefined') {
            var $this = $(e.currentTarget),
                $product = $this.closest('.product-single'),
                $review = $this.closest('.review-image-wrap'),
                $images, images;
            if ($this.closest('.review-image-wrap').length) {
                $images = $this.closest('.review-image-wrap').find('img');
            } else if ($product.find('.product-single-swiper').length) { // single carousel
                $images = $product.find('.product-single-swiper .swiper-slide:not(.cloned) picture img:not(.zoomImg)');
            } else if ($product.find('.product-gallery-carousel').length) { // gallery carousel
                $images = $product.find('.product-gallery-carousel .swiper-slide:not(.cloned) picture img');
            } else { // simple gallery
                $images = $product.find('.product-image picture img');
            }
            if ($images.length) {
                images = $images.map(function () {
                    var $this = $(this);
                    return {
                        src: $this.attr('data-zoom-image'),
                        type: "image",
                        caption: $this.attr('alt')
                    };
                }).get();
                var swiper = $product.find('.product-single-swiper').data('slider'),
                    curIndex = swiper ?
                        // Carousel Type
                        swiper.activeIndex :
                        // Gallery Type
                        $product.find('.product-gallery .product-gallery-btn').index($this);
                if ($review.length == 1) {
                    var reviewIndex = $review.find('img').index($this);
                    curIndex = reviewIndex;
                }
                var fancyBox = new Fancybox(images, {
                    infinite: false,
                });
                //if (typeof Fancybox !== 'undefined') {
                //    // var pswpElement = $('.pswp')[0];
                //    var fancyBox = new Fancybox(images, {
                //        infinite: false,
                //    });
                //    //Ecsgroup.fancyBox = fancyBox;
                //}
            }
        }
    }

    // Open Video
    function openVideo(e) {
        e.preventDefault();
        if (typeof Fancybox !== 'undefined') {
            var $this = $(e.currentTarget),
                $product = $this.closest('.product-single'),
                $videowrap = $product.find('.video-gallery'),
                $videos, videos = new Array();
            console.log($videowrap.val());
            $videos = JSON.parse($videowrap.val());
            if ($videos.length) {
                $videos.map(function (ele) {
                    /*var $this = $(this);*/
                    var item = { src: 'https://www.youtube.com/watch?v=' + ele, type: 'video' };
                    videos.push(item);
                });
                var fancyBox = new Fancybox(videos, {
                    infinite: false,
                });
            };

        }
        //Ecsgroup.popup({
        //    items: {
        //        src: $(this).data('src'),
        //        type: 'iframe',
        //    },
        //    mainClass: "mfp-video-popup"
        //}, "video")
    }

    // Open 360 Degree
    function open360DegreeView(e) {
        e.preventDefault();
        Ecsgroup.popup({
            type: 'inline',
            mainClass: "product-popupbox wm-fade product-360-popup",
            preloader: false,
            items: {
                src: '<div class="product-gallery-degree">\
                        <div class="w-loading"><i></i></div>\
                        <ul class="product-degree-images"></ul>\
                    </div>'
            },
            callbacks: {
                open: function () {
                    this.container.find('.product-gallery-degree').ThreeSixty({
                        imagePath: 'assets/images/products/video/',
                        filePrefix: '360-',
                        ext: '.jpg',
                        totalFrames: 18,
                        endFrame: 18,
                        currentFrame: 1,
                        imgList: this.container.find('.product-degree-images'),
                        progress: '.w-loading',
                        height: 500,
                        width: 830,
                        navigation: true
                    });
                },
                beforeClose: function () {
                    this.container.empty();
                }
            }
        });
    }

    // Add recommend product

    /**
     * Event handler when rating control is clicked in single product page's review form.
     * 
     * @since 1.0
     * @param {object} e
     * @return {void}
     */
    function clickRatingForm(e) {
        var $star = $(this);
        $star.closest('.rating-form').find('input[name=Rating]').val($star.data("val"));
        $star.addClass('active').siblings().removeClass('active');
        $star.parent().addClass('selected');
        $star.closest('.rating-form').find('select').val($star.text());
        e.preventDefault();
    }

    function stickyProduct(selector) {

        var $this = $(selector),
            $product = $this.closest('#productdetail'),
            src = $product.find('.product-gallery img').eq(0).attr('src'),
            name = $product.find('.product-details .product-title').text(),
            newPrice = $product.find('.new-price').text(),
            oldPrice = $product.find('.old-price').text(),
            sale = $product.find('.label-discount').text(),
            stickyProductDetailsHtml = '<div class="product product-list-sm mr-auto">\
                                            <figure class="product-media">\
                                            <img src="'+ src + '" alt="Product" width="85" height="85" />\
                                            </figure>\
                                            <div class="product-details pt-0 pl-2 pr-2">\
                                            <h4 class="product-name font-weight-normal mb-1">'+ name + '</h4>\
                                            <div class="product-price mb-0">\
                                            <ins class="new-price">'+ newPrice + '</ins><del class="old-price">' + oldPrice + '</del><div class="product-label label-discount">'+sale+'</div></div>\
                                            </div></div>';
        if (sale != null) {
            stickyProductDetailsHtml = '<div class="product product-list-sm mr-auto">\
                                            <figure class="product-media">\
                                            <img src="'+ src + '" alt="Product" width="85" height="85" />\
                                            </figure>\
                                            <div class="product-details pt-0 pl-2 pr-2">\
                                            <h4 class="product-name font-weight-normal mb-1">'+ name + '</h4>\
                                            <div class="product-price mb-0">\
                                            <ins class="new-price">'+ newPrice + '</ins></div>\
                                            </div></div>';
        }

        $this.find('.product-qty-form').before(stickyProductDetailsHtml);

        function refreshStickyProduct() {
            // if ($this.hasClass('fix-top') && window.innerWidth > 767) {
            //     $this.removeClass('fix-top').addClass('fix-bottom');
            // }

            // if ($this.hasClass('fix-bottom') && window.innerWidth > 767) {
            //     return;
            // }

            // if ($this.hasClass('fix-bottom') && window.innerWidth < 768) {
            //     $this.removeClass('fix-bottom').addClass('fix-top');
            // }

            // if ($this.hasClass('fix-top') && window.innerWidth < 768) {
            //     return;
            // }
        }

        window.addEventListener('resize', refreshStickyProduct, { passive: true });
        refreshStickyProduct();
    }

    var ProductSinglePage = {
        init: function () {
            this.initSinglePage();
            this.recommendItems();
        },
        initSinglePage: function () {
            // Zoom Image for grid type
            Ecsgroup.zoomImage('#productdetail .product-gallery .product-image');

            stickyProduct('.product-sticky-content');
            // Register events
            Ecsgroup.backToUrl('.btn-back-url');
            Ecsgroup.$body
                .on('click', '.product-image-full', openImageGallery)
                //.on('click', '.review-image img', openImageGallery)
                .on('click', '.product-video-viewer', openVideo)
                .on('click', '.product-degree-viewer', function (e) {
                    e.preventDefault(e);
                    if ($.fn.ThreeSixty) {
                        open360DegreeView(e);
                    }
                })
                .on('click', '.rating-form .rating-stars > a', clickRatingForm)
                .on('click', '.product-checkbox', ProductSinglePage.recommendItems);
        },
        recommendItems: function (e) {
            var listproduct = new Array(),
                totalprice = 0,
                saleprice = 0,
                number = 0;
            $('#recommend-product .product input[type="checkbox"]').each(function () {
                var $this = $(this);
                if ($this.prop('checked')) {
                    totalprice += $this.data('price');
                    if ($this.data('promprice') > $this.data('price')) {
                        saleprice += $this.data('promprice');
                    }
                    else {
                        saleprice += $this.data('price');
                    }
                    var cartItem = { ProductId: parseInt($this.val()), Quantity: parseInt(1) };
                    listproduct.push(cartItem);
                    number += 1;
                }
            })
            $(".recommend-newprice").text(totalprice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
            /*$(".recommend-oldprice").html(saleprice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));*/
            $(".recommend-saleprice").text((saleprice - totalprice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
            $(".recommend-number").text(number);
            $("#recommendproduct").val(JSON.stringify(listproduct));
        },
        rsRecommend: function () {
            $('#recommend-product .bought-together-center .product input[type="checkbox"]').each(function () {
                $(this).prop('checked', false);
            })
            this.recommendItems();
        }

    }

Ecsgroup.initProductSinglePage = ProductSinglePage;
})(jQuery);