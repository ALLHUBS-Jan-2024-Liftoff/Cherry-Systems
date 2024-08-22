import thumbsupicon from "../../assets/thumbs-up.png";
import thumbsdownicon from "../../assets/thumbs-down.png";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useState } from "react";


export default function ThumbsUpDown({votes, data}) {

  const { user } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const [existingVoteId, setExistingVoteId] = useState(null);


    let voteData = votes.submissionVotes;
    let reviewData = data.submissionByName;
    console.log(voteData);
    console.log(reviewData);

    console.log(` submission ID: ${reviewData.id}`);
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
  console.log("vote arr by submission:");
  console.log(voteArrBySubmissionID);


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
          // setHasVoted(true);
          const currentVoteId = voted.id;
          // setExistingVoteId(currentVoteId);
          console.log("user has voted before!");
          console.log(`existing vote ID: ${currentVoteId}`);

          try {
          await axios.delete(`http://localhost:8080/api/votes/submissionvotes/delete/${currentVoteId}`)
          } catch(error) {
            console.error("Error deleting previous vote", error);
          }

        } 

        //TODO: if no existing vote in database, add upvote
        else if (!voted) {
          console.log("user has never voted");
          try {
            await axios.post('http://localhost:8080/api/votes/submissionvotes/new', {
              user: user.id,
              submission: reviewData.id,
              voteType: "up" 
            }).then(function (response) {
              console.log(response);
            })
          } catch (error) {
            console.error("Error adding new vote", error);
          }
        }

console.log(user.id);
console.log("voted:");
// console.log(hasVoted);
console.log(voted);

    }
  }

    // Handle Downvote click

  const downvote = async (e) => {
    e.preventDefault(); 

    if (!user) {
      console.error('User is not authenticated.');
      alert("Please login to upvote or downvote!");
      return;
      } else {
        console.log("Clicked downvote!");

      }
  }

//TODO filter 
// console.log("vote data by id:")
// console.log(voteData.submission.id);


  // console.log(`Upvotes: ${upVotes} Downvotes: ${downVotes}`)

  //  // Fetch initial favorite status
  //  useEffect(() => {
  //   const fetchFavoriteStatus = async () => {
  //     if (!user) return;
      
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/favorites/user/${user.id}`);
  //       const favorites = response.data;
  //       const favorite = favorites.find(fav => fav.submission.id === submissionId);
  //       if (favorite) {
  //         setIsFavorited(true);
  //         setFavoriteId(favorite.id);
  //       } else {
  //         setIsFavorited(false);
  //         setFavoriteId(null);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user favorites:', error);
  //     }
  //   };

  //   fetchFavoriteStatus();
  // }, [user, submissionId]);


// // Function to toggle favorite status
// const handleFavoriteToggle = async () => {
//   if (!user) {
//     console.error('User is not authenticated.');
//     return;
//   }

//   try {
//     if (isFavorited && favoriteId !== null) {
//       // Remove favorite
//       await axios.delete(`http://localhost:8080/api/favorites/delete/${favoriteId}`);
//       setIsFavorited(false);
//       setFavoriteId(null);
//       console.log('Favorite removed');
//     } else {
//       // Add favorite
//       const response = await axios.post('http://localhost:8080/api/favorites/new', {
//         user: { id: user.id },
//         submission: { id: submissionId }
//       });
//       setFavoriteId(response.data.id); // Update with the new favorite ID
//       setIsFavorited(true);
//       console.log('Favorite added');
//     }
//   } catch (error) {
//     console.error('Error handling favorite:', error);
//   }
// };


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