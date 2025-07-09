import React, { useState, useEffect } from 'react';
import MovieActorCard from '../components/MovieActorCard';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiService } from '../services/api';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Actors = () => {
    const location = useLocation();
    const searchQuery = useSelector(store => store.search.searchQuery);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiService.getActors();
                setActors(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch actors');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredActors = actors.filter(actor =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-900'>
                <Navbar />
                <Header />
                <div className='flex justify-center items-center h-screen'>
                    <div className='text-white text-xl'>Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gray-900'>
                <Navbar />
                <Header />
                <div className='flex justify-center items-center h-screen'>
                    <div className='text-red-500 text-xl'>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-900'>
            <Navbar />
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className='text-3xl font-bold text-center mb-10 text-white'>Actors</h1>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8'>
                    {filteredActors.map((actor, key) =>
                        <MovieActorCard
                            key={key}
                            data={actor}
                            basePath="/actors"
                            source="actors"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Actors; 