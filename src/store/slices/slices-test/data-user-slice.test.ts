import { dataUserSlice } from '../data-user-slice';

describe('data user slice ', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      data: {
        name: '',
        avatarUrl: '',
        isPro: false,
        email: '',
        token: '',
      }
    };

    const result = dataUserSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const expectedState = {
      data: {
        name: '',
        avatarUrl: '',
        isPro: false,
        email: '',
        token: '',
      }
    };
    const result = dataUserSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
