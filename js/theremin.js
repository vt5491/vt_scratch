
$(document).ready(function () {
  // JavaScript source code vt
  var audio_context, oscillator;
  //vt add
  // oscs is an array of hashes.  The hash has two keys: 'multiplier' and 'oscillator'.
  // 'multiplier' is the value the root freq. is multiplied by to get the new tone e.g a 'fifth'
  // oscillator is the osciallator object.
  var oscs = [];
  var controller;
  var waveType = 'square';
  var exitLeapLoop = false;
  var baseFreq = 440;

  console.log('done initing variables');
  var ctrlFrameHandler = function (frame) {
    if (frame.hands.length > 0) {
      var hand = frame.hands[0];
      //var infoStr = "hands[0].palmPosition[2]=" + hand.palmPosition[2];
      var handPos = hand.palmPosition[2];
      //var newFreq = Math.abs(frame._translation[2] * 50);
      var newFreq = Math.abs(handPos * 75);

      this.baseFreq = newFreq;

      console.log('newFreq=' + newFreq);
      //oscillator.frequency.value = newFreq;
      this.oscs.forEach(function (o) {
        o.oscillator.frequency.value = this.baseFreq * o.multiplier;
      })
    }
    else {
      // turn it off
      //oscillator.frequency.value = 0;
      this.oscs.forEach(function (o) {
        o.oscillator.frequency.value = 0;
      })
    }

    //if (exitLeapLoop) {
    //  console.log('on: now exiting Leap Loop');
    //  throw ('');
    //};
  }.bind(this);
  //vt end

  function stop() {
    //vtoscillator.noteOff(0);
    console.log('stop: now disconnecting from controller');
    //controller.on('frame', function () { console.log('hello') });
    controller.disconnect();
    //controller.removeEventListener("frame", ctrlFrameHandler);
    //controller.unbind("frame", ctrlFrameHandler);
    //controller.off("frame", ctrlFrameHandler);
    //controller.removeListener(ctrlFrameHandler);
    //controller.emitter.removeListener(event, listener)
    //controller.emitter.removeListener('frame', ctrlFrameHandler);
    controller.removeListener('frame', ctrlFrameHandler);
    oscillator.stop(0);
    fire('stop');
  }

  function createOscillator(multiplier, freq) {
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

  function start(freq) {
    //oscillator = audio_context.createOscillator();
    //oscillator.type = waveType;
    //oscillator.frequency.value = freq || 440;
    //oscillator.connect(audio_context.destination);
    ////vtoscillator.noteOn(0);
    //oscillator.start(0);
    this.oscs.forEach(function (o) {
      o.oscillator.start(0);
    })
    //oscillator = createOscillator(1.0);
    // push the freq. multiplier and the oscillator itself
    //oscs.push({ multiplier: 1.0, oscillator: oscillator});
    //fire('play', oscillator.frequency.value);
    //vt add
    // Leap.loop uses browser's requestAnimationFrame
    var options = { enableGestures: true };

    console.log('start: now connecting to controller');
    controller.connect();

    controller.on('frame', ctrlFrameHandler);
    console.log('now at end of play');
    //vt end
  }

  //var cmajor = {};
  //cmajor.yo = function () {
  //  var oscs = [], o, i, freqs = [261.63, 329.63, 392];
  //  freqs.forEach(function (freq) {
  //    o = audio_context.createOscillator();
  //    o.frequency.value = freq;
  //    o.connect(audio_context.destination);
  //    //vto.noteOn(0);
  //    o.start(0);
  //    oscs.push(o);
  //  });
  //  this.oscs = oscs;
  //  fire('play', '\n - ' + freqs.join('Hz\n - '));
  //};

  //cmajor.no = function () {
  //  this.oscs.forEach(function (o) {
  //    //vto.noteOff(0);
  //    o.stop(0);
  //  });
  //  fire('stop');
  //};

  function fire(e, data) {
    if (e === 'stop') {
      log.inne$("#target").mousedown(function () {
        alert("Handler for .mousedown() called.");
      }); $("#target").mousedown(function () {
        alert("Handler for .mousedown() called.");
      }); $("#target").mousedown(function () {
        alert("Handler for .mousedown() called.");
      }); rHTML = '';
    }
    if (e === 'play') {
      log.innerHTML = "Playing " + data + 'Hz';
    }
  }

  //(function init(g) {
  //  try {
  //    controller = new Leap.Controller({ enableGestures: true, });

  //    audio_context = new (g.AudioContext || g.webkitAudioContext);
  //    oscillator = audio_context.createOscillator();
  //  } catch (e) {
  //    alert('No web audio oscillator support in this browser');
  //  }
  //  $(document).ready(function () {
  //    $("#dummy").hide();
  //    $("#dummy").hover(function () { alert("hello"); });
  //  });
  //}(window));

  console.log('about to call ready');
  //$(document).ready(function () {
  (function init() {
    console.log('now in ready');
    //try {
    controller = new Leap.Controller({ enableGestures: true, });

    //console.log('ready: about to get audio_context,w=', w);
    //audio_context = new (this.AudioContext || this.webkitAudioContext);
    audio_context = new window.AudioContext();
    console.log('ready: back from audio_context');
    //oscillator = audio_context.createOscillator();
    //osc = this.createOscillator(1.0, this.baseFreq);
    osc = createOscillator(1.0, this.baseFreq);

    //oscs.push({ multiplier: 1.0, oscillator: oscillator });
    oscs.push(osc);
    //} catch (e) {
    //  alert('No web audio oscillator support in this browser');
    //};

    //$("#dummy").hover(function () { alert("hello"); });
    $("#dummy").hide();

    $("#wave_type_select").change(function () {
      var selectedValue = $(this).find(":selected").val();
      //console.log("the value you selected: " + selectedValue);
      waveType = $(this).find(":selected").val();
      oscillator.type = waveType;
    });

    $('#main_form :checkbox').change(function () {
      // this represents the checkbox that was checked
      // do something with it
      var $this = $(this);
      // $this will contain a reference to the checkbox   
      if ($this.is(':checked')) {
        console.log($(this).val() + ' is now checked');
        console.log('current freq=', oscillator.frequency.value);
      } else {
        console.log($(this).val() + ' is now unchecked');
      }
    });

    $("#b_start").mousedown(function () {
      //this.start();
      $(this).start();
    });

    $("#b_stop").mousedown(function () {
      this.stop();
    });
  })();
//  }).bind(window)();
  //}.bind(window) 
  //}
  //)
}).bind(window)