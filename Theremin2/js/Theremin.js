// JavaScript source code
'use strict';

function Theremin() {

  var MAX_FREQ = 2500;

  //var LISTENER = FrameListener();

  var factory = function () {
  };

  // this returns a closure via a factory method.  We need a closure because
  // we need to bring in 'oscs' and 'baseFreq' from our context into the runtime
  // context of the LeapMotion.
  factory.ctrlFrameHandler = function (frame) {
    var oscs_local = this.oscs;
    var baseFreq_local = this.baseFreq;
    var invertFreq_local = this.invertFreq;

    var ctrlFrameHandler = function (frame) {
      if (frame.hands.length > 0) {
        var hand = frame.hands[0];
        var handPos = hand.palmPosition[2] / 3.0;
        //var newFreq = Math.abs(handPos * 75);
        //var newFreq = Math.abs(handPos * 50);
        //console.log("ctrlFrameHandler: MAX_FREQ=", MAX_FREQ);
        console.log("ctrlFrameHandler: invertFreq_local=", invertFreq_local);
        var newFreq;

        if (invertFreq_local) {
          newFreq = MAX_FREQ - Math.abs(handPos * 50);

          if (newFreq < 0) {
            newFreq = 0;
          }
        }
        else {
          newFreq = Math.abs(handPos * 50);
        }

        baseFreq_local = newFreq;

        $("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", baseFreq_local));

        oscs_local.forEach(function (o) {
          o.oscillator.frequency.value = baseFreq_local * o.multiplier;
        })
      }
      else {
        // turn it off
        oscs_local.forEach(function (o) {
          o.oscillator.frequency.value = 0;
        })
      }
    };

    return ctrlFrameHandler;
  }

  factory.init = function () {
    console.log('now in init function');
    // oscs is an array of hashes.  The hash has two keys: 'multiplier' and 'oscillator'.
    // 'multiplier' is the value the root freq. is multiplied by to get the new tone e.g a 'fifth'
    // oscillator is the osciallator object.
    this.waveType = 'square';
    //this.waveType = 'sine';
    //this.exitLeapLoop = false;
    this.baseFreq = 440;

    this.leapController = new Leap.Controller({ enableGestures: true, });

    this.audio_context = new window.AudioContext();

    this.invertFreq = false;

    //this.listener = FrameListener();

    //this.listener.on_frame()
    this.oscs = [];
    this.baseFreq = 440;

    var osc1 = this.createOscillator(1.0, this.baseFreq);
    this.oscs.push(osc1);
  };

  factory.createOscillator = function(multiplier, freq) {
    try {
      console.log('createOscillator: waveType=', this.waveType);
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
    })
  };

  factory.bindController = function () {
    console.log('bindController: now connecting to leapController');
    this.leapController.connect();

    this.frameCallback = this.ctrlFrameHandler();
    //this.leapController.on('frame', this.ctrlFrameHandler());
    if (this.leapController.listeners('frame').length === 0) {
      this.leapController.on('frame', this.frameCallback);
    }
  };

  factory.start = function () {
    console.log('theremin.start: now in start');
    console.log('theremin.start: waveType=', this.waveType);

    //this.oscs = [];
    //this.baseFreq = 440;
    console.log('div_baseFreq.innerHTML=' + $("#div_baseFreq").html());
    $("#div_baseFreq").html( 'baseFreq: ' + window.theremin_global_baseFreq);
    //var osc1 = this.createOscillator(1.0, window.theremin_global_baseFreq);
    //var osc1 = this.createOscillator(1.0, this.baseFreq);
    //this.oscs.push(osc1);

    //this.oscs.forEach(function (o) {
    for(var i = 0; i < this.oscs.length; i++) {
      var o = this.oscs[i].oscillator;
      var osc1 = this.createOscillator(this.oscs[i].multiplier, o.frequency || this.baseFreq);
      //this.oscs.push(osc1);
      // overlay the original
      this.oscs[i] = osc1;

      this.oscs[i].oscillator.start();
    }
    
    this.bindController();
  };

  factory.stop = function () {
    console.log('theremin: now in stop 2');
    this.leapController.disconnect()
    //this.leapController.removeListener('frame', factory.ctrlFrameHandler);
    //this.leapController.removeListener('frame', this.ctrlFrameHandler);
    this.leapController.removeListener('frame', this.leapController.listeners('frame')[0]);
    //this.leapController.removeListener('frame', this.frameCallback);
    //this.leapController.removeAllListeners();

    //this.oscs.forEach(function (o) {
    for(var i = 0; i < this.oscs.length; i++) {
      this.oscs[i].oscillator.stop();
    }
  };

  return factory;
}
