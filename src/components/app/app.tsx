import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPages from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorMessage from '../error-message/error-message';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';

type AppOfferProps = {
  CountOffers: number;
}

function App({CountOffers: countOffers}: AppOfferProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element ={<MainPages CountOffers = {countOffers}/>}
        />
        <Route
          path={AppRoute.Login}
          element ={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element ={
            <PrivateRoute authorizationStatus = {AuthorizationStatus.NoAuth}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element ={<OfferPage/>}
        />
        <Route
          path={AppRoute.Error}
          element ={<ErrorMessage/>}
        />
        <Route
          path="*"
          element={<ErrorMessage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
