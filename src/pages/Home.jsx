import React, { useEffect, useState } from "react";
import { getTrendingIdeas } from "../services/ideaService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const data = await getTrendingIdeas();
      setIdeas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading trending ideas", error);
      setIdeas([]);
    }
  };

  return (
    <div className="fade-in">
      {/* HERO */}
      <div style={hero}>
        <div style={heroContent}>
          <span className="tag">✨ Community-driven idea validation</span>

          <h1 style={title}>
            Validate Your Startup Ideas <br />
            <span className="text-gradient">Before You Build Them</span>
          </h1>

          <p style={subtitle}>
            Share ideas, get feedback, discover innovation.
          </p>

          <div style={buttons}>
            <button className="primary-btn" onClick={() => navigate("/submit")}>
              Submit Idea →
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/explore")}
            >
              Explore Ideas
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING */}
      <div className="container">
        <h2 className="page-title">🔥 Trending Ideas</h2>

        {!Array.isArray(ideas) || ideas.length === 0 ? (
          <p>No ideas available</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="card">
              <h3>{idea.title}</h3>
              <p>{idea.problemStatement}</p>

              <div>
                👍 {idea.votes ?? 0} | 👁 {idea.views ?? 0}
              </div>

              <button onClick={() => navigate(`/idea/${idea.id}`)}>
                View →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

/* ✅ ADD THIS PART (THIS WAS MISSING) */

const hero = {
  padding: "100px 20px",
  textAlign: "center",
};

const heroContent = {
  maxWidth: "800px",
  margin: "0 auto",
};

const title = {
  fontSize: "48px",
  fontWeight: "800",
};

const subtitle = {
  marginTop: "20px",
  fontSize: "18px",
};

const buttons = {
  marginTop: "30px",
  display: "flex",
  gap: "10px",
  justifyContent: "center",
};
