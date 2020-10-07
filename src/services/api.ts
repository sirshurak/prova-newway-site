import axios from 'axios';
import config from '../config';

/**
 * Axios para conexão externa para API.
 * @property {string} config.API_BASEURL deve estar configurada
 */
const api = axios.create({
    baseURL: config.API_BASEURL
});

export default api;