import React from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const NewsPage = () => {
  const { id } = useParams();

  console.log("News ID:", id); // për debug

  // Këtu mund të bësh fetch të të dhënave të lajmit, por për shembull e kalojmë direkt id
  return (
    <div>
      <h1>News Details for ID: {id}</h1>

      {/* Komponenti Comments merr newsId */}
      <Comments newsId={id} />
    </div>
  );
};

export default NewsPage;
