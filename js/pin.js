'use strict';
(function () {
  var blockMap = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.createAdverts.length; i++) {
    fragment.appendChild(window.card.createPin(window.data.createAdverts[i]));
  }
  var addFragment = function () {
    blockMap.appendChild(fragment);
  };
  window.pin = {
    addFragment: addFragment
  };
})();
