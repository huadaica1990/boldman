/**
 * accordion
 *
 * Register events active menu
 * 
 * @param {String} selector 
 */
function activeMenuEcs(selector) {
    let url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"),
        hrefRegExp = new RegExp("(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?");
        if (url == '/') $(selector + ' a[href="/"]').closest('li').addClass('active');
        else {
            $(selector + ' a').each(function(){
                let thisUrl = this.href.replace(/\/$/,'');
                if(urlRegExp.test(thisUrl) && hrefRegExp.test(thisUrl)){
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