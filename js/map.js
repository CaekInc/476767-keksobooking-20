'use strict';
(function () {
  var blockMap = document.querySelector('.map');
  var pins = document.createDocumentFragment();
  for (var i = 0; i < window.data.adverts.length; i++) {
    pins.appendChild(window.pin.create(window.data.adverts[i]));
  }
  var addFragment = function () {
    blockMap.appendChild(pins);
  };
  window.map = {
    addPins: addFragment
  };
})();
