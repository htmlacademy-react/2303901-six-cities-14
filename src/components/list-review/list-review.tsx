import Review from '../review/review';
import type {Reviews} from '../../types/types';
import { MAX_LENGTH_REVIEW } from '../../const';
import {useAppSelector} from '../../hooks/use-store';

type ListReviewsProps = {
  reviewProps: Reviews;
}


function ListReview ({reviewProps}: ListReviewsProps) {

  const comments = useAppSelector((state) => state.loadComments.comments);
  const reviews = comments?.slice(0, MAX_LENGTH_REVIEW);

  return(
    <ul className="reviews__list">
      {reviews?.map((review) => <Review key={review.id} reviewProps={review}/>)}
    </ul>
  );
}

export default ListReview;

