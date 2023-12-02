import {offersFavoriteSlice} from '../load-offers-favorite';

describe('load offers favorite slice', () =>{
  it('should return initial state with empty action', () =>{
    const emptyAction = {type: ''};

    const expectedState = {
      offers: [],
      status: {
        id: '',
        status: 0,
      },
      loading: false,
      error: false
    };

    const result = offersFavoriteSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () =>{
    const emptyAction = {type: ''};

    const expectedState = {
      offers: [],
      status: {
        id: '',
        status: 0,
      },
      loading: false,
      error: false
    };

    const result = offersFavoriteSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
