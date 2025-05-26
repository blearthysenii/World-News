import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/news", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setErrorMsg("Failed to load news.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleCreateNews = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

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
      setSuccessMsg("News article created successfully!");
    } catch (err) {
      setErrorMsg(err.message || "Error creating news, try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToComments = (newsId) => {
    navigate(`/comments/${newsId}`);
  };

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: 22,
          marginTop: 80,
          fontWeight: "700",
          color: "linear-gradient(90deg, #4f46e5, #3b82f6)",
          background:
            "linear-gradient(90deg, #4f46e5, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          userSelect: "none",
        }}
      >
        Loading news...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "40px auto 80px",
        padding: "0 30px",
        fontFamily: "'Poppins', sans-serif",
        color: "#222",
        background:
          "radial-gradient(circle at top left, #e0e7ff, #f9fafb)",
        borderRadius: 24,
        boxShadow:
          "0 12px 48px rgba(99, 102, 241, 0.2), 0 8px 16px rgba(147, 197, 253, 0.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#4338ca",
          marginBottom: 40,
          fontWeight: "900",
          fontSize: "3rem",
          letterSpacing: "0.1em",
          textShadow: "2px 2px 8px rgba(67, 56, 202, 0.25)",
          userSelect: "none",
        }}
      >
        Create a New News Article
      </h2>

      <form
        onSubmit={handleCreateNews}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          marginBottom: 60,
          backgroundColor: "white",
          padding: 36,
          borderRadius: 24,
          boxShadow:
            "0 16px 48px rgba(67, 56, 202, 0.15)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        <input
          type="text"
          placeholder="News Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            padding: 18,
            fontSize: 18,
            borderRadius: 18,
            border: "2.5px solid #c7d2fe",
            outline: "none",
            fontWeight: 700,
            boxShadow:
              "inset 0 0 8px #e0e7ff",
            transition:
              "border-color 0.35s, box-shadow 0.35s",
          }}
          disabled={isSubmitting}
          autoComplete="off"
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow =
              "0 0 12px 3px rgba(99, 102, 241, 0.45)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#c7d2fe";
            e.target.style.boxShadow = "inset 0 0 8px #e0e7ff";
          }}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        />

        <textarea
          placeholder="News Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={6}
          disabled={isSubmitting}
          style={{
            padding: 18,
            fontSize: 18,
            borderRadius: 18,
            border: "2.5px solid #c7d2fe",
            outline: "none",
            fontWeight: 600,
            resize: "vertical",
            boxShadow: "inset 0 0 8px #e0e7ff",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow =
              "0 0 14px 4px rgba(99, 102, 241, 0.5)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#c7d2fe";
            e.target.style.boxShadow = "inset 0 0 8px #e0e7ff";
          }}
        />

        <input
          type="text"
          placeholder="News Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            padding: 18,
            fontSize: 18,
            borderRadius: 18,
            border: "2.5px solid #c7d2fe",
            outline: "none",
            fontWeight: 700,
            boxShadow: "inset 0 0 8px #e0e7ff",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
          disabled={isSubmitting}
          autoComplete="off"
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow =
              "0 0 12px 3px rgba(99, 102, 241, 0.45)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#c7d2fe";
            e.target.style.boxShadow = "inset 0 0 8px #e0e7ff";
          }}
        />

        {errorMsg && (
          <p
            style={{
              color: "#ef4444",
              fontWeight: "700",
              textAlign: "center",
              fontSize: 16,
              marginTop: -12,
              marginBottom: 12,
              userSelect: "none",
            }}
          >
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p
            style={{
              color: "#22c55e",
              fontWeight: "700",
              textAlign: "center",
              fontSize: 16,
              marginTop: -12,
              marginBottom: 12,
              userSelect: "none",
            }}
          >
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "18px 0",
            fontSize: 20,
            fontWeight: "900",
            background:
              "linear-gradient(90deg, #4338ca, #2563eb)",
            color: "white",
            border: "none",
            borderRadius: 22,
            transition:
              "background 0.35s ease, box-shadow 0.35s ease",
            boxShadow: isSubmitting
              ? "none"
              : "0 10px 30px rgba(37, 99, 235, 0.7)",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.background =
                "linear-gradient(90deg, #6366f1, #3b82f6)";
              e.target.style.boxShadow =
                "0 14px 40px rgba(67, 56, 202, 0.8)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.background =
                "linear-gradient(90deg, #4338ca, #2563eb)";
              e.target.style.boxShadow =
                "0 10px 30px rgba(37, 99, 235, 0.7)";
            }
          }}
        >
          {isSubmitting ? "Submitting..." : "Create News"}
        </button>
      </form>

      <h2
        style={{
          ...styles.header,
          marginBottom: 40,
          color: "#4338ca",
          textShadow: "2px 2px 8px rgba(67, 56, 202, 0.2)",
          fontSize: "2.8rem",
          userSelect: "none",
        }}
      >
        Latest News
      </h2>

      {news.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#818cf8",
            fontStyle: "italic",
            marginTop: 20,
            userSelect: "none",
          }}
        >
          No news found.
        </p>
      ) : (
        news.map((item) => (
          <div
            key={item._id}
            tabIndex={0}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 26px 58px rgba(67, 56, 202, 0.35)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "0 16px 48px rgba(67, 56, 202, 0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{
              backgroundColor: "white",
              boxShadow:
                "0 16px 48px rgba(67, 56, 202, 0.18)",
              borderRadius: 24,
              padding: 28,
              marginBottom: 36,
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            <h3
              style={{
                fontSize: "2.2rem",
                fontWeight: "900",
                color: "#4338ca",
                marginBottom: 20,
                letterSpacing: "0.03em",
              }}
            >
              {item.title}
            </h3>

            <div
              style={{
                maxHeight: 180,
                overflowY: "auto",
                padding: 20,
                background:
                  "linear-gradient(135deg, #eef2ff, #c7d2fe)",
                borderRadius: 20,
                boxShadow:
                  "inset 0 0 20px rgba(67, 56, 202, 0.15)",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "#4b5563",
                  whiteSpace: "pre-line",
                }}
              >
                {item.content || item.description || "No content available."}
              </p>
            </div>

            <p
              style={{
                fontStyle: "italic",
                color: "#6b7280",
                marginBottom: 14,
                fontWeight: 600,
                fontSize: 15,
                userSelect: "none",
              }}
            >
              Category: {item.category || "No category"}
            </p>

            {item.author && (
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                By: <strong>{item.author}</strong>
              </p>
            )}

            {(item.publishedAt || item.createdAt) && (
              <p
                style={{
                  fontSize: 13,
                  color: "#9ca3af",
                  fontWeight: 600,
                }}
              >
                Published:{" "}
                {new Date(item.publishedAt || item.createdAt).toLocaleString()}
              </p>
            )}

            <button
              onClick={() => goToComments(item._id)}
              aria-label={`Comment on ${item.title}`}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #6366f1, #3b82f6)";
                e.target.style.boxShadow =
                  "0 14px 40px rgba(67, 56, 202, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #4338ca, #2563eb)";
                e.target.style.boxShadow =
                  "0 10px 30px rgba(37, 99, 235, 0.7)";
              }}
              style={{
                marginTop: 26,
                padding: "16px 36px",
                background:
                  "linear-gradient(90deg, #4338ca, #2563eb)",
                color: "white",
                border: "none",
                borderRadius: 24,
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                transition: "background 0.35s ease, box-shadow 0.35s ease",
                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.7)",
                userSelect: "none",
                display: "inline-block",
              }}
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
  header: {
    textAlign: "center",
  },
};

export default NewsList;
