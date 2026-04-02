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

      // ✅ FIX
      setIdeas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading trending ideas", error);
      setIdeas([]); // ✅ fallback
    }
  };

  return (
    <div className="fade-in">
      {/* HERO SECTION */}
      <div style={hero}>
        <div style={heroContent}>
          <span className="tag" style={{ marginBottom: "24px" }}>
            ✨ Community-driven idea validation
          </span>

          <h1 style={title}>
            Validate Your Startup Ideas
            <br />
            <span className="text-gradient">Before You Build Them</span>
          </h1>

          <p style={subtitle}>
            Share ideas, get feedback, discover innovation. Join thousands of
            founders validating concepts.
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

      {/* TRENDING IDEAS */}
      <div className="container">
        <h2 className="page-title">🔥 Trending Ideas</h2>

        {/* ✅ SAFE EMPTY CHECK */}
        {!Array.isArray(ideas) || ideas.length === 0 ? (
          <p className="page-subtitle">No ideas available</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="card">
              <h3>{idea.title}</h3>
              <p>{idea.problemStatement}</p>

              <div>
                👍 {idea.votes ?? 0} | 👁 {idea.views ?? 0}
              </div>

              <button onClick={() => navigate(`/idea/${idea.id}`)}>
                View Details →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
