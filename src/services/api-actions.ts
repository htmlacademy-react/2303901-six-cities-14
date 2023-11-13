import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadOffersSlice} from '../store/slices/load-offers-slice';
import {ApiRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import type {State} from '../types/type-store';
import type {AppDispatch} from '../types/type-store';
import {authStatusSlice} from '../store/slices/auth-status-slice';
import {dropToken, saveToken} from './token';
import type {UserData, AuthData} from '../types/types';
import {setErrorSlice} from '../store/slices/set-error-slice';
import {store} from '../store';
import {offerSlice} from '../store/slices/offer-slice';
import type {OfferPage} from '../types/type-store';
import type { OfferCard } from '../types/type-store';

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    dispatch(loadOffersSlice.actions.addLoadOffers(data));
  },
);

const fetchOfferAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPage>(`${ApiRoute.Offers}/${id}`);

    dispatch(offerSlice.actions.addLoadOffer(data));
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRoute.Login, {email, password});

    saveToken(token);
    dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.Auth));

  },
);


const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
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

export {fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction, fetchOfferAction};
