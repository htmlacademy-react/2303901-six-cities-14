import Logotype from '../../components/logotype/logotype';
import useDocumentTitle from '../../hooks/document-title';
import {Profile} from '../../components/profile/profile';
import { FavoriteCardComponents } from '../../components/favorite-cards-component/favorite-cards-component';
import { SettingLogoFooter, SettingLogoHeader } from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import {EmptyFavoriteCardsComponent} from '../../components/empty-favorite-cards-component/empty-favorite-cards-component';

type FavoritePagesProps = {
  title: string;
};

function FavoritesPage({title}: FavoritePagesProps): JSX.Element {

  const offers = useAppSelector((state) => state.offersFavorite.offers);

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
        {offers.length === 0 ? <EmptyFavoriteCardsComponent/> : <FavoriteCardComponents/>}
      </main>

      <footer className="footer container">

        <Logotype className={SettingLogoFooter.className} width={SettingLogoFooter.width} height={SettingLogoFooter.height}/>

      </footer>
    </div>
  );
}

export {FavoritesPage};
