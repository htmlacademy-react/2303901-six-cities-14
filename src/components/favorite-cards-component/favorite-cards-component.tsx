import { SettingFavoriteCard } from '../../const';
import {ButtonFilterComponent} from '../button-filter-component/button-filter-component';
import {CardOffer} from '../card-offers/card';
import type {OfferCard} from '../../types/type-store';

type props ={
  offers: OfferCard[];
}

function FavoriteCardComponents({offers}: props) {

  type Groups = {[key: string]: OfferCard[]};

  //const offers = useAppSelector((state) => state.offers.offers);

  const groupedFavorites = offers?.reduce((groups, offer) => {
    const cityName = offer.city.name;

    if (!groups[cityName]) {
      groups[cityName] = [];
    }
    groups[cityName]?.push(offer);

    return groups;
  }, {} as Groups);

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">

          {groupedFavorites && Object.entries(groupedFavorites).map(([cityName, cityOffers]) => {

            const favoriteCityOffers = cityOffers?.filter((offer) => offer.isFavorite);

            if (favoriteCityOffers?.length === 0) {

              return null;
            }
            return (
              <li className="favorites__locations-items" key={cityName}>
                <div className="favorites__locations locations locations--current">
                  <ButtonFilterComponent city={cityName}/>
                </div>
                <div className="favorites__places">
                  {favoriteCityOffers?.map((offer) => (
                    <CardOffer key={offer.id} offer={offer} className={SettingFavoriteCard.className} width={SettingFavoriteCard.width} height={SettingFavoriteCard.height}/>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export{FavoriteCardComponents};
