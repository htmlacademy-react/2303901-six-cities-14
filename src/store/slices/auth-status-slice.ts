import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import type {StateAuth} from '../../types/type-store';
import { checkAuthAction } from '../../services/thunk/check-auth-action';
import { loginAction } from '../../services/thunk/login-action';
import { logoutAction } from '../../services/thunk/logout-action';

const initialState: StateAuth = {
  authStatus: AuthorizationStatus.Unknown
};

const authStatusSlice = createSlice({
  name: 'authorizationStatus',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export {authStatusSlice};

