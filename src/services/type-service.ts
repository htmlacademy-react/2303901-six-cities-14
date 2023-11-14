import {AxiosInstance} from 'axios';
import type {State} from '../types/type-store';
import type {AppDispatch} from '../types/type-store';

type Token = string;

type DetailMessageType = {
  type: string;
  message: string;
}

type UserData = {
  data: User | null;
}

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

type Thunk = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}


export type {Token, DetailMessageType, UserData, User, Thunk};

