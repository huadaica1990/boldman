/**
* Ecsgroup Plugin - initSelectMenu
* @function initSelectMenu
*/
// HTML
//     .select-menu-filter(data-text='TITLE')
//         .select-menu-header
//             span.text TITLE
//             i.icon
//         .select-menu-body
//             .select-menu-search.p-relative
//                 input.form-control(type='search' placeholder='')
//                 i.icon
//             ul.nav.select-menu-content.scrollable.nav-js
//                 li
//                     a(href='' title='') NAME
//             .select-menu-info(style='display:none')

const selectSideBarEcs = {
    init: function(selector) {
        let startPerformanceTime = performance.now();
        this.core.init(selector);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.initSelectSideBar = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        init: function(selector) {
            let placeholder = $(selector).find('.active').last().children().first().text();
            $(selector).find('.text').text(placeholder ? placeholder : $(this).data('text'));
            Ecsgroup.$body.on('click', function (e) {
                if (!$(e.target).closest('.select-menu-filter').is('.opened') || $(e.target).hasClass('select-menu-backdrop')) {
                    selectSideBarEcs.core.closeAll();
                }
            })
            Ecsgroup.$body.on('click', '.select-menu-header', function (e) {
                e.stopPropagation();
                selectSideBarEcs.core.open(e);
            });
            Ecsgroup.$body.on('keyup', '.select-menu-filter input', function (e) {
                let target = this.closest('.select-menu-filter');
                selectSideBarEcs.core.searchText($(this), target);
            });
        },
        open: function(selector) {
            let $selectMenu = $(selector.currentTarget).closest('.select-menu-filter'),
            $target = $(selector.target), 
            idInput = $selectMenu.find('input').attr('id');
            $selectMenu.addClass('opened');
            getSearchFocus(idInput);
            $('body').append('<div class="select-menu-backdrop"></div>');
            e.stopPropagation();
        },
        closeAll: function() {
            $('.select-menu-filter').removeClass('opened');
            $('.select-menu-backdrop').remove();
        },
        searchText: function(selector, selectorparent) {
            // Declare variables
            let input = el,
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
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initSelectSideBar = function (selector) {
    return new selectSideBarEcs.init(selector);
};