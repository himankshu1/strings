import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainLayout from './layouts/MainLayout';
import ChatPage from './pages/ChatPage';
import AlbumPage from './pages/AlbumPage';

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route
                    path="/album/get-album/:albumId"
                    element={<AlbumPage />}
                />
            </Route>
        </Routes>
    );
};

export default App;
