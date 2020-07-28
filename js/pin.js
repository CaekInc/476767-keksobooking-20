'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (param) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.setAttribute('data-id', param.offer.id);
    pinImage.src = param.author.avatar;
    pinImage.alt = param.offer.title;
    pinElement.style.left = param.location.x - window.data.PIN_WIDTH_HALF + 'px';
    pinElement.style.top = param.location.y - window.data.PIN_HEIGHT + 'px';
    return pinElement;
  };
  window.pin = {
    create: createPin
  };
})();
