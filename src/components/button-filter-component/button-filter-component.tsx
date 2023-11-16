
import {filterCitySlice} from '../../store/slices/filter-city-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';

type Props = {
  city: string;
}


function ButtonFilterComponent ({city}: Props) {


  const dispatch = useAppDispatch();
  const stateFilter = useAppSelector((state) => state.filterCity.city);

  return (

    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city === stateFilter ? 'tabs__item--active' : ''}`}
        onClick={() => {
          dispatch(filterCitySlice.actions.changeCity(city));
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export {ButtonFilterComponent};
