
import { Navigate } from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-store';
import {LoadingComponent} from '../loading-component/loading-component';
import { AppRoute, AuthorizationStatus } from '../../const';


function LoadingRoute ({children}: {children: JSX.Element}) {

  const stateLoad = useAppSelector((state) => state.offers.offers);
  const auth = useAppSelector((state) => state.authorizationStatus.authStatus);

  return stateLoad.length === 0 ? <LoadingComponent /> :   children


  //   return <LoadingComponent />;
  // } else {
  //   if (auth === AuthorizationStatus.Unknown.toString()) {
  //     return <Navigate to={AppRoute.Login} />;
  //   } else {
  //     return children;
  //   }
  // }

}

export {LoadingRoute};
