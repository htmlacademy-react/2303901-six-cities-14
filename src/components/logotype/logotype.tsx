import {Link} from 'react-router-dom';
import {AppRoute, /*DEFAULT_CITY*/} from '../../const';
//import {filterCitySlice} from '../../store/slices/filter-city-slice';
//import { useAppDispatch } from '../../hooks/use-store';


function Logotype (): JSX.Element {
  //const dispatch = useAppDispatch();


  return (

    <div className="header__left">
      <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
          /*onClick={dispatch(filterCitySlice.actions.changeCity(DEFAULT_CITY))}*/
        />
      </Link>
    </div>
  );
}

export default Logotype;
