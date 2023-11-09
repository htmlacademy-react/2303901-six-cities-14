import {type Offers} from '../../mock/offers/offer-mocks';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';


type InitialState = {
  offers: Offers;
}

const initialState: InitialState = {
  //offers: offersMock,
  offers: []
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOfferList(state, action: PayloadAction<Offers>) {
      state.offers = action.payload;
    },
    changeFavoriteStatus(state, action: PayloadAction<number>) {
      const idToChange = action.payload;

      const foundOffer = state.offers.find((offer) => offer.id === idToChange);
      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
  },
});

export {offersSlice};

