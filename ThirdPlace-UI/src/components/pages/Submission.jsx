import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';

export default function Submission() {

  const { submissionName } = useParams();
  
  const [submissionList, setSubmissionList] = useState([]);
  // const [submission, setSubmissionData] = useState({});
  
  
  // useEffect(() => {
  //   getSubmissions();
  // }, []);

  // const getSubmissions = async () => {
  //   const result = await axios
  //     .get("http://localhost:8080/api/submission/all")
  //     .catch((error) => {
  //       console.error("Error fetching submissions", error);
  //     });
  //   setSubmissionList(result.data);
  // };

  // fetches an array of submission objects from database each time the form is initialized//
  useEffect(() => {
      fetchSubmissions()
        .then(setSubmissionList)
        .catch((error) => {
            console.error("Unable to fetch all submissions.", error);
        });
  }, [submissionName]);

  console.log(submissionList);
  
  const submissionByName = submissionList.find(({locationName}) => locationName === submissionName);


  if (submissionList.length === 0) {
    return (
    <div>
      <h3>DataLoading</h3>
    </div>
  )}

  return (
    <div>
        <Navbar/>

        <h1>{submissionName}</h1>
        
        <div className='review-card'>
            <h3></h3>
            {/* <p>{submissionByName.locationAddress}</p> */}
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
