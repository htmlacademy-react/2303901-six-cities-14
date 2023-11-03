import { useState } from 'react';
import {CitiesForFilter} from '../../const';

type FilterCitiesProps = {
  onClickFilterCity: (onClickFilterCity: string) => void;

}

function FilterCities ({onClickFilterCity}: FilterCitiesProps) {

  const [stateFilter, setStateFilter] = useState({
    city: 'Paris'
  });

  return (
    <div className="tabs" >
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {CitiesForFilter.map((city) => (
            <li className="locations__item" key={city}>
              <a className={`locations__item-link tabs__item ${city === stateFilter.city ? 'tabs__item--active' : ''}`}
                onClick={() => {
                  setStateFilter({city: city});
                  onClickFilterCity(city);
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
