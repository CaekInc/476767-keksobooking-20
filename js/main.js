'use strict';
var ADVERTS_NUMBERS = 8;
var TITLES = ['Лофт', 'Дюплекс', '1 комнатная квартира', '2 комнатная квартира', 'Конура'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = ['классная', 'просторная', 'дешевая', 'дорогая', 'средняя', 'почти норм', '7', '8'];
var PIN_WIDTH_HALF = 25;
var PIN_HEIGHT = 70;
var blockMap = document.querySelector('.map');
// 1 создание функций и дефолтного объявления
var getRandom = function (lower, upper) {
  var min = Math.ceil(lower);
  var max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomSublist = function (array, ceil, floor) {
  var length = getRandom(ceil, floor);
  var newArray = array.slice();

  while (newArray.length > length) {
    newArray.splice(getRandom(0, newArray.length), 1);
  }

  return newArray;
};

var getRandomItemArray = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};

var createAdvert = function (i) {
  var X = getRandom(1, 1200);
  var Y = getRandom(130, 630);
  var advert = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    },
    offer: {
      title: getRandomItemArray(TITLES),
      address: X + ', ' + Y,
      price: getRandom(200, 1500),
      type: getRandomItemArray(TYPES),
      rooms: getRandom(1, 4),
      guests: getRandom(1, 6),
      checkin: getRandomItemArray(TIME_IN_OUT),
      checkout: getRandomItemArray(TIME_IN_OUT),
      features: getRandomSublist(FEATURES, 0, 5),
      description: getRandomItemArray(DESCRIPTIONS),
      photos: getRandomSublist(PHOTOS, 0, 2),
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
  for (var i = 0; i < ADVERTS_NUMBERS; i++) {
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
  pinElement.style.left = param.location.x - PIN_WIDTH_HALF + 'px';
  pinElement.style.top = param.location.y - PIN_HEIGHT + 'px';
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < createAdverts.length; i++) {
  fragment.appendChild(createPin(createAdverts[i]));
}

// blockMap.appendChild(fragment);

// убираем активные состояния input

var advertForm = document.querySelector('.ad-form');
var advertFormInputs = advertForm.querySelectorAll('input');
var adverFormFieldsets = advertForm.querySelectorAll('fieldset');
var advertPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');

var disableInputs = function (whatNeedDisable) {
  for (var advertFormInput of whatNeedDisable) {
    advertFormInput.setAttribute('disabled', true);
  }
};
disableInputs(advertFormInputs);
disableInputs(adverFormFieldsets);

// поиск адресса
var findAddress = function (pin) {
  var height = pin.style.top.replace(/[^-0-9]/gim,'');
  var width = pin.style.left.replace(/[^-0-9]/gim,'');
  addressInput.value = (+height + PIN_HEIGHT) + ', ' + (Number(width) + Number(PIN_WIDTH_HALF));
};

//  включаем активные состояния
var enableInputs = function (enable) {
  for (var advertFormInput of enable) {
    advertFormInput.removeAttribute('disabled');
  }
};

var enableForm = function () {
  enableInputs(advertFormInputs);
  enableInputs(adverFormFieldsets);
  blockMap.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  findAddress(advertPin);
};


advertPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 ) {
    enableForm();
  }
});

advertPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    enableForm();
  }
});

// валидация формы

