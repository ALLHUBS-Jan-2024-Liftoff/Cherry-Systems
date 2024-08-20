import React, { useState } from "react";


// const DEFAULT_COUNT = 5; 
// const DEFAULT_ICON = "⭐"; 
// const DEFAULT_UNSELECTED_COLOR = "grey"; 
// const DEFAULT_COLOR = "yellow";  


export default function RateAndReview({rating, setRating, submissionReview, setSubmissionReview}) {
    // const [rating, setRating] = useState(defaultRating);
    // const [submissionReview, setSubmissionReview] = useState("");
    const [temporaryRating, setTemporaryRating] = useState(0); 
    const defaultCount = 5;
    const defaultIcon = "⭐";
    const defaultUnselectedColor = "grey";
    const defaultSelectedColor = "yellow";
    const defaultIconSize = 28;

    let stars = Array(defaultCount).fill(defaultIcon);
  
    // Sets rating when star is selected
    const handleClick = (rating) => {
      setRating(rating);

      // Connect star rating to database storage here
  
    };

    return (   
      <div>

        {/* HTML FOR STAR RATING */}

        <div>Rating</div>
        <div className="starsContainer">
          {stars.map((item, index) => {
            const isActiveColor = (rating || temporaryRating) && (index < rating || index < temporaryRating); 
        
            let elementColor = "";

            if (isActiveColor) {
              elementColor = defaultSelectedColor; 
            } else {
              elementColor = defaultUnselectedColor; 
            }

            return (
              <div 
                className="star" 
                key={index} 
                style={{
                  fontSize: defaultIconSize ? `${defaultIconSize}px` : "28px", 
                  color: elementColor, 
                  filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
                }} 
                onMouseEnter={() => setTemporaryRating(index + 1)} 
                onMouseLeave={() => setTemporaryRating(0)} 
                onClick={() => handleClick(index + 1)}
              >
              {defaultIcon}
              </div>
            );
          })}
          </div>

          <div className="form-group">

            {/* HTML FOR REVIEW TEXT */}

            <label>Review: <br></br>
              <textarea 
              name="submissionReview" 
              placeholder='Write a review...'
              rows="4"
              cols="50"
              type="text"
              value={submissionReview}
              onChange={(e) => setSubmissionReview(e.target.value)} />
            </label>

          </div>
      </div>
    );
  }

