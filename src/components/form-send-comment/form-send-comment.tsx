import {ChangeEvent, useState} from 'react';
import {LengthComment} from '../../const';
import {fetchComments, sendComment} from '../../services/api-actions';
import {store} from '../../store';

type CommentState = {
  comment: string;
};

type RatingState = {
  ratingOffer: string;
};

type PropsFormComment = {
    id: string | undefined;
}

function FormSendComment ({id}: PropsFormComment): JSX.Element {

  const [sateComment, setStateComment] = useState<CommentState>({
    comment: '',
  });

  const[sateRatingOffer, setStateRatingOffer] = useState<RatingState>({
    ratingOffer: ''
  });

  const minRating = parseInt(sateRatingOffer.ratingOffer, 10);

  const commentData = {
    id: id,
    comment: sateComment.comment,
    rating:  +sateRatingOffer.ratingOffer
  };

  const isNumber = isNaN(minRating);
  const isCommentLengthValid = !(sateComment.comment.length >= LengthComment.MIN && sateComment.comment.length <= LengthComment.MAX);
  const blockButton = isCommentLengthValid || isNumber;


  function onClickButtonSent(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();


    store.dispatch(sendComment(commentData));
    store.dispatch(fetchComments(id));

    setStateComment({
      ...sateComment,
      comment: ''
    });

    setStateRatingOffer({
      ...sateRatingOffer,
      ratingOffer: ''
    });
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating" onChange={(evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target instanceof HTMLInputElement) {
          setStateRatingOffer({
            ...sateRatingOffer,
            ratingOffer: evt.target.value
          });
        }
      }}
      >
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
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
          defaultValue={4}
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
          defaultValue={3}
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
          defaultValue={2}
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
          defaultValue={1}
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
        defaultValue={''}

        onChange= {(evt) => setStateComment({
          ...sateComment,
          comment: evt.target.value
        })}
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
          onClick={onClickButtonSent}
          disabled={blockButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}


export default FormSendComment;
