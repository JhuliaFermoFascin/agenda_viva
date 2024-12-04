import axios from 'axios';

const apiURL = 'http://localhost:3001';

const api = axios.create({
    baseURL: apiURL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;