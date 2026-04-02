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
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <button className="primary-btn" style={{ padding: "8px 16px" }} onClick={handleUpvote} disabled={loading}>
        👍 Upvote
      </button>

      <span style={{ fontWeight: "800", fontSize: "18px", minWidth: "24px", textAlign: "center" }}>{votes}</span>

      <button className="secondary-btn" style={{ padding: "8px 16px" }} onClick={handleDownvote} disabled={loading}>
        👎 Downvote
      </button>
    </div>
  );
};

export default VoteButtons;
