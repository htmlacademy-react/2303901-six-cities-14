import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';
import type {StateSortOffers} from '../../types/type-store';

const initialState: StateSortOffers = {
  sortOffers: []
};

const sortOffersSlice = createSlice({
  name: 'sortOffers',
  initialState,
  reducers: {
    addSortOffers(state, action: PayloadAction<OfferCard[]>) {
      state.sortOffers = action.payload;
    }
  }
});

export {sortOffersSlice};
