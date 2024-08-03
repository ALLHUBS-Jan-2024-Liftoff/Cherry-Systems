import React from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    // After logout, redirect to the login page 
    navigate('/login'); 
  }; 

  return (
    <div>
        <Navbar/>
        {!user ? (
            <section className='review-card'>
                <h1>Log in to see Profile page!</h1>
                <br />
                <p>
                    <Link to={'/login'}>Go to Login</Link>
                </p>
            </section>
        ) : (
        <section>
        {!user ? (
          <h1>Default User Profile Page</h1>
        ) : (
          <h1>{user.username}'s Profile Page</h1>
        )}
        <ProfileInfoCard/>

        {/* Temporary logout button, will be removed after dynamic Sign Up / Logout and Login / My Profile buttons are implemented */}
        <button
          className="submit-button"
          onClick={handleLogout}>
          Logout
        </button>

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
    </div>
  )
}
