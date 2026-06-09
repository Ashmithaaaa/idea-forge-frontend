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
    <div>
      {/* HERO SECTION */}

      <div style={hero}>
        <div style={heroContent}>
          <span style={tag}>✨ Community-driven idea validation</span>

          <h1 style={title}>
            Validate Your Startup Ideas
            <span style={highlight}> Before You Build Them</span>
          </h1>

          <p style={subtitle}>
            Share ideas, get feedback, discover innovation. Join thousands of
            founders validating concepts with real community insights.
          </p>

          <div style={buttons}>
            <button style={primaryBtn} onClick={() => navigate("/submit")}>
              Submit Idea →
            </button>

            <button style={secondaryBtn} onClick={() => navigate("/explore")}>
              Explore Ideas
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING IDEAS */}

      <div className="container">
        <h2 style={{ marginBottom: "25px" }}>🔥 Trending Ideas</h2>

        {ideas.length === 0 && <p>No ideas available</p>}

        {ideas.map((idea) => (
          <div key={idea.id} style={card}>
            <h3>{idea.title}</h3>

            <p>{idea.problemStatement}</p>

            <div style={stats}>
              👍 {idea.votes ?? 0}
              &nbsp;&nbsp; 👁 {idea.views ?? 0}
            </div>

            <button
              style={viewBtn}
              onClick={() => navigate(`/idea/${idea.id}`)}
            >
              View Details
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
  background: "linear-gradient(180deg,#f8fafc,#eef2ff)",
  padding: "100px 20px",
  textAlign: "center",
};

const heroContent = {
  maxWidth: "900px",
  margin: "auto",
};

const tag = {
  background: "#e0e7ff",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "14px",
  color: "#4338ca",
};

const title = {
  fontSize: "48px",
  fontWeight: "800",
  marginTop: "20px",
};

const highlight = {
  color: "#6366f1",
};

const subtitle = {
  fontSize: "18px",
  color: "#555",
  marginTop: "20px",
  lineHeight: "1.6",
};

const buttons = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const primaryBtn = {
  background: "linear-gradient(90deg,#6366f1,#3b82f6)",
  color: "white",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryBtn = {
  background: "#ffffff",
  border: "1px solid #6366f1",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#6366f1",
  fontWeight: "600",
};

const card = {
  background: "white",
  padding: "20px",
  marginTop: "15px",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
};

const stats = {
  marginTop: "10px",
  color: "#666",
};

const viewBtn = {
  marginTop: "10px",
  background: "#6366f1",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
