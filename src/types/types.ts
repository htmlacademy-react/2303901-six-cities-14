type CityLocation = {
  title: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  zoom: number | undefined;
};

type PointOfferLocation = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
  id: string;
}

type IconToMap = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
}

type ReviewUser ={
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}


type Review = {
  id: number;
  user: ReviewUser;
  rating: number;
  comment: string;
  date: string;
}

type Reviews = Review[];


type DefaultCityType = {
  [key: string]: CityLocation;
}

export type {CityLocation, PointOfferLocation, IconToMap, Review, Reviews, DefaultCityType};
