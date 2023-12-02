import {sortOffersSlice} from '../sort-offers-slice';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      sortOffers: []
    };

    const result = sortOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      sortOffers: []
    };

    const result = sortOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
