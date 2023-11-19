import {createSlice} from '@reduxjs/toolkit';
import type {Comment,StateComment} from '../../types/type-store';
import type {PayloadAction} from '@reduxjs/toolkit';
import { sendComment } from '../../services/thunk/send-comment';

const initialState: StateComment = {
  comment: null,
  error: null,
  isLoading: null
};

const sendCommentsSlice = createSlice({
  name: 'loadComment',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(sendComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comment = action.payload;
      })
      .addCase(sendComment.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(sendComment.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export {sendCommentsSlice};
