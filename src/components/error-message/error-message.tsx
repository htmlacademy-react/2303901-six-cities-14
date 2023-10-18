import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import useDocumentTitle from '../../hooks/document-title/document-title';

type OfferPagesProps = {
  Title: string;
}

function ErrorMessage ({Title: title} : OfferPagesProps): JSX.Element {

  useDocumentTitle(title);

  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}><p> Перейти на главную страницу</p></Link>
    </div>
  );
}

export default ErrorMessage;

