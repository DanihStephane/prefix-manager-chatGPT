import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddPrefixForm } from './components/AddPrefixForm';
import { SearchBar } from './components/SearchBar';
import { PrefixList } from './components/PrefixList';
import { PromptPage } from './components/PromptPage';
import { SettingsMenu } from './components/SettingsMenu';
import { DarkModeToggle } from './components/DarkModeToggle';
import { UserAvatar } from './components/UserAvatar';
import { usePrefixStore } from './store/usePrefixStore';
import { useAuthStore } from './store/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function HomePage() {
  const { isDarkMode } = usePrefixStore();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Prefix Manager
            </h1>
            <div className="flex items-center gap-4">
              <UserAvatar />
              <DarkModeToggle />
              <SettingsMenu />
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <AddPrefixForm />
            <SearchBar />
            <PrefixList />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { isDarkMode } = usePrefixStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/prompt/:id"
            element={
              <PrivateRoute>
                <PromptPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;