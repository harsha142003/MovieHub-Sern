import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import axios from 'axios';

const MovieActorManagement = () => {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        genre: '',
        actors: '',
        hours: '',
        movies: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [movieSuggestions, setMovieSuggestions] = useState([]);

    // Fetch movies and actors on component mount
    useEffect(() => {
        fetchMovies();
        fetchActors();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchActors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/actors');
            setActors(response.data);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMovieSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validation
        if (!formData.name || !formData.description || !formData.hours || (!selectedFile && !selectedMovie)) {
            setError('Please fill in all required fields and select an image.');
            return;
        }
        if (isNaN(Number(formData.hours)) || Number(formData.hours) <= 0) {
            setError('Hours must be a positive number.');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('genre', formData.genre);
            formDataToSend.append('actors', formData.actors);
            formDataToSend.append('hours', formData.hours);
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            } // else: do not append image for edit if not changed
            // Debug: log all formDataToSend values
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            if (selectedMovie) {
                await axios.put(`http://localhost:5000/api/movies/${selectedMovie.id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/movies', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            fetchMovies();
            resetForm();
        } catch (error) {
            setError(error?.response?.data?.message || 'Error saving movie.');
            console.error('Error saving movie:', error);
        }
    };

    const handleActorSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validation
        if (!formData.name || !formData.description || !formData.hours || (!selectedFile && !selectedActor)) {
            setError('Please fill in all required fields and select an image.');
            return;
        }
        if (isNaN(Number(formData.hours)) || Number(formData.hours) <= 0) {
            setError('Hours must be a positive number.');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('hours', formData.hours);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('movies', formData.movies);
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            } // else: do not append image for edit if not changed
            // Debug: log all formDataToSend values
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            if (selectedActor) {
                await axios.put(`http://localhost:5000/api/actors/${selectedActor.id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/actors', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            fetchActors();
            resetForm();
        } catch (error) {
            setError(error?.response?.data?.message || 'Error saving actor.');
            console.error('Error saving actor:', error);
        }
    };

    const handleEdit = (item, type) => {
        if (type === 'movie') {
            setSelectedMovie(item);
            setSelectedActor(null);
        } else {
            setSelectedActor(item);
            setSelectedMovie(null);
        }
        setFormData({
            name: item.name,
            image: item.image,
            description: item.description,
            genre: item.genre || '',
            actors: item.actors || '',
            hours: item.hours || '',
            movies: item.movies || ''
        });
        setImagePreview(item.image);
        setSelectedFile(null);
    };

    const handleDelete = async (id, type) => {
        try {
            if (type === 'movie') {
                await axios.delete(`http://localhost:5000/api/movies/${id}`);
                fetchMovies();
            } else {
                await axios.delete(`http://localhost:5000/api/actors/${id}`);
                fetchActors();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            image: '',
            description: '',
            genre: '',
            actors: '',
            hours: '',
            movies: ''
        });
        setSelectedMovie(null);
        setSelectedActor(null);
        setImagePreview(null);
        setSelectedFile(null);
        setError('');
    };

    const handleActorSuggestionClick = (idx, actorName) => {
        const names = formData.actors.split(',');
        names[idx] = actorName;
        setFormData({
            ...formData,
            actors: names.join(', ')
        });
    };

    const handleActorMoviesInput = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            movies: value
        });
        // Suggest based on the last fragment
        const fragments = value.split(',');
        const lastFragment = fragments[fragments.length - 1].trim().toLowerCase();
        if (lastFragment.length > 0) {
            setMovieSuggestions(
                movies.filter(m => m.name.toLowerCase().includes(lastFragment))
            );
        } else {
            setMovieSuggestions([]);
        }
    };

    const handleMovieSuggestionClick = (idx, movieName) => {
        const fragments = formData.movies.split(',');
        fragments[idx] = movieName;
        setFormData({
            ...formData,
            movies: fragments.join(', ')
        });
        setMovieSuggestions([]);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <AdminNavbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Product Management</h1>

                {/* Add/Edit Movies Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6">Movies</h2>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <p className="text-gray-600 mb-6">Use the form below to add new movies or edit existing ones.</p>
                        {/* Add/Edit Movie Form */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-8">
                            {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}
                            <h3 className="text-xl font-semibold mb-6">{selectedMovie ? 'Edit Movie' : 'Add Movie'}</h3>
                            <form onSubmit={handleMovieSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="movie-name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="movie-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="movie-image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                    <input
                                        type="file"
                                        id="movie-image"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="block w-full text-gray-700 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                    />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Preview" className="h-40 w-40 object-cover rounded-lg shadow-md" />
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="movie-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        id="movie-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="movie-genre" className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                                    <input
                                        type="text"
                                        id="movie-genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="movie-actors" className="block text-sm font-medium text-gray-700 mb-2">Actors</label>
                                    <input
                                        type="text"
                                        id="movie-actors"
                                        name="actors"
                                        value={formData.actors}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                    {/* Familiar Actors Preview */}
                                    {formData.actors && (
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {formData.actors.split(',').map((name, idx) => {
                                                const trimmed = name.trim().toLowerCase();
                                                if (!trimmed) return null;
                                                // Show all actors whose name includes the typed value
                                                const matchedActors = actors.filter(a => a.name.toLowerCase().includes(trimmed));
                                                return matchedActors.map(actor => (
                                                    <div
                                                        key={actor.id + '-' + idx}
                                                        className="flex items-center gap-2 bg-gray-200 rounded p-2 shadow cursor-pointer hover:bg-blue-200"
                                                        onClick={() => handleActorSuggestionClick(idx, actor.name)}
                                                    >
                                                        <img src={`http://localhost:5000${actor.image}`} alt={actor.name} className="h-10 w-10 object-cover rounded-full" />
                                                        <span className="font-medium text-gray-800">{actor.name}</span>
                                                    </div>
                                                ));
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="movie-hours" className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                                    <input
                                        type="number"
                                        id="movie-hours"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    {selectedMovie && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {selectedMovie ? 'Update Movie' : 'Save Movie'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Existing Movies List */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-6">Existing Movies</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actors</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {movies.map(movie => (
                                            <tr key={movie.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        src={`http://localhost:5000${movie.image}`}
                                                        alt={movie.name}
                                                        className="h-20 w-20 object-cover rounded-lg shadow-sm"
                                                        onError={(e) => {
                                                            console.error('Image failed to load:', movie.image);
                                                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden text-ellipsis max-w-sm">{movie.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.genre}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.actors}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.hours}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(movie, 'movie')}
                                                        className="text-blue-600 hover:text-blue-800 mr-4 font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(movie.id, 'movie')}
                                                        className="text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Add/Edit Actor Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">Actor</h2>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <p className="text-gray-600 mb-6">Use the form below to add new actor items or edit existing ones.</p>
                        {/* Add/Edit Actor Form */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-8">
                            {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}
                            <h3 className="text-xl font-semibold mb-6">{selectedActor ? 'Edit Actor Item' : 'Add Actor Item'}</h3>
                            <form onSubmit={handleActorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="actor-name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="actor-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="actor-image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                    <input
                                        type="file"
                                        id="actor-image"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="block w-full text-gray-700 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                    />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Preview" className="h-40 w-40 object-cover rounded-lg shadow-md" />
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="actor-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        id="actor-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="actor-movies" className="block text-sm font-medium text-gray-700 mb-2">Movies</label>
                                    <input
                                        type="text"
                                        id="actor-movies"
                                        name="movies"
                                        value={formData.movies}
                                        onChange={handleActorMoviesInput}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                        autoComplete="off"
                                    />
                                    {/* Movie Suggestions Dropdown */}
                                    {movieSuggestions.length > 0 && (
                                        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow mt-1 w-full max-w-md">
                                            {movieSuggestions.map((movie, idx) => (
                                                <div
                                                    key={movie.id}
                                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
                                                    onClick={() => {
                                                        // Find which fragment is being typed
                                                        const fragments = formData.movies.split(',');
                                                        handleMovieSuggestionClick(fragments.length - 1, movie.name);
                                                    }}
                                                >
                                                    {movie.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="actor-hours" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                    <input
                                        type="number"
                                        id="actor-hours"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    {selectedActor && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {selectedActor ? 'Update Actor Item' : 'Save Actor Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Existing Actor List */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-6">Existing Actor Items</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Movies</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {actors.map(actor => (
                                            <tr key={actor.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        src={`http://localhost:5000${actor.image}`}
                                                        alt={actor.name}
                                                        className="h-20 w-20 object-cover rounded-lg shadow-sm"
                                                        onError={(e) => {
                                                            console.error('Image failed to load:', actor.image);
                                                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{actor.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden text-ellipsis max-w-sm">{actor.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{actor.movies}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{actor.hours}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(actor, 'actor')}
                                                        className="text-blue-600 hover:text-blue-800 mr-4 font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(actor.id, 'actor')}
                                                        className="text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MovieActorManagement; 