import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import { dropToken } from '../../services/token';


function Profile () {
  const statusAuth = useAppSelector((state) => state.authStatus.authStatus);

  function onClickButton () {
    dropToken();
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
                <span className="header__user-name user__name">Oliver.conner@gmail.com </span>
                <span className="header__favorite-count">3</span>
              </>
              : ''}
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout" onClick={onClickButton}>
              { (statusAuth === AuthorizationStatus.Auth.toString()) ? 'Sign out' : ''}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export {Profile};
