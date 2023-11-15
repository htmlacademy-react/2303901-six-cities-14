import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard, StateLoadOffers} from '../../types/type-store';

const initialState: StateLoadOffers = {
  offers: []
};


const offersFavoriteSlice = createSlice({
  name:'offersFavorite',
  initialState,
  reducers: {
    addFavoriteOffers(state, action: PayloadAction<OfferCard[]>) {
      state.offers = action.payload;
    }
  }
});

export {offersFavoriteSlice};
