/**
 * Notification Customer
 *
 */

function notiCustomerEcs(pagesize, timeNewArray) {
    let timer = setInterval(randomTimeToTake, 20000);
    function randomTimeToTake() {
        var timeArray = timeNewArray;

        // do stuff, happens to use jQuery here (nothing else does)
        getNotiCustomer(pagesize);
        clearInterval(timer);
        timer = setInterval(randomTimeToTake, randRange(timeArray));
    }
    function randRange(data) {
        var newTime = data[Math.floor(data.length * Math.random())];
        return newTime;
    }
    function getNotiCustomer(pagesize) {
        let notiList = new Array();
        if (window.localStorage.getItem("notiList") == null || Ecsgroup.getCookie('notiExpired') == null) {
            Ecsgroup.setCookie('notiExpired', true, 1);
            ajaxGet(pagesize);
        }
        notiList = JSON.parse(window.localStorage.getItem("notiList"));
        if (notiList.length <= 1) {
            ajaxGet(pagesize);
            notiList = JSON.parse(window.localStorage.getItem("notiList"));
        }
        let notiItem = notiList[Math.floor(Math.random() * notiList.length)];
        Ecsgroup.miniPopup.core.open({
            productClass: 'minipopup-noti-customer minipopup-bottom-left',
            message: notiItem.Body,
            name: notiItem.Name,
            imageSrc: notiItem.Avatar,
            delay: 10000, // milliseconds
            template:
                '<div class="minipopup-box {{productClass}}">' +
                '<div class="minipopup-body d-flex">' +
                '<div class="minipopup-meida">' +
                '<img src="{{imageSrc}}" alt="{{name}}" />' +
                '</div>' +
                '<div class="minipopup-detais">' +
                '<div class="minipopup-title">{{name}} - ' + notiItem.Phone +'</div>' +
                '<div class="minipopup-subtitle">' + notiItem.Description +'</div>' +
                '<div class="minipopup-content">{{message}}</div>' +
                '</div>' +
                '</div>' +
                '</div>',
        });
        notiList = notiList.filter(function (itemList) {
            return itemList.Id !== notiItem.Id;
        });
        window.localStorage.setItem('notiList', JSON.stringify(notiList));
        console.log(notiList);
    }
    function ajaxGet(pagesize) {
        $.ajax({
            url: '/aj/Shared/GetNotiCustomer',
            type: 'GET',
            data: { pagesize: pagesize },
            beforeSend: function () { },
            success: function (result) {
                if (!result.Ok) {
                    console.log(result.Msg)
                }
                else {
                    window.localStorage.setItem('notiList', JSON.stringify(result.Data));
                }
            },
            error: function (result) {
                console.log(result.Msg)
            }
        });
    }
}
Ecsgroup.notiCustomer = function (pagesize, timeNewArray) {
    return new notiCustomerEcs(pagesize, timeNewArray);
};