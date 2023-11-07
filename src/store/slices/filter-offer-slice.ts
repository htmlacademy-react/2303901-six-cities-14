import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Offers} from '../../mock/offers/offer-mocks';
import type {StateFilterOffers} from '../../types/type-store';

const initialState: StateFilterOffers = {
  filterOffers: []
};

const filterOffersSlice = createSlice({
  name: 'filterOffers',
  initialState,
  reducers: {
    addFilterOffers(state, action: PayloadAction<Offers>) {
      state.filterOffers = action.payload;
    }
  }
});

export{filterOffersSlice};
