// JavaScript source code
$(document).ready(function () {
  console.log('entered ready');

  //var theremin = new Theremin();
  var theremin = Theremin();
  theremin.init();
  //theremin();

  //function start() {
  //  //console.log('now in start');
  //  theremin.start();
  //};

  //function stop() {
  //  //console.log('now in stop');
  //  theremin.stop();
  //};

  //Event.observe(document, "keydown", function (e) {
  //  switch (e.keyCode) {
  //    case Event.KEY_RETURN:
  //    case Event.KEY_RIGHT:
  //    case 32:  // space
  //      // do something
  //      Event.stop(e);
  //      break;
  //  }
  //});

  $("#b_start").mousedown(function () {
    theremin.start();
  });

  $("#b_stop").mousedown(function () {
    theremin.stop();
  });

  // ctrl-s fires off start
  $(document).keypress(function (e) {
    console.log('s key pressed, e.which=', e.which);
    //if (e.which === 115 && e.ctrlKey) {
    if (e.which === 115 ) {
      //$("#b_start").click();
      console.log('firing theremin start');
      theremin.start();
      //Event.stop(e);
    }
  });

  // ctrl-p fires off stop
  $(document).keypress(function (e) {
    //if (e.which == 80 && e.ctrlKey) {
    if (e.which === 112 ) {
      //$("#b_stop").click();
      theremin.stop();
    }
  });

  $("#wave_type_select").change(function () {
    var selectedValue = $(this).find(":selected").val();
    console.log("the value you selected: " + selectedValue);
    waveType = $(this).find(":selected").val();
    theremin.setWaveType(waveType);
  });

  //TODO: put this in theremin module
  function addOvertone($this, multiplier) {
    console.log('you clicked add_5th');
    //var $this = $(this);
    var osc;
    if ($this.is(':checked')) {
      // the checkbox was checked 
      if (!theremin.getOscillator(multiplier)) {
        console.log('now creating oscillator');
        osc = theremin.createOscillator(multiplier, this.baseFreq);
        theremin.oscs.push(osc);
        osc.oscillator.start(0);
         
        //rebind the LeapController Loop
        //theremin.leapController.removeListener('frame', theremin.ctrlFrameHandler2);
        //theremin.leapController.on('frame', theremin.ctrlFrameHandler2());
        theremin.bindController();
      }
    } else {
      // the checkbox was unchecked
      console.log('now deleting oscillator');
      osc = theremin.getOscillator(multiplier);
      //osc.oscillator.stop();
      if (osc) {
        theremin.deleteOscillator(multiplier);
      }
    }
  };

  $("#cb_add_major_3rd").click(function () {
    var $this = $(this);
    addOvertone($this, 4.0 / 3.0);
  });

  $("#cb_add_5th").click( function () {
    var $this = $(this);
    addOvertone($this, 1.5);
  }
    //function () {
    //console.log('you clicked add_5th');
    //var $this = $(this);
    //var osc;
    //if ($this.is(':checked')) {
    //  // the checkbox was checked 
    //  if (!theremin.getOscillator(1.5)) {
    //    console.log('now creating oscillator');
    //    osc = theremin.createOscillator(1.5, this.baseFreq);
    //    theremin.oscs.push(osc);
    //    osc.oscillator.start(0);
         
    //    //rebind the LeapController Loop
    //    //theremin.leapController.removeListener('frame', theremin.ctrlFrameHandler2);
    //    //theremin.leapController.on('frame', theremin.ctrlFrameHandler2());
    //    theremin.bindController();
    //  }
    //} else {
    //  // the checkbox was unchecked
    //  console.log('now deleting oscillator');
    //  osc = theremin.getOscillator(1.5);
    //  //osc.oscillator.stop();
    //  if (osc) {
    //    theremin.deleteOscillator(1.5);
    //  }
    //}
    //}
  );

  $("#cb_add_octave").click(function () {
    var $this = $(this);
    addOvertone($this, 2.0);
  });
} //.bind(window)
);

