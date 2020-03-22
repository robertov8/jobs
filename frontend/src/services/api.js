import axios from 'axios';
import { baseURL } from '../.env.js';

const api = axios.create({
  baseURL,
});

export default api;
