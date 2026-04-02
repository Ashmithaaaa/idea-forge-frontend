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
      const response = await fetch("http://localhost:8080/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: idea,
        }),
      });

      const text = await response.text();

      // 🔥 Fix newline formatting
      const formatted = text.replace(/\\n/g, "\n");

      setResult(formatted);
    } catch (error) {
      console.error(error);
      alert("AI analysis failed");
    }

    setLoading(false);
  };

  return (
    <div className="container fade-in">
      <div className="card" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px" }}>
        <h2 className="page-title text-gradient" style={{ marginBottom: "24px", fontSize: "32px" }}>
          AI Startup Idea Analyzer
        </h2>

        <p className="page-subtitle" style={{ marginBottom: "24px" }}>
          Describe your startup idea below, and our AI will evaluate it for market viability, potential target demographics, and provide technical stack recommendations.
        </p>

        <textarea
          className="textarea"
          rows="6"
          placeholder="Enter your startup idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button className="primary-btn" style={{ fontSize: "16px", padding: "14px 24px" }} onClick={analyzeIdea} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Idea 🚀"}
        </button>

        {result && (
          <div className="fade-in" style={{
            marginTop: "40px",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            lineHeight: "1.8",
            fontSize: "15px"
          }}>
            <h3 style={{ marginBottom: "20px", color: "var(--accent-primary)" }}>Analysis Result</h3>
            <div style={{ color: "var(--text-secondary)" }}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeIdea;
