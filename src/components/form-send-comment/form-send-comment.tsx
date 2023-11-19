import {useState} from 'react';
import type {FormEvent} from 'react';
import {LengthComment} from '../../const';
import {fetchComments, sendComment} from '../../services/api-actions';
import {useAppDispatch} from '../../hooks/use-store';
import {RatingComponent} from '../rating-component';
import {useEffect} from 'react';

type PropsFormComment = {
    id: string | undefined;
}

function FormSendComment ({id}: PropsFormComment): JSX.Element {

  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const[rating, setRating] = useState(0);

  const isCommentLengthValid = !(comment.length >= LengthComment.MIN && comment.length <= LengthComment.MAX);
  const blockButton = isCommentLengthValid || rating === 0;


  useEffect(() => () => {
    setComment('');
    setRating(0);
  }, [id]);

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


export {FormSendComment};

