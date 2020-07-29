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


  var pinData = {
    COUNT: 5,
    WIDTH: 50,
    HEIGHT: 70,
    Y: [130, 630]
  };
  var mainPinData = {
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 78
  };

  var OffersData = {
    TITLES: ['Лофт', 'Дюплекс', '1 комнатная квартира', '2 комнатная квартира', 'Конура', 'Заголовок 6', 'Заголовок 7' , 'Заголовок 8'],
    PRICE: [500, 100000],
    ROOMS: [1, 8],
    GUESTS: [1, 5],
    getTypeValue: function (name, value) {
      var findElement = this.TYPES.find(function (element) {
        return element.NAME === name;
      });
      return findElement[value];
    },
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: ['Описание 1', 'Описание 2', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  window.data.pinData = pinData;
  window.data.mainPinData = mainPinData;
  window.data.OffersData = OffersData;

})();
