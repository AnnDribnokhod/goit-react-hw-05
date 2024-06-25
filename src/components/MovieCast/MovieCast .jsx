import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(data => setCast(data));
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Cast</h2>
      <ul className={styles.list}>
        {cast.map(actor => (
          <li key={actor.cast_id} className={styles.item}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
