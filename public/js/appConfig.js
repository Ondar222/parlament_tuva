/* изменяемые настройки скриптов, указаны значения по умолчанию */
var appConfig = {
    /*
    scrollToOffset: 100, // оффсет при скролле до элемента
    popupLoadedEvent: 'app.popup_loaded' // событие загрузки модалки
    */
}

closeNotifyBlock = function () {
    fetch('/api/notify/close', {method: 'POST'});
}