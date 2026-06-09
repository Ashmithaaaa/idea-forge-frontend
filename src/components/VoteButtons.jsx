import React, { useState } from "react";
import { upvoteIdea, downvoteIdea } from "../services/voteService";

const VoteButtons = ({ ideaId, initialVotes = 0 }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const updated = await upvoteIdea(ideaId);

      if (updated) {
        setVotes(updated.votes);
      }
    } catch (error) {
      console.error("Upvote error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const updated = await downvoteIdea(ideaId);

      if (updated) {
        setVotes(updated.votes);
      }
    } catch (error) {
      console.error("Downvote error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <button onClick={handleUpvote} disabled={loading} style={btn}>
        👍 Upvote
      </button>

      <span style={count}>{votes}</span>

      <button onClick={handleDownvote} disabled={loading} style={btn}>
        👎 Downvote
      </button>
    </div>
  );
};

export default VoteButtons;

const btn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const count = {
  fontWeight: "bold",
  fontSize: "16px",
};
