/**
 * Wishlist Action
 * 
 * @requires On click btn wishlist
 * @param {Fucntion} func
 * @param event
 */
let wishlistActionOption = {
    classItem: '.btn-wishlist'
};
const wishlistActionEcs = {
    init: function(func) {
        let startPerformanceTime = performance.now();
        this.core.start(func);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.wishlistAction = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(func) {
            Ecsgroup.$body.on('click', wishlistActionOption.classItem, function (event) {
                event.preventDefault();
                let $this = $(this),
                    id = $this.data("id");
                if ($this.hasClass('added')) return;
                func($this, id);
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.wishlistAction = function (func) {
    return wishlistActionEcs.init(func);
};