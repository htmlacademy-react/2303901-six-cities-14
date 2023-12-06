import {Sort} from '../../../const';
import {offersSlice} from '../offers-slice';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: null,
      loadingStatus: null,
      error: null,
      offersFilter:[],
      changeOffers: [],
      statusSort : Sort.Popular
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: null,
      loadingStatus: null,
      error: null,
      offersFilter:[],
      changeOffers: [],
      statusSort : Sort.Popular
    };
    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

