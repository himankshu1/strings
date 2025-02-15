import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from './providers/AuthProvider';
import App from './App';
import MusicProvider from './providers/MusicProvider';
import ChatProvider from './providers/ChatProvider';
import PlayerProvider from './providers/PlayerProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ChatProvider>
                <MusicProvider>
                    <PlayerProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </PlayerProvider>
                </MusicProvider>
            </ChatProvider>
        </AuthProvider>
    </StrictMode>
);
