// JavaScript source code
$(document).ready(function () {
  console.log('entered ready');

  var theremin = Theremin();

  theremin.init();

  $("#b_start").mousedown(function () {
    theremin.start();
  });

  $("#b_stop").mousedown(function () {
    theremin.stop();
  });

  // ctrl-s fires off start
  $(document).keypress(function (e) {
    if (e.which === 115 ) {
      theremin.start();
    }
  });

  // ctrl-p fires off stop
  $(document).keypress(function (e) {
    if (e.which === 112 ) {
      theremin.stop();
    }
  });

  $("#wave_type_select").change(function () {
    var selectedValue = $(this).find(":selected").val();

    waveType = $(this).find(":selected").val();
    theremin.setWaveType(waveType);
  });

  //TODO: put this in theremin module
  function addOvertone($this, multiplier) {

    var osc;
    if ($this.is(':checked')) {
      // the checkbox was checked 
      if (!theremin.getOscillator(multiplier)) {

        osc = theremin.createOscillator(multiplier, this.baseFreq);
        theremin.oscs.push(osc);
        osc.oscillator.start(0);
         
        //rebind the LeapController Loop
        theremin.bindController();
      }
    } else {
      // the checkbox was unchecked
      osc = theremin.getOscillator(multiplier);

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
  );

  $("#cb_add_octave").click(function () {
    var $this = $(this);
    addOvertone($this, 2.0);
  });

  $("#invert_freq").click(function () {
    console.log('now in invert_freq handler');
    var $this = $(this);

    console.log('invert_freq handler: checked=', $this.is(':checked'));
    if ($this.is(':checked')) {
      theremin.invertFreq = true;
    }
    else {
      theremin.invertFreq = false;
    }
    theremin.bindController();
  });
}
);

