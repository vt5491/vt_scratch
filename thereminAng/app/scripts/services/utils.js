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

    var chromaticIntervals = [];
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
    chromaticIntervals[0] = 1.000000;
    chromaticIntervals[1] = 1.059463;
    chromaticIntervals[2] = 1.122462;
    chromaticIntervals[3] = 1.189207;
    chromaticIntervals[4] = 1.259921;
    chromaticIntervals[5] = 1.334839;
    chromaticIntervals[6] = 1.414213;
    chromaticIntervals[7] = 1.498307;
    chromaticIntervals[8] = 1.587401;
    chromaticIntervals[9] = 1.681792;
    chromaticIntervals[10] = 1.781797;
    chromaticIntervals[11] = 1.887748;

    var majorIntervals = [];

    majorIntervals[0] = 1.000000;
    majorIntervals[1] = 1.122462;
    majorIntervals[2] = 1.189207;
    majorIntervals[3] = 1.334839;
    majorIntervals[4] = 1.498307;
    majorIntervals[5] = 1.587401;
    majorIntervals[6] = 1.781797;
    
    var pentatonicIntervals = [];

    pentatonicIntervals[0] = 1.000000;
    pentatonicIntervals[1] = 1.189207;
    pentatonicIntervals[2] = 1.334839;
    pentatonicIntervals[3] = 1.498307;
    pentatonicIntervals[4] = 1.781797;
    
    var octaveZeroBaseFreq = 55;
    
    constr.mapFreqToTone = function () {
      return 7;
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
    
    constr.normalizeFreqToChromatic = function (freq) {
      return this.normalizeFreqToIntervalSet(freq, chromaticIntervals);
    };

    constr.normalizeFreqToMajor = function (freq) {
      return this.normalizeFreqToIntervalSet(freq, majorIntervals);
    };

    constr.normalizeFreqToPentatonic = function (freq) {
      return this.normalizeFreqToIntervalSet(freq, pentatonicIntervals);
    };

    constr.normalizeFreqToIntervalSet = function (freq, intervalSet) {
      // TODO: determine the octave.  Then normalize all frequencies
      // down to the 55-110 range.  Then find the interval.  Then
      // return ocatave number + relative freq (scaled up by 2x'ing as necessary)
      var nOctave;
      var baseFreq;
      var mappedFreq;

      nOctave = this.getOctave(freq);

      // Normalize the frequency to somwhere between 55 and 110
      baseFreq = freq / (Math.pow(2, nOctave));

      // Now get it as a relative ratio to 55.0
      var relativeBaseFreq = baseFreq / 55.0;

      // Find the first ratio in the interval that exceeds it
      for( var i=0; i < intervalSet.length; i++) {
        if( intervalSet[i] > relativeBaseFreq) {
          break;
        }; 
      };

      var relativeBaseFreq = baseFreq / 55.0;
      // The ratio index one below this the one we should map to
      var normalizedFreqMultiple = intervalSet[i - 1];

      // Unnormalize the matched ratio back to the proper octave range 
      mappedFreq = Math.round(normalizedFreqMultiple * 55.0 * (Math.pow( 2, nOctave)));

      //really weak error checking
      if (isNaN (mappedFreq)){
        mappedFreq = 0;
      };

      return mappedFreq;
      
    };
    return constr;
  });
