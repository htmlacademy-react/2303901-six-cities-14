import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import {LoadingComponent} from '../loading-component/loading-component';

type RedirectProps = {
  children: JSX.Element;
}

function RedirectFavoriteComponent ({children}: RedirectProps) {
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  return AuthorizationStatus.Unknown.toString() === authStatus ? <LoadingComponent/> : children;
}

export {RedirectFavoriteComponent};
