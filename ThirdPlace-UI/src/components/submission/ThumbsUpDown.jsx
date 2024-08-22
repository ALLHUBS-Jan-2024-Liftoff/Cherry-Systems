import thumbsupicon from "../../assets/thumbs-up.png";
import thumbsdownicon from "../../assets/thumbs-down.png";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from "react";
import { setSubmissionVotes } from "../../service/VoteService";


export default function ThumbsUpDown({votes, data}) {

  const { user } = useAuth();
  const [submittedVoteType, setSubmittedVoteType] = useState(null);
  // const [hasVoted, setHasVoted] = useState(false);
  // const [existingVoteId, setExistingVoteId] = useState(null);

    let voteData = votes.submissionVotes;
    let reviewData = data.submissionByName;
    // console.log(voteData);
    // console.log(reviewData);

    // console.log(` submission ID: ${reviewData.id}`);
    let voteArrBySubmissionID = [];

  for (let i = 0; i < voteData.length; i++) {
    if (voteData[i].submission.id === reviewData.id) {
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
  // console.log("vote arr by submission:");
  // console.log(voteArrBySubmissionID);


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
          await axios.delete(`http://localhost:8080/api/votes/submissionvotes/delete/${currentVoteId}`)
          } catch(error) {
            console.error("Error deleting previous vote", error);
          }
          setSubmittedVoteType("up");
          window.location.reload();
        } 

        else if (!voted) {
          console.log("user has never voted");
          setSubmittedVoteType("up");
          window.location.reload();
        }

// console.log(user.id);
// console.log("voted:");
// console.log(hasVoted);
// console.log(voted);

    }
  }

  // UseEffect to handle setting vote type
useEffect(() => {
  if (submittedVoteType !== null) {
    setSubmissionVotes((reviewData.id), submittedVoteType);
console.log("submittedVoteType not null");
console.log(submittedVoteType);
  } else if (submittedVoteType == null) {
    console.log("submittedVoteType is null!")
  }
  console.log("UseEffect fired!");
}, [submittedVoteType]);


    // Handle Downvote click

  const downvote = async (e) => {

    e.preventDefault(); 

    if (!user) {
      console.error('User is not authenticated.');
      alert("Please login to upvote or downvote!");
      return;
      } else {
        
      //checks if user has a vote recorded in the database

      console.log("Clicked downvote!");
      const voted= voteArrBySubmissionID.find(vote => vote.user.id === user.id);

        if (voted) {
          const currentVoteId = voted.id;
          console.log("user has voted before!");
          console.log(`existing vote ID: ${currentVoteId}`);

          try {
          await axios.delete(`http://localhost:8080/api/votes/submissionvotes/delete/${currentVoteId}`)
          } catch(error) {
            console.error("Error deleting previous vote", error);
          }
          setSubmittedVoteType("down");
        } 

        else if (!voted) {
          console.log("user has never voted");
          setSubmittedVoteType("down");
        }
        window.location.reload();
      }
  }

  //TODO clicking on thumb icon sends request to database to add vote
    return(
        <>
        <img src={thumbsupicon} className='thumb-icon' onClick={upvote}/>
        {upVotes}
        <img src={thumbsdownicon} className='thumb-icon' onClick={downvote}/>
        {downVotes}
        </>
    );
}