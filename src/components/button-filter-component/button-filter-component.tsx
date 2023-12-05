import {filterCitySlice} from '../../store/slices/filter-city-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {Link} from 'react-router-dom';
import {AppRoute, Sort} from '../../const';
import {offersSlice} from '../../store/slices/offers-slice';

type Props = {
  city: string;
}

function ButtonFilterComponent ({city}: Props) {
  const dispatch = useAppDispatch();
  const stateFilter = useAppSelector((state) => state.filterCity.city);

  return (
    <div className="locations__item">
      <Link to={AppRoute.Main} className={`locations__item-link tabs__item ${city === stateFilter ? 'tabs__item--active' : ''}`}
        onClick={() => {
          dispatch(filterCitySlice.actions.changeCity(city));
          dispatch(offersSlice.actions.addStatusSort(Sort.Popular));
        }}
      >
        <span>{city}</span>
      </Link>
    </div>
  );
}

export {ButtonFilterComponent};
