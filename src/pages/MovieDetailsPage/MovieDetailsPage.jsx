import React, { useEffect, useState, useRef } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useParams, NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';
import clsx from 'clsx';




const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(null);
  const location = useLocation();
  const hrefLocation = useRef(location.state );

  const buildLinkClass = ({ isActive }) => {
      return clsx(styles.link, isActive && styles.active);
    };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      setNotFound(null);

      try {
        const data = await fetchMovieDetails(movieId);
        if (!data) {
          setNotFound('Movie details cannot be found');
        } else {
          setMovie(data);
        }
      } catch (error) {
        setError('An error occurred while fetching movie details');
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const renderGenres = (genres) => {
    return genres.map((genre) => genre.name).join(', ');
  };

  const renderContent = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (notFound) return <div className={styles.notFound}>{notFound}</div>;

    return movie && (
      <>
        <button type="button" className={styles.button}>
          <HiArrowNarrowLeft />
          <Link to={hrefLocation.current} className={styles.link}>Go back</Link>
        </button>
        <div className={styles.container}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.image}
          />
          <div className={styles.detailsContainer}>
            <p className={styles.title}>{movie.title ?? 'No title has been added at this time'}</p>
            <p className={styles.subTitle}>Overview</p>
            <p >{movie.overview ?? 'No overview has been added at this time'}</p>
            <p className={styles.subTitle}>Genres</p>
            <p >{movie.genres ? renderGenres(movie.genres) : 'No genres have been added at this time'}</p>
          </div>
        </div>
       
        <NavLink to="cast" className={buildLinkClass}>Cast</NavLink>
        <NavLink to="reviews" className={buildLinkClass}>Reviews</NavLink>
    
        <Outlet />
      
      </>
    );
  };

  return (
    <div className={styles.componentContainer}>
      {renderContent()}
    </div>
  );
};

export default MovieDetailsPage;
