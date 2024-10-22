// Browse.jsx
import React, { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import axios from "axios";
import "../style/HomeBrowse.css";
import Banner from "../component/Banner";
import MovieList from "../component/MovieList";

const API_KEY = "7128cff3ef62cf15a6fa17912257b14b";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // State cho việc tải dữ liệu
  const [error, setError] = useState(null); // State cho xử lý lỗi

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3${requests.fetchTrending}`
        );
        setMovies(response.data.results.slice(0, 6)); // Lấy 6 phim đầu tiên
      } catch (err) {
        setError("Không thể lấy danh sách phim. Vui lòng thử lại sau."); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false); // Đặt trạng thái tải thành false sau khi lấy dữ liệu
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Banner />
      <NavBar />
      {loading ? (
        <p>Đang tải phim...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="movie-list">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => console.log("Clicked movie:", movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
          <div className="title-movie">
            <h1>Danh sách phim</h1>
          </div>
          <div className="App">
            <MovieList
              title="Original"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=213`}
              isOriginal={true}
            />
            <MovieList
              title="Xu hướng"
              apiEndpoint={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`}
            />
            <MovieList
              title="Xếp hạng cao"
              apiEndpoint={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
            />
            <MovieList
              title="Hành động"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`}
            />
            <MovieList
              title="Hài"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`}
            />
            <MovieList
              title="Kinh dị"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`}
            />
            <MovieList
              title="Lãng mạn"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`}
            />
            <MovieList
              title="Tài liệu"
              apiEndpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
