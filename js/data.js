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
  window.data.adverts = createAdverts;

})();
