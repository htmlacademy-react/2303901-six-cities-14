import Review from '../review/review';
import type {Reviews} from '../../types/types';

type ListReviewsProps = {
  reviewProps: Reviews;
}


function ListReview ({reviewProps}: ListReviewsProps) {

  return(
    <ul className="reviews__list">
      {reviewProps.map((review) => <Review key={review.id} reviewProps={review}/>)}
    </ul>
  );
}

export default ListReview;

