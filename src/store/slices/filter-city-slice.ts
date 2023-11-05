import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';

type InitialState = {
  city: string;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
};

const filterCitySlice = createSlice({
  name: 'filterCity',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    }
  },
});

export {filterCitySlice};
