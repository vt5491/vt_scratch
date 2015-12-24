'use strict';

describe('Service: theremin', function () {

  // load the service's module
  beforeEach(module('thereminAngApp'));

  // instantiate service
  var theremin;
  beforeEach(inject(function (_theremin_) {
    theremin = _theremin_;
  }));

  it('should do something', function () {
    expect(!!theremin).toBe(true);
  });

});
