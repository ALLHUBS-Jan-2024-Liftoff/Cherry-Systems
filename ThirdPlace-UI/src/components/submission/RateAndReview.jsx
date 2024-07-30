import { useState } from "react";



const DEFAULT_COUNT = 5; 
const DEFAULT_ICON = "⭐"; 
const DEFAULT_UNSELECTED_COLOR = "grey"; 
const DEFAULT_COLOR = "yellow";


export default function RateAndReview({count, defaultRating, icon, color, iconSize}) {
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0); 

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);
  
  const handleClick = (rating) => {
    setRating(rating);
    // Connect star rating to database storage here
  };

  return (
    <div>
      <div className="starsContainer">
        {stars.map((item, index) => {
          const isActiveColor = (rating || temporaryRating) && (index < rating || index < temporaryRating); 
        
          let elementColor = "";

          if (isActiveColor) {
            elementColor = color || DEFAULT_COLOR; 
          } else {
            elementColor = DEFAULT_UNSELECTED_COLOR; 
          }

          return (
            <div 
              className="star" 
              key={index} 
              style={{
                fontSize: iconSize ? `${iconSize}px` : "28px", 
                color: elementColor, 
                filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
              }} 
              onMouseEnter={() => setTemporaryRating(index + 1)} 
              onMouseLeave={() => setTemporaryRating(0)} 
              onClick={() => handleClick(index + 1)}
            >
            {icon ? icon : DEFAULT_ICON}
            </div>
          );
        })}
        </div>

        <div className="form-group">
          <label>Review <br></br>
            <textarea name="submissionReview" rows="4" />
          </label>
        </div>
    </div>
  );
}

