import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import { FavoriteCardComponents } from './favorite-cards-component';
import { offersMock } from '../../mock/offers/offer-mocks';

describe('Component: EmptyFavorites', () => {
  it('should render correctly', () => {
    const expectedText = 'Saved listing';

    render(
      <Provider store={store}>
        <Router>
          <FavoriteCardComponents offers={offersMock} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
