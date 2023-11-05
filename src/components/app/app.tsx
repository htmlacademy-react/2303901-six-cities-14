import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPages from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorMessage from '../error-message/error-message';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus, TitleDescription} from '../../const';
import type {StateOffers} from '../../types/type-store';
import type {Reviews} from '../../types/types';
import {useSelector} from 'react-redux';

type AppOfferProps = {
  reviewProps: Reviews;
}

function App({reviewProps}: AppOfferProps,): JSX.Element {

  const stateOffers = useSelector((state: StateOffers) => state.offers.offers);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}`}
          element ={<MainPages title = {TitleDescription.MainPage} offers = {stateOffers}/>}
        />
        <Route
          path={AppRoute.Login}
          element ={<LoginPage title = {TitleDescription.LoginPage}/>}
        />
        <Route
          path={AppRoute.Favorites}
          element ={
            <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
              <FavoritesPage title = {TitleDescription.FavoritePage} offers = {stateOffers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element ={<OfferPage title = {TitleDescription.OfferPage} offers = {stateOffers} reviewProps = {reviewProps}/>}
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
