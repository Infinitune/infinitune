import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import sounds from "./routes/sound.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the "generated_sounds" directory
app.use('/sounds', express.static(join(__dirname, 'generated_sounds')));

app.use("/sound", sounds);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
