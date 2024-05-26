// src/apiService.ts
import config from './apiconfig';
import useAuthFetch from './hooks/useAuthFetch';
import axios from 'axios';



export const fetchLostItems = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/items/lost`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
};

export const fetchFoundItems = async () => {
  const authFetch = useAuthFetch();

  try {
    const fetchedItems = await authFetch(`${config.API_BASE_URL}/police/items/found`);
    return fetchedItems;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
};


export const fetchActiveAuctions = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/auctions/auctions?status=active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return []; // Return an empty array in case of error
  }
};
export const fetchLostItemById = async (id: string) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/items/lost/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch item details:', error);
    throw error;
  }
};

export const fetchFoundItemById = async (id: string) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/items/found/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch item details:', error);
    throw error;
  }
};