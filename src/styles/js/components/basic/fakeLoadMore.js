/**
 * Fake load more
 * @function fakeLoadMore
 * @param {String} selector
 * @param {Int} pagesize
 */

const fakeLoadMoreEcs = {
    init: function(selector, pagesize) {
        let startPerformanceTime = performance.now();
        this.core.start(selector, pagesize);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.fakeLoadMore = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector, pagesize) {
            Ecsgroup.$(selector).each(function () {
                let count = 1,
                    itemChild = $(this).children(),
                    itemTotal = itemChild.length,
                    itemQuery = itemTotal / pagesize,
                    btn = $(this).next('.fake-loadmore'),
                    text = $(this).data('text'),
                    href = $(this).data('href');
                itemChild.each((index) => {
                    var ele = itemChild[index];
                    if(index >= pagesize) $(ele).hide();
                });
                if (itemTotal > pagesize) {
                    for (let index = 0; index < pagesize; ++index) {
                        $(itemChild[index]).css('display', 'block');
                    }
                }
                else {
                    $(itemChild).css('display', 'block');
                    if (href == null || itemTotal <= pagesize) btn.remove();
                };
                btn.on('click', function (event) {
                    event.preventDefault();
                    count += 1;
                    for (let index = 0; index < pagesize * count; ++index) {
                        $(itemChild[index]).css('display', 'block');
                    }
                    if (itemTotal <= pagesize * count) {
                        if (href == null) btn.remove();
                        btn.find('a').text(text).on('click', () => { window.location.href = href })
                    }
                });
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.fakeLoadMore = function (selector, pagesize = 4) {
    return fakeLoadMoreEcs.init(selector, pagesize);
};