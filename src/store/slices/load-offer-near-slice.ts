import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';
import type {StateLoadOffers} from '../../types/type-store';
import { fetchOffersNear } from '../../services/api-actions';

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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOffersNear.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
  }
});

export {loadOffersNearSlice};
