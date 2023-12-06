import {RENAME_WORD} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import {ListOffers} from '../list-offers/list-offers';
import {SortList} from '../sort-list/sort-list';
import {memo} from 'react';

function CitiesPlaceComponentMemo () {
  const offers = useAppSelector((state) => state.offers.offersFilter);
  const selectedFilterCity = useAppSelector((state) => state.filterCity.city);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">{`${offers?.length === RENAME_WORD ? 'Place' : 'Places'}`} </h2>
      <b className="places__found"> {offers?.length} {`${offers?.length === RENAME_WORD ? 'Place' : 'Places'}`} to stay in {selectedFilterCity}</b>
      <SortList/>
      <ListOffers/>
    </section>
  );
}

const CitiesPlaceComponent = memo(CitiesPlaceComponentMemo);

export {CitiesPlaceComponent};
