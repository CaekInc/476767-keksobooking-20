
'use strict';

(function () {
  var init = function (params) {
    var current = {};

    var getBound = function (value, min, max) {
      if (value < min) {
        value = min;
      } else if (value > max) {
        value = max;
      }
      return value;
    };

    var setMoveBounds = function () {
      current.x = getBound(current.x, params.minX, params.maxX);
      current.y = getBound(current.y, params.minY, params.maxY);
    };

    var onMainPinMove = function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;

        current.x = params.element.offsetLeft - shift.x;
        current.y = params.element.offsetTop - shift.y;

        setMoveBounds();

        params.element.setAttribute('style', 'left: ' + current.x + 'px; top: ' + current.y + 'px;');

        params.callback();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    params.element.addEventListener('mousedown', onMainPinMove);
  };

  window.move = {
    init: init
  };
})();
