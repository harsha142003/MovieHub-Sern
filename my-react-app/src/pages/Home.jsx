import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../components/Navbar';
import {
  Play,
  Info,
  Star,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { apiService } from "../services/api";

import HeroBanner from "../components/home/HeroBanner";
import MovieCarousel from "../components/home/MovieCarousel";
import ActorSpotlight from "../components/home/ActorSpotlight";
import FeaturedContent from "../components/home/FeaturedContent";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [moviesRes, actorsRes] = await Promise.all([
        apiService.getMovies(),
        apiService.getActors()
      ]);
     
      const moviesData = (moviesRes.data || []).map(movie => ({
        id: movie.id,
        name: movie.name,
        image: movie.image ? (movie.image.startsWith('http') ? movie.image : `http://localhost:5000${movie.image}`) : '',
        description: movie.description || '',
        genre: movie.genre || '',
        actors: movie.actors || '',
        hours: movie.hours || '',
      }));
  
      const actorsData = (actorsRes.data || []).map(actor => ({
        id: actor.id,
        name: actor.name,
        image: actor.image ? (actor.image.startsWith('http') ? actor.image : `http://localhost:5000${actor.image}`) : '',
        description: actor.description || '',
        movies: actor.movies || '',
        hours: actor.hours || '',
      }));
      setMovies(moviesData);
      setActors(actorsData);
      setBannerIndex(0);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);


  const allMovies = movies;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading amazing content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
     
      {movies.length > 0 && <HeroBanner movie={movies[bannerIndex]} />}

   
      <div className="relative z-10 bg-gray-900 -mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">

       
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-yellow-400" />
                <h2 className="text-3xl font-bold text-white">All Movies</h2>
              </div>
            </div>
            <MovieCarousel movies={allMovies} />
          </section>

       
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Featured Actors</h2>
              </div>
              <button className="px-4 py-2 rounded border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition">View All</button>
            </div>
            <ActorSpotlight actors={actors} />
          </section>

        </div>
      </div>
    </div>
  );
}