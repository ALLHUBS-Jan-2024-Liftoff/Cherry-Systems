import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';

export default function Submission() {
  const { locationName } = useParams();

  useEffect( () => {
    fetchSubmissions()
    .then 
  })
  // const [submission, setSubmission] = useState("");
//   const { submissionName } = useParams();

// const submissionData = {
//   submissionName: 'Watershed Nature Preserve',
//   locationAddress: "",
//   description: "",
//   rating: "",
//   review: "",
//   categories: ""
// }

  return (
    <div>
        <Navbar/>

        <h1>Submission Page</h1>

        <div className='review-card'>
            <h3>Location Name</h3>
            <p>Location Address</p>
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
