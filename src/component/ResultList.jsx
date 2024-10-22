import React from "react";

const ResultList = ({ results }) => {
  return (
    <div className="result-list">
      {results.map((movie) => (
        <div key={movie.id} className="result-item">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
