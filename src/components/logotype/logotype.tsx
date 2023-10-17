import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function Logotype (): JSX.Element {
  return (
    <Link to={AppRoute.Main}>
      <div className="header__left">
        <a className="header__logo-link header__logo-link--active">
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
        </a>
      </div>
    </Link>
  );
}

export default Logotype;
