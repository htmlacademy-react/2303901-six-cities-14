import Logotype from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import type {OfferCard} from '../../types/type-store';
import {useAppSelector} from '../../hooks/use-store';
import {Profile} from '../../components/profile/profile';
import {SettingFavoriteCard, SettingLogoFooter, SettingLogoHeader} from '../../const';
import {CardOffer} from '../../components/card-offers/card';
import { ButtonFilterComponent } from '../../components/button-filter-component/button-filter-component';

type FavoritePagesProps = {
  title: string;
};

function FavoritesPage({title}: FavoritePagesProps): JSX.Element {

  type Groups = {[key: string]: OfferCard[]};

  const offers = useAppSelector((state) => state.offers.offers);

  const groupedFavorites = offers.reduce((groups, offer) => {
    const cityName = offer.city.name;

    if (!groups[cityName]) {
      groups[cityName] = [];
    }
    groups[cityName].push(offer);

    return groups;
  }, {} as Groups);

  useDocumentTitle(title);

  return (
    <div className="page">

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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {Object.entries(groupedFavorites).map(([cityName, cityOffers]) => {

                const favoriteCityOffers = cityOffers.filter((offer) => offer.isFavorite);

                if (favoriteCityOffers.length === 0) {

                  return null;
                }
                return (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <ButtonFilterComponent city={cityName}/>
                    </div>
                    <div className="favorites__places">
                      {favoriteCityOffers.map((offer) => (
                        <CardOffer key={offer.id} offer={offer} className={SettingFavoriteCard.className} width={SettingFavoriteCard.width} height={SettingFavoriteCard.height}/>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">

        <Logotype className={SettingLogoFooter.className} width={SettingLogoFooter.width} height={SettingLogoFooter.height}/>

      </footer>
    </div>
  );
}

export {FavoritesPage};
