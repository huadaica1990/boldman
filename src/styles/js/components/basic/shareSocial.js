const linkShare = {
    facebook: 'https://www.facebook.com/sharer.php?app_id=&display=popup&href=',
    messengerM: 'fb-messenger://share/?link=',
    messagePc: 'http://www.facebook.com/dialog/send?app_id=&link=&redirect_uri=',
    linkedin: 'https://www.linkedin.com/shareArticle?title=&url=',
    twitter: 'https://twitter.com/intent/tweet?url=&text=',
    email: 'mailto:?subject=&body=',
    sms: 'sms:?body=',
    pinterest: 'https://www.pinterest.com/pin/create/button/?description=&media=&url=',
    tumblr: 'https://www.tumblr.com/share?t=&u=&v=3',
    telegram: 'https://telegram.me/share/url?url=&text='
}
const shareSocialEcs = {
    init: function () {
        let startPerformanceTime = performance.now();
        this.core.shareUrl('.btn-shareurl');
        this.core.shareNormal('.btn-share');
        this.core.shareZalo('.btn-sharezalo');
        this.core.sharePopup('.btn-sharesocial');
        this.core.copyUrl('.btn-copy');
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.shareSocial = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        shareZalo: function() {
            // setTimeout(() => { 
            //    document.getElementById("trigger_zalo").click() 
            //}, 500)
            //div#trigger_zalo(data-href='URL' data-oaid='' data-layout='2' data-color='blue' data-customize='true' title='Chia sẻ Zalo')
        },
        sharePopup: function(selector) {
            Ecsgroup.$body.on('click', selector, function (e) {
                e.preventDefault();
                let $this = $(e.currentTarget),
                    v_width = 500, 
                    v_height = 550, 
                    winDef = "location=1,status=1,scrollbars=1,";
                let dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX,
                    dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY,
                    widthPopup = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    heightPopup = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    systemZoom = widthPopup / window.screen.availWidth,
                    leftPopup = (widthPopup - v_width) / 2 / systemZoom + dualScreenLeft,
                    topPopup = (heightPopup - v_height) / 2 / systemZoom + dualScreenTop;
    
                winDef = winDef.concat("width=").concat(v_width / systemZoom).concat(",");
                winDef = winDef.concat("height=").concat(v_height / systemZoom).concat(",");
                winDef = winDef.concat("top=").concat(topPopup).concat(",");
                winDef = winDef.concat("left=").concat(leftPopup);
                window.open($this.attr('href'), $this.attr('title'), winDef);
            });
        },
        shareUrl: function (selector) {
            Ecsgroup.$body.on('click', selector, function (e) {
                e.preventDefault();
                let $this = $(e.currentTarget);
                if (navigator.share) {
                    navigator.share({
                        title: $this.attr('title'),
                        url: $this.attr('href')
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    }).catch((error) => console.log('Sharing failed', error));
                } else {
                    alert(core2);
                }
            });
        },
        copyUrl: function (selector) {
            $(document.body).on('click', selector, function (e) {
                e.preventDefault();
                let $this = $(e.currentTarget),
                    val = $this.attr('href') != null ? $this.attr('href') : $this.data('text');
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(val)
                        .then(() => {
                           Ecsgroup.miniPopup.core.open({
                                productClass: ' success minipopup-center',
                                message: '<p><i class="demo-icon cus-ok-circled"></i>' + core1 + '</p>',
                                template:
                                    '<div class="minipopup-box {{productClass}}">' +
                                    '<div class="minipopup-body">' +
                                    '<div class="minipopup-content">{{message}}</div>' +
                                    '</div>' +
                                    '</div>',
                            });
                    })
                    .catch((error) => {
                        console.log('Something went wrong', error);
                    })
                }
                else {
                    let temp = $('<input style="opacity:0;position absolute;z-index:-1;">');
                    $("body").append(temp);
                    temp.val(val).select();
                    document.execCommand("copy");
                    temp.remove();
                    Ecsgroup.miniPopup.core.open({
                        productClass: ' success minipopup-center',
                        message: '<p><i class="demo-icon cus-ok-circled"></i>' + core1 + '</p>',
                        template:
                            '<div class="minipopup-box {{productClass}}">' +
                            '<div class="minipopup-body">' +
                            '<div class="minipopup-content">{{message}}</div>' +
                            '</div>' +
                            '</div>',
                    });
                }
            });
        },
        shareNormal: function (selector) {
            Ecsgroup.$body.on('click', selector, function (e) {
                e.preventDefault();
                let $this = $(e.currentTarget);
                if (navigator.share) {
                    navigator.share({
                        title: $this.attr('title'),
                        url: $this.attr('href')
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    })
                        .catch((error) => console.log('Sharing failed', error));
                } else {
                    alert(core2);
                }
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}

Ecsgroup.shareSocial = shareSocialEcs.init();