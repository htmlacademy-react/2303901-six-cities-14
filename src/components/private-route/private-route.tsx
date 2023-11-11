import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import { useAppSelector } from '../../hooks/use-store';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute ({ children}: PrivateRouteProps): JSX.Element {

  const getAuthStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

  return (
    AuthorizationStatus.Auth.toString() === getAuthStatus ?
      children : <Navigate to={AppRoute.Login} />
  );
}

export {PrivateRoute};
