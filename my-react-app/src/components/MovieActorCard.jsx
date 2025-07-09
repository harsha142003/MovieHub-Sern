import React from 'react'
import { Link } from 'react-router-dom';

const MovieActorCard = (props) => {
    const { id, name, price, image, description, movies, hours } = props.data;
    const { basePath, source } = props;

    const imageUrl = image.startsWith('http') ? image : `http://localhost:5000${image}`;

    if (source === 'actors') {
        return (
            <Link to={`/actors/${id}`} className='block'>
                <div className='bg-gray-900 p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
                    <img
                        src={imageUrl}
                        alt={name}
                        className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0003]'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                    <h3 className='text-xl py-3 text-center font-semibold text-white'>{name}</h3>
                    <div className='text-gray-400 text-sm mb-2 text-center'>{description}</div>
                    <div className='flex flex-col gap-1 text-gray-400 text-xs text-center'>
                        <span><b>Movies:</b> {movies}</span>
                        <span><b>Hours:</b> {hours}</span>
                    </div>
                </div>
            </Link>
        );
    }


    return (
        <div className='bg-gray-900 p-5 rounded-xl shadow-md border border-gray-200'>
            <Link to={`${basePath}/${id}`}>
                <img
                    src={imageUrl}
                    alt={name}
                    className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0003]'
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                />
            </Link>
            <h3 className='text-xl py-3 text-center font-semibold text-white'>{name}</h3>
            <div className='flex justify-center items-center gap-4'>
                <button
                    className='bg-blue-600 p-2 rounded-md text-sm hover:bg-blue-700 transition-colors text-white flex gap-2 items-center'
                    onClick={() => { }}
                >
                    Watch
                </button>
            </div>
        </div>
    )
}

export default MovieActorCard;