import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from './slices/offers-slice';
import {filterCitySlice} from './slices/filter-city-slice';
import {createApi} from '../services/api';
import {authStatusSlice} from './slices/auth-status-slice';
import {dataUserSlice} from './slices/data-user-slice';
import {offerSlice} from './slices/offer-slice';
import {loadOffersNearSlice} from './slices/load-offer-near-slice';
import {loadCommentsSlice} from './slices/load-comments-slice';
import {sendCommentsSlice} from './slices/send-comment-slice';
import {offersFavoriteSlice} from './slices/load-offers-favorite';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterCitySlice.name]: filterCitySlice.reducer,
  [authStatusSlice.name]: authStatusSlice.reducer,
  [dataUserSlice.name]: dataUserSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [loadOffersNearSlice.name]: loadOffersNearSlice.reducer,
  [loadCommentsSlice.name]: loadCommentsSlice.reducer,
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
    }),
});

export {store, reducer};
