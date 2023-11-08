import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Offers} from '../../mock/offers/offer-mocks';
import type {StateSortOffers } from '../../types/type-store';

const initialState: StateSortOffers = {
  sortOffers: []
};

const sortOffersSlice = createSlice({
  name: 'sortOffers',
  initialState,
  reducers: {
    addSortOffers(state, action: PayloadAction<Offers>) {
      state.sortOffers = action.payload;
    }
  }
});

export {sortOffersSlice};
