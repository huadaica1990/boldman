/**
 * accordion
 *
 * Register events active menu
 * 
 * @param {String} selector 
 */
let hrefRegExp = new RegExp("(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?");
const activeMenuEcs = {
    init: function(selector) {
        let startPerformanceTime = performance.now();
        this.core.start(selector);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.activeMenu = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector) {
            let url = window.location.pathname; 
                // urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
            if (url == '/') $(selector + ' a[href="/"]').closest('li').addClass('active');
            else {
                $(selector + ' a').each(function(){
                    let thisUrl = this.href.replace(/^.*\/\/[^\/]+/, '');
                    if(url.search(thisUrl) > -1 && hrefRegExp.test(thisUrl)){
                        $(this).closest('li').addClass('active');
                        $(this).parents('li').each(function(){
                            $(this).addClass('active');
                        });
                    }
                });
            }
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.activeMenu = function (selector) {
    return activeMenuEcs.init(selector);
};