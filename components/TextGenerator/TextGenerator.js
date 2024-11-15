import React, { useState, useEffect } from "react";
import Image from "next/image";
import DocImg from "../../public/images/icons/document-file.png";
import Form from "../Common/Form";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CommingSoon from "../CommingSoon/CommingSoon";

// Function to clean and format data into a readable format
const formatReadableText = (data) => {
  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2) // Convert object to string with indents
      .replace(/"/g, '')                 // Remove double quotes
      .replace(/[{]/g, '')               // Remove opening curly brackets
      .replace(/[}]/g, '')               // Remove closing curly brackets
      .replace(/,/g, '\n')               // Replace commas with new lines for readability
      .trim();                           // Trim any trailing spaces or new lines
  }
  return data; // If not an object, return as is
};

const TextGenerator = () => {
  const [responsesStack, setResponsesStack] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const onApiResponse = (eventType, data) => {
    console.log("onApiResponse", eventType, data);

    try {
      if (typeof data === "string" && (data.trim().startsWith('{') || data.trim().startsWith('['))) {
        data = JSON.parse(data);
        data = data.replace(/\"/g, "'");

  // Remove outer curly braces
  data = data.replace(/^\{(.*)\}$/, '$1');

  // Remove square brackets around array elements
  data = data.replace(/\[(.*?)\]/g, '$1');

  
        
      }
    } catch (error) {
      console.error("Failed to parse data:", error);
      return;
    }

    setResponsesStack((prevStack) => [...prevStack, { eventType, data }]);
  };

  const renderContent = () => {
    if (responsesStack.length === 0) {
      return <p>No content available</p>;
    }

    const { eventType, data } = responsesStack[activeTab];

    switch (eventType) {
      case "transcription":
        return (
          <div className="space-y-4">
            <ReactMarkdown>{formatReadableText(data)}</ReactMarkdown>
          </div>
        );
      case "formatted_report":
        if (!data) return <p>No report available</p>;
        return (
          <div className="space-y-6">
            <pre className="text-sm whitespace-pre-wrap">
             <ReactMarkdown>
               {formatReadableText(data)}
              </ReactMarkdown> 
            </pre>
          </div>
        );
      case "exercise_plan":
        if (!data?.["Exercise Plan"]) return <p>No exercise plan available</p>;
        return (
          <div className="space-y-4">
            <ReactMarkdown>

            {data["Exercise Plan"].map((exercise, index) => (
              <div key={index} className="bg-dark-100 p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold">{exercise["Exercise Name"]}</h3>
                <div className="text-sm font-medium">
                  <strong>Frequency:</strong> {exercise["Frequency/Repetitions"]}
                </div>
                <div className="text-sm text-gray-600">
                  {formatReadableText(exercise["Description"])}
                </div>
              </div>
            ))}
            </ReactMarkdown>
          </div>
        );
      default:
        return <p>Unknown content type</p>;
    }
  };

  const handleTabChange = (index) => {
    if (index < responsesStack.length) {
      setActiveTab(index);
    }
  };

  return (
    <div className="text-generator-wrapper">
      <div className="top-bar flex items-center gap-2 mb-4">
        <Image src={DocImg} alt="Document Icon" width={14} height={18} />
        <h2 className="text-sm font-semibold">Assessment and Exercise Plan</h2>
      </div>

      <div className="bg-dark-100 shadow-lg rounded-md p-6">
        <div className="tabs w-full flex border-b">
          {responsesStack.map((response, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`btn btn-primary mx-2 p-2 flex-1 ${activeTab === index ? "border-b-2 border-blue-500" : ""}`}
            >
              {response.eventType.charAt(0).toUpperCase() + response.eventType.slice(1).replace(/_/g, ' ')
              }
            </button>
          ))}
        </div>

        <div className="tab-content mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="h-[400px] w-full rounded-md border p-4 overflow-y-auto">
              {renderContent()}
            </div>
          )}
        </div>
      </div>

      <div className="rbt-static-bar mt-4">
        <Form onApiResponse={onApiResponse} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default TextGenerator;
