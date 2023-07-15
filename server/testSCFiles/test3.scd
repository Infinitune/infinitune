(
s.waitForBoot {
    // Define a simple sine wave SynthDef
    SynthDef(\snare, { |out=0, freq=233, amp=0.5|
        var env = EnvGen.ar(Env.perc(0.01, 0.4), doneAction:2);
        var sig = WhiteNoise.ar() * env;
        Out.ar(out, sig * amp);
    }).add;

    // Start recording to a file
    s.record(path: "~/sine.wav");

    // Play the simple sine wave
	Synth(\snare);

    // Wait for 3 seconds
    3.wait;

    // Stop recording
    s.stopRecording;

    // Stop server
    s.quit;
};
)
