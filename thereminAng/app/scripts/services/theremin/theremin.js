'use strict';

/**
 * @ngdoc service
 * @name thereminAngApp.theremin
 * @description
 * # theremin
 * Service in the thereminAngApp.
 */
angular.module('thereminAngApp')
  .factory('theremin', [ function () {
     var MAX_FREQ = 2500;

     var factory = function () {
     };

    // this returns a closure via a factory method.  We need a closure because
    // we need to bring in 'oscs' and 'baseFreq' from our context into the runtime
    //context of the LeapMotion.
     factory.ctrlFrameHandler = function (frame) {
       var theremin_local = this;

       var ctrlFrameHandler = function (frame) {
         if (frame.hands.length > 0) {
           var hand = frame.hands[0];
           var handPos = hand.palmPosition[2] / 3.0;
           var newFreq;

           if (theremin_local.invertFreq) {
             newFreq = MAX_FREQ - Math.abs(handPos * 50);

             if (newFreq < 0) {
               newFreq = 0;
             }
           }
           else {
             newFreq = theremin_local.mapFreq(handPos, theremin_local.getMaxFreq(), theremin_local.posSensitivityFactor);
           }

           theremin_local.baseFreq = newFreq;

           document.getElementById('div_baseFreq').innerHTML = 'baseFreq: ' + sprintf("%4d", theremin_local.baseFreq);

           theremin_local.oscs.forEach(function (o) {
             o.oscillator.frequency.value = theremin_local.baseFreq * o.multiplier;
           });
         }
         else {
           // turn it off
           theremin_local.oscs.forEach(function (o) {
             o.oscillator.frequency.value = 0;
           });
         }
       };

       return ctrlFrameHandler;
     };

     factory.init = function () {
       // oscs is an array of hashes.  The hash has two keys: 'multiplier' and 'oscillator'.
       // 'multiplier' is the value the root freq. is multiplied by to get the new tone e.g a 'fifth'
       // oscillator is the osciallator object.
       this.waveType = 'square';
       this.baseFreq = 440;
       this.leapController = new Leap.Controller({ enableGestures: true, });
       this.audio_context = new window.AudioContext();
       this.invertFreq = false;
       this.oscs = [];
       this.baseFreq = 440;

       var osc1 = this.createOscillator(1.0, this.baseFreq);
       this.oscs.push(osc1);
     };

     factory.createOscillator = function(multiplier, freq) {
       try {
         var osc = this.audio_context.createOscillator();

         osc.type = this.waveType;
         osc.frequency.value = (freq * multiplier) || 440;
         osc.connect(this.audio_context.destination);
       }
       catch (e) {
         alert('No web audio oscillator support in this browser');
       }

       return { multiplier: multiplier, oscillator: osc };
     };

    // loop over the array 'oscs' and return the offset of the found
    // entry, or 'false' if not found
     factory.findOscillator = function(multiplier) {
       var index = 0;
       var foundMatch = false;

       for(index; index < this.oscs.length; index++) {
         if (this.oscs[index].multiplier === multiplier) {
           foundMatch = true;
           break;
         }
       }

       if (foundMatch) {
         return { index: index, osc: this.oscs[index] };
       }
       else {
         return false;
       }
     };

     factory.getOscillator = function (multiplier) {
       var oscInfo = this.findOscillator(multiplier);

       if (oscInfo) {
         return oscInfo.osc;
       }
       else {
         return false;
       }
     };

     factory.getOscillatorIndex = function (multiplier) {
       var oscInfo = this.findOscillator(multiplier);

       if (oscInfo) {
         return oscInfo.index;
       }
       else {
         return false;
       }
     };

     factory.doSomething = function () {
       return 7;
     };  

     factory.deleteOscillator = function (multiplier) {
       var oscIndex = this.getOscillatorIndex(multiplier);

       if (oscIndex) {
         this.oscs[oscIndex].oscillator.stop();
         this.oscs = this.oscs.filter(function (item) { return item.multiplier !== multiplier; });

         return true;
       }
       else {
         return false;
       }
     };

    // set the wave types on all oscillators
     factory.setWaveType = function (waveType) {
       this.waveType = waveType;

       this.oscs.forEach(function (o) {
         o.oscillator.type = waveType;
       });
     };

     factory.bindController = function () {
       this.leapController.connect();

       this.frameCallback = this.ctrlFrameHandler();

       if (this.leapController.listeners('frame').length === 0) {
         this.leapController.on('frame', this.frameCallback);
       }
     };

     factory.addOvertone = function (checked, multiplier) {

       var osc;

       if (checked) {
         // the checkbox was checked 
         if (!this.getOscillator(multiplier)) {

           osc = this.createOscillator(multiplier, this.baseFreq);
           this.oscs.push(osc);
           osc.oscillator.start(0);

           //rebind the LeapController Loop
           this.bindController();
         }
       } else {
         // the checkbox was unchecked
         osc = this.getOscillator(multiplier);

         if (osc) {
           this.deleteOscillator(multiplier);
         }
       }
     };

     factory.start = function () {
       for(var i = 0; i < this.oscs.length; i++) {
         var o = this.oscs[i].oscillator;
         var osc1 = this.createOscillator(this.oscs[i].multiplier, o.frequency || this.baseFreq);
         // overlay the original
         this.oscs[i] = osc1;

         this.oscs[i].oscillator.start();
       }
    
       this.bindController();
     };

     factory.stop = function () {
       this.leapController.disconnect()
       this.leapController.removeListener('frame', this.leapController.listeners('frame')[0]);
       for(var i = 0; i < this.oscs.length; i++) {
         this.oscs[i].oscillator.stop();
       }
     };

    // Getters and Setters
    factory.getMaxFreq = function () {
      return MAX_FREQ;
    };
    
     return factory;
  }]
);
