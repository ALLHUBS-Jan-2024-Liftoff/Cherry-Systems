import React, { useState, useEffect } from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';
import { Link, useParams } from 'react-router-dom';
import FavoriteList from '../user/FavoriteList';
import SubmissionsByUser from '../user/SubmissionsByUser';
import { fetchSubmissions } from '../../service/SubmissionService';
import { getUserByUsername } from '../../service/UserServices';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import RenderDateAndTimeForReviews from '../condensed-submission/DateTimeStampForReviews';
import StarRating from '../submission/StarRating';

export default function OthersUserProfile() {
  const { isAuthenticated, user } = useAuth();
  // If there is a url param, then use param username/id to populate data
  const { username } = useParams();
  const [otherUser, setOtherUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [submissionList, setSubmissionList] = useState([]);
  const [reviews, setReviews] = useState([]);

  console.log(username);

  useEffect(() => {
    getUserByUsername(username)
      .then(setOtherUser)
      .catch((error) => {
        console.error("Unable to fetch user.", error);
    });
  }, [username]);

  console.log(otherUser);

  // Load all Submissions, then add to submissionsList state
  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
        console.error("Unable to fetch all submissions.", error);
      });
  }, [otherUser]);

  // Loop through all Submissions, add Submissions with current User's ID to submissionArrByUser
  let submissionArrByUser = [];

  for (let i = 0; i <submissionList.length; i++) {
    if (submissionList[i].user.id === otherUser.id) {
      submissionArrByUser.push(submissionList[i]);
    }
  };

  console.log(submissionArrByUser);

  // Load all Favorites by User ID
  useEffect(() => {
    if (otherUser) {
      // Fetch the user's favorites
      fetch(`http://localhost:8080/api/favorites/user/${otherUser.id}`)
        .then(response => response.json())
        .then(data => setFavorites(data))
        .catch(error => console.error('Error fetching favorites:', error));
    }
  }, [otherUser]);

  // Load all reviews by current User's Username, then add to Reviews state
  useEffect(() => {
    loadReviews();
  }, [otherUser]);

  const loadReviews = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/${username}/reviews`)
      .catch((error) => {
        console.error("Error fetching data", error);
      });

      setReviews(result.data);
  };

  if (username !== null) {
    return (
    <div className="search-and-list-padding"> 
        <Navbar/>
          {user === null ? (
            <section className='review-card-no-user-profile-submit-location'>
                <h1>Log in to see Profile page!</h1>
                <br />
                <p>
                    <Link className="link-css-login-register" to={{ pathname: '/login', state: { user, isAuthenticated }}}>Go to Login</Link>
                </p>
            </section>
          ) : (
            <section>
              <h1>{username}'s Profile Page</h1>

              <ProfileInfoCard otherUser={otherUser}/>

              <div className='review-card-favorites'>
                <div className='review-card-header'>
                  <h3>Submitted Locations</h3>
                </div>
                <div className='review-card-content'>
                  {/* Renders the list of submitted locations in condensed condition */}
                  {submissionArrByUser.length > 0 ? (
                    <SubmissionsByUser submissionArrByUser={submissionArrByUser} />
                  ) : (
                    <p>No locations yet.</p>
                  )}
                </div>
              </div>

              <div className='review-card-favorites'>
                <div className='review-card-header'>
                  <h3>Favorite Locations</h3>
                </div>
                <div className='review-card-content'>
                  {/* Renders the list of favorite locations in condensed condition */}
                  {favorites.length > 0 ? (
                    <FavoriteList favorites={favorites.map(favorite => favorite.submission)} />
                  ) : (
                    <p>No favorite locations yet.</p>
                  )}
                </div>
              </div>

              <div className='review-card-favorites'>
                <div className='review-card-header'>
                  <h3>{username}'s Reviews</h3>
                </div>
                <div className='review-card-content'>
                  {/* Renders a list of reviews made by current user */}
                  {reviews.length > 0 ? (
                    <div className=''>
                      {<table className="table table-striped border shadow">
                          <tbody>
                              {reviews.map((review) => (
                                  <tr key={review.id}>
                                    <td>
                                      <span>
                                        <Link className="link-css-profile-review-title" to={`../${review.submission.locationName}`}> {review.submission.locationName} </Link>
                                      </span>
                                      <br/>
                                      <br/>
                                      <span><b>Review:</b> {review.reviewText}</span>
                                      <br/>
                                      <br/>
                                      <font size="2" className=''>Submitted {RenderDateAndTimeForReviews(review)}</font>
                                    </td>
                                    <td>
                                      <br/>
                                      <br/>
                                      <StarRating rating={review.rating} />
                                    </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>}
                    </div>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </div>
            </section>
          )}

        <p className="gray-text">
          <center>🍒 Powered by Cherry Systems</center>
        </p>
    </div>
  )};
}
