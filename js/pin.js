'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var createPin = function (param) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinImage.src = param.author.avatar;
    pinImage.alt = param.offer.title;
    pinElement.style.left = param.location.x - window.data.PIN_WIDTH_HALF + 'px';
    pinElement.style.top = param.location.y - window.data.PIN_HEIGHT + 'px';
    return pinElement;
  };
  var getOfferType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return '';
    }
  };

  var createFeatures = function (featuresSelector, data) {
    featuresSelector.innerHTML = '';
    for (var i = 0; i < window.data.FEATURES.length; i++) {
      var newListItem = document.createElement('li');
      newListItem.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
      featuresSelector.appendChild(newListItem);
    }
  };
  var createImages = function (photosSelector, data) {
    photosSelector.innerHTML = '';
    for (var i = 0; i < window.data.PHOTOS.length; i++) {
      var newImage = document.createElement('img');
      newImage.classList.add('popup__photo');
      newImage.setAttribute('src', window.data.PHOTOS[i]);
      newImage.setAttribute('alt', '');
      newImage.setAttribute('width', 45);
      newImage.setAttribute('height', 40);
      photosSelector.appendChild(newImage);
    }
  };

  window.pin = {
    create: createPin
  };
})();
