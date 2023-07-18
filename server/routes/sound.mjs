import express from "express";
import { promises as fs } from "fs";
import { spawn } from 'child_process';
import { exec } from 'child_process';
import { promisify } from 'util';


const router = express.Router();
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import path from 'path';
const timestamp = new Date().toISOString().replace(/[:.-]/g, '');

const execAsync = promisify(exec);

dotenv.config({ path: '../.env.local'});

const key = process.env.OPENAI_API_KEY;


const configuration = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(configuration);

function correctSyntax(gptOutput) {
    let corrected = gptOutput;

   // substitute the string 'gen' to '\gen' (for literal '\', extra \ has been added)
  corrected = corrected.replace("SynthDef(gen,", "SynthDef(\\gen,");
  // substitute the string 'out.kr' to '\out.kr' (for literal '\', extra \ has been added)
  corrected = corrected.replace("Out.ar(out.kr", "Out.ar(\\out.kr");

  corrected = corrected.replace("transpose.kr", "\\transpose.kr");
    corrected = corrected.replace("amp.kr", "\\amp.kr");
    return corrected;
}

async function sendToGpt(text) {
  // Call the OpenAI API here with the text and get the output
  // This part will depend on how you're interfacing with the OpenAI API
  // For now, let's say that the output is stored in a variable called `gptOutput`
  const gptOutputArray = await openai.createChatCompletion({
  model: "gpt-4",
  messages: [{"role": "system", "content": `You can write Tone.js code for different drum sounds based on inputs from the user. You do not output anything except the code. Do not include any explanations. The code will be in the following format: 
    const noise = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: {
            attack: 0.001,
            decay: 0.2,
            sustain: 0
        }
    }).toDestination();

    const metal = new Tone.MetalSynth({
        frequency: 200,
        envelope: {
            attack: 0.001,
            decay: 0.1,
            release: 0.01
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
    }).toDestination();

    noise.triggerAttackRelease("16n");
    metal.triggerAttackRelease("16n");
});`}, 
  {"role": "user", "content": "very punchy dubstep kick with a pronounced transient"},
{"role": "assistant", "content": `
const kick = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 10,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toDestination();

kick.triggerAttackRelease('C1', '8n');
`},
{"role": "user", "content":"make a booty clap "},
{"role": "assistant", "content":`
var noise = new Tone.NoiseSynth({
  noise: {
      type: 'white'
  },
  envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.005,
      release: 0.1
  }
}).toDestination();

// Trigger the clap sound
for (var i = 0; i < 3; i++) {
  noise.triggerAttackRelease('16n', '+' + (i * 0.02));
}
`},
{"role":"user", "content":text}
],
temperature: 0
});

//console.log(gptOutputArray.data.choices[0].message.content);

//const gptOutput = correctSyntax(gptOutputArray.data.choices[0].message.content); (not needed yet)
const gptOutput = gptOutputArray.data.choices[0].message.content;

console.log(gptOutput);
const dir = '../generated_code/';

  // Create a .scd file with the output from the GPT model
  const scdFilePath = path.join(dir, 'gen.scd');
  const scdContent = `
    // .scd file content
    ${gptOutput}
    (
    s.waitForBoot {
    
        // Get a timestamp
    
        // Start recording to a file
        s.record(path: "~/infinitune/server/generated_sounds/" ++ "${timestamp}" ++ ".wav");
    
        // Play the simple sine wave
        Synth(\\gen);
    
        // Wait for 3 seconds
        3.wait;
    
        // Stop recording
        s.stopRecording;
    
        // Print the path to the .wav file
        "~/infinitune/server/generated_sounds/" ++ "${timestamp}" ++ ".wav".postln;
    
        // Stop server
        s.quit;
    };
)`;
//console.log(scdContent)

try {
  await fs.access(dir);
} catch {
  await fs.mkdir(dir, { recursive: true });
}

await fs.writeFile(scdFilePath, scdContent);

return scdFilePath;
}


/*async function generateSound(scdFilePath) {
    const scriptPath = './term.sh'; // Replace with the actual path to your script

    // Run the script
    await execAsync(`bash ${scriptPath}`);

    // Construct the path to the .wav file
    // This will depend on how you're naming and saving the .wav files in your SuperCollider script
    const wavFilePath = `./generated_sounds/${timestamp}.wav`; // Replace with the actual path to the .wav file

    return wavFilePath;
}*/

function getWavFile(fileId) {
    // Construct the URL of the .wav file
    const wavFileUrl = `https://2a83-68-7-31-205.ngrok-free.app/sounds/${fileId}.wav`;
  
    // Return the URL
    return wavFileUrl;
  }


router.post("/", async (req, res) => {
  let textPrompt = req.body.text;
  let scCode = await sendToGpt(textPrompt);
  let fileId = await generateSound(scCode);
  console.log(fileId)
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