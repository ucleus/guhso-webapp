// src/components/Layout/TextColumn.js
import React from 'react';
import './TextColumn.css';

const TextColumn = ({ title, content }) => {
  return (
    <div className="text-column">
      <h2>{title}</h2>
      {Array.isArray(content) ? (
        content.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p>{paragraph}</p>
            {index < content.length - 1 && <br />}
          </React.Fragment>
        ))
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default TextColumn;