// src/apiService.ts
import useAuthFetch from './hooks/useAuthFetch';

export const fetchLostItems = async () => {
  const authFetch = useAuthFetch();

  try {
    const response = await authFetch('http://localhost:3999/v1/items/lost');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
}

export const fetchFoundItems = async () => {
  const authFetch = useAuthFetch();

  try {
    const response = await authFetch('http://localhost:3999/v1/items/found');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
}

export const fetchActiveAuctions = async () => {
  const authFetch = useAuthFetch();

  try {
    const response = await authFetch('http://localhost:3999/v1/auctions/auctions?status=active');
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return []; // Return an empty array in case of error
  }
}
