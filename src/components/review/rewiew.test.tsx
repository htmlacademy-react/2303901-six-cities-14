import {render, screen} from '@testing-library/react';
import {reviewMock} from '../../mock/review-mocks/review-mocks';
import {Review} from './review';

describe('Component: review', () => {
  it('should render correctly', () => {
    const expectedText = 'review';

    render(
      <Review reviewProps={reviewMock}/>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
