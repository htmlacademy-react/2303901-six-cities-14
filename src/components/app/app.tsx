import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPages} from '../../pages/main-page/main-page';
import {LoginPage} from '../../pages/login-page/login-page';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page';
import {OfferPage} from '../../pages/offer-page/offer-page';
import {ErrorMessage} from '../error-message/error-message';
import {AppRoute, TitleDescription} from '../../const';
import {AuthorizationRoute} from '../authorization-route/authorization-route';
import {useAppDispatch} from '../../hooks/use-store';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';
import {checkAuthAction} from '../../services/thunk/check-auth-action';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  dispatch(fetchOffersAction());
  dispatch(checkAuthAction());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}`}
          element ={
            <MainPages title = {TitleDescription.MainPage}/>
          }
        />
        <Route
          path={AppRoute.Login}
          element ={
            <AuthorizationRoute>
              <LoginPage title = {TitleDescription.LoginPage}/>
            </AuthorizationRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element ={
            <FavoritesPage title = {TitleDescription.FavoritePage}/>
          }
        />
        <Route
          path= { `${AppRoute.Offer}/:offerId`}
          element={
            <OfferPage title = {TitleDescription.OfferPage}/>
          }
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

export {App};
