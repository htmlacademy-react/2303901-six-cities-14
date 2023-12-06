import {useState} from 'react';
import type {FormEvent} from 'react';
import {DEFAULT_VALUE_NULL, LengthComment} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {RatingComponent} from '../rating-component/rating-component';
import {sendComment} from '../../services/thunk/send-comment';
import {fetchComments} from '../../services/thunk/fetch-comments';
import {memo} from 'react';

type PropsFormComment = {
    id: string | undefined;
}

function FormSendCommentMemo ({id}: PropsFormComment): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState(DEFAULT_VALUE_NULL);
  const [button, setButton] = useState(false);
  const isCommentLengthValid = (comment.length >= LengthComment.Min && comment.length <= LengthComment.Max);
  const isLoading = useAppSelector((state) => state.loadComment.isLoading);
  const isValid = !(isCommentLengthValid && rating !== DEFAULT_VALUE_NULL && (isLoading === null || true));
  const errorMessage = useAppSelector((state) => state.loadComment.error);

  function handleClickButtonSent(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const commentData = {
      id,
      comment,
      rating
    };

    dispatch(sendComment(commentData)).unwrap().then(() => {
      setComment('');
      setRating(DEFAULT_VALUE_NULL);
      dispatch(fetchComments(id));
      setButton(false);
    }).catch(() => {

      setButton(false);
    });

    setButton(true);
    setComment(comment);
    setRating(rating);
  }

  function getRatingFromComponent(ratingFromComponent: number): void {
    setRating(ratingFromComponent);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleClickButtonSent}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingComponent rating={rating} onSetRating={getRatingFromComponent}/>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isLoading}
        onChange= {(evt) => setComment(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set {''}
          <span className="reviews__star">rating</span> and describe
          your stay with at least {''}
          <b className="reviews__text-amount">{LengthComment.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={button || isValid}
        >
          Submit
        </button>
      </div>
      {errorMessage === false ? '' :
        <div className="error-message" style={{color: 'red'}}>
          {errorMessage}
        </div>}
    </form>
  );
}

const FormSendComment = memo(FormSendCommentMemo);

export {FormSendComment};

