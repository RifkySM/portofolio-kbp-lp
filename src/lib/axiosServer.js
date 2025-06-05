import axios from 'axios';

const serverAxios = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
    },
});

export default serverAxios;
