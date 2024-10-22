import React, { useEffect, useState } from "react";
import YouTube from "react-youtube"; // Đảm bảo đã cài đặt react-youtube
import axios from "axios";
import "../style/MovieDetail.css";

const API_KEY = "7128cff3ef62cf15a6fa17912257b14b";

const MovieDetail = ({ movieData, onClose }) => {
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State để xử lý lỗi

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`
        );
        const videos = response.data.results;

        // Tìm trailer hoặc teaser
        const trailer = videos.find(
          (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError("Không tìm thấy trailer."); // Thiết lập lỗi nếu không tìm thấy trailer
        }
      } catch (err) {
        setError("Không thể tải trailer. Vui lòng thử lại sau."); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false);
      }
    };

    if (movieData.id) {
      fetchTrailer();
    }
  }, [movieData.id]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0, // Không tự động phát
    },
  };

  return (
    <div className="movie-detail">
      <div className="content">
        <div className="info">
          <h2>{movieData.title}</h2>
          <p>
            <strong>Tóm tắt:</strong> {movieData.overview}
          </p>
          <p>
            <strong>Ngày phát hành:</strong> {movieData.release_date}
          </p>
          <p>
            <strong>Đánh giá:</strong> {movieData.vote_average}
          </p>
        </div>
        <div className="video-container">
          {loading ? (
            <p>Đang tải trailer...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : trailerKey ? (
            <YouTube videoId={trailerKey} opts={opts} />
          ) : (
            movieData.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
                alt={movieData.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )
          )}
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
