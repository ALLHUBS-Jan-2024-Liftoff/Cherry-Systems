import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';
import CategoryBadges from '../submission/CategoryBadges';
import Minimap from '../Map/Minimap';
import Address from '../condensed-submission/Address';


export default function Submission() {

  const { submissionName } = useParams();
  
  const [submissionList, setSubmissionList] = useState([]);
    

  // fetches an array of submission objects from database each time the form is initialized//

  useEffect(() => {
      fetchSubmissions()
        .then(setSubmissionList)
        .catch((error) => {
            console.error("Unable to fetch all submissions.", error);
        });
  }, [submissionName]);
  
  //  pulls the submission by submission name  //

  const submissionByName = submissionList.find(({locationName}) => locationName === submissionName);

  const renderStars = (rating) => {
    // const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push("⭐");
      }
      return stars;
  }; 

  //  renders page when data loads  //

  if (submissionList.length !== 0) {
    return (
      <div>
          <Navbar/>

          <h1>{submissionName}</h1>
          <CategoryBadges props={submissionByName}/>
          <div className='submission-details-container'>
            <div>
              <Minimap placeId={submissionByName.placeId}/>
            </div>
            <div className='submission-details'>
              <div><Address props={submissionByName.locationAddress} /></div>
              <div className='submission-average-rating'><h4>Average Rating: </h4> 
                {/* Stars in below div are hardcoded, need replacing with Austin's component */}
                <div>⭐⭐⭐⭐⭐ (4.8)</div>
              </div>
              <div className='submission-description'>Description: {submissionByName.description}</div>
            </div>
          

            </div>
            <div className='review-card'>
              {/* <h4>First Review: </h4> */}
              <div className='review-header-container'>
                <div className='review-header-user-location'>
                  <h6>{submissionByName.user.username}</h6>
                  <p className='gray-text'>Submitted this location {submissionByName.submissionDate}</p>
                </div>
                <div>{renderStars(submissionByName.rating)}</div>
              </div>

                <p>{submissionByName.submissionReview}</p>

          </div>
          <div className='review-card'>
              <h3>Additional User Reviews</h3>
              <p>The deets</p>
          </div>
          <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>

      </div>
    )
  }
}
