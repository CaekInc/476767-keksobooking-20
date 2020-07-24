'use strict';
(function () {
  var getRandom = function (lower, upper) {
    var min = Math.ceil(lower);
    var max = Math.floor(upper);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomSublist = function (array, ceil, floor) {
    var length = getRandom(ceil, floor);
    var newArray = array.slice();

    while (newArray.length > length) {
      newArray.splice(getRandom(0, newArray.length), 1);
    }

    return newArray;
  };

  var getRandomItemArray = function (array) {
    return array[Math.floor(Math.random() * (array.length))];
  };

  var disableInputs = function (inputsForDisable) {
    inputsForDisable.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };
  var enableInputs = function (input) {
    input.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  window.utils = {
    getRandom: getRandom,
    getRandomSublist: getRandomSublist,
    getRandomItemArray: getRandomItemArray,
    disableInputs: disableInputs,
    enableInputs: enableInputs
  };
})();
