import store from '../store/indexes/index';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type CurrentCity = {
  currentCity: string;
}

export type {State, AppDispatch, CurrentCity};
