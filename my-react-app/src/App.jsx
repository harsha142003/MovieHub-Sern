import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ProfilePage from './pages/ProfilePage';
import ActorDetail from './pages/ActorDetail';
import MovieActorManagement from './pages/Admin/MovieActorManagement';
import UserManagement from './pages/Admin/UserManagement';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Actors from './pages/Actors';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/movies/:id" element={<ActorDetail />} />
          <Route path="/movie/:id" element={<ActorDetail />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actor" element={<Actors />} />
          <Route path="/actors/:id" element={<Detail />} />
          <Route path="/actor/:id" element={<Detail />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin/movies" element={<MovieActorManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;