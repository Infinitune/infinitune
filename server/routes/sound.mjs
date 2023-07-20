import express from "express";
import fsp from 'fs/promises';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';


const router = express.Router();
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env.local', overwrite: true});
console.log(fs.readFileSync('./.env.local', 'utf8'));
//console.log(process.env);

const key = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(configuration);

async function sendToGpt(text) {
  let timestamp = new Date().toISOString().replace(/[:.-]/g, '');
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

const dir = "./generated_code"

  // Create a .scd file with the output from the GPT model
  const scdFilePath = path.join(dir, `${timestamp}.js`);
  const scdContent = `
  document.getElementById('start').addEventListener('click', () => {
    ${gptOutput}
  });
    `;
    try {
      await fsp.access(dir);
    } catch {
      await fsp.mkdir(dir, { recursive: true });
    }
    
    await fsp.writeFile(scdFilePath, scdContent);
    return timestamp;
//console.log(scdContent)
}

function getFilePath(fileId) {
  // Get the URL of the current module
  const currentModuleUrl = import.meta.url;

  // Convert the URL to a file path
  const currentModulePath = fileURLToPath(currentModuleUrl);

  // Get the directory of the current module
  const currentDir = dirname(currentModulePath);

  // Construct the path of the .js file
  const filePath = join(currentDir, '..', '..', 'generated_code', `${fileId}.js`);

  // Return the path
  return filePath;
}

router.post("/drums", async (req, res) => {
  let textPrompt = req.body.text;
  console.log(textPrompt)
  let fileID = await sendToGpt(textPrompt);
  res.send(fileID).status(201);
});

router.get("/drums/:id", async (req, res) => { //needs work
  let fileId = req.params.id;
  let jsFilePath = await getFilePath(fileId);
  fs.readFile(jsFilePath, 'utf8', (err, jsFile) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while reading the file.");
      return;
    }
  
    res.setHeader('Content-Type', 'application/javascript');
    res.send(jsFile);
  });
});

export default router;


//071923: NVM BABY IT WORKS LEGGOOOOO