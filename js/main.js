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

var getRandomSublist = function (array) {
  return array.slice(0, Math.random() * (array.length + 1));
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
      features: getRandomSublist(FEATURES),
      description: getRandomItemArray([DESCRIPTIONS]),
      photos: getRandomSublist(PHOTOS),
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

// 2 удаления класса и показ карты

blockMap.classList.remove('map--faded');

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

blockMap.appendChild(fragment);
