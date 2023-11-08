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

export type {
  State,
  AppDispatch,
  StateSortOffers,
  StateFilterOffers,
};
