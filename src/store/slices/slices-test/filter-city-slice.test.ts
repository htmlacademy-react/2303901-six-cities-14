import {DEFAULT_CITY} from '../../../const';
import {filterCitySlice} from '../filter-city-slice';

describe('filter city slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};

    const expectedState = {city: DEFAULT_CITY};

    const result = filterCitySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = {type: ''};

    const expectedState = {city: DEFAULT_CITY};

    const result = filterCitySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
