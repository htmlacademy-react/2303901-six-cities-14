import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import useDocumentTitle from '../../hooks/document-title';
import { useAppSelector } from '../../hooks/use-store';

type OfferPagesProps = {
  title: string;
}

function ErrorMessage ({title} : OfferPagesProps): JSX.Element | null {

  const error = useAppSelector((state) => state.error.error);
  useDocumentTitle(title);

  return(error) ?
    <div>
      <h1>{error}</h1>
      <Link to={AppRoute.Main}><p> Перейти на главную страницу</p></Link>
    </div>
    : null;
}

export {ErrorMessage};

