import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from './slices/offers-slice';
import {filterCitySlice} from './slices/filter-city-slice';
import {sortOffersSlice} from './slices/sort-offers-slice';
import {filterOffersSlice} from './slices/filter-offer-slice';
import {createApi} from '../services/api';
import {authStatusSlice} from './slices/auth-status-slice';
import {setErrorSlice} from './slices/set-error-slice';
import {dataUserSlice} from './slices/data-user-slice';
import {offerSlice} from './slices/offer-slice';
import {loadOffersNearSlice} from './slices/load-offer-near-slice';
import {loadCommentsSlice} from './slices/load-comments-slice';
import {errorOfferSlice} from './slices/error-offer-slice';
import {sendCommentsSlice} from './slices/send-comment-slice';
import {offersFavoriteSlice} from './slices/load-offers-favorite';
import { redirect } from './redirect';


const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterCitySlice.name]: filterCitySlice.reducer,
  [sortOffersSlice.name]: sortOffersSlice.reducer,
  [filterOffersSlice.name]: filterOffersSlice.reducer,
  [authStatusSlice.name]: authStatusSlice.reducer,
  [setErrorSlice.name]: setErrorSlice.reducer,
  [dataUserSlice.name]: dataUserSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [loadOffersNearSlice.name]: loadOffersNearSlice.reducer,
  [loadCommentsSlice.name]: loadCommentsSlice.reducer,
  [errorOfferSlice.name]: errorOfferSlice.reducer,
  [sendCommentsSlice.name]: sendCommentsSlice.reducer,
  [offersFavoriteSlice.name]: offersFavoriteSlice.reducer

});

const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

//console.log(store.getState());

export {store, reducer};
