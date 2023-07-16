import express from "express";
import cors from "cors";
import path from "path";
import sounds from "./routes/sounds.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the "generated_sounds" directory
app.use('/sounds', express.static(path.join(__dirname, 'generated_sounds')));

app.use("/sound", sounds);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});