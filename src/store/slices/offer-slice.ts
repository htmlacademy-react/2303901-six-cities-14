import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard, OfferPage, StateOffer} from '../../types/type-store';
import {fetchOfferAction} from '../../services/thunk/fetch-offer';

const initialState: StateOffer = {
  offer: null,
  error: null,
  loading: null,
  offerCard: null
};

const offerSlice = createSlice({
  name: 'loadOffer',
  initialState,
  reducers: {
    addLoadOffer(state, action: PayloadAction<OfferPage | null>) {
      state.offer = action.payload;
    },
    addLoadOfferCard(state, action: PayloadAction<OfferCard | null | OfferPage>) {
      state.offerCard = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferPage>) => {
        state.offer = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.loading = true;
      });
  },
});

export {offerSlice};
