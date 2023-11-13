import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User, UserData} from '../../services/type-service';

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
  }
});

export {dataUserSlice};
