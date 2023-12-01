import {createSlice} from '@reduxjs/toolkit';
import type {StateComments} from '../../types/type-store';
import {fetchComments} from '../../services/thunk/fetch-comments';

const initialState: StateComments = {
  comments: null,
  error: null,
  isLoading: false
};

const loadCommentsSlice = createSlice({
  name: 'loadComments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.isLoading = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export {loadCommentsSlice};
