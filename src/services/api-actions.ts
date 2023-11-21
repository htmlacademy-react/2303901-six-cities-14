import type {Thunk} from './type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
// import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {setErrorSlice} from '../store/slices/set-error-slice';
import {store} from '../store';
import type {OfferCard} from '../types/type-store';
import {loadOffersNearSlice} from '../store/slices/load-offer-near-slice';
import {offersFavoriteSlice} from '../store/slices/load-offers-favorite';
import type {FavoriteStatus} from './type-service';

const fetchOffersNear = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchOfferNear',
  async (id, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(`${ApiRoute.Offers}/${id}/nearby`);

    dispatch(loadOffersNearSlice.actions.addLoadOffers(data));
  },
);

const sendFavoriteOffer = createAsyncThunk<void, FavoriteStatus , Thunk>(
  'sendFavoriteOffer',
  async ({id, status}, {dispatch, extra: api}) => {

    const {data} = await api.post<OfferCard>(`${ApiRoute.OffersFavorite}/${id}/${status}`);

    dispatch(offersFavoriteSlice.actions.sendFavoriteStatus(data));
  },
);

const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => {
      store.dispatch(setErrorSlice.actions.setError(''));
    }, TIMEOUT_SHOW_ERROR);
  }
);

export {
  fetchOffersNear,
  sendFavoriteOffer ,
  clearErrorAction,
};
