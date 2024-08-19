import React, {useState, useEffect } from 'react';
import { fetchSubmissions } from '../../service/SubmissionService';
import CondensedSubmission from '../condensed-submission/CondensedSubmission';


export default function RenderTopSubmissions() {
  const [submissionList, setSubmissionList] = useState([]);

  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
          console.error("Unable to fetch all submissions.", error);
      });
  }, []);

  console.log(submissionList);


  // filter submissions by average rating (averateRating) // 
  // populate top 5 submissions by highest average rating //

  const [topSubmissions, setTopSubmissions] = useState([]);
  const submissionByAverage = submissionList.sort((a, b) => a.averageRating - b.averageRating)
  
  for (let i = 0; i < 6; i++) {
    setTopSubmissions(submissionByAverage[i])
  }

  console.log(topSubmissions);
  

  // filter submissions by submission date (submissionDate) // 
  // populate top 5 submissions by most recent date // 

  return (
    <table className="table table-striped border shadow">
        <tbody>
          {topSubmissions.map((submission) => (
            <tr key={submission.id}>
              <CondensedSubmission props={submission} />
            </tr>
          ))}
        </tbody>
      </table>
  )
}


 