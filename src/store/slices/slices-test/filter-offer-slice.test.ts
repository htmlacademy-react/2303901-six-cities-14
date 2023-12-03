import {filterOffersSlice} from '../filter-offer-slice';

describe('filter offer slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {filterOffers: []};
    const result = filterOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};
    const expectedState = {filterOffers: []};
    const result = filterOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
