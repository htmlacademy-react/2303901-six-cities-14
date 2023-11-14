import {createSlice} from '@reduxjs/toolkit';
import type {Comment,StateComment} from '../../types/type-store';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: StateComment = {
  comments: null
};

const sendCommentsSlice = createSlice({
  name: 'loadComment',
  initialState,
  reducers: {
    addLoadComment(state, action: PayloadAction<Comment>) {

      state.comments = action.payload;
    }
  }
});

export {sendCommentsSlice};
