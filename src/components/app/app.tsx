import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPages from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorMessage from '../error-message/error-message';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus, TitleDescription} from '../../const';
import type {Offers} from '../../mock/offers/offer-mocks';
import type {Reviews} from '../../types/types';


type AppOfferProps = {
  offerProps: Offers;
  reviewProps: Reviews;
}

function App({ offerProps: offers, reviewProps}: AppOfferProps,): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}`}
          element ={<MainPages title = {TitleDescription.MainPage} offers = {offers}/>}
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
          element ={<OfferPage title = {TitleDescription.OfferPage} offers = {offers} reviewProps = {reviewProps}/>}
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
