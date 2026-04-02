import React from "react";
import { Link } from "react-router-dom";

const IdeaCard = ({ idea }) => {
  return (
    <div className="card fade-in">
      <h3 className="card-title">{idea.title}</h3>

      <p className="card-desc">{idea.problemStatement}</p>

      <div className="card-stats">
        <span>👍 {idea.votes}</span>
        <span>👁 {idea.views}</span>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to={`/idea/${idea.id}`}>
          <button className="card-btn">View Details →</button>
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;
