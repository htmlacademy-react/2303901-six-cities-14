import {useEffect} from 'react';
import {MapComponent} from '../../components/map/map';
import FilterCities from '../../components/filter-cities/filter-cities';
import useDocumentTitle from '../../hooks/document-title';
import {Profile} from '../../components/profile/profile';
import {sortOffersSlice} from '../../store/slices/sort-offers-slice';
import {filterOffersSlice} from '../../store/slices/filter-offer-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {fetchOffersFavorite} from '../../services/api-actions';
import { CitiesPlaceComponent } from '../../components/cities-places/cities-places';
import { NoPlacesLeftComponent } from '../../components/no-places/no-places-left';
import {Logotype} from '../../components/logotype/logotype';
import {SettingLogoHeader} from '../../const';
import type {OfferCard} from '../../types/type-store';
import { NoPlacesRightComponent } from '../../components/no-places/no-places-right';

type MainPagesProps = {
  title: string;
}

function MainPages ({title}: MainPagesProps): JSX.Element {

  const selectedFilterCity = useAppSelector((state) => state.filterCity.city);
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const dispatch = useAppDispatch();
  const offersFilter = useAppSelector((state) => state.filterOffers.filterOffers);

  const citiesToFilter: OfferCard[] = stateOffers?.filter((city, index) => {
    if (city.city.name === selectedFilterCity) {
      return stateOffers[index];
    }
  }) || [];

  useEffect(() => {
    dispatch(sortOffersSlice.actions.addSortOffers(citiesToFilter));
    dispatch(filterOffersSlice.actions.addFilterOffers(citiesToFilter));
    dispatch(fetchOffersFavorite());
  },[selectedFilterCity, stateOffers]);


  const pointsOffersToMap = citiesToFilter?.map((offer) => {

    const pointsToMap = {
      title: offer.city.name,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
      zoom: offer.location.zoom,
      id: offer.id
    };

    return pointsToMap;
  });

  useDocumentTitle(title);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

              <Logotype className={SettingLogoHeader.className} width={SettingLogoHeader.width} height={SettingLogoHeader.height}/>

            </div>

            <Profile/>

          </div>
        </div>
      </header>

      <main className= {`${offersFilter.length !== 0 ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>

        <FilterCities/>

        <div className="cities">
          <div className={`cities__places-container container ${offersFilter.length === 0 ? 'cities__places-container--empty' : ''}`}>

            {offersFilter.length !== 0 ? <CitiesPlaceComponent/> : <NoPlacesLeftComponent/>}

            <div className="cities__right-section">

              {offersFilter.length !== 0 ? <MapComponent pointsToMap={pointsOffersToMap} cityName={selectedFilterCity}/> : <NoPlacesRightComponent/>}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPages};

