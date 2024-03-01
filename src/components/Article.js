import React from 'react';

const Article = ({ article }) => {
  return (
    <div className="article">
      <h4><strong>{article.title}</strong></h4>
      <p>Content: {article.content}</p>
      <p>Category: {article.category}</p>
      <p>Source: {article.source}</p>
      <p>Published At: {article.publishedAt}</p>
    </div>
  );
}

export default Article;
