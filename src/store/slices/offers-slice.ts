import {offersMock} from '../../mock/offers/offer-mocks';
import type {Offers} from '../../mock/offers/offer-mocks';
import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  offers: Offers;
}

const initialState: InitialState = {
  offers: offersMock,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOfferList (state, action: PayloadAction<Offers>) {
      state.offers = action.payload;
    },
  },
});

export {offersSlice};
