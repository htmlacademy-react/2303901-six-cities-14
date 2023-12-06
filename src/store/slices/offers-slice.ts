import type {OfferCard} from '../../types/type-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';
import {Sort} from '../../const';

type StateOffers = {
  offers: OfferCard[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  offersFilter: OfferCard[];
  changeOffers: OfferCard[];
  statusSort: string;
}

const initialState: StateOffers = {
  offers: null,
  loadingStatus: null,
  error: null,
  offersFilter:[],
  changeOffers: [],
  statusSort : Sort.Popular
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
    addOffersFilter(state, action: PayloadAction<OfferCard[]>){
      state.offersFilter = action.payload;
    },
    changeOffers(state, action: PayloadAction<OfferCard[]>){
      state.changeOffers = action.payload;
    },
    addStatusSort(state, action: PayloadAction<string>){
      state.statusSort = action.payload;
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

