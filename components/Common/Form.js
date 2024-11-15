import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

const Form = ({ onApiResponse, setIsLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [recorder, setRecorder] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const getAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        setRecorder(mediaRecorder);
      } catch (err) {
        console.error("Error accessing microphone", err);
      }
    };

    if (!recorder && typeof window !== "undefined") {
      getAudioStream();
    }
  }, [recorder]);

  const startRecording = () => {
    if (recorder) {
      recorder.start();
      setIsRecording(true);
      recorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(audioBlob));
        sendAudioToApi(audioBlob);
      };
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioBlob = new Blob([file], { type: file.type });
      setAudioURL(URL.createObjectURL(audioBlob));
      sendAudioToApi(audioBlob);
    }
  };

  const cleanStreamData = (data) => {
    // Remove any prefix and clean up whitespace
    let cleanData = data.replace(/^data:\s*/, '').trim();
    
    // Extract the actual data content
    const dataMatch = cleanData.match(/'data':\s*(.*)/);
    if (dataMatch) {
      cleanData = dataMatch[1].trim();
    }

    // Clean up escape characters and normalize line endings
    cleanData = cleanData
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\\t/g, '\t');

    // Remove any wrapping quotes
    if ((cleanData.startsWith("'") && cleanData.endsWith("'")) ||
        (cleanData.startsWith('"') && cleanData.endsWith('"'))) {
      cleanData = cleanData.slice(1, -1);
    }

    return cleanData;
  };

  const parseJsonSafely = (str) => {
    try {
      // First clean the string
      const cleanStr = cleanStreamData(str);
      
      // Check if it's JSON-like
      if (cleanStr.startsWith('{') || cleanStr.startsWith('[')) {
        return JSON.parse(cleanStr);
      }
      
      return cleanStr; // Return as-is if not JSON
    } catch (e) {
      console.warn("JSON parsing warning:", e);
      return str; // Return original string if parsing fails
    }
  };

  const processStreamData = (data) => {
    try {
      const parsedData = parseJsonSafely(data);

      if (typeof parsedData === 'object' && parsedData !== null) {
        // Check for transcription text in data field
        if (parsedData.data && typeof parsedData.data === 'string') {
          onApiResponse('transcription', parsedData.data);
          return;
        }

        // Check for formatted report
        if (parsedData["Patient Name"]) {
          onApiResponse('formatted_report', parsedData);
          return;
        }

        // Check for exercise plan
        if (parsedData["Exercise Plan"]) {
          onApiResponse('exercise_plan', parsedData);
          return;
        }

        // If it's an object but doesn't match known formats, stringify it
        onApiResponse('transcription', JSON.stringify(parsedData));
      } else if (typeof parsedData === 'string') {
        // Handle plain text
        onApiResponse('transcription', parsedData);
      }
    } catch (error) {
      console.error("Error processing stream data:", error);
      // Still try to show something to the user
      if (typeof data === 'string') {
        onApiResponse('transcription', data);
      }
    }
  };

  const sendAudioToApi = async (audioBlob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    try {
      const response = await fetch("http://127.0.0.1:8000/process_audio/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            if (buffer.trim()) {
              processStreamData(buffer);
            }
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Split by newlines and process complete messages
          const lines = buffer.split('\n');
          buffer = lines.pop() || ""; // Keep the last incomplete line in buffer

          for (const line of lines) {
            if (line.trim()) {
              processStreamData(line);
            }
          }
        }
      } else {
        console.error("API request failed:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form className="new-chat-form border-gradient">
        <textarea rows="1" placeholder="Send a message..." readOnly />
        <div className="left-icons">
          <div title="AiWave" className="form-icon icon-gpt">
            <i className="fa-sharp fa-regular fa-aperture"></i>
          </div>
        </div>
        <div className="right-icons">
          <div className="form-icon icon-plus" data-tooltip-id="my-tooltip" data-tooltip-content="Choose File">
            <input type="file" accept="audio/*" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
            <label htmlFor="file-upload">
              <i className="fa-sharp fa-regular fa-plus"></i>
            </label>
          </div>
          <button
            type="button"
            className="form-icon icon-mic"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={isRecording ? "Stop Recording" : "Voice Search"}
            onClick={handleMicClick}
          >
            <i className="fa-regular fa-waveform-lines"></i>
          </button>
        </div>
      </form>

      {audioURL && (
        <div className="mt-4">
          <audio ref={audioRef} src={audioURL} controls className="w-full" />
        </div>
      )}
    </>
  );
};

export default Form;