import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';
import CategoryBadges from '../submission/CategoryBadges';
import AdditionalUserReviews from '../submission/AdditionalUserReviews';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';
import StarRating from '../submission/StarRating';
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
              {/* This is a placeholder for the Average Submission Rating. */}
              {/* Stars in below div are hardcoded, need replacing with Austin's component */}
              {/* <div className='submission-average-rating'><h4>Average Rating: </h4> 
                <div>⭐⭐⭐⭐⭐ (4.8)</div>
              </div> */}
              <div className='submission-description'>Description: {submissionByName.description}</div>
            </div>
          

            </div>
            <div className='review-card-submission-page'>


              {/* <h4>First Review: </h4> */}
              <div className='review-header-container'>
                <div className='review-header-user-location'>
                  <h6>{submissionByName.user.username}</h6>
                  <p className='gray-text'>Submitted this location {RenderDateAndTime(submissionByName)}</p>
                </div>
                <div><StarRating rating={submissionByName.rating} /></div>
              </div>

                <p>{submissionByName.submissionReview}</p>

          </div>

          <div className='review-card-submission-page'>
                <h3>Additional User Reviews</h3>
                <p>Average Rating: <StarRating rating={submissionByName.averageRating} /></p>
          </div>

          <div className='review-card-submission-page'>
              <AdditionalUserReviews submissionId={submissionByName.id} />
          </div>
          <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>

      </div>
    )
  }
}
