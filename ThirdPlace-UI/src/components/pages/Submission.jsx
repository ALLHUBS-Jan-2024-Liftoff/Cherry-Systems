import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';
import AdditionalUserReviews from '../submission/AdditionalUserReviews';


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

          <h1><u>{submissionName}</u></h1>
        
          <div className='review-card'>
              <h8><u>Address: </u></h8>
              <p>{submissionByName.locationAddress}</p>
          </div>
          <div className='review-card'>
              <h8><u>Description: </u></h8>
              <p>{submissionByName.description}</p>
          </div>
          <div className='review-card'>
              <h3>First Review here</h3>
              <p>Review and Rating</p>
          </div>
          <div className='review-card'>
              <AdditionalUserReviews submissionId={submissionByName.id} />
          </div>
          <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>

      </div>
    )
  }
}
