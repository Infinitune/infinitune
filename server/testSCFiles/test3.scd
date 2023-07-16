

SynthDef(\gen, {
    var snd;
    snd = WhiteNoise.ar(0.25);
    snd = HPF.ar(snd, 10000);
    snd = snd * Env.perc(0.001, 0.1).ar;
    snd = snd * 0.3;
    Out.ar(\out.kr(0), snd);
}).add;


SynthDef(\gen, {
    var snd;
    snd = SinOsc.ar(1500, 0, (0.2 * (1 + SinOsc.kr(5))));
    snd = snd + WhiteNoise.ar(0.025);
    snd = HPF.ar(snd, 1000);
    snd = snd * Env.perc(0.0005,0.02,curve: \exp).ar(Done.freeSelf);
    snd = Pan2.ar(snd, \pan.kr(0));
    Out.ar(\out.kr(0), snd);
}).add;


s.waitForBoot {
    // Define a simple sine wave SynthDef

    // Get a timestamp
    var timestamp = Date.getDate.format("%Y%m%d%H%M%S");

    // Start recording to a file
    s.record(path: "~/sine_" ++ timestamp ++ ".wav");

    // Play the simple sine wave
    Synth(\gen);

    // Wait for 3 seconds
    3.wait;

    // Stop recording
    s.stopRecording;

    // Print the path to the .wav file
    "~/sine_" ++ timestamp ++ ".wav".postln;

    // Stop server
    s.quit;
};
