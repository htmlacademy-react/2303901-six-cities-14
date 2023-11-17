import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {dataUserSlice} from '../../store/slices/data-user-slice';
import {logoutAction} from '../../services/api-actions';

function Profile () {
  const statusAuth = useAppSelector((state) => state.authorizationStatus.authStatus);
  const user = useAppSelector((state) => state.userData.data);
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersFavorite.offers);


  function onClickButton () {
    dispatch(logoutAction());
    dispatch(dataUserSlice.actions.addUserData(null));
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={statusAuth === AuthorizationStatus.Auth.toString() ? AppRoute.Favorites : AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img src={user?.avatarUrl}></img>
            </div>
            <span className="header__user-name user__name">{statusAuth === AuthorizationStatus.Auth.toString() ? user?.email : 'Login'}</span>
            <span className="header__favorite-count">{statusAuth === AuthorizationStatus.Auth.toString() ? offers.length : 0}</span>

          </Link>
        </li>
        <li className="header__nav-item">
          <Link to={AppRoute.Main} className="header__nav-link">
            <span className="header__signout" onClick={onClickButton}>
              { (statusAuth === AuthorizationStatus.Auth.toString()) ? 'Sign out' : ''}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export {Profile};
