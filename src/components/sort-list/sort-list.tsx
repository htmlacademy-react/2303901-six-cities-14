import React, {useEffect, useState} from 'react';
import type {Offers} from '../../mock/offers/offer-mocks';


type OffersSort = {
  offers: Offers;
}

function SortList ({offers}: OffersSort) {
  const [stateSortList, setStateSortList] = useState(false);
  const [stateSortOffers, setStateSortOffers] = useState(offers);

  useEffect(()=>{
    setStateSortList(false);
    setStateSortOffers(offers);
  },[offers]);

  function changeOfferLowToHight (offersToSort: Offers) {
    setStateSortOffers([...offersToSort].sort((a, b) => a.price - b.price));
  }

  function changeOfferHightToLow (offersToSort: Offers) {
    setStateSortOffers([...offersToSort].sort((a, b) => b.price - a.price));
  }

  function changeOfferTopRatedFirst (offersToSort: Offers) {
    setStateSortOffers([...offersToSort].sort((a, b) => b.rating - a.rating));
  }

  function onClickSort():void {
    setStateSortList(!stateSortList);
  }

  function onClickChangeSort(evt: React.SyntheticEvent<EventTarget, Event>) {

    type TabIndex = number;

    const target = evt.target as HTMLElement;
    const tabIndex: TabIndex = target.tabIndex;
    //console.log( evt)

    switch(tabIndex) {
      case 0:
        return setStateSortOffers(offers);
      case 1:
        return changeOfferLowToHight(offers);
      case 2:
        return changeOfferHightToLow(offers);
      case 3:
        return changeOfferTopRatedFirst(offers);
    }
  }
  //console.table(stateSortOffers);

  return (
    <form className="places__sorting" action="#" method="get" >
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
  );
}

export {SortList};
