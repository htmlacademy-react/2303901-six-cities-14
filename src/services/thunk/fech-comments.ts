import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Thunk} from '../type-service';
import {ApiRoute} from '../../const';
import type {Comment} from '../../types/type-store';

const fetchComments = createAsyncThunk<Comment[], string | undefined, Thunk>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  },
);

export {fetchComments};
