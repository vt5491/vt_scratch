'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.majorTheremin
 * @description
 * # majorTheremin
 * Factory in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .factory('majorTheremin', ['theremin', 'utils', function (theremin, utils){
    var constr = Object.create(theremin);
    
    constr.posSensitivityFactor = 50;

    constr.mapFreq = function (pos, maxFreq, posSensitivityFactor) {

      var freq;

      freq = maxFreq / 2.0 - Math.abs(pos * posSensitivityFactor);

      freq = utils.normalizeFreqToMajor(freq);

      return freq;
    };    

    return constr;
  }]);
