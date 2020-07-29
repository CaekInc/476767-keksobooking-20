'use strict';
(function () {
  var advertForm = document.querySelector('.ad-form');
  var inputs = advertForm.querySelectorAll('input');
  var adverFormFieldsets = advertForm.querySelectorAll('fieldset');
  var advertPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var blockMap = document.querySelector('.map');

  var findAddress = function (pin) {
    var height = pin.style.top.replace(/[^-0-9]/gim, '');
    var width = pin.style.left.replace(/[^-0-9]/gim, '');
    addressInput.value = (+height + window.data.PIN_HEIGHT) + ', ' + (Number(width) + Number(window.data.PIN_WIDTH_HALF));
  };

  window.utils.disableInputs(inputs);
  window.utils.disableInputs(adverFormFieldsets);

  var enableForm = function () {
    window.utils.enableInputs(inputs);
    window.utils.enableInputs(adverFormFieldsets);
    blockMap.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    findAddress(advertPin);
  };

  advertPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      enableForm();
    }
  });

  advertPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enableForm();
    }
  });
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  // связываем инпуты на вьезд и выезд
  inputTimeIn.addEventListener('change', function () {
    inputTimeOut.value = inputTimeIn.value;
  });
  inputTimeOut.addEventListener('change', function () {
    inputTimeIn.value = inputTimeOut.value;
  });
  // ограничваем цену за ночь

  var typeOfHouse = document.querySelector('#type');
  var priceByNight = document.querySelector('#price');

  typeOfHouse.addEventListener('change', function () {
    if (typeOfHouse.value === 'bungalo') {
      priceByNight.min = 0;
    } else if (typeOfHouse.value === 'flat') {
      priceByNight.min = 1000;
    } else if (typeOfHouse.value === 'house') {
      priceByNight.min = 5000;
    } else if (typeOfHouse.value === 'palace') {
      priceByNight.min = 10000;
    }
  });

  // ограничиваем количество комнат и гостей

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var roomCapacityOptions = roomCapacity.querySelectorAll('option');
  var changeRoom = function () {
    var roomChoice = +roomNumber.value;
    for (var i = 0; i < roomCapacityOptions.length; i++) {
      var guestsOption = roomCapacity.options[i];
      var guestsValue = +guestsOption.value;
      guestsOption.setAttribute('disabled', true);

      if (roomChoice === 100 && guestsValue === 0) {
        guestsOption.removeAttribute('disabled');
      } else if (roomChoice !== 100 && roomChoice >= guestsValue && guestsValue !== 0) {
        guestsOption.removeAttribute('disabled');
      }
    }
    roomCapacity.value = roomCapacity.querySelector('option:not([disabled])').value;
  };
  roomNumber.addEventListener('change', changeRoom);

  var mainElement = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageElement;

  var createMessage = function () {
    messageElement.addEventListener('click', onMessageClose);
    document.body.addEventListener('keydown', onMessageClose);
    mainElement.insertAdjacentElement('afterbegin', messageElement);
  };

  var onMessageClose = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      messageElement.removeEventListener('click', onMessageClose);
      document.body.removeEventListener('keydown', onMessageClose);
      messageElement.remove();
    }
  };

  var onLoad = function () {
    messageElement = successTemplate.cloneNode(true);
    createMessage();
    window.main.disablePage();
  };

  var onError = function () {
    messageElement = errorTemplate.cloneNode(true);
    createMessage();
  };

  advertForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(advertForm), onLoad, onError);
    evt.preventDefault();
  });

  var advertFormReset = function () {
    advertForm.reset();
    window.mainPin.setToStart();
    addressInput.value = window.mainPin.getPosition();
  };

  var adFormResetBtn = document.querySelector('.ad-form__reset');

  adFormResetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    advertFormReset();
  });

  var disableForm = function () {
    advertForm.classList.add('ad-form--disabled');
    window.utils.disableInputs(inputs);
    // addressInput.value = window.mainPin.getPosition();
    advertFormReset();
  };

  window.advertForm = {
    init: enableForm,
    destroy: disableForm
  };

}());
