'use strict';
(function () {
  var blockMap = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');


  var addCardToMap = function (offerId) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      if (offerId === window.data.adverts[i].offer.id) {
        fragment.appendChild(window.card.renderCard(window.data.adverts[i]));
        break;
      }
    }
    blockMap.insertBefore(fragment, mapFilterContainer);
  };

  var addFragment = function () {
    var pins = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      pins.appendChild(window.pin.create(window.data.adverts[i]));
      break;
    }
    blockMap.appendChild(pins);
  };

  var removePins = function () {
    var children = mapPinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < children.length; i++) {
      mapPinsList.innerHTML = '';
    }
  };

  var openPopup = function (offerId) {
    var currentPopup = document.querySelector('.map .map__card');
    if (currentPopup) {
      var currentPopupId = currentPopup.getAttribute('data-id');
      currentPopup.remove();
      if (currentPopupId !== offerId) {
        addCardToMap(offerId);
      }
    } else {
      addCardToMap(offerId);
    }
  };

  var closePopup = function () {
    var currentPopup = document.querySelector('.map .map__card');
    if (currentPopup) {
      currentPopup.remove();
    }
  };

  var onMapEvent = function (evt) {
    var targetElement = evt.target;
    var pinBtn = window.utils.getClosestElement(targetElement, '.map__pin:not(.map__pin--main)');

    if (pinBtn && evt.type !== 'keydown') {
      var offerId = pinBtn.getAttribute('data-id');
      openPopup(offerId);
    }

    var isBtnClosePopup = targetElement.matches('.popup__close');
    var isBtnEsc = evt.key === 'Escape' ? true : false;
    if (isBtnClosePopup || isBtnEsc) {
      closePopup(evt, targetElement);
    }
  };

  var init = function () {
    addFragment(window.data.adverts);
    window.utils.enableInputs(mapFilterElements);
    blockMap.classList.remove('map--faded');
    blockMap.addEventListener('click', onMapEvent);
    blockMap.addEventListener('keydown', onMapEvent);
  };

  var destroy = function () {
    removePins(window.data.adverts);
    window.utils.disableInputs(mapFilterElements);
    blockMap.classList.add('map--faded');
    blockMap.removeEventListener('click', onMapEvent);
    blockMap.removeEventListener('keydown', onMapEvent);
  };

  window.map = {
    init: init,
    destroy: destroy
  };
})();
