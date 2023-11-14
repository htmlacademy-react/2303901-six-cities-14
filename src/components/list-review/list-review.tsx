import Review from '../review/review';
import {MAX_LENGTH_REVIEW} from '../../const';
import {useAppSelector} from '../../hooks/use-store';
import {useEffect} from 'react';

function ListReview () {
  const comments = useAppSelector((state) => state.loadComments.comments);
  const reviews = comments?.slice(0, MAX_LENGTH_REVIEW);

  useEffect(() => {

  }, [comments, reviews]);

  return(
    <ul className="reviews__list">
      {reviews?.map((review) => <Review key={review.id} reviewProps={review}/>)}
    </ul>
  );
}

export default ListReview;

