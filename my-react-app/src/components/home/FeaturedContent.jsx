import React from "react";
import { Play, Info, Star, Calendar } from "lucide-react";

export default function FeaturedContent({ movies }) {
  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {featuredMovies.map((movie, index) => (
        <div key={movie.id} className="group cursor-pointer">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-800 mb-4">
            <img
              src={movie.banner_url || movie.poster_url || 'https://images.unsplash.com/photo-1489599735036-3bab3ce8f9d4?w=600&h=400&fit=crop'}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-white text-black hover:bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center transition">
                <Play className="w-8 h-8 fill-current" />
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded font-semibold shadow">Featured</span>
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4">
              <span className="bg-black/70 text-yellow-400 border border-yellow-400 rounded px-2 py-0.5 flex items-center text-sm">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {movie.rating}
              </span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-xl leading-tight group-hover:text-yellow-400 transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>{movie.genre?.[0]}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
              {movie.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}