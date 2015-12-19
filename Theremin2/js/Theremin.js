// JavaScript source code
'use strict';

function Theremin() {

  //factory.ctrlFrameHandler = function (frame) {

//  var ctrlFrameHandler2 = function (frame, baseFreq, oscs) {
  var ctrlFrameHandler = function (frame) {
    if (frame.hands.length > 0) {
      var hand = frame.hands[0];
      var handPos = hand.palmPosition[2] / 3.0;
      //var newFreq = Math.abs(handPos * 75);
      var newFreq = Math.abs(handPos * 25);

      window.theremin_global_baseFreq = newFreq;

      //console.log('newFreq=' + newFreq);
      //$("#div_baseFreq").html('baseFreq: ' + window.theremin_global_baseFreq.toFixed(0));
      //$("#div_baseFreq").html('baseFreq: ' + sprintf('% 4d', window.theremin_global_baseFreq));
      $("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", window.theremin_global_baseFreq));

      window.theremin_global_oscs.forEach(function (o) {
        o.oscillator.frequency.value = window.theremin_global_baseFreq * o.multiplier;
      })
    }
    else {
      // turn it off
      window.theremin_global_oscs.forEach(function (o) {
        o.oscillator.frequency.value = 0;
      })
    }
  };

  //var factory = {};
  //var factory = new Object();
  var factory = function () {
  };

  //factory.ctrlFrameHandler = function (frame) {
  //  ctrlFrameHandler2(frame, this.baseFreq, this.oscs);
  //}; //.bind(this);

  factory.init = function () {
    // oscs is an array of hashes.  The hash has two keys: 'multiplier' and 'oscillator'.
    // 'multiplier' is the value the root freq. is multiplied by to get the new tone e.g a 'fifth'
    // oscillator is the osciallator object.
    window.vtAbc = 7;
    //this.oscs = [];
    //window.theremin_global_oscs = [];
    this.leapController;
    this.waveType = 'square';
    //this.waveType = 'sine';
    this.exitLeapLoop = false;
    this.baseFreq = 440;
    //window.theremin_global_baseFreq = 440;

    this.leapController = new Leap.Controller({ enableGestures: true, });

    this.audio_context = new window.AudioContext();
    //this.osc = this.createOscillator(1.0, this.baseFreq);

    //oscs.push({ multiplier: 1.0, oscillator: oscillator });
    //this.oscs.push(this.osc);
    //window.theremin_global_oscs.push(this.osc);
  };

  //factory.prototype.start = function () {
  factory.start = function () {
    console.log('theremin.start: now in start');
    console.log('theremin.start: waveType=', this.waveType);
    console.log('theremin.start: oscs=', this.oscs);
    console.log('theremin.start: window.theremin_global_oscs=', window.theremin_global_oscs);
    console.log('theremin.start: window.vtAbc=', window.vtAbc);
     
    // we have to initialize a new bunch of oscillators each time
    window.theremin_global_oscs = [];
    window.theremin_global_baseFreq = 440;
    //$("#div_baseFreq").hide();
    console.log('div_baseFreq.innerHTML=' + $("#div_baseFreq").html());
    $("#div_baseFreq").html( 'baseFreq: ' + window.theremin_global_baseFreq);
    var osc1 = this.createOscillator(1.0, window.theremin_global_baseFreq);
    window.theremin_global_oscs.push(osc1);

    // major 3rd 
    var osc2 = this.createOscillator(1.3333, window.theremin_global_baseFreq);
    window.theremin_global_oscs.push(osc2);

    // fifth
    var osc2 = this.createOscillator(1.5, window.theremin_global_baseFreq);
    window.theremin_global_oscs.push(osc2);

    window.theremin_global_oscs.forEach(function (o) {
      o.oscillator.start(0);
    })

    // Leap.loop uses browser's requestAnimationFrame
    //var options = { enableGestures: true };

    console.log('start: now connecting to leapController');
    this.leapController.connect();

    //this.leapController.on('frame', this.ctrlFrameHandler);
    this.leapController.on('frame', ctrlFrameHandler);
    //console.log('now at end of play');
  };

  //factory.prototype.stop = function () {
  factory.stop = function () {
    console.log('theremin: now in stop');
    this.leapController.disconnect()
    this.leapController.removeListener('frame', ctrlFrameHandler);

    window.theremin_global_oscs.forEach(function (o) {
      o.oscillator.stop();
    })
  };


  factory.createOscillator = function(multiplier, freq) {
    try {
      var osc = this.audio_context.createOscillator();

      osc.type = this.waveType;
      osc.frequency.value = (freq * multiplier) || 440;
      osc.connect(this.audio_context.destination);
      //osc.start(0);
    }
    catch (e) {
      alert('No web audio oscillator support in this browser');
    }

    return { multiplier: multiplier, oscillator: osc };
  };

  return factory;
}
