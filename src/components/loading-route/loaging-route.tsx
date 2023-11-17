import {useAppSelector} from '../../hooks/use-store';
import {LoadingComponent} from '../loading-component/loading-component';

function LoadingRoute ({children}: {children: JSX.Element}) {
  const stateLoad = useAppSelector((state) => state.offers.offers);

  return stateLoad.length === 0 ? <LoadingComponent /> : children;

}

export {LoadingRoute};
