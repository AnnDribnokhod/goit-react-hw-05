import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to fetch trending movies. Please try again later.');
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
