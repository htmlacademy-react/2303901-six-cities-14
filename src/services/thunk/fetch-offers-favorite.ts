import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Thunk} from '../type-service';
import type{OfferCard} from '../../types/type-store';
import {ApiRoute} from '../../const';

const fetchOffersFavorite = createAsyncThunk<OfferCard[], string | undefined, Thunk>(
  'data/fetchOfferFavorite',
  async(_, {extra: api}) => {
    const {data} = await api.get<OfferCard[]>(`${ApiRoute.OffersFavorite}`);

    return data;
  }
);

export {fetchOffersFavorite};
