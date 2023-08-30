var linkShare = {
    facebook: 'https://www.facebook.com/sharer.php?t=&u=',
    messengerM: 'fb-messenger://share/?link=',
    messagePc: 'https://www.facebook.com/dialog/send?link=&app_id=&redirect_uri='
    linkedin: 'https://www.linkedin.com/shareArticle?title=&url=',
    twitter: 'https://twitter.com/intent/tweet?url=&text=',
    email: 'mailto:?subject=&body=',
    sms: 'sms:?body=',
    pinterest: 'https://www.pinterest.com/pin/create/button/?description=&media=&url=',
    tumblr: 'https://www.tumblr.com/share?t=&u=&v=3'
    h
    
    

}https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Ftext%3DMua%2520gi%25CC%2580%25202019%253F%26url%3Dhttp%253A%252F%252Flocalhost%253A51593%252Ftin-chi-tiet%252Fmua-gi%2525CC%252580-2019%2523
var ShareSocial = {
    init: function () {
        this.shareUrl('.btn-shareurl');
        this.shareZalo('.btn-sharezalo');
        this.sharePopup('.btn-sharesocial');
    },
    shareZalo: function() {
         setTimeout(() => { 
            document.getElementById("trigger_zalo").click() 
        }, 500)
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
            var $this = $(e.currentTarget);
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
    },
}
Ecsgroup.shareSocial = ShareSocial;