import {useState} from 'react';
import type {FormEvent} from 'react';
import {DEFAULT_VALUE_NULL, LengthComment} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {RatingComponent} from '../rating-component';
import {sendComment} from '../../services/thunk/send-comment';
import {fetchComments} from '../../services/thunk/fech-comments';


type PropsFormComment = {
    id: string | undefined;
}

function FormSendComment ({id}: PropsFormComment): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState(DEFAULT_VALUE_NULL);
  const [button, setButton] = useState(false);
  const isCommentLengthValid = (comment.length >= LengthComment.MIN && comment.length <= LengthComment.MAX);
  const isLoading = useAppSelector((state) => state.loadComment.isLoading);
  const isValid = !(isCommentLengthValid && rating !== DEFAULT_VALUE_NULL && (isLoading === null || true));
  const errorMessage = useAppSelector((state) => state.loadComment.error);

  function onClickButtonSent(evt: FormEvent<HTMLFormElement>) {
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
    }) .catch(() => {

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
    <form className="reviews__form form" action="#" method="post" onSubmit={onClickButtonSent}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingComponent rating={rating} setRating={getRatingFromComponent}/>
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
          <b className="reviews__text-amount">50 characters</b>.
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

export {FormSendComment};

