'use strict';

describe('Service: chromaticTheremin', function () {

  // load the service's module
  beforeEach(module('thereminAngApp'));

  // instantiate service
  var chromaticTheremin;
  beforeEach(inject(function (_chromaticTheremin_) {
    chromaticTheremin = _chromaticTheremin_;
  }));

  it('should do something', function () {
    expect(!!chromaticTheremin).toBe(true);
  });

});
