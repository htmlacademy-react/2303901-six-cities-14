 enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Error = '/error'
}

 enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum TitleDescription {
  MainPage = '6 cities',
  LoginPage = '6 cities: authorization',
  FavoritePage = '6 cities: favorites',
  OfferPage = '6 cities: offer',
  ErrorPage = '6 cities: error'
}

enum ApiRoute {
 Offers = '/offers',
 OffersFavorite = '/favorite',
 Comments = '/comments/',
 Login = '/login',
 Logout = '/logout'
}

const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

const CitiesForFilter = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

const CURRENT_ICON = {
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
};

const DEFAULT_ICON = {
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
};

const DEFAULT_DESCRIPTION = {
  title: 'Paris',
  lat: 52.37454,
  lng: 4.897976,
  zoom: 13,
};


const DefaultCityToMap = {
  Paris: {
    title: 'Paris',
    lat: 48.85661,
    lng: 2.351499,
    zoom: 13,
  },

  Cologne: {
    title: 'Cologne',
    lat: 50.938361,
    lng: 6.959974,
    zoom: 13,
  },

  Dusseldorf: {
    title: 'Dusseldorf',
    lat: 51.225402,
    lng: 6.776314,
    zoom: 13
  },

  Amsterdam: {
    title: 'Amsterdam',
    lat: 52.37454,
    lng: 4.897976,
    zoom: 13
  },

  Brussels: {
    title: 'Brussels',
    lat: 50.846557,
    lng: 4.351697,
    zoom: 13
  },

  Hamburg: {
    title: 'Hamburg',
    lat: 53.550341,
    lng: 10.000654,
    zoom: 13
  },

};

const LengthComment = {
  MIN: 50,
  MAX: 300
};

const MAX_LENGTH_REVIEW = 10;

const MONTH_NAMES = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

const DEFAULT_CITY = 'Paris';
const URL_SERVER = 'https://14.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';


export {
  AppRoute,
  AuthorizationStatus,
  TitleDescription,
  ApiRoute,
  URL_MARKER_DEFAULT,
  Cities,
  CitiesForFilter,
  DEFAULT_DESCRIPTION,
  CURRENT_ICON,
  DEFAULT_ICON,
  LengthComment,
  MAX_LENGTH_REVIEW,
  MONTH_NAMES,
  DefaultCityToMap,
  DEFAULT_CITY,
  URL_SERVER,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,

};

