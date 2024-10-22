// MovieList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail"; // Import MovieDetail
import "../style/MovieList.css";

const MovieList = ({ title, apiEndpoint, isOriginal }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State cho phim được chọn trong danh sách này

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiEndpoint]);

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Đóng chi tiết phim nếu nhấp lại
    } else {
      setSelectedMovie(movie); // Mở chi tiết phim
    }
  };

  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-item ${isOriginal ? "original" : ""}`}
            style={{
              backgroundImage: `url(${
                isOriginal
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              })`,
            }}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="movie-hover">
              <h3>{movie.title || movie.name || movie.original_name}</h3>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieDetail
          movieData={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
