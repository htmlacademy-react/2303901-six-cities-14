import {createSlice} from '@reduxjs/toolkit';
import type {StateError} from '../../types/type-store';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: StateError = {
  error: null
};

const setErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action:PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export {setErrorSlice};
