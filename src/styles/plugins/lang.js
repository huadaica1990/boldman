function getCookieLang (name) {
    var n = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; ++i) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(n) == 0) {
            return c.substring(n.length, c.length);
        }
    }
    return "vi";
}
var ECSLanguage = getCookieLang('ECSLanguage');
var ECSLanguageFile = new MultiLang('/wwwroot/templates/website/release/languages.json');
ECSLanguageFile.setLanguage(ECSLanguage);
console.log(ECSLanguage,ECSLanguageFile.get('langdesc'));

var core1 = 'Copy thành công',
    core2 = 'Trình duyệt không hỗ trợ',
    core3 = 'Bạn có chắc chắn muốn rời khỏi hộp hội thoại này ngay bây giờ không',
    core4 = 'So sánh sản phẩm',
    core5 = 'Xóa tất cả',
    core6 = 'So sánh ngay!',
    core7 = 'Xem thêm nội dung',
    core8 = 'Thu gọn nội dung',
    core9 = ' Sản phẩm',
    core10 = 'Thu gọn',
    core11 = 'Xem thêm',

    err1 = 'Dữ liệu bị xóa không thể phục hồi, bạn có muốn xóa?',
    err2 = 'Cảnh báo',
    err3 = 'Xóa',
    err4 = 'Hủy',
    err5 = 'Vui lòng chọn dữ liệu cần xóa',
    err6 = 'Lỗi',
    err7 = '<p>Chuyển tới trang thanh toán MoMo sau <b style=\"color:red\" id=\"time-down\">3s</b></p>',
    err7_1 = '<p>Chuyển tới trang thanh toán Ngân Lượng sau <b style=\"color:red\" id=\"time-down\">3s</b></p>',
    err8 = 'Thông báo',
    err9 = 'Giỏ hàng hết hiệu lực',
    err10 = 'Vui lòng điền mã khuyến mãi',
    err11 = 'Thành công',

    text1 = 'Có ',
    text2 = ' lỗi, xem chi tiết bên dưới.',
    text3 = 'File ảnh không được quá 5MB.',
    text4 = 'Vị trí địa lý không được trình duyệt này hỗ trợ',
    text5 = 'Thêm vào giỏ hàng thành công',
    text6 = 'Xem giỏ hàng và thanh toán',
    text7 = 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích của mình?',
    text8 = 'Gửi thành công',

    validate1 = 'Vui lòng điền đầy đủ thông tin ở trường ',
    validate2 = 'Vui lòng sửa phạm vi này.',
    validate3 = 'Vui lòng nhập một địa chỉ email hợp lệ ở trường ',
    validate4 = 'Vui lòng nhập một URL hợp lệ.',
    validate5 = 'Vui lòng nhập một ngày hợp lệ.',
    validate6 = 'Vui lòng nhập ngày hợp lệ (ISO).',
    validate7 = 'Vui lòng nhập một số hợp lệ.',
    validate8 = 'Vui lòng chỉ nhập các chữ số.',
    validate9 = 'Vui lòng nhập số thẻ tín dụng hợp lệ.',
    validate10 = 'Vui lòng nhập lại cùng một giá trị.',
    validate11 = 'Vui lòng nhập giá trị có phần mở rộng hợp lệ.',
    validate12 = 'Vui lòng nhập không quá {0} ký tự ở trường ',
    validate13 = 'Vui lòng nhập ít nhất {0} ký tự ở trường ',
    validate14 =  'Vui lòng nhập một giá trị có độ dài từ {0} đến {1} ký tự ở trường ',
    validate15 = 'Vui lòng nhập giá trị từ {0} đến {1} ở trường ',
    validate16 = 'Vui lòng nhập giá trị nhỏ hơn hoặc bằng {0} ở trường ',
    validate17 = 'Vui lòng nhập giá trị lớn hơn hoặc bằng {0} ở trường ',
    validate18 = 'Vui lòng điền đầy đủ thông tin ở trường email.';

setTimeout(function () {
    console.log(ECSLanguage, ECSLanguageFile.get('langdesc'));
    if (ECSLanguageFile.get('langdesc') != 'langdesc') {
        core1 = ECSLanguageFile.get('core1'),
        core2 = ECSLanguageFile.get('core2'),
        core3 = ECSLanguageFile.get('core3'),
        core4 = ECSLanguageFile.get('core4'),
        core5 = ECSLanguageFile.get('core5'),
        core6 = ECSLanguageFile.get('core6'),
        core7 = ECSLanguageFile.get('core7'),
        core8 = ECSLanguageFile.get('core8'),
        core9 = ECSLanguageFile.get('core9'),
        core10 = ECSLanguageFile.get('core10'),
        core11 = ECSLanguageFile.get('core11'),

        err1 = ECSLanguageFile.get('err1'),
        err2 = ECSLanguageFile.get('err2'),
        err3 = ECSLanguageFile.get('err3'),
        err4 = ECSLanguageFile.get('err4'),
        err5 = ECSLanguageFile.get('err5'),
        err6 = ECSLanguageFile.get('err6'),
        err7 = ECSLanguageFile.get('err7'),
        err7_1 = ECSLanguageFile.get('err7_1'),
        err8 = ECSLanguageFile.get('err8'),
        err9 = ECSLanguageFile.get('err9'),
        err10 = ECSLanguageFile.get('err10'),
        err11 = ECSLanguageFile.get('err11'),

        text1 = ECSLanguageFile.get('text1'),
        text2 = ECSLanguageFile.get('text2'),
        text3 = ECSLanguageFile.get('text3'),
        text4 = ECSLanguageFile.get('text4'),
        text5 = ECSLanguageFile.get('text5'),
        text6 = ECSLanguageFile.get('text6'),
        text7 = ECSLanguageFile.get('text7'),
        text8 = ECSLanguageFile.get('text8'),

        validate1 = ECSLanguageFile.get('validate1'),
        validate2 = ECSLanguageFile.get('validate2'),
        validate3 = ECSLanguageFile.get('validate3'),
        validate4 = ECSLanguageFile.get('validate4'),
        validate5 = ECSLanguageFile.get('validate5'),
        validate6 = ECSLanguageFile.get('validate6'),
        validate7 = ECSLanguageFile.get('validate7'),
        validate8 = ECSLanguageFile.get('validate8'),
        validate9 = ECSLanguageFile.get('validate9'),
        validate10 = ECSLanguageFile.get('validate10'),
        validate11 = ECSLanguageFile.get('validate11'),
        validate12 = ECSLanguageFile.get('validate12'),
        validate13 = ECSLanguageFile.get('validate13'),
        validate14 = ECSLanguageFile.get('validate14'),
        validate15 = ECSLanguageFile.get('validate15'),
        validate16 = ECSLanguageFile.get('validate16'),
        validate17 = ECSLanguageFile.get('validate17'),
        validate18 = ECSLanguageFile.get('validate18');
    }
}, 500);

