import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import {FilterCities} from './filter-cities';

describe('Component: filter city', () => {
  it('should render correctly', () => {
    const expectedText = 'filterCities';

    render(
      <Provider store={store}>
        <Router>
          <FilterCities/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
