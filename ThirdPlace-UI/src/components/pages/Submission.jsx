import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';
import CategoryBadges from '../submission/CategoryBadges';

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

          <h1><u>{submissionName}</u></h1>
          <CategoryBadges props={submissionByName}/>
          <div className='review-card'>
              <h8><u>Address: </u></h8>
              <p>{submissionByName.locationAddress}</p>
          
              <h8><u>Description: </u></h8>
              <p>{submissionByName.description}</p>
            </div>
            <div className='review-card'>
              <h4><u>First Review: </u></h4>
              <h6>Submitted by: {submissionByName.user.username}</h6>
              <font size="2">on: {submissionByName.submissionDate}</font><br></br><br></br>
              
              <p>{renderStars(submissionByName.rating)} <br></br>
                {submissionByName.submissionReview}</p>
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
