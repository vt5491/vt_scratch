// JavaScript source code
'use strict';

function Theremin() {

  //factory.ctrlFrameHandler = function (frame) {

//  var ctrlFrameHandler2 = function (frame, baseFreq, oscs) {
  //var ctrlFrameHandler = function (frame) {
  //  if (frame.hands.length > 0) {
  //    var hand = frame.hands[0];
  //    var handPos = hand.palmPosition[2] / 2.0;
  //    //var newFreq = Math.abs(handPos * 75);
  //    var newFreq = Math.abs(handPos * 50);

  //    window.theremin_global_baseFreq = newFreq;

  //    //console.log('newFreq=' + newFreq);
  //    //$("#div_baseFreq").html('baseFreq: ' + window.theremin_global_baseFreq.toFixed(0));
  //    //$("#div_baseFreq").html('baseFreq: ' + sprintf('% 4d', window.theremin_global_baseFreq));
  //    //$("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", window.theremin_global_baseFreq));
  //    $("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", this.baseFreq));

  //    window.theremin_global_oscs.forEach(function (o) {
  //      o.oscillator.frequency.value = window.theremin_global_baseFreq * o.multiplier;
  //    })
  //  }
  //  else {
  //    // turn it off
  //    window.theremin_global_oscs.forEach(function (o) {
  //      o.oscillator.frequency.value = 0;
  //    })
  //  }
  //};

  var factory = function () {
  };

  // this returns a closure via a factory method.  We need a closure because
  // we need to bring in 'oscs' and 'baseFreq' from our context into the runtime
  // context of the LeapMotion.
  factory.ctrlFrameHandler2 = function (frame) {
    //var oscs_local = window.theremin_global_oscs;
    //var baseFreq_local = window.theremin_global_baseFreq;
    var oscs_local = this.oscs;
    var baseFreq_local = this.baseFreq;

    var ctrlFrameHandler = function (frame) {
      if (frame.hands.length > 0) {
        var hand = frame.hands[0];
        var handPos = hand.palmPosition[2] / 2.0;
        //var newFreq = Math.abs(handPos * 75);
        var newFreq = Math.abs(handPos * 50);

        baseFreq_local = newFreq;

        //console.log('newFreq=' + newFreq);
        //$("#div_baseFreq").html('baseFreq: ' + window.theremin_global_baseFreq.toFixed(0));
        //$("#div_baseFreq").html('baseFreq: ' + sprintf('% 4d', window.theremin_global_baseFreq));
        //$("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", window.theremin_global_baseFreq));
        $("#div_baseFreq").html('baseFreq: ' + sprintf("%4d", baseFreq_local));

        oscs_local.forEach(function (o) {
          //o.oscillator.frequency.value = window.theremin_global_baseFreq * o.multiplier;
          o.oscillator.frequency.value = baseFreq_local * o.multiplier;
        })
      }
      else {
        // turn it off
        //console.log('oscs_local=', oscs_local);
        oscs_local.forEach(function (o) {
          o.oscillator.frequency.value = 0;
        })
      }
    };

    //ctrlFrameHandler(frame);
    return ctrlFrameHandler;
  }
    //var factory = {};
    //var factory = new Object();

  //new Leap.Controller({ enableGestures: true, });
  //factory.ctrlFrameHa    if ($this.is(':checked')) {
        // the checkbox was checked 
    //} else {
    //    // the checkbox was unchecked
    //}ndler = function (frame) {
  //  ctrlFrameHandler2(frame, this.baseFreq, this.oscs);
  //}; //.bind(this);

  factory.init = function () {
  //var factory = function () {
    console.log('now in init function');
    // oscs is an array of hashes.  The hash has two keys: 'multiplier' and 'oscillator'.
    // 'multiplier' is the value the root freq. is multiplied by to get the new tone e.g a 'fifth'
    // oscillator is the osciallator object.
    window.vtAbc = 7;
    //this.oscs = [];
    //window.theremin_global_oscs = [];
    //this.leapController;
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
  factory.createOscillator = function(multiplier, freq) {
    try {
      console.log('createOscillator: waveType=', this.waveType);
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
      //delete this.oscs[oscIndex];
      //this.oscs.splice[oscIndex, 1];
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

  factory.start = function () {
    //this.stop();
    console.log('theremin.start: now in start');
    console.log('theremin.start: waveType=', this.waveType);
    //console.log('theremin.start: oscs=', this.oscs);
    //console.log('theremin.start: window.theremin_global_oscs=', window.theremin_global_oscs);
    //console.log('theremin.start: window.vtAbc=', window.vtAbc);
     
    // we have to initialize a new bunch of oscillators each time
    //window.theremin_global_oscs = [];
    //window.theremin_global_baseFreq = 440;
    this.oscs = [];
    this.baseFreq = 440;
    //$("#div_baseFreq").hide();
    console.log('div_baseFreq.innerHTML=' + $("#div_baseFreq").html());
    $("#div_baseFreq").html( 'baseFreq: ' + window.theremin_global_baseFreq);
    var osc1 = this.createOscillator(1.0, window.theremin_global_baseFreq);
    //window.theremin_global_oscs.push(osc1);
    this.oscs.push(osc1);

    //// major 3rd 
    //var osc2 = this.createOscillator(1.3333, window.theremin_global_baseFreq);
    //window.theremin_global_oscs.push(osc2);

    //// fifth
    //var osc2 = this.createOscillator(1.5, window.theremin_global_baseFreq);
    //window.theremin_global_oscs.push(osc2);

    //window.theremin_global_oscs.forEach(function (o) {
    this.oscs.forEach(function (o) {
      o.oscillator.start(0);
    })
    
    this.bindController();
    // Leap.loop uses browser's requestAnimationFrame
    //var options = { enableGestures: true };

    //console.log('now at end of play');
  };

  factory.bindController = function () {
    console.log('bindController: now connecting to leapController');
    this.leapController.connect();

    //this.leapController.on('frame', this.ctrlFrameHandler);
    this.leapController.on('frame', this.ctrlFrameHandler2());
  };

  //factory.prototype.stop = function () {
  factory.stop = function () {
    console.log('theremin: now in stop');
    this.leapController.disconnect()
    this.leapController.removeListener('frame', this.ctrlFrameHandler2);

    //window.theremin_global_oscs.forEach(function (o) {
    this.oscs.forEach(function (o) {
      o.oscillator.stop();
    })
  };

  return factory;
}
