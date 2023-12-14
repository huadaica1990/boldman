/**
 * Ecsgroup Image Zoom Options
 */
/**
 * zoomImageOptions
 *
 * 
 * @requires zoom
 * @param {jQuery} selector
 */
let zoomImageOptions = {
    responsive: true,
    borderSize: 0,
    zoomType: 'inner',
    onZoomIn: true,
    magnify: 1.1,
};
const zoomImageEcs = {
    zoomImageObjects: [],
    init: function (selector) {
        if ($.fn.zoom) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.zoomImage = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function (selector) {
            if (selector && document.documentElement.clientWidth > 575) {
                (('string' === typeof selector) ? $(selector) : selector)
                    .find('img').each(function () {
                        let $this = $(this);
                        $this.parent().css({ 'display': 'block', 'cursor': 'zoom-in' });
                        zoomImageOptions.target = $this.parent();
                        zoomImageOptions.url = $this.attr('data-zoom-image');
                        $this.parent().zoom(zoomImageOptions);
                        zoomImageEcs.zoomImageObjects.push($this);
                    });
            }
        },
        zoomImageOnResize: function () {
            zoomImageEcs.zoomImageObjects.forEach(function ($img) {
                $img.each(function () {
                    let zoom = $(this).data('zoom');
                    zoom && zoom.refresh();
                })
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}
Ecsgroup.zoomImage = function (selector) {
    return zoomImageEcs.init(selector);
};