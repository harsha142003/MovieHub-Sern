import React from "react";
import { Award, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ActorSpotlight({ actors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {actors.slice(0, 5).map((actor, index) => (
        <motion.div
          key={actor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-square rounded-full overflow-hidden bg-gray-800 mb-4">
            <img
              src={actor.image || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face`}
              alt={actor.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-white text-black font-semibold px-3 py-1 rounded shadow">View Profile</span>
            </div>
          </div>

          {/* Actor Info */}
          <div className="text-center">
            <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-yellow-400 transition-colors">
              {actor.name}
            </h3>
            <div className="text-gray-400 text-sm mb-2">
              <span><b>Movies:</b> {actor.movies}</span><br />
              <span><b>Age:</b> {actor.hours}</span>
            </div>
            <div className="text-gray-300 text-xs mt-2 line-clamp-2">{actor.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}