'use strict';

(function () {
  var NON_FILTERED_VALUE = 'any';
  var FILTER_PRICE_NAME = 'housing-price';

  var filterForm = document.querySelector('.map__filters');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');
  var filterSelects = filterForm.querySelectorAll('select.map__filter');
  var filterCheckboxes = filterForm.querySelectorAll('input.map__checkbox');
  var priceRange = {
    'low': [0, 9999],
    'middle': [10000, 50000],
    'high': [50001, Infinity],
  };
  var loadedOffers = [];
  var filteredOffers = [];

  var filterByPrice = function (price, range) {
    return price >= priceRange[range][0] && price <= priceRange[range][1];
  };

  var filterOffers = function () {
    filteredOffers = loadedOffers;
    var i;

    for (i = 0; i < filterSelects.length; i++) {
      if (filterSelects[i].value === NON_FILTERED_VALUE) {
        continue;
      }

      if (filterSelects[i].name === FILTER_PRICE_NAME) {
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

  var onFilterFormChange = window.utils.debounce(function (evt) {
    window.map.updatePins(filterOffers(evt));
  });

  var init = function (offers) {
    loadedOffers = offers;
    window.utils.enableFormElements(mapFilterElements);
    filterForm.addEventListener('change', onFilterFormChange);
    window.map.updatePins(filterOffers());
  };

  var destroy = function () {
    window.utils.disableFormElements(mapFilterElements);
    filterForm.reset();
    filterForm.removeEventListener('change', onFilterFormChange);
  };

  window.filterForm = {
    init: init,
    destroy: destroy
  };
})();
