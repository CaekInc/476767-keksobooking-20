'use strict';

(function () {
  var PinData = {
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 78,
    Y_RANGE: [130, 630]
  };

  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');
  var pinHalfWidth = Math.round(PinData.WIDTH / 2);
  var addressInput = document.querySelector('#address');
  var defaultPosition = {
    x: pin.offsetLeft,
    y: pin.offsetTop
  };

  var onMainPinMousedown = function (evt) {
    if (window.utils.isMouseLeftClicked(evt)) {
      window.page.enable();
    }
  };

  var onMainPinKeydown = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.page.enable();
    }
  };

  var setAddress = function (isDefault) {
    var pinCoordsY = isDefault ? Math.round(PinData.HEIGHT / 2) : PinData.FULL_HEIGHT;
    var pinX = pin.offsetLeft + Math.round(PinData.WIDTH / 2);
    var pinY = pin.offsetTop + pinCoordsY;

    addressInput.setAttribute('value', pinX + ', ' + pinY);
  };

  window.move.init({
    element: pin,
    minX: -pinHalfWidth,
    maxX: map.offsetWidth - pinHalfWidth,
    minY: PinData.Y_RANGE[0] - PinData.FULL_HEIGHT,
    maxY: PinData.Y_RANGE[1] - PinData.FULL_HEIGHT,
    callback: setAddress
  });

  var init = function () {
    setAddress();
    pin.removeEventListener('mousedown', onMainPinMousedown);
    pin.removeEventListener('keydown', onMainPinKeydown);
  };

  var reset = function () {
    pin.setAttribute('style', 'left: ' + defaultPosition.x + 'px; top: ' + defaultPosition.y + 'px;');
    setAddress(true);

    pin.addEventListener('mousedown', onMainPinMousedown);
    pin.addEventListener('keydown', onMainPinKeydown);
  };

  window.mainPin = {
    init: init,
    reset: reset
  };
})();
