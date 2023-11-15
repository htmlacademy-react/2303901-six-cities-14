import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';

type OfferFavorite = {
  offers: OfferCard[];
  status: object;
}


const initialState: OfferFavorite = {
  offers: [],
  status: {
    id: '',
    status: 0
  }
};


const offersFavoriteSlice = createSlice({
  name:'offersFavorite',
  initialState,
  reducers: {
    addFavoriteOffers(state, action: PayloadAction<OfferCard[]>) {
      state.offers = action.payload;
    },

    sendFavoriteStatus(state, action: PayloadAction<OfferCard>){
      state.status = action.payload;
    }
  }
});

export {offersFavoriteSlice};
