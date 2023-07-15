(
s = Server(this, NetAddr("127.0.0.1", 57110));
s.options.sampleRate = 44100; // Set sample rate
s.options.numOutputBusChannels = 2; // Set the number of output channels

a = { SinOsc.ar(440, 0, 0.2) }.play(s, quant: 1); // Create a sine wave at 440 Hz

s.sync; // Wait for server to finish booting

// Start recording to a file
s.prepareForRecord("~/sine_wave.wav".standardizePath);
s.record;

// Wait for 3 seconds
3.wait;

// Stop recording
s.stopRecording;

// Quit the server
s.quit;
)
