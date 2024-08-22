import React, {useEffect, useState} from 'react'
import Navbar from "../navigation/Navbar";
import { fetchSubmissions } from '../../service/SubmissionService';
import CondensedSubmission from '../condensed-submission/CondensedSubmission';



export default function Home() {

  const [submissionList, setSubmissionList] = useState([]);
  const topSubmissions = [];
  const recentSubmissions = [];

  //  loads all submissions  //
  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
          console.error("Unable to fetch all submissions.", error);
      });
  }, []);

  //  sorts submissions by average rating  //
  const submissionsByAverage = submissionList.sort((a, b) => b.averageRating - a.averageRating);
  
  //  pushes top 5 submissions to topSubmissions array  //
  for (let i = 0; i < 5; i++) {
    if(submissionsByAverage[i] === undefined) {
      break;
    } else {
      topSubmissions.push(submissionsByAverage[i]);
    }
  }

  //  sorts submissions by date of submission  //
  const submissionsByDate = submissionList.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

  // pushes most recent 5 submissions to recentSubmissions array  // 
  for (let i = 0; i < 5; i++) {
    if (submissionsByDate[i] === undefined) {
      break;
    } else {
      recentSubmissions.push(submissionsByDate[i]);
    }
  }

  
  if (submissionList.length !== 0) {
    return (
      <>
      <Navbar/>
 
        <h1>Welcome to ThirdPlace!</h1>
        <div className="review-card">
       
          <p>
          An app where you can browse, submit and review good spots to hang out at for no cost. There is a loneliness epidemic happening, and people are feeling more isolated than ever. People need free "third places" to socialize and hang out in public. Join now and find community in a third place near you.
          </p>
        
        </div>

        <div className='home-page-submission'>
          <div className='home-page-submission-left'>
            <div className="review-card-home-page">
              <h1>Recent Submissions</h1>
              <div className="review-card-home-page-scroll">
                <table className="table table-striped border shadow">
                  <tbody>
                    {recentSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <CondensedSubmission props={submission} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className='home-page-submission-right'>
            <div className="review-card-home-page">
              <h1>Top Submissions</h1>
              <div className="review-card-home-page-scroll">
                <table className="table table-striped border shadow">
                  <tbody>
                    {topSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <CondensedSubmission props={submission} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
        </p>
      </>
    )
  }
  
}
