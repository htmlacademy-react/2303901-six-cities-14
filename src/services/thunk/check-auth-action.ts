import type {Thunk} from '../type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../../const';
import type {User} from '../type-service';

const checkAuthAction = createAsyncThunk<User, undefined, Thunk>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(ApiRoute.Login);

    return data;
  },
);

export {checkAuthAction};
