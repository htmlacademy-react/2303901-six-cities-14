import {AUTH_TOKEN_KEY_NAME} from '../const';
import type {Token} from './type-service';

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export {getToken, saveToken, dropToken};
