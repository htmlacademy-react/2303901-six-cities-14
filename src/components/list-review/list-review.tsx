import Review from '../review/review';
import {MAX_LENGTH_REVIEW} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import {useEffect} from 'react';
import type { Comment } from '../../types/type-store';

function ListReview () {
  const comments = useAppSelector((state) => state.loadComments.comments);
  const reviews = comments?.slice(0, MAX_LENGTH_REVIEW);

  useEffect(() => {
  }, [comments, reviews]);


  function compareDates(a: Comment, b: Comment): number {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }

  const sort = reviews?.sort(compareDates);

  return(
    <ul className="reviews__list">
      {sort?.map((review) => <Review key={review.id} reviewProps={review}/>)}
    </ul>
  );
}

export default ListReview;

