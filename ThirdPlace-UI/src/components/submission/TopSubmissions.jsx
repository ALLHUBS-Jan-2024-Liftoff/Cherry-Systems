import React, {useState, useEffect } from 'react';


export default function renderTopSubmissions() {
const [submissionList, setSubmissionList] = useState("");

  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
          console.error("Unable to fetch all submissions.", error);
      });
  }, []);


  // filter submissions by average rating (averateRating) // 
  // populate top 5 submissions by highest average rating //

  const topSubmissions = [];
  const submissionByAverage = submissionList.sort((a, b) => a.averageRating - b.averageRating)
  
  for (let i = 0; i < 6; i++) {
    topSubmissions.push(submissionByAverage[i])
  }
  

  // filter submissions by submission date (submissionDate) // 
  // populate top 5 submissions by most recent date // 
}


 