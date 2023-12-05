import React, { useEffect, useState } from 'react';
import type { OfferCard } from '../../types/type-store';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { offersSlice } from '../../store/slices/offers-slice';

function SortList() {
  const [stateSortList, setStateSortList] = useState(false);
  const [filter, setFilter] = useState('Popular');
  const offersFilter = useAppSelector((state) => state.offers.offersFilter);
  const dispatch = useAppDispatch();
  const sorting = useAppSelector((state) => state.offers.statusSort);
  const city = useAppSelector((state) => state.filterCity.city);

  useEffect(() => {
    setFilter('Popular');
  }, [city]);

  function changeOfferPopular() {
    const sort = 'Popular';

    dispatch(offersSlice.actions.changeOffers(offersFilter || []));
    dispatch(offersSlice.actions.addStatusSort(sort));
  }

  function changeOfferLowToHight(offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => a.price - b.price);
    const sort = 'low to high';

    //dispatch(offersSlice.actions.addOffersSort(offers));
    dispatch(offersSlice.actions.changeOffers(offers));
    dispatch(offersSlice.actions.addStatusSort(sort));
  }

  function changeOfferHightToLow(offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => b.price - a.price);
    const sort = 'high to low';

    //dispatch(offersSlice.actions.addOffersSort(offers));
    dispatch(offersSlice.actions.changeOffers(offers));
    dispatch(offersSlice.actions.addStatusSort(sort));
  }

  function changeOfferTopRatedFirst(offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => b.rating - a.rating);
    const sort = 'Top rated first';

    //dispatch(offersSlice.actions.addOffersSort(offers));
    dispatch(offersSlice.actions.changeOffers(offers));
    dispatch(offersSlice.actions.addStatusSort(sort));
  }

  function onClickSort(): void {
    setStateSortList(!stateSortList);
  }

  useEffect(() => {
    switch (sorting) {
      case 'low to high':
        changeOfferLowToHight(offersFilter || []);
        break;
      case 'high to low':
        changeOfferHightToLow(offersFilter || []);
        break;
      case 'Top rated first':
        changeOfferTopRatedFirst(offersFilter || []);
        break;
      default:
        changeOfferPopular();
        break;
    }
  }, [sorting, offersFilter, city]);

  function onClickChangeSort(evt: React.SyntheticEvent<EventTarget, Event>) {
    const target = evt.target as HTMLElement;
    const tabIndex: number = target.tabIndex;
    const text: string = (evt.target as HTMLElement).textContent || '';

    setFilter(text);
    setStateSortList(false);

    switch (tabIndex) {
      case 1:
        return changeOfferPopular();
      case 2:
        return changeOfferLowToHight(offersFilter || []);
      case 3:
        return changeOfferHightToLow(offersFilter || []);
      case 4:
        return changeOfferTopRatedFirst(offersFilter || []);
    }
  }

  return (
    offersFilter?.length ? (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} onClick={onClickSort}>
          {filter}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom
            stateSortList
            ${stateSortList ? 'places__options--opened' : ''}`}
          onClick={onClickChangeSort}
        >
          <li className="places__option places__option--active" tabIndex={1}>Popular</li>
          <li className="places__option" tabIndex={2}>Price: low to high</li>
          <li className="places__option" tabIndex={3}>Price: high to low</li>
          <li className="places__option" tabIndex={4}>Top rated first</li>
        </ul>
      </form>
    ) : ''
  );
}

export { SortList };
