const DEFAULT_CITY = 'Paris';
const URL_SERVER = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const DEFAULT_VALUE_NULL = 0;
const ENDING = 2;
const MAX_LENGTH_REVIEW = 10;
const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';
const MAX_LENGTH_OFFERS_NEAR = 3;
const MAX_LENGTH_OFFER_PHOTO = 6;
const MAX_LENGTH_POINT_NEAR = 3;
const RENAME_WORD = 1;

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

const MONTH_NAMES = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

const OPTIONS = [
  {label: 'perfect', value: 5},
  {label: 'good', value: 4},
  {label: 'not bad', value: 3},
  {label: 'badly', value: 2},
  {label: 'terribly', value: 1},
];

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
 Comments = '/comments',
 Login = '/login',
 Logout = '/logout'
}

const City = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

const CITIES_FOR_FILTER = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

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
} as const;

const LengthComment = {
  Min: 50,
  Max: 300
} as const;

const SettingLogoHeader = {
  ClassName: 'header',
  Width: 81,
  Height: 41,
} as const;

const SettingLogoFooter = {
  ClassName: 'footer',
  Width: 64,
  Height: 33,
} as const;

const SettingFavoriteCard = {
  ClassName: 'favorites',
  Width: 150,
  Height: 110,
} as const;

const SettingCardCities = {
  ClassName: 'cities',
  Width: 260,
  Height: 200,
} as const;

const SettingFavoriteButtonOfferPage = {
  ClassName: 'offer__bookmark-button',
  Width: 31,
  Height: 33,
} as const;

const SettingFavoriteButtonCard = {
  ClassName: 'place-card__bookmark-button',
  Width: 18,
  Height: 19,
} as const;

const StatusFavoriteToServer = {
  Favorite: 1,
  NoFavorite: 0,
} as const;

const Sort = {
  Popular: 'Popular',
  LowToHight: 'low to high',
  HighToLow: 'high to low',
  TopRatedFirst: 'Top rated first'
} as const;

export {
  AppRoute,
  AuthorizationStatus,
  TitleDescription,
  ApiRoute,
  URL_MARKER_DEFAULT,
  City,
  CITIES_FOR_FILTER,
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
  ENDING,
  SettingLogoHeader,
  SettingLogoFooter,
  SettingFavoriteCard,
  SettingCardCities,
  SettingFavoriteButtonOfferPage,
  SettingFavoriteButtonCard,
  StatusFavoriteToServer,
  DEFAULT_VALUE_NULL,
  MAX_LENGTH_OFFERS_NEAR,
  MAX_LENGTH_OFFER_PHOTO,
  MAX_LENGTH_POINT_NEAR,
  OPTIONS,
  RENAME_WORD,
  Sort
};
