import {CitiesForFilter} from '../../const';
import {ButtonFilterComponent} from '../button-filter-component/button-filter-component';

function FilterCities () {

  return (
    <div className="tabs" >
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CitiesForFilter.map((city) => <ButtonFilterComponent city={city} key={city}/>)}
        </ul>
      </section>
    </div>
  );
}

export default FilterCities;
