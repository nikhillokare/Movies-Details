import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(0);

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
      <Link to="/">Go Back</Link>
    </div>
  );
}
export default MovieDetails;
