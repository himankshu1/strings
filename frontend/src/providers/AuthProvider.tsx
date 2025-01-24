/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { axiosClient } from '../lib/axios';
import { SignupFormType } from '@/pages/SignupPage';

export interface AuthContextType {
    user: object | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signup: (userData: SignupFormType) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //* Check auth on mount
    useEffect(() => {
        const initializeAuth = async () => {
            await checkAuth();
        };
        initializeAuth();
    }, []);

    //* register function
    const signup = async (userData: SignupFormType) => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.post(
                '/users/register',
                userData
            );
            console.log(data);

            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    };

    //* Login function
    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.post('/users/login', {
                email,
                password,
            });
            console.log(data);

            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    //* Logout function
    const logout = async () => {
        try {
            await axiosClient.get('/users/logout');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    //* Check authentication
    const checkAuth = async () => {
        try {
            const { data } = await axiosClient.get('/users/me');
            console.log('user data :: ', data);

            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Error in checking auth', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                signup,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
