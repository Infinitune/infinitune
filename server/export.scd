(
Routine.run {
    var s = Server.default;

    // Define your synths
    SynthDef(\kick, { |out=0, freq=50, amp=0.5|
        var env = EnvGen.ar(Env.perc(0.01, 0.4), doneAction:2);
        var sig = SinOsc.ar(freq) * env;
        Out.ar(out, sig * amp);
    }).add;

    SynthDef(\snare, { |out=0, freq=233, amp=0.5|
        var env = EnvGen.ar(Env.perc(0.01, 0.4), doneAction:2);
        var sig = WhiteNoise.ar() * env;
        Out.ar(out, sig * amp);
    }).add;

    SynthDef(\hihat, { |out=0, freq=345, amp=0.5|
        var env = EnvGen.ar(Env.perc(0.01, 0.2), doneAction:2);
        var sig = WhiteNoise.ar() * env;
        Out.ar(out, sig * amp);
    }).add;

    SynthDef(\tom, { |out=0, freq=130, amp=0.5|
        var env = EnvGen.ar(Env.perc(0.01, 0.3), doneAction:2);
        var sig = SinOsc.ar(freq) * env;
        Out.ar(out, sig * amp);
    }).add;

    SynthDef("bass_triangle", { |out=0, freq=440, amp=0.5, dur=1|
        var env, sig;
        env = EnvGen.kr(Env.perc(0.01, dur * 0.5), doneAction:2);  // shorter decay time
        sig = LPF.ar(LFTri.ar(freq), 800) * env;  // triangle oscillator with low pass filter
        Out.ar(out, sig * amp);
    }).add;

    SynthDef("reverb_synth_saw_lpf", { |out=0, freq=440, amp=0.5, gate=1|
        var env, sig;
        env = EnvGen.kr(Env.asr(0.1, 1, 0.1), gate, doneAction:2);
        // Change to Saw wave oscillator for richer harmonics
        sig = Saw.ar(freq, env);
        // Apply lowpass filter
        sig = LPF.ar(sig, 700);
        // Add reverb to the signal
        sig = FreeVerb.ar(sig);
        Out.ar(out, sig * amp);
    }).add;

    // Wait for the server to add the synthdefs
    s.sync;

    // Start recording to a file
    s.record(path: "~/out.wav".standardizePath);

    // Tempo
    TempoClock.default.tempo = 100/60;

    // Patterns
    ~bar1 = [0, 0, 0, 0.75, 0, 0, 1, 0, 0, 0, 0, 0.75, 0, 0, 1, 0];
~bar2 = [0, 0, 0, 0.75, 0,  0, 1, 0, 0, 0.4, 0, 0.75, 0, 0, 1, 0];
~bar3 = [0, 0, 0, 0.75, 0, 0, 1, 0.2, 0, 0.4, 0, 0.75, 0, 0, 1, 0];
~bar12 = [0, 0, 0.4, 0.75, 0, 0, 1, 0, 0, 0, 0.4, 0.75, 0, 0, 1, 0];
~bar4 = [0, 0, 0.3, 0.75, 0, 0, 1, 0.2, 0, 0.4, 0, 0.75, 0, 0, 1, 0];

    Ppar([
        Pbind(
            \instrument, \kick,
            \dur, 1,
            \amp, Pseq([1, 1, 1, 1], inf)
        ),
        Pbind(
            \instrument, \snare,
            \dur, 0.25,
            \amp, Pseq((~bar1 ++ ~bar2 ++ ~bar1 ++ ~bar3 ++ ~bar12 ++ ~bar12 ++ ~bar12 ++ ~bar4), inf)
        ),
        Pbind(
            \instrument, \hihat,
            \dur, 1,
            \amp, Pseq([1, 1, 1, 1], inf)
        ),
        Pbind(
            \instrument, \tom,
            \dur, 1,
            \amp, Pseq([1, 0, 1, 0], inf)
        ),
        Pbind(
            \instrument, "bass_triangle",
            \scale, Scale.minor,
            \degree, Pseq([0, 0, 4, 2, 0, 0, 2, 7], inf),
            \dur, 1,
            \octave, 2,
            \amp, Pseq([1, 0, 1, 1], inf)
        ),
        Pbind(
            \instrument, "reverb_synth_saw_lpf",
            \scale, Scale.minor,
            \degree, Pseq([0, 2, 3, 5, 7, 8, 10, 12], inf),
            \dur, 0.5,
            \octave, Pseq([3, 4, 3, 2], inf),
            \amp, 1
        )
    ]).play;

    { LFNoise1.kr.postln; }.play;

    // Wait for the performance to finish
    9.6.wait;

    // Stop recording
    s.stopRecording;
};
)
