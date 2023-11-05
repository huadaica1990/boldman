/**
 * accordion
 *
 * Register events active menu
 * 
 * @param {String} selector 
 */
function activeMenuEcs(selector) {
    let url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
        if (url == '/') {
            $(selector + ' a[href="/"]').closest('li').addClass('active');
        }
        else {
            $(selector + ' a').each(function(){
                if(urlRegExp.test(this.href.replace(/\/$/,''))){
                    console.log(this.href);
                    //$(this).closest('li').addClass('active').siblings().removeClass('active');
                    $(this).closest('li').addClass('active');
                    $(this).parents('li').each(function(){
                        $(this).addClass('active');
                    });
                }
            });
        }
};
Ecsgroup.activeMenu = function (selector) {
    return new activeMenuEcs(selector);
};