import {ChangeEvent} from 'react';
import React from 'react';


type RatingComponentProps = {
  rating: number;
  setRating: (rating: number) => void;
};

function RatingComponent ({rating, setRating}: RatingComponentProps) {

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  return (
    <div className="reviews__rating-form form__rating">
      {[5,4,3,2,1,].map((value) => (
        < React.Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={handleChecked}
            id={`${value}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title="perfect"
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
