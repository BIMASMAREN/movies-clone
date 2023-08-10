import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style/style.css";
import axios from "axios";
import Card from "../../Components/Card/Card";

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const api_key = "b5038f19e6e349c6193d9ea31b225df6";
  const location = useLocation();
  const category = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 15) + 1);

  const watch = () => {
    if (movies[currentMovieIndex].id)
      navigate(`/Details/${movies[currentMovieIndex].id}`);
  };
  const fetcher = () => {
    let api = "";

    switch (category) {
      case "":
        api = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${random}`;
        break;
      case "Popular":
        api = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${random}`;
        break;
      case "Top":
        api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${random}`;
        break;
      case "Genres":
        api = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
        break;
      default:
        api = "not Found";
        break;
    }
    return api;
  };

  useEffect(() => {
    const api = fetcher();
    axios.get(api).then((list) => setMovies(list.data.results));
  }, [category]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="Home">
      <div
        className="carosel"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            movies &&
            movies[currentMovieIndex] &&
            movies[currentMovieIndex].backdrop_path
              ? movies[currentMovieIndex].backdrop_path
              : ""
          })`,
        }}
      >
        <div className="details">
          <div className="title">
            <h1>{movies && movies[currentMovieIndex].title}</h1>
          </div>
          <br />

          <div className="overview">
            <p>{movies && movies[currentMovieIndex].overview}</p>
          </div>
          <br />

          <div className="rate">
            Rate : <span></span>{" "}
            {movies && movies[currentMovieIndex].vote_average}
            <i className="fa-sharp fa-regular fa-star"></i>
          </div>
          <br />
          <br />
          <div className="watch">
            <a href="#" onClick={watch} className="watchbutton">
              Watch Now
            </a>
          </div>
        </div>
      </div>
      <div className="result">
        {movies && movies.map((movie) => <Card key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
