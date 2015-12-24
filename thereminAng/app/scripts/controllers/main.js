'use strict';

/**
 * @ngdoc function
 * @name thereminAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the thereminAngApp
 */
angular.module('thereminAngApp')
  .controller('MainCtrl', function ($scope, theremin) {
    console.log("MainCtrl: entered");

    theremin.init();

    $scope.start = function () {
      theremin.start();
    }

    $scope.stop = function () {
      theremin.stop();
    }

    $scope.addOvertone = function (checked, multiplier) {
      theremin.addOvertone(checked, multiplier);
    }

    $scope.setWaveType = function (wave_type) {
      theremin.setWaveType(wave_type);
    }

    $scope.invertFreq = function (checked) {
      console.log('MainCtrl.invertFreq: checked=', checked)
      theremin.invertFreq = checked;
      theremin.bindController();
      console.log('MainCtrl.invertFreq: theremin.invertFreq=', theremin.invertFreq);
    }
  });
