import React, { useEffect, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Movies.css";
import ImageNotFound from "../imageNotFound.png";

export default function Movies() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const MoviesApi = "https://api.themoviedb.org/3/discover/movie";
  const ImagesApi = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    axios
      .get(MoviesApi, {
        params: {
          api_key: "89bec5bfceade79df2f6f73c17371177",
        },
      })
      .then(({ data }) => {
        const result = data.results;
        setData(result);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [error]);

  const handleScroll = useCallback(() => {
    const isTop = window.scrollY === 0;
    setShowScrollButton(!isTop);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const toggleScrollDirection = useCallback(() => {
    if (window.scrollY === 0) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  }, [scrollToTop, scrollToBottom]);

  return (
    <>
      <div className="movies-container">
        {loading ? (
          <CircularProgress />
        ) : (
          data?.map((e) => (
            <Link to={`/movie/${e.id}`} key={e.id} className="container">
              <img
                src={
                  e.poster_path ? `${ImagesApi}${e.poster_path}` : ImageNotFound
                }
                alt="Not Found"
              />
              <h3 className="smaller-Text no-underline">
                {e.title ?? "Not Found"}
              </h3>
            </Link>
          ))
        )}
        {
          <button className="scroll-button" onClick={toggleScrollDirection}>
            {!showScrollButton ? "🔻" : "🔺"}
          </button>
        }
      </div>
    </>
  );
}
