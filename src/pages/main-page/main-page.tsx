import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import ListOffers from '../../components/list-offers/list-offers';
import MapComponent from '../../components/map/map';
import FilterCities from '../../components/filter-cities/filter-cities';
import type {Offer} from '../../mock/offers/offer-mocks';
import useDocumentTitle from '../../hooks/document-title';
import Profile from '../../components/profile/profile';
import type {StateFilterCity, StateOffers} from '../../types/type-store';
import { SortList } from '../../components/sort-list/sort-list';
import { sortOffersSlice } from '../../store/slices/sort-offers-slice';
import {filterOffersSlice} from '../../store/slices/filter-offer-slice';
import type {StateOffersFilter, StateOffersSort} from '../../types/type-store';

type MainPagesProps = {
  title: string;
}

function MainPages ({title}: MainPagesProps): JSX.Element {

  //стейт фильтра города при нажатии на фильтр
  const selectedFilterCity = useSelector((state: StateFilterCity) => state.filterCity.city);
  const stateOffers = useSelector((state: StateOffers) => state.offers.offers);
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);
  const dispatch = useDispatch();
  const offersFilter = useSelector((state: StateOffersFilter) => state.filterOffers.filterOffers);
  const offersSort = useSelector((state: StateOffersSort) => state.sortOffers.sortOffers);

  //Функция получения списка офферов согласно выбранного фильта
  const citiesToFilter = stateOffers.filter((city, index) => {
    if (city.city.name === selectedFilterCity) {

      return stateOffers[index];
    }
  });


  useEffect(() => {
    dispatch(sortOffersSlice.actions.addSortOffers(citiesToFilter));
    dispatch(filterOffersSlice.actions.addFilterOffers(citiesToFilter));
  },[selectedFilterCity]);

  const pointsOffersToMap = citiesToFilter.map((offer) => {

    const pointsToMap = {
      title: offer.city.name,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
      zoom: offer.location.zoom,
      id: offer.id
    };

    return pointsToMap;
  });

  function handleListItemHover (idOffer: number) {
    stateOffers.find((offer, index: number) => {

      if (offer.id === idOffer){
        setSelectedPoint(stateOffers[index]);
      }
    });
  }

  function onLeaveMouseOffer () {
    setSelectedPoint(undefined);
  }

  useDocumentTitle(title);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>

            <Profile/>

          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <FilterCities/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found"> {offersFilter.length} places to stay in {selectedFilterCity}</b>

              <SortList/>
              <ListOffers offers = {offersSort} handleIdOffer = {handleListItemHover} onLeaveMouseOffer={onLeaveMouseOffer}/>

            </section>

            <div className="cities__right-section">

              <MapComponent pointsToMap={pointsOffersToMap} selectedPoint={selectedPoint} cityName={selectedFilterCity}/>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPages;

