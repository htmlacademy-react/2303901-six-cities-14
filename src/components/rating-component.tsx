import {ChangeEvent} from 'react';
import React from 'react';
import { useAppSelector } from '../hooks/use-store';


type RatingComponentProps = {
  rating: number;
  setRating: (rating: number) => void;
};

function RatingComponent ({rating, setRating}: RatingComponentProps) {

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const isLoading = useAppSelector((state) => state.loadComment.isLoading);

  const OPTIONS = [
    {label: 'perfect', value: 5},
    {label: 'good', value: 4},
    {label: 'not bad', value: 3},
    {label: 'badly', value: 2},
    {label: 'terribly', value: 1},
  ];

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
