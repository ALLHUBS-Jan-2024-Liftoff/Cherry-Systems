import thumbsup from "../../assets/thumbs-up.png";
import thumbsdown from "../../assets/thumbs-down.png";


export default function ThumbsUpDown({votes, data}) {

    let voteData = votes.submissionVotes;
    let reviewData = data.submissionByName;

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

  console.log(`Upvotes: ${upVotes} Downvotes: ${downVotes}`)

  //TODO clicking on thumb icon sends request to database to add vote
    return(
        <>
        <img src={thumbsup} className='thumb-icon'/>
        {upVotes}
        <img src={thumbsdown} className='thumb-icon'/>
        {downVotes}
        </>
    );
}