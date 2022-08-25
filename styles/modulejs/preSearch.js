/**
 * Search pc
 * @function preSearch
 * @param {String} selector
 */
function preSearchEcs (selector) {
    var $search = Ecsgroup.$(selector),
        resultStep1 = $search.find('.search-result-step1'),
        resultStep2 = $search.find('.search-result-step2');
    $search.find('input[type="search"]')
        .on('focusin', function (e) {
            $search.addClass('show');
            // getViewedSearch();
            $('.search-overwrap').addClass('show');
        })
        // .on('focusout', function (e) {
        //     $search.removeClass('show');
        // })
        .on('keyup', function (e) {
            resultStep2.show();
            resultStep1.hide();
            if (this.value === '') {
                resultStep2.hide();
                resultStep1.show();
            }
            else {
                Ecsgroup.debounce(search(this.value));
            }
        })
        .on('search', function (e) {
            if (this.value === '') {
                resultStep2.hide();
                resultStep1.show();
            }
        });
    $('.search-overwrap').on('click', function() {
        $(this).removeClass('show');
        $search.removeClass('show');
    })
};
Ecsgroup.preSearch = function (selector) {
    return new preSearchEcs(selector);
}