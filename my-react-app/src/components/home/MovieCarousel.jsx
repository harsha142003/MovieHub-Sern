import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Play, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function MovieCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, Math.ceil(movies.length / itemsPerPage) - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleMovies = movies.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-30 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-30 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800">
              <img
                src={movie.image || 'https://images.unsplash.com/photo-1489599735036-3bab3ce8f9d4?w=400&h=600&fit=crop'}
                alt={movie.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center flex flex-col gap-2 items-center">
                  <button className="bg-white text-black hover:bg-gray-200 rounded-full w-16 h-16 mb-4 flex items-center justify-center transition">
                    <Play className="w-8 h-8 fill-current" />
                  </button>
                  <button className="border border-white text-white hover:bg-white hover:text-black rounded-full w-12 h-12 flex items-center justify-center transition">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-yellow-400 transition-colors">
                {movie.name}
              </h3>
              <div className="flex flex-col gap-1 text-gray-400 text-sm">
                <span><b>Genre:</b> {movie.genre}</span>
                <span><b>Actors:</b> {movie.actors}</span>
                <span><b>Hours:</b> {movie.hours}</span>
              </div>
              <div className="text-gray-300 text-xs mt-2 line-clamp-2">{movie.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-yellow-400 w-6' : 'bg-gray-600'
              }`}
          />
        ))}
      </div>
    </div>
  );
}