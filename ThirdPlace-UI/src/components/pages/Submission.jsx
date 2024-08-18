import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  console.log(submissionByName);

  //  renders page when data loads  //

  if (submissionList.length !== 0) {
    return (
      <div>
          <Navbar/>

          <h1><u>{submissionName}</u></h1>
          <CategoryBadges props={submissionByName}/>
          <div className='submission-details-container'>
            <div>
              <Minimap placeId={submissionByName.placeId}/>
            </div>
            <div className='submission-details'>
              <div><Address props={submissionByName.locationAddress} /></div>
              <div className='submission-average-rating'><h4>Average Rating: </h4> ⭐⭐⭐⭐⭐ (4.8)</div>
              <div className='submission-description'>Description: {submissionByName.description}</div>
            </div>
          </div>

          <div className='review-card'>
              <h3>First Review here</h3>
              <p>Review and Rating</p>
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
