import {AxiosInstance} from 'axios';
import type {State} from '../types/type-store';
import type {AppDispatch} from '../types/type-store';

type Token = string;

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

type FavoriteStatus = {
  id: string;
  status: number;
}

export type {Token, UserData, User, Thunk, FavoriteStatus};

