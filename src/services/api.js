import axios from 'axios';

const API_KEY = '8f968f8e0e09a61ce0ea2f0f9c586172';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data.cast;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return response.data.results;
};

export { fetchTrendingMovies, searchMovies, fetchMovieDetails, fetchMovieCast, fetchMovieReviews };
