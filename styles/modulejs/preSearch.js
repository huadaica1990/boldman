/**
 * Search pc
 * @function preSearch
 * @param {String} selector
 */
function preSearchEcs (selector) {
    var $search = Ecsgroup.$(selector);
    Ecsgroup.togglerMake('.search-result');
    $search.find('input[type="search"]')
        .on('focusin', function (e) {
            $search.addClass('show');
            getViewedSearch();
            $('.search-overwrap').addClass('show');
        })
        // .on('focusout', function (e) {
        //     $search.removeClass('show');
        // })
        .on('keyup', function (e) {
            $search.find('.search-result-step2').show();
            $search.find('.search-result-step1').hide();
            if (this.value === '') {
                $search.find('.search-result-step2').hide();
                $search.find('.search-result-step1').show();
            }
            else {
                Ecsgroup.debounce(search(this.value));
            }
        })
        .on('search', function (e) {
            if (this.value === '') {
                $search.find('.search-result-step2').hide();
                $search.find('.search-result-step1').show();
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