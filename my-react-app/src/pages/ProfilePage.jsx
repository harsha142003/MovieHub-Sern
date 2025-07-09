import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTimes } from 'react-icons/fa';
import MovieActorCard from '../components/MovieActorCard';

function ProfilePage() {
    const { user } = useAppContext();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderProfileDetails = () => (
        <div className="relative bg-gray-900 p-6 rounded-xl shadow-xl h-full flex flex-col border border-gray-700 items-center w-full max-w-2xl">
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                onClick={() => setShowEditModal(true)}
            >
                <FaEdit className="w-5 h-5" />
            </button>
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 border-4 border-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z
                        M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0
                        01-.75-.75V19.5z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-200 pb-4 w-full text-center">
                Profile Details
            </h2>
            {user ? (
                <div className="text-white space-y-4 flex-grow w-full">
                    <div className="flex justify-between">
                        <span className="font-semibold pr-2">Username:</span>
                        <span>{user.name || user.username || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold pr-2">Email:</span>
                        <span>{user.email || 'N/A'}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center flex-grow flex items-center justify-center">
                    Please log in to see profile details.
                </p>
            )}
        </div>
    );

    const renderEditModal = () => (
        showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
                <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                        onClick={() => setShowEditModal(false)}
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                    <input
                        type="text"
                        placeholder="New Username"
                        className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600"
                    />
                    <input
                        type="email"
                        placeholder="New Email"
                        className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600"
                    />
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col items-center w-full">
                <div className="w-full max-w-[700px] flex flex-col items-center justify-center gap-10 mt-10">
                    <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
                    {renderProfileDetails()}
                </div>
                <div className="flex justify-center mt-8 w-full">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition-colors w-full max-w-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            {renderEditModal()}
        </div>
    );
}

export default ProfilePage;
