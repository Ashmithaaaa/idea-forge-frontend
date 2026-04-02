import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import VoteButtons from "../components/VoteButtons";
import CommentSection from "../components/CommentSection";

import {
  getIdeaById,
  getSimilarIdeas,
  getMatchingUsers,
} from "../services/ideaService";

import { sendCollaborationRequest } from "../services/collaborationService";

const IdeaDetails = () => {
  const { id } = useParams();

  const [idea, setIdea] = useState(null);
  const [similarIdeas, setSimilarIdeas] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name;

  useEffect(() => {
    if (id) {
      loadIdea();
      loadSimilarIdeas();
      loadMatches();
    }
  }, [id]);

  // =========================
  // LOAD IDEA
  // =========================

  const loadIdea = async () => {
    try {
      const data = await getIdeaById(id);
      setIdea(data);
    } catch (error) {
      console.error("Error loading idea:", error);
    }
  };

  // =========================
  // LOAD SIMILAR IDEAS
  // =========================

  const loadSimilarIdeas = async () => {
    try {
      const data = await getSimilarIdeas(id);
      setSimilarIdeas(data);
    } catch (error) {
      console.error("Error loading similar ideas:", error);
    }
  };

  // =========================
  // LOAD MATCHED USERS
  // =========================

  const loadMatches = async () => {
    try {
      const data = await getMatchingUsers(id);
      console.log("MATCH USERS:", data);
      setMatchedUsers(data);
    } catch (error) {
      console.error("Match error", error);
    }
  };

  // =========================
  // COLLABORATION REQUEST
  // =========================

  const handleCollaboration = async () => {
    if (!username) {
      alert("Please login first");
      return;
    }

    if (username === idea.authorName) {
      alert("You cannot collaborate on your own idea");
      return;
    }

    try {
      await sendCollaborationRequest({
        ideaId: idea.id,
        requesterName: username,
        requesterEmail: user?.email || "",
        requesterSkills: user?.skills || "",
        message: "I'd like to collaborate on this idea.",
      });

      alert("Collaboration request sent!");
    } catch (error) {
      alert("You already requested collaboration for this idea");
    }
  };

  // =========================
  // INVITE FROM RECOMMENDED LIST
  // =========================

  const sendInvite = async (collabUser) => {
    if (!username) {
      alert("Please login first");
      return;
    }

    try {
      await sendCollaborationRequest({
        ideaId: idea.id,
        requesterName: username,
        requesterEmail: user?.email || "",
        requesterSkills: user?.skills || "",
        message: `Hi ${collabUser.name}, I'd like to collaborate with you on this idea.`,
      });

      alert(`Invitation sent to ${collabUser.name}`);
    } catch (error) {
      console.error(error);
      alert("Failed to send invitation.");
    }
  };

  if (!idea) {
    return (
      <div className="container">
        <h3 className="page-subtitle text-center">Loading idea...</h3>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      {/* HEADER */}

      <div className="card">
        <h1 className="page-title" style={{ fontSize: "36px" }}>{idea.title}</h1>

        <div className="card-stats" style={{ borderTop: "none", paddingTop: "0", marginTop: "12px" }}>
          <span>👍 {idea.votes} Votes</span>
          <span style={{ marginLeft: "20px" }}>👁 {idea.views} Views</span>
          <span style={{ marginLeft: "20px" }} className="tag">🏷 {idea.category}</span>
        </div>

        <p style={{ marginTop: "16px", color: "var(--text-secondary)" }}>
          Created by <b style={{ color: "var(--text-primary)" }}>{idea.authorName}</b>
        </p>
      </div>

      {/* MAIN GRID */}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* LEFT SIDE */}

        <div className="card">
          <Section title="📌 Problem Statement" text={idea.problemStatement} />
          <Section title="💡 Proposed Solution" text={idea.proposedSolution} />
          <Section title="🎯 Target Audience" text={idea.targetAudience} />
          <Section title="⚙ Technology Stack" text={idea.technologyStack} />

          {/* TEAM MEMBERS */}
          <h3 style={{ marginTop: "30px", marginBottom: "16px" }}>👥 Team Members</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span className="tag" style={{ background: "rgba(251, 191, 36, 0.2)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.3)" }}>
              👑 {idea.authorName} (Owner)
            </span>

            {idea.contributors && idea.contributors.length > 0 ? (
              idea.contributors.map((c, i) => (
                <span key={i} className="tag">
                  👤 {c}
                </span>
              ))
            ) : (
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>No collaborators yet</p>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ marginBottom: "0" }}>
            <h3 style={{ marginBottom: "20px" }}>Idea Actions</h3>

            <VoteButtons ideaId={idea.id} initialVotes={idea.votes} />

            {username !== idea.authorName && (
              <button className="primary-btn" style={{ width: "100%", marginTop: "20px" }} onClick={handleCollaboration}>
                🤝 Request Collaboration
              </button>
            )}
          </div>

          <div className="card" style={{ marginBottom: "0" }}>
            <h3 style={{ marginBottom: "20px" }}>⚠ Similar Ideas</h3>

            {similarIdeas.length === 0 ? (
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>No similar ideas found</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {similarIdeas.map((s) => (
                  <Link key={s.id} to={`/idea/${s.id}`} style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: "500", fontSize: "15px" }}>
                    • {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMMENTS */}

      <div className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "20px" }}>💬 Comments</h3>
        <CommentSection ideaId={idea.id} />
      </div>

      {/* RECOMMENDED COLLABORATORS */}

      <div className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "20px" }}>Recommended Collaborators</h3>

        {matchedUsers.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>No matches found</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {matchedUsers.map((user) => (
              <div key={user.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <div className="avatar" style={{ margin: "0 auto 12px auto" }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>{user.name}</h4>

                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.4" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Skills:</strong> {user.skills}
                </p>

                <button className="secondary-btn" style={{ width: "100%", padding: "8px" }} onClick={() => sendInvite(user)}>
                  Invite
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaDetails;

// =========================
// REUSABLE SECTION
// =========================

const Section = ({ title, text }) => (
  <div style={{ marginBottom: "24px" }}>
    <h3 style={{ marginBottom: "10px", fontSize: "18px", color: "var(--text-primary)" }}>{title}</h3>
    <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", margin: "0" }}>{text || "Not provided"}</p>
  </div>
);
