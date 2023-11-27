import type {Thunk} from '../type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../../const';
import type { User } from '../type-service';
import { dataUserSlice } from '../../store/slices/data-user-slice';
import type { AuthData } from '../../types/types';
import { saveToken } from '../token';
import type { UserDataLogin } from '../../types/types';

const loginAction = createAsyncThunk<void, AuthData, Thunk>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}, data} = await api.post<UserDataLogin | User>(ApiRoute.Login, {email, password});

    dispatch(dataUserSlice.actions.addUserData(data as User));
    saveToken(token);
  },
);

export {loginAction};
