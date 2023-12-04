import {ChangeEvent} from 'react';
import React from 'react';
import {useAppSelector} from '../../hooks/use-store';
import {OPTIONS} from '../../const';

type RatingComponentProps = {
  rating: number;
  onSetRating: (rating: number) => void;
};

function RatingComponent ({rating, onSetRating: setRating}: RatingComponentProps) {
  const isLoading = useAppSelector((state) => state.loadComment.isLoading);
  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  return (
    <div className="reviews__rating-form form__rating">
      {OPTIONS.map((option) => (
        < React.Fragment key={option.value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={option.value}
            checked={rating === option.value}
            onChange={handleChecked}
            id={`${option.value}-stars`}
            type="radio"
            disabled = {isLoading}
          />
          <label
            htmlFor={`${option.value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={option.label}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

export {RatingComponent};
