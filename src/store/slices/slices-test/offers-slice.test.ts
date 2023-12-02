import {offersMock, offersMockChange} from '../../../mock/offers/offer-mocks';
import {offersSlice} from '../offers-slice';


describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: offersMock,
      loadingStatus: true,
      error: ''
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      offers: null,
      loadingStatus: null,
      error: null
    };
    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should toggle favorite status for a specific offer', () => {
    const initialState = {
      offers: offersMock,
      loadingStatus: true,
      error: '',
    };

    const expectedState = {
      offers: offersMockChange,
      loadingStatus: true,
      error: '',
    };

    const result = offersSlice.reducer(initialState, offersSlice.actions.changeFavoriteStatus('45534534'));

    expect(result).toEqual(expectedState);
  });

  it('should do nothing if the offer with the specified id is not found', () => {
    const initialState = {
      offers: offersMock,
      loadingStatus: true,
      error: '',
    };

    const action = offersSlice.actions.changeFavoriteStatus('nonexistentId');
    const result = offersSlice.reducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});

