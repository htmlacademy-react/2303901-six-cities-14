import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute} from '../const';
import type {Offers} from '../mock/offers/offer-mocks';
import type {State} from '../types/type-store';
import type {AppDispatch} from '../types/type-store';

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(ApiRoute.Offers);
    dispatch(loadOffersSlice.actions.addLoadOffers(data));
  },
);

export {fetchOffersAction};
