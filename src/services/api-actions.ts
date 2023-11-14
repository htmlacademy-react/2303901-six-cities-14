import type {Thunk} from './type-service';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute, AuthorizationStatus, ERROR_NOT_OFFER, TIMEOUT_SHOW_ERROR} from '../const';
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

const fetchOffersAction = createAsyncThunk<void, undefined, Thunk>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    dispatch(loadOffersSlice.actions.addLoadOffers(data));
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

const fetchComments = createAsyncThunk<void, string | undefined, Thunk>(
  'data/fetchComment',
  async (id, {dispatch, extra: api}) => {

    const {data} = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);

    dispatch(loadCommentsSlice.actions.addLoadComments(data));
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
  checkAuthAction,
  loginAction,
  logoutAction,
  clearErrorAction,
};
