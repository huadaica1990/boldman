/**
 * Wishlist Action
 * 
 * @requires On click btn wishlist
 * @param {Fucntion} func
 * @param event
 */
Ecsgroup.wishlistAction = function (func) {
    Ecsgroup.$body.on('click', '.btn-wishlist', function (event) {
        //event.preventDefault();
        var $this = $(this),
            id = $this.data("id");
        if ($this.hasClass('added')) {
            return;
        }
        func($this, id);
    });
};