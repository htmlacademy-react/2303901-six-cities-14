import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import {ListOffers} from './list-offers';

describe('Component: list offers', () => {
  it('should render correctly', () => {
    const expectedText = 'list offers';

    render(
      <Provider store={store}>
        <Router>
          <ListOffers/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
