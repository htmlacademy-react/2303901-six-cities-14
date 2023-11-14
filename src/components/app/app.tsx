import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {MainPages} from '../../pages/main-page/main-page';
import {LoginPage} from '../../pages/login-page/login-page';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page';
import {OfferPage} from '../../pages/offer-page/offer-page';
import {ErrorMessage} from '../error-message/error-message';
import {PrivateRoute} from '../private-route/private-route';
import {AppRoute, TitleDescription} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {offersSlice} from '../../store/slices/offers-slice';
import {useEffect} from 'react';
import {LoadingRoute} from '../loading-route/loaging-route';
import {AuthorizationRoute} from '../authorization-route/authorization-route';

function App(): JSX.Element {

  const getOffers = useAppSelector((state) => state.loadOffers.offers);
  const addLoadOffersToState = useAppDispatch();

  useEffect(() => {
    addLoadOffersToState(offersSlice.actions.addOfferList(getOffers));
  }, [addLoadOffersToState, getOffers]);

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
            <PrivateRoute>
              <FavoritesPage title = {TitleDescription.FavoritePage}/>
            </PrivateRoute>
          }
        />
        <Route
          path= {`${AppRoute.Offer}/:offerId`}
          element ={<OfferPage title = {TitleDescription.OfferPage}/>}
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
