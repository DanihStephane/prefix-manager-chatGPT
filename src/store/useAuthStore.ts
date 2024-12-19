import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User) => u.email === email && u.password === password);
        
        if (!user) {
          throw new Error('Invalid credentials');
        }

        set({ isAuthenticated: true, user });
      },

      register: async (email: string, password: string, name: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some((u: User) => u.email === email)) {
          throw new Error('Email already exists');
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          password,
          name,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        set({ isAuthenticated: true, user: newUser });
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);