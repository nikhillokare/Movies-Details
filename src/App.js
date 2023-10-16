import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link,useParams } from 'react-router-dom';

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
      <Routes>
        <Route path="/movie/:id" element={<SingleMovie movie={movies[0]} />} />
      </Routes>
    </Router>
  );
}
function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`/api/movie/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data.data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Format release date using browser's locale settings
  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString();

  // Calculate runtime in minutes
  const runtimeInMinutes = `${Math.floor(movie.runtime / 60)} minutes`;

  return (
    <div className="single-movie">
      <h1>{movie.title}</h1>
      <p>Tagline: {movie.tagline}</p>
      <p>Vote Average: {movie.vote_average}/10</p>
      <p>Release Date: {formattedReleaseDate}</p>
      <p>Runtime: {runtimeInMinutes}</p>
      <p>Status: {movie.status}</p>
      <p>Overview: {movie.overview}</p>
      {/* Add more fields as needed */}
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default App;
