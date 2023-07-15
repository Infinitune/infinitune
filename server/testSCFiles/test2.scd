s.boot;

s.waitForBoot{

    // Start recording to a file
    s.record(path: "sine.wav");

    // Define and play a sine wave
    { SinOsc.ar(440, 0, 0.2) }.play;

    // Wait for 5 seconds
    5.wait;

    // Stop recording
    s.stopRecording;

    // Stop server
    s.quit;
};
