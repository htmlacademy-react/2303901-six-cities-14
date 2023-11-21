import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPages} from '../../pages/main-page/main-page';
import {LoginPage} from '../../pages/login-page/login-page';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page';
import {OfferPage} from '../../pages/offer-page/offer-page';
import {ErrorMessage} from '../error-message/error-message';
//import {PrivateRoute} from '../private-route/private-route';
import {AppRoute, TitleDescription} from '../../const';
import {LoadingRoute} from '../loading-route/loaging-route';
import {AuthorizationRoute} from '../authorization-route/authorization-route';
//import HistoryRouter from '../history-browser/history-router';
//import {browserHistory} from '../../history-browser';


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}`}
          element ={
            <LoadingRoute>
              <MainPages title = {TitleDescription.MainPage}/>
            </LoadingRoute>
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
