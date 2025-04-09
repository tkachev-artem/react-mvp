import axios from 'axios';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api', credentials);
    return response.data;
  }
};