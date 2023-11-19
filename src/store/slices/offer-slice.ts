import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OfferPage, StateOffer } from '../../types/type-store';
import { fetchOfferAction } from '../../services/thunk/fech-offer';


const initialState: StateOffer = {
  offer: null,
  error: null,
};

const offerSlice = createSlice({
  name: 'loadOffer',
  initialState,
  reducers: {
    addLoadOffer(state, action: PayloadAction<OfferPage | null>) {
      state.offer = action.payload;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferPage>) => {
        state.offer = action.payload;
        state.error = null;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export { offerSlice };
