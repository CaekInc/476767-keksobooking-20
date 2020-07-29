'use strict';

(function () {
  var enable = function () {
    window.map.init();
    window.advertForm.init();
  };

  var disable = function () {
    window.map.destroy();
    window.advertForm.destroy();
  };

  disable();

  window.page = {
    disable: disable,
    enable: enable
  };
})();
