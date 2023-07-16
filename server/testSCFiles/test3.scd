

SynthDef(\midHiHat, {
    var snd, freq;
    freq = 8000 * \transpose.kr(0).midiratio;
    snd = WhiteNoise.ar;
    snd = BPF.ar(snd, freq, Q: 1);
    snd = snd * Env.perc(0.001, 0.1, curve: -4).kr;
    snd = snd * \amp.kr(1);
    Out.ar(\out.kr(0), snd);
}).add;


(
s.waitForBoot {
    // Define a simple sine wave SynthDef


    // Start recording to a file
    s.record(path: "~/sine.wav");

    // Play the simple sine wave
	Synth(\midHiHat);

    // Wait for 3 seconds
    3.wait;

    // Stop recording
    s.stopRecording;

    // Stop server
    s.quit;
};
)
