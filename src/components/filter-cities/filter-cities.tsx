import {CitiesForFilter} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import { filterCitySlice } from '../../store/slices/filter-city-slice';
import type {StateFilterCity} from '../../types/type-store';

function FilterCities () {

  const dispatch = useDispatch();
  const stateFilter = useSelector((state: StateFilterCity) => state.filterCity.city);

  return (
    <div className="tabs" >
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {CitiesForFilter.map((city) => (
            <li className="locations__item" key={city}>
              <a className={`locations__item-link tabs__item ${city === stateFilter ? 'tabs__item--active' : ''}`}
                onClick={() => {
                  dispatch(filterCitySlice.actions.changeCity(city));
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default FilterCities;
