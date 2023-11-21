/**
 * Ecsgroup Dependent Plugin - Shop
 * 
 * @requires
 */
 (function ($) {
    // Private Properties

        // var initProductCartAction = function () {
        //     var selector = '.product:not(.product-select) .btn-cart, .product-popup .btn-cart, .home .product-single .btn-cart';

        //     Ecsgroup.$body.on('click', selector, function (e) {
        //         e.preventDefault();
        //         var $this =$(this),
        //             $product = $this.closest('.product, .product-popup');

        //         if ($this.hasClass('disabled')) {
        //             alert('Please select some product options before adding this product to your cart.');
        //             return;
        //         }

        //         $this.toggleClass('added').addClass('load-more-overlay loading');

        //         setTimeout(function () {
        //             $this.removeClass('load-more-overlay loading');
        //             Ecsgroup.showHide(null, '.cart-info', 'show');
        //             // Ecsgroup.Minipopup.open({
        //             //     productClass: ' product-cart',
        //             //     name: $product.find('.product-name, .product-title').text(),
        //             //     nameLink: $product.find('.product-name > a, .product-title > a').attr('href'),
        //             //     imageSrc: $product.find('.product-media img, .product-image img').attr('src'),
        //             //     imageLink: $product.find('.product-name > a, .product-title > a').attr('href'),
        //             //     message: '<p><i class="demo-icon cus-ok-circled"></i>Đã thêm vào giỏ hàng thành công!</p>',
        //             //     actionTemplate: '<a href="checkout.html" class="btn btn-rounded btn-sm btn-view-cart">Xem giỏ hang và thanh toán</a>'
        //             // });
        //         }, 500);
        //     });
        // }
         var initWishlistAction = function () {
             Ecsgroup.wishlistAction(updateWishLst);
         }
        var initCompare = function () {
            var compareList = new Array();
            if (window.localStorage.getItem("comparelist") != null) compareList = JSON.parse(window.localStorage.getItem("comparelist"));

            var $compare =$('.page-wrapper > .compare-popup'),
                productCount, addToProduct, removeProduct, removeAllProduct;
            function initComparePopup() {
                var compareHtml =
                    '<div class="compare-popup">\
                            <div class="container">\
                                <div class="compare-title">\
                                    <h4 class="title title-center">'+core4+'</h4>\
                                </div>\
                                <ul class="compare-product-list list-style-none">\
                                    <li></li><li></li><li></li><li></li>\
                                </ul>\
                                <a href="javascript:" class="btn btn-clean">'+core5+'</a>\
                                <a href="'+ Ecsgroup.options.links.linkCompare +'" class="btn btn-dark btn-rounded">'+core6+'</a>\
                            </div>\
                      </div>\
                      <div class="compare-popup-overlay"></div>';
        
                if (!$compare.length && !document.body.classList.contains('docs')) {
                $('.page-wrapper').append(compareHtml);
                    $compare =$('.page-wrapper > .compare-popup');
                }
            }
        
            function addToCompare(e) {
        
                var $this = $(this);
                addToProduct = false;
        
                if ($this.hasClass('added')) {
                    return;
                }
                e.preventDefault();
                $this.toggleClass('added').addClass('load-more-overlay loading');
        
                setTimeout(function () {
                    $this.removeClass('load-more-overlay loading');
                    //$this.toggleClass('ecs-icon-compare').toggleClass('ecs-icon-check-solid');
                    //$this.attr('href', Ecsgroup.options.links.linkCompare);
                    $compare.addClass('show');
                }, 500);
                var src = $this.closest('.product').find('img').eq(0).attr('src'),
                    productid = $this.data('id');
                var updatedcompare = compareList.find((elem, index) => {
                    return elem.id === productid;
                });
                if (updatedcompare != null) updatedcompare.image = src;
                else {
                    var productItem = {
                        id: productid,
                        image: src
                    }
                    if (compareList.length >= 4) {
                        compareList.shift();
                    }
                    compareList.push(productItem);
                }
                Ecsgroup.setCookie('EcsCompareList', JSON.stringify(compareList), 7);
                window.localStorage.setItem('comparelist', JSON.stringify(compareList));
                compareList.forEach(function (item) {
                    $('body .btn-compare[data-id="' + item.id + '"]')
                        .removeClass('ecs-icon-compare')
                        .addClass('added ecs-icon-check-solid')
                        .attr('href', Ecsgroup.options.links.linkCompare);
                });
            
            $('.compare-popup li').each(function (i) {
                    if (compareList[i]) {
                        this.innerHTML =
                            '<a href="product-default.html">\
                                <figure><img src="' + compareList[i].image + '"/></figure>\
                             </a>\
                             <a href="#" class="btn btn-remove"><i class="ecs-icon-times-solid"></i></a>';
                    }
                });
        
                productCount = compareList.length;
                compareCount();
        
            }
        
            function removeCompare(e) {
                e.preventDefault();
                var $li = $(e.currentTarget).closest('li'),
                    $index = $li.index();
                    //srcCompare = $li.find('img').attr('src');
        
                //if (srcCompare) {
                //$('.page-wrapper .product img').each(function () {
                //        var srcProduct = this.getAttribute('src');
                //        if (srcProduct == srcCompare) {
        
                //            var $compareButton =$(this).closest('.product').find('.btn-compare');
                //            if ($compareButton.length) {
                //                $compareButton.removeClass('added').attr('href', '#');
                //                $compareButton.toggleClass('ecs-icon-check-solid').toggleClass('ecs-icon-compare');
                //            }
                //        }
                //    })
                //}
                var compareId = compareList[$index].id;
                compareList.splice($index, 1);
        
                if ($index == 3) {
                    $li.empty();
                }
        
                $li.nextAll().each(function () {
                $(this).prev().html($(this).html());
                }).last().empty();
        
                productCount = compareList.length;
                compareCount();
                Ecsgroup.setCookie('EcsCompareList', JSON.stringify(compareList), 7);
                window.localStorage.setItem('comparelist', JSON.stringify(compareList));
                if (productCount == 0) $compare.removeClass('show');
                $('body .btn-compare[data-id="' + compareId + '"]')
                    .removeClass('added ecs-icon-check-solid')
                    .addClass('ecs-icon-compare')
                    .attr('href', 'javascript:');
            }
        
            function removeAllCompare(e) {
                e.preventDefault();
                removeAllProduct = false;
        
                $('.page-wrapper .product img').each(function () {
                    var $this =$(this);
                    var srcProduct = this.getAttribute('src');
                    compareList.forEach(function (srcCompare) {
                        if (srcProduct == srcCompare) {
                            var $compareButton = $this.closest('.product').find('.btn-compare');
                            if ($compareButton.length) {
                                $compareButton.removeClass('added').attr('href', '#');
                                $compareButton.toggleClass('ecs-icon-check-solid').toggleClass('ecs-icon-compare');
                            }
                        }
                    });
                })
                compareList.splice(0, 4);
                productCount = compareList.length;
                $(this).parent().find('.compare-product-list li').empty();
                compareCount();
                Ecsgroup.removeCookie('EcsCompareList');
                Ecsgroup.localStorage.remove('comparelist');
                $compare.removeClass('show');
                $('body .btn-compare')
                    .removeClass('added ecs-icon-check-solid')
                    .addClass('ecs-icon-compare')
                    .attr('href', 'javascript:');
            }
        
            function compareCount() {
                $compare.find('.title').after('<p class="compare-count text-center text-light mb-0">(' + productCount + core9 +')</p>');
                if ($compare.find('.compare-count').length > 1) {
                    $compare.find('p:last-child').remove();
                }
            }
        
            initComparePopup();
        
            Ecsgroup.$body
                .on('click', '.product .btn-compare', addToCompare)
                .on('click', '.compare-popup .btn-remove', removeCompare)
                .on('click', '.compare-popup .btn-clean', removeAllCompare)
        
            Ecsgroup.$body.on('click', '.compare-popup-overlay', function () {
                $compare.removeClass('show');
            });
        
        }  
        var initProductQuickview = function () {
            Ecsgroup.$body.on('click', '.btn-quickview', function (e) {
                e.preventDefault();
                Ecsgroup.popupPause = true;
                $(e.currentTarget).addClass('load-more-overlay loading');
                openProductPopup(e.currentTarget);
            });
        }
    // Public Properties
        var Shop = {
            init: function () {
                //  Ecsgroup.call(Ecsgroup.ratingTooltip, 500);
                /*Ecsgroup.call(Ecsgroup.setProgressBar('.progress-bar'), 500);*/
                //this.initProductType('slideup');
                this.initVariation();

                // Functions for shop page
                //initProductCartAction();
                if (Ecsgroup.options.func.isWishList) initWishlistAction();
                initProductQuickview();
                if (Ecsgroup.options.func.isCompare) initCompare();

            },
            //initProductType: function (type) {

            //    // "slideup"
            //    if (type == 'slideup') {
            //        //$('.product-slideup-content .product-details').each(function (e) {
            //        //     var $this =$(this),
            //        //         elem = $this.find('.product-hidden-details'),
            //        //         hidden_height = $this.find('.product-hidden-details').outerHeight(true);

            //        //     $this.height($this.height() - hidden_height);
            //        // });

            //        //$(Ecsgroup.byClass('product-slideup-content'))
            //        // .on('mouseenter touchstart', function (e) {
            //        //     console.log("Mouse enter");
            //        //     var $this =$(this),
            //        //         hidden_height = $this.find('.product-hidden-details').outerHeight(true);

            //        //     $this.find('.product-details').css('transform', 'translateY(' + (-hidden_height) + 'px)');
            //        //     $this.find('.product-hidden-details').css('transform', 'translateY(' + (-hidden_height) + 'px)');
            //        // }) 
            //        // .on('mouseleave touchleave', function (e) {
            //        //     var $this =$(this);
            //        //     console.log("Mouse leave");
            //        //         // hidden_height = $this.find('.product-hidden-details').outerHeight(true);

            //        //     $this.find('.product-details').css('transform', 'translateY(0)');
            //        //     $this.find('.product-hidden-details').css('transform', 'translateY(0)');
            //        // });
            //    }
            //},
            initVariation: function (type) {
                Ecsgroup.$body.on('click', '.product:not(.product-single) .product-variations > a:not(.disabled)', function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        quantity = $this.data('quantity'),
                        productId = $this.data('id'),
                        productListImg = $this.data('src'),
                        productPromo = $this.data('promo'),
                        product = $this.closest('.product'),
                        productCountDown = product.find('.product-countdown'),
                        image = product.find('.product-media .img'),
                        btnCart = product.find('.btn-cart'),
                        btnCall = product.find('.btn-call');
                    btnCart.data('id', productId);
                    if (Ecsgroup.options.func.isCountDown) productCountDown.countdown('destroy');
                    if (productPromo != null) {
                        product.find('.product-countdown-container').removeClass('d-none');
                        productCountDown.data('until', productPromo);
                        if (Ecsgroup.options.func.isCountDown) Ecsgroup.countDown(productCountDown);
                    }
                    else product.find('.product-countdown-container').addClass('d-none');

                    //if (!$image.data('image-src'))
                    //    $image.data('image-src', $image.attr('src'));

                    $this.addClass('active').siblings().removeClass('active');
                    if ($this.hasClass('active')) {
                        var htmlImg = '';
                        productListImg.forEach(function(ele){
                            htmlImg += '<picture><img src="'+ele+'" loading="lazy"></picture>';
                        });
                        image.css('filter','blur(5px)').html(htmlImg);
                        setTimeout(function() {
                            image.css('filter','blur(0px)');
                        }, 1000);
                        selectThumbSku(product,$this.data('id'), $this.data('url'));
                    }
                    productQuantity.text(quantity);
                    if (quantity > 0 && quantity <= 11) {
                        btnCall.addClass('d-invisible');
                        btnCart.removeClass('d-invisible');
                        productStatus.removeClass('d-invisible');
                    }
                    if (quantity <= 0) {
                        btnCart.addClass('d-invisible');
                        btnCall.removeClass('d-invisible');
                        productStatus.addClass('d-invisible');
                    }
                    //else {
                    //    $image.attr('src', $image.data('image-src'));
                    //    $this.blur();
                    //}
                });
            }
        }
    Ecsgroup.shop = Shop;
})(jQuery);