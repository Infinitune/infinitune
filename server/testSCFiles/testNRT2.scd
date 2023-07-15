(
var serverOptions, server, synthdef, score, filePath, duration;

// 1. Set the options for the server
serverOptions = ServerOptions.new;
serverOptions.numOutputBusChannels = 2;  // stereo
serverOptions.numInputBusChannels = 0;  // no input

// 2. Create a non-real-time server with these options
server = Server(\nrt, serverOptions);

// 3. Create a SynthDef that generates a sine wave
synthdef = SynthDef(\sine, { |out=0, freq=440, amp=0.1, dur=3|
    var signal = SinOsc.ar(freq) * amp;
    var env = EnvGen.kr(Env.linen(0.01, dur, 0.01), doneAction: Done.freeSelf);
    Out.ar(out, signal * env);
});

// 4. Create a score that plays this synth
score = Score.new;
score.add(0.0, synthdef, [\freq, 440, \amp, 0.1, \dur, 3]);

// 5. Write the score as an OSC file
filePath = "/tmp/sine_wave.osc";
File.delete(filePath);
score.write(filePath);

// 6. Render the OSC file to an audio file using scsynth
"/usr/local/bin/scsynth".unixCmd("-N % % % 44100 WAV float -o /tmp/sine_wave.wav".format(filePath, "/dev/null", "/dev/null"));

"Rendering completed.".postln;
)
