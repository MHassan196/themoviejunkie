import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import spinnerIcon from './spinner.svg'

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=33212486"

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    searchMovie("Batman")
  },[])

  const searchMovie = async (title) =>{
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search)
    setLoading(false);
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      searchMovie(searchItem);
    }
  };

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
          onKeyUp={handleSearch}
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
      {loading ? (
          <div className="loading">
            <img src={spinnerIcon} alt="spinner" className="spinner" />
            {/* <h3>Loading</h3> */}
          </div>
        ) : (
          movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie)=>(
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
