'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.chromaticTheremin
 * @description
 * # chromaticTheremin
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .factory('chromaticTheremin', ['theremin', 'utils', function (theremin, utils) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var constr = Object.create(theremin);

    constr.posSensitivityFactor = 50;
    
    constr.mapFreq = function (pos, maxFreq, posSensitivityFactor) {

      var freq;

      freq = maxFreq / 2.0 - Math.abs(pos * posSensitivityFactor);

      freq = utils.normalizeFreqToChromatic(freq);

      return freq;
    };    

    return constr;
}]);
