import {sendCommentsSlice} from '../send-comment-slice';

describe('send comment slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      comment: null,
      error: '',
      isLoading: false
    };

    const result = sendCommentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      comment: null,
      error: false,
      isLoading: false
    };

    const result = sendCommentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
