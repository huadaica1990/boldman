/**
 * Select Customize
 *
 */
function selectEcs(selector) {
    $(selector).each(function (e) {
        selectEcs.init(this);
    });

    Ecsgroup.$body.on('click', function (e) {
        if (!$(e.target).closest('.custom-select').is('.active') || $(e.target).hasClass('custom-select-backdrop')) {
            selectEcs.closeAll();
        }
    })
    Ecsgroup.$body.on('click', '.custom-select-header', function (e) {
        var target = this.closest('.custom-select');
        e.stopPropagation();
        if ((window.innerHeight - target.getBoundingClientRect().bottom) < 300) {
            $(target).addClass('custom-select-top');
        }
        else {
            $(target).removeClass('custom-select-top');
        }
        if ($(target).hasClass('active')) selectEcs.closeAll();
        else selectEcs.open(target);
    });
    Ecsgroup.$body.on('click', '.custom-select-body li', function (e) {
        var target = this.closest('.custom-select');
        e.stopPropagation();
        if (!$(this).hasClass('disabled')) {
            $(this).addClass('active').siblings().removeClass('active');
            var value = $(this).data('value');
            var valuetext = $(this).text();
            selectEcs.closeAll();
            selectEcs.selectVal(target, value, valuetext);
        }
    });
    Ecsgroup.$body.on('keyup', '.custom-select-search input', function (e) {
        var target = this.closest('.custom-select');
        selectEcs.searchText($(this), target);
    });
};

// Private Properties
selectEcs.init = function (el) {
    var target = el,
        select = $(target).find('select'),
        selectVal = $(select).val(),
        targetActive = $(select).find('option[selected]');
    // Hidden select
    select.css({
        'position': 'absolute',
        'visibility': 'hidden',
        'opacity': 0,
        'z-index': -99,
        'width': 0
    });
    // pre theme
    if ($(target).find('.custom-select-header').length == 0) {
        var selectId = $(select).attr('id'),
            selectLenght = select[0].options.length,
            theme = '<div class="custom-select-header" data-id="' + selectId + '"><span></span></div><div class="custom-select-body"><ul>';

        // Append temp;
        for (var i = 0; i < selectLenght; i++) {
            theme += '<li data-value="' + select[0].options[i].value + '">' + select[0].options[i].innerHTML + '</li>'
        }
        theme += '</ul></div><div class="custom-select-backdrop"></div>';
        $(target).append(theme);
    }

    if (targetActive.length == 0 && (selectVal == null || selectVal == '')) {
        $(select).find('option').first().attr('selected', true);
        targetActive = $(select).find('option[selected]');
        //valSelect(target, targetActive.val(), targetActive.text());
    }
    if (selectVal != null || selectVal != '') {
        var optText = select.find('option[value="' + selectVal + '"]').attr('selected', 'selected');
        $(target).find('.custom-select-header span').text($(optText).text());
    }
    select.find('option').each(function (e) {
        var opt = this,
            optval = $(opt).attr('value'),
            optselected = $(opt).attr('selected'),
            optdisabled = $(opt).attr('disabled');
        if (optselected) $(target).find('.custom-select-body li[data-value="' + optval + '"]').addClass('active');
        if (!optselected && optdisabled) $(target).find('.custom-select-body li[data-value="' + optval + '"]').addClass('disabled');
    });
};
selectEcs.open = function (el) {
    var searchInput = $(el).find('input');
    Ecsgroup.$body.addClass('select-active');
    selectEcs.closeAll();
    if (!$(el).hasClass('active')) {
        $(el).addClass('active');
        if (searchInput.length > 0 && document.documentElement.clientWidth > 1199) searchInput.focus();
    }
};
selectEcs.close = function (target) {
    var targetId = $(target).data('id');
    $('.custom-select:not(#' + targetId + ')').each(function () {
        $(this).removeClass('active');
    })
};

selectEcs.closeAll = function () {
    Ecsgroup.$body.removeClass('select-active');
    $('.custom-select').each(function () {
        $(this).removeClass('active');
    })
};
selectEcs.selectVal = function (el, value, text) {
    var select = $(el).find('select');
    select.val(value);
    select.triggerHandler('change');
    $(el).find('.custom-select-header span').text(text);
};
selectEcs.cleanUnicode = function (str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|\;|\||\{|\}|\~|\“|\”|\™|\–|\-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    str = str.replace(/\\/g, "");
    str = str.replace(/-+-/g, "-");
    return str;
};
selectEcs.searchText = function (el, elparent) {
    // Declare variables
    var input = el,
        ul = $(elparent).find('ul'),
        li = ul.find('li'),
        count = 0,
        filter, a, i, txtValue;
    filter = selectEcs.cleanUnicode(input.val());
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (selectEcs.cleanUnicode(txtValue).indexOf(filter) > -1) {
            a.style.display = '';
            count += 1;
        } else {
            a.style.display = 'none';
        }
    }
    if (count == 0) $(elparent).find('.custom-select-search-info').show();
    else $(elparent).find('.custom-select-search-info').hide();
};
selectEcs.destroy = function (el) {
    var target = el,
        select = $(target).find('select');
    select.attr('style', '');
    $(target).find('> div').remove();
};
Ecsgroup.cutomizeSelect = function (selector) {
    return new selectEcs(selector);
};