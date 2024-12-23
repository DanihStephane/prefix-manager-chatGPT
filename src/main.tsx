import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AUTH_CONFIG } from './config/auth';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={AUTH_CONFIG.googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);