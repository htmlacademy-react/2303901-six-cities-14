
import {setErrorSlice} from '../store/slices/set-error-slice';
//import {clearErrorAction} from './api-actions';
import {store} from '../store';

const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorSlice.actions.setError(message));
  //store.dispatch(clearErrorAction());
};

export {processErrorHandle};
