var mappings = {
  A: ['1'],
  B: ['2'],
  C: ['3'],
  D: ['4'],
  E: ['5'],
  F: ['6'],
  G: ['7'],
  H: ['8'],
  I: ['9'],
  J: ['10'],
  K: ['11'],
  L: ['12'],
  M: ['13'],
  N: ['14'],
  O: ['15'],
  P: ['16'],
  Q: ['17'],
  R: ['18'],
  S: ['19'],
  T: ['20'],
  U: ['21'],
  V: ['22'],
  W: ['23'],
  X: ['24'],
  Y: ['25'],
  Z: ['26']
}

var frequencies = {
  1: 146.8,
  2: 155.6,
  3: 164.8,
  4: 174.6,
  5: 185.0,
  6: 196.0,
  7: 207.7,
  8: 220.0,
  9: 233.1,
  10: 246.9,
  11: 261.6,
  12: 277.1,
  13: 293.7,
  14: 311.1,
  15: 329.6,
  16: 349.2,
  17: 370.0,
  18: 392.0,
  19: 415.3,
  20: 440.0,
  21: 466.1,
  22: 493.9,
  23: 523.3,
  24: 554.4,
  25: 587.3,
  26: 622.3
}

var audioContext = new (AudioContext || webkitAudioContext)();

var Sound = function(frequency) {
  this.frequency = frequency;
  this.oscillators = [];
};

Sound.prototype.start = function() {
  var vco = audioContext.createOscillator();
  vco.type = vco.SINE;
  vco.frequency.value = this.frequency;

  var vca = audioContext.createGain();
  vca.gain.value = 0.3;

  vco.connect(vca);
  vca.connect(audioContext.destination);

  vco.start(0);

  this.oscillators.push(vco);
};

Sound.prototype.stop = function() {
  this.oscillators.forEach(function(oscillator, _) {
    oscillator.stop();
  });
};

activeSounds = {};

$(document).ready(function() {
  for (var key in mappings) {
    $('#keyMappings').append('<div class="pair">' + key + ': <input id="' + key + '" type="text" value="' + mappings[key] + '"></div>');
  }

  $(".key").mousedown(function(e) {
    var num = $(this).attr('data-key');
    var sound = new Sound(frequencies[num]);
    activeSounds[num] = sound;
    sound.start();
  });

  $(".key").mouseup(function(e) {
    var num = $(this).attr('data-key');
    activeSounds[num].stop();
    delete activeSounds[num];
  });
});

$(document).keydown(function(e) {
  var numString =$('#' + String.fromCharCode(e.keyCode)).val();
  var nums = numString.split(','); 

  for (var i = 0; i < nums.length; i++) {
    if (!($('div[data-key=' + nums[i] + ']').hasClass('pressed'))) {
      $('div[data-key=' + nums[i] + ']').trigger('mousedown');
      $('div[data-key=' + nums[i] + ']').addClass('pressed');
    }
  }
});

$(document).keyup(function(e) {
  var numString =$('#' + String.fromCharCode(e.keyCode)).val();
  var nums = numString.split(','); 

  for (var i = 0; i < nums.length; i++) {
    $('div[data-key=' + nums[i] + ']').trigger('mouseup');
    $('div[data-key=' + nums[i] + ']').removeClass('pressed');
  }
});