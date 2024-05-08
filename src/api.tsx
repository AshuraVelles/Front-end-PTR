// apiService.tsx
import axios from 'axios';

const BASE_URL = 'http://localhost:4243';

export const fetchLostItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items/lost`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return []; // Return an empty array in case of error
  }
}
