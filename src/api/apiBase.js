import axios from 'axios';

const apiURL = 'http://localhost:3001';

const api = axios.create({
    // eslint-disable-next-line no-underscore-dangle
    baseURL: apiURL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;