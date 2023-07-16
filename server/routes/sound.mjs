import express from "express";
import { exec } from "child_process";
import { promises as fs } from "fs";

const router = express.Router();
import { Configuration, OpenAIApi } from "openai";

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/sounds', express.static(join(__dirname, 'generated_sounds')));


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


async function sendToGpt(text) {
  // Call the OpenAI API here with the text and get the output
  // This part will depend on how you're interfacing with the OpenAI API
  // For now, let's say that the output is stored in a variable called `gptOutput`

  const gptOutputArray = await openai.createChatCompletion({
  model: "gpt-4",
  messages: [{"role": "system", "content": "You can write SuperCollider SynthDef code based on input conditions provided by the user, as detailed as possible. You do not output anything except a SynthDef. Do not include any explanations."}, 
  {role: "user", content: "synth, bass, pluck, house, deep, techno, bass house, deep, cool, layered, layer, detuned, detune, hit"},
{role: "assistant", content: `SynthDef(\gen, {
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
}).add;`},
{role: "user", content:"drum, kick, hard, house, punchy, boxy, box, bright"},
{role: "assistant", content:`SynthDef(\gen, {
    var snd, velocity;
    velocity = \velocity.kr(1).clip(0, 1);
    snd = SinOsc.ar(
            69
            * (1 + (3 * Env.perc(0.0, 0.3, curve: -9).ar * velocity))
            * (1 + (8 * Env.perc(0.0, 0.01, curve: -4).ar * velocity))
            * [1, 2.3, 1.4]
    );
    snd = snd * (Env.perc(0, [3.0, 0.5, 0.1]).ar);
    snd = (snd * [0, -10, -15].dbamp).sum;
    snd = snd + (BPF.ar(Hasher.ar(Sweep.ar), 12420, 0.3) * Env.perc(0.001, 0.015).ar * 5.dbamp);
    snd = (snd * 6.dbamp).tanh;
    snd = snd * Env.perc(0.0005, 0.8 * velocity.sqrt).ar(Done.freeSelf);
    snd = (snd * 5.dbamp * velocity).clip2;
    snd = snd * -6.dbamp;
    snd = Pan2.ar(snd, \pan.kr(0));
    Out.ar(\out.kr(0), snd);
}).add;`},
{role: "user", content:"drum, kick, hard, transient, punchy"},
{role: "assistant", content:`SynthDef(\gen, {
    var snd;
    snd = SinOsc.ar(59 * (1 + (5 * Env.perc(0, 0.1, curve: -8).ar)) * (1 + (0.4 * Env.perc(0, 0.2, curve: -2).ar)));
    snd = snd + (SinOsc.ar(XLine.ar(7000, 100, 0.03)) * Env.perc(0.002, 0.03).ar);
    snd = snd + (BPF.ar(Hasher.ar(Sweep.ar), 8130, 0.5) * Env.perc(0.001, 0.03).ar * -9.dbamp);
    snd = snd * (1 + Env.perc(0.0, 0.5).ar);
    snd = snd.tanh;
    snd = snd * Env.perc(0.001, 0.5, curve: -4).ar(Done.freeSelf);
    snd = snd * -4.dbamp;
    snd = snd ! 2;
    Out.ar(\out.kr(0), snd);
}).add;`},
{role: "user", content: "drum, hat, closed, chiptune, white noise, noisy, noise short, very short, small, clicky, click, tick"},
{role: "assistant", content: `SynthDef(\gen, {
    var snd;
    snd = SinOsc.ar(1320) * Env.perc(0.001, 0.03).ar * 8000;
    snd = SinOsc.ar(3340 + snd) * Env.perc(0.001, 0.1).ar * 16000;
    snd = SinOsc.ar(1220 + snd);
    snd = snd + Hasher.ar(Sweep.ar);
    snd = BPF.ar(snd, [3844, 12844, 5249], 0.3);
    snd = snd * [-10, -5, 0].dbamp;
    snd = snd.sum;
    snd = snd * Env.perc(0.003, 0.05, curve: -8).ar(Done.freeSelf);
    snd = Pan2.ar(snd, \pan.kr(0));
    Out.ar(\out.kr(0), snd);
}).add;`},
{role: "user", content: "drum, snare, dubstep, loud, hard, tonal"},
{role: "assistant", content: `SynthDef(\gen, {
    var snd;
    snd = SinOsc.ar(
            319
            * (1 + (0.5 * Env.perc(0.0, 0.1, curve: -9).ar))
            * (1 + (0.3 * Env.perc(0.0, 0.03, curve: -4).ar))
            * [0.56, 1, 2.3, 3.4]
    );
    snd = snd * (Env.perc(0, [0.3, 3.0, 0.2, 0.1]).ar);
    snd = (snd * [-5, 0, -5, -3].dbamp).sum;
    snd = snd + (BPF.ar(Hasher.ar(Sweep.ar), [2420, 5420, 8329], 0.5) * Env.perc(0.05, 0.2).ar * [5, 0, -8].dbamp).sum;
    snd = (snd * 8.dbamp).tanh;
    snd = snd * Env.perc(0.0005, 0.12, curve: -1).ar(Done.freeSelf);
    snd = snd * -3.dbamp;
    snd = Pan2.ar(snd, \pan.kr(0));
    Out.ar(\out.kr(0), snd);
}).add;`},
{role:"user", content:text}
]
});

const gptOutput = completion.data.choices[0].text.trim();
console.log(completion.data.choices[0].message);

  // Create a .scd file with the output from the GPT model
  const scdFilePath = '../generated_code/gen.scd';
  const scdContent = `
    // .scd file content
    ${gptOutput}
    (
    s.waitForBoot {
    
        // Get a timestamp
        var timestamp = Date.getDate.format("%Y%m%d%H%M%S");
    
        // Start recording to a file
        s.record(path: "~/infinitune/server/generated_sounds/" ++ timestamp ++ ".wav");
    
        // Play the simple sine wave
        Synth(\gen);
    
        // Wait for 3 seconds
        3.wait;
    
        // Stop recording
        s.stopRecording;
    
        // Print the path to the .wav file
        "~/infinitune/server/generated_sounds/" ++ timestamp ++ ".wav".postln;
    
        // Stop server
        s.quit;
    };
)  `;

  await fs.writeFile(scdFilePath, scdContent);

  return scdFilePath;
}

async function generateSound(scdFilePath) {
  // Use the exec function to run the "sclang .scd" command
  return new Promise((resolve, reject) => {
    exec(`sclang ${scdFilePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        // The .wav file path is printed to stdout by the Supercollider script
        const wavFilePath = stdout.trim();

        resolve(wavFilePath);
      }
    });
  });
}

function getWavFile(fileId) {
    // Construct the URL of the .wav file
    const wavFileUrl = `https://2a83-68-7-31-205.ngrok-free.app/sounds/${fileId}.wav`;
  
    // Return the URL
    return wavFileUrl;
  }


router.post("/", async (req, res) => {
  let textPrompt = req.body.text;
  let scCode = await sendToGpt(textPrompt);
  let wavFile = await generateSound(scCode);
  let fileId = await storeWavFile(wavFile);
  res.send({fileId: fileId}).status(201);
});

router.get("/:id", async (req, res) => {
  let fileId = req.params.id;
  let wavFile = await getWavFile(fileId);
  if (!wavFile) res.status(404).send("File not found");
  else {
    res.setHeader('Content-Type', 'audio/wav');
    res.send(wavFile);
  }
});

export default router;