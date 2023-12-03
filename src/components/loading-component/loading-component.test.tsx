import {render, screen} from '@testing-library/react';
import {LoadingComponent} from './loading-component';

describe('Component: Loading Screen', () => {
  it('should render correctly',() => {
    const expectedText = /Loading/i;

    render(<LoadingComponent/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

