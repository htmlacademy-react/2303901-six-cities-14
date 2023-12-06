import {render, screen} from '@testing-library/react';
import {OffersListNear} from './offers-list-near';
import {offersMock} from '../../mock/offers/offer-mocks';
import {offer} from '../../mock/offer/offer';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';

describe('Component: offers list near', () => {
  it('should render correctly', () => {
    const expectedText = 'Other places in the';

    render(
      <Provider store={store}>
        <Router>
          <OffersListNear points={offersMock} point={offer}/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
