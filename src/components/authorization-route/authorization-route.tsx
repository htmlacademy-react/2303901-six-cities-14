import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/use-store';

type AuthorizationRouteProps = {
  children: JSX.Element;
}

function AuthorizationRoute ({children}: AuthorizationRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  return authStatus === AuthorizationStatus.Auth.toString() ? <Navigate to={AppRoute.Main}/> : children;
}

export {AuthorizationRoute};
