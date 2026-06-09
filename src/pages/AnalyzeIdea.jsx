import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const AnalyzeIdea = () => {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeIdea = async () => {
    if (!idea.trim()) {
      alert("Please enter an idea");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "https://idea-forge-backend-ayp1.onrender.com/api/ai/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze idea");
      }

      const text = await response.text();

      const formatted = text.replace(/\\n/g, "\n");

      setResult(formatted);
    } catch (error) {
      console.error(error);
      alert("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>AI Startup Idea Analyzer</h2>

      <textarea
        style={textarea}
        rows="6"
        placeholder="Enter your startup idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button style={button} onClick={analyzeIdea}>
        {loading ? "Analyzing..." : "Analyze Idea"}
      </button>

      {result && (
        <div style={resultBox}>
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AnalyzeIdea;

const container = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
};

const title = {
  marginBottom: "20px",
};

const textarea = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const button = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
};

const resultBox = {
  marginTop: "30px",
  background: "#f9fafb",
  padding: "25px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  lineHeight: "1.7",
};