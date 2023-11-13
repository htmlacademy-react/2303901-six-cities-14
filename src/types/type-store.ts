import {store} from '../store/index';

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

type OfferPage = {
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

type OfferCard = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

type StateSortOffers = {
  sortOffers: OfferCard[];
}

type StateFilterOffers = {
  filterOffers: OfferCard[];
}

type StateLoadOffers = {
  offers: OfferCard[];
}

type StateAuth = {
  authStatus: string;
};

type StateError = {
  error: string | null;
}

type StateOffer = {
  offer: OfferPage | null;
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
  StateError,
  OfferPage,
  StateOffer,
  OfferCard
};
