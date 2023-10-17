import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function ErrorMessage (): JSX.Element {
  return (
    <Link to={AppRoute.Main}>
      <div>
        <h1>404 Not Found</h1>
        <p> Перейти на главную страницу</p>
      </div>
    </Link>
  );
}

export default ErrorMessage;

