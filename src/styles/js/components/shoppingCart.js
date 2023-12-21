var ShoppingCart = (function () {
    var cart = new Array();
    var obj = {};
    function Item(id, quantity, type, displayorder) {
        this.id = id;
        this.quantity = quantity;
        this.type = type;
        this.displayorder = displayorder;
        //this.name = name;
        //this.price = price;
        //this.count = count;
    }
    // Save cart
    function saveCart() {
        localStorage.setItem('cartlist', JSON.stringify(cart));
    }
    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('cartlist'));
        $('.cart-count-txt').text(cart.length != null ? cart.length : 0);
    }
    if (localStorage.getItem("cartlist") != null) {
        loadCart();
    }

    // Add to cart
    obj.addItemToCart = function (id, quantity, type) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].quantity++;
                saveCart();
                return;
            }
        }
        var displayorder = cart.length + 1;
        var item = new Item(id, quantity, type, displayorder);
        cart.push(item);
        saveCart();
        loadCart()
    }
    // Set count from item
    obj.setCountForItem = function (id, quantity) {
        for (var i in cart) {
            if (cart[i].id === id) {
                cart[i].quantity = quantity;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].quantity--;
                if (cart[item].quantity === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].quantity;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        //for (var item in cart) {
        //    totalCart += cart[item].price * cart[item].count;
        //}
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // Show cart
    obj.showCartInfo = function() {
        var cartInfo = '<div class="cart-info show"><p class="ishow"><i class="demo-icon cus-attention-circled"></i> ' + text5 + '</p><a class="ishow btn" href="' + Ecsgroup.options.links.cartLink + '" title= "' + text5 + '">' + text6 + '</a><a class="close ecs-icon-times-solid cart-info-close" href="javascript:"></a></div>';
        $('.js-cart-info').html(cartInfo);
        $('body').append('<div class="cart-info-backdrop cart-info-close show"></div>');
        if (document.documentElement.clientWidth > 1000) {
            $('html, body').animate({ scrollTop: 0 }, 600);
        }
        Ecsgroup.$body.on('click', '.cart-info-close', function (e) {
            $('.cart-info-backdrop').remove();
            $('.cart-info').remove();
        });
    }
    return obj;
})();
Ecsgroup.shoppingCart = ShoppingCart;