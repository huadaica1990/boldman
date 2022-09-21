/**
* Ecsgroup Plugin - initSelectMenu
* @function initSelectMenu
*/

function selectSideBarEcs(selector) {
    $(selector).each(function (e) {
        selectSideBarEcs.init(this);
    });

    Ecsgroup.$body.on('click', function (e) {
        if (!$(e.target).closest('.select-menu-filter').is('.opened') || $(e.target).hasClass('select-menu-backdrop')) {
            selectSideBarEcs.closeAll();
        }
    })
    Ecsgroup.$body.on('click', '.select-menu-header', function (e) {
        e.stopPropagation();
        selectSideBarEcs.open(e);
    });
    
    Ecsgroup.$body.on('keyup', '.select-menu-filter input', function (e) {
        var target = this.closest('.select-menu-filter');
        selectSideBarEcs.searchText($(this), target);
    });
};

selectSideBarEcs.init = function (el) {
    let placeholder = $(el).find('.active').last().children().first().text();
    $(el).find('.text').text(placeholder ? placeholder : $(this).data('text'));
};
selectSideBarEcs.open = function (el) {
    let $selectMenu = $(el.currentTarget).closest('.select-menu-filter'),
        $target = $(el.target), 
        idInput = $selectMenu.find('input').attr('id');
    $selectMenu.addClass('opened');
    getSearchFocus(idInput);
    $('body').append('<div class="select-menu-backdrop"></div>');
    e.stopPropagation();
};
selectSideBarEcs.closeAll = function () {
    $('.select-menu-filter').removeClass('opened');
    $('.select-menu-backdrop').remove();
};

selectSideBarEcs.searchText = function (el, elparent) {
    // Declare variables
    var input = el,
        ul = $(elparent).find('ul'),
        li = ul.find('li'),
        count = 0,
        filter, a, i, txtValue;
    filter = Ecsgroup.cleanUnicode(input.val());
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (Ecsgroup.cleanUnicode(txtValue).indexOf(filter) > -1) {
            a.style.display = '';
            count += 1;
        } else {
            a.style.display = 'none';
        }
    }
    if (count == 0) $(elparent).find('.select-menu-info').show();
    else $(elparent).find('.select-menu-info').hide();
};
Ecsgroup.initSelectSideBar = function (selector) {
    return new selectSideBarEcs(selector);
};