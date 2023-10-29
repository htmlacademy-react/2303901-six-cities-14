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


export {
  AppRoute,
  AuthorizationStatus,
  TitleDescription,
  URL_MARKER_DEFAULT,
  URL_MARKER_CURRENT,
  Cities,
  CitiesForFilter
};

