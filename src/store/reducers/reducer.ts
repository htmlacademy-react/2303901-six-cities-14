import {createReducer} from '@reduxjs/toolkit';
import { offersMock } from '../../mock/offers/offer-mocks';
import type {Offers} from '../../mock/offers/offer-mocks';
import{changeCity, addOfferList} from '../actions/action';
import { DEFAULT_CITY } from '../../const';


type InitialState = {
  offers: Offers;
  currentCity: string;

}

const initialState: InitialState = {
  offers: offersMock,
  currentCity: DEFAULT_CITY,
};

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(changeCity, (state, action) => {
    state.currentCity = action.payload;
  });

  builder.addCase(addOfferList, (state, action) => {
    state.offers = action.payload;
  });
});

export {reducer};
