import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import type {StateAuth} from '../../types/type-store';

const initialState: StateAuth = {
  authStatus: AuthorizationStatus.Unknown
};


const authStatusSlice = createSlice({
  name: 'authStatus',
  initialState,
  reducers: {
    addAuthStatus(state, action: PayloadAction<string>) {
      state.authStatus = action.payload;
    }
  }
});

export {authStatusSlice};

