import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';

export default function AdditionalUserReviews({ submissionId }) {
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

  // Function to render stars based on rating
  const renderStars = (rating) => {

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (halfStar) {
      stars.push("⭐");
    }

    return stars.join("");
  };

  return (
    <div>
      <h3>Additional User Reviews</h3>
      {error && <p>{error}</p>}
      {averageRating !== null && (
        <div>
          <h4>Average Rating: {renderStars(averageRating) + " " + averageRating}</h4>
        </div>
      )}
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className="review-card">
            <h4>{review.user.username}</h4>
            <font size="2">Submitted {RenderDateAndTime(review.submission)}</font><br></br>
            <p>Rating: {renderStars(review.rating)}</p>
            <p>{review.reviewText}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet!</p>
      )}
    </div>
  );
}

