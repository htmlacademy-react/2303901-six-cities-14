import type {OfferCard} from '../../types/type-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';

type InitialState = {
  offers: OfferCard[] | null;
  loadingStatus: boolean | null;
  error: null | string;
}

const initialState: InitialState = {
  offers: null,
  loadingStatus: null,
  error: null
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
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loadingStatus = false;
        state.error = null;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
      });
  }
});

export {offersSlice};

