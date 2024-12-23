import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../../store/useAuthStore';
import { AUTH_CONFIG } from '../../config/auth';

export const GoogleLoginButton: React.FC = () => {
  const { loginWithGoogle } = useAuthStore();

  // Prevent rendering if Google client ID is not configured
  if (!AUTH_CONFIG.googleClientId) {
    return null;
  }

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        loginWithGoogle({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.error('Google login failed');
    },
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
};