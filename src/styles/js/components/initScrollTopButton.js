/**
 * initScrollTopButton
 *
 */
function scrollTopEcs () {
    // register scroll top button
    var domScrollTop = Ecsgroup.byId('scroll-top');

    domScrollTop.addEventListener('click', function (e) {
        $('html, body').animate({ scrollTop: 0 }, 600);
        e.preventDefault();
    });

    var refreshScrollTop = function () {
        if (window.pageYOffset > 400) {
            domScrollTop.classList.add('show');

            // Show scroll position percent in scroll top button
            var d_height = $(document).height(),
                w_height = Ecsgroup.$window.height(),
                c_scroll_pos = Ecsgroup.$window.scrollTop();

            var perc = c_scroll_pos / (d_height - w_height) * 214;

            if ($('#progress-indicator').length > 0) {
                $('#progress-indicator').css('stroke-dasharray', perc + ', 400');
            }
        } else {
            domScrollTop.classList.remove('show');
        }
    }
    Ecsgroup.call(refreshScrollTop, 500);
    window.addEventListener('scroll', refreshScrollTop, { passive: true });
};
Ecsgroup.initScrollTopButton = scrollTopEcs;