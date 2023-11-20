import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Thunk} from '../type-service';
import {ApiRoute} from '../../const';
import type {OfferPage} from '../../types/type-store';

const fetchOfferAction = createAsyncThunk<OfferPage, string | undefined, Thunk>(
  'data/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferPage>(`${ApiRoute.Offers}/${id}`);

    return data;
  }
);

export {fetchOfferAction};
