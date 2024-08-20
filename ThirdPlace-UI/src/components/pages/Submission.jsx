import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { deleteSubmission, fetchSubmissions } from '../../service/SubmissionService';
import CategoryBadges from '../submission/CategoryBadges';
import AdditionalUserReviews from '../submission/AdditionalUserReviews';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';

import Minimap from '../Map/Minimap';
import Address from '../condensed-submission/Address';

import { useAuth } from '../../context/AuthContext';


export default function Submission() {

  const { submissionName } = useParams();
  const { user } = useAuth();
  const [submissionList, setSubmissionList] = useState([]);
  const [editMode, setEditMode] = useState(false);


  // fetches an array of submission objects from database each time the form is initialized//

  useEffect(() => {
      fetchSubmissions()
        .then(setSubmissionList)
        .catch((error) => {
            console.error("Unable to fetch all submissions.", error);
        });
  }, [submissionName]);
  
  const renderStars = (rating) => {
    // const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push("⭐");
      }
      return stars;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!confirm(`Would you like to edit submission: ${submissionByName.locationName}?`)) {
      // Cancel is clicked
      e.preventDefault();
      alert('Cancelled: Submission will NOT be edited!');
    } else {
      // Ok is clicked
      setEditMode(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!confirm(`Are you sure you want to delete submission: ${submissionByName.locationName}?`)) {
      // Cancel is clicked
      e.preventDefault();
      alert('Cancelled: Submission was NOT deleted!');
    } else {
      // Ok is clicked
      try {
        deleteSubmission(submissionByName.id);
        alert(`${submissionByName.locationName} has been deleted!`);
        window.location.href = "/";
      } catch (error) {
        console.error('Failed to delete user!', error);
        throw error;
      }
    }
  };

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
            <div className='review-card'>


              {/* <h4>First Review: </h4> */}
              <div className='review-header-container'>
                <div className='review-header-user-location'>
                  <h6>{submissionByName.user.username}</h6>
                  <p className='gray-text'>Submitted this location {RenderDateAndTime(submissionByName)}</p>
                </div>
                <div>{renderStars(submissionByName.rating)}</div>
              </div>

                <p>{submissionByName.submissionReview}</p>

          </div>
          <div className='review-card'>
              <AdditionalUserReviews submissionId={submissionByName.id} />
          </div>

            
          <section>
            <center>
              <button 
              className="submit-button" 
              onClick={handleUpdate}>
              Edit Submission
            </button>

            <button
              className="delete-button"
              value={submissionByName.id}
              onClick={handleDelete}>
              Delete Submission
            </button>
            </center>
          </section>
           
          
          <br></br>
          
          <p className="gray-text">
            <center>🍒 Powered by Cherry Systems </center>
          </p>

      </div>
    )
  }
}
