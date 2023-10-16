import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleMovie.css';

function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({id});


  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`/api/movie/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data.data);
        } else {
          setError('Error fetching movie data');
        }
      } catch (error) {
        setError('Error fetching movie data');
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString();
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

export default SingleMovie;
