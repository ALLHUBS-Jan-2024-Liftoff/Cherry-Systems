import thumbsupicon from "../../assets/thumbs-up.png";
import thumbsdownicon from "../../assets/thumbs-down.png";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from "react";
import { setReviewVotes, setSubmissionVotes } from "../../service/VoteService";

export default function ThumbsUpDownReviews({votes, data}) {

  //TODO this code logic is same as ThumbsUpDown.jsx, just needs to be all updated for ReviewVotes instead of Submissions Votes
  
  const { user } = useAuth();
  const [submittedVoteType, setSubmittedVoteType] = useState(null);

    let voteData = votes.reviewVotes;
    let reviewData = data;
    // console.log(voteData);
    // console.log(reviewData);

    let voteArrBySubmissionID = [];

  for (let i = 0; i < voteData.length; i++) {
    if (voteData[i].review.id === reviewData.id) {
      voteArrBySubmissionID.push(voteData[i]);
    }
  };

  let upVotes= 0;
  let downVotes= 0;

  for (let i = 0; i < voteArrBySubmissionID.length; i++) {
    if (voteArrBySubmissionID[i].voteType === "up") {
        upVotes += 1;
    }
    if (voteArrBySubmissionID[i].voteType === "down") {
        downVotes += 1;
    }
  }

   // Handle Upvote click

   const upvote = async (e) => {

    e.preventDefault(); 

    //checks if user is logged in
    if (!user) {
    console.error('User is not authenticated.');
    alert("Please login to upvote or downvote!");
    return;
    } else {

      //checks if user has a vote recorded in the database

      console.log("Clicked upvote!");
      const voted= voteArrBySubmissionID.find(vote => vote.user.id === user.id);

        if (voted) {
          const currentVoteId = voted.id;
          console.log("user has voted before!");
          console.log(`existing vote ID: ${currentVoteId}`);

          try {
          await axios.delete(`http://localhost:8080/api/votes/reviewvotes/delete/${currentVoteId}`)
          } catch(error) {
            console.error("Error deleting previous vote", error);
          }
          setSubmittedVoteType("up");
        } 

        else if (!voted) {
          console.log("user has never voted");
          setSubmittedVoteType("up");
        }
        window.location.reload();

    }
  }

  // UseEffect to handle setting vote type
useEffect(() => {
  if (submittedVoteType !== null) {
    setReviewVotes((reviewData.id), submittedVoteType);
console.log("submittedVoteType not null");
console.log(submittedVoteType);
  } else if (submittedVoteType == null) {
    console.log("submittedVoteType is null!")
  }
  console.log("UseEffect fired!");}, [submittedVoteType]);


    // Handle Downvote click

  const downvote = async (e) => {

    e.preventDefault(); 

    if (!user) {
      console.error('User is not authenticated.');
      alert("Please login to upvote or downvote!");
      return;
      } else {
        console.log("Clicked downvote!");
        
      //checks if user has a vote recorded in the database

      console.log("Clicked downvote!");
      const voted= voteArrBySubmissionID.find(vote => vote.user.id === user.id);

        if (voted) {
          const currentVoteId = voted.id;
          console.log("user has voted before!");
          console.log(`existing vote ID: ${currentVoteId}`);

          try {
          await axios.delete(`http://localhost:8080/api/votes/reviewvotes/delete/${currentVoteId}`)
          } catch(error) {
            console.error("Error deleting previous vote", error);
          }
          setSubmittedVoteType("down");
          window.location.reload();
        } 

        else if (!voted) {
          console.log("user has never voted");
          setSubmittedVoteType("down");
          window.location.reload();
        }
      }
  }
  
    return(
        <>
        <img src={thumbsupicon} className='thumb-icon' onClick={upvote}/>
        {upVotes}
        <img src={thumbsdownicon} className='thumb-icon' onClick={downvote}/>
        {downVotes}
        </>
    );
}