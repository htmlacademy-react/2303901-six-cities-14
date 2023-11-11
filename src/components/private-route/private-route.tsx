import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}

function PrivateRoute ({authorizationStatus, children}: PrivateRouteProps): JSX.Element {

  return (
    AuthorizationStatus.Auth.toString() === authorizationStatus ?
      children : <Navigate to={AppRoute.Login} />
  );
}

export {PrivateRoute};
