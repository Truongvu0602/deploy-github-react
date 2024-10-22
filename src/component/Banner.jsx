import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Banner.css";

const API_KEY = "7128cff3ef62cf15a6fa17912257b14b";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchNetflixOriginals = async () => {
      try {
        const request = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=213`
        );

        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching Netflix Originals: ", error);
      }
    };

    fetchNetflixOriginals();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : "",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        {movie && (
          <>
            <h1 className="banner-title">
              {movie.title || movie.name || movie.original_name}
            </h1>
            <div className="banner-buttons">
              <button className="banner-button">Play</button>
              <button className="banner-button">My List</button>
            </div>
            <h1 className="banner-description">{movie.overview}</h1>
          </>
        )}
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
