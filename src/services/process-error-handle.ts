import {setErrorSlice} from '../store/slices/set-error-slice';
import {store} from '../store';

const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorSlice.actions.setError(message));
};

export {processErrorHandle};
