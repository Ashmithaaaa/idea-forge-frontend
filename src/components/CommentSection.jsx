import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentService";

const CommentSection = ({ ideaId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadComments();
  }, [ideaId]);

  const loadComments = async () => {
    try {
      const data = await getComments(ideaId);

      // ✅ FIX: ensure array
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading comments", err);
      setComments([]); // ✅ fallback
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.name;

    if (!username) {
      alert("Please login first");
      return;
    }

    try {
      await addComment({
        ideaId: ideaId,
        username: username,
        commentText: text,
      });

      setText("");
      loadComments();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  return (
    <div>
      <textarea
        className="textarea"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ minHeight: "100px", marginBottom: "16px" }}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
        style={{ marginBottom: "32px", padding: "10px 24px" }}
      >
        Comment
      </button>

      {/* ✅ Empty state */}
      {!Array.isArray(comments) || comments.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>No comments yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
              }}
              className="fade-in"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <div
                  className="avatar"
                  style={{ width: "32px", height: "32px", fontSize: "14px" }}
                >
                  {c?.username?.charAt(0)?.toUpperCase()}
                </div>

                <b style={{ color: "var(--text-primary)" }}>
                  {c?.username || "User"}
                </b>

                <small
                  style={{
                    color: "var(--text-secondary)",
                    marginLeft: "auto",
                  }}
                >
                  {c?.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </small>
              </div>

              <p
                style={{
                  margin: "0 0 0 42px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                }}
              >
                {c?.commentText || ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
