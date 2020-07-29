'use strict';
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createFeatures = function (offerData) {
    var featuresList = document.createDocumentFragment();
    for (var i = 0; i < offerData.offer.features.length; i++) {
      var newListItem = document.createElement('li');
      newListItem.classList.add('popup__feature', 'popup__feature--' + offerData.offer.features[i]);
      featuresList.appendChild(newListItem);
    }
    return featuresList;
  };

  var createImages = function (offerData) {
    var imagesList = document.createDocumentFragment();
    for (var i = 0; i < offerData.offer.photos.length; i++) {
      var newImageItem = document.createElement('img');
      newImageItem.classList.add('popup__photo');
      newImageItem.setAttribute('src', offerData.offer.photos[i]);
      newImageItem.setAttribute('alt', '');
      newImageItem.setAttribute('width', 45);
      newImageItem.setAttribute('height', 40);
      imagesList.appendChild(newImageItem);
    }
    return imagesList;
  };

  var renderCard = function (offerData, indexElement) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.setAttribute('data-id', indexElement);

    cardElement.querySelector('.popup__title').textContent = offerData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.OffersData.getTypeValue(offerData.offer.type, 'TITLE');
    cardElement.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offerData.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', offerData.author.avatar);
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeatures(offerData));
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createImages(offerData));

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };

})();
