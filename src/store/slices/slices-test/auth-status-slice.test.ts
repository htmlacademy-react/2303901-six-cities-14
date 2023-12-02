import { AuthorizationStatus } from '../../../const';
import { authStatusSlice } from '../auth-status-slice';

describe('auth status slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      error: null,
      isLoading: false
    };

    const result = authStatusSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      authStatus: AuthorizationStatus.Unknown,
      error: null,
      isLoading: false
    };

    const result = authStatusSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
