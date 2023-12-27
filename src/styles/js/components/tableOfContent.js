/**
 * Table Of Content
 * 
 * @function tableOfContent
 */
const tableOfContentEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start();
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.tableOfContent = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function() {
            let domTableOfContent = Ecsgroup.byId('widget-toc-fixed'),
                toc = (Ecsgroup.$('.blog-content > .widget-toc').offset() ? Ecsgroup.$('.blog-content > .widget-toc').offset().top : 0) + Ecsgroup.$('.blog-content > .widget-toc').outerHeight(),
                stickyHeader = $('.sticky-header').height() + 30;
            if($('.widget-toc').length != false && domTableOfContent != null) {
                Ecsgroup.$('.widget-toc').clone().appendTo('#widget-toc-fixed');
                Ecsgroup.$('#widget-toc-fixed').find('.collapsible-title').addClass('collapsed');
                //Ecsgroup.$('#widget-toc-fixed').find('.collapsible-body').hide();
                $('#widget-toc-fixed .toggle-btn').on('click', function (e) {
                    let $this = $(this).parent(),
                        $body = $this.siblings('.collapsible-body');
                    $this.toggleClass('collapsed');
                });
                $('.tableofcontent a').on('click', function (e) {
                    let link = $(this).attr('href'), 
                        target = Ecsgroup.$(link);
                    Ecsgroup.$('#widget-toc-fixed').find('.collapsible-title').addClass('collapsed');
                    Ecsgroup.scrollTo(target.offset().top - stickyHeader, 600);
                });
                var refreshTableOfContent = function () {
                    if($('.readmore-js.open').length > 0) domTableOfContent.classList.remove('show');
                    else if (window.pageYOffset > toc && Ecsgroup.isOnScreen('.blog-content')) {
                        domTableOfContent.classList.add('show');
                        if (!Ecsgroup.isMobile) domTableOfContent.style.top = $('.sticky-header.fixed').outerHeight() + 30 + 'px';
                    }
                    else domTableOfContent.classList.remove('show');
                }
                document.addEventListener('scroll', refreshTableOfContent);
                Ecsgroup.$body.on('click', function (e) {
                    if (!$(e.target).closest('#widget-toc-fixed').length) {
                        Ecsgroup.$('#widget-toc-fixed').find('.collapsible-title').addClass('collapsed');
                    }
                })
            }
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.tableOfContent = function () {
    return tableOfContentEcs.init();
};