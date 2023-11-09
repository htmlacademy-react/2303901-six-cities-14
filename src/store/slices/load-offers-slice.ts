import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Offers} from '../../mock/offers/offer-mocks';
import type { StateLoadOffers } from '../../types/type-store';

const initialState: StateLoadOffers = {
  offers: []
};

const loadOffersSlice = createSlice({
  name: 'loadOffers',
  initialState,
  reducers: {
    addLoadOffers(state, action: PayloadAction<Offers>) {
      state.offers = action.payload;
    }
  }
});

export {loadOffersSlice};


