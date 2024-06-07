import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthFetch = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthFetch must be used within an AuthProvider');
  }

  const { firebaseToken, auth0Token } = context;

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});

    if (firebaseToken) {
      headers.set('Authorization', `Bearer ${firebaseToken}`);
    }

    if (auth0Token) {
      headers.set('x-auth0-token', auth0Token);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  };

  return authFetch;
};

export default useAuthFetch;
