import React, { useEffect, useState } from "react";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  };

  const handleCreateNews = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!newTitle.trim() || !newContent.trim() || !newCategory.trim()) {
      setErrorMsg("Please fill in title, content, and category.");
      return;
    }

    setIsSubmitting(true);

    fetch("http://localhost:5000/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Shto tokenin këtu
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        category: newCategory,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create news");
        }
        return res.json();
      })
      .then((createdNews) => {
        setNews([createdNews, ...news]); // Shto lajm të ri në fillim
        setNewTitle("");
        setNewContent("");
        setNewCategory("");
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message || "Error creating news, try again.");
        setIsSubmitting(false);
      });
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;

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
        />
        <textarea
          placeholder="News Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="News Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={styles.input}
        />
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? "Submitting..." : "Create News"}
        </button>
      </form>

      <h2 style={{ ...styles.header, marginTop: "40px" }}>Latest News</h2>

      {news.length === 0 ? (
        <p>No news found.</p>
      ) : (
        news.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3 style={styles.title}>{item.title}</h3>
            <div style={styles.contentBox}>
              <p style={styles.contentText}>
                {item.content || item.description || "No content available."}
              </p>
            </div>
            <p style={{ fontStyle: "italic", color: "#888", marginBottom: "8px" }}>
              Category: {item.category || "No category"}
            </p>
            {item.author && (
              <p style={styles.author}>
                By: <strong>{item.author}</strong>
              </p>
            )}
            {/* Nëse nuk ka publishedAt, përdor createdAt */}
            {(item.publishedAt || item.createdAt) && (
              <p style={styles.date}>
                Published: {new Date(item.publishedAt || item.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  header: {
    textAlign: "center",
    color: "#4a90e2",
    marginBottom: "30px",
    fontWeight: "700",
    fontSize: "2.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "40px",
  },
  input: {
    padding: "12px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "12px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    minHeight: "100px",
    resize: "vertical",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px",
    fontSize: "1.2rem",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fefefe",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "25px",
  },
  title: {
    marginBottom: "12px",
    fontSize: "1.6rem",
    color: "#222",
  },
  contentBox: {
    maxHeight: "140px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
    marginBottom: "12px",
  },
  contentText: {
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#555",
  },
  author: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "4px",
  },
  date: {
    fontSize: "0.8rem",
    color: "#999",
  },
};

export default NewsList;
