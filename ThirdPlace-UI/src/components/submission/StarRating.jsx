import React from 'react';

export default function StarRating({ rating }) {

    if (rating === 0) {
        return <div>No rating yet! 🍒 </div>;
      }

  // Calculate full stars and half stars
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('⭐');
  }

  // Render half star
  if (halfStar) {
    stars.push('⭐');
  }

  return (
    <div>
      {stars.join('')} {rating}
    </div>
  );
}
