import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Explore = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/ideas`);
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
        `${BASE_URL}/api/ideas/search?keyword=${encodeURIComponent(text)}`,
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
        `${BASE_URL}/api/ideas/category?category=${encodeURIComponent(cat)}`,
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
    <div className="container fade-in">
      <h2
        className="page-title"
        style={{ marginBottom: "24px", fontSize: "32px" }}
      >
        Explore Startup Ideas
      </h2>

      <input
        className="input"
        placeholder="Search ideas by title or keyword..."
        value={searchText}
        onChange={(e) => searchIdeas(e.target.value)}
      />

      <select
        className="input select"
        value={category}
        onChange={(e) => filterCategory(e.target.value)}
        style={{ marginBottom: "32px" }}
      >
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="FinTech">FinTech</option>
        <option value="Health">Health</option>
        <option value="SaaS">SaaS</option>
        <option value="Education">Education</option>
      </select>

      {ideas.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "var(--bg-glass)",
            borderRadius: "12px",
          }}
        >
          <p className="page-subtitle">No ideas found matching your search.</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
