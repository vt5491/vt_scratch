'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.thereminApp
 * @description
 * # thereminApp
 * Service in the thereminAngApp.
 */

// this is called by the MainCtrl controller.  It is a front-end to all the subclasses
// of theremin.  Thus it serves as a sort of facade pattern
angular.module('thereminAngApp')
  .factory('thereminApp', [ 'standardTheremin', 'chromaticTheremin', 'majorTheremin', 'pentatonicTheremin', function (standardTheremin, chromaticTheremin, majorTheremin, pentatonicTheremin) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var constr = [];
    var theremin = pentatonicTheremin;

    
    constr.start = function () {
     console.log('thereminApp.start: now in start');

      theremin.start();
      
    };     

    constr.stop = function () {
     console.log('thereminApp.stop: now in stop');

      theremin.stop();
      
    };     

    constr.init = function () {
     console.log('thereminApp.init: now in init');

      theremin.init();
    };     
    
    constr.bindController = function () {
     console.log('thereminApp.bindController: now in bindController');

      theremin.bindController();
    };     
    
    constr.setWaveType = function (wave_type) {
     console.log('thereminApp.setWaveType: now in setWaveType');

      theremin.setWaveType(wave_type);
      
    };     
    
    constr.setThereminType = function (theremin_type) {
      console.log('thereminApp.setThereminType: now in setThereminType');

      //theremin.setThereminType(theremin_type);
      // stop the old theremin
      // TODO: consider using this.stop() and for subsequent calls
      theremin.stop();

      switch(theremin_type) {
      case "standard":
        theremin = standardTheremin;
        break;
      case "chromatic":
        theremin = chromaticTheremin;
        break;
      case "major":
        theremin = majorTheremin;
        break;
      case "pentatonicTheremin":
        theremin = pentatonicTheremin;
        break;
      default:
        theremin = standardTheremin;
      }

      // init the new theremin
      theremin.init();
      theremin.start();
    };     
    
    constr.addOvertone = function (checked, multiplier) {
     console.log('thereminApp.addOvertone: now in addOvertone');

      theremin.addOvertone(checked, multiplier);
      
    };     
    
    constr.invertFreq = function (checked) {
      theremin.invertFreq(checked);
    };
    
    return constr;
  }]);
