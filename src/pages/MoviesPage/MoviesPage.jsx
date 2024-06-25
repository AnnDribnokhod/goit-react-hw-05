import React, { useState, useEffect } from 'react';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('movie_name') ?? '';
  const [query, setQuery] = useState(searchQuery);

  const handleSubmit = (newQuery) => {
    if (!newQuery) {
      searchParams.delete('movie_name');
      setSearchParams(searchParams);
    } else {
      searchParams.set('movie_name', newQuery);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      setMovies([]);
      try {
        setError(null);
        setNoResults(false);
        const data = await searchMovies(searchQuery);
        if (data.length === 0) {
          setNoResults(true);
        } else {
          setMovies(data);
        }
      } catch (error) {
        setError(`Cannot find movies by search: ${searchQuery}`);
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.input}
        />
        <button onClick={() => handleSubmit(query)} className={styles.button}>
          Search
        </button>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {noResults && <div className={styles.noResults}>No movies found for "{query}".</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
