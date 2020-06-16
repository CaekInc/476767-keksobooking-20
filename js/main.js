'use strict';
var ADVERTS_NUMBERS = 8;
var TITLES = ['Лофт', 'Дюплекс', '1 комнатная квартира', '2 комнатная квартира', 'Конура'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = ['классная', 'просторная', 'дешевая', 'дорогая', 'средняя', 'почти норм', '7', '8'];
var blockMap = document.querySelector('.map');

var getRandom = function (lower, upper) {
  var min = Math.ceil(lower);
  var max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min)) + min;
};


// for (var i = 0; i === ADVERTS_NUMBERS; i++) {
//   var adverts = [];
//   var createAdvert = function () {
//     adverts[i] = {
//       author: {
//         avatar: 'img/avatats/user0' + i
//       }
//     },
//     {
//       offer: {
//         title: '',
//         address: '',
//         price: 1,

//       }
//     },

//   };
// }

var getRandomАrray = function (ceil, floor, name) {
  var length = getRandom(ceil, floor);
  var newArray = name.slice();

  while (newArray.length > length) {
    newArray.splice(getRandom(ceil, newArray.length), 1);
  }

  return newArray;
};


var createAdvert = function (i) {
  var X = getRandom(1, 1200);
  var Y = getRandom(130, 630);

  var advert = {
    author: {
      avatar: 'img/avatats/user0' + i + '.png',
    },
    offer: {
      title: TITLES [i % TITLES.length],
      address: X + ', ' + Y,
      price: getRandom(200, 1500),
      type: TYPES [i % TYPES.length],
      rooms: getRandom(1, 4),
      guests: getRandom(1, 6),
      checkin: TIME_IN_OUT[i % TIME_IN_OUT.length],
      checkout: TIME_IN_OUT[i % TIME_IN_OUT.length],
      features: getRandomАrray(0, 5, FEATURES),
      description: DESCRIPTIONS[i % DESCRIPTIONS.length],
      photos: getRandomАrray(0, 2, PHOTOS),
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


// 2

blockMap.classList.remove('map--faded');

// 3
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (param) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.children[0].src = param.author.avatar;
  pinElement.children[0].alt = param.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < createAdverts.length; i++) {
  fragment.appendChild(createPin(createAdverts[i]));
}

blockMap.appendChild(fragment);
