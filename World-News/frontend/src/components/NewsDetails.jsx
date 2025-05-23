import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Comments from './Comments';

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${id}`)
      .then(res => res.json())
      .then(setNews)
      .catch(console.error);
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div style={{ maxWidth: 700, margin: '20px auto', padding: 20 }}>
        <h1>{news.title}</h1>
        <p style={{ color: '#666' }}>{new Date(news.createdAt).toLocaleString()}</p>
        <div>{news.content.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>
        <Comments />
      </div>
      <Footer />
    </>
  );
};

export default NewsDetails;
