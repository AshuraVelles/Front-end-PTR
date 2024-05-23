// src/hooks/useAuthFetch.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthFetch = () => {
  const { accessToken } = useContext(AuthContext)!;

  const authFetch = async (url: string, options: RequestInit = {}) => {
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  };

  return authFetch;
};

export default useAuthFetch;
