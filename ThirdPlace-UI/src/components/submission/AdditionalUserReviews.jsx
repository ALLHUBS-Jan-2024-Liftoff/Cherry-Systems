import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import ThumbsUpDownReviews from './ThumbsUpDownReviews';

export default function AdditionalUserReviews({submissionId, votes}) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch reviews
    axios.get(`http://localhost:8080/api/reviews?submissionId=${submissionId}`)
      .then(response => {
        setReviews(response.data);
        setError('');
      })
      .catch(error => {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
      });

    // Fetch submission details for average rating
    axios.get(`http://localhost:8080/api/submission/${submissionId}`)
      .then(response => {
        setAverageRating(response.data.averageRating);
        setError('');
      })
      .catch(error => {
        setError('Failed to fetch submission data');
        console.error('Error fetching submission data:', error);
      });
  }, [submissionId]);

  
  // console.log(reviews);

  return (
    <div>
      {reviews.length > 0 ? (
        <div className='review-card-content-for-reviews'>
          <table>
            <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="review-card-for-reviews">
                <h4 className='user-review-username-title'><Link to={`../profile/${review.user.username}`}> {review.user.username} </Link></h4>
                <font size="2" className='submitted-date-in-reviews'>Submitted {RenderDateAndTime(review.submission)}</font><br></br>
                <p className='user-review-rating'>Rating: <StarRating rating={review.rating} /></p>

                <p className='user-reviewText'>{review.reviewText}</p>
                <div className='thumbs-vote-container' style={{margin: "1rem"}}> 
                <ThumbsUpDownReviews votes={votes} data={review}/>
                </div>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reviews yet!</p>
      )}
    </div>
  );
}

