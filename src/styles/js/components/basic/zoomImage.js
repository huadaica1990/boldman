/**
 * Ecsgroup Image Zoom Options
 */
 Ecsgroup.zoomImageOptions = {
    responsive: true,
    borderSize: 0,
    zoomType: 'inner',
    onZoomIn: true,
    magnify: 1.1,
};
Ecsgroup.zoomImageObjects = [];
/**
 * zoomImageOptions
 *
 * 
 * @requires zoom
 * @param {jQuery} $el
 */
Ecsgroup.zoomImage = function ($el) {
    if ($.fn.zoom && $el && document.documentElement.clientWidth > 575) {
        (('string' === typeof $el) ? $($el) : $el)
            .find('img').each(function () {
                var $this = $(this);
                $this.parent().css({ 'display': 'block', 'cursor': 'zoom-in' });
                Ecsgroup.zoomImageOptions.target = $this.parent();
                Ecsgroup.zoomImageOptions.url = $this.attr('data-zoom-image');
                $this.parent().zoom(Ecsgroup.zoomImageOptions);
                Ecsgroup.zoomImageObjects.push($this);
            });
    }
}
/**
 * zoomImageOnResize
 *
 */
Ecsgroup.zoomImageOnResize = function () {
    Ecsgroup.zoomImageObjects.forEach(function ($img) {
        $img.each(function () {
            var zoom = $(this).data('zoom');
            zoom && zoom.refresh();
        })
    });
}
