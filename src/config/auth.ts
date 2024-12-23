// Configuration for authentication
export const AUTH_CONFIG = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

// Validate configuration
if (!AUTH_CONFIG.googleClientId) {
  console.error('Missing VITE_GOOGLE_CLIENT_ID environment variable');
}