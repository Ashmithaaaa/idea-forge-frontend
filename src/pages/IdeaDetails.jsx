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
      setIdea(data || null); // ✅ safe
    } catch (error) {
      console.error("Error loading idea:", error);
      setIdea(null);
    }
  };

  // =========================
  // LOAD SIMILAR IDEAS
  // =========================
  const loadSimilarIdeas = async () => {
    try {
      const data = await getSimilarIdeas(id);
      setSimilarIdeas(Array.isArray(data) ? data : []); // ✅ safe
    } catch (error) {
      console.error("Error loading similar ideas:", error);
      setSimilarIdeas([]);
    }
  };

  // =========================
  // LOAD MATCHED USERS
  // =========================
  const loadMatches = async () => {
    try {
      const data = await getMatchingUsers(id);
      setMatchedUsers(Array.isArray(data) ? data : []); // ✅ safe
    } catch (error) {
      console.error("Match error", error);
      setMatchedUsers([]);
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

    if (username === idea?.authorName) {
      alert("You cannot collaborate on your own idea");
      return;
    }

    try {
      await sendCollaborationRequest({
        ideaId: idea?.id,
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

  const sendInvite = async (collabUser) => {
    if (!username) {
      alert("Please login first");
      return;
    }

    try {
      await sendCollaborationRequest({
        ideaId: idea?.id,
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
        <h1 className="page-title">{idea.title}</h1>

        <div className="card-stats">
          <span>👍 {idea?.votes ?? 0} Votes</span>
          <span>👁 {idea?.views ?? 0} Views</span>
          <span className="tag">🏷 {idea?.category}</span>
        </div>

        <p>
          Created by <b>{idea?.authorName}</b>
        </p>
      </div>

      {/* MAIN */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        <div className="card">
          <Section title="📌 Problem Statement" text={idea?.problemStatement} />
          <Section title="💡 Proposed Solution" text={idea?.proposedSolution} />
          <Section title="🎯 Target Audience" text={idea?.targetAudience} />
          <Section title="⚙ Technology Stack" text={idea?.technologyStack} />

          {/* TEAM */}
          <h3>👥 Team Members</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span className="tag">👑 {idea?.authorName} (Owner)</span>

            {Array.isArray(idea?.contributors) &&
            idea.contributors.length > 0 ? (
              idea.contributors.map((c, i) => (
                <span key={i} className="tag">
                  👤 {c}
                </span>
              ))
            ) : (
              <p>No collaborators yet</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <VoteButtons ideaId={idea?.id} initialVotes={idea?.votes} />

          {username !== idea?.authorName && (
            <button onClick={handleCollaboration}>
              🤝 Request Collaboration
            </button>
          )}

          {/* SIMILAR IDEAS */}
          <h3>Similar Ideas</h3>
          {!Array.isArray(similarIdeas) || similarIdeas.length === 0 ? (
            <p>No similar ideas</p>
          ) : (
            similarIdeas.map((s) => (
              <Link key={s.id} to={`/idea/${s.id}`}>
                {s.title}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* COMMENTS */}
      <CommentSection ideaId={idea?.id} />

      {/* MATCHED USERS */}
      <h3>Recommended Collaborators</h3>

      {!Array.isArray(matchedUsers) || matchedUsers.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matchedUsers.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <button onClick={() => sendInvite(user)}>Invite</button>
          </div>
        ))
      )}
    </div>
  );
};

export default IdeaDetails;

// =========================
const Section = ({ title, text }) => (
  <div>
    <h3>{title}</h3>
    <p>{text || "Not provided"}</p>
  </div>
);
