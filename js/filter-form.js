'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');

  var filterSelects = filterForm.querySelectorAll('select.map__filter');
  var filterCheckboxes = filterForm.querySelectorAll('input.map__checkbox');

  var loadedOffers = [];
  var filteredOffers = [];

  var filterByPrice = function (price, range) {
    switch (range) {
      case 'low':
        return price < 10000;
      case 'middle':
        return price >= 10000 && price <= 50000;
      case 'high':
        return price > 50000;
      default:
        return true;
    }
  };

  var filterOffers = function () {
    filteredOffers = loadedOffers;
    var i;

    for (i = 0; i < filterSelects.length; i++) {
      if (filterSelects[i].value === 'any') {
        continue;
      }

      if (filterSelects[i].name === 'housing-price') {
        filteredOffers = filteredOffers.filter(function (item) {
          return filterByPrice(item.offer.price, filterSelects[i].value);
        });
      } else {
        filteredOffers = filteredOffers.filter(function (item) {
          var value = filterSelects[i].name.split('-')[1];
          return item.offer[value].toString() === filterSelects[i].value;
        });
      }
    }

    for (i = 0; i < filterCheckboxes.length; i++) {
      if (filterCheckboxes[i].checked) {
        filteredOffers = filteredOffers.filter(function (item) {
          return item.offer.features.indexOf(filterCheckboxes[i].value) !== -1;
        });
      }
    }

    return filteredOffers;
  };

  var onFilterFormChange = function (evt) {
    window.map.updatePins(filterOffers(evt));
  };

  var init = function (offers) {
    loadedOffers = offers;

    window.utils.enableInputs(mapFilterElements);
    filterForm.addEventListener('change', onFilterFormChange);
    window.map.updatePins(filterOffers());
  };

  var destroy = function () {
    window.utils.disableInputs(mapFilterElements);
    filterForm.reset();
    filterForm.removeEventListener('change', onFilterFormChange);
  };

  window.filterForm = {
    init: init,
    destroy: destroy
  };
})();
