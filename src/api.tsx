// src/apiService.ts
import useAuthFetch from './hooks/useAuthFetch';

const BASE_URL = 'http://localhost:3998/v1';

export const fetchLostItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/items/lost`);
    if (!response.ok) {
      throw new Error('Failed to fetch lost items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
}

export const fetchFoundItems = async () => {
  const authFetch = useAuthFetch();

  try {
    const response = await authFetch(`${BASE_URL}/items/found`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
}

export const fetchActiveAuctions = async () => {
  const authFetch = useAuthFetch();

  try {
    const response = await authFetch(`${BASE_URL}+/auctions/auctions?status=active`);
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return []; // Return an empty array in case of error
  }
}
