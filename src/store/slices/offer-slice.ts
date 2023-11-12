import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { Offer, StateOffer } from '../../types/type-store';

const initialState: StateOffer = {
  offer: {},
};

const offerSlice = createSlice({
  name: 'loadOffer',
  initialState,
  reducers: {
    addLoadOffer(state, action: PayloadAction<Offer>) {
      state.offer = action.payload;
    }
  }
});

export {offerSlice};
