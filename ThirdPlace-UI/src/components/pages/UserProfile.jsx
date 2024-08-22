import React, { useState, useEffect } from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import FavoriteList from '../user/FavoriteList';
import SubmissionsByUser from '../user/SubmissionsByUser';
import { fetchSubmissions } from '../../service/SubmissionService';
import axios from 'axios';
import RenderDateAndTimeForReviews from '../condensed-submission/DateTimeStampForReviews';
import StarRating from '../submission/StarRating';

export default function UserProfile() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [submissionList, setSubmissionList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // Load all Submissions, then add to submissionsList state
  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
          console.error("Unable to fetch all submissions.", error);
      });
  }, []);

  // Loop through all Submissions, add Submissions with current User's ID to submissionArrByUser
  let submissionArrByUser = [];

  for (let i = 0; i <submissionList.length; i++) {
    if (submissionList[i].user.id === user.id) {
      submissionArrByUser.push(submissionList[i]);
    }
  };

  // Load all Favorites by User ID
  useEffect(() => {
    if (user) {
      // Fetch the user's favorites
      fetch(`http://localhost:8080/api/favorites/user/${user.id}`)
        .then(response => response.json())
        .then(data => setFavorites(data))
        .catch(error => console.error('Error fetching favorites:', error));
    }
  }, [user]);

  // Load all reviews by current User's Username, then add to Reviews state
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/${user.username}/reviews`)
      .catch((error) => {
        console.error("Error fetching data", error);
      });

      setReviews(result.data);
  };

  return (
    <div>
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
          <section className="search-and-list-padding">
            <h1>{user.username}'s Profile Page</h1>

            <ProfileInfoCard/>

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
                  <h3>{user.username}'s Reviews</h3>
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
              <p className="gray-text-profile-page">
                <span>🍒 Powered by Cherry Systems</span>
              </p>
            </section>
          )}

    </div>
  )
};
