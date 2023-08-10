import "./style/style.css";
import axios from "axios";
import SmallCard from "../../Components/SmallCard/SmallCard";
import Card from "../../Components/Card/Card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../../firebase/firebase";

export default function Details(props) {
  const { Id } = useParams();
  const api_key = "b5038f19e6e349c6193d9ea31b225df6";
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState(null);
  const [save, SetSave] = useState(false);
  const [recommended, setRecomnended] = useState([]);
  const user = localStorage["username"];

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const saveMovie = (e) => {
    e.preventDefault();
    const savedRef = firebase.database().ref(`${user}`).child("Saved");

    savedRef
      .orderByChild("id")
      .equalTo(movie && movie.id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            savedRef.child(childKey).remove();
          });
          SetSave(false);
        } else {
          savedRef.push(movie);
          SetSave(true);
        }
      });
  };
  useEffect(() => {
    const api = `https://api.themoviedb.org/3/movie/${Id}?api_key=${api_key}&language=en-US`;
    axios
      .get(api)
      .then((response) => {
        setMovie(response.data);
        setImage(`https://image.tmdb.org/t/p/w500${response.data.poster_path}`);
        const promises = response.data.genres.map((genre) => {
          return axios
            .get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre.id}`
            )
            .then((response) => response.data.results.slice(3, 6));
        });
        return Promise.all(promises);
      })
      .then((results) => {
        const recommendedMovies = results.flat();
        setRecomnended(recommendedMovies);
      })
      .catch((err) => console.log(err));
  }, [Id]);

  useEffect(() => {
    const savedRef = firebase.database().ref(`${user}`).child("Saved");
    SetSave(false);
    savedRef
      .orderByChild("id")
      .equalTo(movie && movie.id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          SetSave(true);
        }
      });
  }, [movie && movie.id, Id]);

  return (
    <div>
      {movie && (
        <>
          <div className="details">
            <div className="Movie_details">
              <div className="img">
                <img src={image ? image : ""} alt="Movie Image" />
              </div>
              <div className="aboutMovie">
                <h5>{movie.title}</h5>
                <br />
                <p className="overview">{movie.overview}</p>
                <br />
                <p className="original_title">
                  Original Title :<span></span>
                  {movie.original_title}
                </p>
                <br />
                <p className="real_date">
                  Release Date :<span></span>
                  {movie.release_date}
                </p>
                <br />
                <p className="during">
                  During <span>:</span>
                  {movie.runtime} Minutes
                </p>
                <br />
                <p className="rate">
                  Rate : {movie.vote_average}
                  <i className="fa-sharp fa-regular fa-star"></i>
                </p>
                <br />
                <div className="type">
                  <p>Genres :</p>
                  {movie.genres.map((type) => (
                    <SmallCard key={type.id} name={type.name} />
                  ))}
                </div>
                <br />
                <br />
                <div className="addToWatchList">
                  <a
                    href="#"
                    className={`${save ? "save" : "unsave"}`}
                    onClick={saveMovie}
                  >
                    {save ? "Unsave" : "Add to Saved"}
                    {save ? (
                      <i className="fa-solid fa-bookmark"></i>
                    ) : (
                      <i className="fa-regular fa-bookmark"></i>
                    )}
                  </a>
                </div>
              </div>
            </div>

            <div className="recomendation">
              <br />
              <div className="title">
                <h2>Recommended Movies : </h2>
              </div>
              <br />
              <div className="result">
                {recommended &&
                  recommended.map((movie) => <Card movie={movie} />)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
