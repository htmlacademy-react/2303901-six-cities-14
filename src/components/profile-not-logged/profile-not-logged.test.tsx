import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import {ProfileNotLoggedComponent} from './profile-not-logged';

describe('Component: right-section', () => {
  it('should render correctly', () => {
    const expectedText = 'Sign in';

    render(
      <Provider store={store}>
        <Router>
          <ProfileNotLoggedComponent/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
