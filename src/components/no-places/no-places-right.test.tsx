import {render, screen} from '@testing-library/react';
import {NoPlacesRightComponent} from './no-places-right';

describe('Component: right-section', () => {
  it('should render correctly', () => {
    const expectedText = 'right-section';

    render(
      <NoPlacesRightComponent/>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
