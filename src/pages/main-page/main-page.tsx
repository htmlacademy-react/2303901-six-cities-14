import ListOffers from '../../components/list-offers/list-offers';
import MapComponent from '../../components/map/map';
import FilterCities from '../../components/filter-cities/filter-cities';
import type {Offers, Offer} from '../../mock/offers/offer-mocks';
import useDocumentTitle from '../../hooks/document-title';
import {useState} from 'react';
import Profile from '../../components/profile/profile';
import {useSelector} from 'react-redux';
import type {StateFilterCity} from '../../types/type-store';

type MainPagesProps = {
  title: string;
  offers: Offers;
}

function MainPages ({title, offers}: MainPagesProps): JSX.Element {


  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);

  //стейт фильтра города при нажатии на фильтр
  const selectedFilterCity = useSelector((state: StateFilterCity) => state.filterCity.city);

  //Функция получения списка офферов согласно выбранного фильта
  const citiesToFilter = offers.filter((city, index) => {
    if (city.city.name === selectedFilterCity) {

      return offers[index];
    }
  });

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
    offers.find((offer, index: number) => {

      if (offer.id === idOffer){
        setSelectedPoint(offers[index]);
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
              <b className="places__found"> {citiesToFilter.length} places to stay in {selectedFilterCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <ListOffers offers = {citiesToFilter} handleIdOffer = {handleListItemHover} onLeaveMouseOffer={onLeaveMouseOffer}/>

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

