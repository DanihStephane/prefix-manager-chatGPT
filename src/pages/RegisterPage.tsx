import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { useAuthStore } from '../store/useAuthStore';

export const RegisterPage: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout title="Create your account">
      <RegisterForm />
    </AuthLayout>
  );
};