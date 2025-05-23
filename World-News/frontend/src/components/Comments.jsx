// src/components/Comments.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch comments për lajmin
  useEffect(() => {
    fetch(`/api/comments?newsId=${newsId}`)
      .then(res => res.json())
      .then(setComments)
      .catch(console.error);
  }, [newsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsId, content }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const newComment = await res.json();
      setComments(prev => [...prev, newComment]);
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // ose navigate('/news') nëse do kthim në rrugën e lajmeve
  };

  const styles = {
    container: {
      maxWidth: 550,
      height: 400,
      margin: "170px auto",
      background: "#fff",
      padding: "50px 30px 20px",
      borderRadius: 20,
      border: "0.1px solid #ccc",
      boxShadow: "0 2px 10px rgba(0,0,0,0.9)",
      fontFamily: "inherit",
    },
    backArrow: {
      cursor: "pointer",
      fontSize: 28,
      color: "#2980b9",
      marginBottom: 20,
      userSelect: "none",
      transition: "color 0.2s ease",
      display: "inline-block",
    },
    header: {
      textAlign: "center",
      marginTop: 0,
      marginBottom: 20,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    textarea: {
      width: "100%",
      padding: 8,
      borderRadius: 4,
      resize: "none",
      marginTop: 10,
      backgroundColor: "#2a2a2a",
      color: "#fff",
      border: "1px solid #444",
      height: 80,
      overflowY: "auto",
      fontFamily: "inherit",
    },
    button: {
      marginTop: 10,
      padding: "10px 20px",
      backgroundColor: "#2980b9",
      border: "none",
      color: "white",
      borderRadius: 6,
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      fontFamily: "inherit",
    },
    list: {
      marginTop: 20,
      maxHeight: 180,
      overflowY: "auto",
      paddingRight: 10,
    },
    comment: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: "#1f1f1f",
      borderLeft: "4px solid #2980b9",
      borderRadius: 5,
      color: "#f1f1f1",
      fontFamily: "inherit",
    },
    author: {
      color: "#2980b9",
      fontWeight: "bold",
    },
    date: {
      display: "block",
      color: "#ccc",
      marginTop: 5,
      fontSize: "0.85rem",
    },
    error: {
      color: "red",
      marginTop: 10,
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.backArrow}
        onClick={handleBackClick}
        title="Back to News List"
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleBackClick(); }}
      >
        ←
      </div>

      <h3 style={styles.header}>Comments</h3>

      <form style={styles.form} onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Post Comment
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.list}>
        {comments.length > 0
          ? comments.map(c => (
              <div key={c._id} style={styles.comment}>
                <p>
                  <strong style={styles.author}>
                    {c.authorId?.username || "Anonymous"}:
                  </strong>{" "}
                  {c.content}
                </p>
                <small style={styles.date}>
                  {new Date(c.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          : <p>No comments yet.</p>
        }
      </div>
    </div>
  );
};

export default Comments;
