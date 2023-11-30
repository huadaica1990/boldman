/**
* Ecsgroup Plugin - initCheckBoxMenu
* @function initCheckBoxMenu
*/

const checkBoxEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start(callback);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.initCheckBoxMenu = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        init: function(callback) {
            // show or hide selected-items
            $('.filter-item').each(function () {
                let $checkBox = $(this).find('input');
                if ($checkBox.is(':checked')) {
                    // add selected item
                    $('<a href="#" class="selected-item" data-id="' + $checkBox.attr('id') + '">' + $(this).text().split('(')[0] + '<i class="ecs-icon-times-solid"></i></a>')
                        .insertBefore('.selected-items .filter-clean')
                        .hide().fadeIn();
                }
            })
            if ($('.selected-items').children().length > 1) $('.selected-items').show();
            $('.filter-item > label').on('click', function (e) {
                let $checkBoxWrap = $(e.currentTarget),
                    $target = $(this).parent().find('input');
                if ($target.prop('checked')) {
                    $('.selected-items > .selected-item').filter(function (i, el) {
                        return $(el).data('id') == $target.attr('id');
                    }).fadeOut(function () {
                        $(this).remove();
                        if ($('.selected-items').children().length < 2) $('.selected-items').hide();
                    })
                }
                else {
                    // add selected item
                    $('<a href="javascript:" class="selected-item" data-id="' + $target.attr('id') + '">' + $checkBoxWrap.text().split('(')[0] + '<i class="ecs-icon-times-solid"></i></a>')
                        .insertBefore($('.selected-items').children()[0])
                        .hide().fadeIn();
                    $('.selected-items').show();
                }
            })

            // Clean selected items
            $('.selected-items .filter-clean').on('click', function (e) {
                let $clean = $(this);
                $clean.siblings().each(function () {
                    var $link = $(this).data('id');
                    //$link && $link.removeClass( 'active' );
                });
                $clean.parent().fadeOut(function () {
                    $clean.siblings().remove();
                });
                e.preventDefault();
            });

            $('.filter-clean').on('click', function (e) {
                $('.filter-item input:checked').prop('checked', false);
                callback();
                e.preventDefault();
            });

            Ecsgroup.$body.on('click', '.selected-item i', function (e) {
                $(e.currentTarget).parent().fadeOut(function () {
                    var $this = $(this),
                        $link = $this.data('id');
                    $('#' + $link).prop('checked', false);
                    $this.remove();

                    // if only clean all button remains
                    if ($('.selected-items').children().length < 2) {
                        // then hide select-items
                        $('.selected-items').hide();
                    }
                    callback();
                });
                e.preventDefault();
            });
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.initCheckBoxMenu = function (callback) {
    return checkBoxEcs.init(callback);
};