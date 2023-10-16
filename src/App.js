import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails'; // Import the new MovieDetails component

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData();
  }, []);

  return (
   <Router>
      <div className="App">
        <h1>Movies List</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Tagline: {movie.tagline}</p>
              <p>Vote Average: {movie.vote_average}/10</p>
              <Link to={`/movie/${movie.id}`}>View Details</Link> {/* Link to the movie details page */}
            </div>
          ))}
        </div>
        <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <>
      </div>
    </Router>
  );
}

export default App;
