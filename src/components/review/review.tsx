import {MONTH_NAMES} from '../../const';
import type {Review} from '../../types/types';
import type {Comment} from '../../types/type-store';
import {getRating} from '../../utils';

type ReviewProps = {
  reviewProps:Comment;
}

function Review ({reviewProps}: ReviewProps) {
  const inputDate = reviewProps.date;
  const date = new Date(inputDate);
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;

  return (
    <li className="reviews__item" data-testid='review'>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src= {reviewProps.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{ reviewProps.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width:  `${getRating(reviewProps.rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviewProps.comment}
        </p>
        <time className="reviews__time" dateTime={reviewProps.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

export {Review};

