// src/hooks/useAuthFetch.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthFetch = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthFetch must be used within an AuthProvider');
  }

  const { accessToken } = context;

  const authFetch = async (url: string, options: RequestInit = {}) => {
    if (!options.headers) {
        options.headers = new Headers();
    }

    if (accessToken) {
        (options.headers as Headers).append('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
    }

    return data;
  };

  return authFetch;
};

export default useAuthFetch;
