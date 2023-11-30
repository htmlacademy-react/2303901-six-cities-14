import {loadCommentsSlice} from '../load-comments-slice';

describe('load comment slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      comments: null,
      error: null,
      isLoading: false
    };

    const result = loadCommentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      comments: null,
      error: null,
      isLoading: false
    };

    const result = loadCommentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
