import {render, screen} from '@testing-library/react';
import {EmptyFavoriteCardsComponent} from './empty-favorite-cards-component';

describe('Component:EmptyFavoriteCards', () => {
  it('should render correctly',() => {
    const expectedText = /Nothing yet saved/i;

    render(<EmptyFavoriteCardsComponent/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
