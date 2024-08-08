import React, { useEffect } from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user === null) {
  //     navigate('/login', { user, isAuthenticated });
  //     console.log("Must be logged in to view profile.");
  //   }
  // }, [])

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

          <div className='review-card'>
              <h3>Submitted Locations</h3>
              <p>Locations here</p>
          </div>
          <div className='review-card'>
              <h3>Favorite Locations</h3>
              <p>Favorite Locations here</p>
          </div>
          <div className='review-card'>
              <h3>Peggy505's Comments</h3>
              <p>Comments here</p>
          </div>
        </section>
        )}

        <p className="gray-text">
          <center>🍒 Powered by Cherry Systems</center>
        </p>
    </div>
  )
}
