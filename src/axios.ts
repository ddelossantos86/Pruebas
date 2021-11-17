import axios from 'axios'

const api = axios.create ({
    baseURL: 'localhost:8017/api/datos_todos'
});

export default api;

