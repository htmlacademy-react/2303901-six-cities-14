import {createSelector} from '@reduxjs/toolkit';
import type {State} from '../../types/type-store';

type OffersSlice = Pick<State, 'offers'>

const selectOffers = (state: OffersSlice) => state.offers.offers;
const selectCity = (state: OffersSlice) => state.offers.city;

const selectedCityOffers = createSelector(selectOffers,selectCity,(offers, city) => offers?.filter((offer) => offer.city.name === city));

export {selectCity, selectOffers, selectedCityOffers};
