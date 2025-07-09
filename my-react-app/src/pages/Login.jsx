import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginstyle.css';
import { useAppContext } from '../context/Appcontext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import AnimatedBackdrop from '../components/AnimatedBackdrop';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({
        username: username.trim(),
        password: password
      });

      if (result.success && result.user) {
        setUser(result.user);
        if (result.user.role === 'admin') {
          navigate('/admin/movies');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <AnimatedBackdrop />
      <div className="login-root" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 400, background: 'rgba(20,20,30,0.85)', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', padding: 32 }}>
          <header>
            <h1>Hi, welcome back!</h1>
            <p>
              First time here? <Link className="text-white" to="/register">Sign up for free</Link>
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Password must be at least 6 characters</p>
            <button type="submit">Sign in</button>
            <p>
              You acknowledge that you read, and agree, to our <a href="#">Terms of Service</a> and our <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;