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
  id: number;
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

type CityLocationDefault = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

type DefaultCityType = {
  [key: string]: CityLocationDefault;
}

type AuthData = {
  login: string;
  password: string;
};

type UserData = {
  id: number;
  email: string;
  token: string;
};

export type {
  CityLocation,
  PointOfferLocation,
  IconToMap,
  Review,
  Reviews,
  DefaultCityType,
  CityLocationDefault,
  AuthData,
  UserData
};
