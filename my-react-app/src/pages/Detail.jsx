import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { apiService } from '../services/api';

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchActor = async () => {
            try {
                setLoading(true);
                const response = await apiService.getActor(id);
                if (response && response.data) {
                    setDetail(response.data);
                    setError(null);
                  
                    const moviesRes = await apiService.getMovies();
                    if (moviesRes && moviesRes.data) {
                        const actorName = response.data.name?.toLowerCase();
                        const filteredMovies = moviesRes.data.filter(movie =>
                            movie.actors && movie.actors.toLowerCase().includes(actorName)
                        );
                        setMovies(filteredMovies);
                    }
                } else {
                    setError('Actor not found');
                }
            } catch (err) {
                console.error('Error fetching actor:', err);
                setError('Failed to fetch actor details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchActor();
        } else {
            setError('Invalid actor ID');
            setLoading(false);
        }
    }, [id]);
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-96 bg-gray-200 rounded"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Actor not found'}</h2>
                        <button
                            onClick={() => navigate('/actors')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Back to Actors
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/actors')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors mb-6"
                >
                    &larr; Back to Actors
                </button>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <img
                            src={detail.image?.startsWith('http') ? detail.image : `http://localhost:5000${detail.image}`}
                            alt={detail.name}
                            className='w-full h-auto object-contain rounded-lg'
                            onError={(e) => {
                                console.error('Image failed to load:', detail.image);
                                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-5 bg-gray-800 p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl text-gray-300'>ACTOR DETAIL</h2>
                        <h1 className='text-4xl font-bold text-white'>{detail.name}</h1>
                        <div className='flex flex-col gap-2 text-gray-200'>
                            <span><b>Movies:</b> {detail.movies}</span>
                            <span><b>Hours:</b> {detail.hours}</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {detail.description}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Movies this actor appears in */}
                {movies.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-white mb-4">Movies Featuring {detail.name}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {movies.map(movie => (
                                <div key={movie.id} className="flex flex-col items-center">
                                    <img
                                        src={movie.image?.startsWith('http') ? movie.image : `http://localhost:5000${movie.image}`}
                                        alt={movie.name}
                                        className="h-44 w-44 object-cover rounded-full mb-2 border-4 border-gray-900 shadow-lg"
                                    />
                                    <span className="text-white font-semibold text-center">{movie.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Detail;