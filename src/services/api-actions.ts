import type {Thunk} from './type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
// import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute, AppRoute, AuthorizationStatus, ERROR_NOT_OFFER, TIMEOUT_SHOW_ERROR} from '../const';
import {authStatusSlice} from '../store/slices/auth-status-slice';
import {dropToken, saveToken} from './token';
import type {UserDataLogin, AuthData} from '../types/types';
import {setErrorSlice} from '../store/slices/set-error-slice';
import {store} from '../store';
import {offerSlice} from '../store/slices/offer-slice';
import type {OfferPage} from '../types/type-store';
import type {OfferCard} from '../types/type-store';
import {dataUserSlice} from '../store/slices/data-user-slice';
import type {User} from './type-service';
import {loadOffersNearSlice} from '../store/slices/load-offer-near-slice';
import type {Comment} from '../types/type-store';
import {loadCommentsSlice} from '../store/slices/load-comments-slice';
import {errorOfferSlice} from '../store/slices/error-offer-slice';
import {sendCommentsSlice} from '../store/slices/send-comment-slice';
import {offersFavoriteSlice} from '../store/slices/load-offers-favorite';
import type {FavoriteStatus} from './type-service';
import { offersSlice } from '../store/slices/offers-slice';
import { redirectToRoute } from '../components/history-browser/action-main-page';


const fetchOffersAction = createAsyncThunk<void, undefined, Thunk>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    dispatch(offersSlice.actions.addOfferList(data));
  },
);

const fetchOfferAction = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {

    try{
      const {data} = await api.get<OfferPage>(`${ApiRoute.Offers}/${id}`);

      dispatch(offerSlice.actions.addLoadOffer(data));
      dispatch(errorOfferSlice.actions.addErrorOffer(''));
    } catch {
      dispatch(errorOfferSlice.actions.addErrorOffer(ERROR_NOT_OFFER));
    }
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

const checkAuthAction = createAsyncThunk<void, undefined, Thunk>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>(ApiRoute.Login);

    dispatch(dataUserSlice.actions.addUserData(data));

    try {
      await api.get(ApiRoute.Login);
      dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

const loginAction = createAsyncThunk<void, AuthData, Thunk>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}, data} = await api.post<UserDataLogin | User>(ApiRoute.Login, {email, password});


    dispatch(dataUserSlice.actions.addUserData(data as User));

    saveToken(token);

    dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.Auth));

    //dispatch(redirectToRoute(AppRoute.Main));
  },
);


const logoutAction = createAsyncThunk<void, undefined, Thunk>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {

    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.NoAuth));
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
  fetchOfferAction,
  fetchOffersNear,
  fetchComments,
  fetchOffersFavorite,
  sendFavoriteOffer ,
  checkAuthAction,
  loginAction,
  logoutAction,
  clearErrorAction,
  sendComment
};
