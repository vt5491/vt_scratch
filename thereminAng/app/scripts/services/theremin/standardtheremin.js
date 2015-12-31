'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.standardTheremin
 * @description
 * # standardTheremin
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  //.controller('MainCtrl',['$scope', 'thereminApp', function ($scope, thereminApp) {
  .factory('standardTheremin', [ 'theremin', function ( theremin) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //var ChildService = Object.create(BaseService);
    //var constr = [];
    //var contr = Object.create()
    // inherit off base class
    var constr = Object.create(theremin);

    constr.posSensitivityFactor = 50;
    
    // constr.init = function (parms) {
    //   maxFreq = parms.maxFreq;
    // };
    
    constr.mapFreq = function (pos, maxFreq, posSensitivityFactor) {
    //constr.prototype.mapFreq = function (pos) {
      //console.log('theremin.MAX_FREQ=', theremin.getMaxFreq());
      //console.log('standardTheremin.mapFreq: this.MAX_FREQ=', this.getMaxFreq());
      //console.log('standardTheremin.mapFreq: this.MAX_FREQ=', maxFreq);

      var freq;

      //freq = theremin.getMaxFreq() - Math.abs(pos * this.posSensitivityFactor);
      //freq = this.getMaxFreq() - Math.abs(pos * this.posSensitivityFactor);
      //freq = maxFreq - Math.abs(pos * this.posSensitivityFactor);
      freq = maxFreq - Math.abs(pos * posSensitivityFactor);

      return freq;
    };


    // constr.frameHandler = function (frame) {
    //   this.ctrlFrameHandler(frame, this.)
    // };
    // $scope.$on('freqMapEvent', function (pos) {
    //   var freq;
    //   //body...
    //   freq = this.mapFreq(pos);

    //   $scope.$emit('freqMapEvent-response', freq);
    // });
    
    return constr;
    
  }]);

