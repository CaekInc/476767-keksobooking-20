'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var create = function (param, indexElement) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    var offsetLeft = param.location.x - Pin.WIDTH / 2;
    var offsetTop = param.location.y - Pin.HEIGHT;

    pin.setAttribute('data-id', indexElement);
    pin.setAttribute('style', 'left: ' + offsetLeft + 'px; top: ' + offsetTop + 'px;');
    pinImage.setAttribute('src', param.author.avatar);
    pinImage.setAttribute('alt', param.offer.title);

    return pin;
  };

  window.pin = {
    create: create
  };
})();
