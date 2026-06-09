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
      setComments(data);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const username = localStorage.getItem("user");

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
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          minHeight: "80px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Comment
      </button>

      {comments.length === 0 && (
        <p style={{ color: "#777" }}>No comments yet</p>
      )}

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            background: "#f9fafb",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <b>{c.username}</b>

          <p style={{ marginTop: "5px" }}>{c.commentText}</p>

          <small style={{ color: "#888" }}>
            {new Date(c.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
