import type {Thunk} from '../type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../../const';

import type { User } from '../type-service';
import { dataUserSlice } from '../../store/slices/data-user-slice';


const checkAuthAction = createAsyncThunk<void, undefined, Thunk>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>(ApiRoute.Login);

    dispatch(dataUserSlice.actions.addUserData(data));
  },
);

export {checkAuthAction};
