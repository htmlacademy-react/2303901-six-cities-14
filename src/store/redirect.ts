import {PayloadAction} from '@reduxjs/toolkit';
import { browserHistory } from '../history-browser';
import {Middleware} from 'redux';
import {reducer} from '.';


type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'game/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
