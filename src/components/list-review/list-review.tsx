import Review from '../review/review';
import { MAX_LENGTH_REVIEW } from '../../const';
import { useAppSelector } from '../../hooks/use-store';
import { useEffect } from 'react';
import type { Comment } from '../../types/type-store';

function ListReview() {
  const comments = useAppSelector((state) => state.loadComments.comments);

  useEffect(() => {

  }, [comments]);

  function compareDates(a: Comment, b: Comment): number {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }

  const sortedComments = comments ? [...comments].sort(compareDates) : [];
  const slicedComments = sortedComments.slice(0, MAX_LENGTH_REVIEW);

  return (
    <ul className="reviews__list">
      {slicedComments.map((review) => (
        <Review key={review.id} reviewProps={review} />
      ))}
    </ul>
  );
}

export default ListReview;

