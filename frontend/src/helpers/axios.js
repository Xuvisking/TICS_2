import axios from 'axios';

export const clienteAxios = axios.create({
    baseURL: 'http://20.121.32.18:4000'
});