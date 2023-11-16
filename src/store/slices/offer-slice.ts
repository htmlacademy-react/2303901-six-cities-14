import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferPage, StateOffer} from '../../types/type-store';

const initialState: StateOffer = {
  offer: null,
};

const offerSlice = createSlice({
  name: 'loadOffer',
  initialState,
  reducers: {
    addLoadOffer(state, action: PayloadAction<OfferPage | null>) {
      state.offer = action.payload;
    }
  }
});

export {offerSlice};
