/**
 * Search pc
 * @function preSearch
 * @param {String} selector
 */
function preSearchEcs (selector) {
    Ecsgroup.$(selector).each(function () {
        var $search = $(this),
            searchWrap = $search.find('.search-overwrap'),
            resultStep1 = $search.find('.search-result-step1'),
            resultStep2 = $search.find('.search-result-step2');
        $search.find('input[type="search"]')
            .on('focusin', function (e) {
                $search.addClass('show');
                // getViewedSearch();
                searchWrap.addClass('show');
            })
            // .on('focusout', function (e) {
            //     $search.removeClass('show');
            // })
            .on('keyup', Ecsgroup.debounce(function(e) {
                    let $this = e.currentTarget;
                    resultStep2.show();
                    resultStep1.hide();
                    if ($this.value === '') {
                        resultStep2.hide();
                        resultStep1.show();
                    }
                    else {
                        search($this.value);
                        console.log($this.value)
                    }
                }, 3000)
            )
            .on('search', function (e) {
                if (this.value === '') {
                    resultStep2.hide();
                    resultStep1.show();
                }
            });
        $('.search-overwrap').on('click', function() {
            $('.search-overwrap').removeClass('show');
            $search.removeClass('show');
        })
    });
};
Ecsgroup.preSearch = function (selector) {
    return new preSearchEcs(selector);
}