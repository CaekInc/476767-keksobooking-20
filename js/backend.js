'use strict';
(function () {

  var Urls = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var ajax = function (params) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status === 200) {
        params.onLoad(xhr.response);
      } else {
        params.onError('Данные не загружены. Код ошибки: ' + xhr.status);
      }
    };

    xhr.onerror = function () {
      params.onError('Ошибка соединения. Проверьте подключение к сети интернет.');
    };

    xhr.open(params.method, params.url);

    if (params.data) {
      xhr.send(params.data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    ajax({
      url: Urls.LOAD,
      method: 'GET',
      onLoad: onLoad,
      onError: onError
    });
  };
  var save = function (data, onLoad, onError) {
    ajax({
      url: Urls.SAVE,
      method: 'POST',
      data: data,
      onLoad: onLoad,
      onError: onError
    });
  };
  window.backend = {
    load: load,
    save: save
  };

})();
