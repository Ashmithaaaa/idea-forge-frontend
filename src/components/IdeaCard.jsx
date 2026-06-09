import React from "react";
import { Link } from "react-router-dom";

const IdeaCard = ({ idea }) => {
  return (
    <div className="card">
      <h3 className="card-title">{idea.title}</h3>

      <p className="card-desc">{idea.problemStatement}</p>

      <div className="card-stats">
        👍 {idea.votes} &nbsp;&nbsp; 👁 {idea.views}
      </div>

      <Link to={`/idea/${idea.id}`}>
        <button className="card-btn">View Details →</button>
      </Link>
    </div>
  );
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: "10px",
};

const desc = {
  color: "#555",
  marginBottom: "10px",
};

const stats = {
  fontSize: "14px",
  marginBottom: "10px",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "bold",
};

export default IdeaCard;
