import {ChangeEvent, useState} from 'react';
import type {FormEvent} from 'react';
import {LengthComment} from '../../const';
import {fetchComments, sendComment} from '../../services/api-actions';
import { useAppDispatch } from '../../hooks/use-store';

type PropsFormComment = {
    id: string | undefined;
}

function FormSendComment ({id}: PropsFormComment): JSX.Element {

  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const[rating, setRating] = useState(0);

  const isCommentLengthValid = !(comment.length >= LengthComment.MIN && comment.length <= LengthComment.MAX);
  const blockButton = isCommentLengthValid || rating === 0;

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  function onClickButtonSent(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const commentData = {
      id,
      comment,
      rating
    };

    dispatch(sendComment(commentData)).unwrap().then(() => {
      setComment('');
      setRating(0);
    });
    dispatch(fetchComments(id));

    setComment(comment);

    setRating(rating);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onClickButtonSent}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={5}
          checked={rating === 5}
          onChange={handleChecked}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={4}
          checked={rating === 4}
          onChange={handleChecked}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={3}
          checked={rating === 3}
          onChange={handleChecked}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={2}
          checked={rating === 2}
          onChange={handleChecked}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={1}
          checked={rating === 1}
          onChange={handleChecked}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}

        onChange= {(evt) => setComment(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{''}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{''}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={blockButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}


export default FormSendComment;
