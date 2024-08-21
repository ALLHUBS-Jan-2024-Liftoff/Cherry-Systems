import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSubmissions } from '../../service/SubmissionService';
import {fetchSubmissionVotes} from '../../service/VoteService';
import { fetchReviewVotes } from '../../service/VoteService';
import CategoryBadges from '../submission/CategoryBadges';
import AdditionalUserReviews from '../submission/AdditionalUserReviews';
import RenderDateAndTime from '../condensed-submission/DateTimeStamp';

import Minimap from '../Map/Minimap';
import Address from '../condensed-submission/Address';
import ThumbsUpDown from '../submission/ThumbsUpDown';


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

  //TODO when you need to tally all of them, push to an "up" and "down" array, loop through the vote types, submissionbyname.id

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

  

// console.log(submissionByName)

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
                <div>{renderStars(submissionByName.rating)}</div>
              </div>

                <p>{submissionByName.submissionReview}</p>

                <div className='thumbs-vote-container'> 
                  <ThumbsUpDown votes={{submissionVotes}} data={{submissionByName}}/>
                </div>

          </div>
          <div className='review-card-submission-page'>
              <AdditionalUserReviews submissionId={submissionByName.id} votes={{reviewVotes}}/>
          </div>
          <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>

      </div>
    )
  }
}
