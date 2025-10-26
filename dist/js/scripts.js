function alertSendOrvForm() {
    if (localStorage.getItem('rs-orv-form-active') === '1') {
        return;
    }
    BX.UI.Dialogs.MessageBox.alert(
        '<p>Если вы отметили чекбокс "Опубликовать", ваше сообщение будет опубликовано на сайте.</p><p>В противном случае оно останется невидимым.</p>',
        "Внимание",
        (messageBox, button, event) => {
            localStorage.setItem('rs-orv-form-active', '1');
            document.getElementById('rs-orv-form').submit();
        },
        'Продолжить');
    BX.PreventDefault();
}

function openBlockLog(blockCode) {
    BX.SidePanel.Instance.open(blockCode, {
        contentCallback: function (slider) {
            return BX.create('div', {'class':'ui-slider-section','html':BX('log-'+blockCode).innerHTML});
        },
        width: 800
    });
}