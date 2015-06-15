$(document).on('keypress', function() {
  var audioContext = new (AudioContext || webkitAudioContext)();
  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = 200;

  oscillator.connect(audioContext.destination);

  oscillator.start(0);
})