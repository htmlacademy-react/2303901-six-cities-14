import {combineReducers, configureStore} from '@reduxjs/toolkit';
//import {reducer} from './reducers/reducer';
import {offersSlice} from './slices/offers-slice';
import {filterCitySlice} from './slices/filter-city-slice';
import {sortOffersSlice} from './slices/sort-offers-slice';
import {filterOffersSlice} from './slices/filter-offer-slice';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterCitySlice.name]: filterCitySlice.reducer,
  [sortOffersSlice.name]: sortOffersSlice.reducer,
  [filterOffersSlice.name]: filterOffersSlice.reducer
});


const store = configureStore({reducer});

//console.log(store.getState());

export {store};
