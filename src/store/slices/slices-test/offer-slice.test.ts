import {offer} from '../../../mock/offer/offer';
import {offerSlice} from '../offer-slice';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offer: offer,
      error: '',
      loading: false,
      offerCard: offer,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offer: null,
      error: null,
      loading: null,
      offerCard: null,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
