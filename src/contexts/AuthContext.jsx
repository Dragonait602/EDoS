import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // ДОДАНО: стан завантаження
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    // Цей роут ми створили на бекенді
                    const res = await axios.get('http://localhost:5000/api/auth/me');
                    setUser(res.data);
                } catch (err) {
                    console.error('Fetch user error:', err);
                    // Якщо токен невалідний, виходимо з системи
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false); // Завершуємо завантаження
        };

        fetchUser();
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username, password, email, role, studentId) => {
        try {
            // Бекенд тепер повертає токен і користувача
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, password, email, role, studentId });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    const value = { user, token, login, register, logout, loading };

    // Показуємо children тільки після завершення перевірки авторизації
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};