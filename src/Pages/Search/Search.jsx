import "./style/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";

export default function Search() {
  const api_key = "b5038f19e6e349c6193d9ea31b225df6";

  const [searchTerm, setSearch] = useState("Naruto");
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
    axios.get(api).then((list) => setMovies(list.data.results));
  }, [searchTerm]);

  return (
    <div className="Search">
      <div className="search_input">
        <div className="input">
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <a className="submit" >Search</a>
        </div>
      </div>

      <div className="result">
          {movies &&
            movies.map((movie) => <Card key={movie.id} movie={movie} />)}
        </div>
    </div>
  );
}
