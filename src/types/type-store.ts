import {store} from '../store/index';
import type {Offers} from '../mock/offers/offer-mocks';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type StateOffers = {
  offers: {
    offers: Offers;
  };
}

type StateFilterCity = {
  filterCity: {
    city: string;
  };
}

type StateSortOffers = {
  sortOffers: Offers | null;
}

type StateFilterOffers = {
  filterOffers: Offers | null;
}

type StateOffersFilter = {
  filterOffers: {
    filterOffers: Offers;
  };
}

type StateOffersSort = {
  sortOffers: {
    sortOffers: Offers;
  };
}

export type {
  State,
  AppDispatch,
  StateOffers,
  StateFilterCity,
  StateSortOffers,
  StateFilterOffers,
  StateOffersSort,
  StateOffersFilter
};
