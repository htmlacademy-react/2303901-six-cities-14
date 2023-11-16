import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  error: ''
};


const errorOfferSlice = createSlice({
  name: 'errorOffer',
  initialState,
  reducers: {
    addErrorOffer (state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export {errorOfferSlice};
