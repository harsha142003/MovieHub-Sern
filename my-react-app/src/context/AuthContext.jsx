import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { useAppContext } from './Appcontext';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const { setUser } = useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUserState] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    setUserState(null);
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                setIsLoading(true);

                const response = await authService.verifyToken();

                if (response.data.valid) {
                    setIsAuthenticated(true);
                    setUserState(response.data.user);
                    setUser(response.data.user);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setUserState(null);
                    setUser(null);
                }
            } catch (error) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUserState(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [setUser]);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const { token, user } = response.data;

            localStorage.setItem('token', token);

            setIsAuthenticated(true);
            setUserState(user);
            setUser(user);

            return {
                success: true,
                user: user
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserState(null);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 