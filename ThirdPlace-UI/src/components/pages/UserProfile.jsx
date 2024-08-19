import React, { useState, useEffect } from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import FavoriteList from '../user/FavoriteList';
import SubmissionsByUser from '../user/SubmissionsByUser';
import { fetchSubmissions } from '../../service/SubmissionService';

export default function UserProfile() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [submissionList, setSubmissionList] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch the user's favorites
      fetch(`http://localhost:8080/api/favorites/user/${user.id}`)
        .then(response => response.json())
        .then(data => setFavorites(data))
        .catch(error => console.error('Error fetching favorites:', error));
    }
  }, [user]);

  useEffect(() => {
    fetchSubmissions()
      .then(setSubmissionList)
      .catch((error) => {
          console.error("Unable to fetch all submissions.", error);
      });
  }, []);

  let submissionArr = [];

  for (let i = 0; i <submissionList.length; i++) {
    if (submissionList[i].user.id === user.id) {
      submissionArr.push(submissionList[i]);
    }
  };

  if (submissionList.length !== 0) {
    return (
    <div>
        <Navbar/>
          {user === null ? (
            <section className='review-card'>
                <h1>Log in to see Profile page!</h1>
                <br />
                <p>
                    <Link to={{ pathname: '/login', state: { user, isAuthenticated }}}>Go to Login</Link>
                </p>
            </section>
          ) : (
            <section>
              <h1>{user.username}'s Profile Page</h1>

              <ProfileInfoCard/>

              <div className='review-card-favorites'>
                <div className='review-card-header'>
                  <h3>Submitted Locations</h3>
                </div>
                <div className='review-card-content'>
                  {/* Renders the list of submitted locations in condensed condition */}
                  {submissionArr.length > 0 ? (
                    <SubmissionsByUser submissionArr={submissionArr} />
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

              <div className='review-card'>
                  <h3>{user.username}'s Reviews</h3>
                  <p>Comments here</p>
              </div>

            </section>
          )}

        <p className="gray-text">
          <center>🍒 Powered by Cherry Systems</center>
        </p>
    </div>
  )};
}
