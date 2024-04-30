import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8800',
});


export default api;

export const useApi = () => ({
    validateToken: async (token: string) => {
         const response = await api.post('/ ', { token });
         return response.data;
        
        
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/',
        { email, password });
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
});