import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Thunk} from '../type-service';
import {ApiRoute} from '../../const';
import type {Comment} from '../../types/type-store';

type SendComment = {
  id: string | undefined;
  comment: string;
  rating: number;
}

const sendComment = createAsyncThunk<Comment, SendComment, Thunk>(
  'data/sendComment',
  async ({id, comment, rating}, {extra: api}) => {

    const {data} = await api.post<Comment>(`${ApiRoute.Comments}/${id}`, {comment, rating});

    return data;
  },
);

export {sendComment};
