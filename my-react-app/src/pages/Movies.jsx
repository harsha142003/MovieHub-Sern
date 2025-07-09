import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import MovieActorCard from '../components/MovieActorCard';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../stores/Search';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const searchQuery = useSelector(store => store.search.searchQuery);

  const handleSearchInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await apiService.getMovies();
        setMovies(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="pb-8" id="featured-movies">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-bold">Featured Movies</h2>

            {/* Search Input */}
            <div
              className="ml-8 p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-gray-800 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
            >
              <div className="flex items-center justify-center fill-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22">
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" ></path>
                </svg>
              </div>
              <input
                type="text"
                className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-8">
            
            {movies
              .filter(movie =>
                movie.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((movie) => (
                <MovieActorCard
                  key={movie.id}
                  data={movie}
                  basePath="/movies"
                  source="products"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;