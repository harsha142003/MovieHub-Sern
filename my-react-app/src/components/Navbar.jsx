import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 py-6 shadow-md">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/movies" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Oncart Logo" className="h-12 w-auto" />
            <span className="text-3xl font-bold text-white">Movie Mall</span>
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" className="text-lg text-white hover:text-yellow-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-lg text-white hover:text-yellow-400">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/actors" className="text-lg text-white hover:text-yellow-400">
                  Actors
                </Link>
              </li>
              <li>
                {!user ? (
                  <Link to="/login" className="text-lg text-white hover:text-yellow-400">
                    Login
                  </Link>
                ) : (
                  <Link to="/profile" className="text-lg text-white hover:text-yellow-400">
                    Profile
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;