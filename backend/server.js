const express = require("express");
const fs = require("fs");
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());

app.post("/save", (req, res) => {
  const { transcript } = req.body;
  const filePath = "C:\\Users\\adity\\Desktop\\Innerve\\call_recordings\\transcript.txt";

  // Prepare the transcript with a delimiter or separator (e.g., a new line)
  const formattedTranscript = `\n---- New Entry ----\n${transcript}`;

  fs.appendFile(filePath, formattedTranscript, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).send("Failed to save file.");
    }
    res.status(200).send("File saved successfully.");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
