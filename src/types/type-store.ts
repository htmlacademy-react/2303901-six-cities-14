import {store} from '../store/index';
import type {Offers} from '../mock/offers/offer-mocks';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type StateSortOffers = {
  sortOffers: Offers;
}

type StateFilterOffers = {
  filterOffers: Offers;
}

type StateLoadOffers = {
  offers: Offers;
}

type StateAuth = {
  authStatus: string;
};

type StateError = {
  error: string | null;
}

export type {
  State,
  AppDispatch,
  StateSortOffers,
  StateFilterOffers,
  StateLoadOffers,
  StateAuth,
  StateError
};
