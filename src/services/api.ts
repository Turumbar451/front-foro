import axios from 'axios';

// poner esta variable de entorno en railway
export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({ baseURL: API_URL });


export default api;