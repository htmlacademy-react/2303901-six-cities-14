import type { OfferCard } from '../../types/type-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  offers: OfferCard[] | null;
}

const initialState: InitialState = {
  offers: null
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOfferList(state, action: PayloadAction<OfferCard[]>) {
      state.offers = action.payload;
    },
    changeFavoriteStatus(state, action: PayloadAction<string>) {
      const idToChange = action.payload;

      const foundOffer = state.offers?.find((offer) => offer.id === idToChange);
      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
  },
});

export {offersSlice};

