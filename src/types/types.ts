type CityLocation = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
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

export type {CityLocation, PointOfferLocation, IconToMap, Review, Reviews};
