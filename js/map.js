'use strict';
(function () {
  var blockMap = document.querySelector('.map');

  var addFragment = function () {
    var pins = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      pins.appendChild(window.pin.create(window.data.adverts[i]));
    }
    blockMap.appendChild(pins);
  };
  window.map = {
    addPins: addFragment
  };
})();
