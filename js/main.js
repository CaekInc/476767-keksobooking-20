'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var isPageEnabled = false;

  var disablePage = function () {
    window.map.destroy();
    window.advertForm.destroy();
    isPageEnabled = false;
  };
  disablePage();

  var enablePage = function (evt) {
    if ((evt.key === 'Enter' || evt.button === 0) && !isPageEnabled) {
      window.map.init();
      window.advertForm.init();
      isPageEnabled = true;
    }
  };

  mainPin.addEventListener('mousedown', enablePage);
  mainPin.addEventListener('keydown', enablePage);
  window.main = {
    disablePage: disablePage
  };
})();
