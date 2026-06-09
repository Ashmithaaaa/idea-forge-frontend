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
        <h3>Loading idea...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      {/* HEADER */}

      <div style={headerCard}>
        <h1 style={title}>{idea.title}</h1>

        <div style={stats}>
          👍 {idea.votes} Votes
          <span style={{ marginLeft: "20px" }}>👁 {idea.views} Views</span>
          <span style={{ marginLeft: "20px" }}>🏷 {idea.category}</span>
        </div>

        <p style={{ marginTop: "10px", color: "#666" }}>
          Created by <b>{idea.authorName}</b>
        </p>
      </div>

      {/* MAIN GRID */}

      <div style={grid}>
        {/* LEFT SIDE */}

        <div style={leftCard}>
          <Section title="📌 Problem Statement" text={idea.problemStatement} />

          <Section title="💡 Proposed Solution" text={idea.proposedSolution} />

          <Section title="🎯 Target Audience" text={idea.targetAudience} />

          <Section title="⚙ Technology Stack" text={idea.technologyStack} />

          {/* TEAM MEMBERS */}

          <h3 style={{ marginTop: "25px" }}>👥 Team Members</h3>

          <div style={{ marginTop: "10px" }}>
            <span style={ownerChip}>👑 {idea.authorName} (Owner)</span>

            {idea.contributors && idea.contributors.length > 0 ? (
              idea.contributors.map((c, i) => (
                <span key={i} style={chip}>
                  👤 {c}
                </span>
              ))
            ) : (
              <p style={{ color: "#888" }}>No collaborators yet</p>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div style={actionCard}>
          <h3 style={{ marginBottom: "15px" }}>Idea Actions</h3>

          <VoteButtons ideaId={idea.id} initialVotes={idea.votes} />

          {username !== idea.authorName && (
            <button style={collabBtn} onClick={handleCollaboration}>
              🤝 Request Collaboration
            </button>
          )}
        </div>
      </div>

      {/* COMMENTS */}

      <div style={commentCard}>
        <h3 style={{ marginBottom: "15px" }}>💬 Comments</h3>
        <CommentSection ideaId={idea.id} />
      </div>

      {/* SIMILAR IDEAS */}

      <div style={similarCard}>
        <h3>⚠ Similar Ideas</h3>

        {similarIdeas.length === 0 ? (
          <p>No similar ideas found</p>
        ) : (
          similarIdeas.map((s) => (
            <div key={s.id} style={similarIdeaItem}>
              <Link to={`/idea/${s.id}`}>{s.title}</Link>
            </div>
          ))
        )}
      </div>

      {/* RECOMMENDED COLLABORATORS */}

      <div style={similarCard}>
        <h3>Recommended Collaborators</h3>

        {matchedUsers.length === 0 ? (
          <p style={{ color: "#888" }}>No matches found</p>
        ) : (
          <div style={collabGrid}>
            {matchedUsers.map((user) => (
              <div key={user.id} style={collabCard}>
                <div style={avatar}>{user.name?.charAt(0).toUpperCase()}</div>

                <h4>{user.name}</h4>

                <p style={{ fontSize: "14px", color: "#666" }}>
                  Skills: {user.skills}
                </p>

                <button style={inviteBtn} onClick={() => sendInvite(user)}>
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
  <div style={{ marginBottom: "18px" }}>
    <h3>{title}</h3>
    <p style={{ color: "#444" }}>{text || "Not provided"}</p>
  </div>
);

// =========================
// STYLES
// =========================

const headerCard = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  marginBottom: "25px",
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
};

const stats = {
  marginTop: "10px",
  color: "#555",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "25px",
};

const leftCard = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const actionCard = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  height: "fit-content",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const commentCard = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  marginTop: "30px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const similarCard = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  marginTop: "30px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const similarIdeaItem = {
  marginTop: "10px",
};

const chip = {
  background: "#eef2ff",
  padding: "6px 14px",
  borderRadius: "20px",
  marginRight: "10px",
  fontSize: "13px",
  display: "inline-block",
  marginBottom: "6px",
};

const ownerChip = {
  background: "#fde68a",
  padding: "6px 14px",
  borderRadius: "20px",
  marginRight: "10px",
  fontSize: "13px",
  display: "inline-block",
  marginBottom: "6px",
};

const collabBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#2563eb",
  border: "none",
  color: "white",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

const collabGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "15px",
  marginTop: "15px",
};

const collabCard = {
  background: "#f9fafb",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #eee",
};

const avatar = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#6366f1",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
  margin: "auto",
  marginBottom: "10px",
};

const inviteBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  border: "none",
  background: "#6366f1",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};
