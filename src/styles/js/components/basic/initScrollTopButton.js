/**
 * initScrollTopButton
 *
 */
let scrollTopOptions = {
    yOffset: 400,
},
elemTarget = Ecsgroup.byId('scroll-top');
const scrollTopEcs = {
    init: function () {
        if (elemTarget != null) {
            let startPerformanceTime = performance.now();
            this.core.start();
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.initScrollTopButton = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function () {
            elemTarget.addEventListener('click', function (e) {
                $('html, body').animate({ scrollTop: 0 }, 600);
                e.preventDefault();
            });
            Ecsgroup.call(scrollTopEcs.core.refreshScrollTop, 500);
            window.addEventListener('scroll', scrollTopEcs.core.refreshScrollTop, { passive: true });
        },
        refreshScrollTop: function() {
            if (window.pageYOffset > scrollTopOptions.yOffset) {
                elemTarget.classList.add('show');

                // Show scroll position percent in scroll top button
                let d_height = $(document).height(),
                    w_height = Ecsgroup.$window.height(),
                    c_scroll_pos = Ecsgroup.$window.scrollTop();

                let perc = c_scroll_pos / (d_height - w_height) * 214;

                if ($('#progress-indicator').length > 0) {
                    $('#progress-indicator').css('stroke-dasharray', perc + ', 400');
                }
            }
            else elemTarget.classList.remove('show');
            if (Ecsgroup.byId('scroll-top-hold') != null) {
                let hFooter = $('.product-sticky-content.fixed').innerHeight(),
                    check = Ecsgroup.isOnScreen('#scroll-top-hold'),
                    body = $('body').hasClass('addtocart-fixed');
                if (!body) hFooter = 0;
                if (check) {
                    elemTarget.classList.add('hold');
                    elemTarget.style.bottom = $('footer').innerHeight() + hFooter - 22 + 'px';
                }
                else {
                    elemTarget.classList.remove('hold');
                    elemTarget.style.bottom = '98px';
                }
            }
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initScrollTopButton = scrollTopEcs.init();