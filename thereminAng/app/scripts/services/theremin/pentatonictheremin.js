'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.pentatonicTheremin
 * @description
 * # pentatonicTheremin
 * Factory in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .factory('pentatonicTheremin', ['theremin', 'utils', function (theremin, utils) {
    var constr = Object.create(theremin);
    
    constr.posSensitivityFactor = 50;

    constr.mapFreq = function (pos, maxFreq, posSensitivityFactor) {

      var freq;

      freq = maxFreq / 2.0 - Math.abs(pos * posSensitivityFactor);

      freq = utils.normalizeFreqToPentatonic(freq);

      return freq;
    };    

    return constr;
  }]);
