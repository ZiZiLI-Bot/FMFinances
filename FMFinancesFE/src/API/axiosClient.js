import axios from 'axios';
import { parse, stringify } from 'qs';
import AuthStorage from '../helper/AuthStorage';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL_BE_FMFINANCE || process.env.VITE_URL_BE_FMFINANCE,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use((config) => {
  if (AuthStorage.getKey('token')) {
    config.headers = {
      Authorization: `Bearer ${AuthStorage.getKey('token')}`,
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.error(error.response);
    return error.response;
  },
);
export default axiosClient;
