import React, {useEffect, useState} from 'react';
import type {Offers} from '../../mock/offers/offer-mocks';
import {sortOffersSlice} from '../../store/slices/sort-offers-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';

function SortList () {
  const [stateSortList, setStateSortList] = useState(false);

  const offersSort = useAppSelector((state) => state.sortOffers.sortOffers);
  const offersCity = useAppSelector((state) => state.filterOffers.filterOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStateSortList(false);
  },[offersCity, offersSort]);

  function changeOfferLowToHight (offersToSort: Offers) {
    const offers = [...offersToSort].sort((a, b) => a.price - b.price);

    dispatch(sortOffersSlice.actions.addSortOffers(offers));
  }

  function changeOfferHightToLow (offersToSort: Offers) {
    const offers = [...offersToSort].sort((a, b) => b.price - a.price);
    dispatch(sortOffersSlice.actions.addSortOffers(offers));
  }

  function changeOfferTopRatedFirst (offersToSort: Offers) {
    const offers = [...offersToSort].sort((a, b) => b.rating - a.rating);
    dispatch(sortOffersSlice.actions.addSortOffers(offers));
  }

  function onClickSort():void {
    setStateSortList(!stateSortList);
  }

  function onClickChangeSort(evt: React.SyntheticEvent<EventTarget, Event>) {

    type TabIndex = number;

    const target = evt.target as HTMLElement;
    const tabIndex: TabIndex = target.tabIndex;

    switch(tabIndex) {
      case 0:
        return dispatch(sortOffersSlice.actions.addSortOffers(offersCity));
      case 1:
        return changeOfferLowToHight(offersSort);
      case 2:
        return changeOfferHightToLow(offersSort);
      case 3:
        return changeOfferTopRatedFirst(offersSort);
    }
  }

  return (
    offersCity?.length ? (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} onClick={onClickSort}>
          Popular
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
