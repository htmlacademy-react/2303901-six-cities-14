import type {Thunk} from '../type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../../const';
import { dropToken } from '../token';

const logoutAction = createAsyncThunk<void, undefined, Thunk>(
  'user/logout',
  async (_arg, { extra: api}) => {

    await api.delete(ApiRoute.Logout);

    dropToken();
  },
);

export {logoutAction};

