import { AppRoute } from '../../const';
import {createAction} from '@reduxjs/toolkit';

const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');


export {redirectToRoute};
