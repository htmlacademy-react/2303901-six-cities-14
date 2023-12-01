import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User, UserData} from '../../services/type-service';
import { checkAuthAction } from '../../services/thunk/check-auth-action';

const initialState: UserData = {
  data: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: '',
  }
};

const dataUserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addUserData(state, action: PayloadAction<User | null>) {
      state.data = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export {dataUserSlice};
