/**
 * Fake load more
 * @function fakeLoadMore
 * @param {String} selector
 * @param {Int} pagesize
 */
Ecsgroup.fakeLoadMore = function (container, pagesize = 4) {
    var count = 1,
        itemChild = $(container).children(),
        itemTotal = itemChild.length,
        itemQuery = itemTotal / pagesize,
        btn = $(container).next('.fake-loadmore'),
        text = $(container).data('text'),
        href = $(container).data('href');
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
        btn.remove();
    };
    btn.on('click', function (event) {
        event.preventDefault();
        count += 1;
        for (let index = 0; index < pagesize * count; ++index) {
            $(itemChild[index]).css('display', 'block');
        }
        if (itemTotal < pagesize * count) {
            btn.remove();
        }
        else if (itemTotal == pagesize * count){
            btn.find('a').text(text).on('click', () => { window.location.href = href })
        }
    });
};