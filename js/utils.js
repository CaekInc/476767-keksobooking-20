'use strict';

(function () {
  var ERROR_TIMEOUT = 5000;
  var DEBOUNCE_TIMEOUT = 500;
  var MOUSE_LEFT_BUTTON = 0;
  var KeyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  var popupContainer = document.querySelector('main');
  var popup;

  var isEnterPressed = function (evt) {
    return evt.keyCode === KeyCode.ENTER;
  };

  var isEscapePressed = function (evt) {
    return evt.keyCode === KeyCode.ESCAPE;
  };

  var isMouseLeftClicked = function (evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, arguments);
      }, DEBOUNCE_TIMEOUT);
    };
  };

  var getClosestElement = function (element, selector) {
    while (element) {
      if (element.matches(selector)) {
        return element;
      } else {
        element = element.parentElement;
      }
    }
    return null;
  };

  var disableFormElements = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
  };

  var enableFormElements = function (elements) {
    elements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var showErrorNotification = function (text) {
    var error = document.createElement('div');
    error.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background:#ff5635; padding: 10px 50px; color: white; font-size: 20px; margin-bottom: 10px; border-radius: 5px;';
    error.textContent = text;
    document.body.insertAdjacentElement('afterEnd', error);
    setTimeout(function () {
      error.remove();
    }, ERROR_TIMEOUT);
  };

  var onCloseClick = function () {
    popup.remove();
  };

  var onCloseKeydown = function (evt) {
    if (window.utils.isEscapePressed(evt)) {
      popup.remove();
      document.body.removeEventListener('keydown', onCloseKeydown);
    }
  };

  var showPopup = function (template) {
    popup = template;
    popupContainer.insertAdjacentElement('afterbegin', popup);
    popup.addEventListener('click', onCloseClick);
    document.body.addEventListener('keydown', onCloseKeydown);
  };

  window.utils = {
    isEnterPressed: isEnterPressed,
    isEscapePressed: isEscapePressed,
    isMouseLeftClicked: isMouseLeftClicked,
    debounce: debounce,
    getClosestElement: getClosestElement,
    disableFormElements: disableFormElements,
    enableFormElements: enableFormElements,
    showErrorNotification: showErrorNotification,
    showPopup: showPopup
  };
})();
