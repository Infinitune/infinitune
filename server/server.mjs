import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import sounds from "./routes/sound.mjs";  // Import the new routes

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/sound", sounds);  // Use the new routes

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
