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
  goods: string[];
  host: OfferHost;
  images: string[];
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

type Comment = {
  id: string;
  date: string;
  user: OfferHost;
  comment: string;
  rating: number;
  }

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
  error: string | null;
  isLoadingAuth: boolean;
  isLoadingLogout: boolean;
};

type StateOffer = {
  offer: OfferPage | null;
  error: string | null;
  loading: boolean | null;
  offerCard: OfferCard | null | OfferPage ;
}

type StateComments = {
  comments: Comment[] | null;
  error: string | null;
  isLoading: boolean | null;
}

type StateComment = {
  comment: Comment | null;
  error: string | false;
  isLoading: boolean;
}

export type {
  State,
  AppDispatch,
  StateSortOffers,
  StateFilterOffers,
  StateLoadOffers,
  StateAuth,
  OfferPage,
  Comment,
  StateOffer,
  OfferCard,
  StateComments,
  StateComment
};
