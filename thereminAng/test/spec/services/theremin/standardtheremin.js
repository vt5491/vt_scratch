'use strict';

describe('Service: standardTheremin', function () {

  // load the service's module
  beforeEach(module('thereminAngApp'));

  // instantiate service
  // var standardTheremin;
  // beforeEach(inject(function (_standardTheremin_) {
  //   console.log('beforeEach: now in zeroeth beforeEach');
  //   standardTheremin = _standardTheremin_;
  // }));

  var mockTheremin, standardTheremin;
  
  beforeEach(function(){
    //console.log('beforeEach: now in first beforeEach');
    module(function($provide){
      $provide.service('theremin', function(){
        this.getMaxFreq = function () { return 2500;};
        this.posSensitivityFactor = 50;
        //this.abc = function () { return 7;};
      });
    });
    //module('thereminAngApp');
  });

  // beforeEach(function(){
  //   console.log('now in beforeEach 2');
  // });
  
  beforeEach(inject(function(_theremin_, _standardTheremin_){
    //console.log('now in beforeEach 3');
    //console.log('beforeEach: _standardTheremin_=', _standardTheremin_);
    mockTheremin = _theremin_;
    standardTheremin = _standardTheremin_;
    standardTheremin.posSensitivityFactor = 50;
  }));

  // it('should do something', function () {
  //   expect(!!standardTheremin).toBe(true);
  // });

  // it('init works properly', function () {
  //   standardTheremin.init(parms);
  
  //   expect(standardTheremin.mapFreq()).toEqual(7);
  // });

  it('mapFreq works properly', function () {
    //console.log('ut: standardTheremin=', standardTheremin);
    //console.log('ut: standardTheremin.theremin.abc()=', standardTheremin.theremin);
    //(handPos, theremin_local.getMaxFreq()
    //handPos, theremin_local.getMaxFreq(), theremin_local.posSensitivityFactor)
     expect(standardTheremin.mapFreq(10, standardTheremin.getMaxFreq(), standardTheremin.posSensitivityFactor )).toEqual(2000);
  });

});
