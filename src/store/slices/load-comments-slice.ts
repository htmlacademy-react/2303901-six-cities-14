import {createSlice} from '@reduxjs/toolkit';
import type {Comment,StateComments} from '../../types/type-store';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: StateComments = {
  comments: null
};

const loadCommentsSlice = createSlice({
  name: 'loadComments',
  initialState,
  reducers: {
    addLoadComments(state, action: PayloadAction<Comment[]>) {

      state.comments = action.payload;
    }
  }
});

export {loadCommentsSlice};
