import {loadOffersNearSlice} from '../load-offer-near-slice';

describe('load offer near slice', () =>{
  it('should return initial state with empty action', () =>{
    const emptyAction = {type: ''};

    const expectedState = {
      offers: []
    };

    const result = loadOffersNearSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () =>{
    const emptyAction = {type: ''};

    const expectedState = {
      offers: []
    };

    const result = loadOffersNearSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
