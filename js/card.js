'use strict';

(function () {
  var CardImage = {
    WIDTH: 45,
    HEIGHT: 40,
  };

  var cardMock = document.querySelector('#card').content.querySelector('.map__card');
  var houseTypeTitle = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var createFeatures = function (features) {
    var featuresList = document.createDocumentFragment();

    features.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresList.appendChild(listItem);
    });

    return featuresList;
  };

  var createImages = function (urls) {
    var imagesList = document.createDocumentFragment();

    urls.forEach(function (url) {
      var image = document.createElement('img');
      image.classList.add('popup__photo');
      image.setAttribute('src', url);
      image.setAttribute('alt', '');
      image.setAttribute('width', CardImage.WIDTH);
      image.setAttribute('height', CardImage.HEIGHT);
      imagesList.appendChild(image);
    });

    return imagesList;
  };

  var showOptionalProperties = function (element, selector, data) {
    var node = element.querySelector(selector);

    if (data.length || data.children.length) {
      node.innerHTML = '';

      if (typeof data === 'string') {
        node.textContent = data;
      } else {
        node.appendChild(data);
      }
    } else {
      node.remove();
    }
  };

  var create = function (data, id) {
    var card = cardMock.cloneNode(true);

    card.setAttribute('data-id', id);
    card.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = houseTypeTitle[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    showOptionalProperties(card, '.popup__description', data.offer.description);
    showOptionalProperties(card, '.popup__features', createFeatures(data.offer.features));
    showOptionalProperties(card, '.popup__photos', createImages(data.offer.photos));

    return card;
  };

  window.card = {
    create: create
  };
})();
