import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {dropToken} from '../../services/token';
import {authStatusSlice} from '../../store/slices/auth-status-slice';
import {dataUserSlice} from '../../store/slices/data-user-slice';
import {fetchOffersAction} from '../../services/api-actions';

function Profile () {
  const statusAuth = useAppSelector((state) => state.authorizationStatus.authStatus);
  const email = useAppSelector((state) => state.userData.data?.email);
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersFavorite.offers);


  function onClickButton () {
    dispatch(authStatusSlice.actions.addAuthStatus(AuthorizationStatus.NoAuth));
    dropToken();
    dispatch(dataUserSlice.actions.addUserData(null));
    dispatch(fetchOffersAction());
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {(statusAuth === AuthorizationStatus.Auth.toString()) ?
              <>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{offers.length}</span>
              </>
              : ''}
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
