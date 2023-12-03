import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, DEFAULT_VALUE_NULL} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {dataUserSlice} from '../../store/slices/data-user-slice';
import {logoutAction} from '../../services/thunk/logout-action';
import {fetchOffersAction} from '../../services/thunk/fetch-offers';
import {memo} from 'react';
import {LoadingComponent} from '../loading-component/loading-component';
import {authStatusSlice} from '../../store/slices/auth-status-slice';

function ProfileMemo () {
  const statusAuth = useAppSelector((state) => state.authorizationStatus.authStatus);
  const user = useAppSelector((state) => state.userData.data);
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersFavorite.offers);
  const isLoading = useAppSelector((state) => state.authorizationStatus.isLoading);
  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  function handleClickButtonOut () {
    dispatch(authStatusSlice.actions.addUserStatus(AuthorizationStatus.NoAuth));

    if(statusAuth === AuthorizationStatus.Auth.toString()) {
      dispatch(logoutAction()).unwrap().then(() => {
        dispatch(fetchOffersAction());

        if(isLoading){

          return <LoadingComponent/>;
        }
      }).then(() => {
        if(currentPathname === AppRoute.Favorites.toString()){
          navigate(AppRoute.Login);
        }
      });
      dispatch(dataUserSlice.actions.addUserData(null));
    }
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={statusAuth === AuthorizationStatus.Auth.toString() ? AppRoute.Favorites : AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img src={user?.avatarUrl}></img>
            </div>
            <span className="header__user-name user__name">{statusAuth === AuthorizationStatus.Auth.toString() ? user?.email : ''}</span>
            <span className="header__favorite-count">{statusAuth === AuthorizationStatus.Auth.toString() ? offers.length : DEFAULT_VALUE_NULL}</span>

          </Link>
        </li>
        <li className="header__nav-item">
          <Link to={statusAuth === AuthorizationStatus.Auth.toString() ? AppRoute.Main : AppRoute.Login} className="header__nav-link">
            <span className= {statusAuth === AuthorizationStatus.Auth.toString() ? 'header__signout' : 'header__login'} onClick={handleClickButtonOut}>
              { (statusAuth === AuthorizationStatus.Auth.toString()) ? 'Sign out' : 'Sign in'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const Profile = memo(ProfileMemo);

export {Profile};
