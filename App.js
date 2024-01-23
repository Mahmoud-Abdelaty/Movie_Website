import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import TvshowDetails from "./components/TvshowDetails";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import Trending from "./components/Trending";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvshowDetails />} />
        <Route path="/TvShows" element={<TvShows />} />
        <Route path="/Trending" element={<Trending />} />
      </Routes>
    </>
  );
}

export default App;
