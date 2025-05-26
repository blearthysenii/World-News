import React, { useState, useEffect } from 'react';

const containerBase = {
  maxWidth: 420,
  margin: '40px auto',
  padding: 36,
  borderRadius: 16,
  backgroundColor: 'rgba(10, 10, 15, 0.8)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.9)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#fff',
  transition: 'transform 0.3s ease, background 0.3s ease',
};

const containerHover = {
  transform: 'scale(1.025)',
  background: 'linear-gradient(135deg, rgba(15,15,20,0.9), rgba(5,5,10,0.95))',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

const textareaStyle = {
  padding: '12px 14px',
  fontSize: '1rem',
  borderRadius: 8,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backgroundColor: 'transparent',
  color: '#fff',
  outline: 'none',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(4px)',
  resize: 'vertical',
};

const textareaFocusStyle = {
  borderColor: '#38a3d1',
  boxShadow: '0 0 0 2px rgba(56, 163, 209, 0.3)',
};

const buttonStyle = {
  padding: '12px',
  fontSize: '1.1rem',
  fontWeight: '700',
  borderRadius: 10,
  border: 'none',
  color: '#fff',
  background: 'linear-gradient(135deg, #3a0ca3, #4361ee, #4cc9f0)',
  boxShadow: '0 4px 16px rgba(76, 201, 240, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const buttonHoverStyle = {
  background: 'linear-gradient(135deg, #4cc9f0, #4361ee, #3a0ca3)',
  transform: 'scale(1.05)',
  boxShadow: '0 6px 24px rgba(76, 201, 240, 0.4)',
};

const messageStyle = {
  color: '#ff6b6b',
  fontWeight: '600',
  textAlign: 'center',
};

function Comments({ newsId }) {
  const [yourComment, setYourComment] = useState('');
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [textareaFocus, setTextareaFocus] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      if (!newsId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/comments?newsId=${newsId}`);
        if (!res.ok) throw new Error('Failed to load comments');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        setMessage('');
      }
    };

    fetchComments();
  }, [newsId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('You must be logged in to comment.');
      return;
    }

    if (!yourComment.trim()) {
      setMessage('Comment cannot be empty.');
      return;
    }

    if (!newsId) {
      setMessage('Error: News ID not found.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/comments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: yourComment,
          newsId,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments((prev) => [...prev, newComment]);
        setYourComment('');
        setMessage('Comment added successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to add comment.'}`);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setMessage('Server error.');
    }
  };

  return (
    <div
      style={{
        ...containerBase,
        ...(hovered ? containerHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <form style={formStyle} onSubmit={handleCommentSubmit}>
        <textarea
          value={yourComment}
          onChange={(e) => setYourComment(e.target.value)}
          placeholder="Write a comment..."
          rows={4}
          style={{
            ...textareaStyle,
            ...(textareaFocus ? textareaFocusStyle : {}),
          }}
          onFocus={() => setTextareaFocus(true)}
          onBlur={() => setTextareaFocus(false)}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            ...(hoverButton ? buttonHoverStyle : {}),
          }}
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
        >
          Add Comment
        </button>
      </form>

      {message && <p style={messageStyle}>{message}</p>}

      <div style={{ marginTop: 30 }}>
        <h3>Comments:</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} style={{ marginBottom: 16, padding: 12, backgroundColor: 'rgba(20,20,30,0.6)', borderRadius: 8 }}>
              <p style={{ margin: 0 }}>{c.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
