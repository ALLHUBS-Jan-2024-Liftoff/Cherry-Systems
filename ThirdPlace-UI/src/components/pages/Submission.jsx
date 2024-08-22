import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
// import { fetchSubmissions } from '../../service/SubmissionService';
import { deleteSubmission, fetchSubmissions } from '../../service/SubmissionService';
import {fetchSubmissionVotes} from '../../service/VoteService';
import { fetchReviewVotes } from '../../service/VoteService';

import CategoryBadges from '../submission/CategoryBadges';
import AdditionalUserReviews from '../submission/AdditionalUserReviews';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';
import UpdateSubmissionForm from '../submission/UpdateSubmissionForm';

import StarRating from '../submission/StarRating';
import Minimap from '../Map/Minimap';
import Address from '../condensed-submission/Address';
import FavoriteButton from '../submission/FavoriteButton';

import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import ThumbsUpDown from '../submission/ThumbsUpDown';


export default function Submission() {

  const { submissionName } = useParams();
  const { user } = useAuth();
  const [submissionList, setSubmissionList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  // const navigate = useNavigate();


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

   // fetches submission vote data
   const [submissionVotes, setSubmissionVotes] = useState([]);

   useEffect(() => {
    fetchSubmissionVotes().then(setSubmissionVotes).catch((e) => { console.error("Error fetching vote data", e)});
  }, []);

   // fetches review vote data
   const [reviewVotes, setReviewVotes] = useState([]);

   useEffect(() => {
    fetchReviewVotes().then(setReviewVotes).catch((e) => { console.error("Error fetching vote data", e)});
  }, []);

  // console.log(reviewVotes);

  // console.log(submissionVotes[0].submission.id);

  

// console.log(submissionByName)  // star rating
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push("⭐");
      }
      return stars;
  };


  // users can edit their submissions by 'edit submission button'
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

  // users can delete their submissions by 'delete submission' button
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


  //  renders page when data loads  //

  if (submissionList.length !== 0) {

    return (
      <div>
          <Navbar/>
          {!editMode ? (
          <section>
          <h1>{submissionName}</h1>
          <CategoryBadges props={submissionByName}/>
          <div className='submission-details-container'>
            <div>
              <Minimap placeId={submissionByName.placeId}/>
            </div>

            <div className='submission-details'>
              <div><Address props={submissionByName.locationAddress} /></div>

              <div className='submission-average-rating'>
                 <h4 style={{marginRight: '13px'}}>Average Rating: </h4>
                  <StarRating rating={submissionByName.averageRating} />
                </div>

              <div className='submission-description'>Description: {submissionByName.description}</div>
            </div>

            </div>

            <div className='favorite-button-container'>
              <FavoriteButton submissionId={submissionByName.id} />
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

                <div className='thumbs-vote-container'> 
                  <ThumbsUpDown votes={{submissionVotes}} data={{submissionByName}}/>
                </div>

          </div>

          <h4>Additional User Reviews</h4>

          <div className='review-card-submission-page'>
              <AdditionalUserReviews submissionId={submissionByName.id} votes={{reviewVotes}}/>
          </div>


          <div>
            { (user !== null) && ((user.username) === (submissionByName.user.username)) ? (
            <center>

            <button
              className="submit-button"
              value={submissionByName.id}
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
            ) : (
              <>
              </>
            )}
          </div>
          
          <p className="gray-text">
            <center>🍒 Powered by Cherry Systems </center>
          </p>
          </section>
        ) : (
          <section>
            <h1>Edit Location Info</h1>
            <UpdateSubmissionForm props={submissionByName}/>
          </section>
        )}

      </div>
    )
  }
}
