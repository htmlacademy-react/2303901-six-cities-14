import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  email: string;
}

const initialState: InitialState = {
  email: ''
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    addEmail (state, action: PayloadAction<string>) {
      state.email = action.payload;
    }
  }
});

export {emailSlice};
