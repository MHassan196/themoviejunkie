import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=33212486"

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    searchMovie("Batman")
  },[])

  const searchMovie = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search)
  }

  return (
    <div className="app">
      <h1 className="heading">The Movie Junkie</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search Movie Name"
          className="search-input"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="SearchIcon"
          height="25"
          className="search-icon"
          onClick={() => searchMovie(searchItem)}
        />
      </div>

      <div >
        {
          movies?.length > 0 ? (
            <div className="container">
              {
                movies.map((movie)=>(
                  <MovieCard movie={movie} key={movie.imdbID} />
                ))
              }
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
