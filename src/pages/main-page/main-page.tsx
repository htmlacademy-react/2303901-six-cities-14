import {memo, useEffect} from 'react';
import {MapComponent} from '../../components/map/map';
import {FilterCities} from '../../components/filter-cities/filter-cities';
import {useDocumentTitle} from '../../hooks/document-title';
import {Profile} from '../../components/profile/profile';
import {sortOffersSlice} from '../../store/slices/sort-offers-slice';
import {filterOffersSlice} from '../../store/slices/filter-offer-slice';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {CitiesPlaceComponent} from '../../components/cities-places/cities-places';
import {NoPlacesLeftComponent} from '../../components/no-places/no-places-left';
import {Logotype} from '../../components/logotype/logotype';
import {AuthorizationStatus, DEFAULT_VALUE_NULL, SettingLogoHeader, TitleDescription} from '../../const';
import type {OfferCard} from '../../types/type-store';
import {NoPlacesRightComponent} from '../../components/no-places/no-places-right';
import {fetchOffersFavorite} from '../../services/thunk/fetch-offers-favorite';
import {ErrorMessage} from '../../components/error-message/error-message';
import {LoadingComponent} from '../../components/loading-component/loading-component';
import {ProfileNotLoggedComponent} from '../../components/profile-not-logged/profile-not-logged';

type MainPagesProps = {
  title: string;
}

function MainPagesMemo ({title}: MainPagesProps): JSX.Element {
  const selectedFilterCity = useAppSelector((state) => state.filterCity.city);
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const dispatch = useAppDispatch();
  const offersFilter = useAppSelector((state) => state.filterOffers.filterOffers);
  const error = useAppSelector((state) => state.offers.error);
  const loading = useAppSelector((state) => state.offers.loadingStatus);
  const stateAut = useAppSelector((state) => state.authorizationStatus.authStatus);
  const checkStatus = stateAut === AuthorizationStatus.Auth.toString();

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

  if(error !== null){
    return <ErrorMessage title={TitleDescription.ErrorPage}/>;
  }

  if(loading){
    return <LoadingComponent/>;
  }

  return (
    <div className="page page--gray page--main " data-testid ='main-page'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logotype className={SettingLogoHeader.className} width={SettingLogoHeader.width} height={SettingLogoHeader.height}/>
            </div>
            {checkStatus ? <Profile/> : <ProfileNotLoggedComponent/>}
          </div>
        </div>
      </header>
      <main className= {`${offersFilter.length !== DEFAULT_VALUE_NULL ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <FilterCities/>
        <div className="cities">
          <div className={`cities__places-container container ${offersFilter.length === DEFAULT_VALUE_NULL ? 'cities__places-container--empty' : ''}`}>
            {offersFilter.length !== DEFAULT_VALUE_NULL ? <CitiesPlaceComponent/> : <NoPlacesLeftComponent/>}
            <div className="cities__right-section">
              {offersFilter.length !== DEFAULT_VALUE_NULL ? <MapComponent pointsToMap={pointsOffersToMap} cityName={selectedFilterCity}/> : <NoPlacesRightComponent/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const MainPages = memo(MainPagesMemo);

export {MainPages};

