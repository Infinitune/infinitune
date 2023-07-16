import express from "express";
import { exec } from "child_process";
import { promises as fs } from "fs";

const router = express.Router();
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local'});

const key = process.env.OPENAI_API_KEY;
console.log(key);


const configuration = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(configuration);


async function sendToGpt(text) {
  // Call the OpenAI API here with the text and get the output
  // This part will depend on how you're interfacing with the OpenAI API
  // For now, let's say that the output is stored in a variable called `gptOutput`

  const gptOutputArray = await openai.createChatCompletion({
  model: "gpt-4",
  messages: [{"role":"user","content":`make this input into a sentence:${text}`}
]
});

console.log(gptOutputArray.data.choices[0].text);
console.log(gptOutputArray.data.choices[0].message);

const gptOutput = gptOutputArray.data.choices[0].text;
//console.log(completion.data.choices[0].message);

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