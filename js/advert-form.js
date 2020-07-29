'use strict';

(function () {
  var advertForm = document.querySelector('.ad-form');
  var advertFormElements = document.querySelectorAll('.ad-form > *');
  var advertFormResetBtn = document.querySelector('.ad-form__reset');
  var houseTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var checkInSelect = document.querySelector('#timein');
  var checkOutSelect = document.querySelector('#timeout');
  var roomsCountSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var guestsSelectOptions = guestsSelect.querySelectorAll('option');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var houseTypeMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var template;

  var syncPriceByHouseType = function () {
    var minPrice = houseTypeMinPrice[houseTypeSelect.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var onHouseTypeChange = function () {
    syncPriceByHouseType();
  };

  var syncSelects = function (source, target) {
    target.value = source.value;
  };

  var onCheckInChange = function (evt) {
    syncSelects(evt.target, checkOutSelect);
  };

  var onCheckOutChange = function (evt) {
    syncSelects(evt.target, checkInSelect);
  };

  var syncGuestsByRooms = function () {
    var roomsCount = roomsCountSelect.value;

    guestsSelectOptions.forEach(function (guestOption) {
      var matches = roomsForGuests[roomsCount].indexOf(guestOption.value) !== -1;

      if (matches) {
        guestOption.removeAttribute('disabled');
      } else {
        guestOption.setAttribute('disabled', matches);
      }

    });

    guestsSelect.value = guestsSelect.querySelector('option:not([disabled])').value;
  };

  var onRoomsCountChange = function () {
    syncGuestsByRooms();
  };

  var onLoad = function () {
    template = successTemplate.cloneNode(true);
    window.utils.showPopup(template);
    window.page.disable();
  };

  var onError = function () {
    template = errorTemplate.cloneNode(true);
    window.utils.showPopup(template);
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(advertForm), onLoad, onError);
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    window.page.disable();
  };

  var init = function () {
    advertForm.classList.remove('ad-form--disabled');
    window.utils.enableFormElements(advertFormElements);

    houseTypeSelect.addEventListener('change', onHouseTypeChange);
    roomsCountSelect.addEventListener('change', onRoomsCountChange);
    checkInSelect.addEventListener('change', onCheckInChange);
    checkOutSelect.addEventListener('change', onCheckOutChange);
    advertForm.addEventListener('submit', onAdFormSubmit);
    advertFormResetBtn.addEventListener('click', onResetClick);

  };

  var destroy = function () {
    advertForm.classList.add('ad-form--disabled');
    window.utils.disableFormElements(advertFormElements);

    houseTypeSelect.removeEventListener('change', onHouseTypeChange);
    roomsCountSelect.removeEventListener('change', onRoomsCountChange);
    checkInSelect.removeEventListener('change', onCheckInChange);
    checkOutSelect.removeEventListener('change', onCheckOutChange);
    advertForm.removeEventListener('submit', onAdFormSubmit);
    advertFormResetBtn.removeEventListener('click', onResetClick);

    advertForm.reset();
    syncPriceByHouseType();
    syncGuestsByRooms();
  };

  window.advertForm = {
    init: init,
    destroy: destroy
  };
})();
