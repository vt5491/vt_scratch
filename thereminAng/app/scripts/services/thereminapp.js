'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.thereminApp
 * @description
 * # thereminApp
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .factory('thereminApp', [ 'standardTheremin', 'chromaticTheremin', function (standardTheremin, chromaticTheremin) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var constr = [];

    
    constr.start = function () {
     console.log('thereminApp.start: now in start');

      chromaticTheremin.start();
      
    };     

    constr.stop = function () {
     console.log('thereminApp.stop: now in stop');

      chromaticTheremin.stop();
      
    };     

    constr.init = function () {
     console.log('thereminApp.init: now in init');

      chromaticTheremin.init();
      
    };     
    
    return constr;
  }]);
