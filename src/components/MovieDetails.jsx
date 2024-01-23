import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/Details.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const MovieDetailsApi = `https://api.themoviedb.org/3/movie/${id}`;
  const ImagesApi =
    "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  const ImagesApi2 = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    axios
      .get(MovieDetailsApi, {
        params: {
          api_key: "89bec5bfceade79df2f6f73c17371177",
        },
      })
      .then(({ data }) => {
        const result = data;
        setData(result);
        console.log(result);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [error, MovieDetailsApi, id]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="blurred"
            style={{
              backgroundImage: `url('${ImagesApi}/${data.backdrop_path}')`,
            }}
          ></div>

          <section className="single">
            <div className="movies-container-details">
              {<img src={`${ImagesApi2}${data.poster_path}`} alt="Not Found" />}
            </div>
            <div className="text-d">
              <p className="h1-Details">{data.title}</p>
              <p>Release Date : {data.release_date}</p>
              <p>Runtime : {data.runtime} M</p>
              <p>Popularity : {data.popularity}</p>
              <p>
                Production Countries :
                {data.production_countries.length > 0
                  ? data.production_countries[0].name
                  : " Not Found"}
              </p>

              <p>Vote Average : {data.vote_average} ⭐</p>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetails;
