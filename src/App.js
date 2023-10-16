import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Outlet, useParams } from 'react-router-dom'; // Import useParams

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
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="movie-card">
                <h2>{movie.title}</h2>
                <p>Tagline: {movie.tagline}</p>
                <p>Vote Average: {movie.vote_average}/10</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </Router>
  );
}

function SingleMovie() {
  const { id } = useParams(); // Use useParams to get the movie ID from the URL
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>No movie selected</div>;
  }

  return (
    <div className="single-movie">
      <h1>{movie.title}</h1>
      <p>Tagline: {movie.tagline}</p>
      <p>Vote Average: {movie.vote_average}/10</p>
      <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default App;
