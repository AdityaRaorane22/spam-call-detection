import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./components/ui";


const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  let recognition;
  if (window.webkitSpeechRecognition) {
    const SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  } else {
    alert("Speech recognition is not supported in this browser.");
  }

  const handleRecord = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  const saveToFile = async () => {
    try {
      const response = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (response.ok) {
        alert("Transcript saved successfully!");
      } else {
        alert("Failed to save the transcript.");
      }
    } catch (error) {
      console.error("Error saving transcript: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-md rounded-2xl">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">
            Real-Time Call Recording
          </h1>
          <Button
            className={`w-full py-2 px-4 rounded-xl font-semibold ${
              isRecording ? "bg-red-500" : "bg-blue-500"
            } text-white transition duration-300`}
            onClick={handleRecord}
          >
            {isRecording ? "Stop Recording" : "Record My Call"}
          </Button>
          {transcript && (
            <>
              <p className="mt-4 text-gray-700">
                <strong>Transcript:</strong> {transcript}
              </p>
              <Button
                className="mt-4 bg-green-500 py-2 px-4 rounded-xl text-white"
                onClick={saveToFile}
              >
                Save Transcript
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
