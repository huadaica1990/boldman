/**
 * Fake load more
 * @function fakeLoadMore
 * @param {String} selector
 * @param {Int} pagesize
 */
Ecsgroup.fakeLoadMore = function (container, pagesize = 4) {
    $(container).each(function () {
        var count = 1,
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
            if (href == null) btn.remove();
        };
        btn.on('click', function (event) {
            event.preventDefault();
            count += 1;
            for (let index = 0; index < pagesize * count; ++index) {
                $(itemChild[index]).css('display', 'block');
            }
            if (itemTotal < pagesize * count) {
                if (href == null) btn.remove();
                btn.find('a').text(text).on('click', () => { window.location.href = href })
            }
        });
    });
};