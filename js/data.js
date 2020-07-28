'use strict';
(function () {
  window.data = {
    ADVERTS_NUMBERS: 8,
    TITLES: ['Лофт', 'Дюплекс', '1 комнатная квартира', '2 комнатная квартира', 'Конура'],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    TIME_IN_OUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    DESCRIPTIONS: ['классная', 'просторная', 'дешевая', 'дорогая', 'средняя', 'почти норм', '7', '8'],
    PIN_WIDTH_HALF: 25,
    PIN_HEIGHT: 70,
  };

  var BlockMap = document.querySelector('.map');
  var createAdvert = function (i) {
    var X = window.utils.getRandom(1, 1200);
    var Y = window.utils.getRandom(130, 630);
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: window.utils.getRandomItemArray(window.data.TITLES),
        address: X + ', ' + Y,
        price: window.utils.getRandom(200, 1500),
        type: window.utils.getRandomItemArray(window.data.TYPES),
        rooms: window.utils.getRandom(1, 4),
        guests: window.utils.getRandom(1, 6),
        checkin: window.utils.getRandomItemArray(window.data.TIME_IN_OUT),
        checkout: window.utils.getRandomItemArray(window.data.TIME_IN_OUT),
        features: window.utils.getRandomSublist(window.data.FEATURES, 0, 5),
        description: window.utils.getRandomItemArray(window.data.DESCRIPTIONS),
        photos: window.utils.getRandomSublist(window.data.PHOTOS, 0, 2),
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
    for (var i = 0; i < window.data.ADVERTS_NUMBERS; i++) {
      adverts.push(createAdvert(i));
    }
    return adverts;
  };

  var createAdverts = createNewAdverts();
  var pinData = {
    COUNT: 8,
    WIDTH: 50,
    HEIGHT: 70,
    Y: [130, 630]
  };
  var mainPinData = {
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 78
  };
  var pinsXRange = [pinData.WIDTH / 2, BlockMap.offsetWidth - pinData.WIDTH / 2];
  var pinsYRange = [pinData.Y[0] + pinData.HEIGHT, pinData.Y[1] + pinData.HEIGHT];
  var OffersData = {
    TITLES: ['Заголовок 1', 'Заголовок 2', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'],
    PRICE: [500, 100000],
    ROOMS: [1, 8],
    GUESTS: [1, 5],
    TYPES: [
      {NAME: 'palace', TITLE: 'Дворец', MIN_PRICE: 10000},
      {NAME: 'flat', TITLE: 'Квартира', MIN_PRICE: 1000},
      {NAME: 'house', TITLE: 'Дом', MIN_PRICE: 5000},
      {NAME: 'bungalo', TITLE: 'Бунгало', MIN_PRICE: 0}
    ],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: ['Описание 1', 'Описание 2', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  window.data.adverts = createAdverts;
  window.data.pinData = pinData;
  window.data.mainPinData = mainPinData;
  window.data.OffersData = OffersData;

})();
