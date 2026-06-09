import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";

const API_BASE = "https://idea-forge-backend-ayp1.onrender.com";

const Explore = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ideas`);
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error("Error loading ideas:", error);
    }
  };

  const searchIdeas = async (text) => {
    setSearchText(text);

    if (!text.trim()) {
      loadIdeas();
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/ideas/search?keyword=${encodeURIComponent(text)}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setIdeas(data);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setIdeas([]);
    }
  };

  const filterCategory = async (cat) => {
    setCategory(cat);

    if (!cat) {
      loadIdeas();
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/ideas/category?category=${encodeURIComponent(cat)}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setIdeas(data);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error("Category filter error:", error);
      setIdeas([]);
    }
  };

  return (
    <div className="container">
      <h2 style={title}>Explore Startup Ideas</h2>

      <input
        style={searchInput}
        placeholder="Search ideas..."
        value={searchText}
        onChange={(e) => searchIdeas(e.target.value)}
      />

      <select
        style={filter}
        value={category}
        onChange={(e) => filterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="FinTech">FinTech</option>
        <option value="Health">Health</option>
        <option value="SaaS">SaaS</option>
        <option value="Education">Education</option>
      </select>

      {ideas.length === 0 && (
        <p style={{ color: "#777" }}>No ideas found</p>
      )}

      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default Explore;

/* ---------- STYLES ---------- */

const title = {
  marginBottom: "20px",
};

const searchInput = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const filter = {
  width: "100%",
  padding: "12px",
  marginBottom: "25px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};