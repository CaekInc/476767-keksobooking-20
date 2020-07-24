'use strict';

var blockMap = document.querySelector('.map');
// 1 создание функций и дефолтного объявления


var createAdvert = function (i) {
  var X = document.utils.getRandom(1, 1200);
  var Y = document.utils.getRandom(130, 630);
  var advert = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    },
    offer: {
      title: document.utils.getRandomItemArray(document.data.TITLES),
      address: X + ', ' + Y,
      price: document.utils.getRandom(200, 1500),
      type: document.utils.getRandomItemArray(document.data.TYPES),
      rooms: document.utils.getRandom(1, 4),
      guests: document.utils.getRandom(1, 6),
      checkin: document.utils.getRandomItemArray(document.data.TIME_IN_OUT),
      checkout: document.utils.getRandomItemArray(document.data.TIME_IN_OUT),
      features: document.utils.getRandomSublist(document.data.FEATURES, 0, 5),
      description: document.utils.getRandomItemArray(document.data.DESCRIPTIONS),
      photos: document.utils.getRandomSublist(document.data.PHOTOS, 0, 2),
    },
    location: {
      x: X,
      y: Y
    }
  };
  return advert;
};

var createNewAdverts = function () {
  var adverts = [];
  for (var i = 0; i < document.data.ADVERTS_NUMBERS; i++) {
    adverts.push(createAdvert(i));
  }
  return adverts;
};

var createAdverts = createNewAdverts();

// 3 создание объявлений
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (param) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinImage.src = param.author.avatar;
  pinImage.alt = param.offer.title;
  pinElement.style.left = param.location.x - document.data.PIN_WIDTH_HALF + 'px';
  pinElement.style.top = param.location.y - document.data.PIN_HEIGHT + 'px';
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < createAdverts.length; i++) {
  fragment.appendChild(createPin(createAdverts[i]));
}

// blockMap.appendChild(fragment);

// убираем активные состояния input

var advertForm = document.querySelector('.ad-form');
var inputs = advertForm.querySelectorAll('input');
var adverFormFieldsets = advertForm.querySelectorAll('fieldset');
var advertPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');


document.utils.disableInputs(inputs);
document.utils.disableInputs(adverFormFieldsets);

// поиск адресса
var findAddress = function (pin) {
  var height = pin.style.top.replace(/[^-0-9]/gim, '');
  var width = pin.style.left.replace(/[^-0-9]/gim, '');
  addressInput.value = (+height + document.data.PIN_HEIGHT) + ', ' + (Number(width) + Number(document.data.PIN_WIDTH_HALF));
};


var enableForm = function () {
  document.utils.enableInputs(inputs);
  document.utils.enableInputs(adverFormFieldsets);
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

// валидация формы

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
  for (i = 0; i < roomCapacityOptions.length; i++) {
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
