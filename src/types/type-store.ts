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

export type {State, AppDispatch, StateOffers, StateFilterCity};
