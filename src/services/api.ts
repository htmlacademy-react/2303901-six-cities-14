import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {URL_SERVER, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {processErrorHandle} from './process-error-handle';
import type {DetailMessageType} from './type-service';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];


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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {

      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.message);

        processErrorHandle(detailMessage);
      }
      //console.log(error.request.response)
      throw error;
    }
  );

  return api;
};


export {createApi};
