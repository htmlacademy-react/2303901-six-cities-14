import FavoriteCardOffer from '../../components/favorite-card-offers/favorite-card-offers';
import Logotype from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import { Offers } from '../../mock/offers/offer-mocks';
import { useAppSelector } from '../../hooks/use-store';


type FavoritePagesProps = {
  title: string;
};

function FavoritesPage({title}: FavoritePagesProps): JSX.Element {

  type Groups = {[key: string]: Offers};

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

            <Logotype/>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
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
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">

                      {favoriteCityOffers.map((offer) => (
                        <FavoriteCardOffer key={offer.id} offer={offer} />
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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export {FavoritesPage};
