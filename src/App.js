import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      // Fetch movies data from the server
      const response = await fetch('/api/movies');
      const payload = await response.json();
      setMovies(payload.data);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Movies List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Tagline: {movie.tagline}</p>
            <p>Vote Average: {movie.vote_average}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
