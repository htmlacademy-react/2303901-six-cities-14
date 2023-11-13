import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from './slices/offers-slice';
import {filterCitySlice} from './slices/filter-city-slice';
import {sortOffersSlice} from './slices/sort-offers-slice';
import {filterOffersSlice} from './slices/filter-offer-slice';
import {createApi} from '../services/api';
import {loadOffersSlice} from './slices/load-offers-slice';
import {authStatusSlice} from './slices/auth-status-slice';
import {setErrorSlice} from './slices/set-error-slice';
import {dataUserSlice} from './slices/data-user-slice';
import {offerSlice} from './slices/offer-slice';


const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterCitySlice.name]: filterCitySlice.reducer,
  [sortOffersSlice.name]: sortOffersSlice.reducer,
  [filterOffersSlice.name]: filterOffersSlice.reducer,
  [loadOffersSlice.name]: loadOffersSlice.reducer,
  [authStatusSlice.name]: authStatusSlice.reducer,
  [setErrorSlice.name]: setErrorSlice.reducer,
  [dataUserSlice.name]: dataUserSlice.reducer,
  [offerSlice.name]: offerSlice.reducer
});

const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

//console.log(store.getState());

export {store};
