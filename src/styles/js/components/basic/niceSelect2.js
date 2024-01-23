/**
 * blank
 *
 * Register events for blank
 * 
 * @param {String} selector 
 */
let niceSelectOption = {};
const niceSelect2Ecs = {
    init: function(selector) {
        if (typeof NiceSelect !== 'undefined') {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.niceSelect2 = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let _this = this;
                let settings = $.extend(true, {}, niceSelectOption, Ecsgroup.parseOptions($(_this).attr('data-niceselect-options')));
                let select = NiceSelect.bind(_this, settings);
                if (select.config.getImage == true) {
                    let listImg = [],
                        elSelect = select.el,
                        elLi = $(elSelect).parent().find('.nice-select-dropdown li'),
                        elHeader = $(elSelect).parent().find('.nice-select .current'),
                        elLiActive = select.selectedOptions[0].element;
                    Array.from(elSelect.children).forEach(function(element, index ) {
                        let opt = element.getAttribute('data-img'),
                            img = `<img src="${opt}" loading="lazy" >`;
                        $(elLi[index]).prepend(img)
                    });
                    elLi.on('click', function() {
                        let eLi = this;
                        elHeader.html(eLi.innerHTML)
                    });
                    elHeader.html(elLiActive.innerHTML);
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
Ecsgroup.niceSelect2 = function (selector) {
    return niceSelect2Ecs.init(selector);
};