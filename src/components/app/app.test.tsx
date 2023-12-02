
import { render, waitFor, screen } from '@testing-library/react';
import { App } from './app';
import { store } from '../../store';
import { Provider } from 'react-redux';
import {MemoryHistory, createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page';
import {BrowserRouter as Router} from 'react-router-dom';
import {LoginPage} from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { ErrorMessage } from '../error-message/error-message';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPages" when user navigates to "/"', () => {
    const expectData = 'main-page';
    const expectedText = 'Cities';

    mockHistory.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectData)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });

  it('should render "FavoritesPages" when user navigates to "/favorites"', () => {
    const expectData = 'favorites-page';

    mockHistory.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <Router>
          <FavoritesPage title={AppRoute.Favorites}/>
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectData)).toBeInTheDocument();
    });
  });

  it('should render "LoginPages" when user navigates to "/login"', () => {
    const expectText = 'Sign in';

    mockHistory.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <Router>
          <LoginPage title={AppRoute.Login}/>
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render "OfferPages" when user navigates to "/offer"', () => {
    const expectText = 'What &prime s inside';

    mockHistory.push(AppRoute.Offer);

    render(
      <Provider store={store}>
        <Router>
          <OfferPage title={AppRoute.Offer}/>
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render "ErrorPages" when user navigates to "/error"', () => {
    const expectText = '404 Not Found';

    mockHistory.push(AppRoute.Error);

    render(
      <Provider store={store}>
        <Router>
          <ErrorMessage title={AppRoute.Error}/>
        </Router>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });
});
