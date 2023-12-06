import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {OfferCard} from '../../types/type-store';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';

type OfferFavorite = {
  offers: OfferCard[];
  status: object;
  loading: boolean;
  error : string | boolean;
}

const initialState: OfferFavorite = {
  offers: [],
  status: {
    id: '',
    status: 0,
  },
  loading: false,
  error: false
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffersFavorite.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOffersFavorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOffersFavorite.rejected, (state, action) => {
      state.error = action.error.message || 'Unknown error';
    });
  }
});

export {offersFavoriteSlice};
