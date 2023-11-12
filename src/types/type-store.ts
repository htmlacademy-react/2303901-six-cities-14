import {store} from '../store/index';
import type {Offers} from '../mock/offers/offer-mocks';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type CityLocation ={
  latitude: number;
  longitude: number;
  zoom: number;
};

type OfferCity = {
  name: string;
  location: CityLocation;
};

type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
  };


type OfferHost = {
name: string;
avatarUrl: string;
isPro: boolean;
};

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: OfferHost;
  images: [string];
  maxAdults: number;
  };


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

type StateOffer = {
  offer: Offer;
}

export type {
  State,
  AppDispatch,
  StateSortOffers,
  StateFilterOffers,
  StateLoadOffers,
  StateAuth,
  StateError,
  Offer,
  StateOffer
};
