'use strict';

describe('Service: thereminApp', function () {

  // load the service's module
  beforeEach(module('thereminAngApp'));

  // instantiate service
  var thereminApp;
  beforeEach(inject(function (_thereminApp_) {
    thereminApp = _thereminApp_;
  }));

  it('should do something', function () {
    expect(!!thereminApp).toBe(true);
  });

});
