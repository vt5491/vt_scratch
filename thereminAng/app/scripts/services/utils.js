'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.utils
 * @description
 * # utils
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .service('utils', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var constr = {};

    var chromaticInterval = [];
// A	440.00	20⁄12	1.000000
// A♯/B♭	466.16	21⁄12	1.059463
// B	493.88	22⁄12	1.122462
// C	523.25	23⁄12	1.189207
// C♯/D♭	554.37	24⁄12	1.259921
// D	587.33	25⁄12	1.334839
// D♯/E♭	622.25	26⁄12	1.414213
// E	659.26	27⁄12	1.498307
// F	698.46	28⁄12	1.587401
// F♯/G♭	739.99	29⁄12	1.681792
// G	783.99	210⁄12	1.781797
// G♯/A♭	830.61	211⁄12	1.887748
// A	880.00	212⁄12	2.000000
    chromaticInterval[0] = 1.000000;
    chromaticInterval[1] = 1.059463;
    chromaticInterval[2] = 1.122462;
    chromaticInterval[3] = 1.189207;
    chromaticInterval[4] = 1.259921;
    chromaticInterval[5] = 1.334839;
    chromaticInterval[6] = 1.414213;
    chromaticInterval[7] = 1.498307;
    chromaticInterval[8] = 1.587401;
    chromaticInterval[9] = 1.681792;
    chromaticInterval[10] = 1.781797;
    chromaticInterval[11] = 1.887748;

    var octaveZeroBaseFreq = 55;
    
    constr.mapFreqToTone = function () {
      return 7;
    };

    // normalize a frequency to it's nearest frequencey counterpart
    // in the chromatic scale
    constr.normalizeFreqToChromatic = function (freq) {
      return 7;
      // TODO: determine the octave.  Then normalize all frequencies
      // down to the 440-800 range.  Then find the interval.  Then
      // return ocatave number + relative freq (scaled up by 2x'ing as necessary)
    };

    // determine what octave range the freq is in, with 55hz being the
    // lowest.  (55, 110, 220, 440, 880.. ) maps to octave (0, 1, 2, 3, 4 ...)
    // Note: any freq below 'octaveZerobasefreq' (55hz) will be lumped into
    // octave zero.
    constr.getOctave = function (freq) {

      var baseFreq = octaveZeroBaseFreq; 
      var octave = -1;

      while (baseFreq <= freq && baseFreq < 15000) {
        baseFreq *= 2;
        octave++;
      };

      // map non-matching low freqs into octave zero
      if (octave === -1) {
        octave = 0;
      }

      return octave; 
    };

    return constr;
  });
