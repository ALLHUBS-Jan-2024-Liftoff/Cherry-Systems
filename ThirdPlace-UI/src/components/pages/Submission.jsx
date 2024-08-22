import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams, Link } from 'react-router-dom';
// import { fetchSubmissions } from '../../service/SubmissionService';
import { deleteSubmission, fetchSubmissions } from '../../service/SubmissionService';
import { addNewReview } from '../../service/RateAndReviewService';
import RateAndReview from '../submission/RateAndReview';
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
  const [rating, setRating] = useState(false)
  const [submissionReview, setSubmissionReview] = useState("");
  const [toggle, setToggle] = useState("hidden");
 
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

  console.log(reviewVotes);

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




   
  const handleAddAReviewButton = (e) => {
    setToggle("visible");
  };


  // users can add a rating and review to existing locations //
  const handleSubmitNewReview = async (e) => {
    e.preventDefault(); 
    addNewReview(submissionByName.id, rating, submissionReview);
    window.location.reload();
  }

 
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
            { (user !== null) ? (
              <FavoriteButton submissionId={submissionByName.id} />
            ) : (
              <div className='favorite-button-container-empty'></div>
            )}
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


          <div>

            { (user !== null) ? (
                        
            <button 
              className="submit-button"
              value={submissionByName.id}
              onClick={handleAddAReviewButton}>
            Add A Review
            </button>
             ) : (
              <div className="submission-page-buttons-container">
              <center> 
              <h6>Please <Link className="link-css-login-register" to='/login'>login</Link> or <Link className="link-css-login-register" to='/registration'>register</Link> to leave a review!</h6>   
              </center>
              </div>
              )}

              <section>
              { (toggle === "hidden") ? (
                <>
                </>
              ) : (
              <section id='addNewReview' className='review-card-submission-page'>
              <form   onSubmit={handleSubmitNewReview}>
              <h3> Add A New Review </h3>
              <br></br>
              <RateAndReview submissionId={submissionByName.id} rating={rating} setRating={setRating} submissionReview={submissionReview} setSubmissionReview={setSubmissionReview}/>
              <button type="submit" className="submit-button">Submit New Review</button>
              </form>
              </section>
              )}
              </section>
            

          </div>

          <br></br>     


          <h4>Additional User Reviews</h4>

          <div className='review-card-submission-page'>
              <AdditionalUserReviews submissionId={submissionByName.id} votes={{reviewVotes}}/>
          </div>

            
          <div className='edit-delete-submission-buttons'>
            { (user !== null) && ((user.username) === (submissionByName.user.username)) ? (
            <span>
            
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
            
            </span>
            ) : (
              <>
              </>
            )}
          
            <br></br>
            
            <p className="gray-text">
              <span>🍒 Powered by Cherry Systems </span>
            </p>
          </div>
          </section>
        ) : (
          <section>
            
            <UpdateSubmissionForm props={submissionByName}/>
          </section>
        )}

      </div>
    )
  }
}
