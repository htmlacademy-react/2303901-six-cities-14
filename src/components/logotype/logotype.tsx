import {Link} from 'react-router-dom';
import {AppRoute, DEFAULT_CITY} from '../../const';
import {filterCitySlice} from '../../store/slices/filter-city-slice';
import {useAppDispatch} from '../../hooks/use-store';
import {memo} from 'react';
import {offerSlice} from '../../store/slices/offer-slice';

type Props = {
  className: string;
  width: number;
  height: number;
}

function MemoizedLogotype ({className, width, height}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClickLogo () {
    dispatch(filterCitySlice.actions.changeCity(DEFAULT_CITY));
    dispatch(offerSlice.actions.addLoadOfferCard(null));
  }

  return (
    <Link to={AppRoute.Main} className={`${className}__logo-link ${className}__logo-link--active`}>
      <img
        className={`${className}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
        onClick={handleClickLogo}
      />
    </Link>
  );
}

const Logotype = memo(MemoizedLogotype);

export {Logotype};
