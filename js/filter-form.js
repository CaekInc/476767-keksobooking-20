'use strict';
(function () {
  var mapFilterElements = document.querySelectorAll('.map__filters > *');
  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = document.querySelector('#housing-type');
  var loadedOffers;

  var filterOffers = function () {
    var type = houseTypeSelect.value;
    if (type !== 'any') {
      var filteredOffers = loadedOffers.filter(function (offer) {
        return offer.offer.type === type;
      });
      return filteredOffers;
    }
    return loadedOffers;
  };

  var onHouseTypeChange = function () {
    window.map.updatePins(filterOffers());
  };

  var init = function (offers) {
    loadedOffers = offers;
    window.utils.enableInputs(mapFilterElements);
    houseTypeSelect.addEventListener('change', onHouseTypeChange);
    window.map.updatePins(filterOffers());
  };

  var destroy = function () {
    window.utils.disableInputs(mapFilterElements);
    filterForm.reset();
    houseTypeSelect.removeEventListener('change', onHouseTypeChange);
  };

  window.filterForm = {
    init: init,
    destroy: destroy
  };
})();
