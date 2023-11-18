import type {Thunk} from './type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
// import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {setErrorSlice} from '../store/slices/set-error-slice';
import {store} from '../store';
import type {OfferCard} from '../types/type-store';
import {loadOffersNearSlice} from '../store/slices/load-offer-near-slice';
import type {Comment} from '../types/type-store';
import {loadCommentsSlice} from '../store/slices/load-comments-slice';
import {sendCommentsSlice} from '../store/slices/send-comment-slice';
import {offersFavoriteSlice} from '../store/slices/load-offers-favorite';
import type {FavoriteStatus} from './type-service';
import { offersSlice } from '../store/slices/offers-slice';

const fetchOffersAction = createAsyncThunk<void, undefined, Thunk>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    dispatch(offersSlice.actions.addOfferList(data));
  },
);

const fetchOffersNear = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchOfferNear',
  async (id, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(`${ApiRoute.Offers}/${id}/nearby`);

    dispatch(loadOffersNearSlice.actions.addLoadOffers(data));
  },
);

const fetchOffersFavorite = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchOfferFavorite',
  async(_, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(`${ApiRoute.OffersFavorite}`);

    dispatch(offersFavoriteSlice.actions.addFavoriteOffers(data));
  }
);

const sendFavoriteOffer = createAsyncThunk<void, FavoriteStatus , Thunk>(
  'sendFavoriteOffer',
  async ({id, status}, {dispatch, extra: api}) => {

    const {data} = await api.post<OfferCard>(`${ApiRoute.OffersFavorite}/${id}/${status}`);

    dispatch(offersFavoriteSlice.actions.sendFavoriteStatus(data));
  },
);

const fetchComments = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchComment',
  async (id, {dispatch, extra: api}) => {

    const {data} = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);

    dispatch(loadCommentsSlice.actions.addLoadComments(data));
  },
);

type SendComment = {
  id: string | undefined;
  comment: string;
  rating: number;
}


const sendComment = createAsyncThunk<void, SendComment, Thunk>(
  'data/sendComment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {

    const {data} = await api.post<Comment>(`${ApiRoute.Comments}/${id}`, {comment, rating});

    dispatch(sendCommentsSlice.actions.addLoadComment(data));
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
  fetchOffersAction,
  fetchOffersNear,
  fetchComments,
  fetchOffersFavorite,
  sendFavoriteOffer ,
  clearErrorAction,
  sendComment
};
