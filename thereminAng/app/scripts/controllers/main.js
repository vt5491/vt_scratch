'use strict';

/**
 * @ngdoc function
 * @name thereminAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the thereminAngApp
 */
angular.module('thereminAngApp')
//['$rootScope', '$timeout', 'MyService', function($rootScope, $timeout, MyService)
  //.controller('MainCtrl', function ($scope, thereminApp) {
  .controller('MainCtrl',['$scope', 'thereminApp', function ($scope, thereminApp) {
    console.log("MainCtrl: entered");

    thereminApp.init();

    $scope.start = function () {
      thereminApp.start();
    };

    $scope.stop = function () {
      thereminApp.stop();
    };

    $scope.addOvertone = function (checked, multiplier) {
      thereminApp.addOvertone(checked, multiplier);
    };

    $scope.setWaveType = function (wave_type) {
      thereminApp.setWaveType(wave_type);
    };

    $scope.invertFreq = function (checked) {
      console.log('MainCtrl.invertFreq: checked=', checked)
      thereminApp.invertFreq = checked;
      thereminApp.bindController();
      console.log('MainCtrl.invertFreq: thereminApp.invertFreq=', thereminApp.invertFreq);
    };
  }]);
