import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPages from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorMessage from '../error-message/error-message';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus, TitleDescription} from '../../const';
import type {Offers} from '../../mock/offers/offer-mocks';

type AppOfferProps = {
  CountOffers: number;
  offerProps: Offers;
}


function App({CountOffers: countOffers, offerProps: offers}: AppOfferProps,): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element ={<MainPages CountOffers = {countOffers} title = {TitleDescription.MainPage} offers = {offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element ={<LoginPage title = {TitleDescription.LoginPage}/>}
        />
        <Route
          path={AppRoute.Favorites}
          element ={
            <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
              <FavoritesPage title = {TitleDescription.FavoritePage} offers = {offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element ={<OfferPage title = {TitleDescription.OfferPage} offers = {offers}/>}
        />
        <Route
          path={AppRoute.Error}
          element ={<ErrorMessage title = {TitleDescription.ErrorPage}/>}
        />
        <Route
          path="*"
          element={<ErrorMessage title = {TitleDescription.ErrorPage}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
