import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';
import type {StateLoadOffers} from '../../types/type-store';

const initialState: StateLoadOffers = {
  offers: []
};

const loadOffersNearSlice = createSlice({
  name: 'OffersNear',
  initialState,
  reducers: {
    addLoadOffers(state, action: PayloadAction<OfferCard[]>) {

      state.offers = action.payload;
    }
  }
});

export {loadOffersNearSlice};