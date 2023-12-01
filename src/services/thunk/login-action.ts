import type {Thunk} from '../type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../../const';
import type {User} from '../type-service';
import type {AuthData} from '../../types/types';
import {saveToken} from '../token';
import type {UserDataLogin} from '../../types/types';

const loginAction = createAsyncThunk<UserDataLogin | User, AuthData, Thunk>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data: {token}, data} = await api.post<UserDataLogin | User>(ApiRoute.Login, {email, password});

    saveToken(token);

    return data;
  },
);

export {loginAction};
