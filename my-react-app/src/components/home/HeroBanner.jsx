import React from "react";
import { Play, Info, Star, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroBanner({ movie }) {
  const genreArray = Array.isArray(movie.genre)
    ? movie.genre
    : typeof movie.genre === 'string' && movie.genre.includes(',')
      ? movie.genre.split(',').map(g => g.trim())
      : movie.genre
        ? [movie.genre]
        : [];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.image || 'https://images.unsplash.com/photo-1489599735036-3bab3ce8f9d4?w=1920&h=1080&fit=crop'})`,
          backgroundSize: '50% auto',
          backgroundPosition: 'center 20%',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Movie Info */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded shadow">Featured</span>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{movie.rating}/10</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {movie.name || movie.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{
                    movie.release_date && !isNaN(new Date(movie.release_date).getFullYear())
                      ? new Date(movie.release_date).getFullYear()
                      : 'N/A'
                  }</span>
                </div>
                {movie.hours && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{movie.hours}h</span>
                  </div>
                )}
                <div className="flex gap-2">
                  {genreArray.slice(0, 2).map((genre, index) => (
                    <span key={index} className="text-gray-300 border border-gray-600 rounded px-2 py-0.5 text-sm">{genre}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8 py-3 rounded flex items-center justify-center transition"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Trailer
                </button>
                <button
                  className="border border-white text-white hover:bg-white hover:text-black font-semibold text-lg px-8 py-3 rounded flex items-center justify-center transition"
                >
                  <Info className="w-5 h-5 mr-2" />
                  More Info
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}