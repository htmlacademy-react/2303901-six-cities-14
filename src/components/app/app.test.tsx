import {render, waitFor, screen} from '@testing-library/react';
import {App} from './app';
import {store} from '../../store';
import {Provider} from 'react-redux';

describe('Application Routing', () => {
  it('should render "MainPages" when user navigates to "/"', () => {
    const expectData = 'main-page';
    const expectedText = 'Cities';

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

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectData)).toBeInTheDocument();
    });
  });

  it('should render "LoginPages" when user navigates to "/login"', () => {
    const expectText = 'Sign in';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render "OfferPages" when user navigates to "/offer"', () => {
    const expectText = 'What &prime s inside';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render "ErrorPages" when user navigates to "/error"', () => {
    const expectText = '404 Not Found';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });
});
