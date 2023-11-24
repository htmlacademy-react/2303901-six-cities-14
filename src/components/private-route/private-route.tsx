// import {Navigate} from 'react-router-dom';
// import {AuthorizationStatus, AppRoute} from '../../const';
// import { useAppSelector } from '../../hooks/use-store';

// type MainRouteProps = {
//   children: JSX.Element;
// }

// function LoginRoute ({children}: MainRouteProps): JSX.Element {

//   const authStatus = useAppSelector((state) => state.authorizationStatus.authStatus);

//   return (
//     AuthorizationStatus.Auth.toString() === authStatus ?
//       children : <Navigate to={AppRoute.Login} />
//   );
// }

// export {LoginRoute};
