import React, { useState } from "react";
import { createIdea } from "../services/ideaService";
import { useNavigate } from "react-router-dom";

const SubmitIdea = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || "Guest";

  const [idea, setIdea] = useState({
    title: "",
    problemStatement: "",
    proposedSolution: "",
    targetAudience: "",
    technologyStack: "",
    category: "",
    authorName: username,
  });

  const handleChange = (e) => {
    setIdea({
      ...idea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idea.title || !idea.problemStatement || !idea.proposedSolution) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await createIdea({
        ...idea,
        authorName: username,
      });

      alert("Idea submitted successfully 🚀");

      setIdea({
        title: "",
        problemStatement: "",
        proposedSolution: "",
        targetAudience: "",
        technologyStack: "",
        category: "",
        authorName: username,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to submit idea");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: "20px" }}>Submit Your Startup Idea</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="title"
            placeholder="Idea Title"
            value={idea.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="textarea"
            name="problemStatement"
            placeholder="Problem Statement"
            value={idea.problemStatement}
            onChange={handleChange}
            required
          />

          <textarea
            className="textarea"
            name="proposedSolution"
            placeholder="Proposed Solution"
            value={idea.proposedSolution}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="targetAudience"
            placeholder="Target Audience"
            value={idea.targetAudience}
            onChange={handleChange}
          />

          <input
            className="input"
            name="technologyStack"
            placeholder="Technology Stack"
            value={idea.technologyStack}
            onChange={handleChange}
          />

          {/* CATEGORY DROPDOWN */}

          <select
            className="input"
            name="category"
            value={idea.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>

            <option value="AI">AI</option>
            <option value="FINTECH">FinTech</option>
            <option value="HEALTH">Health</option>
            <option value="SMART CITY">Smart City</option>
            <option value="EDUCATION">Education</option>
            <option value="SAAS">SaaS</option>
          </select>

          {/* USER DISPLAY */}

          <input
            className="input"
            value={`Submitting as: ${username}`}
            readOnly
          />

          <button className="primary-btn">Submit Idea</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
