import { useEffect, useState } from "react";
import "./style/style.css";
import { motion as m } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  const [image, setImage] = useState(null);
  const movie = props.movie;

  useEffect(() => {
    const imageUrl =
      `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
      `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    setImage(imageUrl);
  }, [movie]);

  return (
    <NavLink to={`/Details/${movie.id}`}>
      <m.div
        className="Card"
        style={image ? { backgroundImage: `url(${image})` } : {}}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: .5, y: 0 }}
      >
        <div className="MovieDetails">
          <h4>{movie.title || movie.name}</h4>
          <p className="date">Released : {movie.release_date}</p>
          <p className="date rate">
            Rate : {movie.vote_average}
            <i className="fa-sharp fa-regular fa-star"></i>
          </p>
        </div>
      </m.div>
    </NavLink>
  );
}
