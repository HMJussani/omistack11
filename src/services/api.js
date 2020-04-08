import axios from 'axios';

const api = axios.create({
    baseURL: 'https://demoongs.herokuapp.com/',
});

export default api;

