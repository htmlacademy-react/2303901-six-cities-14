import axios, {AxiosInstance} from 'axios';
import {URL_SERVER, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL_SERVER,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );
  return api;
};


export {createApi};
