import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import sounds from "./routes/sound.mjs";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local'});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

const corsOptions = {
  origin: 'https://www.infinitune.org/',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


// Serve static files from the "generated_sounds" directory
app.use('/sounds', express.static(join(__dirname, 'generated_sounds')));

app.use("/sound", sounds);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
