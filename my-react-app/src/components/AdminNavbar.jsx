import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-xl font-bold">Admin Panel</span>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/admin/movies" className="hover:text-gray-300">Movies and Actors</Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                    </li>
                    <li>
                        <Link to="/home" className="hover:text-gray-300">View Site</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar; 