'use strict';

describe('Service: utils', function () {

  // load the service's module
  beforeEach(module('thereminAngApp'));

  // instantiate service
  var utils;
  beforeEach(inject(function (_utils_) {
    utils = _utils_;
  }));

  it('should do something', function () {
    expect(!!utils).toBe(true);
  });

  it('mapFreqToTone maps a frequencey to the proper tone', function () {
    var result = utils.mapFreqToTone();
    expect(result).toEqual(7);
  });

  it('normalizeFreqToChromatic maps a frequencey to the proper tone', function () {
    var result = utils.normalizeFreqToChromatic(500);
    expect(result).toEqual(494);
  });

  it('getOctave maps a frequencey to the proper tone', function () {
    expect(utils.getOctave(440.0)).toEqual(3);
    expect(utils.getOctave(500.0)).toEqual(3);
    expect(utils.getOctave(20.0)).toEqual(0);
  });
});
