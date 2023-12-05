import React, {useEffect, useState} from 'react';
import type {OfferCard} from '../../types/type-store';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import { offersSlice } from '../../store/slices/offers-slice';


function SortList () {
  const [stateSortList, setStateSortList] = useState(false);
  const [filter, setFilter] = useState('Popular');

  const offersFilter = useAppSelector((state) => state.offers.offersFilter);
  //const offersCity = useAppSelector((state) => state.filterOffers.filterOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilter('Popular');
  },[offersFilter]);

  function changeOfferLowToHight (offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => a.price - b.price);

    dispatch(offersSlice.actions.addOffersSort(offers));
  }

  function changeOfferHightToLow (offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => b.price - a.price);

    dispatch(offersSlice.actions.addOffersSort(offers));
  }

  function changeOfferTopRatedFirst (offersToSort: OfferCard[]) {
    const offers = [...offersToSort].sort((a, b) => b.rating - a.rating);

    dispatch(offersSlice.actions.addOffersSort(offers));
  }

  function onClickSort():void {

    setStateSortList(!stateSortList);
  }

  function onClickChangeSort(evt: React.SyntheticEvent<EventTarget, Event>) {

    const target = evt.target as HTMLElement;
    const tabIndex: number = target.tabIndex;
    const text: string = (evt.target as HTMLElement).textContent || '';

    setFilter(text);
    setStateSortList(false);

    switch(tabIndex) {
      case 0:
        return dispatch(offersSlice.actions.addOffersFilter(offersFilter ?? []));
      case 1:
        return changeOfferLowToHight(offersFilter ?? []);
      case 2:
        return changeOfferHightToLow(offersFilter ?? []);
      case 3:
        return changeOfferTopRatedFirst(offersFilter ?? []);
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
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={1}>Price: low to high</li>
          <li className="places__option" tabIndex={2}>Price: high to low</li>
          <li className="places__option" tabIndex={3}>Top rated first</li>
        </ul>
      </form>
    ) : ''

  );
}

export {SortList};
