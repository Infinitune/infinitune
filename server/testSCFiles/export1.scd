Server.supernova;
s = Server(\nrt, NetAddr("127.0.0.1", 57110));

s.options.numAudioBusChannels = 2;
s.options.sampleRate = 44100;

// Define your synths
SynthDef(\kick, { |out=0, freq=50, amp=0.5|
    var env = EnvGen.ar(Env.perc(0.01, 0.4), doneAction:2);
    var sig = SinOsc.ar(freq) * env;
    Out.ar(out, sig * amp);
}).store;

SynthDef(\snare, { |out=0, freq=233, amp=0.5|
    var env = EnvGen.ar(Env.perc(0.01, 0.4), doneAction:2);
    var sig = WhiteNoise.ar() * env;
    Out.ar(out, sig * amp);
}).store;

SynthDef(\hihat, { |out=0, freq=345, amp=0.5|
    var env = EnvGen.ar(Env.perc(0.01, 0.2), doneAction:2);
    var sig = WhiteNoise.ar() * env;
    Out.ar(out, sig * amp);
}).store;

SynthDef(\tom, { |out=0, freq=130, amp=0.5|
    var env = EnvGen.ar(Env.perc(0.01, 0.3), doneAction:2);
    var sig = SinOsc.ar(freq) * env;
    Out.ar(out, sig * amp);
}).store;

SynthDef("bass_triangle", { |out=0, freq=440, amp=0.5, dur=1|
    var env, sig;
    env = EnvGen.kr(Env.perc(0.01, dur * 0.5), doneAction:2);  // shorter decay time
    sig = LPF.ar(LFTri.ar(freq), 800) * env;  // triangle oscillator with low pass filter
    Out.ar(out, sig * amp);
}).store;

SynthDef("reverb_synth_saw_lpf", { |out=0, freq=440, amp=0.5, gate=1|
    var env, sig;
    env = EnvGen.kr(Env.asr(0.1, 1, 0.1), gate, doneAction:2);
    sig = Saw.ar(freq, env);
    sig = LPF.ar(sig, 700);
    sig = FreeVerb.ar(sig);
    Out.ar(out, sig * amp);
}).store;

// Create a Score object to hold the events
var score = Score.new;

// Add events to the score
// Here you need to translate your patterns into score events
// For example, to add a kick drum hit at time 0 with a duration of 1 second, you could do:
score.add(0, [\type, \note, \instrument, \kick, \dur, 1, \amp, 1, \out, 0]);

// Repeat for each event in your patterns...

// Render the score to a file
s.recordNRT(score, "~/out.wav", sampleRate:44100, numOutputBusChannels:2, action: { "Done.".postln; });
