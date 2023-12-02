import type {Thunk} from './type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute} from '../const';
import type {OfferCard} from '../types/type-store';
import type {FavoriteStatus} from './type-service';

const fetchOffersNear = createAsyncThunk<OfferCard[], string | undefined, Thunk>(
  'data/fetchOfferNear',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferCard[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  },
);

const sendFavoriteOffer = createAsyncThunk<OfferCard, FavoriteStatus , Thunk>(
  'sendFavoriteOffer',
  async ({id, status}, {extra: api}) => {

    const {data} = await api.post<OfferCard>(`${ApiRoute.OffersFavorite}/${id}/${status}`);

    return data;
  },
);

export {
  fetchOffersNear,
  sendFavoriteOffer ,
};
