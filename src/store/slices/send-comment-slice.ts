import {createSlice} from '@reduxjs/toolkit';
import type {Comment,StateComment} from '../../types/type-store';
import type {PayloadAction} from '@reduxjs/toolkit';
import {sendComment} from '../../services/thunk/send-comment';

const initialState: StateComment = {
  comment: null,
  error: false,
  isLoading: false
};

const sendCommentsSlice = createSlice({
  name: 'loadComment',
  initialState,
  reducers: {
    addErrorStatus(state, action: PayloadAction<string | false>) {
      state.error = action.payload;
    }
  },
  extraReducers (builder) {
    builder
      .addCase(sendComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comment = action.payload;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(sendComment.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.isLoading = false;
      })
      .addCase(sendComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      });
  },
});

export {sendCommentsSlice};
