'use strict';
(function () {
  var blockMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var minY = window.data.pinData.Y[0];
  var maxY = window.data.pinData.Y[1];

  var pinHalfWidth = window.data.PIN_WIDTH_HALF;

  var pinРositionY = '';
  var pinPositionX = '';
  var maxXPosition = 0;

  var getPinPosition = function (isFullHeigth) {
    var pinHeight = isFullHeigth ? window.data.mainPinData.FULL_HEIGHT : Math.round(window.data.mainPinData.HEIGHT / 2);
    return (mainPin.offsetLeft + Math.round(window.data.mainPinData.WIDTH / 2)) + ', ' + (mainPin.offsetTop + pinHeight);
  };
  var setToStart = function () {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  };
  var onMainPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      addressInput.value = getPinPosition(true);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinPositionX = mainPin.offsetLeft - shift.x;
      pinРositionY = mainPin.offsetTop - shift.y;

      maxXPosition = blockMap.offsetWidth - pinHalfWidth;

      if (pinPositionX < -pinHalfWidth) {
        pinPositionX = -pinHalfWidth + 'px';
      }

      if (pinPositionX > maxXPosition) {
        pinPositionX = maxXPosition + 'px';
      }

      if (pinРositionY < minY) {
        pinРositionY = minY + 'px';
      }

      if (pinРositionY > maxY) {
        pinРositionY = maxY + 'px';
      }

      mainPin.style.left = pinPositionX + 'px';
      mainPin.style.top = pinРositionY + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  mainPin.addEventListener('mousedown', onMainPinMove);

  window.mainPin = {
    getPosition: getPinPosition,
    setToStart: setToStart
  };
})();
