

SynthDef(\pluck, {
        var snd, freq;
        freq = 60 * \transpose.kr(0).midiratio;
        snd = Pulse.ar(freq * [-0.1, 0.1].midiratio);
        snd = MoogFF.ar(snd, Env.perc(0.001, 0.2).ar.linexp(0, 1, 100, 8000), 1);
        snd = snd * (1 + (SinOsc.ar(963) * Env.perc(0, 0.1).ar));
        snd = snd * Env.perc(0.001, 0.2, curve: -1).ar;
        snd = snd + (GVerb.ar(snd.sum, 20, 1) * -10.dbamp);
        snd = snd * Env.perc(0.001, 0.5, curve: -1).ar(Done.freeSelf);
        snd = snd * \amp.kr(1);
        snd = snd * 3.dbamp;
        Out.ar(\out.kr(0), snd);
}).add;


(
s.waitForBoot {
    // Define a simple sine wave SynthDef


    // Start recording to a file
    s.record(path: "~/sine.wav");

    // Play the simple sine wave
	Synth(\pluck);

    // Wait for 3 seconds
    3.wait;

    // Stop recording
    s.stopRecording;

    // Stop server
    s.quit;
};
)
