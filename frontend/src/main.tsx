import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from './providers/AuthProvider';
import App from './App';
import MusicProvider from './providers/MusicProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <MusicProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MusicProvider>
        </AuthProvider>
    </StrictMode>
);
