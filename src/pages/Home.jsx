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
      setIdeas(data);
    } catch (error) {
      console.error("Error loading trending ideas", error);
    }
  };

  return (
    <div className="fade-in">
      {/* HERO SECTION */}
      <div style={hero}>
        <div style={heroContent}>
          <span className="tag" style={{ marginBottom: '24px' }}>✨ Community-driven idea validation</span>

          <h1 style={title}>
            Validate Your Startup Ideas
            <br />
            <span className="text-gradient">Before You Build Them</span>
          </h1>

          <p style={subtitle}>
            Share ideas, get feedback, discover innovation. Join thousands of
            founders validating concepts with real community insights.
          </p>

          <div style={buttons}>
            <button className="primary-btn" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={() => navigate("/submit")}>
              Submit Idea →
            </button>
            <button className="secondary-btn" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={() => navigate("/explore")}>
              Explore Ideas
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING IDEAS */}
      <div className="container">
        <h2 className="page-title" style={{ fontSize: '28px', marginBottom: '30px' }}>🔥 Trending Ideas</h2>

        {ideas.length === 0 && <p className="page-subtitle">No ideas available</p>}

        {ideas.map((idea) => (
          <div key={idea.id} className="card">
            <h3 className="card-title">{idea.title}</h3>
            <p className="card-desc">{idea.problemStatement}</p>

            <div className="card-stats">
              <span>👍 {idea.votes ?? 0}</span>
              <span>👁 {idea.views ?? 0}</span>
            </div>

            <button
              className="card-btn"
              style={{ marginTop: '16px' }}
              onClick={() => navigate(`/idea/${idea.id}`)}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

/* ---------- STYLES ---------- */

const hero = {
  padding: "120px 20px",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
};

const heroContent = {
  maxWidth: "900px",
  margin: "auto",
  position: "relative",
  zIndex: 1,
};

const title = {
  fontSize: "56px",
  fontWeight: "800",
  letterSpacing: "-1.5px",
  lineHeight: "1.1",
  color: "var(--text-primary)",
};

const subtitle = {
  fontSize: "20px",
  color: "var(--text-secondary)",
  marginTop: "24px",
  lineHeight: "1.6",
  maxWidth: "700px",
  margin: "24px auto 0",
};

const buttons = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};
