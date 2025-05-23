import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/news", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!newTitle.trim() || !newContent.trim() || !newCategory.trim()) {
      setErrorMsg("Please fill in title, content, and category.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("You must be logged in to create news.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCategory,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create news");
      }

      const createdNews = await res.json();
      setNews((prevNews) => [createdNews, ...prevNews]);
      setNewTitle("");
      setNewContent("");
      setNewCategory("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Error creating news, try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToComments = (newsId) => {
    navigate(`/comments/${newsId}`);
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", fontSize: 18, marginTop: 40 }}>
        Loading news...
      </p>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create a New News Article</h2>

      <form onSubmit={handleCreateNews} style={styles.form}>
        <input
          type="text"
          placeholder="News Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
        <textarea
          placeholder="News Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={styles.textarea}
          rows={5}
        />
        <input
          type="text"
          placeholder="News Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Create News"}
        </button>
      </form>

      <h2 style={{ ...styles.header, marginTop: 50 }}>Latest News</h2>

      {news.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: 16 }}>No news found.</p>
      ) : (
        news.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3 style={styles.title}>{item.title}</h3>

            <div style={styles.contentBox}>
              <p style={styles.contentText}>
                {item.content || item.description || "No content available."}
              </p>
            </div>

            <p style={styles.category}>Category: {item.category || "No category"}</p>

            {item.author && (
              <p style={styles.author}>
                By: <strong>{item.author}</strong>
              </p>
            )}

            {(item.publishedAt || item.createdAt) && (
              <p style={styles.date}>
                Published: {new Date(item.publishedAt || item.createdAt).toLocaleString()}
              </p>
            )}

            <button
              onClick={() => goToComments(item._id)}
              style={styles.commentButton}
              aria-label={`Comment on ${item.title}`}
            >
              Comment
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Poppins', sans-serif",
    color: "#222",
    backgroundColor: "#f9fbfc",
  },
  header: {
    textAlign: "center",
    color: "#1e3a8a",
    marginBottom: 30,
    fontWeight: "700",
    fontSize: "2.4rem",
    letterSpacing: "0.05em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 50,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 6px 15px rgba(30, 58, 138, 0.1)",
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    border: "1.8px solid #cbd5e1",
    outline: "none",
    transition: "border-color 0.3s",
    fontWeight: 500,
  },
  textarea: {
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    border: "1.8px solid #cbd5e1",
    outline: "none",
    fontWeight: 500,
    resize: "vertical",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px 0",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 14,
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.5)",
  },
  error: {
    color: "#dc2626",
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0 10px 25px rgba(30, 58, 138, 0.12)",
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: 15,
  },
  contentBox: {
    maxHeight: 160,
    overflowY: "auto",
    padding: 15,
    backgroundColor: "#eff6ff",
    borderRadius: 15,
    boxShadow: "inset 0 0 10px rgba(30, 64, 175, 0.1)",
    marginBottom: 15,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "#374151",
    whiteSpace: "pre-line",
  },
  category: {
    fontStyle: "italic",
    color: "#6b7280",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: "#9ca3af",
  },
  commentButton: {
    marginTop: 18,
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default NewsList;
