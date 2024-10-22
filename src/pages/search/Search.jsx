import React, { useState } from "react";
import SearchForm from "../../component/SearchForm";
import NavBar from "../../component/Navbar";
import MovieDetail from "../../component/MovieDetail";
import "../../style/Search.css";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (query) => {
    const API_KEY = "7128cff3ef62cf15a6fa17912257b14b";
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setError("Không tìm thấy phim nào.");
      }

      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
      setError("Đã xảy ra lỗi khi lấy dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="search-container">
        <SearchForm onSearch={handleSearch} />
      </div>
      {loading && <p>Đang tải...</p>}
      {error && <p className="error-message">{error}</p>}{" "}
      <h2 className="result-title">Kết Quả Tìm Kiếm</h2>
      <div className="result-list-container">
        {results?.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
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

export default Search;
