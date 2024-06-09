import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthFetch = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthFetch must be used within an AuthProvider');
  }


  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});

    //Get tokens from local storage (NOT FROM CONTEXT)
    const accessToken = localStorage.getItem('accessToken');
    const auth0Token = localStorage.getItem('auth0Token');

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      console.warn('No access token found');
    }

    if (auth0Token) {
      headers.set('x-auth0-token', auth0Token);
    }
    else {
      console.warn('No Auth0 token found');
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    console.log('useAuthFetch Response:', response); // Debug output

    return response.json();
  };

  return authFetch;
};

export default useAuthFetch;
