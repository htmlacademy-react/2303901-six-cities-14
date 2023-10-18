const Offers = {
  CountOffers: 5,
};

 enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
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

export {Offers, AppRoute, AuthorizationStatus, TitleDescription};

