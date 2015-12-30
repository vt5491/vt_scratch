'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.thereminApp
 * @description
 * # thereminApp
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .service('thereminApp', function (standardTheremin) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var constr = [];

    
    constr.start = function () {
     console.log('thereminApp.start: now in start');

      standardTheremin.start();
      
    };     

    constr.stop = function () {
     console.log('thereminApp.stop: now in stop');

      standardTheremin.stop();
      
    };     

    constr.init = function () {
     console.log('thereminApp.init: now in init');

      standardTheremin.init();
      
    };     
    
    return constr;
  });
