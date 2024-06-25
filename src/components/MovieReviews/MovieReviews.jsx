import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <ul className={styles.list}>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
