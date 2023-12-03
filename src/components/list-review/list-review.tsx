import {Review} from '../review/review';
import {DEFAULT_VALUE_NULL, MAX_LENGTH_REVIEW} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import type {Comment} from '../../types/type-store';
import {memo} from 'react';

function ListReviewMemo() {
  const comments = useAppSelector((state) => state.loadComments.comments);

  function compareDates(a: Comment, b: Comment): number {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }

  const sortedComments = comments ? [...comments].sort(compareDates) : [];
  const slicedComments = sortedComments.slice(DEFAULT_VALUE_NULL, MAX_LENGTH_REVIEW);

  return (
    <ul className="reviews__list">
      {slicedComments.map((review) => (
        <Review key={review.id} reviewProps={review} />
      ))}
    </ul>
  );
}

const ListReview = memo(ListReviewMemo);

export {ListReview};

