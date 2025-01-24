import { Route, Routes, useNavigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useContext, useEffect } from 'react';
import { AuthContext } from './providers/AuthProvider';

const App = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)!;

    // useEffect(() => {
    //     if (user) {
    //         navigate('/');
    //     } else {
    //         navigate('/login');
    //     }
    // }, [navigate, user]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    );
};

export default App;
