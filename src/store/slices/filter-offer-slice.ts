import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';
import type {StateFilterOffers} from '../../types/type-store';

const initialState: StateFilterOffers = {
  filterOffers: []
};

const filterOffersSlice = createSlice({
  name: 'filterOffers',
  initialState,
  reducers: {
    addFilterOffers(state, action: PayloadAction<OfferCard[]>) {
      state.filterOffers = action.payload;
    }
  }
});

export{filterOffersSlice};
