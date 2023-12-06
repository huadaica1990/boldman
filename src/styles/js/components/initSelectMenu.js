/**
* Ecsgroup Plugin - initSelectMenu
* @function initSelectMenu
*/

let blankOption = {
    classParent: '.accordion',
    classItem: '.accordion-item'
};
const initSelectMenuEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start();
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.initSelectMenu = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function() {
            // show or hide select menu
            Ecsgroup.$body.on('mousedown', '.select-menu', function (e) {
                let $selectMenu = $(e.currentTarget),
                    $target = $(e.target),
                    isOpened = $selectMenu.hasClass('opened');
                // close all select menu
                $('.select-menu').removeClass('opened');
                if ($selectMenu.is($target.parent())) { 
                    // if select menu toggle is clicked
                    !isOpened && $selectMenu.addClass('opened');
                    e.stopPropagation();
                } 
                else { 
                    // if select menu item is clicked
                    $target.parent().toggleClass('active'); // add active class to li tag
                    if ($target.parent().hasClass('active')) {
                        // if only clean all button remains
                        if ($('.selected-items').children().length < 2) {
                            // show selected items
                            $('.selected-items').show();
                        }
                        // add selected item
                        $('<a href="#" class="selected-item">' + $target.text().split('(')[0] + '<i class="la la-close"></i></a>')
                            .insertBefore('.selected-items .filter-clean')
                            .hide().fadeIn()  // hide and show item with effect - fadeIn
                            .data('link', $target.parent());
                    } else {
                        // remove selected item from selected items
                        $('.selected-items > .selected-item').filter(function (i, el) {
                            return el.innerText == $target.text().split('(')[0];
                        }).fadeOut(function () {
                            $(this).remove();
                            // if only clean all buttpn remains
                            if ($('.selected-items').children().length < 2) {
                                // then hide selected items
                                $('.selected-items').hide();
                            }
                        })
                    }
                }
            });
            // Clean selected items
            $('.selected-items .filter-clean').on('click', function (e) {
                let $clean = $(this);
                $clean.siblings().each(function () {
                    let $link = $(this).data('link');
                    $link && $link.removeClass('active');
                });
                $clean.parent().fadeOut(function () {
                    $clean.siblings().remove();
                });
                e.preventDefault();
            });
            $('.filter-clean').on('click', function (e) {
                $('.shop-sidebar .filter-items .active').removeClass('active');
                e.preventDefault();
            });
            Ecsgroup.$body.on('click', '.select-menu a', function (e) {
                e.preventDefault();
            });
            Ecsgroup.$body.on('click', '.selected-item i', function (e) {
                $(e.currentTarget).parent().fadeOut(function () {
                    let $this = $(this),
                        $link = $this.data('link');
                    $link && $link.toggleClass('active');
                    $this.remove();
                    // if only clean all button remains
                    if ($('.select-items').children().length < 2) {
                        // then hide select-items
                        $('.select-items').hide();
                    }
                });
                e.preventDefault();
            });
            // if click outside of select menu, hide select menu
            Ecsgroup.$body.on('mousedown', function (e) {
                $('.select-menu').removeClass('opened');
            });
            Ecsgroup.$body.on('click', '.filter-items a', function (e) {
                let $ul = $(this).closest('.filter-items');
                if (!$ul.hasClass('search-ul') && !$ul.parent().hasClass('select-menu')) {
                    $(this).parent().toggleClass('active');
                    e.preventDefault();
                }
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initSelectMenu = function () {
    return initSelectMenuEcs.init();
};