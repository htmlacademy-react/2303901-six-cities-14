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

export type {CityLocation, PointOfferLocation, IconToMap};
